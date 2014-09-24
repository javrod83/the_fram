'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:TextContainerController
 * @description
 * # TextContainerController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('TextCtrl', ['FarmServices','$scope',function (FarmServices,$scope) {
	//log
		var modName     = 'TextCtrl';
		var updateCount = 0 ;

		function log(method,msg){
			console.log('['+modName+']: '+method+' : '+msg);
		}
	 //atributes
    	$scope.txt = '' ; 
    	$scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
    	$scope.showBarn = true;

    //methods
    	function check(){
    		log('check','<--');
			if(FarmServices.status.current.frame.type === 'text' ){
				log('check','status text');
				if ($scope.txt === ''){
					$scope.txt = FarmServices.status.current.frame.text;
					
					log('check','getDelayedStatus '+updateCount);
					updateCount++;
					FarmServices.delayedGetStatus(function(statusPromise){
						statusPromise.then(function(){
							log('getDelayedStatus','success');
							check();
						},function(err){
							log('getDelayedStatus','fail');
							console.log(err);
						});
					});
				}
			}else{
				log('check','status '+FarmServices.status.current.frame.type);
				$state.go(FarmServices.status.current.frame.type);		
			}		
		}

    //Activity
  
		if (FarmServices.updatedStatus()){
  			check();
  		}else{
			FarmServices.getStatus()
				.then(function(){
					check();
				},function(err){
					console.log('status.json error');
					console.log(err);
				});
		}   

  }]);
