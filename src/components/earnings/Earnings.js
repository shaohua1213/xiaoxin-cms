import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PageHeader from "../view/PageHeader";
import {
    Row,
    Col,
    Button,
    Select,
    Input,
    DatePicker,
    Table,
    Icon,
    Form,
    Modal,
    Pagination,
    Layout,
    Divider,
    message
} from "antd";
import "../home.css";
import {imageUrl} from "../../libs/utils/ImageUtils";
import Http from "../../libs/utils/Http";
import PropTypes from "prop-types";
import {
    AddCourse,
    CourseSubmitShenHe,
    DelSection,
    DelSectionState,
    GetLevelCourse,
    GetSectionInfo,
    GetSectionList,
    UpdateSection,
    getLevelList,
    getLevelList1,
    adminConfirmList
} from "../../actions/course";
import {adminGetOrderList, GetVerPhaseList} from "../../actions/financial";
import {cShowlog} from "../../actions/user";

const {Header, Content, Footer} = Layout;
const Option = Select.Option;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

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
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
}

class Earnings extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            otherNum: "",
            nickName: "",
            phone: "",
            guanlianType: 0, // 关联单类型
            guanlianNum: "", // 关联单号
            qishuName: "",
            startData: "",
            endData: "",
            levelList: [],
            qishuList: [],
            levelName: '全部',
            phaseName: "",
            cLevelId: -1, // 课程难度等级id
            qishuId: 0, // // 期数课程ID
            current: 1,
            pageno: 1,
            pagesize: 15,
            shujuStyle: {
                display: 'none'
            }
        };
    }

    componentWillMount() {
        // this.getLevelListM();
        this.GetVerPhaseListM();
        // this.onChange(1);
    }

    // 期数
    GetVerPhaseListM = () => {
        const {GetVerPhaseList} = this.props;
        GetVerPhaseList().then(data => {
            if (data.meta.code === "0") {
                let qishuList1 = [];
                if (data.object.length > 0) {
                    let l = {phaseId: 0, phaseName: "全部"};
                    for (let i = 0; i <= data.object.length; i++) {
                        if (i === 0) {
                            qishuList1.push(l);
                        }
                        else {
                            qishuList1.push(data.object[i - 1]);
                        }
                    }
                }
                let l = {
                    levelId: -1,
                    levelName: "全部"
                };
                this.setState({
                    qishuList: qishuList1,
                    qishuId: 0,
                    phaseName: '全部',
                    cphaseId: 0,
                    levelList:[l]
                });
                // if (data.object && data.object.length > 0) {
                //     this.getLevelListM(data.object[0].phaseId)
                // }
            }
        });
    };

    getLevelListM(id) {
        const {getLevelList1, GetLevelCourse, levelid} = this.props;
        getLevelList1(id).then(data => {
            if (data.meta.code === "0") {
                let levelList1 = [];
                if (data.object.length > 0) {
                    let l = {
                        levelId: -1,
                        levelName: "全部"
                    };
                    for (let i = 0; i <= data.object.length; i++) {
                        if (i === 0) {
                            levelList1.push(l);
                        } else {
                            levelList1.push(data.object[i - 1]);
                        }
                    }

                }else {
                    let l = {
                        levelId: -1,
                        levelName: "全部"
                    };
                    levelList1.push(l);
                }
                this.setState({
                    levelList: levelList1,
                    // cLevelId: data.object&&data.object.length>0 ? data.object[0].levelId : 0,
                    // levelName: data.object&&data.object.length>0 ? data.object[0].levelName : '',
                });
            }
        });
    };

    getCourseListM = () => {
        const {getLevelList, GetLevelCourse} = this.props;
        const {cLevelId} = this.state;
        GetLevelCourse(cLevelId).then(data => {
            if (data.meta.code === "0") {
            }
        });
    };

    onChangeDate = (dates, dateString) => {
        this.setState({startData: dateString[0], endData: dateString[1]});
    };

    render() {
        const {history, GetLevelCourseD} = this.props;
        console.log(GetLevelCourseD)
        let classDara = GetLevelCourseD && GetLevelCourseD.object
            ? GetLevelCourseD.object
            : undefined;
        console.log(classDara)
        const columns1 = [
            {
                title: "期初未确认收入",
                dataIndex: "beginunconfirmprice",
                key: "beginunconfirmprice",
                render: (text, record) => (
                    <span>
                        ¥{record.beginunconfirmprice / 100}
                    </span>
                )
            }, {
                title: "当前销售额",
                dataIndex: "saleprice",
                key: "saleprice",
                render: (text, record) => (
                    <span>
                        ¥{record.saleprice / 100}
                    </span>
                )
            }, {
                title: "当前确认收入",
                dataIndex: "confirmprice",
                key: "confirmprice",
                render: (text, record) => (
                    <span>
                        ¥{record.confirmprice / 100}
                    </span>
                )
            }, {
                title: "当前未确认收入",
                dataIndex: "endunconfirmprice",
                key: "endunconfirmprice",
                render: (text, record) => (
                    <span>
                        ¥{record.endunconfirmprice / 100}
                    </span>
                )
            }
        ];

        const columns = [
            {
                title: "期数名称",
                dataIndex: "phasename",
                key: "phasename",
                render: (text, record) => (
                    <span>
                        {record.phasename
                            ? record.phasename
                            : ""}
                    </span>
                )
            }, {
                title: "课程名称",
                dataIndex: "levelname",
                key: "levelname",
                render: (text, record) => (
                    <span>
                        {record.levelname
                            ? record.levelname
                            : ""}
                    </span>
                )
            }, {
                title: "期初未确认收入",
                key: "beginunconfirmprice",
                render: (text, record) => (
                    <span>
                        ¥{record.beginunconfirmprice / 100}
                    </span>
                )
            }, {
                title: "当前销售额",
                dataIndex: "saleprice",
                key: "saleprice",
                render: (text, record) => (
                    <span>
                        ¥{record.saleprice / 100}
                    </span>
                )
            }, {
                title: "当前确认收入",
                dataIndex: "confirmprice",
                key: "confirmprice",
                render: (text, record) => (
                    <span>
                        ¥{record.confirmprice / 100}
                    </span>
                )
            }, {
                title: "当前未确认收入",
                dataIndex: "endunconfirmprice",
                key: "endunconfirmprice",
                render: (text, record) => (
                    <span>
                        ¥{record.endunconfirmprice / 100}
                    </span>
                )
            }
        ];
        const {
            levelList,
            levelName,
            phaseName,
            otherNum,
            nickName,
            phone,
            guanlianType,
            guanlianNum,
            qishuName,
            startData,
            endData,
            qishuId,
            qishuList
        } = this.state;
        // 期数内容
        let qishuList1 = [];
        if (qishuList.length > 0) {
            qishuList1 = qishuList;
        }

        let levelList1 = levelList;


        let downloadUrl = '/financial/adminExportConfirmList';
        return (
            <Content
                style={{
                    backgroundColor: "white",
                    margin: 0,
                    padding: 15
                }}>
                <PageHeader pageName={"确认收入统计"}/>

                <div
                    className="my-horizontal-div"
                    style={{
                        marginTop: 15,
                        alignItems: "center"
                    }}>
                    <div className="my-content-text my-input-before-text2 ">期数名称</div>
                    <div className="my-horizontal-div margin-left101">
                        {qishuList1.length > 0
                            ? (
                            <Select
                                defaultValue={phaseName != ""
                                    ? phaseName
                                    : qishuList1[0].phaseName}
                                style={{
                                    width: 150
                                }}
                                onChange={e => {
                                    this.setState({
                                        cphaseId: e.phaseId,
                                        levelList: []
                                    });
                                    if(e.phaseId!=0){
                                        this.getLevelListM(e.phaseId)
                                    }else {
                                        setTimeout(()=>{
                                            let l = {
                                                levelId: -1,
                                                levelName: "全部"
                                            };
                                            this.setState({
                                                cphaseId: e.phaseId,
                                                levelList: [l],
                                                cLevelId:-1,
                                            });
                                        },100)
                                    }
                                }}>
                                {qishuList1.map(data => {
                                    return <Option value={data}>{data.phaseName}</Option>;
                                })}
                            </Select>
                        )
                            : (
                            <div
                                className="my-content-text"
                                style={{
                                    width: 150
                                }}>
                                暂无数据
                            </div>
                        )}
                    </div>
                    <div className="my-content-text my-input-before-text2 margin-left10">
                        课程难度
                    </div>
                    <div className="my-content-text">
                        {levelList1.length > 0
                            ? (
                            <Select
                                defaultValue={levelList1[0]}
                                style={{width: 150}}
                                onChange={e => {
                                    this.setState({cLevelId: e.levelId});
                                }}>
                                {levelList1.map(data => {
                                    return <Option value={data}>{data.levelName}</Option>;
                                })}
                            </Select>
                        )
                            : (
                            <div
                                className="my-content-text"
                                style={{
                                    width: 150
                                }}>
                                暂无数据
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className="my-horizontal-div"
                    style={{
                        marginTop: 15,
                        alignItems: "center"
                    }}>
                    <div className="my-content-text my-input-before-text2">交易日期</div>
                    <div className="my-horizontal-div">
                        <RangePicker
                            format="YYYY-MM-DD"
                            placeholder={["开始时间", "结束时间"]}
                            onChange={this.onChangeDate}/>
                    </div>
                    <Button
                        onClick={this.chaxun}
                        type="primary"
                        style={{
                            marginLeft: 92
                        }}>
                        查询
                    </Button>
                </div>
                <Divider dashed/>
                {  <div style={this.state.shujuStyle}>
                    <div className="margin-top20">
                        <Table
                            bordered
                            columns={columns1}
                            rowKey={record => record.id}
                            pagination={{pageSize: 15, showTotal: total => `共 ${total} 条`}}
                            dataSource={classDara && classDara.count
                                ? classDara.count
                                : []}
                            className="table"/>
                    </div>
                    <Divider dashed/>
                    <form
                        action={downloadUrl}
                        method="post"
                        style={{
                            marginLeft: "10px"
                        }}>
                        <div
                            style={{
                                width: 0,
                                height: 0,
                                overflow: 'hidden'
                            }}>
                            <input name='phaseid' type="text" value={this.state.qishuId}/>
                            <input name='levelid' type="text" value={this.state.cLevelId}/>
                            <input name='tradetimeStr' type="text" value={this.state.startData}/>
                            <input name='tradetimeEnd' type="text" value={this.state.endData}/>

                        </div>
                        <input disabled={classDara === undefined} type="submit" class="ant-btn ant-btn-primary"
                               value="导出数据"/>
                    </form>

                    <div className="margin-top20">
                        <Table
                            bordered
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{pageSize: 15, showTotal: total => `共 ${total} 条`}}
                            dataSource={classDara && classDara.confirmList
                                ? classDara.confirmList
                                : []}
                            className="table"/>
                    </div>
                    <Footer
                        className="footer"
                        style={{
                            backgroundColor: "white"
                        }}>
                    </Footer>
                </div>
                }
            </Content>
        );
    }

    getEarnings = () => {
        const {adminConfirmList} = this.props;
        let phaseid = this.state.cphaseId;
        adminConfirmList(phaseid, this.state.cLevelId, this.state.startData, this.state.endData).then(data => {
            if (data.meta.code === '0') {
                console.log(data);
            }
        })
    }
    chaxun = () => {
        this.setState({
            shujuStyle: {
                display: 'block'
            }
        })
        this.onChange(1);
        this.getEarnings();
    };

    onChange = page => {
        this.setState({pageno: page});
        setTimeout(() => {
            this.getOrderList();
        }, 100);
    };

    getOrderList = () => {
        // const { adminGetOrderList } = this.props; adminGetOrderList(
        // this.state.cLevelId,     this.state.phoneNum,     this.state.nickName,
        // this.state.orderTimeEnd,     this.state.orderTimeStr, this.state.ordersIdStr,
        //     this.state.pageno,     this.state.pagesize, this.state.payTimeEnd,
        // this.state.payTimeStr,     this.state.cphaseId,  this.state.status
        // ).then(data => {     if (data.meta.code === "0") { console.log(data);     }
        // else {         message.error(data.meta.message); } });
    };

    // 确认按钮 这里增加药店
    handleOk = () => {
        this.setState({rizhiVisible: false});
    };

    handleCancel = e => {
        this.setState({rizhiVisible: false});
    };
}

function mapStateToProps(state, props) {
    return {GetLevelCourseD: state.adminConfirmList, gShowLog: state.gShowLog};
}

function mapDispatchToProps(dispatch, props) {
    return {
        adminConfirmList: bindActionCreators(adminConfirmList, dispatch),
        GetLevelCourse: bindActionCreators(GetLevelCourse, dispatch),
        AddCourse: bindActionCreators(AddCourse, dispatch),
        CourseSubmitShenHe: bindActionCreators(CourseSubmitShenHe, dispatch),
        DelSection: bindActionCreators(DelSection, dispatch),
        DelSectionState: bindActionCreators(DelSectionState, dispatch),
        GetSectionList: bindActionCreators(GetSectionList, dispatch),
        GetSectionInfo: bindActionCreators(GetSectionInfo, dispatch),
        UpdateSection: bindActionCreators(UpdateSection, dispatch),
        getLevelList: bindActionCreators(getLevelList, dispatch),
        getLevelList1: bindActionCreators(getLevelList1, dispatch),
        cShowlog: bindActionCreators(cShowlog, dispatch),
        GetVerPhaseList: bindActionCreators(GetVerPhaseList, dispatch) // 期数
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Earnings);
