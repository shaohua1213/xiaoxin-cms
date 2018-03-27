import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PageHeader from '../view/PageHeader'
import {
    Row,
    Col,
    Button,
    Upload,
    message,
    Select,
    Input,
    DatePicker,
    Table,
    Icon,
    Form,
    Modal,
    Pagination,
    Layout,
    Popconfirm,
} from 'antd';
import '../home.css'
import {imageUrl,bytesToSize} from '../../libs/utils/ImageUtils'
import Http from '../../libs/utils/Http';
import PropTypes from 'prop-types';
import {
    AddCourse, CourseSubmitShenHe, DelSection, DelSectionState,
    GetLevelCourse, GetSectionInfo, GetSectionList, UpdateSection, getLevelList,updateClassName,
} from '../../actions/course'
import {API_SRC,API_CODE,API_CODE_id} from '../../constants/ApiUrl';


const {Header, Content, Footer} = Layout;
const Option = Select.Option;

let isFile = 0; // 0 未上传 1 上传格式不正确 2 上传成功

// 课程编辑
class KechengEdit extends Component {

    constructor(props, context) {
        super(props);
        let qishuData = this.props.qishuData;
        console.log('qishuData-=-=-',qishuData)
        this.state = {
            qishuData: qishuData,
            teacherHeaderUrl: '',
            className: qishuData && qishuData.versionName ? qishuData.versionName : '',
            huatiname: '',
            englishname: '',
            chinesename: '',
            filepath: '',
            xiaojieVisible: false,
            yulanVisible: false,
            shitingRows: [],
            zhengkeRows: [],
            courseid: qishuData && qishuData.courseId ? qishuData.courseId : '-1',
            currentXiaojie: {},
            currentXiaojie1: {},
            levelid: this.props.levelid ? this.props.levelid : 0,
            fileList:[],
            isLoading:false,
            isAdd:qishuData!=undefined?false:true,// 是否是新添加
            name:'',
            ename:'',
            cname:'',
        }
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

    componentWillMount() {
        if (this.state.courseid != -1) {
            this.getCourseXiaojie()
        }
    }

    callback(result) {
        if (result.code === 0) { // 设置相应老师的头像
            const {setHeadUrl} = this.props;
            const {getInfo} = this.props;
            let data = getInfo ? getInfo.data : undefined
            setHeadUrl(data.nickname, data.sex, result.data.url).then((data) => {
                console.log(data)
                if (data.code === 0) {
                    // this.getUserInfoM();
                } else {
                }
            })
        }
    }

    // 添加课程
    addCourse = () => {
        const {AddCourse, levelid} = this.props;
        if (this.state.className === '') {
            message.warning('请输入版本名称')
            return
        }
        AddCourse(0, levelid, this.state.className).then(data => {
            if (data.meta.code === '0') {
                message.success('添加成功')
                this.setState({
                    courseid: data.meta.message,
                })
                setTimeout(() => {
                    this.getCourseXiaojie()
                }, 100)
            } else {
                Modal.error({
                    title:'错误提示',
                    content:data.meta.message && data.meta.message != '' ? data.meta.message : '添加失败',
                });
            }
        })
    }
    // 获取课程小节
    getCourseXiaojie = () => {
        const {AddCourse, GetSectionList} = this.props;
        if (this.state.courseid === '-1') {
            return
        }
        GetSectionList(this.state.courseid).then(data => {
            console.log('---GetSectionList---',data)
            if (data.meta.code === '0') {
                let shitingRows = []; // 0
                let zhengkeRows = [];
                for (let ke in data.object) {
                    if (ke == 0) {
                        shitingRows.push(data.object[0])
                    } else {
                        zhengkeRows.push(data.object[ke])
                    }
                }
                this.setState({
                    shitingRows: shitingRows,
                    zhengkeRows: zhengkeRows,
                    // isAdd:true,
                })
            } else {
                if(data.meta.message && data.meta.message != ''){
                    Modal.error({
                        title:'错误提示' ,
                        content: data.meta.message ,
                    });
                }

            }
        })
    }

    bianji(data) {
        // props.action = '/admin/upload/' + data.sectionId
        this.setState({
            xiaojieVisible: true,
            currentXiaojie: data,
            name:data.topic,
            ename:data.sectionEnglishName,
            cname:data.sectionChineseName,
        })
    }

    // 预览
    yulan(data) {
        this.setState({
            yulanVisible: true,
            currentXiaojie: data,
        })
    }

    // 删除
    delete(data) {
        const {AddCourse, DelSection} = this.props;
        DelSection(data.sectionId).then(data => {
            if (data.meta.code === '0') { // 后台没有删除成功
                message.success('删除成功')
                this.getCourseXiaojie();
            } else {
                Modal.error({
                    title:'错误提示' ,
                    content: data.meta.message && data.meta.message != '' ? data.meta.message : '删除失败',
                });
            }
        })
    }

    updateName=()=>{
        const {updateClassName} = this.props;
        const {courseid,className} = this.state;
        updateClassName(courseid,className).then(data=>{
            console.log(data)
            if (data.meta.code === '0') { // 后台没有删除成功
                message.success('更改成功')
            } else {
                Modal.error({
                    title:'错误提示' ,
                    content: data.meta.message && data.meta.message != '' ? data.meta.message : '更改失败',
                });
            }
        }).catch(e=>{
            console.log(e)
        })
    }

    render() {

        const {history, showKechengEdit, canEdit} = this.props;
        const {className, huatiname, englishname, chinesename, filepath, shitingRows, zhengkeRows,
            currentXiaojie,qishuData,fileList,isLoading,isAdd,courseid} = this.state;
        let columns1 = [{
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => (
                <span>0
                 </span>
            ),
        }, {
            title: '话题名',
            dataIndex: 'topic',
            key: 'topic',
        }, {
            title: '小节名',
            dataIndex: 'sectionEnglishName',
            key: 'sectionEnglishName',
        }, {
            title: '小节名（中文）',
            dataIndex: 'sectionChineseName',
            key: 'sectionChineseName',
        }, {
            title: '资源大小',
            dataIndex: 'resourceSize',
            key: 'resourceSize',
            render: (text, record) => (
                <span>{bytesToSize(record.resourceSize)}
                 </span>
            ),
        }, {
            title: '操作',
            dataIndex: 'creation',
            key: 'action',
            render: (text, record) => (
                <span>
                    {
                        isAdd||((qishuData&&qishuData.status != 1)&&!(qishuData&&qishuData.approveStatus === 1))?
                            <Button type="primary" onClick={this.bianji.bind(this, record)}
                                    style={this.state.btnhide}>编辑</Button>:null
                    }
                    {
                        record.topic&&record.topic!=''&&record.resourceSize&&record.resourceSize!=''&&record.resourceSize!=0?
                            <Button type="primary" onClick={this.yulan.bind(this, record)}
                                    style={{margin: 5}}>预览</Button>:null
                    }
                    {
                        isAdd||((qishuData&&qishuData.status != 1)&&!(qishuData&&qishuData.approveStatus === 1))?
                        <Popconfirm
                            title="确定要删除么?"
                            onConfirm={this.delete.bind(this, record)}
                        >
                            <Button
                                    style={{margin: 5, color: 'red'}}>删除</Button>
                        </Popconfirm>
                            :null
                    }
                 </span>
            ),
        }];
        let columns2 = [{
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, w) => (
                <span>{w + 1}
                 </span>
            ),
        }, {
            title: '话题名',
            dataIndex: 'topic',
            key: 'topic',
        }, {
            title: '话题小节编号',
            dataIndex: 'creation',
            key: 'creation',
            render: (text, record,w) => (
                <span>{record.topicSectionNum&&record.topicSectionCount?(record.topicSectionNum + '/' + record.topicSectionCount):('')}
                 </span>
            ),
        }, {
            title: '小节名',
            dataIndex: 'sectionEnglishName',
            key: 'sectionEnglishName',
        }, {
            title: '小节名（中文）',
            dataIndex: 'sectionChineseName',
            key: 'sectionChineseName',
        }, {
            title: '资源大小',
            dataIndex: 'resourceSize',
            key: 'resourceSize',
            render: (text, record) => (
                <span>{bytesToSize(record.resourceSize)}
                 </span>
            ),
        }, {
            title: '操作',
            dataIndex: 'creation',
            key: 'action',
            render: (text, record) => (
                <span>
                     {
                         isAdd||((qishuData&&qishuData.status != 1)&&!(qishuData&&qishuData.approveStatus === 1))?
                             <Button type="primary" onClick={this.bianji.bind(this, record)}
                                     style={this.state.btnhide}>编辑</Button>:null
                     }
                    {
                        record.topic&&record.topic!=''&&record.resourceSize&&record.resourceSize!=''&&record.resourceSize!=0?
                            <Button type="primary" onClick={this.yulan.bind(this, record)}
                                    style={{margin: 5}}>预览</Button>:null
                    }
                    {
                        isAdd||((qishuData&&qishuData.status != 1)&&!(qishuData&&qishuData.approveStatus === 1))?
                            <Popconfirm
                                title="确定要删除么?"
                                onConfirm={this.delete.bind(this, record)}
                            >
                                <Button
                                    style={{margin: 5, color: 'red'}}>删除</Button>
                            </Popconfirm>
                            :null
                    }
                 </span>
            ),
        }];
        let _this = this;
        const props = {
            name: 'file',
            action: '/admin/upload/'+currentXiaojie.sectionId,
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                let fileList = info.fileList;
                // 1. Limit the number of uploaded files
                //    Only to show two recent uploaded files, and old ones will be replaced by the new
                // fileList = fileList.slice(-2);
                // 2. read from response and show file link
                fileList = fileList.map((file) => {
                    console.log(file.response)
                    if (file.response) {
                        // Component will show file.url as link
                        file.url = file.response.meta.message;
                    }
                    return file;
                });

                // 3. filter successfully uploaded files according to response from server
                fileList = fileList.filter((file) => {
                    console.log(file.response)
                    if (file.response) {
                        return file.response.meta.code === '0';
                    }
                    return true;
                });
                if (info.file.status === 'uploading') {
                    // console.log(info.file, info.fileList);
                    if(!isLoading){
                        _this.setState({isLoading:true});
                    }
                }else {
                    _this.setState({isLoading:false});
                }
                if (info.file.status === 'done') {
                    // console.log(info.file.response)
                    _this.setState({isLoading:false});
                    if (info.file.response && info.file.response.meta.code === '0') { // todo response为服务器响应的数据
                        console.log('文件地址：' + info.file.response.meta.message)
                        message.success(`${info.file.name} 上传成功`);
                        isFile = 2;
                    } else {
                        isFile = 1;
                        Modal.error({
                            title:'错误提示',
                            content: info.file.response.meta.message && info.file.response.meta.message != '' ? info.file.response.meta.message : '文件上传失败',
                        });
                    }
                } else if (info.file.status === 'error') {
                    Modal.error({
                        title:'错误提示',
                        content:`${info.file.name} 文件上传失败`,
                    });
                }
                let fileList1 = [];
                if(fileList.length>0){
                    fileList1.push(fileList[fileList.length-1])
                }
                _this.setState({fileList:fileList1});
            },
        };

