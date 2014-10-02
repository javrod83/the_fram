'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:ImageContainerController
 * @description
 * # ImageContainerController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
    .controller('PhotoCtrl', ['FarmServices','$scope','$state',function (FarmServices,$scope,$state) {
	//log
		var modName = 'PhotoCtrl';
		var updateCount = 0 ;

		function log(method,msg){
			console.log('['+modName+']: '+method+' : '+msg);
		}

    //Atributes
		$scope.imgSrc       = '';
		$scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
		$scope.showBarn     = true;
		$scope.overlay      = false;  
		$scope.timeOut      = false;  //rabbit

    ///Methods
    	function check(){
    		log('check','<--');
			if(FarmServices.status.current.frame.type === 'photo' ){
				log('status: ','photo');
				$scope.imgSrc = FarmServices.status.current.frame.data.large;
				FarmServices.delayedGetStatus(function(promise){
					promise.then(function(data){
						console.log(data);
						check();
					},function(err){
						console.log(err);
					});
				});
			}else{
				log('status: ',FarmServices.status.current.frame.type);
				$state.go(FarmServices.status.current.frame.type);
			}		
		}


	//controller activity

	if (FarmServices.updatedStatus()){
		check();
	}
	else{
		FarmServices.getStatus()
		//FarmServices.getPhotoMock()
		.then(function(){
			check();
		},function(err){
			console.log('status.json error');
			console.log(err);
			
		});
	}	
	
	


  }]);
