/* globals angular */

/**
 * RegistrationApp Module
 */
var registrationApp = angular.module('registrationApp', ['ngRoute']);

/**
 * Routing
 */
registrationApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/ShowRegistrations', {
        templateUrl: 'templates/show_registrations.html',
        controller: 'ShowRegistrationsController'
    }).when('/Register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    }).otherwise({
        redirectTo: '/ShowRegistrations'
    });
}]);

registrationApp.service('DataService', function() {
    var data = [];

    this.getData = function() {
        return data;
    };

    this.putData = function(thing) {
        data.push(thing);
    };
});

/**
 * Controller that handles showing of registrations
 */
registrationApp.controller('ShowRegistrationsController', ['$scope', function($scope) {
    $scope.message = 'This is show_registrations screen';
}]);

/**
 * Controller that handles Register page
 */
registrationApp.controller('RegisterController', ['$scope', '$location', 'DataService', function($scope, $location, DataService) {
    $scope.submit = function() {
        DataService.putData($scope.newreg);
        $scope.newreg = {};
        console.log(DataService.getData());
        $location.path('/ShowRegistrations');
    };
}]);