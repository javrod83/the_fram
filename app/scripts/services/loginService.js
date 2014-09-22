'use strict';
angular.module('theFarmApp')
.factory('LoginService',function(){

 
	var Collection =   {
		init:function(social){
			console.log('social network handling inititalizing');

			var networks = {};

			for (var net in social.networks)
				{	
					//console.log(social.networks[net]);
					networks[Collection.diccionary[social.networks[net]]] = social[social.networks[net]].id ;
				}
			
			var redirect = {redirect_uri:'prompt'};
			
			hello.init(networks);
		
			console.log('social network handling inititalized');

		},
		diccionary : {
		 	fb : 'facebook',
		 	g : 'google',
		 	tw : 'twitter'
 		}
	};

	return Collection; 

});