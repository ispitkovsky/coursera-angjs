(function () {
'use strict';



angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var getToBuy = this;

  getToBuy.items = ShoppingListCheckOffService.getToBuy();

	getToBuy.boughtItem = function(itemIndex) {
    ShoppingListCheckOffService.boughtItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var alreadyBought = this;

  alreadyBought.items = ShoppingListCheckOffService.getBought();

	alreadyBought.removeItem = function(itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
	
}

function ShoppingListCheckOffService() {
  var service = this;

	var shoppingList = [
		{
			name: "Milk",
			quantity: "5"
		},
		{
			name: "Donuts",
			quantity: "2"
		},
		{
			name: "Cookies",
			quantity: "10"
		},
		{
			name: "Chocolate",
			quantity: "1"
		}
	];

	
  // List of shopping items
  var toBuyItems = shoppingList;
  var boughtItems = [];
	
  service.boughtItem = function (itemIndex) {
    var item = {
      name: toBuyItems[itemIndex].name,
      quantity: toBuyItems[itemIndex].quantity
    };
    boughtItems.push(item);
		toBuyItems.splice(itemIndex, 1);
  };

  service.removeItem = function (itemIndex) {
		var item = {
      name: boughtItems[itemIndex].name,
      quantity: boughtItems[itemIndex].quantity
    };
    toBuyItems.push(item);
		boughtItems.splice(itemIndex, 1);
  };

  service.getToBuy = function () {
    return toBuyItems;
  };

  service.getBought = function () {
    return boughtItems;
  };

}

})();
