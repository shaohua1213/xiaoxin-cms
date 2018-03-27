import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    Row,
    Col,
    Button,
    Input,
    DatePicker,
    Table,
    Icon,
    Form,
    Modal,
    Pagination,
    Select,
    Upload,
    Layout,
    message
} from "antd";
import PageHeader from "../view/PageHeader";
import "../home.css";
import {getuserlist} from "../../actions/renyuan";
import {adduser} from "../../actions/renyuan";
import {updateuser} from "../../actions/renyuan";
import {deleteuser} from "../../actions/renyuan";
import {getrolelist} from "../../actions/Role";
import {userInfo} from "../../actions/user";
import {gethuodong} from "../../actions/huodong";
import {updhuodong} from "../../actions/huodong";
import {
    AddCourse,
    CourseSubmitShenHe,
    DelSection,
    DelSectionState,
    GetLevelCourse,
    GetSectionInfo,
    GetSectionList,
    UpdateSection,
    getLevelList
} from "../../actions/course";
import {adminGetOrderList, GetVerPhaseList} from "../../actions/financial";
import RefundInfo from '../refundInfo/RefundInfo';

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;
const confirm = Modal.confirm;
const success = Modal.success;
const Option = Select.Option;
const {Content} = Layout;
const {Header} = Layout;
const {Footer} = Layout;

