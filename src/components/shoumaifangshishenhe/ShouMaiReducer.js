import {
    API_LOGIN,
    API_LOGOUT,
    API_USER_INFO,
    API_USER_INFO_LIST,
    API_SHOUMAI_SHENHE_LIST,
    API_GETALL_CLASS_G,
    API_SHOUMAI_DEL
} from '../../constants/ActionType';

export function getShoumaiList(state = {
    meta: {
        code: "-1",
        message: ""
    },
    object: {}
}, action) {
    if (action.type !== API_SHOUMAI_SHENHE_LIST) {
        return state;
    }
    return {
        meta: action.data
            ? action.data.meta
            : {
                code: "-1",
                message: ""
            },
        object: action.data
            ? action.data.object
            : {}
    };
}
export function getAllclassList(state = {
    meta: {
        code: "-1",
        message: ""
    },
    object: {}
}, action) {
    if (action.type !== API_GETALL_CLASS_G) {
        return state;
    }
    return {
        meta: action.data
            ? action.data.meta
            : {
                code: "-1",
                message: ""
            },
        object: action.data
            ? action.data.object
            : {}
    };
}

// 售卖方式删除
export function adminPhaseDelete(state = {
    meta: {
        code: "-1",
        message: ""
    },
    object: {}
}, action) {
    if (action.type !== API_SHOUMAI_DEL) {
        return state;
    }
    return {
        meta: action.data
            ? action.data.meta
            : {
                code: "-1",
                message: ""
            },
        object: action.data
            ? action.data.object
            : {}
    };
}