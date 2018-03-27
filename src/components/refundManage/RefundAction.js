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
export function getRefundList(applytimeEnd, applytimeStr, levelId, mobile, nickname, orderTimeEnd, orderTimeStr, ordersIdStr, pageno, pagesize,
                              payTimeEnd, payTimeStr, phaseId, refundnum, refundtimeEnd, refundtimeStr, status,refundType) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_REFUND_LIST,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
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
        },
    }
}
export function refundCommit(id,refunddesc,refundprice) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_REFUND_COMMIT,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data: {
            "id": id,
            "refunddesc": refunddesc,
            "refundprice": refundprice
        },
    }
}
// 再次提交退款
export function rRefundCommit(id,refunddesc,refundprice,logdesc,type) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_REFUND_R_COMMIT,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:id+'/'+type,
        data: {
            "refunddesc": refunddesc,
            "refundprice": refundprice,
            "logdesc": logdesc,
        },
    }
}
// id传退款单id,type 1客服总监审核2财务总监审核 state0通过1不通过,原因传name里
export function refundShenheCommit(id,type,state,yijian) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_REFUND_SHENHE_COMMIT,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:id+'/'+type+'/'+state,
        data: {
            "name": yijian,
        },
    }
}
// 查看接口
export function refundChakan(id) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_REFUND_SHENHE_CHAKAN,
        method: Type.HTTP_GET,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:id,
    }
}
// 重新退款
export function reRefund(id) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_RE_REFUND,
        method: Type.HTTP_GET,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:id,
    }
}
