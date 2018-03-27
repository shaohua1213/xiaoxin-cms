import {CONTENT_TYPE} from '../../constants/ActionType';
import { encodeQueryParam } from './queryParam';

function formDataAppend(key, val) {
    if (val instanceof Blob) {
        this.append(key, val, val.name)
    } else {
        this.append(key, val)
    }
}

function setRequestBodyByContentType(params, contentType, data) {
    switch (contentType) {
        case CONTENT_TYPE.JSON:
            params.body = JSON.stringify(data)
            params.headers['Content-Type'] = contentType + ";charset=utf-8"
            break
        case CONTENT_TYPE.FORM:
            params.body = Object.keys(data).map(key => key + "=" + data[key]).join('&')
            params.headers['Content-Type'] = contentType + ";charset=utf-8"
            break
        case CONTENT_TYPE.FORM_DATA:
            if (typeof FormData !== 'function') {
                return Promise.reject('FormData not supported')
            }
            if (data instanceof FormData) {
                params.body = data
            } else {
                var formData = new FormData()
                Object.keys(data).forEach(key => {
                    var val = data[key]
                    if (Array.isArray(val) || (val instanceof FileList)) {
                        for (var i = 0; i < val.length; i++) {
                            formDataAppend.call(formData, key, val[i])
                        }
                    } else {
                        formDataAppend.call(formData, key, val)
                    }
                })
                params.body = formData
            }
            break
        default:
            if (typeof contentType === 'string') {
                params.headers['Content-Type'] = contentType
            }
            params.body = data
            break
    }
}

/**
 * 请求响应处理函数
 */
function fetchDone(accept, response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            switch (accept) {
                case CONTENT_TYPE.TEXT:
                    response.text().then(resolve);
                    break;
                case CONTENT_TYPE.JSON:
                    response.json().then(resolve);
                    break;
                default:
                    resolve(response.body);
            }
        } else {
            reject(response);
        }
    });
}


function callApi(option) {
    var url = option.url;
    var method = (option.method || 'GET').toUpperCase();
    var data = option.data;
    var contentType = option.contentType || 'json';
    var headers = option.headers || null;
    var accept = option.acceptType;
    var params = {
        method: method,
        headers: {},
        mode: 'cors',
        credentials: 'include'
    }

    if (accept) {
        params.headers['Accept'] = accept;
    }

    if (headers) {
        Object.keys(headers).forEach(key => {
            params.headers[key] = headers[key]
        })
    }

    if (data) {
        if (['GET', 'HEAD'].includes(method)) {
            if (url.indexOf('?') === -1) {
                url = url + '?' + encodeQueryParam(data)
            } else {
                url = url + '&' + encodeQueryParam(data)
            }
        } else {
            setRequestBodyByContentType(params, contentType, data)
        }
    }

    return fetch(url, params).then(fetchDone.bind(null, option.acceptType));
}

export default callApi;