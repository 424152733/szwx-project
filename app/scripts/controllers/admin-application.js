
angular.module('ctrl.unitAdmin',['service.Common', 'service.ajax'])
  .controller('aaController', function($rootScope, $scope, ajaxService, $http, $sce, Common) {
    $scope.showInfo = false;
    $scope.search = function() {
      if($scope.inputName.length === 0){
        $scope.showInfo = false;
        $scope.showResult = false;
      }
      if($scope.inputName.length >= 1 && $scope.infocus) {
        var datalist = [];
        $scope.result = [];
        ajaxService.ajaxUserNameAuto($scope.inputName)
          .success(function(results) {
            console.log(results);
            for(var i = 0; i<results.suggestions.length; i++) {
              datalist.push(results.suggestions[i]);
            }
            var find = new RegExp($scope.inputName + "([\\s\\S]*?)", 'igm');
            $scope.result = Common.objeach( datalist, find, $scope.inputName);
            if($scope.result.length >= 1) {
              $scope.showResult = true;
            }else{
              $scope.result = [];
              $scope.showResult = false;
            }
        }).error(function(err) {
            console.log(err);
          });
      }
    };

    $scope.selected = function(info) {
      $scope.inputName =info.nameStr.replace(/<[^>]+>/g, "");
      $scope.result = [];
      $scope.showResult = false;
      $scope.showInfo = true;
      ajaxService.getAdminUserInfo(info.usidStr)
        .success(function(results) {
          console.log(results);
          $scope.adminInfo = results.user;
      }).error(function(err) {
          console.log(err);
        });
    };

    $scope.adminApply = function() {
      ajaxService.adminApply($scope.adminInfo.sid, $scope.adminInfo.orgId)
        .success(function(results) {
          if(results.retcode === 1) {
            alert(results.retmsg);
            $rootScope.$broadcast('page:reload');
          }
      }).error(function(err) {
          console.log(err);
        })
    };

    $scope.adminTransfer = function() {
      ajaxService.adminTransfer($scope.adminInfo.sid, $scope.adminInfo.orgId)
        .success(function(results) {
          if(results.retcode === 0) {
            alert('转让成功!')
          }
        }).error(function(err) {
          console.log(err);
        })
    };

    $scope.getAdminTransferList = function() {
      ajaxService.getAdminTransferList()
        .success(function(results) {
        console.log(results);
          if(results.retcode === 0) {
            $scope.historyList = results.applyList
          }
      }).error(function(error) {
          console.log(error);
        })
    };

    $scope.toHtml = function(text) {
      return $sce.trustAsHtml(text);
    };
});
