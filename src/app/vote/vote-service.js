angular.module('lunchr.vote')
  .factory('Choices', function($resource) {
    return $resource('/api/choices', {id:'@id'}, {
        'update': { method: 'PUT' },
        'query': { method: 'GET', isArray: false }
      });
  });
