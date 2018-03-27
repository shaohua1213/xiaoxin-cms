import * as Type from '../constants/ActionType';

export function login(name, passwd) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_LOGIN,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:{
            username:name,
            password: passwd,
        },
    }
}

export function logout() {
    return {
        type:Type.CALL_API_ACTION,
        apiType: Type.API_LOGOUT,
        method:Type.HTTP_GET,
    }
}

export function config() {
    return {
        type:Type.CALL_API_ACTION,
        apiType: Type.API_CONFIG,
        method:Type.HTTP_GET,
    }
}

export function userInfo(id){
    return {
        type:Type.CALL_API_ACTION,
        apiType: Type.API_USER_INFO,
        method:Type.HTTP_GET,
        endPoint:id
    }
}
export function cShowlog(id,cid){
    return {
        type:Type.CALL_API_ACTION,
        apiType: Type.API_LOG,
        method:Type.HTTP_GET,
        endPoint:id+'/'+cid
    }
}


export function changepwd(beforepwd, nowpwd) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_CHANGEPWD,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:{
            beforepwd:beforepwd,
            nowpwd: nowpwd,
        },
        endPoint:"?platform=web"
    }
}

//获取用户信息列表

export function getUserInfoList(
    endDate,
    nickname,
    pageno,
    pagesize,
    phone,
    strDate
) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_USER_INFO_LIST,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data: {
            endDate: endDate,
            nickname: nickname,
            pageno: pageno,
            pagesize: pagesize,
            phone: phone,
            strDate: strDate
        }
    };
}
// 导出用户列表
export function userInfoOut(
    endDate,
    nickname,
    pageno,
    pagesize,
    phone,
    strDate
) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_USER_INFO_OUT,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data: {
            endDate: endDate,
            nickname: nickname,
            pageno: pageno,
            pagesize: pagesize,
            phone: phone,
            strDate: strDate
        }
    };
}