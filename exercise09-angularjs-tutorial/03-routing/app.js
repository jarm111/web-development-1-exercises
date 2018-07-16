/* globals angular */

// Define the module
var orderApp = angular.module('orderApp', ['ngRoute']);

//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller ShowOrdersController
orderApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/AddNewOrder', {
        templateUrl: 'templates/add_order.html',
        controller: 'AddOrderController'
    }).when('/ShowOrders', {
        templateUrl: 'templates/show_orders.html',
        controller: 'ShowOrdersController'
    }).otherwise({
        redirectTo: '/AddNewOrder'
    });
}]);

orderApp.controller('AddOrderController', ['$scope', function($scope) {
    $scope.message = 'This is Add new order screen';
}]);

orderApp.controller('ShowOrdersContoller', ['$scope', function($scope) {
    $scope.message = 'This is Show orders screen';
}]);