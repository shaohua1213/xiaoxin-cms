import React, {Component} from "react";
import {Link } from 'react-router-dom';

import {Layout,  Row, Col, Button} from "antd";

class NoMatch extends Component {


    shouldComponentUpdate(nextProps, nextState, nextContext){

        return false;
    }


    render() {
        return (
            <Layout style={{height: '100vh', paddingTop:300, backgroundColor:'#ffffff'}}>
                <Row>
                    <Col span={4} offset={10} style={{textAlign:'center'}}>
                        当前页面未找到
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={4} offset={10} style={{textAlign:'center'}}>
                        <Link to="/"><Button type="primary" size={'default'}>返回首页</Button></Link>
                    </Col>
                </Row>
            </Layout>
        );
    }
}


export default NoMatch;