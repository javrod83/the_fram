'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:ImageContainerController
 * @description
 * # ImageContainerController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('ImageContainerCtrl', function ($scope) {
    $scope.social = [
      'facebook',
      'twitter',
      'google'
    ];
  });
