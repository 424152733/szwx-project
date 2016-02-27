
angular.module('directive.select', [])
  .directive('changeSelect', function() {
    return {
      restrict: 'AE',
      link: function(scope, element, attributes) {
        element.bind('change', function() {
          var issue = $(this).val();
          scope.load(issue);
        })
      }
    }
});
