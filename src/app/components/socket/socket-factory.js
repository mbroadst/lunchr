angular.module('lunchr.socket', ['btford.socket-io'])
  .factory('socket', function(socketFactory) {
    return socketFactory();
  });
