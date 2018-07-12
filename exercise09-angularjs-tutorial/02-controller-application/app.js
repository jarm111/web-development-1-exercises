/* globals angular */

// Define the module
var contactApp = angular.module('contactApp', []);

contactApp.value('uid', 1);

// Define controller for the module
contactApp.controller('ContactController', ['$scope', 'uid', function ($scope, uid) {
    $scope.contacts = [
        {
            id: 0, 
            'name': 'Viral',
            'email': 'hello@gmail.com',
            'phone': '123-2343-44'
        }
    ];
    
    $scope.saveContact = function() {
        //if this is new contact, add it in contacts array
        if($scope.newcontact.id === undefined) {
            $scope.newcontact.id = uid++;
            $scope.contacts.push($scope.newcontact);
        } else {
            // For existing contact, find this contact using id and update it
            for (var i in $scope.contacts) {
                if($scope.contacts[i].id === $scope.newcontact.id) {
                    $scope.contacts[i] = $scope.newcontact;
                }
            }
        }
        // Clear the add contact form
        $scope.newcontact= {};

        // Search contact with gived id and delete it
        $scope.delete = function(id) {
            for(var i in $scope.contacts) {
                if($scope.contacts[i].id === id) {
                    $scope.contacts.splice(i,1);
                    $scope.newcontact = {};
                }
            }
        };

        // Search contact with gived id and update it
        $scope.edit = function(id) {
            for (var i in $scope.contacts) {
                if($scope.contacts[i].id === id) {
                    // we use angular.copy() method to 
                    // create copy of original object
                    $scope.newcontact = angular.copy($scope.contacts[i]);
                }
            }
        };
    };
}]);