
import {CALL_API_ACTION, CALL_API_ACTION_FAIL, HTTP_GET, CONTENT_TYPE,  API_LOGIN} from '../constants/ActionType';

import {URL} from "../constants/ApiUrl";

import callApi from '../libs/utils/callApi';

import User from "../model/User";

export default store => next => action => {
    
    if(action.type !== CALL_API_ACTION){
        return next(action);
    }
    let {
        apiType,
        method = HTTP_GET,
        data,
        endPoint='',
        contentType = CONTENT_TYPE.JSON,
        acceptType = CONTENT_TYPE.JSON,
    } = action;

    let apiUrl = URL[action.apiType];
    if(apiUrl === null || apiUrl.length < 1){
        throw new Error('API URL NOT FOUND!');
    }
    apiUrl += endPoint;
    return callApi({
        url: apiUrl,
        method,
        contentType,
        acceptType,
        data
    }).then(data => {
        if(acceptType === CONTENT_TYPE.JSON){
            if(data !== null && data.code !== null){
                if(data.meta.code === '104'){
                    //调用接口时，返回用户未登陆错误
                    //  User.clear();
                    //  next({
                    //      data,
                    //      type: ERROR.USER_NOT_LOGIN,
                    //      apiType:apiType,
                    //  });
                     window.location.href = "/#/login";
                }else if(apiType === API_LOGIN && data.meta.code === 115){
                    // 当调用登陆接口时返回用户已登陆，则清空用户信息，重新登陆
                    // User.clear();
                    data.msg = "请求出错，请稍后再试";
                }
            }
        }
        next({
            data,
            type: apiType
        });
        return data;
    }).catch( (e) => {
        next({
            type: CALL_API_ACTION_FAIL,
            apiType: apiType,
            error: e
        });
        return Promise.reject(e);
    });
}