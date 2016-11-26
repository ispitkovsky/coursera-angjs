(function () {
'use strict'

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['categories'];
function CategoriesController(categories) {
		var CategoriesController = this;

		console.log('CategoriesController.categories=', categories);

		CategoriesController.categories = categories;
}
})();