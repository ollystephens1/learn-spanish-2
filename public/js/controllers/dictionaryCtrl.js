(function () {
    'use strict';
 
    var myApp = angular.module('myApp');

    myApp.controller('dictionaryCtrl', ['$scope', '$http', function($scope, $http) {
    	// Refreshes the dictionary table
    	var refresh = function() {
    		$http.get('/dictionary').then(function(response) {
    	    	$scope.words = response.data;
        	});
    	};

    	refresh(); // Call get on initial page load

        $scope.removeWord = function(id) {
        	$http.delete('/dictionary/' + id).then(function(response) {
        		refresh();
        	});
        };

        // Live search
        $scope.filterWords = function() {
            var q = $scope.filter;
            if(q.length > 0) {
                $http.get('/filterWords/' + q).then(function(response) {
                    $scope.words = response.data;
                });
            } else {
                refresh();
            }
        };

        // Add / Remove word from revision list
        $scope.toggleRevisionList = function() {
            $http.post('/toggleRevisionList', $scope.word).then(function(response) {
                $scope.word.revision_list = response.data;
            });
        };

    }]);

}());