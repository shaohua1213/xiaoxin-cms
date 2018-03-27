import {
  API_COURSE_ADD,
  API_COURSE_SUBMITSHENHE,
  API_COURSE_DELSECTION,
  API_COURSE_SECTIONSTATE,
  API_COURSE_GETLEVELCOURSE,
  API_COURSE_GETSECTIONINFO,
  API_COURSE_GETSECTIONLIST,
  API_COURSE_UPDATESECTION,
  API_EARNINGS
} from "../constants/ActionType";

// 新建版本创建一个course三十1个小节section
export function AddCourse(
  state = {
    meta: {
      code: "-1",
      message: ""
    },
    object: {}
  },
  action
) {
  if (action.type !== API_COURSE_ADD) {
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

export function CourseSubmitShenHe(
  state = {
    meta: {
      code: "-1",
      message: ""
    },
    object: {}
  },
  action
) {
  if (action.type !== API_COURSE_SUBMITSHENHE) {
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


export function DelSection(
  state = {
    meta: {
      code: "-1",
      message: ""
    },
    object: {}
  },
  action
) {
  if (action.type !== API_COURSE_DELSECTION) {
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

export function DelSectionState(
    state = {
      meta: {
        code: "-1",
        message: ""
      },
      object: {}
    },
    action
  ) {
    if (action.type !== API_COURSE_SECTIONSTATE) {
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

  export function GetLevelCourse(
    state = {
      meta: {
        code: "-1",
        message: ""
      },
      object: undefined
    },
    action
  ) {
    if (action.type !== API_COURSE_GETLEVELCOURSE) {
      return state;
    }
    return {
      meta: action.data
        ? action.data.meta
        : {
            code: "-1",
            message: ""
          },
      object: action.data ? action.data.object : undefined
    };
  }

  export function GetSectionInfo(
    state = {
      meta: {
        code: "-1",
        message: ""
      },
      object: {}
    },
    action
  ) {
    if (action.type !== API_COURSE_GETSECTIONINFO) {
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

  export function GetSectionList(
    state = {
      meta: {
        code: "-1",
        message: ""
      },
      object: {}
    },
    action
  ) {
    if (action.type !== API_COURSE_GETSECTIONLIST) {
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

  export function UpdateSection(
    state = {
      meta: {
        code: "-1",
        message: ""
      },
      object: {}
    },
    action
  ) {
    if (action.type !== API_COURSE_UPDATESECTION) {
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

  export function adminConfirmList(
    state = {
      meta: {
        code: "-1",
        message: ""
      },
      object: undefined
    },
    action
  ) {
    if (action.type !== API_EARNINGS) {
      return state;
    }
    return {
      meta: action.data
        ? action.data.meta
        : {
            code: "-1",
            message: ""
          },
      object: action.data ? action.data.object : undefined
    };
  }