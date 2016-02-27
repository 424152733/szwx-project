
angular.module('service.ajax', ['service.config', 'service.Common'])
  .service('ajaxService', function($http, configuration, Common) {
    var url = configuration.env;
    //成绩查询(参数 planId: 期号)
    this.getGrades = function(planId) {
      return $http({
          method: 'GET',
          url: url + "/sztce/services/weixin/examResult/list/" + planId
        }
      )
    };

    //选课信息(参数 planId: 期号 usid: 用户id)
    this.getCourseInfo = function(planValue) {
      return $http({
        method: 'POST',
        data: {planId: planValue},
        url: url + '/sztce/services/weixin/course/mySelectCourse'
      })
    };

    //课程详情(参数 sid: 课程id)
    this.getCourseDetail = function(sid) {
      return $http({
        method: 'GET',
        url: url + "/sztce/services/weixin/course/mycourse/" + sid
      })
    };

    //我要选课列表(参数 limit: 每页数据数量)
    this.getSelectCourseList = function(limit, page, openUnit ) {
      return $http({
        method: 'POST',
        data: {limit: limit, page: page, openUnit: openUnit },
        url: url + "/sztce/services/weixin/course/userChoose"
      })
    };

    //选课(参数 semeCourId: 课程id)
    this.selectCourse = function(semeCourId, planInfo) {
      return $http({
        method: 'POST',
        data: {semeCourId: semeCourId, planInfo: planInfo },
        url: url + "/sztce/services/weixin/course/choose"
      })
    };

    //退课
    this.cancelCourse = function(semeCourId) {
      return $http({
        method: 'POST',
        data: {semeCourId: semeCourId},
        url:  url + "/sztce/services/weixin/course/cancel"
      })
    };

    //获取期号对应的sid
    this.getIssueSid = function() {
      return $http({
        method: 'GET',
        url: url + "/sztce/services/weixin/course/planList"
      })
    };

    //用户登录
    this.login = function(data) {
      return $http({
        method: 'POST',
        data: data,
        url: url + "/sztce/services/weixin/user/login"
      })
    };

    //获取当前用户信息
    this.getCurrentUser = function() {
      return $http({
        method: 'GET',
        url: url + "/sztce/services/weixin/user/getCurrentUser"
      })
    };

    //用户登出
    this.logout= function() {
      return $http({
        method: 'GET',
        url: url + "/sztce/services/weixin/user/logout"
      })
    };

    /**
     * 单位管理
     * */
    //照片审核列表
    this.getUnitPhotoList = function() {
      return $http({
        method: 'GET',
        url: url + "/sztce/services/weixin/unit/photoList"
      })
    };

    //审核照片
    this.auditPhoto = function(sid, usid, operstatus, approveIdea) {
      return $http({
        method: 'POST',
        data: {sid: sid, usid: usid, operstatus: operstatus, approveIdea: approveIdea},
        url: url + "/sztce/services/weixin/unit/audit/photo"
      })
    };

    //新生审核列表
    this.getauditList = function() {
      return $http({
        method: 'GET',
        url: url + "/sztce/services/weixin/unit/auditList"
      })
    };

    //新生审核
    this.auditUser = function(sid, operstatus, prjOrgRelId) {
      return $http({
        method: 'POST',
        data: {sid: sid, operstatus: operstatus, prjOrgRelId: prjOrgRelId},
        url: url + "/sztce/services/weixin/unit/audit/user"
      })
    };

    //管理员转让
    this.adminTransfer = function(applyerId, applyOrgId) {
      return $http({
        method: 'POST',
        data: {applyerId: applyerId, applyOrgId: applyOrgId},
        url: url + "/sztce/services/weixin/unit/admin/transfer"
      })
    };

    //管理员申请
    this.adminApply = function(applyerId, applyOrgId) {
      return $http({
        method: 'POST',
        data: {applyerId: applyerId, applyOrgId: applyOrgId},
        url: url + "/sztce/services/weixin/unit/admin/apply"
      })
    };

    //自动获取人名下拉列表
    this.ajaxUserNameAuto = function(key) {
      return $http({
        method: 'POST',
        data: {key: key},
        url: url + "/sztce/services/weixin/unit/ajaxUsernameAuto"
      })
    };

    //获取管理员用户信息
    this.getAdminUserInfo = function(userId) {
      return $http({
        method: 'GET',
        url: url + "/sztce/services/weixin/unit/getUserInfo/" + userId
      })
    };

    //管理员转让历史列表
    this.getAdminTransferList = function() {
      return $http({
        method: 'GET',
        url: url + "/sztce/services/weixin/unit/getApplyList"
      })
    };

    //转校管理列表(参数  1转入管理 0转出管理)
    this.getChangeSchoolList = function(type) {
      return $http({
        method: 'GET',
        url: url + "/sztce/services/weixin/unit/changeSchool/list/" + type
      })
    };

    //自动获取组织下拉列表
    this.ajaxPrjOrgAuto = function(key) {
      return $http({
        method: 'POST',
        data: {key: key},
        url: url + "/sztce/services/weixin/unit/ajaxPrjOrgAuto"
      })
    };

    //转入审批(参数 sid: 待定&operstatus: ('1'同意 ；'2'拒绝))
    this.changeSchoolAudit = function(sid, operstatus) {
      return $http({
        method: 'POST',
        data: {
          sid: sid,
          operstatus: operstatus
        },
        url: url + "/sztce/services/weixin/unit/changeSchool/audit"
      })
    };

    //转出申请(参数 inProOrgName:转入学校名称&inProOrgRelId:转入学校id&outProOrgRelId:转出学校id&studentId:学生id)
    this.changeSchoolApply = function(inProOrgName, inProOrgRelId, outProOrgRelId, studentId) {
      return $http({
        method: 'POST',
        data: {
          inProOrgName: inProOrgName,
          inProOrgRelId: inProOrgRelId,
          orgId: outProOrgRelId,
          studentId: studentId
        },
        url: url + "/sztce/services/weixin/unit/changeSchool/apply"
      })
    };

    //选课管理(参数 status 待审批0，已通过待缴费3，已拒绝8)
    this.courseManager = function(status) {
      return $http({
        method: 'POST',
        data: {
          status: status
        },
        url: url + "/sztce/services/weixin/unit/courseManager/list"
      })
    };

    //选课管理 审批
    this.updateStatus = function(status, sid) {
      return $http({
        method: 'POST',
        data: {
          sid: sid,
          operstatus: status
        },
        url: url + "/sztce/services/weixin/unit/courseManager/updateStatus"
      })
    };

    //自动获取课程下拉列表
    this.ajaxCourseNameAuto = function(key) {
      return $http({
        method: 'POST',
        data: {
          key: key
        },
        url: url + "/sztce/services/weixin/unit/ajaxCourseNameAuto"
      })
    };


    //课表查询
    this.querySchedule = function(courseName, startDate, endDate, ques, planIssue) {
      return $http({
        method: 'POST',
        data: {
          courseName: courseName,
          startDate: startDate,
          endDate: endDate,
          ques: ques,
          planIssue: planIssue
        },
        url: url + "/sztce/services/weixin/unit/courseQuery"
      })
    };

    //管理员权限判断
    this.getUnitRole = function() {
      return $http({
        method: 'GET',
        url: url + "/sztce/services/weixin/user/isUnitAdmin"
      })
    }
});
