
angular.module('ctrl.unitElective', ['service.ajax'])
  .controller('eiController', function($scope, ajaxService) {
    $scope.load = function(planId) {
      ajaxService.getCourseInfo(planId)
        .success(function(results){
          console.log(results);
          if(results.retcode === 0){
            $scope.courses = results.choiceCourseList;
          }
        }).error(function(err){
          console.log(err);
        })
    };

    $scope.getPlanId = function() {
      ajaxService.getIssueSid()
        .success(function(results){
          $scope.planInfos = results.planInfos;
        }).error(function(err){
          console.log(err);
        })
    };

    $scope.$watch("$viewContentLoaded", function(){
      $scope.load('1a5204a9d9574722aa86448d5f102d1c');
      $scope.getPlanId();
    })
});
