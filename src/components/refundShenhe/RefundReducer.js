import {API_REFUND_SHENHE} from '../../constants/ActionType';


export function refundShenheList(state = {
    meta: {
        code: "-1",
        message: ""
    }, object: {}
}, action) {
    if (action.type !== API_REFUND_SHENHE) {
        return state;
    }
    return {
        meta: action.data ? action.data.meta : {
            code: "-1",
            message: ""
        }, object: action.data?action.data.object:{}
    };
}