import React, {Component} from "react";

import {Route} from 'react-router-dom';

import "./App.css";

import {Layout} from "antd";

import Body from './components/body/Body';
import Foot from './components/footer/Foot';
import Head from './components/header/Head';



class App extends Component {
    render() {
        return (
            <Layout style={{height: '100%'}}>
                <Route path="/home" component={Head} />
                <Route path="/home" component={Body} />
            </Layout>
        );
    }
}


export default App;