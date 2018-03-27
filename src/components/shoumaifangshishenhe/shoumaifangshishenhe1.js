import React, {Component} from "react";
import {connect} from 'react-redux';
import PageHeader from '../view/PageHeader'
import {Row, Col, Button, Select, Input, DatePicker, Table, Icon, Form, Modal, Pagination, Layout} from 'antd';
import '../home.css'
import {imageUrl} from '../../libs/utils/ImageUtils'
import Http from '../../libs/utils/Http';
import QishuShenhe from './QishuShenhe'
import ShoumaiList1 from './ShoumaiList1'

const {Header, Content, Footer} = Layout;

const Option = Select.Option;

class Shoumaifangshishenhe1 extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            showBianji: false,
            canEdit: true, // 是否可以编辑 true 为不可以
            canShenhe: true, // 是否可以审核
            qishuData: {}, // 当前的期数数据
            shenheType: 2, // type 1产品审核2财务审核
        }
    }


    render() {

        const {showBianji,canEdit,qishuData,canShenhe} = this.state;
        return (
            <div style={{}}>
                <Content style={{padding: 0,backgroundColor:'white',margin:0}}>
                    {
                        showBianji ? <QishuShenhe shenheType={2} qishuData={qishuData} canEdit={canEdit} canShenhe={canShenhe}  showKechengEdit={()=>{this.setState({showBianji:false})}}/> :
                            <ShoumaiList1 qishuData={(e)=>{this.setState({qishuData:e})}} canEdit={(e)=>{this.setState({canShenhe:e})}} showKechengEdit={()=>{this.setState({showBianji:true})}}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(Shoumaifangshishenhe1);