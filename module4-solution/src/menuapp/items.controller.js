(function () {
'use strict'

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items'];
function ItemsController(items) {
		var ItemsController = this;

		console.log('ItemsController.items=', items);
		ItemsController.items = items;
}

})();