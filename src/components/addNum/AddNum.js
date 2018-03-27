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
import {getUserInfoList, userInfoOut} from "../../actions/user";
import {bindActionCreators} from "redux";
const {Content, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class AddNum extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cuttentNum:0,
        }
        
    }

    componentWillMount(){
        const {getUserInfoList} = this.props;
        getUserInfoList();
    }

    render(){
        const {} = this.props;
        return(<div style={{width:100,height:100,background:'#f4f4f4',margin:'auto'}}>
            
        </div>)
    }
    
}

function mapStateToProps(state, props) {

    return {
        userInfoList: state.getUserInfoList.object
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        getUserInfoList: bindActionCreators(getUserInfoList, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNum);