'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('VoteCtrl',['FarmServices','LoginService' ,'$scope','initData', '$state', 'preloader',
  	function (FarmServices,LoginService,$scope,initData,$state, preloader) {
    //log
    	var modName = 'VoteCtrl';
    	var updateCount = 0 ;

    	function log(method,msg){
        	console.log('['+modName+']: '+method+' : '+msg);
    	}

  	
  		$scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
      	$scope.showBarn     = true;
      	$scope.success      = false; //hen
      	$scope.overlay      = false;  
      	$scope.timeOut      = false;  //rabbit
      	$scope.successText  = FarmServices.data.dictionary.vote.after.text;
      	$scope.missedTitle  = FarmServices.data.dictionary.vote.missed.title;
 		$scope.missedText   = FarmServices.data.dictionary.vote.missed.text;

  		var internalState = null;

		var voteStatus = {
			1 : open,
			2 : closed
		};

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

      //Methods 
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
					});
				});
			}

		function showVote()
			{
				$scope.title    = FarmServices.status.current.frame.data.title;
	  			$scope.options  = FarmServices.status.current.frame.data.options;
	  			$scope.vid      = FarmServices.status.current.frame.data.vid;
	  			
	  			$scope.selected = -1 ; 	
			}

		function showHen()
			{
				$scope.success = true  ; 
				$scope.overlay = true ;
			}

		function showRabbit()
			{
				$scope.timeOut = true  ; 
				$scope.overlay = true ;
			}

		function resetOverlay()
			{
	  			$scope.timeOut = false;
  				$scope.overlay = false;  
  				$scope.success = false;		

			}


		function open(){
			log('open','<--');


				log('open','update vote');
				$scope.state    = 'open';
				showVote();
	  			resetOverlay();



  		}

  		function warning (argument) {
  			log('warning',' <--');
  			// body...
  		}

  		function closed (argument) {
  			log('closed',' <--');
  			if( internalState !== 2 || FarmServices.updatedStatus() ){
  				showVote();
  				showRabbit();  				
  			}
  		}
		function check(){
			log('check','<--');

			if(FarmServices.status.current.frame.type === 'vote'){

				log('check','frame type vote');
				if(LoginService.allreadyVoted()){

					log('check','allready voted');
					showVote();
					showHen();

				} else {
					log('check','update vote frame');

					 if( FarmServices.status.current.id !== FarmServices.status.last.id)
					 	{
					 		var currentStatus = FarmServices.status.current.frame.status; 
					 		if( parseInt(currentStatus) >= 1 && parseInt(currentStatus) <= 2)
					 			{
					 				voteStatus[currentStatus]();		
					 			}
					 		else
					 			{
					 				log('check','status '+voteStatus+'not implemented');
					 				 callDelayedStatusAndCheck();

					 			}	
					 			
					 	}
					 else
					 	{
					 		showVote();
					 	}
					    
					internalState = FarmServices.status.current.frame.status;
				}
				log('check:delayedGetStatus','<-- '+updateCount++);
				callDelayedStatusAndCheck();
				
			}else{
				$state.go(FarmServices.status.current.frame.type);

			}		
		}


  		$scope.answer = function (id) {
  			log('answer',' <--');

  			LoginService.vote(id).
  				then(function(response){
  					log('answer','vote('+id+') success');
  					showHen();
  					//persistir voto
  				},function(err){
  					log('answer','vote('+id+') fail');
					showHen();
  				});
  		}

  	//Activity
  		
  		//first check if status it's updated
  		if (FarmServices.updatedStatus()){
  			//a fresh status it's ready 
  			log('Status updated !','<--');
 			
  			if(LoginService.allreadyVoted()){
  				log('_llreadyVoted','<--');				

				showVote();
				showHen();
				callDelayedStatusAndCheck()

			}else{
				check();
			}
  		}else{
  			log('Must update status ','<--');
			callStatusAndCheck();
		}
  			

  }]);
