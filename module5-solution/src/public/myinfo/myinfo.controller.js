(function () {
"use strict";

angular.module('public')
.controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['SignupService'];
function MyinfoController(SignupService) {
	var $ctrl = this;
	
	$ctrl.basePath = SignupService.getApiPath;
	
	$ctrl.isSaved = function(){
		return SignupService.isSaved();
	};

	$ctrl.getInfo = function(){
		return SignupService.getInfo();
	};
	
}

})();
