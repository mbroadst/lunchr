angular.module('lunchr.api', ['ngResource'])
  .factory('api', ['$resource', function($resource) {
    var commonOptions = {
      'update': { method: 'PUT' },
      'query': { method: 'GET', isArray: false }
    };

    return {
      Choices: $resource('/api/choices', {id:'@id'}, commonOptions),
      Votes: $resource('/api/votes', {id:'@id'}, commonOptions)
    };
  }]);
