import {
        API_BANNER_SELECT,
        API_BANNER_ADD,
        API_BANNER_DEL,
        API_BANNER_UPDATE
    } from '../constants/ActionType';

export function selectbanner( state= {code: -1, msg:"", rows:[],pager:{} }, action ) {
    if(action.type !== API_BANNER_SELECT){
        return state;
    }
    return {code: action.data.code, msg:action.data.msg?action.data.msg:"", rows:action.data.rows,pager:action.data.pager};
}

export function addbanner( state = {code: -1, msg:"", data:{}}, action ) {
    if(action.type !== API_BANNER_ADD){
        return state;
    }
    return {code:action.data.code, msg:action.data.msg, data:action.data.data};
}

export function delbanner( state = {code: -1, msg:"", data:{}}, action ) {
    if(action.type !== API_BANNER_DEL){
        return state;
    }
    return {code:action.data.code, msg:action.data.msg, data:action.data.data};
}

export function updatebanner( state = {code: -1, msg:"", data:{}}, action ) {
    if(action.type !== API_BANNER_UPDATE){
        return state;
    }
    return {code:action.data.code, msg:action.data.msg, data:action.data.data};
}
