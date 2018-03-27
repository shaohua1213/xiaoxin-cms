import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageHeader from '../view/PageHeader'
import {Row, Col, Button, Select, Input, DatePicker, Table, Icon, Form, Modal, Pagination, Layout} from 'antd';
import '../home.css'
import {imageUrl} from '../../libs/utils/ImageUtils'
import Http from '../../libs/utils/Http';
import PropTypes from 'prop-types';
import {shoumaiList,qishuXinxi} from './ShouMaiAction'
import {cShowlog} from '../../actions/user'
import {priceYuan2Fen,priceFen2Yuan} from '../../libs/utils/PriceUtils'

const { Header, Footer, Sider, Content } = Layout;
const Option = Select.Option;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

const pageSize = 15;
const rowCount = 1; // 总页数
const current = 1; // 当前页

function Format1(dateLong, fmt) { //author: meizz
    let date = new Date();
    date.setTime(dateLong)
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
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

function Format(date, fmt) { //author: meizz
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
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

// 售卖方式审核 -- 产品
class ShoumaiList1 extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            teacherHeaderUrl: '',
            showkechengEdit: false,
            rowCount: rowCount,
            current: current,
            pageSize: pageSize,
            pageNo: 1,
            bmstrDate1: '',
            bmstrDate2: '',
            bmendDate1: '',
            bmendDate2: '',
            kkendDate: '',
            kkstrDate: '',
            phaseid: '',
            phasename: '',
            state: -1,
            verifystate: 3,
            startendOpen: false,
            endendOpen: false,
            kkendOpen: false,
            rizhiVisible:false,
        }
    }

    componentWillMount() {
        this.chaxun()
    }

    handleImageUpload(e) {
        e.preventDefault()
        let file = e.target
        console.log(file.value)
        this.setState({
            teacherHeaderUrl: file.value,
        })
        // todo
        Http.post("/qyxing_baoming/api/upload", file, this.callback.bind(this), this.error)
    }

    error() {
        console.log('上传失败')
    }

    callback(result) {
        if (result.code === 0) { // 设置相应老师的头像
            const {setHeadUrl} = this.props;
            const {getInfo} = this.props;
            let data = getInfo ? getInfo.data : undefined
            setHeadUrl(data.nickname, data.sex, result.data.url).then((data) => {
                console.log(data)
                if (data.code === 0) {
                    this.getUserInfoM();
                } else {
                }
            })
        }
    }

    onChangeDateStr = (dates, dateString) => {

        this.setState({
            bmstrDate1: dateString[0],
            bmstrDate2: dateString[1]
        });
    };
    onChangeDateEnd = (dates, dateString) => {
        console.log(dates, dateString,dateString[0])
        this.setState({
            bmendDate1: dateString[0],
            bmendDate2: dateString[1]
        });
    };
    onChangeDateKk = (dates, dateString) => {
        console.log(dates, dateString,dateString[0])
        this.setState({
            kkstrDate: dateString[0],
            kkendDate: dateString[1]
        });
    };
    onChangeDate = (e, dateString,s) => {
        this.setState({
            [e]: s
        });
    };

    handleStartOpenChange = (e,open) => {
        if (!open) {
            this.setState({ [e]: true });
        }
    }

    handleEndOpenChange = (e,open) => {
        this.setState({ [e]: open });
    }


    // 查询
    chaxun = () => {
        this.setState({current: 1})
        this.getDate()
    }

    // 日志
    chakanrizhi = () => {

    }
    getDate = () => {
        const {shoumaiList} = this.props;
        const {bmstrDate1 , bmstrDate2,bmendDate1, bmendDate2,kkendDate ,kkstrDate ,pageNo, pageSize, phaseid, phasename, state, verifystate} = this.state;

        shoumaiList(bmstrDate1 , bmstrDate2,bmendDate1, bmendDate2,kkendDate ,kkstrDate, pageNo, pageSize, phaseid, phasename, state, verifystate).then((data) => {
            console.log(data)
        })
    }

    // 获取期数信息
    getQishuXinxi = (phaseId) =>{
        const {qishuXinxi} = this.props;
        qishuXinxi(phaseId).then((data)=>{
            console.log(data)
        })

    }


    showLog(id){
        this.setState({
            rizhiVisible:true,
        })
        const {cShowlog} = this.props;
        cShowlog(5,id).then(data => {
            console.log(data)
        })
    }

    render() {

        const {history, showKechengEdit, getShoumaiList,qishuData,canEdit} = this.props;
        let classes = ['系统课程level1', '系统课程level2', '系统课程level3', '系统课程level4', '系统课程level5',];

        const columns = [
            {
                title: "期数ID",
                dataIndex: "phaseId",
                width: "9%",
                key: "phaseId"
            },
            {
                title: "期数名称",
                dataIndex: "phaseName",
                key: "phaseName",
                width: "9%"
            },
            {
                title: "报名开始",
                dataIndex: "userid",
                key: "userid",
                width: "9%",
                render: (text, record) => {
                    let date = new Date()
                    date.setTime(record.regBeginDate)
                    let t = Format(date, 'yyyy-MM-dd HH:mm:ss')
                    return (
                        <span>
                        {t}
                    </span>
                    )
                }
            },
            {
                title: "报名截止",
                dataIndex: "phonenum",
                key: "phonenum",
                width: "9%",
                render: (text, record) => {
                    let date = new Date()
                    date.setTime(record.regEndDate)
                    let t = Format(date, 'yyyy-MM-dd HH:mm:ss')
                    return (
                        <span>
                        {t}
                    </span>
                    )
                }
            },
            {
                title: "正式开课",
                dataIndex: "userid",
                key: "userid",
                width: "9%",
                render: (text, record) => {
                    let date = new Date()
                    date.setTime(record.classBeginDate)
                    let t = Format(date, 'yyyy-MM-dd HH:mm:ss')
                    return (
                        <span>
                                {t}
                            </span>
                    )
                }
            },
            {
                title: "价格",
                dataIndex: "discountPrice",
                key: "discountPrice",
                width: "9%",
                render: (text, record) => {
                    return (
                        <span>
                            ¥{priceFen2Yuan(record.discountPrice)}
                        </span>
                    )
                }
            },
            {
                title: "原价",
                dataIndex: "originalPrice",
                key: "originalPrice",
                width: "9%",
                render: (text, record) => {
                    return (
                        <span>
                            ¥{priceFen2Yuan(record.originalPrice)}
                        </span>
                    )
                }
            },
            {
                title: "期数状态",
                dataIndex: "wxuid",
                key: "wxuid",
                width: "9%",
                render: (text, record) => {
                    return (
                        <span>
                        {record.status === 0 ? '新建中' : record.status === 1 ? '已上架' : record.status === 1 ? '已下架' : ''}
                    </span>
                    )
                }
            },
            {
                title: "审核状态",
                dataIndex: "wxuid",
                key: "wxuid",
                width: "9%",
                render: (text, record) => {
                    return (
                        <span>
                        {record.approveStatus === 0 ? '待提交' :
                            record.approveStatus === 1 ? '待产品审核' :
                                record.approveStatus === 2 ? '待财务审核' :
                                    record.approveStatus === 3 ? '产品审核通过' :
                                        record.approveStatus === 4 ? '审核通过' :
                                            record.approveStatus === 5 ? '产品审核未通过' :
                                                record.approveStatus === 6 ? '财务审核未通过' :
                                                    ''}
                    </span>
                    )
                }
            },
            {
                title: "上架日期",
                dataIndex: "wxuid",
                key: "wxuid",
                width: "9%",
                render: (text, record) => {
                    let date = new Date()
                    date.setTime(record.createTime)
                    let t = Format(date, 'yyyy-MM-dd')
                    return (
                        <span>
                                {t}
                            </span>
                    )
                }
            },
            {
                title: "操作",
                key: "action",
                render: (text, record) => (
                    <span>
                        <Button
                            type="primary" style={{margin: 5}}
                            onClick={() => {
                                // 这里判断角色
                                showKechengEdit()
                                canEdit(record.approveStatus != 2&&record.approveStatus != 3)
                                qishuData(record)
                            }}
                        >
                            {
                                (record.approveStatus === 2||record.approveStatus === 3)?'审核':'查看'
                            }
                        </Button>
                        <Button type="primary"
                                onClick={this.showLog.bind(this, record.phaseId)}
                                style={{margin: 5}}>日志</Button>
                    </span>
                )
            }
        ];

        const {phaseid,phasename,state,verifystate,kkendOpen,startendOpen,endendOpen} = this.state;

        return (
            <Content style={{padding: 15,backgroundColor:'white',margin:0}}>
                <PageHeader pageName={'期数管理审核'}/>
                <div className="my-horizontal-div" style={{marginTop: 10, alignItems: 'center'}}>
                    <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>期数ID</div>
                        <Input value={phaseid} onChange={(e) => {
                            this.setState({phaseid: e.target.value})
                        }} style={{width: 200}}/>
                    </div>
                    <div className="my-horizontal-div margin-left10" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>期数名称</div>
                        <Input
                            placeholder="统一格式：第3期"
                            maxLength={10}
                            value={phasename} onChange={(e) => {
                            this.setState({phasename: e.target.value})
                        }} style={{width: 200}}/>
                    </div>
                </div>
                <div className="my-horizontal-div" style={{marginTop: 10, alignItems: 'center'}}>
                    <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>报名开始</div>
                        <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                            <RangePicker
                                format="YYYY-MM-DD"
                                placeholder={["开始时间", "结束时间"]}
                                onChange={this.onChangeDateStr}
                                style={{ width: 250 }}
                            />
                        </div>
                    </div>
                    <div className="my-horizontal-div margin-left10" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>报名截止</div>
                        <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                            <RangePicker
                                format="YYYY-MM-DD"
                                placeholder={["开始时间", "结束时间"]}
                                onChange={this.onChangeDateEnd}
                                style={{ width: 250 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="my-horizontal-div" style={{marginTop: 10, alignItems: 'center'}}>
                    <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>正式开课</div>
                        <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                            <RangePicker
                                format="YYYY-MM-DD"
                                placeholder={["开始时间", "结束时间"]}
                                onChange={this.onChangeDateKk}
                                style={{ width: 250 }}
                            />
                        </div>
                    </div>
                    <div className="my-horizontal-div margin-left10" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>期数状态</div>
                        <Select defaultValue={'全部'} style={{width: 100}}
                                onChange={(e) => {
                                    this.setState({state:e})
                                }}>
                            <Option value={-1}>全部</Option>
                            <Option value={0}>新建中</Option>
                            <Option value={1}>已上架</Option>
                            <Option value={2}>已下架</Option>
                        </Select>
                    </div>
                    <div className="my-horizontal-div margin-left10" style={{alignItems: 'center'}}>
                        <div className="my-content-text " style={{width: 74}}>审核状态</div>
                        <Select defaultValue={'待财务审核'} style={{width: 200}}
                                onChange={(e) => {
                                    this.setState({verifystate:e})
                                }}>
                            <Option value={-1}>全部</Option>
                            <Option value={0}>待提交</Option>
                            <Option value={1}>待产品审核</Option>
                            <Option value={3}>待财务审核</Option>
                            <Option value={3}>产品审核通过</Option>
                            <Option value={4}>财务审核通过</Option>
                            <Option value={5}>产品审核未通过</Option>
                            <Option value={6}>财务审核未通过</Option>
                        </Select>
                    </div>
                    <Button type='primary' className='margin-left10' style={{marginLeft: 20}}
                            onClick={this.chaxun}>查询</Button>
                </div>
                <div className="margin-top10" style={{}}>
                    <Table bordered columns={columns} rowKey={record => record.id} pagination={false}
                           dataSource={getShoumaiList && getShoumaiList.object && getShoumaiList.object.rows ? getShoumaiList.object.rows : []}
                           className="table">
                    </Table>
                    <div className="margin-top10 my-div" style={{alignItems: 'center', flexDirection: 'column'}}>
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            showQuickJumper defaultCurrent={1}
                            pageSize={this.state.pageSize}
                            current={this.state.pageNo}
                            total={getShoumaiList != undefined && getShoumaiList.object ? getShoumaiList.object.rowCount : 0}
                            onChange={this.pageChange.bind(this)}
                            className="page"/>
                    </div>
                </div>
                <Modal
                    visible={this.state.rizhiVisible}
                    title="日志"
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                    footer={null}
                    width={500}>
                    <div style={{width:'100%',height:'60vh',overflow:'scroll'}}>
                        <div>
                            {
                                this.props.gShowLog&&this.props.gShowLog.object&&this.props.gShowLog.object.length>0?
                                    this.props.gShowLog.object.map(data=>{
                                        return(
                                            <div>
                                                {
                                                    Format1(data.createTime, 'yyyy-MM-dd HH:mm:ss')+'   '+data.logRemark
                                                }
                                            </div>
                                        )
                                    }):'无'
                            }
                        </div>
                    </div>
                </Modal>
            </Content>
        );
    }


    // 确认按钮 这里增加药店
    handleOk1 = () => {
        this.setState({
            rizhiVisible: false,
        })
    }

    handleCancel1 = (e) => {
        this.setState({
            rizhiVisible: false,
        })
    }

    // 底部页数字改变
    pageChange(e) {
        this.state.pageNo = e;
        this.state.current = e;
        this.getDate()
    }

}


ShoumaiList1.propTypes = {
    showKechengEdit: PropTypes.object.isRequired, // 方法
    qishuData: PropTypes.object.isRequired, // 方法
    canEdit: PropTypes.object.isRequired, // 方法
}

function mapStateToProps(state, props) {
    return {
        getShoumaiList: state.getShoumaiList,
        gShowLog: state.gShowLog
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        shoumaiList: bindActionCreators(shoumaiList, dispatch),
        qishuXinxi: bindActionCreators(qishuXinxi, dispatch),
        cShowlog: bindActionCreators(cShowlog, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShoumaiList1);