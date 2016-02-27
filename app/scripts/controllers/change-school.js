
angular.module('ctrl.unitChange',['service.ajax', 'service.Common'])
  .controller('csController', function($rootScope, $scope, ajaxService, $http, $sce, Common) {
    $scope.showInfo = false;
    $scope.inputName = '';
    $scope.inputSchool = '';
    //搜索获取用户名下拉提示
    $scope.searchName = function() {
      if($scope.inputName.length === 0){
        $scope.showInfo = false;
        $scope.showName = false;
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
              $scope.showName = true;
            }else{
              $scope.result = [];
              $scope.showName = false;
            }
          }).error(function(err) {
            console.log(err);
          });
      }
    };

    //选定用户获取该用户信息
    $scope.selectedName = function(info) {
      $scope.inputName =info.nameStr.replace(/<[^>]+>/g, "");
      $scope.result = [];
      $scope.showName = false;
      $scope.showInfo = true;
      ajaxService.getAdminUserInfo(info.usidStr)
        .success(function(results) {
          console.log(results);
          $scope.adminInfo = results.user;
        }).error(function(err) {
          console.log(err);
        });
    };

    //搜索获取学校下拉数据提示
    $scope.searchSchool = function() {
      if($scope.inputSchool.length === 0){
        $scope.showSchool = false;
      }
      if($scope.inputSchool.length >= 1 && $scope.infocus) {
        var schoolList = [];
        $scope.result = [];
        ajaxService.ajaxPrjOrgAuto($scope.inputSchool)
          .success(function(results) {
            console.log(results);
            for(var i = 0; i<results.suggestions.length; i++) {
              schoolList.push(results.suggestions[i]);
            }
            var find = new RegExp($scope.inputSchool+"([\\s\\S]*?)", 'igm');
            $scope.result = Common.objeach( schoolList, find, $scope.inputSchool);
            if($scope.result.length >= 1) {
              $scope.showSchool = true;
            }else{
              $scope.result = [];
              $scope.showSchool = false;
            }
          }).error(function(err) {
            console.log(err);
          });
      }
    };

    //选定学校获取学校信息
    $scope.selectedSchool = function(info) {
      $scope.inputSchool= info.nameStr.replace(/<[^>]+>/g, "");
      $scope.orgId = info.usidStr;
      $scope.result = [];
      $scope.showSchool = false;
    };

    //转入转出管理列表
    $scope.transferManagement = function(status) {
      ajaxService.getChangeSchoolList(status).success(function(results) {
        if(results.retcode === 0) {
          console.log(results);
          status === 1?$scope.inManageList = results.applys: $scope.outManageList = results.applys;
        }
      }).error(function(err) {
        console.log(err);
      })
    };

    $scope.getUser = function(user) {
      $scope.sid = user.sid;
    };

    //转入管理审批
    $scope.audit = function(operstatus) {
      $rootScope.$broadcast('loading:start');
      ajaxService.changeSchoolAudit($scope.sid, operstatus)
        .success(function(results) {
        console.log(results);
          if(results.retcode == 1) {
            //for(var i = 0; i<$scope.manageList.length; i++) {
            //  if($scope.manageList[i].sid == $scope.sid) {
            //    $scope.manageList.splice(i, 1);
            //  }
            //}
            $rootScope.$broadcast('loading:end');
            alert('已审批成功!');
            $scope.transferManagement(1);
          }
      }).error(function(err) {
          $rootScope.$broadcast('ajax:error');
      })
    };

    //转出管理审批
    $scope.transferOut = function() {
      $rootScope.$broadcast('loading:start');
      ajaxService.changeSchoolApply($scope.inputSchool, $scope.orgId, $scope.adminInfo.orgId, $scope.adminInfo.sid)
        .success(function(results) {
          $rootScope.$broadcast('loading:end');
          console.log(results);
          alert('转出成功');
          $scope.inputName = '';
          $scope.inputSchool = '';
          $scope.showInfo = false;
          $scope.transferManagement(0);
        }).error(function(error) {
          $rootScope.$broadcast('ajax:error');
        })
    };
    $scope.toHtml = function(text) {
      return $sce.trustAsHtml(text);
    };

    $scope.$watch('$viewContentLoaded', function() {
      $scope.transferManagement(1);
    });
});
