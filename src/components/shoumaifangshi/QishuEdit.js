import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import PageHeader from "../view/PageHeader";
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
    Divider
} from "antd";
import "../home.css";
import {imageUrl} from "../../libs/utils/ImageUtils";
import Http from "../../libs/utils/Http";
import PropTypes from "prop-types";
import {shoumaiList,qishuXinxi,addQishu} from '../shoumaifangshishenhe/ShouMaiAction'

const Option = Select.Option;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;
const props = {
    name: "file",
    action: "//jsonplaceholder.typicode.com/posts/",
    headers: {
        authorization: "authorization-text"
    },
    onChange(info) {
        console.log(info);
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            if (info.file.response && info.file.response.filepath) {
                // todo response为服务器响应的数据
                this.setState({filepath: info.file.response.filepath});
            }
            message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} 文件上传失败`);
        }
    }
};

// 课程编辑
class QishuEdit extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            teacherHeaderUrl: "",
            className: "",
            huatiname: "",
            englishname: "",
            chinesename: "",
            filepath: "",
            xiaojieVisible: true,
            qishuName: "",
            previewVisible: false,
            previewImage: "",
            fileList: [],
            previewVisible1: false,
            previewImage1: "",
            fileList1: [],
            previewVisible2: false,
            previewImage2: "",
            fileList2: [],

            startendOpen: false,
            kkDate:'', // 开课时间
            bmstrDate1:'', // 报名开始
            bmstrDate2:'', // 报名截止
        };
    }

    // 本期头图上传
    handleCancel = () => this.setState({previewVisible: false});
    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    };
    handleChange = ({fileList}) => {
        this.setState({fileList});
    };
    //课程介绍上传
    handleCancel1 = () => this.setState({previewVisible1: false});
    handlePreview1 = file => {
        this.setState({
            previewImage1: file.url || file.thumbUrl,
            previewVisible1: true
        });
    };
    handleChange1 = ({fileList}) => {
        this.setState({fileList1: fileList});
    };
    //常见问题上传
    handleCancel2 = () => this.setState({previewVisible2: false});
    handlePreview2 = file => {
        this.setState({
            previewImage2: file.url || file.thumbUrl,
            previewVisible2: true
        });
    };
    handleChange2 = ({fileList}) => {
        this.setState({fileList2: fileList});
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

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const {previewVisible1, previewImage1, fileList1} = this.state;
        const {previewVisible2, previewImage2, fileList2} = this.state;
        const {startendOpen} = this.state;

        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {history, showKechengEdit} = this.props;

        const {
            qishuName,
            className,
            huatiname,
            englishname,
            chinesename,
            filepath
        } = this.state;

        return (
            <div style={{padding: 15}}>
                <PageHeader
                    pageName={"期数编辑"}
                    showBack={true}
                    backM={() => {
                        showKechengEdit();
                    }}
                />
                {/* 期数名称 */}
                <div
                    className="my-horizontal-div"
                    style={{marginTop: 24, alignItems: "center"}}
                >
                    <div style={{width: 100}} className="my-content-text margin-left10 ">
                        期数名称:
                    </div>
                    <div className="my-horizontal-div margin-left10">
                        <Input
                            value={qishuName}
                            onChange={e => {
                                this.setState({qishuName: e.target.value});
                            }}
                            style={{width: 200}}
                        />
                    </div>
                </div>

                <div
                    className="my-horizontal-div"
                    style={{marginTop: 24, alignItems: "center"}}
                >
                    <div style={{width: 100}} className="my-content-text margin-left10 ">
                        报名日期:
                    </div>
                    <div className="my-horizontal-div margin-left10" style={{alignItems: 'center'}}>
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="开始时间"
                            style={{width: 200}}
                            onChange={this.onChangeDate.bind(this, 'bmstrDate1')}
                            onOpenChange={this.handleStartOpenChange.bind(this, 'startendOpen')}
                        />
                        <div style={{padding: 5}}>至</div>
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="结束时间"
                            style={{width: 200}}
                            onChange={this.onChangeDate.bind(this, 'bmstrDate2')}
                            open={startendOpen}
                            onOpenChange={this.handleEndOpenChange.bind(this, 'startendOpen')}
                        />
                    </div>
                </div>

                <div
                    className="my-horizontal-div"
                    style={{marginTop: 24, alignItems: "center"}}
                >
                    <div
                        style={{width: 100}}
                        className="my-content-text margin-left10  "
                    >
                        正式开课日期:
                    </div>
                    <div className="my-horizontal-div margin-left10">
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder={'选择时间'}
                            onChange={this.onChangeDate.bind(this, 'kkDate')}
                            style={{width: 200}}
                        />
                    </div>
                </div>
                {/* 图片上传 */}
                <div style={{border: "1px dashed #ccc", margin: "24px 10px"}}>
                    <div style={{padding: "42px 24px 50px"}}>
                        <div style={{margin: 10, fontWeight: 700}}>本期头图</div>
                        {/* 头图上传 */}
                        <div className="clearfix">
                            <Upload
                                action="//jsonplaceholder.typicode.com/posts/"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={previewVisible}
                                footer={null}
                                onCancel={this.handleCancel}
                            >
                                <img
                                    alt="example"
                                    style={{width: "100%"}}
                                    src={previewImage}
                                />
                            </Modal>
                        </div>
                        {/* 课程介绍 */}
                        <div style={{margin: 10, fontWeight: 700}}>课程介绍</div>
                        <div className="clearfix">
                            <Upload
                                action="//jsonplaceholder.typicode.com/posts/"
                                listType="picture-card"
                                fileList={fileList1}
                                onPreview={this.handlePreview1}
                                onChange={this.handleChange1}
                            >
                                {fileList1 && fileList1.length >= 10 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={previewVisible1}
                                footer={null}
                                onCancel={this.handleCancel1}
                            >
                                <img
                                    alt="example"
                                    style={{width: "100%"}}
                                    src={previewImage1}
                                />
                            </Modal>
                        </div>
                        {/* 常见问题 */}
                        <div style={{margin: 10, fontWeight: 700}}>常见问题</div>
                        <div className="clearfix">
                            <Upload
                                action="//jsonplaceholder.typicode.com/posts/"
                                listType="picture-card"
                                fileList={fileList2}
                                onPreview={this.handlePreview2}
                                onChange={this.handleChange2}
                            >
                                {fileList2.length >= 10 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={previewVisible2}
                                footer={null}
                                onCancel={this.handleCancel2}
                            >
                                <img
                                    alt="example"
                                    style={{width: "100%"}}
                                    src={previewImage2}
                                />
                            </Modal>
                        </div>
                    </div>
                </div>
                {/* 入学指南 */}
                <div
                    className="my-horizontal-div"
                    style={{marginTop: 24, alignItems: "center"}}
                >
                    <div style={{width: 94}} className="my-content-text margin-left10 ">
                        入学指南:
                    </div>
                    <div className="my-horizontal-div margin-left10">
                        <Input
                            value={qishuName}
                            onChange={e => {
                                this.setState({qishuName: e.target.value});
                            }}
                            style={{width: 500}}
                        />
                    </div>
                </div>
                {/* 选择本期包含课程 */}

            </div>
        );
    }

    // 编辑小节
    editXiaojie = () => {
        const {huatiname, englishname, chinesename, filepath} = this.state;
        console.log(huatiname, englishname, chinesename, filepath);
        if (
            huatiname &&
            englishname &&
            chinesename &&
            filepath &&
            huatiname != "" &&
            englishname != "" &&
            chinesename != "" &&
            filepath != ""
        ) {
            message.warning("请完善小节信息");
            return;
        }
    };

    // 确认按钮 这里增加药店
    handleOk = () => {
        this.setState({
            xiaojieVisible: false
        });
    };
}

QishuEdit.propTypes = {
    showKechengEdit: PropTypes.object.isRequired // 方法
};

function mapStateToProps(state, props) {
    return {};
}

function mapDispatchToProps(dispatch, props) {
    return {
        addQishu: bindActionCreators(addQishu, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QishuEdit);
