'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:ImageContainerController
 * @description
 * # ImageContainerController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
    .controller('PhotoCtrl', ['FarmServices','$scope',function (FarmServices,$scope) {

    //atributes
    $scope.imgSrc = '';
    $scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
    $scope.showBarn = true;

    //methods
    	function check(){

			if(FarmServices.status.current.frame.type === 'photo' ){
				if ($scope.imgSrc === ''){
					$scope.imgSrc = FarmServices.status.current.frame.media.large;
					
				// FarmServices._setStatusReloadInterval(function(statusPromise){
				// 	statusPromise.then(function(){
				// 		check();
				// 	},function(err){
				// 		console.log('status.json error');
				// 		console.log(err);
				// 	});
				// });

				}
			}else{
				window.location.href = '#/'+FarmServices.status.current.frame.type;
			}		
		}

    //activity
  	  	/*if (!FarmServices._ready()){
			window.location.href = '#/';	
		}*/



	//	if (FarmServices._updatedStatus()){
  	//		check();
  	//	}else{
			FarmServices.getPhotoMock()
				.then(function(){
					check();
				},function(err){
					console.log('status.json error');
					console.log(err);
				});
	//	}



  }]);
