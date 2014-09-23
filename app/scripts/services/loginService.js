'use strict';
angular.module('theFarmApp')
.factory('LoginService',['$http','$q','FarmServices',function($http,$q,FarmServices){
 
	var Collection =   {

		//full name description of available social networks

		dictionary: {
          fb : 'facebook',
          g  : 'google',
          tw : 'twitter'
       	},
       	token: -1,
		uid: -1,
		loged:false,
		init:function(social){
			
			console.log('social network handling inititalizing');

			var networks = {};

			for (var net in social.networks){	
				networks[Collection.dictionary[social.networks[net]]] = social[social.networks[net]].id ;
			}
			
			hello.init(networks);
		
			console.log('social network handling inititalized');

		},
        register : function() {
            var deferred = $q.defer();
            
            var url    = FarmServices.config.urls.login;
            var params = Collection.params;
            console.log("register url:"+url+" params: ");
            console.log(params);
            //return $http.post(url,params).then(function(response) {
            return $http.get(url).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                    // storear el token  y el uid 
                   
                    Collection._saveLocalLogin(response.data.authToken,response.data.uid);

                } else {
                    deferred.reject({
                        'errorMsg': 'registration unsuccessfull ! '
                    });
                }
                return deferred.promise;
            });
        },
        setPicAproved: function(desition){
            Collection.params.picApproved = desition ; 
        },
        forgetState : function(){
            localStorage.removeItem('vid');
            localStorage.removeItem('token');
            localStorage.removeItem('uid');
            Collection.loged = true ;
        },
        loadLocalLogin : function(){
            if (localStorage.token !== undefined){
                Collection.token = localStorage.token;
                Collection.uid   = localStorage.uid;
                Collection.loged = true ;
                return true;
            }else{
                return false;
            }
        },
        saveLocalLogin : function(token,uid){
            localStorage.token  = token ;
            localStorage.uid    = uid; 
            Collection.loged    = true ; 
            Collection.token    = token;
            Collection.uid      = uid;
        },
        logued :  function(){
            return Collection.loged ;
        },
	};

	return Collection; 

}]);