angular.module('ctrl.courseManagement', ['service.ajax'])
  .controller('cmController', function($rootScope, $scope, $state, ajaxService) {
    //获取课程信息管理列表
    $scope.courseManagerList = function(status) {
      $scope.status = status;
      ajaxService.courseManager(status)
        .success(function(results) {
        console.log(results);
          if(results.retcode === 0 ) {
              $scope.courseList = results.userCourseList;
          }
      }).error(function(error) {
        console.log(error);
      })
    };

    //课程审批
    $scope.updateStatus = function(status) {
      ajaxService.updateStatus(status, $scope.info.sid)
        .success(function(results) {
        console.log(results);
          $scope.courseManagerList($scope.status);
      }).error(function(error) {
          console.log(error);
        })
    };

    $scope.getInfo = function(info) {
      $scope.info = info;
    };

    $scope.$watch('$viewContentLoaded', function() {
          $scope.courseManagerList(0);
    })
});
