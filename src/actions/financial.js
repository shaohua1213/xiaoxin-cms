import * as Type from "../constants/ActionType";

// 订单列表
export function adminGetOrderList(levelId,
                                  mobile,
                                  nickname,
                                  orderTimeEnd,
                                  orderTimeStr,
                                  ordersIdStr,
                                  pageno,
                                  pagesize,
                                  payTimeEnd,
                                  payTimeStr,
                                  phaseId,
                                  status,
                                  phasecourseid,) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_FINANCIAL_LIST,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data: {
            levelId: levelId,
            mobile: mobile,
            nickname: nickname,
            orderTimeEnd: orderTimeEnd,
            orderTimeStr: orderTimeStr,
            ordersIdStr: ordersIdStr,
            pageno: pageno,
            pagesize: pagesize,
            payTimeEnd: payTimeEnd,
            payTimeStr: payTimeStr,
            phaseId: phaseId,
            status,
            phasecourseid: phasecourseid,
        }
    };
}
// 财务流水
export function caiwuWaterList(levelid,
                               mobile,
                               nickname,
                               pageno,
                               pagesize,
                               paytype,
                               phasecourseid,
                               phaseid,
                               relate_type,
                               relatenum,
                               trade_num,
                               tradetimeEnd,
                               tradetimeStr,) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_CAIWU_WATER,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data: {
            "levelid": levelid,
            "mobile": mobile,
            "nickname": nickname,
            "pageno": pageno,
            "pagesize": pagesize,
            "paytype": paytype,
            "phasecourseid": phasecourseid,
            "phaseid": phaseid,
            "relate_type": relate_type,
            "relatenum": relatenum,
            "trade_num": trade_num,
            "tradetimeEnd": tradetimeEnd,
            "tradetimeStr": tradetimeStr
        }
    };
}
/*
 {
 "applytimeEnd": "string",
 "applytimeStr": "string",
 "phasecourseid": 0,
 "refundType": 0,
 "status": 0
 }

 */
//期数

export function GetVerPhaseList() {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_FINANCIAL_PHASELIST,
        method: Type.HTTP_GET,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON
    }
}
