angular.module('lunchr.results', [
  'ngResource',
  'ui.router.state'
])

.config(function($stateProvider) {
  $stateProvider.state('results', {
    url: '/results',
    views: {
      "main": {
        controller: 'ResultsCtrl',
        templateUrl: 'results/results.tpl.html'
      }
    },
    data: { pageTitle: 'results' }
  });
})

.controller('ResultsCtrl', ['$scope', function($scope) {

}]);
