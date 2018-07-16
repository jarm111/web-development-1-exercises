/* globals angular */

// Define the module
var orderApp = angular.module('orderApp', ['ngRoute']);

//Define Routing for app
orderApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/AddNewOrder', {
        templateUrl: 'add_order.html',
        controller: 'CommonController',
        orderData: 'addorder'
    }).when('/ShowOrders', {
        templateUrl: 'show_orders.html',
        controller: 'CommonController',
        orderData: 'showorders'
    }).otherwise({
        redirectTo: '/AddNewOrder'
    });
}]);

orderApp.controller('CommonController', ['$scope', '$route', function($scope, $route) {
    var orderAction = $route.current.orderData;

    alert(orderAction);
}]);