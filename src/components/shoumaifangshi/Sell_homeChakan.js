import React, {Component} from "react";
import {connect} from 'react-redux';
import PageHeader from '../view/PageHeader'
import {Row, Col, Button, Select, Input, DatePicker, Table, Icon, Form, Modal, Pagination, Layout} from 'antd';
import '../home.css'
import {imageUrl} from '../../libs/utils/ImageUtils'
import Http from '../../libs/utils/Http';
import Shoumaifangshi from './ShoumaifangshiChakan'
import QishuEdit from './QishuEdit1'

const {Header, Content, Footer} = Layout;

const Option = Select.Option;

class kecheng extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            showBianji: false,
            canEdit: false, // 是否是编辑
            isChakan: false, // 是否是查看
            isXinjian: false, // 是否是新建
            qishuData: {}, // 当前的期数数据
        }
    }


    render() {

        const {showBianji,qishuData,canEdit,isChakan,isXinjian} = this.state;
        return (
            <div style={{}}>
                <Content style={{padding: 0,backgroundColor:'white',margin:0}}>
                    {
                        showBianji ? <QishuEdit isXinjian={isXinjian} qishuData={qishuData} canEdit={canEdit} isChakan={isChakan} showKechengEdit={()=>{this.setState({showBianji:false})}}/> : <Shoumaifangshi isXinjian={(e)=>{this.setState({isXinjian:e})}} qishuData={(e)=>{this.setState({qishuData:e})}} canEdit={(e)=>{this.setState({canEdit:e})}} isChakan={(e)=>{this.setState({isChakan:e})}} showKechengEdit={()=>{this.setState({showBianji:true})}}/>
                    }
                </Content>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch, props) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(kecheng);