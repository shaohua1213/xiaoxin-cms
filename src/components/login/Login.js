import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Icon, Layout, Form, Input, Button, Alert} from "antd";
import User from '../../model/User';
import {login,userInfo} from '../../actions/user';
import "./Login.css";
import logo from '../../image/logo.jpg';
const FormItem = Form.Item;

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            message:"",
        }

        // if(User.isLogin()){
        //     props.history.push("/home");
        // }
    }

    componentWillMount(){
        const {userInfo,history} = this.props;
        userInfo(0).then(data=>{
            if(data.meta.code==='0'){
                history.push("/home");
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.setState({isLoading:true, message:""});
            let{history, login} = this.props;
            login(values.userName, values.password).then((data) => {
                console.log(data)
                if(data.meta.code === '0'){
                    history.push("/home");
                }else if(data.meta.code === '115'){
                    history.push("/home");
                }else{
                    this.setState({isLoading:false, message:data.meta.message});
                }
            }).catch( (e) => {
                this.setState({isLoading:false, message:"请求出错，请稍后再试"});
            });
        });
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <Layout style={{height: '100vh'}}>
                <div className="loginclass">
                    <Form className="login-form">
                        <div className='imgclass'>
                            <div style={{fontSize:35,color:'#333'}}>KOOLEARN</div>
                            <h3 style={{marginTop:15}}>后台管理端</h3>
                        </div>
                        <div className="inputclass" style={{marginTop:20}}>
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入用户名(2-32位)!', min:2, max:32}],
                                })(
                                    <Input maxLength={20} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码(5-50位)!', min:5, max:50 }],
                                })(
                                    <Input maxLength={20} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                )}
                            </FormItem>
                        </div>
                        <FormItem>
                            <div className="sbutton">
                            <Button type="primary" size="large" htmlType="submit" loading={this.state.isLoading} className="login-form-button" onClick={this.handleSubmit.bind(this)} >
                                登录
                            </Button>
                                {this.state.message&&this.state.message.length > 0 ?<Alert style={{marginTop: 12}} message={this.state.message} banner closable />:<div></div> }
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </Layout>
        );
    }
}

function mapStateToProps(state, props) {
    //登陆返回的code
    return {

    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        login: bindActionCreators(login, dispatch),
        userInfo: bindActionCreators(userInfo, dispatch),
    }
}

const Login = Form.create()(LoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(Login);