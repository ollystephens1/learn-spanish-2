var myApp = angular.module('myApp', ['ngRoute']);

myApp.controller('flashcardCtrl', ['$scope', '$http', function($scope, $http) {

	// Refreshes the dictionary table
	var refresh = function() {
		$http.get('/test').then(function(response) {
	    	$scope.words = response.data;
	    	$scope.word = ""; // Clear input boxes after submission
    	});
	};

	refresh(); // Call get on initial page load

    $scope.addWord = function() {
    	$http.post('/test', $scope.word).then(function(response) {
    		refresh();
    	});
    };

    $scope.removeWord = function(id) {
    	$http.delete('/test/' + id).then(function(response) {
    		refresh();
    	});
    };
}]);

