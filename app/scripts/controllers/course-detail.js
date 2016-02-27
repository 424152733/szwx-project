angular.module('ctrl.courseDetail', ['service.ajax'])
  .controller('cdController', function($rootScope, $scope, $routeParams, ajaxService) {
    var index = location.href.lastIndexOf('/');
    var courseId = location.href.substring(index+1);
    $scope.semeCourse = {};
    $scope.load = function(courseId) {
      ajaxService.getCourseDetail(courseId)
        .success(function(results){
          console.log(results);
          $scope.choiceStatus = results.choiceStatus;
          $scope.semeCourse = results.semeCourse;
          $scope.limitedSubjectList = results.limitedSubjectList;
          $scope.semeCourCaleList = results.semeCourCaleList;
          $scope.zjList = results.zjList;
          $scope.subjectList = results.subjectList;
          if(results.semeCourse.times){
        	  $scope.times = results.semeCourse.times.split(',');
          }
        }).error(function(err){
          console.log(err);
        })
    };

    $scope.selectCourse = function(sid, planInfo) {
      ajaxService.selectCourse(sid, planInfo)
        .success(function(results){
          console.log(results);
          if(results.retcode > 0 && results.retcode == 1){
            alert("选课成功!");
            $rootScope.$broadcast('page:reload')
          }
          if(results.retcode > 0 && results.retcode != 1){
            alert(results.retmsg);
          }
        })
    };

    $scope.cancelCourse = function(sid) {
      ajaxService.cancelCourse(sid)
        .success(function(result) {
          if(result.retcode == 1) {
            alert("退课成功!");
            $rootScope.$broadcast('page:reload');
          }
        }).error(function(err) {
          console.log(err)
        })
    };

    $scope.$watch("$viewContentLoaded", function(){
      $scope.load(courseId);
    })
  });
