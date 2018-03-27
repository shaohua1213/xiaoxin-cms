import {
    API_FINANCIAL_LIST,
    API_FINANCIAL_PHASELIST,
    API_CAIWU_WATER
} from "../constants/ActionType";

// 订单列表
export function GetOrderList(state = {
    meta: {
        code: "-1",
        message: ""
    },
    object: {}
},
                             action) {
    if (action.type !== API_FINANCIAL_LIST) {
        return state;
    }
    return {
        meta: action.data
            ? action.data.meta
            : {
            code: "-1",
            message: ""
        },
        object: action.data ? action.data.object : {}
    };
}

// 期数
export function GetVerPhaseList(state = {
    meta: {
        code: "-1",
        message: ""
    },
    object: {}
},
                                action) {
    if (action.type !== API_FINANCIAL_PHASELIST) {
        return state;
    }
    return {
        meta: action.data
            ? action.data.meta
            : {
            code: "-1",
            message: ""
        },
        object: action.data ? action.data.object : {}
    };
}

export function caiwuWaterListData(state = {
    meta: {
        code: "-1",
        message: ""
    },
    object: {}
},
                                action) {
    if (action.type !== API_CAIWU_WATER) {
        return state;
    }
    return {
        meta: action.data
            ? action.data.meta
            : {
            code: "-1",
            message: ""
        },
        object: action.data ? action.data.object : {}
    };
}