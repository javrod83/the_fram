'use strict';
angular.module('theFarmApp')
.factory('FarmServices',['$http','$q',function($http,$q){

    var Collection = {
        config : {},
        data : {},
        registration : {
            token : -1,
            uid : -1,
            social : {
                id: '',
                network : '',
                token : ''
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
            }
       },
        lastStatusId : -1,
        lastVoteId : -1,
        status : {
            current : {
                id : -1
            },
            last : {
                id: -1
            }
        },
        timeStatus : {
            lastStatus : -1,
            lastTerritory : -1 
        },
        flags : {
            loged : false,
            initialized : false
        },
        _forgetState : function(){
            localStorage.removeItem('vid');
            localStorage.removeItem('token');
            localStorage.removeItem('uid');
        },
        _setPicAproved: function(desition)
        {
            Collection.registration.params.picApproved = desition ; 
        },
        _saveVote : function(vid){
            localStorage.vid = vid;
        },
        _allReadyVoted : function (){
            console.log(Collection.status);

                return (localStorage.vid !== undefined)
               


            //return (localStorage.vid === 'undefined')?false:(Collection.status.current.frame.vote.vid  === localStorage.vid );
            // if (localStorage.vid === undefined){ 
            //     return false;
            // }else{
            //     return (Collection.status.current.frame.vote.vid  === localStorage.vid );
            // }
        },
        _loadLocalLogin : function(){
            if (localStorage.token !== undefined){
                Collection.registration.token = localStorage.token;
                Collection.registration.uid   = localStorage.uid;
                Collection.flags.loged       = true ;
                return true;
            }else{
                return false;
            }
        },
        _saveLocalLogin : function(token,uid){
            localStorage.token            = token ;
            localStorage.uid              = uid; 
            Collection.flags.loged        = true ; 
            Collection.registration.token = token;
            Collection.registration.uid   = uid;
        },
        _setStatusReloadInterval : function(callBack){
            setTimeout(function() {
                callBack(Collection.getStatus()) ; 
            }, Collection.status.current.interval*1000);
        },
        _setRegionReloadInterval : function (interval){
             setTimeout(function() {
               Collection.getData();
            }, interval*1000);
        },
        _logued :  function(){
            return Collection.flags.loged ;
        },
        _ready : function (){
            console.log(Collection.flags.loged);
            console.log(Collection.flags.initialized);
            
            return ( Collection.flags.loged && Collection.flags.initialized )  ;
        },
        _initilized : function(){
            return Collection.flags.initialized;
        },
        _updatedStatus : function (){
            return (Collection.status.current.id > -1  && Collection.status.current.id > Collection.status.last.id);    
        },
        getConfig : function(url) {
            var deferred = $q.defer();
            return $http.get(url+'/config.json').then(function(response) {

            //  console.log(response);
                if (response.status === 200) {
                    Collection.config = response.data;
                    deferred.resolve(response.data);
                } else {
                    deferred.reject({
                        'errorMsg': 'config.json file unreacheable ! '
                    });
                }
                return deferred.promise;
            });
        },
        getData : function() {
            var deferred = $q.defer();

            var url      = Collection.config.urls.base;
            var tid      = Collection.config.tid;
            var filename = Collection.config.jsons['territory-data'];

            return $http.get(url+tid+'/'+filename).then(function(response) {
                if (response.status === 200) {
                    Collection.data = response.data;
                    deferred.resolve(response.data);
                } else {
                    deferred.reject({
                        'errorMsg': 'data file ['+filename+'] unreacheable ! '
                    });
                }
                return deferred.promise;
            });
        },
        getStatus : function() {
            var deferred = $q.defer();

            var url = Collection.config.urls.base;
            var tid = Collection.config.tid;
            var filename = Collection.config.jsons.status; 

            return $http.get(url+tid+'/'+filename).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                    Collection.status.current = response.data; 

                } else {
                    deferred.reject({
                        'errorMsg': 'status file ['+filename+'] unreacheable ! '
                    });
                }
                return deferred.promise;
            });
        },
        getPhotoMock : function() {
            var deferred = $q.defer();

            var url      = 'api/' ;
            var tid      = '9' ;
            var filename = 'status_photo.json' ; 

            return $http.get(url+tid+'/'+filename).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                    Collection.status.current = response.data; 

                } else {
                    deferred.reject({
                        'errorMsg': 'status file ['+filename+'] unreacheable ! '
                    });
                }
                return deferred.promise;
            });
        },
        getTextMock : function() {
            var deferred = $q.defer();

            var url = 'api/';
            var tid = '9';
            var filename = 'status_text.json'; 

            return $http.get(url+tid+'/'+filename).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                    Collection.status.current = response.data; 

                } else {
                    deferred.reject({
                        'errorMsg': 'status file ['+filename+'] unreacheable ! '
                    });
                }
                return deferred.promise;
            });
        },
        _saveSocial: function(args){
            //save argumments to register params 

                Collection.registration.params.socialId      =  args.id ;
                Collection.registration.params.socialNetwork = args.network ;
                Collection.registration.params.socialToken   = args.token ;
        },
        register : function() {
            var deferred = $q.defer();
            
            var url    = Collection.config.urls.login;
            var params = Collection.registration.params;
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
        _vote : function(id) {
            var deferred = $q.defer();
            var url = Collection.config.urls.vote;
            var uid = Collection.registration.uid;
            var token = Collection.registration.token;
            var vid = Collection.status.current.frame.vote.vid;

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
        }
    };

    return Collection;

}]);