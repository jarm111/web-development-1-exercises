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

/**
 * Service that offers saving/loading data to/from localstorage
 */
registrationApp.service('StorageService', function() {
    var storageId = 'regAppData';
    
    this.get = function() {
        var data = JSON.parse(localStorage.getItem(storageId));

        return (data == null) ? [] : data;
    };

    this.set = function(data) {
        localStorage.setItem('regAppData', JSON.stringify(data));
    };
});

/**
 * Service that manages application's data
 */
registrationApp.service('DataService', ['StorageService', function(StorageService) {

    var counter = 0;
    var data = [];

    this.initData = function() {
        var storageData = StorageService.get();
        storageData.forEach(function(element) {
            data.push(element);
            counter++;
        });
    };

    this.getData = function() {
        return data;
    };

    this.putData = function(newData) {
        newData.id = ++counter;
        data.push(newData);
        StorageService.set(data);
    };
}]);

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

/**
 * Executed when application starts
 */
registrationApp.run(['DataService', function(DataService) {
    DataService.initData();
}]);