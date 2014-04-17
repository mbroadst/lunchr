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

.controller('VoteCtrl', ['$scope', '$state', 'api',
                function( $scope,   $state,   api) {
  $scope.selected = [];
  $scope.fetchData = function(callback) {
    api.Choices.query(null, null, function(result) {
      $scope.choices = result.businesses;
    });
  };

  $scope.select = function(index) {
    var idx = $scope.selected.indexOf(index);
    if (idx == -1) {
      $scope.selected.push(index);
    } else {
      $scope.selected.splice(idx, 1);
    }

    console.log($scope.choices[index]);
    if ($scope.selected.length === 3)
      $state.go('results');
  };

  // initial data fetch
  $scope.fetchData();
}]);

