import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Row, Col, Button, Input, DatePicker, Table, Icon, Form, Modal, Pagination, Layout, Checkbox,message} from 'antd';
import './style.css';
import {getrolelist} from '../../actions/Role';
import {updaterolename} from '../../actions/Role';
import {deleterole} from '../../actions/Role';
import {addrole} from '../../actions/Role';
import {updateqx} from '../../actions/Role';
import {Tree} from 'antd';
const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;
const success = Modal.success;
const FormItem = Form.Item;
const {Content} = Layout;
const {Header} = Layout;
const {Footer} = Layout;
const dateFormat = 'YYYY-MM-DD';
const quanxianrow1 = [
    {
        isChecked: false,
        id: 1,
        name: '角色管理'
    },
    {
        isChecked: false,
        id: 2,
        name: '管理员管理'
    },
    {
        isChecked: false,
        id: 3,
        name: '用户列表'
    },
    {
        isChecked: false,
        id: 4,
        name: '课程管理'
    },
    {
        isChecked: false,
        id: 5,
        name: '期数管理'
    },
    {
        isChecked: false,
        id: 6,
        name: '每日一句管理'
    },
    {
        isChecked: false,
        id: 7,
        name: '财务流水'
    },
    {
        isChecked: false,
        id: 8,
        name: '课程审核'
    },
    {
        isChecked: false,
        id: 9,
        name: '期数产品审核'
    },
    {
        isChecked: false,
        id: 10,
        name: '期数财务审核'
    },
    {
        isChecked: false,
        id: 11,
        name: '订单列表'
    },
    {
        isChecked: false,
        id: 12,
        name: '退款管理列表'
    },
    {
        isChecked: false,
        id: 13,
        name: '客服总监退款审核'
    },
    {
        isChecked: false,
        id: 14,
        name: '财务总监退款审核'
    },
    {
        isChecked: false,
        id: 15,
        name: '确认收入统计'
    },
    {
        isChecked: false,
        id: 16,
        name: '期数查看'
    },
    {
        isChecked: false,
        id: 17,
        name: '每日一句查看'
    },
    {
        isChecked: false,
        id: 18,
        name: '课程查看'
    },
    {
        isChecked: false,
        id: 19,
        name: '订单查看'
    },
];
class Role_manage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pagesize: 10,
            addmodal: false,
            namemodal: false,
            updatemodal: false,
            quanxianmodal: false,
            btnhide: {marginLeft: 10},
            deletebtn: {marginLeft: 10},
            checkvalue: [],
            quanxian: {},
            addbtn: {marginLeft: 10},
            nowid: 0,
            defaultqx: [],
            newkey: 1,
            updid: 0,
            upname: '',
            name: '',
            addname: '',
            idlist: [],
            roleid: -1,
            updname: '',
            quanxianrows: quanxianrow1,
        }

    }


    componentWillMount() {
        const {getrolelist} = this.props;
        //alert(name);
        getrolelist("", this.state.pagesize, this.state.current).then((data) => {
            console.log(data)
            if (data.meta.code == 0) {

            } else {
                confirm({
                    title: '提示',
                    content: data.meta.message,
                });
            }
        }).catch((e) => {
        });
    }

    onChange = (page) => {
        this.state.current = page;
        this.select();
    }
    //修改名称
    handleUpname(power, id, name) {
        this.setState({updatemodal: true, idlist: power, updid: id, updname: name});
    }

    //修改权限
    handleUpquanxian(power, id, quanxian1) {
        let quanxian = this.state.quanxianrows
        let def = [];
        for (let p of power) {
            def.push(p.powerId)
            for (let qx in quanxian) {
                if (quanxian[qx].id == p.powerId) { // 两个id相等 则选中
                    quanxian[qx].isChecked = true;
                }
            }
        }
        console.log(quanxian)
        this.setState({idlist: def, quanxianrows: quanxian});
        this.setState({updid: id});
        this.setState({quanxianmodal: true});
    }

    //删除
    handleDelete(id) {
        const {deleterole} = this.props;
        let me = this;
        confirm({
            title: '提示',
            content: '确定要删除吗?',
            onOk(){
                deleterole(id).then((data) => {
                    if (data.meta.code == 0) {
                        message.success('删除成功')
                        me.select();
                    } else {
                        message.error(data.meta.message&&data.meta.message!=''?data.meta.message:'删除成功')
                    }

                }).catch((e) => {
                });
            }
        });
    }

    reFresh(){
        this.setState({current:1})
        this.select()
    }

    select() {
        const {getrolelist} = this.props;
        let name = this.state.name;
        getrolelist(name == "" ? '' : name, this.state.pagesize, this.state.current).then((data) => {
            console.log(data)
            if (data.meta.code == 0) {

            } else {
                if (data.meta.message && data.meta.message != '') {
                    message.error(data.meta.message)
                }
            }
        }).catch((e) => {
        });
    }

    add() {
        this.setState({addmodal: true});
    }

    // 添加/修改权限
    addhandleOk(type) { // 1 添加 2 修改名称 3 修改权限

        const {addrole,updaterolename} = this.props;
        let {addname, idlist, updname, updid,quanxianrows} = this.state;
        let rollM = addrole;
        let cidlist = [];
        if (type!=1){
            rollM = updaterolename;
            for (let q of quanxianrows){
                if(q.isChecked){
                    cidlist.push(q.id)
                }
            }
        }
        if ((type === 1 && addname === '') || (type === 2 && updname === '')) {
            confirm({
                title: '提示',
                content: "名称不能为空",
            });
            return
        }
        rollM(cidlist, type === 1 ? -1 : updid, type === 1 ? addname : type === 2?updname:'').then((data) => {
            console.log(data)
            if (data.meta.code == 0) {
                this.current = 1;
                this.select();

                message.success(type === 1 ? '添加成功' : '修改成功')

                this.setState({
                    addmodal: false,
                    updatemodal: false,
                    quanxianmodal: false,
                    addname: '',
                    updid: -1,
                    idlist: [],
                });
            } else {
                message.error(data.meta.message != '' ? data.meta.message : type === 1 ? '添加失败' : '修改失败')
            }
        }).catch((e) => {
            console.log(e)
        });


    }

    addhandleCancel() {
        this.setState({addmodal: false});
    }

    updhandleCancel() {
        this.setState({updatemodal: false});
    }


    qxhandleCancel() {
        const quanxianrow2 = [
            {
                isChecked: false,
                id: 1,
                name: '角色管理'
            },
            {
                isChecked: false,
                id: 2,
                name: '管理员管理'
            },
            {
                isChecked: false,
                id: 3,
                name: '用户列表'
            },
            {
                isChecked: false,
                id: 4,
                name: '课程管理'
            },
            {
                isChecked: false,
                id: 5,
                name: '期数管理'
            },
            {
                isChecked: false,
                id: 6,
                name: '每日一句管理'
            },
            {
                isChecked: false,
                id: 7,
                name: '财务流水'
            },
            {
                isChecked: false,
                id: 8,
                name: '课程审核'
            },
            {
                isChecked: false,
                id: 9,
                name: '期数产品审核'
            },
            {
                isChecked: false,
                id: 10,
                name: '期数财务审核'
            },
            {
                isChecked: false,
                id: 11,
                name: '订单列表'
            },
            {
                isChecked: false,
                id: 12,
                name: '退款管理列表'
            },
            {
                isChecked: false,
                id: 13,
                name: '客服总监退款审核'
            },
            {
                isChecked: false,
                id: 14,
                name: '财务总监退款审核'
            },
            {
                isChecked: false,
                id: 15,
                name: '确认收入统计'
            },
            {
                isChecked: false,
                id: 16,
                name: '期数查看'
            },
            {
                isChecked: false,
                id: 17,
                name: '每日一句查看'
            },
            {
                isChecked: false,
                id: 18,
                name: '课程查看'
            },
            {
                isChecked: false,
                id: 19,
                name: '订单查看'
            },
        ];
        this.setState({
            quanxianmodal: false,
            idlist: [],
            quanxianrows: quanxianrow2,
            updid:-1,
        });
    }

    onCheck = (check) => {
        this.setState({checkvalue: check})

    }
    onSelect = (check, info) => {
        this.setState({checkvalue: check})
    }


    render() {
        const {rolelist, user} = this.props;
        const {quanxianrows} = this.state;

        const hide = {
            display: 'none',
        }


        const nohide = {
            marginLeft: '10px',
        }

        const columns = [{
            title: '编号',
            dataIndex: 'roleid',
            key: 'roleid',
            width: '25%',
        }, {
            title: '角色名称',
            dataIndex: 'rolename',
            key: 'rolename',
            width: '25%',
        }, {
            title: '操作',
            key: 'action',
            width: '35%',
            render: (text, record) => (
                <span>
		     
		      <Button type="primary"
                      onClick={this.handleUpname.bind(this, record.power, record.roleid, record.rolename)}
                      style={this.state.btnhide}>修改名称</Button>
		      <Button type="primary"
                      onClick={this.handleUpquanxian.bind(this, record.power, record.roleid, record.rolename)}
                      style={this.state.btnhide}>修改权限</Button>
		      <Button type="primary" onClick={this.handleDelete.bind(this, record.roleid)}
                      style={this.state.deletebtn}>删除</Button>

		    </span>
            ),
        }];


        return (
            <Layout className='d_layout' style={{padding: 15,height:'100%'}}>

                <Header className="header">

                    <Row className="row">

                        <Col span={12}>

                            角色名称 : &nbsp;
                            <Input
                                onChange={(e) => {
                                    this.setState({
                                        name: e.target.value,
                                    })
                                }}
                                value={this.state.name}
                                type='text'
                                style={{width: '200px'}}
                                ref='name'/>

                        </Col>

                        <Col span={12} >

                            <Button className="right" type="primary" onClick={this.reFresh.bind(this)}>查询</Button>

                            <Button className="right" type="primary" style={this.state.addbtn}
                                    onClick={this.add.bind(this)}>新增</Button>

                        </Col>

                    </Row>
                </Header>
                <br/>

                <Table bordered columns={columns} rowKey={record => record.id} pagination={false}
                       dataSource={rolelist.object ? rolelist.object.rows ? rolelist.object.rows : [] : []}
                       className="table">
                </Table>
                <br/>
                <Footer className="footer" style={{backgroundColor: 'white'}}>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSize={this.state.pagesize} className="page" showQuickJumper={true}
                                current={this.state.current} onChange={this.onChange.bind(this)}
                                total={rolelist.object && rolelist.object.rowCount ? rolelist.object.rowCount : 0}/>
                </Footer>
                <Modal
                    title="新增角色"
                    visible={this.state.addmodal}
                    onOk={this.addhandleOk.bind(this, 1)}
                    onCancel={this.addhandleCancel.bind(this)}
                    width='350px'
                >
                    <Row>
                        <Col span={24}>角色名称 : <Input onChange={(e) => {
                            this.setState({
                                addname: e.target.value
                            })
                        }} type='text' ref='addname'/></Col>
                    </Row>

                </Modal>


                <Modal
                    title="修改角色名称"
                    visible={this.state.updatemodal}
                    onOk={this.addhandleOk.bind(this, 2)}
                    onCancel={this.updhandleCancel.bind(this)}
                    width='350px'
                >
                    <Row>
                        <Col span={24}>角色名称 : <Input type='text' value={this.state.updname} ref='updname'
                                                     onChange={(e) => {
                                                         this.setState({updname: e.target.value})
                                                     }}/></Col>
                    </Row>

                </Modal>


                <Modal
                    title="修改角色权限"
                    visible={this.state.quanxianmodal}
                    onOk={this.addhandleOk.bind(this, 3)}
                    onCancel={this.qxhandleCancel.bind(this)}
                    width='350px'
                >
                    <Row>
                        <Col span={24}>

                            {
                                quanxianrows.map((data,w) => (
                                    <div>
                                        <Checkbox onChange={() => {
                                            let q = quanxianrows;
                                            q[w].isChecked = !quanxianrows[w].isChecked
                                            this.setState({quanxianrows:q})
                                            console.log(q)
                                        }} checked={data.isChecked}>{data.name}
                                        </Checkbox>
                                    </div>
                                ))
                            }

                        </Col>
                    </Row>

                </Modal>

            </Layout>
        );
    }
}

function mapStateToProps(state, props) {
    //console.log(state); 
    return {
        rolelist: state.rolelist,
        user: state.userInfo,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        getrolelist: bindActionCreators(getrolelist, dispatch),
        updaterolename: bindActionCreators(updaterolename, dispatch),
        deleterole: bindActionCreators(deleterole, dispatch),
        addrole: bindActionCreators(addrole, dispatch),
        updateqx: bindActionCreators(updateqx, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role_manage);

