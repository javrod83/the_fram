'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:TextContainerController
 * @description
 * # TextContainerController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('TextCtrl', 	['FarmServices','$scope','$state', 'preloader', 
  	function (FarmServices,$scope,$state, preloader) {
  	//log
		var modName     = 'TextCtrl';
		var updateCount = 0 ;

		function log(method,msg){
		//	console.log('['+modName+']: '+method+' : '+msg);
		}
	 //atributes
    	$scope.txt = '' ; 
    	$scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
    	$scope.showBarn = true;



    	

      // ----------------------------------------- //

    //methods
    	function check(){
    		log('check','<--');
			if(FarmServices.status.current.frame.type === 'text' ){
				log('check','status text');
				if ($scope.txt !== FarmServices.status.current.frame.data.text){
					log('check:set text',FarmServices.status.current.frame.data.text);
					$scope.txt = FarmServices.status.current.frame.data.text;
					
					log('check','getDelayedStatus '+updateCount);
					updateCount++;
					
				}
				callDelayedStatusAndCheck();

			}else{
				log('check','status '+FarmServices.status.current.frame.type);
				$state.go(FarmServices.status.current.frame.type);		
			}		
		}


			function callStatusAndCheck()
				{
					FarmServices.getStatus()
					.then(function(res){
						log('getStatus','sucess');
						check();
					},function(err){
						log('getStatus','fail');
						console.log(err);
					});
				}

			function callDelayedStatusAndCheck()
				{
					FarmServices.delayedGetStatus(function(promise){
						promise.then(function(data){
							log('check:getStatus','success');
							console.log(data);
							check();
						},function(err){
							log('check:getStatus','fail');
							callDelayedStatusAndCheck();
						});
					});
				}

    //Activity
  
		if (FarmServices.updatedStatus()){
  			check();
  		}else{
			callStatusAndCheck();
		}   

  }]);
