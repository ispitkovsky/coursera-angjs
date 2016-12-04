(function () {
"use strict";

angular.module('common')
.service('SignupService', SignupService);


SignupService.$inject = ['$http', 'ApiPath'];
function SignupService($http, ApiPath) {
  var service = this;
	var isSigned = false;
	var error;
	
	service.getApiPath = ApiPath;
	
	var info;
	// var info = {
		// firstName: 'some firstName',
		// lastName: 'some lastName',
		// email: 'some email',
		// phone: 'some phone',
		// menuItem: {
			// category_short_name:"SP",
			// created_at:"2016-11-30T20:33:58.937Z",
			// description:"with choice of string bean, string bean chicken, string bean beef, beef onions, moo shu vegetable",
			// id:28,
			// image_present:true,
			// large_portion_name:null,
			// name:"Chinese Scallion Pancake Wrap",
			// price_large:18.95,
			// price_small:null,
			// short_name:"SP1",
			// small_portion_name:null,
			// updated_at:"2016-11-30T20:33:58.937Z"		
		// }
	// };

	// service.info = info;
	console.log('service.info=', service.info);

  service.isSigned = function () {
    return service.info;
  };
	
	service.submit = function(firstName, lastName, email, phone, menuNumber){
		service.getMenuItemById(menuNumber)
		.then(function(result){
			var info = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				phone: phone,
				menuItem: result
			};
			service.info = info;
		})
		.catch(function(e){
				service.error = 'No such menu number exists';
				service.info = undefined;
		});
	};
	
	service.getMenuItemById = function(menuNumber){
		return $http
			.get(ApiPath + '/menu_items/' + menuNumber + '.json')
			.then(function (response) {
				service.error = '';
				return response.data;
			});
	};
	
	service.errorMessage = function(){
		return service.error;
	};
		
	service.isSaved = function(){
		return service.info;
	};
	
	service.getInfo = function(){
		return service.info;
	};
	
}



})();