function Format(dateLong, fmt) {
    //author: meizz
    let date = new Date();
    date.setTime(dateLong);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
}
class Dingdanliebiao extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            levelId: -1,
            mobile: 0,
            nickname: "",
            orderTimeEnd: "",
            orderTimeStr: "",
            ordersIdStr: "",
            phasecourseid: -1,
            payTimeEnd: "",
            payTimeStr: "",
            phaseId: 0,
            status: -1,
            current: 1,
            pageno: 1,
            pagesize: 15,
            dingdanNum: "",
            qishuName: "",
            kechengName: "",
            nickName: "",
            phoneNum: 0,
            levelName: "",
            phaseName: "",
            levelList: [],
            qishuList: [],
            cLevelId: -1,
            cphaseId: -1,
            refundType: -1, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
            showTuikuan: false, // 展示退款model
            refundId: -1,
        };
    }

    componentWillMount() {
        this.getOrderList();
    }

    componentDidMount() {
        this.getLevelListM();
        this.GetVerPhaseListM();
    }

    onChange = page => {
        this.setState({
            pageno: page,
        })
        setTimeout(() => {
            this.getOrderList();
        }, 100)
    };

    getOrderList = () => {
        const {adminGetOrderList} = this.props;
        adminGetOrderList(
            this.state.cLevelId,
            this.state.phoneNum,
            this.state.nickName,
            this.state.orderTimeEnd,
            this.state.orderTimeStr,
            this.state.ordersIdStr,
            this.state.pageno,
            this.state.pagesize,
            this.state.payTimeEnd,
            this.state.payTimeStr,
            this.state.cphaseId,
            this.state.status,
            isNaN(this.state.phasecourseid) ? -1 : this.state.phasecourseid,
        ).then(data => {
            if (data.meta.code === "0") {
            } else {
                message.error(data.meta.message);
            }
        });
    }

    // 期数
    GetVerPhaseListM = () => {
        const {GetVerPhaseList} = this.props;
        GetVerPhaseList().then(data => {
            if (data.meta.code === "0") {
                // 设置全局的 levelid
                setTimeout(() => {
                    this.setState({
                        qishuList: data.object ? data.object : []
                    });
                }, 100);
            }
        });
    };

    getLevelListM = () => {
        const {getLevelList} = this.props;
        getLevelList().then(data => {
            if (data.meta.code === "0") {
                // 设置全局的 levelid
                setTimeout(() => {
                    this.setState({
                        levelList: data.object ? data.object : []
                    });
                }, 100);
            }
        });
    };

    xiadanonChangeDate = (dates, dateString) => {
        this.setState({
            orderTimeStr: dateString[0],
            orderTimeEnd: dateString[1]
        });
    };

    jiaofuonChangeDate = (dates, dateString) => {
        this.setState({
            payTimeStr: dateString[0],
            payTimeEnd: dateString[1]
        });
    };


    render() {
        const {alist, user, orderList} = this.props;
        const {
            dingdanNum,
            qishuId,
            qishuName,
            kechengName,
            nickName,
            // phoneNum,
            levelList,
            qishuList,
            // cLevelId,
            levelName,
            // ordersIdStr,
            // phasecourseid,
            phaseName
        } = this.state;
        const columns = [
            {
                title: "订单号",
                dataIndex: "ordersNum",
                key: "ordersNum"
            },
            {
                title: "订单状态",
                dataIndex: "status",
                key: "status",
                render: (text, record) => {
                    switch (record.status) { // 订单状态(0.等待付款1.交易完成 2.交易取消 3.退款中 4.退款成功 5.退款失败)
                        case 0:
                            return <span>等待付款</span>;
                            break;
                        case 1:
                            return <span>交易完成</span>;
                            break;
                        case 2:
                            return <span>交易取消</span>;
                            break;
                        case 3:
                            return <a
                                onClick={() => {
                                    this.setState({
                                        refundId: record ? record.refundId : -1,
                                        refundType: 3, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
                                        showTuikuan: true, // 展示退款model
                                    })
                                }}>退款中</a>;
                            break;
                        case 4:
                            return <a
                                onClick={() => {
                                    this.setState({
                                        refundId: record ? record.refundId : -1,
                                        refundType: 3, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
                                        showTuikuan: true, // 展示退款model
                                    })
                                }}>退款成功</a>;
                            break;
                        case 5:
                            return <span>退款失败</span>;
                            break;
                        default:
                            return <span>状态异常</span>;
                    }
                }
            },
            {
                title: "期数课程ID",
                dataIndex: "phaseCourseId",
                key: "phaseCourseId"
            },
            {
                title: "期数名称",
                dataIndex: "phaseName",
                key: "phaseName",
            },
            {
                title: "课程难度",
                dataIndex: "levelName",
                key: "levelName",
            },
            {
                title: "用户昵称",
                dataIndex: "user.nickname",
                key: "user.nickname",
            },
            {
                title: "手机号",
                dataIndex: "user.mobile",
                key: "user.mobile",
            },
            {
                title: "应付金额",
                dataIndex: "amountPrice",
                key: "amountPrice",
                render: (text, record) => (
                    <span>
              {record.amountPrice
                  ? '¥' + record.amountPrice / 100
                  : " "}
            </span>
                )
            },
            {
                title: "优惠金额",
                dataIndex: "discountPrice",
                key: "discountPrice",
                render: (text, record) => (
                    <span>
                        {
                            record.amountPrice && record.payPrice ?
                            '¥' + (record.amountPrice - record.payPrice ) / 100
                                : ''
                        }
                    </span>
                )
            },
            {
                title: "实付金额",
                dataIndex: "payParice",
                key: "payParice",
                render: (text, record) => (
                    <span>
              {record.payPrice
                  ? '¥' + record.payPrice / 100
                  : " "}
            </span>
                )
            },
            {
                title: "订单来源",
                dataIndex: "orderSource",
                key: "orderSource",
                render: (text, record) => (
                    <span>
              {record.orderSource
                  ? record.orderSource === 1 ? "公众号" : "其它"
                  : "其它"}
            </span>
                )
            },
            {
                title: "支付方式",
                dataIndex: "payType",
                key: "payType",
                render: (text, record) => (
                    <span>{record.payType === 1 ? "微信" : "其他"}</span>
                )
            },
            {
                title: "下单时间",
                dataIndex: "orderTime",
                key: "orderTime",
                render: (text, record) => (
                    <span>{record.orderTime ? Format(record.orderTime, "yyyy-MM-dd hh:mm:ss") : ''}</span>
                )
            },
            {
                title: "支付时间",
                dataIndex: "payTime",
                key: "payTime",
                render: (text, record) => (
                    <span>{record.payTime ? Format(record.payTime, "yyyy-MM-dd hh:mm:ss") : ''}</span>
                )
            },
        ];

        // 期数内容
        let qishuList1 = [];
        if (qishuList.length > 0) {
            let l = {
                phaseId: -1,
                phaseName: "全部"
            };
            for (let i = 0; i <= qishuList.length; i++) {
                if (i === 0) {
                    qishuList1.push(l);
                } else {
                    qishuList1.push(qishuList[i - 1]);
                }
            }
        }

        let levelList1 = [];
        if (levelList.length > 0) {
            let l = {
                levelId: -1,
                levelName: "全部"
            };
            for (let i = 0; i <= levelList.length; i++) {
                if (i === 0) {
                    levelList1.push(l);
                } else {
                    levelList1.push(levelList[i - 1]);
                }
            }
        }

        var downloadUrl = '/financial/adminFormExportUserOrders';
        const {cLevelId, phoneNum, phasecourseid, orderTimeEnd, orderTimeStr, ordersIdStr, payTimeEnd, payTimeStr, cphaseId, status} = this.state;


        return (
            <div style={{padding: 15}}>
                <PageHeader pageName={"订单列表"}/>
                <div
                    className="my-horizontal-div"
                    style={{marginTop: 24, alignItems: "center"}}
                >
                    <div className="my-content-text my-input-before-text1 ">订单号</div>
                    <div className="my-horizontal-div margin-left101">
                        <Input
                            value={ordersIdStr}
                            onChange={e => {
                                this.setState({ordersIdStr: e.target.value});
                            }}
                            style={{width: 150}}
                        />
                    </div>
                    <div className="my-content-text my-input-before-text1 margin-left10">期数课程ID</div>
                    <div className="my-horizontal-div margin-left101">
                        <Input
                            type="number"
                            value={phasecourseid === -1 ? "" : phasecourseid}
                            onChange={e => {
                                this.setState({phasecourseid: parseFloat(e.target.value)});
                            }}
                            style={{width: 150}}
                        />
                    </div>
                    <div className="my-content-text my-input-before-text1 margin-left10 ">
                        期数
                    </div>
                    <div className="my-horizontal-div margin-left101">
                        {qishuList1.length > 0 ? (
                            <Select
                                defaultValue={
                                    phaseName != "" ? phaseName : qishuList1[0].phaseName
                                }
                                style={{width: 150}}
                                onChange={e => {
                                    this.setState({
                                        cphaseId: e.phaseId
                                    });
                                }}
                            >
                                {qishuList1.map(data => {
                                    return <Option value={data}>{data.phaseName}</Option>;
                                })}
                            </Select>
                        ) : (
                            <div className="my-content-text" style={{width: 150}}>暂无数据</div>
                        )}
                    </div>
                    <div className="my-content-text my-input-before-text1 margin-left10 ">
                        课程难度
                    </div>
                    <div className="my-content-text margin-left101">
                        {levelList1.length > 0 ? (
                            <Select
                                defaultValue={
                                    levelName != "" ? levelName : levelList1[0].levelName
                                }
                                style={{width: 150}}
                                onChange={e => {
                                    this.setState({
                                        cLevelId: e.levelId
                                    });
                                }}
                            >
                                {levelList1.map(data => {
                                    return <Option value={data}>{data.levelName}</Option>;
                                })}
                            </Select>
                        ) : (
                            <div className="my-content-text" style={{width: 150}}>暂无数据</div>
                        )}
                    </div>
                </div>
                <div
                    className="my-horizontal-div"
                    style={{marginTop: 15, alignItems: "center"}}
                >
                    <div className="my-content-text my-input-before-text1 ">
                        用户昵称
                    </div>
                    <div className="my-horizontal-div margin-left101">
                        <Input
                            value={nickName}
                            onChange={e => {
                                this.setState({nickName: e.target.value});
                            }}
                            style={{width: 150}}
                        />
                    </div>
                    <div className="my-content-text my-input-before-text1 margin-left10 ">
                        手机号
                    </div>
                    <div className="my-horizontal-div margin-left101">
                        <Input
                            maxLength={11}
                            value={phoneNum === 0 ? "" : phoneNum}
                            type={'number'}
                            onChange={e => {
                                let value = e.target.value
                                if (value.length > 11)
                                    value = value.slice(0, 11)
                                this.setState({phoneNum: value});
                            }}
                            style={{width: 150}}
                        />
                    </div>
                    <div className="my-content-text my-input-before-text1 margin-left10 ">
                        订单状态
                    </div>
                    <div className="my-horizontal-div margin-left101">
                        <Select
                            defaultValue="全部"
                            style={{width: 150}}
                            onChange={this.dingdanChange}
                        >
                            {/*订单状态(0.等待付款 1.交易完成 2.交易取消 3.退款中 4.退款成功 5.退款失败)*/}
                            <Option value="-1">全部</Option>
                            <Option value="0">等待付款</Option>
                            <Option value="1">交易完成</Option>
                            <Option value="2">交易取消</Option>
                            <Option value="3">退款中</Option>
                            <Option value="4">退款成功</Option>
                            <Option value="5">退款失败</Option>
                        </Select>
                    </div>
                </div>
                <div
                    className="my-horizontal-div"
                    style={{marginTop: 15, alignItems: "center"}}
                >
                    <div className="my-content-text my-input-before-text1 ">
                        下单时间
                    </div>
                    <div className="my-horizontal-div margin-left101">
                        <RangePicker
                            format="YYYY-MM-DD"
                            placeholder={["开始时间", "结束时间"]}
                            onChange={this.xiadanonChangeDate}
                        />
                    </div>
                    <div className="my-content-text my-input-before-text1 margin-left10 ">
                        支付时间
                    </div>
                    <div className="my-horizontal-div margin-left101">
                        <RangePicker
                            format="YYYY-MM-DD"
                            placeholder={["开始时间", "结束时间"]}
                            onChange={this.jiaofuonChangeDate}
                        />
                    </div>
                    <Button onClick={this.chaxun} type="primary" style={{marginLeft: 10}}>
                        查询
                    </Button>
                    <form action={downloadUrl} method="post" style={{marginLeft: "10px"}}>
                        <div style={{width: 0, height: 0, overflow: 'hidden'}}>
                            <input name="levelId" type="text" value={this.state.cLevelId}/>
                            <input name="nickname" type="text" value={''}/>
                            <input name='mobile' type="text" value={isNaN(phoneNum) ? -1 : this.state.phoneNum}/>
                            <input name='phasecourseid' type="text"
                                   value={isNaN(phasecourseid) ? -1 : this.state.phasecourseid}/>
                            <input name='orderTimeEnd' type="text" value={this.state.orderTimeEnd}/>
                            <input name='orderTimeStr' type="text" value={this.state.orderTimeStr}/>
                            <input name='ordersIdStr' type="text" value={this.state.ordersIdStr}/>
                            <input name='payTimeEnd' type="text" value={this.state.payTimeEnd}/>
                            <input name='payTimeStr' type="text" value={this.state.payTimeStr}/>
                            <input name='phaseId' type="text" value={this.state.cphaseId}/>
                            <input name='status' type="text" value={this.state.status}/>
                        </div>
                        <input type="submit" class="ant-btn ant-btn-primary" value="导出数据"/>
                    </form>
                </div>

                <div className="content_" style={{marginTop: 24}}>
                    <Table
                        bordered
                        columns={columns}
                        showHeader={true}
                        rowKey={record => record.id}
                        pagination={false}
                        dataSource={orderList && orderList.rows ? orderList.rows : []}
                        className="table"
                        scroll={{x: 2000}}
                    />
                </div>
                <br />
                <Footer className="footer" style={{backgroundColor: "white"}}>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSize={this.state.pagesize}
                        className="page"
                        showQuickJumper={true}
                        current={this.state.pageno}
                        onChange={this.onChange.bind(this)}
                        total={orderList && orderList.rowCount ? orderList.rowCount : 0}
                    />
                </Footer>
                <Modal
                    visible={this.state.showTuikuan}
                    title="操作"
                    style={{top: 20}}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={1000}>
                    {
                        this.state.showTuikuan ?
                            <RefundInfo commitOver={this.commitOver} refundId={this.state.refundId}
                                        type={this.state.refundType}/>
                            : null
                    }
                </Modal>
            </div>
        );
    }

    commitOver = () => {

        this.setState({
            refundId: -1,
            refundType1: 0, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
            showTuikuan: false, // 展示退款model
        })
        this.getOrderList();
    }

    handleOk = () => {
        this.setState({
            refundId: -1,
            refundType: 0, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
            showTuikuan: false, // 展示退款model
        })
    }

    handleCancel = (e) => {
        this.setState({
            refundId: -1,
            refundType: 0, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
            showTuikuan: false, // 展示退款model
        })
    }

    dingdanChange = value => {
        this.setState({
            status: parseFloat(value),
        })
    };

    chaxun = () => {
        this.onChange(1)
    }
}

function mapStateToProps(state, props) {
    return {
        alist: state.gethuodong,
        user: state.userInfo,
        huodonglist: state.gethuodong,
        orderList: state.GetOrderList.object
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        userInfo: bindActionCreators(userInfo, dispatch),
        gethuodong: bindActionCreators(gethuodong, dispatch),
        updhuodong: bindActionCreators(updhuodong, dispatch),
        getLevelList: bindActionCreators(getLevelList, dispatch),
        adminGetOrderList: bindActionCreators(adminGetOrderList, dispatch),
        GetVerPhaseList: bindActionCreators(GetVerPhaseList, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dingdanliebiao);
