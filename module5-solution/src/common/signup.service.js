(function () {
"use strict";

angular.module('common')
.service('SignupService', SignupService);


SignupService.$inject = ['$http', 'ApiPath'];
function SignupService($http, ApiPath) {
  var service = this;
	var isSigned = false;
	var error;

  service.isSigned = function () {
		//isSigned = !isSigned;
    return isSigned;
  };
	
	service.submit = function(firstName, lastName, email, phone, menuNumber){
		service.getMenuItemById(menuNumber);
		console.log('service.submit: everything is OK');
	};
	
	service.getMenuItemById = function(menuNumber){
		return $http
			.get(ApiPath + '/menu_items/' + menuNumber + '.json')
			.then(function (response) {
				console.log('service.getMenuItemById.response.data=', response.data);
				service.error = '';
				return response.data;
			})
			.catch(function(e){
				service.error = 'No such menu number exists';
			});
	};
	
	service.errorMessage = function(){
		return service.error;
	};
		
	service.isSaved = function(){
		return service.error === '';
	};
}



})();
