
angular.module('directive.tabs', [])
  .directive('tabs', function() {
    return{
      restrict: 'AE',
      link: function(scope, element, attributes) {
        element.bind('click', function(){
          $(this).addClass('w-nav-active').removeClass('w-nav-default');
          $(this).siblings('li').removeClass('w-nav-active').addClass('w-nav-default')
        })
      }
    }
});
