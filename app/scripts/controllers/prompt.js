'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:UserPromptController
 * @description
 * # UserPromptController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('PromptCtrl', function ($scope) {
    $scope.social = [
      'facebook',
      'twitter',
      'google'
    ];
  });