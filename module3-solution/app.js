(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
//.directive('foundItemsDirective', FoundItemsDirective)
;



// function FoundItemsDirective() {
  // var ddo = {
    // templateUrl: 'shoppingList.html',
    // scope: {
      // items: '<',
      // myTitle: '@title',
      // onRemove: '&'
    // },
    // controller: NarrowItDownController,
    // controllerAs: 'list',
    // bindToController: true		
  // };

  // return ddo;
// }


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var list = this;

  var promise = MenuSearchService.getAllMenuItems();

	promise.then(function (response) {
    list.items = response.data;
		console.log('NarrowItDownController.list.items=', list.items);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

	list.found = function (searchTerm) {
		return MenuSearchService.getMatchedMenuItems(searchTerm);
	};

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
	var service = this;
	
	service.getAllMenuItems = function () {
		var response = $http({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json")
		});

		service.response = response;
		return response;
	};

	service.getMatchedMenuItems = function (searchTerm) {
		var promise = service.getAllMenuItems();

		var items = [];
		var promise2 = promise.then(function (response) {
			items = response.data;
		})
		.catch(function (error) {
			console.log("Something went terribly wrong.");
		});

		
		var foundItems = [];
		promise2.then(function(){
			//console.log('promise2.searchTerm', searchTerm);
			//console.log('promise2.items.menu_items.length', items.menu_items.length);
			for (var i = 0; i < items.menu_items.length - 1; i++) {
				var desc = items.menu_items[i].description;

				if (desc.toLowerCase().indexOf(searchTerm) !== -1) {
					foundItems.splice(1, 0, items.menu_items[i]);
				}
			}
			console.log('service.getMatchedMenuItems.foundItems.length', foundItems.length);
			console.log('service.getMatchedMenuItems.foundItems', foundItems);
			return foundItems;
		})

		//console.log('searchTerm=', searchTerm);
		//console.log('service.getMatchedMenuItems.foundItems=', foundItems);
		//return foundItems;
	};

}

})();
