'use strict';
/* @ngdoc function
 * @name theFarmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('MainCtrl', ['FarmServices', 'LoginService', '$scope', '$state',
    function(FarmServices, LoginService, $scope, $state) {

      $scope.preloadReady = false;

      $scope.closeAction = function() {
        LoginService.forgetState();
        FarmServices.clean();
        $state.go('land', LoginService.getSocial());
      }

      // $scope.productionFlag =  (FarmServices.config.productionMode)? {display:'none'}: {position:'',background:'red', color:'white', 'font-weight':'bold',padding:'10px 5px 0px 5px','margin-top':'9px'} ; 

      // FarmServices.getConfig().then(function(res){ 
      //               return FarmServices.getData(res.urls.base, res.tid, res.jsons['territory-data']);
      //           }).then(function(){ 
      //             // $scope.productionFlag =  FarmServices.cofig.productionMode ; 
      //              console.log('DATA CARGADA');
      //              console.log(FarmServices.config);
      //            });

      $scope.loader = true;
      $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (toState.resolve) {
          console.log("entering resolve");
        }
      });
      $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (toState.resolve) {
          console.log("resolve success");
        }
      });
      //footer config
      $scope.footerImages = ['rabbit', 'hen', 'field_login'];
      $scope.showBarn = false;

      function getBgUrl(el) {
        var bg = "";
        if (el.currentStyle) { // IE
          bg = el.currentStyle.backgroundImage;
        } else if (document.defaultView && document.defaultView.getComputedStyle) { // Firefox
          bg = document.defaultView.getComputedStyle(el, "").backgroundImage;
        } else { // try and get inline style
          bg = el.style.backgroundImage;
        }
        return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
      }

      var image = document.createElement('img');
      image.src = getBgUrl(document.getElementById('preload'));

      image.onload = function() {
        setTimeout(function () {
          $scope.preloadReady = true;
        },1500)
      }

    }
  ]);