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

.controller('ResultsCtrl', ['$scope', 'api', 'socket', function($scope, api, socket) {
  socket.on('vote:added', function(data) {
    $scope.fetchData();
  });

  $scope.fetchData = function() {
    api.Votes.query(null, null, function(result) {
      $scope.results = result.votes;
      $scope.totalVotes = result.total;
    });
  };

  $scope.fetchData();
}]);
