/* globals angular */

// Define the module
var calculatorApp = angular.module('calculatorApp', []);

//Define service
calculatorApp.service('MathService', function() {
    this.add = function(a, b) {
        return a + b; 
    };

    this.substract = function(a, b) {
        return a - b;
    };

    this.multiply = function(a, b) {
        return a * b;
    };

    this.divide = function(a, b) {
        return a / b;
    };
});

//Define service
calculatorApp.service('CalculatorService', ['MathService', function(MathService) {
    this.square = function(a) {
        return MathService.multiply(a, a);
    };

    this.cube = function(a) {
        return MathService.multiply(a, MathService.multiply(a, a));
    };
}]);

//Define controller
calculatorApp.controller('CalculatorController', ['$scope', 'CalculatorService', function($scope, CalculatorService) {
    $scope.doSquare = function() {
        $scope.answer = CalculatorService.square($scope.number);
    };

    $scope.doCube = function() {
        $scope.answer = CalculatorService.cube($scope.number);
    };
}]);