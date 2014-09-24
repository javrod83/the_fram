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

    //Atributes
		$scope.imgSrc       = '';
		$scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
		$scope.showBarn     = true;
		$scope.overlay      = false;  
		$scope.timeOut      = false;  //rabbit

    ///Methods
    	function check(){

			if(FarmServices.status.current.frame.type === 'photo' ){

				$scope.imgSrc = FarmServices.status.current.frame.media.large;
				FarmServices.setStatusReloadInterval(function(promise){
					promise.then(function(data){
						console.log(data);
						check();
					},function(err){
						console.log(err);
					});
				});
			}else{
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
