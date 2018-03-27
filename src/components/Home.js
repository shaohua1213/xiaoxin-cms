import React, {Component} from "react";
import {connect} from 'react-redux';
import logo from '../image/logo.jpg';

import "./home.css";

class Home extends Component {

    render() {

        const {user} = this.props;

        return (
            <div>
                <div className="my-div"
                     style={{height: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div className="my-div"
                         style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                         marginTop:-200,marginLeft:-180}}>
                        <h1 style={{fontSize:40,}}>KOOLEARN</h1>
                        <p style={{fontSize:20,}}>煎蛋英语管理平台</p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.userInfo.data,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

