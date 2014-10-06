'use strict';

/**
 * @ngdoc function
 * @name theFarmApp.controller:UserPromptController
 * @description
 * # UserPromptController
 * Controller of the theFarmApp
 */
angular.module('theFarmApp').controller('LandCtrl',[
    '$scope',
    'FarmServices',
    'LoginService',
    '$state',
    'initData',
    '$stateParams',
    'preloader',
  function ($scope,FarmServices,LoginService,$state,initData,$stateParams,preloader) {

      //log
      var modName = 'LandCtrl';

      function log(method,msg)
        {
          console.log('['+modName+']: '+method+' : '+msg);
        }

      function showError(txt)
        {
           
            $scope.overlay     = true; 
            $scope.timeOut     = true;  //rabbit
            $scope.missedTitle = '';
            $scope.missedText  = txt;
        }

      //footer setup  
      $scope.footerImages = ['cow','cow_big', 'ostrich', 'sheep', 'sheep_big', 'field', 'field_big'];
      $scope.showBarn     = true;
      $scope.overlay      = false; 
      $scope.timeOut      = false;  //rabbit
      $scope.missedTitle  = '' ;
      $scope.missedText   = '' ;

      //load content 
      $scope.title = FarmServices.data.dictionary['pic-approve'].title;
      $scope.yes   = FarmServices.data.dictionary['pic-approve'].yes;
      $scope.no    = FarmServices.data.dictionary['pic-approve'].no;

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
      $scope.approve = function(desition){
          log('approve','desition: '+desition);
          LoginService.setPicAproved(desition);

          if(!FarmServices.config.productionMode)
            {
                  LoginService.saveLocalLogin('MockToken','MockUID');
                    FarmServices.getStatus().then(function(data){
                      log('getStatus','success');
                      log('getStatus','redirecting to :'+data.frame.type);
                      $state.go(data.frame.type);

                    },function(err){
                        showError(FarmServices.data.dictionary.error.connection);
                        log('getStatus','fail');

                        console.log(err);
                        $scope.overlay     = true; 
                        $scope.timeOut     = true;  //rabbit
                        $scope.missedTitle = '';
                        $scope.missedText  = FarmServices.data.dictionary.error.connection;
                    });
            }
          else 
            {
              LoginService.register()
                .then(function(data){
                
                    if (data.result === 'success')
                      {
                        LoginService.saveLocalLogin(data.authToken,data.uid);
                        FarmServices.getStatus().then(function(data){
                          
                          $state.go(data.frame.type); log('getStatus','success');log('getStatus','redirecting to :'+data.frame.type);

                        },function(err){
                            log('getStatus','fail');
                            showError( FarmServices.data.dictionary.error.connection);
                            console.log(err);
                            
                        });

                      }
                    else
                      {
                       showError(FarmServices.data.dictionary.error.general);
                      }

                },function(err){
                    console.log(err);
                   
                   showError(FarmServices.data.dictionary.error.connection);
                  
                });
            }

        };

  
      //Activity
          console.log($stateParams)
          if ($stateParams.qa !== undefined)
            {
              log('getQA','qa status: '+$stateParams.qa);
              FarmServices.setQA($stateParams.qa);
            }
          else
             {
                log('getQA','qa flag not specified');   
             }


          if (LoginService.loadLocalLogin())
            {
              $state.go('vote');
            }
          //user is logued  to a social network ? 
          else if($stateParams.id !== undefined)
            {
              //$state.go('login');
              log('social-login','id: '+$stateParams.id+' token: '+$stateParams.token); 
              LoginService.saveSocial({
                      id :      $stateParams.id,
                      token :   $stateParams.token
                });
            }
          else
            {
                log('social-login','id: '+$stateParams.id+' token: '+$stateParams.token); 
                LoginService.saveSocial({
                      id: 'un',
                      token: 'unidentified'
                });
            }

  }]);
