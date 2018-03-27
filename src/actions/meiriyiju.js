import * as Type from "../constants/ActionType";

export function GetDailyList(
  endDate,
  pageno,
  pagesize,
  phaseid,
  phasename,
  state,
  strDate,
  verifystate
) {
  return {
    type: Type.CALL_API_ACTION,
    apiType: Type.API_MEIRIYIJU_LIST,
    method: Type.HTTP_POST,
    contentType: Type.CONTENT_TYPE.JSON,
    acceptType: Type.CONTENT_TYPE.JSON,
    data: {
      endDate: endDate,
      pageno: pageno,
      pagesize: pagesize,
      phaseid: phaseid,
      phasename: phasename,
      state: state,
      strDate: strDate,
      verifystate: verifystate
    }
  };
}

export function AddDaily(date, dianying, taici) {
  return {
    type: Type.CALL_API_ACTION,
    apiType: Type.API_MEIRIYIJU_ADD,
    method: Type.HTTP_POST,
    contentType: Type.CONTENT_TYPE.JSON,
    acceptType: Type.CONTENT_TYPE.JSON,
    endPoint:'/'+1,
    data: {
      date: date,
      dianying: dianying,
      taici: taici
    }
  };
}

export function UpdateDaily(date, dianying, taici) {
  return {
    type: Type.CALL_API_ACTION,
    apiType: Type.API_MEIRIYIJU_ADD,
    method: Type.HTTP_POST,
    contentType: Type.CONTENT_TYPE.JSON,
    acceptType: Type.CONTENT_TYPE.JSON,
    endPoint:'/'+2,
    data: {
      date: date,
      dianying: dianying,
      taici: taici
    }
  };
}

export function DelDaily(date, dianying, taici) {
  return {
    type: Type.CALL_API_ACTION,
    apiType: Type.API_MEIRIYIJU_DEL,
    method: Type.HTTP_POST,
    contentType: Type.CONTENT_TYPE.JSON,
    acceptType: Type.CONTENT_TYPE.JSON,
    data: {
      date: date,
      dianying: dianying,
      taici: taici
    }
  };
}

export function ExampleDown() {
  return {
    type: Type.CALL_API_ACTION,
    apiType: Type.API_MEIRIYIJU_EXAMPLE_DOWN,
    method: Type.HTTP_GET,
    contentType: Type.CONTENT_TYPE.JSON,
    acceptType: Type.CONTENT_TYPE.JSON,
  };
}




