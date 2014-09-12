'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
