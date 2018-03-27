import * as Type from '../../constants/ActionType';


export function getRefundInfo(id) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_SHOUDONG_REFUND,
        method: Type.HTTP_GET,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:id,
    }
}
