angular.module('lunchr.vote')
  .factory('Restaurants', function($resource) {
    return $resource('/data', {id:'@id'}, {
        'update': { method: 'PUT' },
        'query': { method: 'GET', isArray: false }
      });
  });