        let canGenggai = false;
        // console.log(courseid,qishuData,)
        // console.log(qishuData&&qishuData.approveStatus != 1&&qishuData.status != 1)
        if(courseid==='-1'){
            canGenggai = false;
        }else {
            canGenggai = true;
            if(qishuData&&(qishuData.approveStatus === 1||qishuData.status === 1)){
                canGenggai = false;
            }
        }

        return (
            <Content style={{backgroundColor: 'white', margin: 0, padding: 15}}>
                <PageHeader pageName={'课程编辑'} showBack={true} backM={() => {
                    showKechengEdit()
                }}/>
                <div className="" style={{marginTop: 10, alignItems: 'center'}}>
                    <div className="my-content-text ">版本名称</div>
                    <div className="my-horizontal-div margin-top10">
                        <Input placeholder="统一格式：v1.0 L5"
                            maxLength={10} disabled={canEdit&&!canGenggai} value={className} onChange={(e) => {
                            this.setState({className: e.target.value})
                        }} style={{width: 200}}/>
                        {
                            !canEdit&&courseid==='-1' ?
                                <Button onClick={this.addCourse} className='margin-left10'>保存</Button>
                                :canGenggai?
                                <Button onClick={this.updateName} className='margin-left10'>更改名称</Button>
                                :null
                        }

                    </div>
                </div>
                {
                    shitingRows.length > 0 && zhengkeRows.length > 0 ?
                        <div>
                            <div className="my-title-text margin-top20">试听编辑</div>
                            <div className="margin-top10">
                                <Table bordered columns={columns1} rowKey={record => record.id} pagination={false}
                                       dataSource={shitingRows} className="table">
                                </Table>
                            </div>
                            <div className="my-title-text margin-top20">正课编辑</div>
                            <div className="margin-top10">
                                <Table bordered columns={columns2} rowKey={record => record.id} pagination={false}
                                       dataSource={zhengkeRows} className="table">
                                </Table>
                            </div>
                        </div> : null
                }
                <Modal
                    key={1}
                    visible={this.state.xiaojieVisible}
                    title="小节编辑"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel1}
                    footer={null}
                    width={500}>
                    <div className="my-div" style={{flexDirection: 'column', alignItems: 'center'}}>
                        <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                            <div className="my-content-text " style={{width: 100}}>话题名</div>
                            <Input
                                maxLength={24} className="margin-left10" value={this.state.name}
                                   onChange={(e) => {
                                       //let c = currentXiaojie
                                       //c.topic = e.target.value
                                       this.setState({name: e.target.value})
                                   }} style={{width: 200}}/>
                        </div>
                        <div className="my-horizontal-div margin-top10" style={{alignItems: 'center'}}>
                            <div className="my-content-text " style={{width: 100}}>小节英文名</div>
                            <Input
                                maxLength={30} className="margin-left10"
                                   value={this.state.ename}
                                   onChange={(e) => {
                                       //let c = currentXiaojie
                                       //c.sectionEnglishName = e.target.value
                                       this.setState({ename: e.target.value})
                                   }} style={{width: 200}}/>
                        </div>
                        <div className="my-horizontal-div margin-top10" style={{alignItems: 'center'}}>
                            <div className="my-content-text " style={{width: 100}}>小节中文名</div>
                            <Input
                                maxLength={18} className="margin-left10"
                                   value={this.state.cname}
                                   onChange={(e) => {
                                       //let c = currentXiaojie
                                       //c.sectionChineseName = e.target.value
                                       this.setState({cname: e.target.value})
                                   }} style={{width: 200}}/>
                        </div>
                        <div className="my-horizontal-div margin-top10" style={{alignItems: 'center'}}>
                            <div className="my-content-text " style={{width: 100}}>小节文件</div>
                            <Upload disabled={isLoading}
                                className="margin-left1" {...props} fileList={this.state.fileList}>
                                <Button style={{width: 200}} disabled={isLoading}>
                                    <Icon type="upload"/> 上传zip文件
                                </Button>
                            </Upload>
                        </div>
                        <Button type={'primary'} className='margin-top10'
                                onClick={this.editXiaojie}
                                style={{alignItems: 'center', marginTop: 30, width: 200}}>保存</Button>
                        <div className="my-horizontal-div margin-top10" style={{alignItems: 'center', marginTop: 40}}>
                            <div className="my-content-text " style={{width: 80,}}>示例下载</div>
                            <Button className='margin-left10' onClick={()=>{
                                window.open(this.props.getConfig&&this.props.getConfig.object&&this.props.getConfig.object.resource_section_demo&&
                                this.props.getConfig.object.resource_section_demo!=''?(this.props.getConfig.object.resource_domain+this.props.getConfig.object.resource_section_demo):'')
                            }}>点击下载</Button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    visible={this.state.yulanVisible}
                    title="扫码预览"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={400}>
                    <div className="my-horizontal-div"
                         style={{height:300,width:'100%',justifyContent:'center',alignItems:'center'}}>
                        <img src={API_CODE+'/QRCode/get?text='+encodeURIComponent((this.props.getConfig&&this.props.getConfig.object&&this.props.getConfig.object.view_basePath&&this.props.getConfig.object.view_basePath!=''?this.props.getConfig.object.view_basePath:API_CODE_id)+currentXiaojie.sectionId)+'&width=300'} style={{height:300,width:300,}}/>
                    </div>
                </Modal>
            </Content>
        );
    }

    // 编辑小节
    editXiaojie = () => {
        const {name, cname, ename, currentXiaojie} = this.state;
        console.log(name, cname, ename, currentXiaojie)
        const {UpdateSection} = this.props;
        if (name==="") {
            message.warning('请填写话题名')
            return;
        }
        if (ename==="") {
            message.warning('请填写英文名')
            return;
        }
        if (cname==="") {
            message.warning('请填写中文名')
            return;
        }
        if(!(currentXiaojie&&currentXiaojie.resourceSize&&currentXiaojie.resourceSize!=0)){
            if (isFile == 0) {
                message.warning('请上传小节文件')
                return;
            }
            if (isFile == 1) {
                message.warning('请上传正确对小节文件')
                return;
            }
        }
        UpdateSection(this.state.cname, this.state.ename, currentXiaojie.sectionId, this.state.name).then(data => {
            console.log('--------',data)
            if (data.meta.code === '0') {
                isFile = 0
                message.success('编辑成功')
                this.setState({
                    xiaojieVisible: false,
                    name: '',
                    ename: '',
                    cname: '',
                    fileList: [],
                })
                setTimeout(() => {
                    this.getCourseXiaojie()
                }, 100)
            } else {
                Modal.error({
                    title:'错误提示',
                    content:data.meta.message && data.meta.message != '' ? data.meta.message : '编辑失败',
                });
            }
        }).catch(e=>{
            console.log(e)
            message.error('服务器链接失败')
        })
    }


    // 确认按钮 这里增加药店
    handleOk = () => {
        this.setState({
            xiaojieVisible: false,
            yulanVisible: false,
            fileList:[],
        })
    }

    handleCancel = (e) => {
        this.setState({
            xiaojieVisible: false,
            yulanVisible: false,
            fileList:[],
        })
    }
    handleCancel1 = (e) => {
        let c = {};
        c.topic = this.state.name;
        c.sectionEnglishName = this.state.ename;
        c.sectionChineseName = this.state.cname;
        // name:data.topic,
        //     ename:data.sectionEnglishName,
        //     cname:data.sectionChineseName,
        console.log(this.state.currentXiaojie,c)
        this.setState({
            xiaojieVisible: false,
            yulanVisible: false,
            fileList:[],
            // currentXiaojie:c,
        })
    }

}


KechengEdit.propTypes = {
    showKechengEdit: PropTypes.object.isRequired, // 方法
    qishuData: PropTypes.object.isRequired, // 方法
    canEdit: PropTypes.object.isRequired,
    levelid: PropTypes.object.isRequired,
}

function mapStateToProps(state, props) {
    return {
        getConfig:state.getConfig,
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
        updateClassName: bindActionCreators(updateClassName, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(KechengEdit);