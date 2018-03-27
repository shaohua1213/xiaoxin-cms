import * as Type from '../constants/ActionType';

export function getrolelist(content,pagesize,pageno) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_ROLE_SELECT,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:{
            name : content,
            pagesize: pagesize,
            pageno: pageno,
        }
    }
}

export function addrole(idlist,roleid,name) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_ROLE_ADD,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:{
            idlist:idlist,
            roleid:roleid,
            rolename:name,
        }
    }
}


export function updaterolename(idlist,roleid,name) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_ROLE_UPDATE,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:{
            idlist:idlist,
            roleid:roleid,
            rolename:name,
        }
    }
}

export function updateqx(id,doctor,jigou,guke,renyuan,chufang,message,banner,role) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_ROLE_QX,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:'/'+id,
        data:{
        'doctor':doctor,
        'jigou':jigou,
        'guke':guke,
        'renyuan':renyuan,
        'chufang':chufang,
        'message':message,
        'banner':banner,
        'role':role,
        }
    }
}


export function deleterole(id) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_ROLE_DELETE,
        method: Type.HTTP_GET,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:'/'+id,
    }
}
