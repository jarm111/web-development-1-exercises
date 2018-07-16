/* globals angular */

// Define the module
var orderApp = angular.module('orderApp', ['ngRoute']);

//Define Routing for app
orderApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/ShowOrder/:orderId', {
        templateUrl: 'templates/show_order.html',
        controller: 'ShowOrderController'
    });
}]);

//Define Controller for ShowOrder
orderApp.controller('ShowOrderController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.order_id = $routeParams.orderId;
}]);