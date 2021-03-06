(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
;

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;

	service.getAllCategories = function(){
		return $http({
			method: "GET",
			url: (ApiBasePath + "/categories.json")
		}).then(function(result){
			console.log('service.getAllCategories.result.data=', result.data);
			return result.data;
		});
	}
	
  service.getItemsForCategory = function (categoryShortName) {
		//console.log('service.getItemsForCategory.categoryShortName=', categoryShortName);
		return $http({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
		}).then(function(result){
			console.log('service.getItemsForCategory.result.data.menu_items=', result.data.menu_items);
			return result.data.menu_items;
		});
  }
	
};

})();
