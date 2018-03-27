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
import {userInfo} from "../../actions/user";
import {
    getLevelList
} from "../../actions/course";
import {adminGetOrderList, GetVerPhaseList} from "../../actions/financial";
import {getRefundList, reRefund} from './RefundAction';
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
class RefundManage extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            levelId: -1,
            mobile: 0,
            nickname: "",
            orderTimeEnd: "",
            orderTimeStr: "",
            ordersIdStr: "",
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

            applytimeEnd: "",
            applytimeStr: "",
            refundnum: "",
            refundtimeEnd: "",
            refundtimeStr: "",
            refundType: -1, // 退款类型 // -1 全部

            refundType1: -1, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
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
        const {getRefundList} = this.props;
        const {
            applytimeEnd, applytimeStr, levelId, mobile, nickname, orderTimeEnd, orderTimeStr, ordersIdStr, pageno, pagesize,
            payTimeEnd, payTimeStr, phaseId, refundnum, refundtimeEnd, refundtimeStr, status, refundType
        } = this.state;
        getRefundList(
            applytimeEnd, applytimeStr, levelId, mobile, nickname, orderTimeEnd, orderTimeStr, ordersIdStr, pageno, pagesize,
            payTimeEnd, payTimeStr, phaseId, refundnum, refundtimeEnd, refundtimeStr, status, refundType
        ).then(data => {
            if (data.meta.code === "0") {
            } else {
                // message.error(data.meta.message);
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

    shenqingonChangeDate = (dates, dateString) => {
        this.setState({
            orderTimeStr: dateString[0],
            orderTimeEnd: dateString[1]
        });
    };

    tuikuanonChangeDate = (dates, dateString) => {
        this.setState({
            refundtimeStr: dateString[0],
            refundtimeEnd: dateString[1]
        });
    };

    // 退款失败后点击重新退款
    reRefundM(id) {
        const {reRefund} = this.props;
        reRefund(id).then(data => {
            if (data.meta.code === '0') {
                message.success('重新退款成功')
                this.getOrderList();
            } else {
                message.error(data.meta.message && data.meta.message != '' ? data.meta.message : '重新退款失败')
            }
        }).catch(e => {
            console.log(e)
        })
    }

    render() {

        const {alist, user, refundList} = this.props;
        const {
            dingdanNum,
            qishuId,
            qishuName,
            kechengName,
            nickName,
            phoneNum,
            levelList,
            qishuList,
            cLevelId,
            levelName,
            ordersIdStr,
            phaseId,
            phaseName,
            refundnum
        } = this.state;
        const columns = [
            {
                title: "原订单号",
                dataIndex: "ordersIdStr",
                key: "ordersIdStr"
            },
            {
                title: "退款单号",
                dataIndex: "refundNum",
                key: "refundNum"
            },
            {
                title: "是否无理由退款",
                dataIndex: "refundType",
                key: "refundType",
                render: (text, record) => (
                    <span>
                      {record.refundType == 0 ? "是" : '否'}
                    </span>
                )
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
                title: "退款金额",
                dataIndex: "refundPrice",
                key: "refundPrice",
                render: (text, record) => (
                    <span>
              {record.refundPrice
                  ? '¥' + Math.abs(record.refundPrice / 100)
                  : " "}
            </span>
                )
            },
            {
                title: "审核状态",
                dataIndex: "approveStatus",
                key: "approveStatus",
                render: (text, record) => {
                    switch (record.approveStatus) { // 0 待客服总监审核 1 待财务总监审核 2 驳回 3 退款成功 4 退款失败 5 已取消
                        case 0:
                            return <span>待客服总监审核</span>;
                            break;
                        case 1:
                            return <span>待财务总监审核</span>;
                            break;
                        case 2:
                            return <span>驳回</span>;
                            break;
                        case 3:
                            return <span>退款成功</span>;
                            break;
                        case 4:
                            return <span>退款失败</span>;
                            break;
                        case 5:
                            return <span>已取消</span>;
                            break;
                        case 6:
                            return <span>退款发起成功</span>;
                            break;
                        default:
                            return <span>状态异常</span>;
                    }
                }
            },
            {
                title: "申请时间",
                dataIndex: "applyTime",
                key: "applyTime",
                render: (text, record) => (
                    <span>{record.applyTime ? Format(record.applyTime, "yyyy-MM-dd hh:mm:ss") : ''}</span>
                )
            },
            {
                title: "退款时间",
                dataIndex: "refundTime",
                key: "refundTime",
                render: (text, record) => (
                    <span>{record.refundTime ? Format(record.refundTime, "yyyy-MM-dd hh:mm:ss") : ''}</span>
                )
            },
            {
                title: "操作",
                key: "action",
                render: (text, record) => (
                    <span>
                        {
                            record.refundType === 0 && record.approveStatus != 4 ?
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        this.setState({
                                            refundId: record ? record.refundId : -1,
                                            refundType1: 3, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
                                            showTuikuan: true, // 展示退款model
                                        })
                                    }}
                                >
                                    查看
                                </Button> :
                                record.approveStatus == 0 || record.approveStatus == 1 || record.approveStatus == 3 || record.approveStatus == 5 ?
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            this.setState({
                                                refundId: record ? record.refundId : -1,
                                                refundType1: 3, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单 todo 3
                                                showTuikuan: true, // 展示退款model
                                            })
                                        }}
                                    >
                                        查看
                                    </Button> : record.approveStatus == 2 ?
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            this.setState({
                                                refundId: record ? record.refundId : -1,
                                                refundType1: 2, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
                                                showTuikuan: true, // 展示退款model
                                            })
                                        }}
                                    >
                                        查看
                                    </Button> : record.approveStatus == 4 ?
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            this.reRefundM(record.refundId)
                                        }}
                                    >
                                        重新退款
                                    </Button> : null
                        }
                    </span>
                )
            }
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
        let downloadUrl = '/customerservice/adminFormExportUserOrders';

        return (
            <div style={{padding: 15}}>
                <PageHeader pageName={"退款管理"}/>
                <div
                    className="my-horizontal-div"
                    style={{marginTop: 15, alignItems: "center"}}
                >
                    <div className="my-content-text my-input-before-text1 ">原订单号</div>
                    <div className="my-horizontal-div margin-left101">
                        <Input
                            value={ordersIdStr}
                            onChange={e => {
                                this.setState({ordersIdStr: e.target.value});
                            }}
                            style={{width: 150}}
                        />
                    </div>
                    <div className="my-content-text my-input-before-text1 margin-left10">退款单号</div>
                    <div className="my-horizontal-div margin-left101">
                        <Input
                            value={refundnum}
                            onChange={e => {
                                this.setState({refundnum: e.target.value});
                            }}
                            style={{width: 150}}
                        />
                    </div>
                    <div className="my-content-text margin-left10">是否无理由退款</div>
                    <div className="my-horizontal-div margin-left101 margin-left10">
                        <Select
                            defaultValue={"否"}
                            style={{width: 150}}
                            onChange={e => {
                                this.setState({
                                    refundType: e
                                });
                            }}
                        >
                            <Option value={-1}>全部</Option>
                            <Option value={0}>是</Option>
                            <Option value={1}>否</Option>
                        </Select>
                    </div>
                </div>
                <div
                    className="my-horizontal-div"
                    style={{marginTop: 15, alignItems: "center"}}
                >
                    <div className="my-content-text my-input-before-text1 ">
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
                    <div className="my-content-text my-input-before-text1  margin-left10">
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
                </div>
                <div
                    className="my-horizontal-div"
                    style={{marginTop: 15, alignItems: "center"}}
                >
                    <div className="my-content-text my-input-before-text1 ">
                        申请时间
                    </div>
                    <div className="my-horizontal-div margin-left101">
                        <RangePicker
                            format="YYYY-MM-DD"
                            placeholder={["开始时间", "结束时间"]}
                            onChange={this.shenqingonChangeDate}
                        />
                    </div>
                    <div className="my-content-text my-input-before-text1 margin-left10 ">
                        退款时间
                    </div>
                    <div className="my-horizontal-div margin-left101">
                        <RangePicker
                            format="YYYY-MM-DD"
                            placeholder={["开始时间", "结束时间"]}
                            onChange={this.tuikuanonChangeDate}
                        />
                    </div>
                </div>
                <div
                    className="my-horizontal-div"
                    style={{marginTop: 15, alignItems: "center"}}
                >
                    <div className="my-content-text my-input-before-text1 ">
                        审核状态
                    </div>
                    <div className="my-horizontal-div margin-left101">
                        <Select
                            defaultValue="全部"
                            style={{width: 150}}
                            onChange={(e) => {
                                this.setState({status: e});
                            }}
                        >
                            <Option value="-1">全部</Option>
                            <Option value="0">待客服总监审核</Option>
                            <Option value="1">待财务总监审核</Option>
                            <Option value="2">驳回</Option>
                            <Option value="3">退款成功</Option>
                            <Option value="4">退款失败</Option>
                            <Option value="5">已取消</Option>
                        </Select>
                    </div>
                    <Button onClick={this.chaxun} type="primary" style={{marginLeft: 92}}>
                        查询
                    </Button>
                    <form action={downloadUrl} method="post" style={{marginLeft: "10px"}}>
                        <div style={{width: 0, height: 0, overflow: 'hidden'}}>
                            <input name="ordersIdStr" type="text" value={this.state.ordersIdStr}/>
                            <input name="refundnum" type="text" value={this.state.refundnum}/>
                            <input name='refundType' type="text" value={this.state.refundType}/>
                            <input name='phaseId' type="text"
                                   value={isNaN(phaseId) ? -1 : this.state.phaseId}/>
                            <input name='levelId' type="text" value={this.state.levelId}/>
                            <input name='nickname' type="text" value={this.state.nickname}/>
                            <input name='mobile' type="text" value={this.state.mobile}/>
                            <input name='applytimeStr' type="text" value={this.state.applytimeStr}/>
                            <input name='applytimeEnd' type="text" value={this.state.applytimeEnd}/>
                            <input name='refundtimeStr' type="text" value={this.state.refundtimeStr}/>
                            <input name='refundtimeEnd' type="text" value={this.state.refundtimeEnd}/>
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
                        dataSource={refundList && refundList.object && refundList.object.rows ? refundList.object.rows : []}
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
                        total={refundList && refundList.object && refundList.object.rowCount ? refundList.object.rowCount : 0}
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
                                        type={this.state.refundType1}/>
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
            refundType1: 0, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
            showTuikuan: false, // 展示退款model
        })
    }

    handleCancel = (e) => {
        this.setState({
            refundId: -1,
            refundType1: 0, // 0 退款申请 1 退款审核 2 退款申请被驳回 3 查看退款单
            showTuikuan: false, // 展示退款model
        })
    }

    dingdanChange = value => {
        this.setState({
            status: value,
        })
    };

    chaxun = () => {
        this.onChange(1)
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.userInfo,
        orderList: state.GetOrderList.object,
        refundList: state.refundList,
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        userInfo: bindActionCreators(userInfo, dispatch),
        getLevelList: bindActionCreators(getLevelList, dispatch),
        adminGetOrderList: bindActionCreators(adminGetOrderList, dispatch),
        GetVerPhaseList: bindActionCreators(GetVerPhaseList, dispatch),
        getRefundList: bindActionCreators(getRefundList, dispatch),
        reRefund: bindActionCreators(reRefund, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RefundManage);
