(function () {
    'use strict';
 
    var myApp = angular.module('myApp');
    
    myApp.controller('playCtrl', ['$scope', '$http', function($scope, $http) {

    	// Clear filters on initial pageload
    	$scope.filters = '';

		// Refresh current word
		var refreshWord = function() {
			// Set default get URL
			var playURL = '/play';

			// Check for filters - append to URL if they exist
			if($scope.filters) {
				//playURL += "/" + $scope.filters;
			}

			$http.get(playURL).then(function(response) {
				$scope.word = response.data;
				$scope.showEsp = true;
				$scope.showEspTxt = 'Show';
			});
		};

		refreshWord(); // Call get on initial page load

		// "Next" button press - get new word
		$scope.getWord = function() {
			refreshWord();
		};

		// Show / hide spanish
		$scope.toggleWord = function() {
			if($scope.showEsp == true) {
				$scope.showEsp = false;
				$scope.showEspTxt = "Hide";
			} else {
				$scope.showEsp = true;
				$scope.showEspTxt = "Show";
			}
		};	

	}]);
	 
}());


