'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('LoginCtrl', function ($scope) {
    $scope.social = [
      'facebook',
      'twitter',
      'google'
    ];
  });
