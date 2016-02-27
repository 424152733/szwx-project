angular.module('ctrl.userAudit',['service.Common', 'service.ajax'])
  .controller('uaController', function($scope, ajaxService) {
    $scope.isShow = true;
    $scope.load = function() {
      ajaxService.getauditList()
        .success(function(results) {
          console.log(results);
          if(results.retcode === 0) {
            //$scope.$apply(function() {
              $scope.users = results.users;
           // })
          }
        }).error(function(error) {
          console.log(error)
        })
    };

    $scope.auditUser = function(operstatus) {
      ajaxService.auditUser($scope.sid, operstatus,  $scope.prjOrgRelId)
        .success(function(results){
            console.log(results);
          if(results.retcode === 3) {
            $scope.load()
          }
        }).error(function(error) {
            console.log(error);
        })
    };

    $scope.getSid = function(sid, prjOrgRelId) {
      $scope.sid = sid;
      $scope.prjOrgRelId = prjOrgRelId
    };

    $scope.$watch("$viewContentLoaded", function(){
      $scope.load();
    })
  });
