import * as Type from '../constants/ActionType';


export function gethuodong(name,pageSize, pageNo) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_HUODONG_SELECT,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:{
            name:name,
            pageSize:pageSize,
            pageNo: pageNo,
        },
        endPoint:"?platform=web"
    }
}


export function updhuodong(id, state) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_HUODONG_UPD,
        method: Type.HTTP_GET,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        
        endPoint:"/"+id+"/"+state+"?platform=web"
    }
}