/**
 * Harjoitus11.
 * Tee harjoitus10:ssä tekemääsi pieneen Angular1-sovellukseen 
 * datan tallennus HTML5 localstorageen. 
 * Huomaa että tallennettava data on JS-olioita jotka ovat taulukon sisällä. 
 * Oliot pitää muuttaa merkkijonomuotoon kun ne tallennetaan localstorageen 
 * ja takaisin oliomuotoon kun ne tuodaan localstoragesta sovellukseen. 
 * Sovellus toimii kuten ennenkin, mutta ladattaessa sivu uudelleen tiedot eivät 
 * häviä koska ne on varastoitu localstorageen joka on pysyvä tallennustila.
 */

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

    var counter = 2;
    var data = [{
        'email': 'juha.mieto@oujee.fi',
        'food': 'kasvis',
        'id': 1,
        'name': 'Juha Mieto',
        'sauna': true
    }, {
        'email': 'ossi@osallistuja.com',
        'food': 'kala',
        'id': 2,
        'name': 'Ossi Osallistuja',
        'sauna': false
    }];

    this.getData = function() {
        return data;
    };

    this.putData = function(newData) {
        newData.id = ++counter;
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
    $scope.submit = function(isFormValid) {
        if (isFormValid) {
            DataService.putData($scope.newreg);
            $scope.newreg = {};
            $location.path('/ShowRegistrations');
        }
    };
}]);