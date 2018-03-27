import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageHeader from '../view/PageHeader'
import {Row, Col, Button, Select, Input, DatePicker, Table, Icon, Form, Modal, Pagination, Layout, message} from 'antd';
import '../home.css'
import {imageUrl} from '../../libs/utils/ImageUtils'
import Http from '../../libs/utils/Http';
import PropTypes from 'prop-types';
import {
    AddCourse, CourseSubmitShenHe, DelSection, DelSectionState,
    GetLevelCourse, GetSectionInfo, GetSectionList, UpdateSection, getLevelList,
} from '../../actions/course'
import {adminGetOrderList, GetVerPhaseList, caiwuWaterList} from "../../actions/financial";
import {cShowlog} from '../../actions/user'

const {Header, Content, Footer} = Layout;
const Option = Select.Option;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

function Format(dateLong, fmt) { //author: meizz
    let date = new Date();
    date.setTime(dateLong)
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

class FinanceWater extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            otherNum: '',
            nickName: '',
            phone: 0,
            guanlianType: -1, // 关联单类型
            guanlianNum: '', // 关联单号
            qishuName: '',
            startData: '',
            endData: '',
            levelList: [],
            qishuList: [],
            levelName: '',
            phaseName: "",
            cLevelId: -1, // 课程难度等级id
            qishuId: 0, // // 期数课程ID
            cphaseId: -1,
            current: 1,
            pageno: 1,
            pagesize: 15,
            paytype: -1, // 支付方式
        }
    }

    componentWillMount() {
        this.getLevelListM()
        this.GetVerPhaseListM();
        this.onChange(1)
    }

    // 期数
    GetVerPhaseListM = () => {
        const {GetVerPhaseList} = this.props;
        GetVerPhaseList().then(data => {
            if (data.meta.code === "0") {
                this.setState({
                    qishuList: data.object ? data.object : []
                });
            }
        });
    };

    getLevelListM = () => {
        const {getLevelList, GetLevelCourse, levelid} = this.props;
        getLevelList().then(data => {
            if (data.meta.code === '0') {
                this.setState({
                    levelList: data.object ? data.object : []
                })
            }
        })
    }

    getCourseListM = () => {
        const {getLevelList, GetLevelCourse} = this.props;
        const {cLevelId} = this.state;
        GetLevelCourse(cLevelId).then(data => {
            if (data.meta.code === '0') {
            }
        })
    }

    onChangeDate = (dates, dateString) => {
        this.setState({
            startData: dateString[0],
            endData: dateString[1]
        });
    };

    render() {

        const {history, caiwuWaterListData,} = this.props;
        let classDara = caiwuWaterListData && caiwuWaterListData.object ? caiwuWaterListData.object : {};

        const columns = [{
            title: '交易时间',
            dataIndex: 'versionName',
            key: 'versionName',
            render: (text, record) => (
                <span>
                    {
                        record.createTime ? Format(record.createTime, 'yyyy-MM-dd hh:mm:ss') : ''
                    }
                </span>
            ),
        }, {
            title: '交易金额(¥)',
            dataIndex: 'tradePrice',
            key: 'tradePrice',
            render: (text, record) => (
                <span>
                    {
                        record.tradePrice ? record.tradePrice / 100 : '0'
                    }
                </span>
            ),
        }, {
            title: '支付方式',
            key: 'payType',
            render: (text, record) => (
                <span>
                    {
                        record.payType === 1 ?
                            '微信'
                            : '其它'
                    }
                </span>
            ),
        }, {
            title: '第三方交易号',
            dataIndex: 'tradeNum',
            key: 'tradeNum',
        }, {
            title: '用户昵称',
            dataIndex: 'user.nickname',
            key: 'nickname',
        }, {
            title: '手机号',
            dataIndex: 'user.mobile',
            key: 'mobile',
        }, {
            title: '关联单类型',
            dataIndex: 'relateType',
            key: 'relateType',
            render: (text, record) => (
                <span>
                    {
                        record.relateType === 0 ? // 0订单1退款单
                            '订单'
                            : record.relateType === 1 ? // 0订单1退款单
                            '退款单'
                            : '其它'
                    }
                </span>
            ),
        }, {
            title: '关联单号',
            dataIndex: 'relateType',
            key: 'relateType',
            render: (text, record) => (
                <span>
                    {
                        record.relateType === 0 ? // 0订单1退款单
                            record.ordersNum ? record.ordersNum : '无'
                            : record.relateType === 1 ? // 0订单1退款单
                            record.redundNum ? record.redundNum : '无'
                            : '无'
                    }
                </span>
            ),
        }, {
            title: '期数课程ID',
            dataIndex: 'phaseCourseId',
            key: 'phaseCourseId',
        }, {
            title: '期数名称',
            dataIndex: 'phaseName',
            key: 'phaseName',
        }, {
            title: '课程难度',
            dataIndex: 'levelName',
            key: 'levelName',
        }
        ];
        const {
            levelList, levelName, phaseName, otherNum, nickName, phone, guanlianType, guanlianNum, qishuName,
            startData, endData, qishuId, qishuList, cphaseId
        } = this.state;
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

        var downloadUrl = '/financial/adminFormExportPayMent';
        return (
            <Content style={{backgroundColor: 'white', margin: 0, padding: 15}}>
                <PageHeader pageName={'财务流水表'}/>
                <div className="my-horizontal-div" style={{marginTop: 15, alignItems: 'center'}}>
                    <div className="my-content-text my-input-before-text2">第三方交易号</div>
                    <div className="my-horizontal-div">
                        <Input
                            value={otherNum}
                            onChange={e => {
                                this.setState({otherNum: e.target.value});
                            }}
                            style={{width: 150}}
                        />
                    </div>
                    <div className="my-content-text my-input-before-text2 margin-left10">用户昵称</div>
                    <div className="my-horizontal-div">
                        <Input
                            value={nickName}
                            onChange={e => {
                                this.setState({nickName: e.target.value});
                            }}
                            style={{width: 150}}
                        />
                    </div>
                    <div className="my-content-text my-input-before-text2 margin-left10">手机号</div>
                    <div className="my-horizontal-div">
                        <Input
                            value={phone === 0 ? "" : phone}
                            type={'number'}
                            onChange={e => {
                                let value = e.target.value
                                if (value.length > 11)
                                    value = value.slice(0, 11)
                                this.setState({phone: value});
                            }}
                            style={{width: 150}}
                        />
                    </div>
                </div>
                <div className="my-horizontal-div" style={{marginTop: 15, alignItems: 'center'}}>
                    <div className="my-content-text my-input-before-text2">关联单类型</div>
                    <div className="my-horizontal-div">
                        <Select defaultValue={'全部'}
                                style={{width: 150}}
                                onChange={(e) => {
                                    this.setState({
                                        guanlianType: e,
                                    })
                                }}>
                            <Option value={-1}>全部</Option>
                            <Option value={0}>订单</Option>
                            <Option value={1}>退款单</Option>
                        </Select>
                    </div>
                    <div className="my-content-text my-input-before-text2 margin-left10">关联单号</div>
                    <div className="my-horizontal-div">
                        <Input
                            disabled={guanlianType === -1}
                            value={guanlianNum}
                            onChange={e => {
                                this.setState({guanlianNum: e.target.value});
                            }}
                            style={{width: 150}}
                        />
                    </div>
                    <div className="my-content-text my-input-before-text2 margin-left10">期数课程ID</div>
                    <div className="my-horizontal-div">
                        <Input
                            value={qishuId === 0 ? '' : qishuId}
                            onChange={e => {
                                this.setState({qishuId: e.target.value});
                            }}
                            style={{width: 150}}
                        />
                    </div>
                </div>
                <div className="my-horizontal-div" style={{marginTop: 15, alignItems: 'center'}}>
                    <div className="my-content-text my-input-before-text2 ">
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
                    <div className="my-content-text my-input-before-text2 margin-left10">课程难度</div>
                    <div className="my-content-text">
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
                    <div className="my-content-text my-input-before-text2 margin-left10">支付方式</div>
                    <div className="my-horizontal-div">
                        <Select defaultValue={'全部'}
                                style={{width: 150}}
                                onChange={(e) => {
                                    this.setState({
                                        paytype: e,
                                    })
                                }}>
                            <Option value={-1}>全部</Option>
                            <Option value={1}>微信</Option>
                        </Select>
                    </div>
                </div>
                <div className="my-horizontal-div" style={{marginTop: 15, alignItems: 'center'}}>
                    <div className="my-content-text my-input-before-text2">
                        交易时间
                    </div>
                    <div className="my-horizontal-div">
                        <RangePicker
                            format="YYYY-MM-DD"
                            placeholder={["开始时间", "结束时间"]}
                            onChange={this.onChangeDate}
                        />
                    </div>
                    <Button onClick={this.chaxun} type="primary" style={{marginLeft: 92}}>
                        查询
                    </Button>
                    <form action={downloadUrl} method="post" style={{marginLeft: "10px"}}>
                        <div style={{width: 0, height: 0, overflow: 'hidden'}}>
                            <input name="levelid" type="text" value={this.state.cLevelId}/>
                            <input name="nickname" type="text" value={this.state.nickName}/>
                            <input name='mobile' type="text" value={isNaN(phone) ? -1 : this.state.phone}/>
                            <input name='phasecourseid' type="text"
                                   value={isNaN(qishuId) ? -1 : this.state.qishuId}/>
                            <input name='paytype' type="text" value={this.state.paytype}/>
                            <input name='phaseid' type="text" value={this.state.cphaseId}/>
                            <input name='relate_type' type="text" value={this.state.guanlianType}/>
                            <input name='relatenum' type="text" value={this.state.guanlianNum}/>
                            <input name='trade_num' type="text" value={this.state.otherNum}/>
                            <input name='tradetimeEnd' type="text" value={this.state.endData}/>
                            <input name='tradetimeStr' type="text" value={this.state.startData}/>
                        </div>
                        <input type="submit" class="ant-btn ant-btn-primary" value="导出数据"/>
                    </form>
                </div>
                <div className="margin-top20">
                    <Table bordered columns={columns} rowKey={record => record.id} pagination={false}
                           dataSource={classDara.rows ? classDara.rows : []} className="table">
                    </Table>
                </div>
                <Footer className="footer" style={{backgroundColor: "white"}}>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSize={this.state.pagesize}
                        className="page"
                        showQuickJumper={true}
                        current={this.state.pageno}
                        onChange={this.onChange.bind(this)}
                        total={classDara && classDara.rowCount ? classDara.rowCount : 0}
                    />
                </Footer>
            </Content>
        );
    }

    chaxun = () => {
        this.onChange(1)
    }

    onChange = page => {
        this.setState({
            pageno: page,
        })
        setTimeout(() => {
            this.getOrderList();
        }, 100)
    };

    // otherNum: '',
    // nickName: '',
    // phone: '',
    // guanlianType: -1, // 关联单类型
    // guanlianNum: '', // 关联单号
    // qishuName: '',
    // startData: '',
    // endData: '',
    // levelList: [],
    // qishuList: [],
    // levelName: '',
    // phaseName: "",
    // cLevelId: 0, // 课程难度等级id
    // qishuId: 0, // // 期数课程ID
    // current: 1,
    // pageno: 1,
    // pagesize: 15,
    getOrderList = () => {
        const {caiwuWaterList} = this.props;
        const {cLevelId, phone, nickName, paytype, otherNum, guanlianType, qishuId, guanlianNum, startData, endData, ordersIdStr, pageno, pagesize, payTimeEnd, payTimeStr, cphaseId,} = this.state;
        caiwuWaterList(
            cLevelId,
            phone,
            nickName,
            pageno,
            pagesize,
            paytype,
            qishuId,
            cphaseId,
            guanlianType,
            guanlianNum,
            otherNum,
            endData,
            startData,
        ).then(data => {
            if (data.meta.code === "0") {
                console.log(data);
            } else {
                message.error(data.meta.message);
            }
        });
    }

    // 确认按钮 这里增加药店
    handleOk = () => {
        this.setState({
            rizhiVisible: false,
        })
    }

    handleCancel = (e) => {
        this.setState({
            rizhiVisible: false,
        })
    }

}


function mapStateToProps(state, props) {
    return {
        caiwuWaterListData: state.caiwuWaterListData,
        gShowLog: state.gShowLog
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        GetLevelCourse: bindActionCreators(GetLevelCourse, dispatch),
        AddCourse: bindActionCreators(AddCourse, dispatch),
        CourseSubmitShenHe: bindActionCreators(CourseSubmitShenHe, dispatch),
        DelSection: bindActionCreators(DelSection, dispatch),
        DelSectionState: bindActionCreators(DelSectionState, dispatch),
        GetSectionList: bindActionCreators(GetSectionList, dispatch),
        GetSectionInfo: bindActionCreators(GetSectionInfo, dispatch),
        UpdateSection: bindActionCreators(UpdateSection, dispatch),
        getLevelList: bindActionCreators(getLevelList, dispatch),
        cShowlog: bindActionCreators(cShowlog, dispatch),
        GetVerPhaseList: bindActionCreators(GetVerPhaseList, dispatch), // 期数
        caiwuWaterList: bindActionCreators(caiwuWaterList, dispatch), // 财务流水
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FinanceWater);