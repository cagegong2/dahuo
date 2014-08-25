'use strict'

angular.module('dahuoApp').config ($stateProvider) ->
  $stateProvider.state 'chief',
    url: '/chief'
    templateUrl: 'app/chief/chief.html'
    controller: 'ChiefCtrl'
