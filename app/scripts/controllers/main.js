'use strict';

var TodoMediator = function (todos) {
  this.todos = todos || [];
  this.todo = '';
};

TodoMediator.prototype.submit = function () {
  this.todos.push(this.todo);
  this.todo = '';
};

TodoMediator.prototype.removeAt = function (index) {
  this.todos.splice(index, 1);
};

/**
 * @ngdoc function
 * @name yeomanTutorialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanTutorialApp
 */
angular.module('yeomanTutorialApp')
  .controller('MainCtrl', function ($scope, localStorageService) {
    var todosInStore = localStorageService.get('todos');

    var mediator = new TodoMediator(todosInStore);

    $scope.mediator = mediator;

    $scope.$watch('mediator.todos', function () {
      localStorageService.set('todos', mediator.todos);
    }, true);

    $scope.addTodo = function () { mediator.submit(); };

    $scope.removeTodo = function (index) { mediator.removeAt(index); };
  });
