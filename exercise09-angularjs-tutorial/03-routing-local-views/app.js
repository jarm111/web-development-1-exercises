/* globals angular */

// Define the module
var orderApp = angular.module('orderApp', ['ngRoute']);

//Define Routing for app
orderApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/AddNewOrder', {
        templateUrl: 'add_order.html',
        controller: 'AddOrderController'
    }).when('/ShowOrders', {
        templateUrl: 'show_orders.html',
        controller: 'ShowOrdersController'
    }).otherwise({
        redirectTo: '/AddNewOrder'
    });
}]);

orderApp.controller('AddOrderController', ['$scope', function($scope) {
    $scope.message = 'This is Add new order screen';
}]);

orderApp.controller('ShowOrdersController', ['$scope', function($scope) {
    $scope.message = 'This is Show orders screen';
}]);