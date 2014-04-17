angular.module('lunchr', [
  'ngAnimate',
  'templates-app',
  'templates-common',
  'ui.router.state',
  'ui.router',
  'lunchr.vote',
  'lunchr.results'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/vote');
})

.controller('AppCtrl', function($scope, $location) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (angular.isDefined(toState.data.pageTitle)) {
      $scope.pageTitle = toState.data.pageTitle + ' | lunchr' ;
    }
  });
});
