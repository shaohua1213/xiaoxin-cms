import React, {Component} from "react";
import { connect } from 'react-redux';
import {Layout} from "antd";
const {Footer} = Layout;

class Foot extends Component {

    render() {
        return (
            <Footer className="my-horizontal-div" style={{padding:0,margin:0,alignItems:'center',justifyContent:'center'}}>
                {/*
                    <div style={{fontSize:14,color:'#999'}}>小新应用后台</div>
                */}
            </Footer>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLogin:state.isLogin,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Foot);