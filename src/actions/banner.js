import * as Type from '../constants/ActionType';

export function selectbanner(pagesize,pageno) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_BANNER_SELECT,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:{
          pageSize: pagesize,
          pageNo: pageno,
        },
        endPoint:"?platform=web"
    }
}

export function updatebanner(id,type,url,adurl,activityid) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_BANNER_UPDATE,
        method: Type.HTTP_POST,
        endPoint:"/"+id+"?platform=web",
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:{
          type: type,
          url: url,
          adurl:adurl,
          activityid:activityid,
        }
    }
}

export function addbanner(type,url,adurl,activityid) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_BANNER_ADD,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:{
          type: type,
          url: url,
          adurl:adurl,
          activityid:activityid,
        },
        endPoint:"?platform=web"
    }
}

export function delbanner(id) {
    return {
        type:Type.CALL_API_ACTION,
        apiType: Type.API_BANNER_DEL,
        method:Type.HTTP_GET,
        endPoint:"/"+id+"?platform=web",
    }
}
