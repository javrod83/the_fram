'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:UserPromptController
 * @description
 * # UserPromptController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('PromptCtrl',['$scope','FarmServices','LoginService','$state' ,'initData',function ($scope,FarmServices,LoginService,$state,initData) {
     
      //log
      var modName = 'PromptCtrl';

      function log(method,msg)
        {
          console.log('['+modName+']: '+method+' : '+msg);
        }

      //footer setup  
      $scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
      $scope.showBarn     = true;
      $scope.overlay      = false; 
      $scope.timeOut      = false;  //rabbit



      //Methods
      $scope.approve = function(desition){
          log('approve','desition: '+desition);
          LoginService.setPicAproved(desition);
          LoginService.register()
            .then(function(data){
            
                if (data.result === 'success')
                  {
                    LoginService.saveLocalLogin(data.authToken,data.uid);
                    FarmServices.getStatus().then(function(data){
                      log('getStatus','success');
                      log('getStatus','redirecting to :'+data.frame.type);
                      $state.go(data.frame.type);

                    },function(err){
                        promptError(FarmServices.data.dictionary.error.connection);
                        log('getStatus','fail');

                        console.log(err);
                        $scope.overlay     = true; 
                        $scope.timeOut     = true;  //rabbit
                        $scope.missedTitle = '';
                        $scope.missedText  = FarmServices.data.diccionary.error.connection;
                    });

                  }
                else
                  {
                    $scope.overlay     = true; 
                    $scope.timeOut     = true;  //rabbit
                    $scope.missedTitle = '';
                    $scope.missedText  = FarmServices.data.diccionary.error.general;
                  }

            },function(err){
                console.log(err);
                $scope.overlay     = true; 
                $scope.timeOut     = true;  //rabbit
                $scope.missedTitle = '';
                $scope.missedText  = FarmServices.data.diccionary.error.connection;
              
            });
        };


      //Activity


      //user its logued  to a social network ? 
      if(!LoginService.socialLoged)
        {
          $state.go('login');
        }
      else
        {
            //load content 
            $scope.title = FarmServices.data.dictionary['pic-approve'].title;
            $scope.yes   = FarmServices.data.dictionary['pic-approve'].yes;
            $scope.no    = FarmServices.data.dictionary['pic-approve'].no;
        }
      





 




     function promptError(str)
        {
          $scope.overlay = true;
          $scope.error   = str; 
        }



            $scope.$on('animIn', function() {
                console.log('Prompt: animIn');
            });

            $scope.$on('animOut', function() {
                console.log('Prompt: animOut');
            });
  }]);
