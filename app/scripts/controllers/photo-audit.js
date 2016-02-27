angular.module('ctrl.photoAudit',['service.Common', 'service.ajax'])
  .controller('paController', function($scope, ajaxService) {
    $scope.noPhoto = false;
      $scope.load = function() {
        ajaxService.getUnitPhotoList()
          .success(function(results) {
            if(results.retcode === 0) {
              $scope.photos = results.photos;
              if(results.photos.length == 0) $scope.noPhoto = true;
              console.log(results);
            }
        }).error(function(error) {
            console.log(error)
          })
      };

      $scope.auditPhoto = function(sid, userId, status) {
        ajaxService.auditPhoto(sid, userId, status)
          .success(function(results) {
          console.log(results);
        }).error(function(err) {
          console.log(err)
        })
      };

      $scope.rejectPhoto = function(status) {
        var approveIdea = $("input:radio[name='reason']:checked").val();
        ajaxService.auditPhoto($scope.sid, $scope.usid, status, approveIdea)
          .success(function(results) {
            console.log(results);
          }).error(function(err) {
            console.log(err)
          })
      };

      $scope.getSid = function(sid, usid) {
        $scope.sid = sid;
        $scope.usid = usid
      };

    $scope.$watch("$viewContentLoaded", function(){
      $scope.load();
    })
});
