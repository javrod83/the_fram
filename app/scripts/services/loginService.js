'use strict';
angular.module('theFarmApp')
.factory('LoginService',['$http','$q','FarmServices',function($http,$q,FarmServices){
 
 	var modName = 'LoginService';

 	function log(method,msg)
 		{
 			console.log('['+modName+']: '+method+' : '+msg);
 		}

	var Collection =   {

		//full name description of available social networks

		dictionary: {
          fb : 'Facebook',
          g  : 'Google',
          tw : 'Twitter'
       	},
       	params : {
                picApproved: 0 , //  1 or 0 according to user selection
                uid: 0, // user id
                token: 0, //token
                tid: 0, // territory id
        },
		loged:false,
		socialLoged:false,
		init:function(social){
			log('init','starting');

			var networks = {};
			for (var net in social.networks){	
				networks[Collection.dictionary[social.networks[net]]] = social[social.networks[net]].id ;
			}
			hello.init(networks);
		
			log('init','done');
		},
        register : function() {
        	log('register','<--');
            var deferred = $q.defer();
            var url = FarmServices.config.urls.login;
			Collection.params.tid = FarmServices.config.tid;
            var params = Collection.params;
            log('register','url: ' + url);
            log('register','params: ');
            console.log(params);
            return $http({method:'GET', url:url, params:params}).then(function(response) {
            //return $http.get(url).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                     if(response.data.result == "success"){
                        Collection.saveLocalLogin(response.data.authToken, response.data.uid);
                    }
                } else {
                    deferred.reject({
                        'errorMsg': 'registration unsuccessfull ! '
                    });
                }
                return deferred.promise;
            });
        },
        setPicAproved: function(desition){
        	log('setPicAproved','<--');
            Collection.params.picApproved = desition ; 
        },
        forgetState : function(){
        	log('forgetState','<--');
            localStorage.removeItem('vid');
            localStorage.removeItem('token');
            localStorage.removeItem('uid');
            Collection.loged = false ;
            Collection.socialLoged = false ; 
        },
        loadLocalLogin : function(){
        	log('loadLocalLogin','<--');
            if (localStorage.token !== undefined){
                Collection.params.token = localStorage.token;
                Collection.params.uid   = localStorage.uid;
                Collection.loged = true ;
                return true;
            }else{
                return false;
            }
        },
        saveLocalLogin : function(authToken,uid){
        	log('saveLocalLogin','<--');
            localStorage.token  = authToken ;
            localStorage.uid    = uid; 
            Collection.loged    = true ; 
        },
        saveSocial: function(args){
        	log('saveSocial','<--');
            //save argumments to register params 
            Collection.socialLoged  = true ; 
            Collection.params.uid = args.id ;
            Collection.params.token = args.token ;
            console.log(Collection.params);
            log('saveSocial','-->');
        },
        getSocial: function(args){
            log('getSocial','<--');
            return {id:Collection.params.uid,token:Collection.params.token}; 
        },
        vote : function(id) {
            var deferred = $q.defer();
            var url      = FarmServices.config.urls.vote;
            var uid      = Collection.params.uid;
            var token    = Collection.params.token;
            var vid      = FarmServices.status.current.frame.data.vid;

            Collection._saveVote(vid);

            //http://vote.farm.scrnz.com/v?u=<UID>&t=<TOKEN>&vi=<VID>&v=<SELECTION>
            return $http.get(url+'u='+uid+'&t='+token+'&vi='+vid+'&v='+id).then(function(response) {
            //return $http.post(url+'u='+uid+'&t='+token+'&vi='+vid+'&v='+id,{}).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject({
                        'errorMsg': 'vote unsuccessfull ! '
                    });
                }
                return deferred.promise;
            });
        },
        _saveVote : function(vid){
            log('_saveVote','<--');
            localStorage.vid = vid;
        },

        allreadyVoted : function (){
            log('_allReadyVoted',''+(localStorage.vid !== undefined));
            if(FarmServices.voteIdUpdated())
                localStorage.removeItem('vid');
            return (localStorage.vid !== undefined);
        },
	};

	return Collection; 

}]);