import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageHeader from '../view/PageHeader'
import {Row, Col, Button, Select, Input, DatePicker, Table, Icon, Form, Modal, Pagination, Layout,message} from 'antd';
import '../home.css'
import {imageUrl} from '../../libs/utils/ImageUtils'
import Http from '../../libs/utils/Http';
import PropTypes from 'prop-types';
import {
    AddCourse, CourseSubmitShenHe, DelSection, DelSectionState,
    GetLevelCourse, GetSectionInfo, GetSectionList, UpdateSection, getLevelList,
} from '../../actions/course'
import {cShowlog} from '../../actions/user'

const {Header, Content, Footer} = Layout;
const Option = Select.Option;

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

class KechengBanbenList extends Component {

    constructor(props, context) {
        super(props);
        console.log('--KechengBanbenList--',this.props.clevelid)
        this.state = {
            levelName: '',
            levelQrcodeUrl: '',
            showkechengEdit: false,
            rizhiVisible: false,
            levelList: [],
            cLevelId: this.props.clevelid?this.props.clevelid:-1,
        }
    }

    componentDidMount() {
        this.getLevelListM()
    }

    getLevelListM = () => {
        const {getLevelList, GetLevelCourse,levelid} = this.props;
        getLevelList().then(data => {
            if (data.meta.code === '0') {
                if(this.props.clevelid!=-1){
                    for(let l of data.object){
                        if(this.props.clevelid===l.levelId){
                            this.setState({
                                levelName:l.levelName,
                                cLevelId:l.levelId,
                            })
                        }
                    }
                }
                // 设置全局的 levelid
                setTimeout(() => {
                    this.setState({
                        levelQrcodeUrl: data.object && data.object.length > 0 ? data.object[0].levelQrcodeUrl?data.object[0].levelQrcodeUrl : '': '',
                        levelList: data.object ? data.object : []
                    })
                    this.getCourseListM()
                }, 100)
            }
        })
    }

    getCourseListM = () => {
        const {getLevelList, GetLevelCourse} = this.props;
        const {cLevelId} = this.state;
        GetLevelCourse(cLevelId,1).then(data => {
        })
    }


    handleImageUpload(e) {
        e.preventDefault()
        let file = e.target
        // todo
        Http.post("/admin/upload?id="+this.state.cLevelId, file, this.callback.bind(this), this.error)
    }

    error() {
        console.log('上传失败')
    }

    callback(result) {
        console.log(result)
        if (result.meta.code === '0') { // 设置相应老师的头像
            this.setState({
                levelQrcodeUrl:result.meta.message,
            })
        }
    }

    //修改名称
    handleUpname(power, id, name) {
        this.setState({updatemodal: true, idlist: power, updid: id, updname: name});
    }
    //提交审核
    commitShenhe(id) {
        const {CourseSubmitShenHe} = this.props;
        CourseSubmitShenHe(id).then(data=>{
            console.log(data)
            if (data.meta.code==='0'){
                message.success('提交审核成功')
            }else {
                Modal.error({
                    title:'错误提示',
                    content:data.meta.message && data.meta.message != '' ? data.meta.message : '提交审核失败',
                });
            }
        })
    }
    // type 1下架 / 2上架
    soldOut(id,type) {
        const {DelSectionState} = this.props;
        DelSectionState(id,type).then(data=>{
            console.log(data)
            if (data.meta.code==='0'){
                if(type===1){
                    message.success('下架成功')
                }else {
                    message.success('上架成功')
                }
            }else {
                if(type===1){
                    Modal.error({
                        title:'错误提示',
                        content:data.meta.message && data.meta.message != '' ? data.meta.message : '提交审核失败',
                    });
                }else {
                    Modal.error({
                        title:'错误提示',
                        content:data.meta.message && data.meta.message != '' ? data.meta.message : '上架失败',
                    });
                }
            }
        })
    }
    showLog(id){
        this.setState({
            rizhiVisible:true,
        })
        const {cShowlog} = this.props;
        cShowlog(4,id).then(data => {
            console.log(data)
        })
    }

