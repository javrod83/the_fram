'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('VoteCtrl',['FarmServices', function (FarmServices,$scope) {

  	//Methods 

		function check()
			{
				
				if (FarmServices.status.current.frame.type === 'vote') {

						switch(FarmServices.status.current.frame.status) {
							case 23: // 23: "votacion abierto"
									if($scope.state !== 'open')
										 {
										 	fillView();
										 	$scope.activeVote=true;
										 }
								break;
							case 24: // 24: "votacion por cerrar"
									if($scope.state !== 'warning')
										{
											$scope.state = 'warning';
										}
								break;
							case 25: // 25: "votacion cerrada"
									if($scope.state !== 'closed')
										{
											$scope.state = 'closed';
										}
								break;
						}
					}
				else
					{
						window.location.href = '#/'+FarmServices.status.current.frame.type;
					}
			}

		function fillView()
	  		{
	  			$scope.title = FarmServices.status.current.frame.vote.title;
	  			$scope.options = FarmServices.status.current.frame.vote.options;
	  			$scope.vid = FarmServices.status.current.frame.vote.vid;
	  			$scope.selected = -1 ; 
	  		}		

	//atributes

  		//open     : Votation Open
  		//closed   : Votation Closed
  		//warning  : Votation AboutToClose
  		//success  : Votacion success
		$scope.state = 'open';


  	//activity
  		
  		if (!FarmServices.ready())
  			{
  				window.location.href = '#/';	
  			}
  			
  		
  		if (FarmServices.updatedStatus())
  			{
  				if(FarmServices.allreadyVoted())
  					{
						$scope.state= 'success'  ; 
  					}
  				else
					{
						check();
					}
  			}
  		else
			{
				FarmServices.getStatus()
					.then(function(res){
						check();
					},function(err){
						console.log('status.json error');
						console.log(err);
					});
			}






  		function vote()
  			{
  				FarmServices.vote({
					vid : $scope.vid,
					selection : $scope.selection,
  				}).then(function(response){
  					$scope.state = 'success';
  				},function(err){
					$scope.state = 'success';
  				});

  			}


  			
  			//case status
	  			//pregunta nueva
	  				//pintar
	  				//transicion in 

	  			//pregunta se vencio
	  				//mostrar cartel de se paso tiempo de votar

	  			//cambio status
	  				//redirect status tipe 
  			

  }]);
