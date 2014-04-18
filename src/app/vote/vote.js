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

  $scope.compileVote = function() {
    var result = [];
    for (var i in $scope.selected) {
      var idx = $scope.selected[i];
      var score = (1 / (parseInt(i) + 1));
      result.push({
        name: $scope.choices[idx].name,
        restaurant_id: $scope.choices[idx].id,
        score: score
      });
    }

    return result;
  };

  $scope.select = function(index) {
    var idx = $scope.selected.indexOf(index);
    if (idx == -1) {
      $scope.selected.push(index);
    } else {
      $scope.selected.splice(idx, 1);
    }

    if ($scope.selected.length === 3) {
      var vote = $scope.compileVote();
      api.Votes.save(vote, function() {
        $state.go('results');
      });
    }
  };

  // initial data fetch
  $scope.fetchData();
}]);

