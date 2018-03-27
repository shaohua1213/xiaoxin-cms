import React, {Component} from "react";
import { connect } from 'react-redux';
import User from './model/User';

class Loader extends Component {

    constructor(props, context) {
        super(props);
    }

    componentWillMount(){
        this.filterPath();
    }

    componentDidMount(){
    }

    componentWillUnmount(){

    }

    componentWillReceiveProps(nextProps, nextContext){

    }

    shouldComponentUpdate(nextProps, nextState, nextContext){
        return true;
    }

    componentWillUpdate(nextProps, nextState, nextContext){
        this.filterPath();
    }

    componentDidUpdate(prevProps, prevState, prevContext){
    }

    filterPath(){
        if(window.location.pathname !== "/"){
            return;
        }
        const {history} = this.props;
        history.push("/login")
        // if(User.isLogin()){
        //     history.push("/home");
        // }else{
        //     history.push("/login");
        // }
    }

    render() {
        return (
            <div style={{display:"none"}}></div>
        );
    }
}

function mapStateToProps(state, props) {
    return {

    }
}

function mapDispatchToProps(dispatch, props) {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Loader);