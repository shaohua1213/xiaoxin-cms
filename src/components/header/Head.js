import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Avatar, Row, Col, Button, Modal} from "antd";
import './Head.css';
import {userInfo} from '../../actions/user';
import User from '../../model/User';
import {logout,config} from '../../actions/user';
import {imageUrl,setSrc} from '../../libs/utils/ImageUtils'
const confirm = Modal.confirm;
const {Header} = Layout;


class Head extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    componentWillMount() {
        const {userInfoAction,history,config} = this.props;
        userInfoAction(0).then((data)=>{
            if(data.meta.code==='104'){
                history.push("/login");
            }
        });
        // 获取配置信息
        config().then(data=>{
            if(data.meta.code==='0'){
                setSrc(data.object.resource_domain)
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    handlerLogout = (e) => {
        //redux 调用登出接口
        const {history, logout}  = this.props;
        //在构造函数中this表示构造函数，而不是Component的this,所以需要先定义为常量
        let ctx = this;
        confirm({
            title: '确定退出登录吗？',
            content: '',
            onOk() {
                //将按钮设置为加载中
                ctx.setState({isLoading: true});
                logout().then((data) => {
                    if (data.meta.code === '0') {
                        // User.clear();
                        history.push("/login");
                    } else {
                        //取消按钮设置为加载中
                        ctx.setState({isLoading: false});
                        Modal.error({
                            title: data.meta.message,
                            content: '',
                        });
                    }
                }).catch((e) => {

                    //取消按钮设置为加载中
                    ctx.setState({isLoading: false});
                    Modal.error({
                        title: '请求出错，请稍后再试',
                        content: '',
                    });
                });
            },
            onCancel() {

            },
        });
    }


    render() {
        const {user} = this.props;
        return (
            <Header className="ant-layout-header1">
                <Row>
                    <Col span={2}><span style={{
                        marginLeft: 10,
                        fontSize: 16,
                        marginBottom: '10px',
                        color:'white'
                    }}>{user?(user.object && user.object.adminUserNickname != '' ? user.object.adminUserNickname : '管理员'):'管理员'}</span></Col>
                    <Col span={2} offset={20}>
                        <Button loading={this.state.isLoading} icon={'logout'} onClick={this.handlerLogout.bind(this)}>退出登录</Button>
                    </Col>
                </Row>
            </Header>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.userInfo,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        logout: bindActionCreators(logout, dispatch),
        userInfoAction: bindActionCreators(userInfo, dispatch),
        config: bindActionCreators(config, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Head);