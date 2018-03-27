import * as Type from '../../constants/ActionType';


// "bmendDate1": "string",
//     "bmendDate2": "string",
//     "bmstrDate1": "string",
//     "bmstrDate2": "string",
//     "kkendDate": "string",
//     "kkstrDate": "string",
export function shoumaiList(bmstrDate1 , bmstrDate2,bmendDate1, bmendDate2,kkendDate ,kkstrDate,pageno,pagesize,phaseid,phasename,state,verifystate) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_SHOUMAI_SHENHE_LIST,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:{
            bmendDate1:bmendDate1,
            bmendDate2:bmendDate2,
            bmstrDate1:bmstrDate1,
            bmstrDate2:bmstrDate2,
            kkendDate:kkendDate,
            kkstrDate:kkstrDate,
            pageno: pageno,
            pagesize: pagesize,
            phaseid: phaseid,
            phasename: phasename,
            state: state,
            verifystate: verifystate,
        },
    }
}
export function qishuXinxi(id) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_QISHUXINXI_G,
        method: Type.HTTP_GET,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:id,
    }
}
export function tijiaoshenhe(id) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_TIJIAOSHENHE_G,
        method: Type.HTTP_GET,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:id,
    }
}
// 审核
export function shenhe(id,type,state,name) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_SHENHE_G,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:id+'/'+type+'/'+state,
        data:{
            name:name
        }
    }
}

export function addQishu(data) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_ADD_QISHUXINXI_P,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:data,
    }
}
export function updateQishu(data) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_UPDATE_QISHUXINXI_P,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:data,
    }
}
export function allShenhetongguoClass() {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_GETALL_CLASS_G,
        method: Type.HTTP_GET,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
    }
}
// 售卖方式期数删除
export function adminPhaseDelete(id, state) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_SHOUMAI_DEL,
        method: Type.HTTP_GET,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:id+'/'+state,
    }
}
// 上架下架
export function phaseUp2On(id,state) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_PHASE_UP,
        method: Type.HTTP_GET,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:id+'/'+state,
    }
}