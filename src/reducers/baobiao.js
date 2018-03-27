import {        
        API_SELECT_BAOBIAO
    } from '../constants/ActionType';

export function baobiaoinfo( state= { code: -1, msg:"", rows:[],pager:{} }, action ) {
    if( action.type !== API_SELECT_BAOBIAO ){
        return state;
    }
    return { code: action.data.code, msg:action.data.msg?action.data.msg:"", rows:action.data.rows};
}