
angular.module('ctrl.personal', ['service.ajax', 'service.Common'])
  .controller('pcController',function($scope, ajaxService, Common) {

    $scope.getOpenId = function() {
      var theRequest = Common.GetQueryString();
      $('#openId').val(theRequest.openId);
    };

    //获取当前用户信息
    $scope.getCurrentUser = function() {
      ajaxService.getCurrentUser().success(function(result) {
        if(result && result != ''){
          $scope.userinfo = result.user;
        }
        console.log(result);
      }).error(function(err) {
        console.log(err);
      })
    };

    //登出
    $scope.logout = function() {
      ajaxService.logout().success(function(data){
        if(data.retcode === 0){
          WeixinJSBridge.invoke('closeWindow',{},function(res){
        	});
        }
      }).error(function(){
        alert('服务器内部错误!')
      });
    };
});
