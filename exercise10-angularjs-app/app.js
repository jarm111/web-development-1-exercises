/**
 * Harjoitus10.
 * 
 * Tee tässä videossa esitetty Angular1-sovellus ja sille ulkoasu Bootstrapilla. 
 * Alkuun pääset tämän oppaan avulla. 
 * Sovelluksessa on siis kaksi Angularjs:n reitityksellä toteutettua näkymää: 
 * Ilmoittautuneet ja Ilmoittautumislomake. 
 * Sovelluksen data menee JS-taulukkoon joka sijaitsee dataservice -nimisessä Servicessä. 
 * Service palauttaa metodit getData ja putData 
 * joita käytetään kontrollereissa joissa lisätään data scopesta Servicen taulukkoon 
 * ja haetaan data taulukosta scopeen. 
 * Data säilyy muistissa niin kauan kunnes sivu "reffataan" eli ladataan uudelleen. 
 * Pysyvää tallennusta eli backendiä sovelluksessa ei ole.
 * Bootstrapin piirteistä on käytetty paneeleja, formeja ja tablea.
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