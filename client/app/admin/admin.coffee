'use strict'

angular.module('dahuoApp')
  .config ($stateProvider) ->
    $stateProvider
    .state('admin',
      url: '/admin',
      templateUrl: 'app/admin/admin.html'
      controller: 'AdminCtrl'
    )