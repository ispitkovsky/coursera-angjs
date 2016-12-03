(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['SignupService'];
function SignupController(SignupService) {
	var $ctrl = this;
	
	$ctrl.submit = function(){
		SignupService.submit($ctrl.firstName, $ctrl.lastName, $ctrl.email, $ctrl.phone, $ctrl.menuNumber);
	};
	

	$ctrl.errorMessage = function(){
		return SignupService.errorMessage();
	};
	
	$ctrl.isSaved = function(){
		return SignupService.isSaved();
	};
}

})();
