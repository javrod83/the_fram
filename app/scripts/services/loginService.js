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
          fb : 'facebook',
          g  : 'google',
          tw : 'twitter'
       	},
       	params : {
                ageRange : '',
                birthday: '',
                devicePlatform: '', // iOS, Android or WP (case sensitive)
                deviceType: '',  //  device codename
                location: '',
                name: '',
                picApproved: 0 , //  1 or 0 according to user selection
                relationshipStatus: '',
                sex: '',
                socialId: '',  // the social network id
                socialNetwork: '', // Facebook, Twitter or Google (case sensitive)
                socialToken: '', // token from social network connect
                tid: '', // territory id
                udid: '', // device unique identifier
                old_auth_token: '',
                picURL: ''
        },
       	token: -1,
		uid: -1,
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
            var url    = FarmServices.config.urls.login;
            var params = Collection.params;
             log('register','url: '+url);
            log('register','params: ');
            console.log(params);
            return $http.post(url,params).then(function(response) {
            //return $http.get(url).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                    // storear el token  y el uid 
                   
                    Collection.saveLocalLogin(response.data.authToken,response.data.uid);

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
                Collection.token = localStorage.token;
                Collection.uid   = localStorage.uid;
                Collection.loged = true ;
                return true;
            }else{
                return false;
            }
        },
        saveLocalLogin : function(token,uid){
        	log('saveLocalLogin','<--');
            localStorage.token  = token ;
            localStorage.uid    = uid; 
            Collection.loged    = true ; 
            Collection.token    = token;
            Collection.uid      = uid;
        },
        saveSocial: function(args){
        	log('saveSocial','<--');
            //save argumments to register params 
            Collection.socialLoged = true ; 
            Collection.params.socialId      = args.id ;
            Collection.params.socialNetwork = args.network ;
            Collection.params.socialToken   = args.token ;
            console.log(Collection.params);
            log('saveSocial','-->');
        },
        vote : function(id) {
            var deferred = $q.defer();
            var url      = FarmServices.config.urls.vote;
            var uid      = Collection.uid;
            var token    = Collection.token;
            var vid      = FarmServices.status.current.frame.vote.vid;

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