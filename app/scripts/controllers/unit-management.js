angular.module('ctrl.unit', ['service.ajax'])
  .controller('unitController',function($scope, ajaxService) {
      ajaxService.getUnitRole().success(function(result) {
        $scope.isUnit = false;
        $scope.isUser = false;
        result.retcode == '-1'?$scope.isUser = true: $scope.isUnit = true
      }).error(function(result) {
        console.log(result);
      })
  });
