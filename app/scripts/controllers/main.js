'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('MainCtrl',['FarmServices','$scope','$state',
    function (FarmServices,$scope,$state) {
    
      $scope.resetMock = function()
        {
          FarmServices._forgetState();
        }



      $scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
      $scope.showBarn = true;

  		//load configFile 
  		var configUrl = 'api';
  		$scope.initialized = false;
  		$scope.logued = false;

  		FarmServices.getConfig(configUrl).
  			then(function(res){
				  return FarmServices.getData(res.urls.base, res.tid, res.jsons['territory-data']);
        }).
        then(function(res){
          console.log('data.json success');
          
          FarmServices.flags.initialized = true;

          if (FarmServices._loadLocalLogin()){
                console.log('already logged');
                console.log(FarmServices);
                if (FarmServices._allReadyVoted()){
                    console.log('already voted');
                    window.location.href = '#/vote';
                }else{
                    console.log('i haveto vote');
                    FarmServices.getStatus().then(function(data){
                      console.log(data);
                      window.location.href = '#/'+data.frame.type;
                    },function(err){
                   // promptError(FarmServices.data.dictionary.error.connection);
                    console.log(err);
                    }); 
                }
          }else{
            //window.location.href = '#/login';
           $state.go('login');
          }
          console.log(res);
           $state.go('login');
  			},function(err){
  				console.log(err);
  			});


       $scope.$on('animIn', function() {
                console.log(' Main: animIn');
            });

      $scope.$on('animOut', function() {
          console.log(' Main: animOut');
      });





  }]);
