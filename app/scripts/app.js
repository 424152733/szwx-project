
angular.module('sdApp', [
  'ui.router',
  'ngRoute',
  'ctrl.unitAdmin',
  'ctrl.unitChange',
  'ctrl.unitElective',
  'ctrl.personal',
  'ctrl.unitQuerySchedule',
  'ctrl.queryScore',
  'ctrl.courseDetail',
  'ctrl.selectCourse',
  'ctrl.photoAudit',
  'ctrl.userAudit',
  'ctrl.courseManagement',
  'ctrl.unit',
  'directive.animate',
  'directive.modal',
  'directive.select',
  'directive.tabs',
  'service.ajax',
  'service.Common',
  'service.config'
]).run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  //路由地址发生改变时触发,用于关闭组件
  $rootScope.$on('$locationChangeStart', function() {
    $('.dataPicker').datetimepicker('hide');
    $('.modal').each(function() {
      $(this).modal('hide');
    })
  });
}]).config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'tpls/personal-center/login.html'
  }).state('unitManagement', {
    url: '/unitManagement',
    templateUrl: 'tpls/unit-management.html',
    controller: 'unitController'
  }).state('changeSchool', {
    url: '/unitManagement/changeSchool',
    views:{
      '':{
        templateUrl: 'tpls/unit-management/change-school/change-school.html'
      },
      'content@changeSchool': {
        templateUrl: 'tpls/unit-management/change-school/in-manager.html'
      }
    }
  }).state('changeSchool.outManager', {
    views: {
      'content@changeSchool': {
        templateUrl: 'tpls/unit-management/change-school/out-manager.html'
      }
    }
  }).state('changeSchool.inManager', {
    views: {
      'content@changeSchool': {
        templateUrl: 'tpls/unit-management/change-school/in-manager.html'
      }
    }
  }).state('adminApplication', {
    url:'/unitManagement/adminApplication',
    views: {
      '':{
        templateUrl: 'tpls/unit-management/admin-application/admin-application.html'
      },
      'content@adminApplication': {
        templateUrl: 'tpls/unit-management/admin-application/application-transfer.html'
      }
    }
  }).state('adminApplication.applicationTransfer', {
    views: {
      'content@adminApplication': {
        templateUrl: 'tpls/unit-management/admin-application/application-transfer.html'
      }
    }
  }).state('adminApplication.historyTransfer', {
    views: {
      'content@adminApplication': {
        templateUrl: 'tpls/unit-management/admin-application/history-transfer.html'
      }
    }
  }).state('courseManagement', {
    url: '/unitManagement/courseManagement',
    views: {
      '': {
        templateUrl: 'tpls/unit-management/course-management/course-management.html'
      },
      'content@courseManagement': {
        templateUrl: 'tpls/unit-management/course-management/pending-approval.html'
      }
    },
    controller: 'cmController'
  }).state('courseManagement.pendingApproval', {
    views: {
      'content@courseManagement': {
        templateUrl: 'tpls/unit-management/course-management/pending-approval.html'
      }
    }
  }).state('courseManagement.payment', {
    views: {
      'content@courseManagement': {
        templateUrl: 'tpls/unit-management/course-management/pending-payment.html'
      }
    }
  }).state('courseManagement.rejected', {
    views: {
      'content@courseManagement': {
        templateUrl: 'tpls/unit-management/course-management/rejected.html'
      }
    }
  }).state('newAssessment', {
    url: '/unitManagement/newAssessment',
    templateUrl: 'tpls/unit-management/new-assessment/new-assessment.html',
    controller: 'uaController'
  }).state('photoAudit', {
    url: '/unitManagement/photoAudit',
    templateUrl: 'tpls/unit-management/photo-audit/photo-audit.html',
    controller: 'paController'
  }).state('querySchedule', {
    url: '/unitManagement/querySchedule',
    templateUrl: 'tpls/unit-management/query-schedule/query-schedule.html'
  }).state('login', {
    url: '/personalCenter/login',
    templateUrl: 'tpls/personal-center/login.html',
  }).state('logout', {
    url: '/personalCenter/loginout',
    templateUrl: 'tpls/personal-center/logout.html',
    controller: 'pcController'
  }).state('myCourse', {
    url: '/myCourse',
    templateUrl: 'tpls/elective-information/elective-information.html',
    controller: 'eiController'
  }).state('courseDetail', {
    url:'/course/:courseId',
    templateUrl: 'tpls/course-detail/course-detail.html',
    controller: 'cdController'
  }).state('queryScore', {
    url: '/queryScore',
    templateUrl: 'tpls/query-score/query-score.html',
    controller: 'qsController'
  }).state('selectCourse', {
    url: '/selectCourse',
    templateUrl: 'tpls/select-course/select-course.html',
    controller: 'scController'
  }).state('404', {
    url: '/404',
    templateUrl: 'tpls/error/404.html'
  }).state('500', {
    url: '/500',
    templateUrl: 'tpls/error/500.html'
  })
}).config(['$httpProvider', function($httpProvider) {
  //创建request和response响应拦截器
  var interceptor = function($q, $rootScope) {
    return {
      request: function(config) {
    	//var routerUrl = location.href.replace(configuration.env,"");
    	//console.log(routerUrl);
    	var s = location.href.split('/');
        var routeUrl = location.href.substr(location.href.indexOf(s[3]));
        //location.hash + location.pathname
        console.log(routeUrl);
        $httpProvider.defaults.headers.common['route'] = routeUrl;
        return config;
      },
      response: function(response) {
    	  //console.log("403 response" + response);
    	  if(response.data.retcode == 403){
    		  $rootScope.$broadcast('wx:Auth');
    	  }
        return response;
      },
      responseError: function(rejectReason) {
        switch (rejectReason.status) {
          case 403:
            $rootScope.$broadcast('wx:Auth');
            break;
          case 404:
            $rootScope.$broadcast('page:notFound');
            break;
          case 500:
            $rootScope.$broadcast('server:error');
            break;
        }
        return $q.reject(rejectReason);
      }
    }
  };
  $httpProvider.interceptors.push(interceptor);
}]).controller('appCtrl', function($scope, $rootScope, $location) {
  $scope.loadingTime = {};
  $rootScope.$on('page:notFound', function() {
    $location.path('/404');
  });

  $rootScope.$on('wx:Auth', function() {
    window.location.href='/sztce/wxAuth.servlet';
  });

  $rootScope.$on('page:reload', function() {
    $rootScope.$state.reload();
  });

  //当请求后台数据时触发
  $rootScope.$on('loading:start', function() {
    $('#loading-modal').modal('show');
  });

  $rootScope.$on('loading:end', function() {
    $('#loading-modal').modal('hide');
  });

  $rootScope.$on('ajax:error', function() {
    $('#loading-modal').modal('hide');
    alert('请求服务器失败,检查一下你的网络吧!');
  })
});
