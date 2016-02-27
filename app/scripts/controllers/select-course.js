
angular.module('ctrl.selectCourse', ['service.ajax'])
  .controller('scController', ['$scope', 'ajaxService', '$rootScope',  '$state', function($scope, ajaxService, $rootScope, $state) {
    $scope.pagetion= {
      page: 1,
      limit: 6
    };
    $scope.openUnit = '';
    $scope.courses = [];
    $scope.load = function(openUnit) {
      $scope.ifMore = true;
      if(openUnit != undefined) {
        if($scope.openUnit == openUnit) {
          $scope.pagetion.page++;
        }else{
          $scope.openUnit = openUnit;
          $scope.pagetion.page = 1;
          $scope.courses = [];
        }
      }

      ajaxService.getSelectCourseList($scope.pagetion.limit, $scope.pagetion.page, $scope.openUnit)
        .success(function(results){
          console.log(results);
          if(results.retcode === 0 && results.courseList.length >= 0){
            if(openUnit == undefined && results.courseList.length == $scope.pagetion.limit) {
              $scope.pagetion.page++;
            }
            if(results.courseList.length < $scope.pagetion.limit) {
              $scope.ifMore = false;
            }
            $scope.courses = $scope.courses.concat( results.courseList);
          }
        }).error(function(err){
          console.log(err);
        })
    };

    $scope.selectCourse = function(sid, planInfo) {
      ajaxService.selectCourse(sid, planInfo)
        .success(function(results){
          console.log(results);
          if(results.retcode == 1){
            alert('选课成功!');
            //$rootScope.$broadcast('page:reload');
            $state.go('selectCourse', null, {reload: true})
          }else{
        	  alert(results.retmsg);
          }
        })
    };

    $scope.cancelCourse = function(courseId) {
      ajaxService.cancelCourse(courseId).success(function(data) {
        console.log(data);
        if(data.retcode == 1) {
          alert('退课成功！');
          $state.go('selectCourse', null, {reload: true})
        }
      }).error(function(err){
        console.log(err);
      })
    };

    $scope.$watch("$viewContentLoaded", function(){
      $scope.load();
    })
}]);

