(function () {
    'use strict';
 
    var myApp = angular.module('myApp');

	myApp.controller('wordCtrl', ['$scope', '$http', function($scope, $http) {
		// Clear inputs
        $scope.showLatest = true;

        var clearFields = function() {
        	$scope.word = ''; 
        };

		$scope.latestWord = ''; // Clear latest word
		clearFields();
		


		$scope.addWord = function() {
        	$http.post('/add', $scope.word).then(function(response) {
        		$scope.latestWord = $scope.word; // show new word as latest
        		$scope.showLatest = false;
        		clearFields();
        	});
        };

        

	}]);

}());