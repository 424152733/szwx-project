
angular.module('ctrl.queryScore', ['service.ajax'])
  .controller('qsController', function($scope, ajaxService) {
    $scope.load = function(planId) {
      ajaxService.getGrades(planId)
        .success(function(results){
          console.log(results);
          if(results.retcode === 0){
            $scope.grades = results.results;
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
      $scope.load('a1d0d95999c04b85b8c1f4e051d5e449');
      $scope.getPlanId();
    })
  });
