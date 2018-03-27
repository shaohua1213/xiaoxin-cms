import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import * as user from './reducers/user';
import * as banner from './reducers/banner';

import * as huodong from './reducers/huodong';

import * as role from './reducers/role';
import * as ulist from './reducers/renyuan';
import * as Shoumai from './components/shoumaifangshishenhe/ShouMaiReducer';
import * as meiriyiju from "./reducers/meiriyiju";
import * as course from "./reducers/course";
import * as financial from "./reducers/financial";
import * as RefundReducer from "./components/refundManage/RefundReducer";
import * as RefundShenheReducer from "./components/refundShenhe/RefundReducer";
const Reducer = combineReducers(Object.assign({
        routing: routerReducer,
    },
    user,
    banner,
    role,
    ulist,
    Shoumai,
    huodong,
    meiriyiju,
    course,
    financial,
    RefundReducer,
    RefundShenheReducer,
));


export default Reducer