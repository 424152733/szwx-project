
angular.module('ctrl.unitQuerySchedule', ['service.ajax', 'service.Common', 'service.config'])
  .controller('qScheduleController', function($scope, $rootScope, $sce, Common, ajaxService, configuration) {
    $scope.result = {};
    $scope.result.ifNull = false;
    $scope.startTime = '2015-01-01';
    $scope.endTime = '2015-01-01';
    $('.dataPicker').datetimepicker({
      minView: "month",
      format: 'yyyy-mm-dd',
      language: 'zh-CN',
      autoclose: true
    });
    $scope.quickQuery = function() {
      $scope.result.ifNull = true;
      ajaxService.querySchedule($scope.courseName, $scope.startTime, $scope.endTime, $scope.time, configuration.planIssue)
        .success(function(results) {
        console.log(results);
      }).error(function(err) {
        console.log(err);
      })
    };

    $scope.searchCourse = function() {
      if($scope.courseName === undefined){
        $scope.showCourse = false;
      }
      if(typeof $scope.courseName == 'string' && $scope.courseName.length >= 1 && $scope.infocus) {
        var datalist = [];
        $scope.result = [];
        ajaxService.ajaxCourseNameAuto($scope.courseName)
          .success(function(results) {
            console.log(results);
            for(var i = 0; i<results.suggestions.length; i++) {
              datalist.push(results.suggestions[i]);
            }
            var find = new RegExp($scope.courseName + "([\\s\\S]*?)", 'igm');
            $scope.result = Common.objeach( datalist, find, $scope.courseName);
            if( $scope.result.length >= 1) {
              $scope.showCourse = true;
            }else{
              $scope.result = [];
              $scope.showCourse = false;
            }
          }).error(function(error) {
            console.log(error)
          });
      }
    };

    $scope.selectedCourse = function(select) {
      $scope.courseName= select.nameStr.replace(/<[^>]+>/g, "");
      $scope.courseList = [];
      $scope.showCourse = false;
    };

    $scope.toHtml = function(text) {
      return $sce.trustAsHtml(text);
    };
});
