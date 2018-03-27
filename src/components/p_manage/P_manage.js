import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './style.css';
import {
    Row,
    Col,
    Button,
    Input,
    message,
    DatePicker,
    Table,
    Icon,
    Form,
    Modal,
    Pagination,
    Select,
    Upload,
    Layout
} from 'antd';
import {getuserlist} from '../../actions/renyuan';
import {adduser} from '../../actions/renyuan';
import {updateuser} from '../../actions/renyuan';
import {deleteuser} from '../../actions/renyuan';
import {getrolelist} from '../../actions/Role';
const confirm = Modal.confirm;
const success = Modal.success;
const Option = Select.Option;
const {Content} = Layout;
const {Header} = Layout;
const {Footer} = Layout;

function Format(date, fmt) { //author: meizz
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

class P_manage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pagesize: 10,
            addmodal: false,
            updatemodal: false,
            updbtn: {},
            deletebtn: {marginLeft: 10},
            addbtn: {marginLeft: 10},
            nowid: 0,
            newkey: 1,
            updid: 0,
            roleid: 1,
            upname: '',
            upuname: '',
            uppwd: '',
            uprepwd: '',
            upid: 0,
            uprid: 0,
            img: '',
            nowimg: '',
            fileList1: [],
            fileList2: [],
            handlePreview1: '',
            handlePreview2: '',
            name: '',
            rolename: '',
            username: '',
            previewVisible2: false,
            addname: '',
            addusername: '',
            addpwd: '',
            addrepwd: '',
        }

    }

    componentWillMount() {
        const {getuserlist, getrolelist} = this.props;

        getuserlist('', this.state.pagesize, this.state.current).then((data) => {
            console.log('getuserlist', data)
        });
        getrolelist('', 100, 1).catch((e) => {
        });
    }

    reFresh() {
        this.setState({current: 1})
        this.select()
    }

    select() {
        const {getuserlist} = this.props;
        let name = this.state.name;
        getuserlist(name, this.state.pagesize, this.state.current).then((data) => {
            if (data.meta.code == '0') {

            } else {
                if (data.meta.message && data.meta.message != '') {
                    Modal.error({
                        title:'错误提示',
                        content:data.meta.message,
                    });
                }
            }
        }).catch((e) => {

        });
    }


    onChange = (page) => {
        this.state.current = page;
        this.select();
    }

    handleUpdate(record) {
        // adminUserId
        // adminUserNickname
        // adminUserState
        // adminUserUsername
        // power
        // role
        // {roleId: 1, roleName: "系统管理员", createTime: 1517220796000}
        if(record.role){
            this.setState({
                    upname: record.adminUserNickname,
                    // uppwd: record.password,
                    // uprepwd: record.password,
                    upid: record.adminUserId,
                    upuname: record.adminUserUsername,
                    uprid: record.role.roleId,
                    updatemodal: true,
                }
            );
        }else {
            message.error('数据出错')
        }

    }

    handleDelete(id, state) {
        const {deleteuser,updateuser} = this.props;
        // deleteuser(id, s).then((data) => {
        //     if (data.meta.code == '0') {
        //         message.success('操作成功')
        //         this.select();
        //     } else {
        //         message.error(data.meta.message && data.meta.message ? data.meta.message : '操作失败')
        //     }
        // }).catch((e) => {
        //
        // });
        updateuser(id, '', '', -1, '', state===1?0:1).then((data) => {
            if (data.meta.code == '0') {
                message.success(state===1?'启用成功':'禁用成功')
                this.select();
            } else {
                Modal.error({
                    title:'错误提示',
                    content:data.meta.message && data.meta.message ? data.meta.message : '操作失败',
                });
            }
        });

    }

    add() {
        this.setState({addmodal: true})
    }

    addhandleOk() { //type 1 添加 2 更新
        const {adduser, updateuser} = this.props;
        const {addname, addusername, addpwd, addrepwd} = this.state;
        let name = addname;
        let username = addusername;
        let pwd = addpwd;
        let repwd = addrepwd;
        let img = this.state.img;
        if (name === "" || username === "" || pwd === "" || repwd === "") {
            message.warning('不能输入为空')
            return;
        }
        if (pwd !== repwd) {
            message.warning('两次密码输入不相等')
            return;
        }
        // id,nickname, username, roleid, password, state
        adduser(-1, name, username, this.state.roleid, pwd, -1).then((data) => {
            if (data.meta.code == '0') {
                message.success('添加成功')
                this.select();
                this.setState({addmodal: false})
            } else {
                message.error(data.meta.message && data.meta.message ? data.meta.message : '添加失败')
            }
        });
        //alert(name);


    }

    addhandleCancel() {
        this.setState({addmodal: false})
    }

    schange = (value) => {
        this.setState({roleid: value});
    }

    upchange = (value) => {
        this.setState({uprid: value});
    }

    updhandleCancel() {
        this.setState({updatemodal: false, newkey: this.state.newkey + 1});
    }

    updhandleOk() {

        const {updateuser} = this.props;

        let upname = this.state.upname;
        let uppwd = this.state.uppwd;
        let uprepwd = this.state.uprepwd;

        if (uppwd !== uprepwd) {
            message.warning('两次密码输入不相等')
            return;
        }

        if (upname === '') {
            message.warning('不能输入为空')
            return;
        }
        let nowimg = this.state.nowimg;
        // id,nickname, username, roleid, password, state
        updateuser(this.state.upid, this.state.upname, this.state.upuname, this.state.uprid, this.state.uppwd, -1).then((data) => {
            if (data.meta.code == '0') {
                message.success('更新成功')
                this.select();
                this.setState({updatemodal: false, newkey: this.state.newkey + 1});
            } else {
                message.error(data.meta.message && data.meta.message ? data.meta.message : '更新失败')
            }
        });

    }

    handleCancel1 = () => this.setState({previewVisible1: false})

    handlePreview1 = (file) => {
        this.setState({
            img: file.url || file.thumbUrl,
            previewVisible1: true,
        });
    }

    handleChange1 = ({fileList}) => {
        //console.log(fileList)
        //console.log(fileList[0].status); // 获取上传状态
        //if (fileList[0].status==="done"){
        //    console.log(fileList[0].response.data.name); // 图片名字
        //}
        this.setState({
            fileList1: fileList,
        })
        if (fileList.length > 0) {
            if (fileList[0].response) {
                console.log("file");
                console.log(fileList[0].response.data.url);
                this.setState({
                    img: fileList[0].response.data.url,
                })
            }

        }

    }

    handleCancel2 = () => this.setState({previewVisible2: false})

    handlePreview2 = (file) => {
        this.setState({
            nowimg: file.url || file.thumbUrl,
            previewVisible2: true,
        });
    }


    render() {
        const {userlist, user, rolelist} = this.props;

        // console.log(userlist)

        const op = [];
        const hide = {
            display: 'none',
        }


        const nohide = {
            marginLeft: '10px',
        }
        // console.log(rolelist)
        let rows = rolelist.object && rolelist.object.rows ? rolelist.object.rows : [];
        for (let i = 0; i < rows.length; i++) {
            op.push(<Option key={rows[i].roleid} value={rows[i].roleid}>{rows[i].rolename}</Option>);
        }


        const columns = [{
            title: '姓名',
            dataIndex: 'adminUserNickname',
            key: 'adminUserNickname',
            width: '20%',
        }, {
            title: '帐号',
            dataIndex: 'adminUserUsername',
            width: '20%',
            key: 'adminUserUsername',
        }, {
            title: '角色',
            dataIndex: 'role.roleName',
            key: 'role.roleName',
            width: '20%',
        }, {
            title: '创建时间',
            dataIndex: 'role.createTime',
            key: 'role.createTime',
            width: '20%',
            render: (text, record) => {
                let date = new Date()
                if(record&&record.role&&record.role.createTime){
                    date.setTime(record.role.createTime)
                    let t = Format(date, 'yyyy-MM-dd hh:mm:ss')
                    return (
                        <span>
                        {t}
                    </span>
                    )
                }else {
                    return null
                }
            }
        }, {
            title: '操作',
            key: 'action',
            width: '20%',
            render: (text, record) => {
                return (
                    <span>

		      <Button type="primary" onClick={this.handleUpdate.bind(this, record)}
                      style={this.state.updbtn}>编辑</Button>

		      <Button type="primary" onClick={this.handleDelete.bind(this, record.adminUserId, record.adminUserState)}
                      style={this.state.deletebtn}>{record.adminUserState === 0 ? '禁用' : '启用'}</Button>

		    </span>
                )
            },
        }];

        const uploadButton1 = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">上传</div>
            </div>
        );

        const {addname, addusername, addpwd, addrepwd, img} = this.state;
        return (
            <Layout className='d_layout' style={{padding: 15,height:'100%'}}>

                <Header className="header">
                    <Row className="row">

                        <Col span={12}>
                            人员名称 : &nbsp;<Input type='text' style={{width: '200px'}} onChange={(e) => {
                            this.setState({
                                name: e.target.value
                            })
                        }} ref='name'></Input>
                        </Col>

                        <Col span={12}>

                            <Button type="primary" onClick={this.reFresh.bind(this)}>查询</Button>

                            <Button type="primary" style={this.state.addbtn} onClick={this.add.bind(this)}>新增</Button>


                        </Col>

                    </Row>
                </Header>
                <br/>
                <div className="">

                    <Table bordered columns={columns} showHeader={true} rowKey={record => record.id} pagination={false}
                           dataSource={userlist.object&&userlist.object.rows ? userlist.object.rows : []} className="table">

                    </Table>
                </div>

                <br/>
                <Footer className="footer" style={{backgroundColor: 'white'}}>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSize={this.state.pagesize} className="page" showQuickJumper={true}
                                current={this.state.current} onChange={this.onChange.bind(this)}
                                total={userlist.object ? userlist.object.rowCount : 0}/>
                </Footer>
                <Modal
                    title="新增工作人员"
                    visible={this.state.addmodal}
                    onOk={this.addhandleOk.bind(this)}
                    onCancel={this.addhandleCancel.bind(this)}
                    width='350px'
                >
                    <Row>
                        <Col span={6}>姓名 : </Col>
                        <Col span={18}><Input type='text' value={addname} onChange={(e) => {
                            this.setState({addname: e.target.value})
                        }} style={{width: '100px'}} ref='addname'/></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={6}>帐号 : </Col>
                        <Col span={18}><Input type='text' value={addusername} onChange={(e) => {
                            this.setState({addusername: e.target.value})
                        }} style={{width: '100px'}} ref='addusername'/></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={6}>密码 : </Col>
                        <Col span={18}><Input type='text' value={addpwd} onChange={(e) => {
                            this.setState({addpwd: e.target.value})
                        }} style={{width: '100px'}} ref='addpwd'/></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={6}>确认密码 : </Col>
                        <Col span={18}><Input type='text' value={addrepwd} onChange={(e) => {
                            this.setState({addrepwd: e.target.value})
                        }} style={{width: '100px'}} ref='addrepwd'/></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={6}>角色 : </Col>
                        <Col span={18}>

                            <Select defaultValue={1} style={{width: '120px'}} onChange={this.schange.bind(this)}>
                                {op}
                            </Select>

                        </Col>
                    </Row>
                    <br/>

                </Modal>

                <Modal
                    title="编辑工作人员"
                    visible={this.state.updatemodal}
                    onOk={this.updhandleOk.bind(this)}
                    onCancel={this.updhandleCancel.bind(this)}
                    width='350px'
                    key={this.state.newkey}
                >
                    <Row>
                        <Col span={6}>姓名 : </Col>
                        <Col span={18}><Input type='text' style={{width: '100px'}} value={this.state.upname}
                                              ref='addnames' onChange={(e) => {
                            this.setState({upname: e.target.value})
                        }}/></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={6}>帐号 : </Col>
                        <Col span={18}><Input type='text' style={{width: '100px'}} ref='addusernames'
                                              value={this.state.upuname} onChange={(e) => {
                            this.setState({upuname: e.target.value})
                        }}/></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={6}>密码 : </Col>
                        <Col span={18}><Input type='text' style={{width: '100px'}} ref='addpwds'
                                              value={this.state.uppwd} onChange={(e) => {
                            this.setState({uppwd: e.target.value})
                        }}/></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={6}>确认密码 : </Col>
                        <Col span={18}><Input type='text' style={{width: '100px'}} ref='addrepwds'
                                              value={this.state.uprepwd} onChange={(e) => {
                            this.setState({uprepwd: e.target.value})
                        }}/></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={6}>角色 : </Col>
                        <Col span={18}>

                            <Select defaultValue={this.state.uprid} style={{width: '120px'}}
                                    onChange={this.upchange.bind(this)}>
                                {op}
                            </Select>

                        </Col>
                    </Row>
                    <br/>

                </Modal>


            </Layout>
        );
    }
}


function mapStateToProps(state, props) {
    //console.log(state); 
    return {
        rolelist: state.rolelist,
        userlist: state.userlist,
        user: state.userInfo,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        getrolelist: bindActionCreators(getrolelist, dispatch),
        getuserlist: bindActionCreators(getuserlist, dispatch),
        updateuser: bindActionCreators(updateuser, dispatch),
        deleteuser: bindActionCreators(deleteuser, dispatch),
        adduser: bindActionCreators(adduser, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(P_manage);

