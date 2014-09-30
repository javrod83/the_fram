'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('VoteCtrl',['FarmServices','LoginService' ,'$scope','initData', '$state',function (FarmServices,LoginService,$scope,initData,$state) {
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

		function open(){
			log('open','<--');
			//if( internalState !== 23  )
			{
				log('open','update vote');
				$scope.state    = 'open';
	  			$scope.title    = FarmServices.status.current.frame.data.title;
	  			$scope.options  = FarmServices.status.current.frame.data.options;
	  			$scope.vid      = FarmServices.status.current.frame.data.vid;
	  			$scope.selected = -1 ; 

	  			//hide overla
	  			$scope.timeOut = false;
  				$scope.overlay = false;  
  				$scope.success = false;		
			}
			//else
			{
				log('open','nothing to do here');
			}
  		}

  		function warning (argument) {
  			log('warning',' <--');
  			// body...
  		}

  		function closed (argument) {
  			log('closed',' <--');
  			if( internalState !== 2 || FarmServices.updatedStatus() ){
  				$scope.timeOut = true;
  				$scope.overlay = true;  				
  			}
  		}
		function check(){
			log('check','<--');

			if(FarmServices.status.current.frame.type === 'vote'){

				log('check','frame type vote');
				if(LoginService.allreadyVoted()){

					log('check','allready voted');
					$scope.success = true  ; 
					$scope.overlay = true ;
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
  					$scope.success = true;
  					$scope.overlay = true;

  					//persistir voto
  				},function(err){
  					log('answer','vote('+id+') fail');
					$scope.success = true;
					$scope.overlay = true;

  				});
  		}

  	//Activity
  		
  		//first check if status it's updated
  		if (FarmServices.updatedStatus()){
  			//a fresh status it's ready 
  			log('Status updated !','<--');
 			
  			if(LoginService.allreadyVoted()){
  				log('_llreadyVoted','<--');
				$scope.success = true ; 
				$scope.overlay = true ;

				callDelayedStatusAndCheck()

			}else{
				check();
			}
  		}else{
  			log('Must update status ','<--');
			callStatusAndCheck();
		}
  			

  }]);
