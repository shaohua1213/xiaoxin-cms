// 图片地址
import {API_SRC} from '../../constants/ApiUrl';

var src = "";
var u = "";

export function imageUrl(url) {
    u = url;
    if (!u||u===''||u.search('C:')!=-1){
        return "";
    }
    if (u.search('http')!=-1){
        return u;
    }else {
        if(src===""){
            return "http://file.newglish.com"+u;
        }else {
            return src+u;
        }
    }
}

export function priceUtil(price) {

}
export function setSrc(src1) {
    src = src1;
    console.log(src)
}

export function bytesToSize(bytes) {
    if (bytes === 0||bytes === undefined) return '0 MB';
    var k = 1024, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}