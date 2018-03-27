import {
        API_MESSAGE_ADD,
        API_MESSAGE_DEL,
        API_MESSAGE_SELECT
    } from '../constants/ActionType';

export function selectmessage( state= { code: -1, msg:"", rows:[],pager:{} }, action ) {
    if( action.type !== API_MESSAGE_SELECT ){
        return state;
    }
    return { code: action.data.code, msg:action.data.msg?action.data.msg:"", rows:action.data.rows,pager:action.data.pager };
}

export function addmessage( state = {code: -1, msg:"", data:{}}, action ) {
    if( action.type !== API_MESSAGE_ADD ){
        return state;
    }
    return { code:action.data.code, msg:action.data.msg, data:action.data.data };
}

export function delmessage( state = {code: -1, msg:"", data:{}}, action ) {
    if( action.type !== API_MESSAGE_DEL ){
        return state;
    }
    return { code:action.data.code, msg:action.data.msg, data:action.data.data };
}