    render() {

        const {levelQrcodeUrl, levelList,levelName} = this.state;
        const {history, showKechengEdit, qishuData, GetLevelCourseD,canEdit,levelid,gShowLog,isChakan} = this.props;
        let classDara = GetLevelCourseD && GetLevelCourseD.object ? GetLevelCourseD.object : {};

        const columns = [
            {
                title: '课程名称',
                key: 'state',
                width: '15%',
                render: (text, record) => (
                    <span>
                    {
                        record.levelName?record.levelName:record.levelId
                    }
                </span>
                ),
            },{
            title: '版本名称',
            dataIndex: 'versionName',
            key: 'versionName',
            width: '15%',
        }, {
            title: '版本状态',
            key: 'state',
            width: '15%',
            render: (text, record) => (
                <span>
                    {
                        record.status === 0 ?
                            '新建中'
                            :
                            record.status === 1
                                ?
                                '已上架'
                                : record.status === 2
                                ? '已下架'
                                : ''
                    }
                </span>
            ),
        }, {
            title: '审核状态',
            key: 'approveStatus',
            width: '15%',
            render: (text, record) => (
                <span>
                    {
                        record.approveStatus === 0 ?
                            '待提交'
                            :
                            record.approveStatus === 1
                                ?
                                '待审核'
                                : record.approveStatus === 2
                                ? '审核通过'
                                : record.approveStatus === 3
                                ? '审核未通过'
                                : ''
                    }
                </span>
            ),
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: '15%',
            render: (text, record) => (
                <span>
                    {
                        Format(record.createTime, 'yyyy-MM-dd hh:mm:ss')
                    }
                </span>
            ),
        }, {
            title: '审核时间',
            dataIndex: 'creation',
            key: 'creation',
            width: '15%',
            render: (text, record) => (
                <span>
                    {
                        record.approveTime?Format(record.approveTime, 'yyyy-MM-dd hh:mm:ss'):''
                    }
                </span>
            ),
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                // 版本状态(0.新建中, 1.已上架, 2.已下架)
                // 审核状态(0.待提交, 1.待审核, 2.审核通过, 3.审核驳回)
                return (
                    <span>
                        {
                                record.status === 0 && record.approveStatus === 1 ?
                                    <span>
                                    <Button type="primary"
                                            onClick={() => {
                                                // 这里判断角色
                                                showKechengEdit()
                                                canEdit(false)
                                                qishuData(record)
                                                isChakan(false)
                                            }}
                                            style={{margin: 5}}>审核</Button>
                                </span> :
                                    <Button type="primary"
                                            onClick={() => {
                                                // 这里判断角色
                                                showKechengEdit()
                                                canEdit(true)
                                                qishuData(record)
                                                isChakan(true)
                                            }}
                                            style={{margin: 5}}>查看</Button>
                        }
                        <Button type="primary"
                                onClick={this.showLog.bind(this, record.courseId)}
                                style={{margin: 5}}>日志</Button>
                    </span>
                )
            },
        }];

        let levelList1 = [];
        if(levelList.length>0){
            let l = {
                levelId:-1,
                levelName:'全部',
            }
            for (let i = 0;i<=levelList.length;i++){
                if(i===0){
                    levelList1.push(l)
                }else {
                    levelList1.push(levelList[i-1])
                }
            }
        }

        return (
            <Content style={{backgroundColor:'white',margin:0,padding: 15}}>
                <PageHeader pageName={'课程版本审核'}/>
                <div className="my-horizontal-div" style={{marginTop: 10, alignItems: 'center'}}>
                    <div className="my-content-text ">课程选择</div>
                    <div className="my-content-text margin-left10">
                        {
                            levelList1.length > 0 ?
                                <Select defaultValue={levelName!=''?levelName:levelList1[0].levelName} style={{width: 150}}
                                        onChange={(e) => {
                                            this.setState({
                                                cLevelId:e.levelId,
                                                levelQrcodeUrl:e.levelQrcodeUrl?e.levelQrcodeUrl:''
                                            })
                                            // 设置全局levelid
                                            levelid(e.levelId);
                                            setTimeout(() => {
                                                this.getCourseListM()
                                            }, 100)
                                        }}>
                                    {
                                        levelList1.map((data) => {
                                            return (
                                                <Option value={data}>{data.levelName}</Option>
                                            )
                                        })
                                    }
                                </Select>
                                : <div className="my-content-text">暂无数据</div>
                        }
                    </div>
                </div>
                <div className="margin-top20">
                    <Table bordered columns={columns} rowKey={record => record.id}
                           pagination={{ pageSize: 15,showTotal:total => `共 ${total} 条` }}
                           dataSource={classDara.course ? classDara.course : []} className="table">
                    </Table>
                </div>
                <Modal
                    visible={this.state.rizhiVisible}
                    title="日志"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={500}>
                    <div style={{width:'100%',height:'60vh',overflow:'scroll'}}>
                        <div>
                            {
                                gShowLog&&gShowLog.object&&gShowLog.object.length>0?
                                    gShowLog.object.map(data=>{
                                        return(
                                            <div>
                                                {
                                                    Format(data.createTime, 'yyyy-MM-dd hh:mm:ss')+'   '+data.logRemark
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


KechengBanbenList.propTypes = {
    showKechengEdit: PropTypes.object.isRequired, // 方法
    qishuData: PropTypes.object.isRequired, // 方法
    canEdit: PropTypes.object.isRequired, // 方法
    levelid: PropTypes.object.isRequired, // 方法
    clevelid: PropTypes.object.isRequired, //
    isChakan: PropTypes.object.isRequired, // 查看
}

function mapStateToProps(state, props) {
    return {
        GetLevelCourseD: state.GetLevelCourse,
        gShowLog: state.gShowLog,
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(KechengBanbenList);