import {API_LOGIN, API_LOGOUT, API_USER_INFO,API_USER_INFO_LIST,API_LOG,API_CONFIG} from '../constants/ActionType';
import User from '../model/User';

const userInitInfo = User.info();

export function login(state = {
    meta: {
        code: "-1",
        message: ""
    }, object: {}
}, action) {
    if (action.type !== API_LOGIN) {
        return state;
    }
    return {
        meta: action.data ? action.data.meta : {
            code: "-1",
            message: ""
        }, object: action.data?action.data.object:{}
    };
}

export function logout(state = {code: -1, msg: "", data: {}}, action) {
    if (action.type !== API_LOGOUT) {
        return state;
    }
    return {
        meta: action.data ? action.data.meta : {
            code: "-1",
            message: ""
        }, object: action.data?action.data.object:{}
    };
}

export function userInfo(state = {
    meta: {
        code: "-1",
        message: ""
    }, object: {}
}, action) {

    if (action.type !== API_USER_INFO) {
        return state;
    }
    return {
        meta: action.data ? action.data.meta : {
            code: "-1",
            message: ""
        }, object: action.data?action.data.object:{}
    };

}
export function gShowLog(state = {
    meta: {
        code: "-1",
        message: ""
    }, object: []
}, action) {

    if (action.type !== API_LOG) {
        return state;
    }
    return {
        meta: action.data ? action.data.meta : {
            code: "-1",
            message: ""
        }, object: action.data?action.data.object:[]
    };

}

// 获取用户信息列表
export function getUserInfoList(
    state = { meta: {
        code: "-1",
        message: ""
    }, object: {} },
    action
) {
    if (action.type !== API_USER_INFO_LIST) {
        return state;
    }
    return {
        meta: action.data ? action.data.meta : {
            code: "-1",
            message: ""
        }, object: action.data?action.data.object:{}
    };
}
export function getConfig(
    state = { meta: {
        code: "-1",
        message: ""
    }, object: {} },
    action
) {
    if (action.type !== API_CONFIG) {
        return state;
    }
    return {
        meta: action.data ? action.data.meta : {
            code: "-1",
            message: ""
        }, object: action.data?action.data.object:{}
    };
}