(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })
	
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/categories.template.html',
    controller: 'CategoriesController as catList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('catDetails', {
    url: '/cat-details/{categoryName}',
    templateUrl: 'src/menuapp/templates/items.template.html',
    controller: 'ItemsController as catDetailsList',
    resolve: {
			items: ['MenuDataService', '$stateParams',
				function (MenuDataService, $stateParams) {
					//console.log('$stateParams', $stateParams);
					return MenuDataService.getItemsForCategory($stateParams.categoryName);
      }]
		}	
	});
}

})();
