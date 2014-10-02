'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:ImageContainerController
 * @description
 * # ImageContainerController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
    .controller('ImageCtrl',    	
    	['FarmServices','$scope','$state','preloader',
    	function (FarmServices,$scope,$state, preloader) {	//log
		var modName = 'ImageCtrl';
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

		// --------------- PRELOAD IMAGES --------------//
	      $scope.isLoading = true;
	      $scope.isSuccessful = false;
	      $scope.percentLoaded = 0;

	      // Preload the images; then, update display when returned.
	      preloader.preloadImages( $scope.footerImages ).then(
	          function handleResolve( imageLocations ) {
	              // Loading was successful.
	              $scope.isLoading = false;
	              $scope.isSuccessful = true;
	              console.info( "Preload Successful" );
	          },
	          function handleReject( imageLocation ) {
	              // Loading failed on at least one image.
	              $scope.isLoading = false;
	              $scope.isSuccessful = false;
	              console.error( "Image Failed", imageLocation );
	              console.info( "Preload Failure" );
	          },
	          function handleNotify( event ) {
	              $scope.percentLoaded = event.percent;
	              console.info( "Percent loaded:", event.percent );
	          }
	      );
      // ----------------------------------------- //

    ///Methods
    	function check(){
    		log('check','<--');
			if(FarmServices.status.current.frame.type === 'image' ){
				log('status: ','image');
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
