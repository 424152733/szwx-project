
angular.module('directive.animate',[])
  .directive('addAnimate', function() {
    return {
      restrict: 'AE',
      link: function(scope, element, attributes) {
        element.bind('click', function(event){
          var _this = event.target;
          $(_this).parent().addClass('animated bounceOut');
          setTimeout(function(){
            $(_this).parent().remove();
          }, 1000)
        })
      }
    }
});
