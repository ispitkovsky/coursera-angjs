(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

	//$scope.lunchMenu ='dish1, dish2, dish3';
	$scope.borderStyle = 'none';
	
  $scope.count = function() {
		if(!$scope.lunchMenu)
			return 0;
		if(!$scope.lunchMenu.trim())
			return 0;
		
		var arrayOfStrings = $scope.lunchMenu.split(',');
		var count = 0;
		for (var i = 0; i < arrayOfStrings.length; i++){
			// Empty items are not counted
			if (arrayOfStrings[i] && arrayOfStrings[i].trim())
				count++;
		};
		return count;
  };
	
	$scope.checkIfTooMuch = function(){
		var count=$scope.count();
		$scope.borderStyle = 'solid';
		if(count==0){
			$scope.lunchMessage = "Please enter data first";
			$scope.fontColor = "red";	
		}
		else{
			if(count<4){
				$scope.lunchMessage = "Enjoy!";
				$scope.fontColor = "green";
			}
			else {
				$scope.lunchMessage = "Too much!" ;
				$scope.fontColor = "green";
			}
		}

	};
}

})();
