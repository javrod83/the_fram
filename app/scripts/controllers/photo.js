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

    //atributes
    $scope.imgSrc = '';
    $scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
    $scope.showBarn = true;

    //methods
    	function check(){

			if(FarmServices.status.current.frame.type === 'photo' ){
				$scope.imgSrc = FarmServices.status.current.frame.media.large;
			}else{
				$state.go(FarmServices.status.current.frame.type);
			}		
		}



	//controller activity

	//FarmServices.getStatus()
	FarmServices.getPhotoMock()
		.then(function(){
			check();
		},function(err){
			console.log('status.json error');
			console.log(err);
		});
	

	//Far

  }]);
