'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('VoteCtrl',['FarmServices', '$scope','initData', '$state',function (FarmServices,$scope,initData,$state) {
    //log
    	var modName = 'VoteCtrl';
    	var updateCount = 0 ;

    	function log(method,msg){
        	console.log('['+modName+']: '+method+' : '+msg);
    	}

  	//Methods 
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
			23 : open,
			24 : warning,
			25 : closed
		};

		function open(){
			log('open','<--');
			if( internalState !== 23 || FarmServices.updatedStatus() ){
				log('open','update vote');
				$scope.state = 'open';
	  			$scope.title = FarmServices.status.current.frame.vote.title;
	  			$scope.options = FarmServices.status.current.frame.vote.options;
	  			$scope.vid = FarmServices.status.current.frame.vote.vid;
	  			$scope.selected = -1 ; 
			}else{
				log('open','nothing to do here');
			}
  		}

  		function warning (argument) {
  			log('warning',' <--');
  			// body...
  		}

  		function closed (argument) {
  			log('closed',' <--');
  			if( internalState !== 25 || FarmServices.updatedStatus() ){
  				$scope.timeOut = true;
  				$scope.overlay = true;  				
  			}
  		}
		function check(){
			log('check','<--');

			if(FarmServices.status.current.frame.type === 'vote'){

				log('check','frame type vote');
				if(FarmServices.allreadyVoted()){

					log('check','allready voted');
					$scope.success = true  ; 
					$scope.overlay = true ;
				} else {
					log('check','update vote frame');
					voteStatus[FarmServices.status.current.frame.status]();
					internalState = FarmServices.status.current.frame.status;
				}
				log('check:delayedGetStatus','<-- '+updateCount++);
				FarmServices.delayedGetStatus(function(promise){
					promise.then(function(data){
						log('check:getStatus','success');
						console.log(data);
						check();
					},function(err){
						log('check:getStatus','fail');
					});
				});
				
			}else{
				$state.go(FarmServices.status.current.frame.type);
			}		
		}


  		$scope.answer = function (id) {
  			log('answer',' <--');

  			FarmServices.vote(id).
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
  			//a fresh stattus it's ready to be shown
  			log('Status updated !','<--');

  			if(FarmServices.allreadyVoted()){
  				log('_llreadyVoted','<--');
				$scope.success = true ; 
				$scope.overlay = true ;
			}else{
				check();
			}
  		}else{
  			log('Must update status ','<--');
			FarmServices.getStatus()
				.then(function(res){
					log('getStatus','sucess');
					check();
				},function(err){
					log('getStatus','fail');
					console.log(err);
				});
		}
  			


  }]);
