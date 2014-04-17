angular.module('lunchr.vote', [
  'ngResource',
  'ui.router.state'
])

.config(function($stateProvider) {
  $stateProvider.state('vote', {
    url: '/vote',
    views: {
      "main": {
        controller: 'VoteCtrl',
        templateUrl: 'vote/vote.tpl.html'
      }
    },
    data: { pageTitle: 'vote' }
  });
})

.controller('VoteCtrl', ['$scope', '$state', 'Restaurants', function($scope, $state, Restaurants) {
  $scope.selected = [];
  $scope.fetchData = function(callback) {
    Restaurants.query(null, null, function(result) {
      $scope.restaurants = result.businesses;
    });
  };

  $scope.select = function(index) {
    var idx = $scope.selected.indexOf(index);
    if (idx == -1) {
      $scope.selected.push(index);
    } else {
      $scope.selected.splice(idx, 1);
    }

    if ($scope.selected.length === 3)
      $state.go('results');
  };

  // initial data fetch
  $scope.fetchData();
}]);

