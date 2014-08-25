'use strict'

angular.module('dahuoApp').controller 'MainCtrl', ($scope, $http, socket) ->

  $scope.$on '$destroy', ->
    socket.unsyncUpdates 'thing'
