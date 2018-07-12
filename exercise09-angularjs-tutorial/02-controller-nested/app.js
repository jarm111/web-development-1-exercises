/* globals angular */

// Define the module
var carApp = angular.module('carApp', []);

// Define controller for the module
carApp.controller('CarContoller', function($scope) {
    $scope.name = 'Car';
    $scope.type = 'Car';
});

carApp.controller('BMWController', function($scope) {
    $scope.name = 'BMW';
});

carApp.controller('BMWMotorcycleController', function($scope) {
    $scope.name = 'BMWMotorade';
    $scope.type = 'Motorcycle';
});