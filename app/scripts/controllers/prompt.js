'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:UserPromptController
 * @description
 * # UserPromptController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('PromptCtrl',['$scope','FarmServices','LoginService','$state' ,function ($scope,FarmServices,LoginService,$state) {

      if(FarmServices._initilized()){
        console.log('initialized view #/prompt');
      

          
      $scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
      $scope.showBarn = true;
      $scope.overlay = false; 

      $scope.title = FarmServices.data.dictionary['pic-approve'].title;
      $scope.yes   = FarmServices.data.dictionary['pic-approve'].yes;
      $scope.no    = FarmServices.data.dictionary['pic-approve'].no;

      $scope.approve = function(desition)
        {
          console.log("desition: "+desition);
          FarmServices._setPicAproved(desition);
          LoginService.register().then(function(data){
            
            if (data.result === 'success')
              {
                FarmServices._saveLocalLogin(data.authToken,data.uid);
                FarmServices.getStatus().then(function(data){
                  console.log(data);
                  window.location.href = '#/'+data.frame.type;
                },function(err){
                promptError(FarmServices.data.dictionary.error.connection);
                console.log(err);
                });
              }
            else
              {
                promptError(FarmServices.data.dictionary.error.general);
                console.log(FarmServices.data.dictionary.error.general);
              }

          },function(err){
            promptError(FarmServices.data.dictionary.error.connection);
            console.log(err);
          });
        };

 


      }else{
        console.log('not initialized view #/prompt');
        $state.go('main');
      }

     function promptError(str)
        {
          $scope.overlay = true;
          $scope.error   = str; 
        }



            $scope.$on('animIn', function() {
                console.log('Prompt: animIn');
            });

            $scope.$on('animOut', function() {
                console.log('Prompt: animOut');
            });
  }]);
