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
    
      $scope.closeAction = function()
        {
          LoginService.forgetState();
          FarmServices.clean();
        }


        //footer config
        $scope.footerImages = ['rabbit','hen', 'field_login'];
        $scope.showBarn = false;


       $scope.$on('animIn', function() {
                console.log(' Main: animIn');
            });

      $scope.$on('animOut', function() {
          console.log(' Main: animOut');
      });





  }]);

