import {
        API_HUODONG_SELECT,
        API_HUODONG_UPD
    } from '../constants/ActionType';

export function gethuodong( state= {code: -1, msg:"", rows:[],pager:{} }, action ) {
    if(action.type !== API_HUODONG_SELECT){
        return state;
    }
    return {code: action.data.code, msg:action.data.msg?action.data.msg:"", rows:action.data.rows,pager:action.data.pager};
}