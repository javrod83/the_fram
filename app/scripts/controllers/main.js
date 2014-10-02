'use strict';
/* @ngdoc function
 * @name theFarmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the theFarmApp
 */
angular.module('theFarmApp')
  .controller('MainCtrl',['FarmServices','LoginService','$scope','$state',
    function (FarmServices,LoginService,$scope,$state) {
    
      $scope.closeAction = function()
        {
          LoginService.forgetState();
          FarmServices.clean();
          $state.go('landing',LoginService.getSocial());
        }

        // $scope.productionFlag =  (FarmServices.config.productionMode)? {display:'none'}: {position:'',background:'red', color:'white', 'font-weight':'bold',padding:'10px 5px 0px 5px','margin-top':'9px'} ; 

          // FarmServices.getConfig().then(function(res){ 
          //               return FarmServices.getData(res.urls.base, res.tid, res.jsons['territory-data']);
          //           }).then(function(){ 
          //             // $scope.productionFlag =  FarmServices.cofig.productionMode ; 
          //              console.log('DATA CARGADA');
          //              console.log(FarmServices.config);
          //            });


       
        //footer config
        $scope.footerImages = ['rabbit','hen', 'field_login'];
        $scope.showBarn = false;

  }]);

