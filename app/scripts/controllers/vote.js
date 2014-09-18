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
      	$scope.success = false; 
      	$scope.overlay = false;
      	$scope.timeOut = false; 

  		var internalState = null;

		function check(){
			var voteStatus = {
				23 : open,
				24 : warning,
				25 : closed
			};

			if(FarmServices.status.current.frame.type === 'vote'){
				voteStatus[FarmServices.status.current.frame.status]();
				internalState = FarmServices.status.current.frame.status;
			}else{
				window.location.href = '#/'+FarmServices.status.current.frame.type;
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
  			// body...
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
  			if(FarmServices._allreadyVoted()){
				$scope.success= true  ; 
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
