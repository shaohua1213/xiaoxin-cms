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
    Layout
} from 'antd';
import '../home.css'
import {imageUrl,bytesToSize} from '../../libs/utils/ImageUtils'
import Http from '../../libs/utils/Http';
import PropTypes from 'prop-types';
import {
    AddCourse, CourseSubmitShenHe, DelSection, DelSectionState,
    GetLevelCourse, GetSectionInfo, GetSectionList, UpdateSection, getLevelList,
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
        console.log(qishuData)
        this.state = {
            qishuData: qishuData,
            teacherHeaderUrl: '',
            className: qishuData && qishuData.vresionname ? qishuData.vresionname : '',
            huatiname: '',
            englishname: '',
            chinesename: '',
            filepath: '',
            xiaojieVisible: false,
            yulanVisible: false,
            shitingRows: [],
            zhengkeRows: [],
            courseid: qishuData && qishuData.id ? qishuData.id : '-1',
            currentXiaojie: {},
            levelid: this.props.levelid ? this.props.levelid : 0,
            fileList:[],
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

    render() {

        const {history, showKechengEdit, canEdit} = this.props;
        const {className, huatiname, englishname, chinesename, filepath,
            shitingRows, zhengkeRows, currentXiaojie,qishuData,fileList} = this.state;
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
                        record.topic&&record.topic!=''&&record.resourceSize&&record.resourceSize!=''&&record.resourceSize!=0?
                            <Button type="primary" onClick={this.yulan.bind(this, record)}
                                    style={{margin: 5}}>查看</Button>:null
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
                        record.topic&&record.topic!=''&&record.resourceSize&&record.resourceSize!=''&&record.resourceSize!=0?
                            <Button type="primary" onClick={this.yulan.bind(this, record)}
                                    style={{margin: 5}}>查看</Button>:null
                    }
                 </span>
            ),
        }];

        const props = {
            name: 'file',
            action: '/admin/upload/'+currentXiaojie.sectionId,
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    console.log(info.file.response)
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

                let fileList = info.fileList;
                console.log('-----fileList----',fileList)
                // 1. Limit the number of uploaded files
                //    Only to show two recent uploaded files, and old ones will be replaced by the new
                fileList = fileList.slice(-2);
                // 2. read from response and show file link
                fileList = fileList.map((file) => {
                    if (file.response) {
                        // Component will show file.url as link
                        file.url = file.response.url;
                    }
                    return file;
                });

                // 3. filter successfully uploaded files according to response from server
                fileList = fileList.filter((file) => {
                    if (file.response) {
                        return file.response.status === 'success';
                    }
                    return true;
                });

                this.setState({ fileList });
            },
        };

        return (
            <Content style={{backgroundColor: 'white', margin: 0, padding: 15}}>
                <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                    <div className="my-content-text ">版本名称</div>
                    <div className="margin-left10">
                        {className}
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
                    onCancel={this.handleCancel}
                    footer={null}
                    width={500}>
                    <div className="my-div" style={{flexDirection: 'column', alignItems: 'center'}}>
                        <div className="my-horizontal-div" style={{alignItems: 'center'}}>
                            <div className="my-content-text " style={{width: 100}}>话题名</div>
                            <Input
                                maxLength={24}
                                className="margin-left10" value={currentXiaojie.topic ? currentXiaojie.topic : ''}
                                   onChange={(e) => {
                                       currentXiaojie.topic = e.target.value
                                       this.setState({currentXiaojie: currentXiaojie})
                                   }} style={{width: 200}}/>
                        </div>
                        <div className="my-horizontal-div margin-top10" style={{alignItems: 'center'}}>
                            <div className="my-content-text " style={{width: 100}}>小节英文名</div>
                            <Input
                                maxLength={30} className="margin-left10"
                                   value={currentXiaojie.sectionEnglishName ? currentXiaojie.sectionEnglishName : ''}
                                   onChange={(e) => {
                                       currentXiaojie.sectionEnglishName = e.target.value
                                       this.setState({currentXiaojie: currentXiaojie})
                                   }} style={{width: 200}}/>
                        </div>
                        <div className="my-horizontal-div margin-top10" style={{alignItems: 'center'}}>
                            <div className="my-content-text " style={{width: 100}}>小节中文名</div>
                            <Input
                                maxLength={18} className="margin-left10"
                                   value={currentXiaojie.sectionChineseName ? currentXiaojie.sectionChineseName : ''}
                                   onChange={(e) => {
                                       currentXiaojie.sectionChineseName = e.target.value
                                       this.setState({currentXiaojie: currentXiaojie})
                                   }} style={{width: 200}}/>
                        </div>
                        <div className="my-horizontal-div margin-top10" style={{alignItems: 'center'}}>
                            <div className="my-content-text " style={{width: 100}}>小节文件</div>
                            <Upload
                                className="margin-left1" {...props}  fileList={this.state.fileList}>
                                <Button style={{width: 200}}>
                                    <Icon type="upload"/> 点击上传
                                </Button>
                            </Upload>
                        </div>
                        <Button type={'primary'} className='margin-top10'
                                onClick={this.editXiaojie}
                                style={{alignItems: 'center', marginTop: 30, width: 200}}>保存</Button>
                        <div className="my-horizontal-div margin-top10" style={{alignItems: 'center', marginTop: 40}}>
                            <div className="my-content-text " style={{width: 80,}}>使用说明</div>
                            <Button className='margin-left10' onClick={()=>{
                                window.open(this.props.getConfig&&this.props.getConfig.object&&this.props.getConfig.object.view_basePath&&
                                this.props.getConfig.object.resource_section_demo!=''?this.props.getConfig.object.resource_section_demo:'')
                            }}>点击下载</Button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    visible={this.state.yulanVisible}
                    title="扫码查看"
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
        const {huatiname, englishname, chinesename, currentXiaojie} = this.state;
        const {UpdateSection} = this.props;
        if (!(currentXiaojie.topic && currentXiaojie.sectionEnglishName && currentXiaojie.sectionChineseName
            && currentXiaojie.topic != '' && currentXiaojie.sectionEnglishName != '' && currentXiaojie.sectionChineseName != '')) {
            message.warning('请完善小节信息')
            return;
        }
        if (isFile == 0) {
            message.warning('请上传小节文件')
            return;
        }
        if (isFile == 1) {
            message.warning('请上传正确的小节文件')
            return;
        }
        UpdateSection(currentXiaojie.sectionChineseName, currentXiaojie.sectionEnglishName, currentXiaojie.sectionId, currentXiaojie.topic).then(data => {
            if (data.meta.code === '0') {
                isFile = 0
                message.success('编辑成功')
                this.setState({
                    xiaojieVisible: false,
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
        })
    }


    // 确认按钮 这里增加药店
    handleOk = () => {
        this.setState({
            xiaojieVisible: false,
            yulanVisible: false,
        })
    }

    handleCancel = (e) => {
        this.setState({
            xiaojieVisible: false,
            yulanVisible: false,
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(KechengEdit);