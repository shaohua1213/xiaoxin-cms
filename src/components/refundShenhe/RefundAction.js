import * as Type from '../../constants/ActionType';

// 退款列表
/*
 {
 "applytimeEnd": "string",
 "applytimeStr": "string",
 "levelId": 0,
 "mobile": 0,
 "nickname": "string",
 "orderTimeEnd": "string",
 "orderTimeStr": "string",
 "ordersIdStr": "string",
 "pageno": 0,
 "pagesize": 0,
 "payTimeEnd": "string",
 "payTimeStr": "string",
 "phaseId": 0,
 "refundnum": "string",
 "refundtimeEnd": "string",
 "refundtimeStr": "string",
 "status": 0
 }
 * */
// type 1客服2财务
export function getRefundList(applytimeEnd, applytimeStr, levelId, mobile, nickname, orderTimeEnd, orderTimeStr, ordersIdStr, pageno, pagesize,
                              payTimeEnd, payTimeStr, phaseId, refundnum, refundtimeEnd, refundtimeStr, status,refundType,type) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_REFUND_SHENHE,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:type,
        data: {
            "applytimeEnd": applytimeEnd,
            "applytimeStr": applytimeStr,
            "levelId": levelId,
            "mobile": mobile,
            "nickname": nickname,
            "orderTimeEnd": orderTimeEnd,
            "orderTimeStr": orderTimeStr,
            "ordersIdStr": ordersIdStr,
            "pageno": pageno,
            "pagesize": pagesize,
            "payTimeEnd": payTimeEnd,
            "payTimeStr": payTimeStr,
            "phaseId": phaseId,
            "refundnum": refundnum,
            "refundtimeEnd": refundtimeEnd,
            "refundtimeStr": refundtimeStr,
            "status": status,
            "refundType": refundType,

            "phasecourseid": 0,
        },
    }
}
