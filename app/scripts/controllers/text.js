'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:TextContainerController
 * @description
 * # TextContainerController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('TextCtrl', function ($scope) {
    $scope.social = [
      'facebook',
      'twitter',
      'google'
    ];
  });
