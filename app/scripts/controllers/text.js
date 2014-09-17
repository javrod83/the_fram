'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:TextContainerController
 * @description
 * # TextContainerController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('TextCtrl', ['FarmServices','$scope',function (FarmServices,$scope) {
	
	 //atributes
    	$scope.txt = '' ; 

    //methods
    	function check(){

			if(FarmServices.status.current.frame.type === 'text' ){
				if ($scope.txt === ''){
					$scope.txt = FarmServices.status.current.frame.text;
					
					FarmServices._setStatusReloadInterval(function(statusPromise){
						statusPromise.then(function(){
							check();
						},function(err){
							console.log('status.json error');
							console.log(err);
						});
					});
				}
			}else{
				window.location.href = '#/'+FarmServices.status.current.frame.type;
			}		
		}

    //activity
  	  	/*if (!FarmServices._ready()){
			window.location.href = '#/';	
		}*/

		if (FarmServices._updatedStatus()){
  			check();
  		}else{
			FarmServices.getStatus()
				.then(function(){
					check();
				},function(err){
					console.log('status.json error');
					console.log(err);
				});
		}   

  }]);
