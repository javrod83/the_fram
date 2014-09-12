'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
