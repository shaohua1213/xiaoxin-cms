import {API_ROLE_SELECT} from '../constants/ActionType';

export function rolelist( state= {
    meta: {
        code: "-1",
        message: ""
    },
    object: {}
}, action ) {
    if(action.type !== API_ROLE_SELECT){
        return state;
    }
    return {
        meta: action.data?action.data.meta:{
            code: "-1",
            message: ""
        },
        object: action.data?action.data.object:{}
    };
}