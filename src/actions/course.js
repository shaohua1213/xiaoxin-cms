import * as Type from "../constants/ActionType";

// 新建版本创建一个course三十1个小节section
export function AddCourse(courseid, levelid, name) {
    return {
      type: Type.CALL_API_ACTION,
      apiType: Type.API_COURSE_ADD,
      method: Type.HTTP_POST,
      contentType: Type.CONTENT_TYPE.JSON,
      acceptType: Type.CONTENT_TYPE.JSON,
      data: {
        courseid: courseid,
        levelid: levelid,
        name: name
      }
    };
  }

// 课程提交审核
export function CourseSubmitShenHe(id) {
    return {
      type: Type.CALL_API_ACTION,
      apiType: Type.API_COURSE_SUBMITSHENHE,
      method: Type.HTTP_GET,
      contentType: Type.CONTENT_TYPE.JSON,
      acceptType: Type.CONTENT_TYPE.JSON,
      endPoint:'/'+id,
    };
  }
// 删除小节 清空信息
export function DelSection(id) {
    return {
      type: Type.CALL_API_ACTION,
      apiType: Type.API_COURSE_DELSECTION,
      method: Type.HTTP_GET,
      contentType: Type.CONTENT_TYPE.JSON,
      acceptType: Type.CONTENT_TYPE.JSON,
      endPoint:'/'+id,
    };
  }
// 上架/下架课程state1上架2下架
export function DelSectionState(id,state) {
    return {
      type: Type.CALL_API_ACTION,
      apiType: Type.API_COURSE_SECTIONSTATE,
      method: Type.HTTP_GET,
      contentType: Type.CONTENT_TYPE.JSON,
      acceptType: Type.CONTENT_TYPE.JSON,
      endPoint: '/' + id + '/' + state,
    };
  }
// 根据level查看课程及level信息接口 id传对应levelid
export function GetLevelCourse(id,type) {
  return {
    type: Type.CALL_API_ACTION,
    apiType: Type.API_COURSE_GETLEVELCOURSE,
    method: Type.HTTP_GET,
    contentType: Type.CONTENT_TYPE.JSON,
    acceptType: Type.CONTENT_TYPE.JSON,
    endPoint:'/'+id+'/'+type,
  };
}
// 根据sectionid获得section信息 id传对应小节sectionid
export function GetSectionInfo(id) {
    return {
      type: Type.CALL_API_ACTION,
      apiType: Type.API_COURSE_GETSECTIONINFO,
      method: Type.HTTP_GET,
      contentType: Type.CONTENT_TYPE.JSON,
      acceptType: Type.CONTENT_TYPE.JSON,
      endPoint:'/'+id,
    };
  }
// 根据courseid获得小节section信息 id传对应课程id
  export function GetSectionList(id) {
    return {
      type: Type.CALL_API_ACTION,
      apiType: Type.API_COURSE_GETSECTIONLIST,
      method: Type.HTTP_GET,
      contentType: Type.CONTENT_TYPE.JSON,
      acceptType: Type.CONTENT_TYPE.JSON,
      endPoint:'/'+id,
    };
  }
// 根据id修改section信息
export function UpdateSection(section_chinese_name, section_english_name, section_id,topic) {
    return {
      type: Type.CALL_API_ACTION,
      apiType: Type.API_COURSE_UPDATESECTION,
      method: Type.HTTP_POST,
      contentType: Type.CONTENT_TYPE.JSON,
      acceptType: Type.CONTENT_TYPE.JSON,
      data: {
        section_chinese_name: section_chinese_name,
        section_english_name: section_english_name,
        section_id: section_id,
        topic:topic
      }
    };
  }
  // 获取课程列表
  export function getLevelList() {
    return {
      type: Type.CALL_API_ACTION,
      apiType: Type.API_COURSE_LEVEL,
      method: Type.HTTP_GET,
      contentType: Type.CONTENT_TYPE.JSON,
      acceptType: Type.CONTENT_TYPE.JSON,
    };
  }
  // 获取课程列表
  export function getLevelList1(id) {
    return {
      type: Type.CALL_API_ACTION,
      apiType: Type.API_COURSE_LEVEL1,
      method: Type.HTTP_GET,
      contentType: Type.CONTENT_TYPE.JSON,
      acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:id,
    };
  }
// 审核
export function shenhe(id,state,name) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_COURSE_SHENHE,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        endPoint:id+'/'+state,
        data:{
            name:name
        }
    }
}


export function updateClassName(courseid,name) {
    return {
        type: Type.CALL_API_ACTION,
        apiType: Type.API_UPDATE_CLASSSNAME,
        method: Type.HTTP_POST,
        contentType: Type.CONTENT_TYPE.JSON,
        acceptType: Type.CONTENT_TYPE.JSON,
        data:{
            courseid: courseid,
            name: name
        }
    }
}

// 确认收入统计

export function adminConfirmList(phaseid,levelid,tradetimeStr,tradetimeEnd) {
  return {
      type: Type.CALL_API_ACTION,
      apiType: Type.API_EARNINGS,
      method: Type.HTTP_POST,
      contentType: Type.CONTENT_TYPE.JSON,
      acceptType: Type.CONTENT_TYPE.JSON,
      data:{
          phaseid: phaseid,
          levelid: levelid,
          tradetimeStr:tradetimeStr,
          tradetimeEnd:tradetimeEnd
      }
  }
}

