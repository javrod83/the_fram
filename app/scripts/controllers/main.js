'use strict';
/* @ngdoc function
 * @name theFarmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('MainCtrl',['FarmServices','LoginService','$scope','$state',
    function (FarmServices,LoginService,$scope,$state) {
    
      $scope.resetMock = function()
        {
          LoginService._forgetState();
        }


        //footer config
        $scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
        $scope.showBarn = true;


       $scope.$on('animIn', function() {
                console.log(' Main: animIn');
            });

      $scope.$on('animOut', function() {
          console.log(' Main: animOut');
      });





  }]);

