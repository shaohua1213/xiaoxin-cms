import React, {Component} from "react";
import {connect} from 'react-redux';
import PageHeader from '../view/PageHeader'
import {Row, Col, Button, Select, Input, DatePicker, Table, Icon, Form, Modal, Pagination, Layout} from 'antd';
import '../home.css'
import {imageUrl} from '../../libs/utils/ImageUtils'
import Http from '../../libs/utils/Http';
import KechengBanbenList from './KechengBanbenList'
import KechengShenhe from './KechengShenhe'

const {Header, Content, Footer} = Layout;

const Option = Select.Option;

class kechengbanbenshenhe extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            showBianji: false,
            canEdit: false, // 是否可以编辑
            qishuData: undefined, // 当前的期数数据
            levelid: -1, // 当前的期数数据
            canShenhe: true, // 是否可以审核
            isChakan: true, // 是否可以查看
        }
    }


    render() {

        const {showBianji,qishuData,canEdit,levelid,canShenhe,isChakan} = this.state;
        return (
            <Content style={{padding: 0,backgroundColor:'white',margin:0}}>
                {
                    showBianji ? <KechengShenhe isChakan={isChakan} canShenhe={canShenhe} levelid={levelid} qishuData={qishuData} canEdit={canEdit} showKechengEdit={()=>{this.setState({showBianji:false})}}/> : <KechengBanbenList clevelid={levelid} levelid={(levelid)=>{this.setState({levelid:levelid})}} qishuData={(e)=>{this.setState({qishuData:e})}} canEdit={(e)=>{this.setState({canShenhe:e})}} isChakan={(e)=>{this.setState({isChakan:e})}} showKechengEdit={()=>{this.setState({showBianji:true})}}/>
                }
            </Content>
        );
    }
}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch, props) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(kechengbanbenshenhe);