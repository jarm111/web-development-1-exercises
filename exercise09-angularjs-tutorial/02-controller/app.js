/* globals angular */

// Define the module
var contactApp = angular.module('contactApp', []);

// Define controller for the module
contactApp.controller('ContactController', function ContactController($scope) {
    $scope.contacts = ['hi@email.com', 'hello@email.com'];
    
    $scope.add = function() {
        $scope.contacts.push($scope.newcontact);
        $scope.newcontact = '';
    };
});