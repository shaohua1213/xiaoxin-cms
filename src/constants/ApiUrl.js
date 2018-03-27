
const BASE_URL = "";
export const API_UPLOAD_FAIL = BASE_URL + "/admin/upload";
export const API_SRC = "/";
export const API_CODE = ""; // 二维码地址
export const API_CODE_id = "http://localtest.blesszuo.com/#/systemView/"; // 二维码地址
export const URL = {
    //用户登录
    API_LOGIN       : BASE_URL + "/adminuser/adminLogin",
    API_LOGOUT      : BASE_URL + "/adminuser/adminLogout",
    API_USER_INFO   : BASE_URL + "/adminuser/adminGetInfo/",
    API_UPLOAD_FAIL   : BASE_URL + "/upload",
    //获取用户信息列表
    API_USER_INFO_LIST :BASE_URL +"/adminuser/adminGetUserInfoList",
    API_USER_INFO_OUT :BASE_URL +"/adminuser/adminExportUserInfoList",
    //每日一句
    API_MEIRIYIJU_LIST: BASE_URL + "/phase/adminGetDailyList",
    API_MEIRIYIJU_ADD: BASE_URL + "/phase/adminAddDaily",
    API_MEIRIYIJU_DEL: BASE_URL + "/phase/adminDelDaily",
    API_MEIRIYIJU_EXAMPLE_DOWN: BASE_URL + "/adminuser/adminGetConfigInfo",
      //消息管理
    API_MESSAGE_ADD : BASE_URL + "/message/addmessage",
    API_MESSAGE_DEL : BASE_URL + "/message/delmessage"    ,
    API_MESSAGE_SELECT : BASE_URL + "/message/select",
    //轮播广告
    API_BANNER_ADD : BASE_URL + "/user/webaddbanner",
    API_BANNER_DEL : BASE_URL + "/user/webdelbanner"    ,
    API_BANNER_UPDATE : BASE_URL + "/banner/webupdbanner",
    API_BANNER_SELECT : BASE_URL + "/user/webgetbannerlist",


    //角色管理
    API_ROLE_SELECT : BASE_URL + "/adminuser/adminGetRoleList",
    API_ROLE_UPDATE : BASE_URL + "/adminuser/adminUpdPower",
    API_ROLE_DELETE : BASE_URL + "/adminuser/adminDelRole",
    API_ROLE_ADD : BASE_URL + '/adminuser/adminAddRole',
    API_ROLE_QX : BASE_URL + '/user/addquanxian',

    //人员管理
    API_USER_SELECT : BASE_URL + "/adminuser/adminGetRenYuanList",
    API_USER_ADD : BASE_URL + "/adminuser/adminAddRenYuan",
    API_USER_UPDATE : BASE_URL + "/adminuser/adminUpdRenYuan",
    API_USER_DELETE : BASE_URL + "/user/deleteuser",


    //修改密码
    API_CHANGEPWD : BASE_URL +"/user/changepwd",


    API_SELECT_BAOBIAO : BASE_URL + "/user/selectbaobiao",
    API_EXPORT_BAOBIAO : BASE_URL + "/user/exportbaobiao",


    //
    API_HUODONG_SELECT : BASE_URL + "/user/webgethuodonglist",
    API_HUODONG_UPD : BASE_URL+"/user/webupdhuodongstate",

    // 售卖审核
    API_SHOUMAI_SHENHE_LIST : BASE_URL+"/verify/adminGetQishuList",
    //售卖方式提交审核
    API_SHOUMAI_SHENHE_COMMIT : BASE_URL+"/phase/adminPhaseTiJiaoShenHe/",
    //跟据id查看期数信息
    API_QISHUXINXI_G : BASE_URL+"/phase/adminGetPhaseList/",
    // 增加售卖期数
    API_ADD_QISHUXINXI_P : BASE_URL+"/phase/adminAddPhase",
    // 修改
    API_UPDATE_QISHUXINXI_P : BASE_URL+"/phase/adminUpdPhase",
    // 获取每个级别审核通过的课程
    API_GETALL_CLASS_G : BASE_URL+"/phase/adminGetVirefyKeCheng",
    // 提交审核
    API_TIJIAOSHENHE_G : BASE_URL+"/phase/adminPhaseTiJiaoShenHe/",
    // 审核
    API_SHENHE_G : BASE_URL+"/verify/adminPhaseShenHe/",
    // 课程系统
    API_COURSE_ADD: BASE_URL + "/course/adminAddCourse",
    API_COURSE_SUBMITSHENHE: BASE_URL + "/course/adminCourseSubmitShenHe",
    API_COURSE_DELSECTION: BASE_URL + "/course/adminDelSection",
    API_COURSE_SECTIONSTATE: BASE_URL + "/course/adminDelSection",
    API_COURSE_GETLEVELCOURSE: BASE_URL + "/course/adminGetLevelCourse",
    API_COURSE_GETSECTIONINFO: BASE_URL + "/course/adminGetSectionInfo",
    API_COURSE_GETSECTIONLIST: BASE_URL + "/course/adminGetSectionList",
    API_COURSE_UPDATESECTION: BASE_URL + "/course/adminUpdateSection",
    // 课程
    API_COURSE_LEVEL: BASE_URL + "/course/adminGetLevelList",
    API_COURSE_LEVEL1: BASE_URL + "/financial/adminGetVerPhaseLevel/",
    API_COURSE_SHENHE: BASE_URL + "/verify/adminCourseShenHe/",
    // 日志
    API_LOG: BASE_URL + "/log/adminSelectLog/",
    //财务系统-订单列表-financial
    API_FINANCIAL_LIST: BASE_URL + "/financial/adminGetOrderList",
    API_FINANCIAL_PHASELIST: BASE_URL + "/financial/adminGetVerPhaseList",
    // 修改课程名称
    API_UPDATE_CLASSSNAME: BASE_URL + "/course/adminUpdCourseName",
    // 配置信息
    API_CONFIG: BASE_URL + "/adminuser/adminGetConfigInfo",
    // 退款列表
    API_REFUND_LIST: BASE_URL + "/customerservice/adminGetRefundList",
    // 手动退款
    API_SHOUDONG_REFUND: BASE_URL + "/customerservice/adminToRefund/",
    // 退款审核
    API_REFUND_SHENHE: BASE_URL + "/verify/adminVerifyRefundList/",
    // 从订单提交审核
    API_REFUND_COMMIT: BASE_URL + "/customerservice/adminAddRefund",
    // 退款通过/驳回
    API_REFUND_SHENHE_COMMIT: BASE_URL + "/verify/adminRefundShenHe/",
    // 查看
    API_REFUND_SHENHE_CHAKAN: BASE_URL + "/customerservice/adminViewRefund/",
    // 再次提交申请
    API_REFUND_R_COMMIT: BASE_URL + "/customerservice/adminAddExRefund/",
    // 财务流水
    API_CAIWU_WATER: BASE_URL + "/financial/adminGetLiuShuiList",
    // 确认收入统计
    API_EARNINGS: BASE_URL + "/financial/adminConfirmList",
    // 售卖方式删除
    API_SHOUMAI_DEL:BASE_URL + "/phase/adminPhaseDelete/",
    // 退款失败再次退款
    API_RE_REFUND:BASE_URL + "/customerservice/adminExRefund/",
    // 期数上架下架
    API_PHASE_UP:BASE_URL + "/phase/adminPhaseUpdState/",

}