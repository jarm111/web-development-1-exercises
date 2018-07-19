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
    var data = [{
        'email': 'juha.mieto@oujee.fi',
        'food': 'kasvis',
        'name': 'Juha Mieto',
        'sauna': true
    }, {
        'email': 'ossi@osallistuja.com',
        'food': 'kala',
        'name': 'Ossi Osallistuja',
        'sauna': false
    }];

    this.getData = function() {
        return data;
    };

    this.putData = function(newData) {
        data.push(newData);
    };
});

/**
 * Controller that handles showing of registrations
 */
registrationApp.controller('ShowRegistrationsController', ['$scope', 'DataService', function($scope, DataService) {
    $scope.registrations = DataService.getData();
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