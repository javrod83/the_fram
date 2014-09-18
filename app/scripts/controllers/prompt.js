'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:UserPromptController
 * @description
 * # UserPromptController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('PromptCtrl',['$scope','FarmServices', function ($scope,FarmServices) {

      $scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
      $scope.showBarn = true;
  		$scope.overlay = false; 

  		$scope.title = FarmServices.data.dictionary['pic-approve'].title;
  		$scope.yes   = FarmServices.data.dictionary['pic-approve'].yes;
  		$scope.no    = FarmServices.data.dictionary['pic-approve'].no;

  		$scope.approve = function(desition)
  			{
  				FarmServices.setPicAproved(desition);
  				FarmServices.register().then(function(data){
  					
  					if (data.result === 'success')
  						{
  							FarmServices._saveLocalLogin(data.authToken,data.uid);
  							FarmServices.getStatus().then(function(data){
  								window.location.href = '#/'+data.status.current.frame.type;
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

  		function promptError(str)
  			{
  				$scope.overlay = true;
  				$scope.error   = str; 
  			}
  }]);
