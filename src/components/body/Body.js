import React, {Component} from "react";

import {Route, Link} from 'react-router-dom';

import {Icon, Layout, Menu} from "antd";

import Home from '../../components/Home';
import UserInfoList from '../../components/userinfo/userinfolist';
import Kecheng from '../../components/kecheng/kecheng';
import KechengChakan from '../../components/kecheng/kechengChakan';
import Sell_home from '../../components/shoumaifangshi/Sell_home';
import Sell_homeChakan from '../../components/shoumaifangshi/Sell_homeChakan';
import Meiriyiju from '../../components/meiriyiju/meiriyiju';
import MeiriyijuChakan from '../../components/meiriyiju/meiriyijuChakan';
import Dingdanliebiao from '../../components/dingdanliebiao/dingdanliebiao';
import DingdanliebiaoChakan from '../../components/dingdanliebiao/dingdanliebiaoChakan';
import Kechengbanbenshenhe from '../../components/kechengbanbenshenhe/kechengbanbenshenhe';
import Shoumaifangshishenhe from '../../components/shoumaifangshishenhe/shoumaifangshishenhe';
import Shoumaifangshishenhe1 from '../../components/shoumaifangshishenhe/shoumaifangshishenhe1';
import Role_manage from '../../components/role_manage/Role_manage';
import P_manage from '../../components/p_manage/P_manage';
import FinanceWater from '../financewater/FinanceWater';
import RefundManage from '../refundManage/RefundManage';
import RefundShenheKefu from '../refundShenhe/RefundShenheKefu';
import RefundShenheCaiwu from '../refundShenhe/RefundShenheCaiwu';
import Earnings from '../earnings/Earnings';
import {connect} from 'react-redux';
const {Content, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class Body extends Component {

    constructor(props) {
        super(props);
        this.state = {

            bannermenu: {},
            rolemenu: {},
            usermenu: {},
            huodongmenu: {},
        }
        let paths = window.location.hash.substr(1).split("/");
        let path = '';
        if (paths.length > 0) {
            path = paths[paths.length - 1];
        }
        // console.log(paths,path)
        if (path === 'home') {
            props.history.push('/home/homepage')
        }

    }

    componentWillMount() {

    }


    sideSelectKey() {
        let paths = window.location.hash.substr(1).split("/");
        //let paths = window.location.pathname.substr(1).split("/");
        let path = 'home';
        if (paths.length > 0) {
            path = paths[paths.length - 1];
        }
        path = path == "" ? "home" : path;
        if (path !== 'home' && path !== 'Kecheng' && path !== 'userinfolist' && path !== 'Sell_home' && path !== 'shoumaifangshi' && path !== 'meiriyiju'
            && path !== 'dingdanliebiao' && path !== 'kechengbanbenshenhe' && path !== 'shoumaifangshishenhe_caiwu' && path !== 'shoumaifangshishenhe_chanpin' && path !== 'role_manage'
            && path !== 'p_manage'&& path !== 'financeWater'&& path !== 'refundManage'
            && path !== 'earnings'&& path !== 'refundShenheKefu'&& path !== 'refundShenheCaiwu'&& path !== 'dingdanliebiaoChakan'
            && path !== 'kechengxitongChakan'&& path !== 'meiriyijuChakan'&& path !== 'shoumaifangshiChakan'
        ) {
            path = 'home';
        }
        return path;
    }

    handleClick(e) {

    }

    render() {
        const {user} = this.props;
        const hide = {
            display: 'none',
        }
        const nohide = {}
        let yonghuxinxi = hide
        let kechengxitongS = hide
        let kechengxitong = hide
        let kechengxitongChakan = hide
        let yunyingxitong = hide
        let shoumaifangshi = hide
        let shoumaifangshiChakan = hide
        let meiriyiju = hide
        let meiriyijuChakan = hide
        let caiwuxitong = hide
        let caiwuliushui = hide
        let querenshouru = hide
        let kefuxitong = hide // ---------新增的客服系统
        let dingdanliebiao = hide
        let dingdanliebiaoChakan = hide
        let tuikuanguanli = hide
        let shenhexitong = hide
        let kefuzongjian = hide
        let caiwuzongjian = hide
        let kechengshenhe = hide
        let shoumaishenhe = hide
        let shenhe_caiwu = hide
        let jiaoseguanli = hide
        let renyuanguanli = hide

        if (user) {
            if (user.meta && user.meta.code === '0') {
                console.log(user)
                if (user.object && user.object.power) {
                    let quanxian = user.object.power;
                    for (let p of quanxian) {
                        let powerName = p.powerName
                        switch (powerName) {
                            case '角色管理':
                                jiaoseguanli = {};
                                break
                            case '用户列表':
                                yonghuxinxi = {};
                                break
                            case '管理员管理':
                                renyuanguanli = {};
                                break
                            case '课程管理':
                                kechengxitong = {};
                                kechengxitongS = {};
                                break
                            case '课程查看':
                                kechengxitongChakan = {};
                                kechengxitongS = {};
                                break
                            case '期数管理':
                                yunyingxitong = {};
                                shoumaifangshi = {};
                                break
                            case '期数查看':
                                yunyingxitong = {};
                                shoumaifangshiChakan = {};
                                break
                            case '每日一句管理':
                                yunyingxitong = {};
                                meiriyiju = {};
                                break
                            case '每日一句查看':
                                yunyingxitong = {};
                                meiriyijuChakan = {};
                                break
                            case '财务流水':
                                caiwuxitong = {};
                                caiwuliushui = {};
                                break
                            case "确认收入统计":
                                caiwuxitong = {};
                                querenshouru = {};
                                break
                            case "订单列表":
                                kefuxitong = {};
                                dingdanliebiao = {};
                                break
                            case "订单查看":
                                kefuxitong = {};
                                dingdanliebiaoChakan = {};
                                break
                            case "退款管理列表":
                                kefuxitong = {};
                                tuikuanguanli = {};
                                break
                            case '课程审核':
                                shenhexitong = {};
                                kechengshenhe = {};
                                break
                            case '期数产品审核':
                                shenhexitong = {};
                                shoumaishenhe = {};
                                break
                            case '期数财务审核':
                                shenhexitong = {};
                                shenhe_caiwu = {};
                                break
                            case '客服总监审核':
                                shenhexitong = {};
                                kefuzongjian = {};
                                break
                            case '财务总监审核':
                                shenhexitong = {};
                                caiwuzongjian = {};
                                break
                        }
                    }
                }
            }
        }
        return (
            <Layout>
                <Sider width={200} style={{background: '#fff', overflow: 'none',}} ref="silder">
                    <Menu
                        mode="inline"
                        selectedKeys={[this.sideSelectKey()]}
                        onClick={this.handleClick.bind(this)}
                        style={{height: '100%'}}
                    >
                        <Menu.Item key="home">
                            <Link to="/home/homepage"><span>
                                <Icon type="home"/>
                                <span className="nav-text">首页</span>
                              </span></Link>
                        </Menu.Item>
                        <SubMenu style={yonghuxinxi} key="sub1"
                                 title={<span><Icon type="picture"/><span>用户系统</span></span>}>
                            <Menu.Item key="userinfolist">
                                <Link to="/home/userinfolist">
                                    <span>
                                        <span className="nav-text">用户信息列表</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu style={kechengxitongS} key="sub2"
                                 title={<span><Icon type="appstore-o"/><span>课程系统</span></span>}>
                            <Menu.Item key="Kecheng" style={kechengxitong}>
                                <Link to="/home/Kecheng">
                                    <span>
                                        <span className="nav-text">课程管理</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="kechengxitongChakan" style={kechengxitongChakan}>
                                <Link to="/home/kechengxitongChakan">
                                    <span>
                                        <span className="nav-text">课程查看</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu style={yunyingxitong} key="sub3"
                                 title={<span><Icon type="dashboard"/><span>运营系统</span></span>}>
                            <Menu.Item key="shoumaifangshi" style={shoumaifangshi}>
                                <Link to="/home/shoumaifangshi">
                                    <span>
                                        <span className="nav-text">期数管理</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="shoumaifangshiChakan" style={shoumaifangshiChakan}>
                                <Link to="/home/shoumaifangshiChakan">
                                    <span>
                                        <span className="nav-text">期数查看</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="meiriyiju" style={meiriyiju}>
                                <Link to="/home/meiriyiju">
                                    <span>
                                        <span className="nav-text">每日一句</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="meiriyijuChakan" style={meiriyijuChakan}>
                                <Link to="/home/meiriyijuChakan">
                                    <span>
                                        <span className="nav-text">每日一句查看</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu style={caiwuxitong} key="sub4"
                                 title={<span><Icon type="pay-circle-o" /><span>财务系统</span></span>}>
                            <Menu.Item key="financeWater" style={caiwuliushui}>
                                <Link to="/home/financeWater">
                                    <span>
                                        <span className="nav-text">财务流水</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="earnings" style={querenshouru}>
                                <Link to="/home/earnings">
                                    <span>
                                        <span className="nav-text">确认收入统计</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu style={kefuxitong} key="sub5"
                                 title={<span><Icon type="phone" /><span>客服系统</span></span>}>
                            <Menu.Item key="dingdanliebiao" style={dingdanliebiao}>
                                <Link to="/home/dingdanliebiao">
                                    <span>
                                        <span className="nav-text">订单管理</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="dingdanliebiaoChakan" style={dingdanliebiaoChakan}>
                                <Link to="/home/dingdanliebiaoChakan">
                                    <span>
                                        <span className="nav-text">订单查看</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="refundManage" style={tuikuanguanli}>
                                <Link to="/home/refundManage">
                                    <span>
                                        <span className="nav-text">退款管理</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu style={shenhexitong} key="sub6"
                                 title={<span><Icon type="api"/><span>审核系统</span></span>}>
                            <Menu.Item key="kechengbanbenshenhe" style={kechengshenhe}>
                                <Link to="/home/kechengbanbenshenhe">
                                    <span>
                                        <span className="nav-text">课程版本审核</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="shoumaifangshishenhe_chanpin" style={shoumaishenhe}>
                                <Link to="/home/shoumaifangshishenhe_chanpin">
                                    <span>
                                        <span className="nav-text">期数管理-产品审核</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="shoumaifangshishenhe_caiwu" style={shenhe_caiwu}>
                                <Link to="/home/shoumaifangshishenhe_caiwu">
                                    <span>
                                        <span className="nav-text">期数管理-财务审核</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="refundShenheKefu" style={kefuzongjian}>
                                <Link to="/home/refundShenheKefu">
                                    <span>
                                        <span className="nav-text">退款管理-客服审核</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="refundShenheCaiwu" style={caiwuzongjian}>
                                <Link to="/home/refundShenheCaiwu">
                                    <span>
                                        <span className="nav-text">退款管理-财务审核</span>
                                    </span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>

                        <Menu.Item style={jiaoseguanli} key="role_manage">
                            <Link to="/home/role_manage"><span>
                                <Icon type="user-add"/>
                                <span className="nav-text">角色管理</span>
                                </span></Link>
                        </Menu.Item>
                        <Menu.Item key="p_manage" style={renyuanguanli}>
                            <Link to="/home/p_manage"><span>
                                <Icon type="idcard"/>
                                <span className="nav-text">人员管理</span>
                                </span></Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{background: '#fff', padding: '0px 0px 0px 2px', margin: 0}}>
                    <Route path="/home/homepage" component={Home}/>
                    <Route path="/home/userinfolist" component={UserInfoList}/>
                    <Route path="/home/Kecheng" component={Kecheng}/>
                    <Route path="/home/kechengxitongChakan" component={KechengChakan}/>
                    {/*<Route path="/home/shoumaifangshi" component={Shoumaifangshi}/>*/}
                    <Route path="/home/shoumaifangshi" component={Sell_home}/>
                    <Route path="/home/shoumaifangshiChakan" component={Sell_homeChakan}/>
                    <Route path="/home/meiriyiju" component={Meiriyiju}/>
                    <Route path="/home/meiriyijuChakan" component={MeiriyijuChakan}/>
                    <Route path="/home/dingdanliebiao" component={Dingdanliebiao}/>
                    <Route path="/home/dingdanliebiaoChakan" component={DingdanliebiaoChakan}/>
                    <Route path="/home/kechengbanbenshenhe" component={Kechengbanbenshenhe}/>
                    <Route path="/home/shoumaifangshishenhe_chanpin" component={Shoumaifangshishenhe}/>
                    <Route path="/home/shoumaifangshishenhe_caiwu" component={Shoumaifangshishenhe1}/>
                    <Route path="/home/role_manage" component={Role_manage}/>
                    <Route path="/home/p_manage" component={P_manage}/>
                    <Route path="/home/financeWater" component={FinanceWater}/>
                    <Route path="/home/refundManage" component={RefundManage}/>
                    <Route path="/home/earnings" component={Earnings}/>
                    <Route path="/home/refundShenheKefu" component={RefundShenheKefu}/>
                    <Route path="/home/refundShenheCaiwu" component={RefundShenheCaiwu}/>
                </Content>
            </Layout>
        );
    }
}

function mapStateToProps(state, props) {

    return {
        user: state.userInfo,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);