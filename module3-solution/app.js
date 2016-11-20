(function () {
'use strict';


angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective)
;


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'found',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var found = this;

	found.somethingFound = function(){
		return found.items && (found.items.length > 0);
	};
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var list = this;

	// list.found = function(){
		// return MenuSearchService.getFound();
	// };
	
	list.search = function() {
		MenuSearchService.getMatchedMenuItems(list.searchTerm).then(function(result){
            list.found = result;
          });
  };

	list.removeItem = function(index) {
    console.log("'this' is: ", this);
		MenuSearchService.removeItem(index);
	};
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  var foundItems = [];
	
	service.getMatchedMenuItems = function(searchTerm) {
		console.log('(service.getMatchedMenuItems) searchTerm=', searchTerm); 
		var response = $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			})
			.then(function (result) {
				foundItems = []

				for (var i = 0; i < result.data.menu_items.length; i++) {
					var name = result.data.menu_items[i].name;
					if (!(searchTerm === undefined || searchTerm.trim() === "")) {
						if (name.toLowerCase().indexOf(searchTerm) !== -1) {
							foundItems.splice(0, 0, result.data.menu_items[i]);
						};
					};
				};
				console.log('service.getMatchedMenuItems.foundItems=', foundItems);
				return foundItems;
			});
		return response;
	};
	
	service.getFound = function(){
		return foundItems;
	}
	
  service.removeItem = function (index) {
		console.log('foundItems.splice(itemIndex, 1); itemIndex=', index);
		foundItems.splice(index, 1);
  };
}


})();
