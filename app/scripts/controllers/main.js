'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('MainCtrl',['FarmServices','$scope',
    function (FarmServices,$scope) {
    
      $scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
      $scope.showBarn = true;

  		//load configFile 
  		var configUrl = '/api';
  		$scope.initialized = false;
  		$scope.logued = false;

  		FarmServices.getConfig(configUrl).
  			then(function(res){
				  return FarmServices.getData(res.urls.base, res.tid, res.jsons['territory-data']);
        }).
        then(function(res){
          console.log('data.json success');
          
          FarmServices.flags.initialized = true;

          if (FarmServices._loadLocalLogin()){
            console.log('already logged');
            if (FarmServices._allReadyVoted()){
              console.log('already voted');
              // saltar a #vote
            }else{
              console.log('i haveto vote');
              //leer el estatus y saltar a esa vista 
            }
          }else{
            window.location.href = '#/prompt';
          }
          console.log(res);
          //window.location.href = '#/login'
  			},function(err){
  				console.log(err);
  			});







  }]);
