
import * as Type from '../constants/ActionType';


export function getbaobiao(str,end) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_SELECT_BAOBIAO,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:{
          strDate:str,
          endDate:end
        }
    }
}


export function exportbaobiao(id,state) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_EXPORT_BAOBIAO,
        method: Type.HTTP_GET,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:"/"+str+"/"+end
    }
}