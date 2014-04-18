angular.module('lunchr.results', [
  'ngResource',
  'ui.router.state',
  'ui.bootstrap'
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

.controller('ResultsCtrl', ['$scope', 'api', function($scope, api) {
  api.Votes.query(null, null, function(result) {
    $scope.results = result.votes;
    $scope.totalVotes = result.total;
  });
}]);
