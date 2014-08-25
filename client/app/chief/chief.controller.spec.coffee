'use strict'

describe 'Controller: ChiefCtrl', ->

  # load the controller's module
  beforeEach module('dahuoApp')
  ChiefCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject(($controller, $rootScope) ->
    scope = $rootScope.$new()
    ChiefCtrl = $controller('ChiefCtrl',
      $scope: scope
    )
  )
  it 'should ...', ->
    expect(1).toEqual 1
