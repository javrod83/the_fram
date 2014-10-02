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
			console.log('['+modName+']: '+method+' : '+msg);
		}
	 //atributes
    	$scope.txt = '' ; 
    	$scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
    	$scope.showBarn = true;

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
