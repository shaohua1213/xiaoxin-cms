import * as Type from '../constants/ActionType';


export function getuserlist(name, pagesize, pageno) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_USER_SELECT,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data: {
            name: name,
            pagesize: pagesize,
            pageno: pageno,
        },
    }
}


export function adduser(id,nickname, username, roleid, password, state) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_USER_ADD,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data: {
            id: 0,
            nickname: nickname,
            username: username,
            roleid: roleid,
            password: password,
            state: state,
        },
    }
}


export function updateuser(id,nickname, username, roleid, password, state) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_USER_UPDATE,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data: {
            id: id,
            nickname: nickname,
            username: username,
            roleid: roleid,
            password: password,
            state: state,
        }
    }
}

export function deleteuser(id, state) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_USER_DELETE,
        method: Type.HTTP_GET,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint: '/' + id + '/' + state,
    }
}
