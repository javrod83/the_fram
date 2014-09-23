'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('VoteCtrl',['FarmServices', '$scope', function (FarmServices,$scope) {

  	//Methods 

  		$scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
      	$scope.showBarn = true;
      	$scope.success = false; //hen
      	$scope.overlay = false;  
      	$scope.timeOut = false;  //rabbit
      	$scope.successText = FarmServices.data.dictionary.vote.after.text;
      	$scope.missedTitle = FarmServices.data.dictionary.vote.missed.title;
 		$scope.missedText = FarmServices.data.dictionary.vote.missed.text;

  		var internalState = null;

		function check(){
			var voteStatus = {
				23 : open,
				24 : warning,
				25 : closed
			};

			if(FarmServices.status.current.frame.type === 'vote'){

				if(FarmServices._allReadyVoted()){
					$scope.success = true  ; 
					$scope.overlay = true ;
				} else {
					voteStatus[FarmServices.status.current.frame.status]();
					internalState = FarmServices.status.current.frame.status;
				}
				
			}else{
				$state.go(FarmServices.status.current.frame.type);
				
			}		
		}

		function open(){
			if(internalState !== 23){
				$scope.state = 'open';
	  			$scope.title = FarmServices.status.current.frame.vote.title;
	  			$scope.options = FarmServices.status.current.frame.vote.options;
	  			$scope.vid = FarmServices.status.current.frame.vote.vid;
	  			$scope.selected = -1 ; 
			}
  		}

  		function warning (argument) {
  			// body...
  		}

  		function closed (argument) {
  			$scope.timeOut = true;
  			$scope.overlay = true;
  		}

  		$scope.answer = function answer(id) {
  			console.log('click')
  			FarmServices._vote(id).
  				then(function(response){
  					$scope.success = true;
  					$scope.overlay = true;
  					console.log('successsssss')
  					//persistir voto
  				},function(err){
					$scope.success = true;
					$scope.overlay = true;
					console.log('successsssss')
  				});

  		}


  	//activity
  		
  		console.log(FarmServices._updatedStatus())
  		
  		if (FarmServices._updatedStatus()){
  			console.log(FarmServices);
  			if(FarmServices._allReadyVoted()){
  				console.log(FarmServices)
				$scope.success = true  ; 
				$scope.overlay = true ;
			}else{
				check();
			}
  		}else{
			FarmServices.getStatus()
				.then(function(res){
					check();
				},function(err){
					console.log('status.json error');
					console.log(err);
				});
		}
  			


  }]);
