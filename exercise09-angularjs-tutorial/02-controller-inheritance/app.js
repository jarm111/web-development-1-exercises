/* globals angular */

// Define the module
var carApp = angular.module('carApp', []);

// Define controller for the module
carApp.controller('CarContoller', function ($scope) {
    $scope.name = 'Car';
    $scope.type = 'Car';

    $scope.clickme = function() {
        alert('This is parent controller "CarController" calling');
    };
});

carApp.controller('BMWController', function($scope, $controller) {
    $controller('CarContoller', {$scope: $scope});
    
    $scope.name = 'BMW';
});

// carApp.controller('BMWController', function($scope, $injector) {
//     $injector.invoke(carApp.controller('CarController'), 
//         this, {$scope: $scope});
    
//     $scope.name = 'BMW';
// });