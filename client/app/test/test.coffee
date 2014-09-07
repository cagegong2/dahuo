'use strict'

angular.module('dahuoApp').config ($stateProvider) ->
  $stateProvider.state 'test',
    url: '/test'
    templateUrl: 'app/test/test.html'
    controller: 'TestCtrl'
