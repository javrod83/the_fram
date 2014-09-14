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



  		//status general info 
  		$scope.statusId  = "-1";




  		FarmServices.getConfig(configUrl)
  			.then(function(res){
  				//onsole.log('config.json success');
  				//$scope.config = res; 
				get_data(res);
  		

  			},function(err){
  				console.log('config.json error');
  				console.log(err);
  				
  			});




  		function get_data(res)
  				{
  					console.log("get data");
  					console.log(res);
  	
  					 //getData = function(url,tid,filename)
		  			FarmServices.getData(
		  				res.urls.base, 
		  				res.tid, 
		  				res.jsons['territory-data'] )
		  			.then(function(res){
		  				console.log('data.json success');
		  				FarmServices.model.init = true;
		  				//$scope.config = res; 
		  				console.log(res)
		  				//window.location.href = '#/login'

		  		

		  			},function(err){
		  				console.log('config.json error');
		  				console.log(err);
		  				
		  			});
  				}





  }]);
