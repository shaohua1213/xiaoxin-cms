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
    GetLevelCourse, GetSectionInfo, GetSectionList, UpdateSection, getLevelList,shenhe,
} from '../../actions/course'
import {API_SRC,API_CODE,API_CODE_id} from '../../constants/ApiUrl';

const {TextArea} = Input;
const {Header, Content, Footer} = Layout;
const Option = Select.Option;

const props = {
    name: 'file',
    action: '/admin/upload/',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            console.log(info.file.response)
            if (info.file.response && info.file.response.meta.code==='0') { // todo response为服务器响应的数据
                console.log('文件地址：'+info.file.response.meta.message)
                message.success(`${info.file.name} 上传成功`);
            }else {
                Modal.error({
                    title:'错误提示',
                    content:info.file.response.meta.message&&info.file.response.meta.message!=''?info.file.response.meta.message:'文件上传失败',
                });
            }
        } else if (info.file.status === 'error') {
            Modal.error({
                title:'错误提示',
                content:`${info.file.name} 文件上传失败`,
            });
        }
    },
};


// 课程编辑
class KechengShenhe extends Component {

    constructor(props, context) {
        super(props);
        console.log('--KechengShenhe--',this.props.levelid)
        let qishuData = this.props.qishuData;
        this.state = {
            teacherHeaderUrl: '',
            className: qishuData&&qishuData.versionName?qishuData.versionName:'',
            huatiname: '',
            englishname: '',
            shenheYijian: '', // 审核意见
            chinesename: '',
            filepath: '',
            xiaojieVisible: false,
            yulanVisible: false,
            shitingRows: [],
            zhengkeRows: [],
            courseid: qishuData&&qishuData.courseId?qishuData.courseId:'-1',
            currentXiaojie: {},
            levelid: this.props.levelid?this.props.levelid:0,
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
        if(this.state.courseid!=-1){
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
        const {AddCourse,levelid} = this.props;
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
                Modal.error({
                    title:'错误提示',
                    content:data.meta.message && data.meta.message != '' ? data.meta.message : '添加失败',
                });
            }
        })
    }

    // 预览
    yulan(data) {
        this.setState({
            yulanVisible: true,
            currentXiaojie: data,
        })
    }

    render() {

        const {history, showKechengEdit,canEdit,canShenhe,isChakan} = this.props;
        const {className, huatiname, englishname, chinesename, filepath, shitingRows, zhengkeRows, currentXiaojie} = this.state;
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
                                 style={{margin: 5}}>预览</Button>:null
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
            render: (text, record) => (
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
                                 style={{margin: 5}}>预览</Button>:null
                 }
                 </span>
            ),
        }];

        return (
            <Content style={{backgroundColor: 'white', margin: 0, padding: 15}}>
                <PageHeader pageName={'课程编辑'} showBack={true} backM={() => {
                    showKechengEdit()
                }}/>
                <div className="my-horizontal-div" style={{marginTop: 10, alignItems: 'center'}}>
                    <div className="my-title-text ">版本名称</div>
                    <div className="margin-left10 my-content-text">
                        {className}
                    </div>
                </div>
                {
                    shitingRows.length>0&&zhengkeRows.length>0?
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
                        </div>:null
                }
                {
                    !isChakan?
                        <div
                            className="shenhe-div"
                            style={{alignItems: "center",paddingBottom:200,paddingLeft:10}}
                        >
                            <div>
                                <div className="my-title-text">
                                    审核意见
                                </div>
                                <TextArea
                                    disabled={canShenhe}
                                    value={this.state.shenheYijian}
                                    onChange={(e)=>{
                                        this.setState({
                                            shenheYijian:e.target.value,
                                        })
                                    }}
                                    style={{width:'60%',marginTop:10}}
                                    rows={4} />
                            </div>
                            <div className="margin-top10 my-horizontal-div">
                                <Button disabled={canShenhe} onClick={()=>{this.editXiaojie(1)}} type="primary" style={{width:150,marginTop:20,}}>
                                    通过
                                </Button>
                                <Button disabled={canShenhe} onClick={()=>{this.editXiaojie(2)}} type="danger" style={{width:150,marginTop:20,marginLeft:20}}>
                                    驳回
                                </Button>
                            </div>
                        </div>
                        :null
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
                            <Input className="margin-left10" value={currentXiaojie.topic ? currentXiaojie.topic : ''}
                                   onChange={(e) => {
                                       currentXiaojie.topic = e.target.value
                                       this.setState({currentXiaojie: currentXiaojie})
                                   }} style={{width: 200}}/>
                        </div>
                        <div className="my-horizontal-div margin-top10" style={{alignItems: 'center'}}>
                            <div className="my-content-text " style={{width: 100}}>小节英文名</div>
                            <Input className="margin-left10" value={currentXiaojie.sectionEnglishName? currentXiaojie.sectionEnglishName : ''} onChange={(e) => {
                                currentXiaojie.sectionEnglishName = e.target.value
                                this.setState({currentXiaojie: currentXiaojie})
                            }} style={{width: 200}}/>
                        </div>
                        <div className="my-horizontal-div margin-top10" style={{alignItems: 'center'}}>
                            <div className="my-content-text " style={{width: 100}}>小节中文名</div>
                            <Input className="margin-left10" value={currentXiaojie.sectionChineseName? currentXiaojie.sectionChineseName : ''} onChange={(e) => {
                                currentXiaojie.sectionChineseName = e.target.value
                                this.setState({currentXiaojie: currentXiaojie})
                            }} style={{width: 200}}/>
                        </div>
                        <div className="my-horizontal-div margin-top10" style={{alignItems: 'center'}}>
                            <div className="my-content-text " style={{width: 100}}>小节文件</div>
                            <Upload className="margin-left1" {...props}>
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
                            <Button className='margin-left10'>点击下载</Button>
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
                        <img src={API_CODE+'/QRCode/get?text='+encodeURIComponent(API_CODE_id+currentXiaojie.sectionId)+'&width=300'} style={{height:300,width:300,}}/>
                    </div>
                </Modal>
            </Content>
        );
    }

    // 审核
    editXiaojie = (state) => {
        const {
            shenheYijian,courseid
        } = this.state;
        if(state===2&&shenheYijian===''){
            Modal.error({
                title:'提示',
                content:'驳回必须填写意见',
            });
            return
        }
        const {shenhe,showKechengEdit} = this.props;
        shenhe(courseid,state,shenheYijian).then((data)=>{
            if(data.meta.code==='0'){
                message.success('提交成功')
                showKechengEdit()
            }else {
                Modal.error({
                    title:'错误提示',
                    content:data.meta.message && data.meta.message != '' ? data.meta.message : '提交失败',
                });
            }
        }).catch(e=>{console.log(e)})
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


KechengShenhe.propTypes = {
    showKechengEdit: PropTypes.object.isRequired, // 方法
    qishuData: PropTypes.object.isRequired, // 方法
    canEdit: PropTypes.object.isRequired, // 方法
    levelid: PropTypes.object.isRequired, // 方法
    canShenhe: PropTypes.object.isRequired, // 方法
    isChakan: PropTypes.object.isRequired,
}

function mapStateToProps(state, props) {
    return {}
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
        shenhe: bindActionCreators(shenhe, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(KechengShenhe);