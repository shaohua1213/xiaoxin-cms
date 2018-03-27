import React, {Component} from "react";
import { Route } from 'react-router-dom';

import Loader from './Loader';
import App from './App';
import Login from './components/login/Login';
import AddNum from './components/addNum/AddNum'


class Root extends Component {

    render() {
        return (
            <div>
                <Route path="/" exact component={Loader}/>
                <Route path="/home" component={App}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/addNum" exact component={AddNum}/>
            </div>
        );
    }
}

export default (Root);