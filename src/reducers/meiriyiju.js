import {
  API_MEIRIYIJU_LIST,
  API_MEIRIYIJU_ADD,
  API_MEIRIYIJU_DEL,
  API_MEIRIYIJU_PILIANGDAORU
} from "../constants/ActionType";

// 查看每日一句列表
export function GetDailyList(
  state = {
    meta: {
      code: "-1",
      message: ""
    },
    object: {}
  },
  action
) {
  if (action.type !== API_MEIRIYIJU_LIST) {
    return state;
  }
  return {
    meta: action.data
      ? action.data.meta
      : {
          code: "-1",
          message: ""
        },
    object: action.data ? action.data.object : {}
  };
}

export function AddDaily(
    state = {
      meta: {
        code: "-1",
        message: ""
      },
      object: {}
    },
    action
  ) {
    if (action.type !== API_MEIRIYIJU_ADD) {
      return state;
    }
    return {
      meta: action.data
        ? action.data.meta
        : {
            code: "-1",
            message: ""
          },
      object: action.data ? action.data.object : {}
    };
  }

  export function DelDaily(
    state = {
      meta: {
        code: "-1",
        message: ""
      },
      object: {}
    },
    action
  ) {
    if (action.type !== API_MEIRIYIJU_DEL) {
      return state;
    }
    return {
      meta: action.data
        ? action.data.meta
        : {
            code: "-1",
            message: ""
          },
      object: action.data ? action.data.object : {}
    };
  }



