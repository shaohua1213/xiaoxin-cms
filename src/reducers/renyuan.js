import {API_USER_SELECT} from '../constants/ActionType';
export function userlist( state= {
    meta: {
        code: "-1",
        message: ""
    }, object: {}
}, action ) {
    if(action.type !== API_USER_SELECT){
        return state;
    }
    return {
        meta: action.data ? action.data.meta : {
            code: "-1",
            message: ""
        }, object: action.data?action.data.object:{}
    };
}