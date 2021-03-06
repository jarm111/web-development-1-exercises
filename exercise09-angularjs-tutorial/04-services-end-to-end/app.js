/* globals angular */

// Define the module
var contactApp = angular.module('contactApp', []);

// Define service
contactApp.service('ContactService', function() {
    // Unique contact id
    var uid = 1;

    // Contact array to hold list of contacts
    var contacts = [{
        id: 0, 
        'name': 'Viral',
        'email': 'hello@gmail.com',
        'phone': '123-2343-44'
    }];

    //save method create a new contact if not already exists
    //else update the existing object
    this.save = function(contact) {
        // if this is new contact, add it in contacts array
        if (contact.id == null) {
            contact.id = uid++;
            contacts.push(contact);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (var i in contacts) {
                if (contacts[i].id === contact.id) {
                    contacts[i] = contact;
                }
            }
        }
    };

    //simply search contacts list for given id
    //and returns the contact object if found
    this.get = function(id) {
        for (var i in contacts) {
            if (contacts[i].id === id) {
                return contacts[i];
            }
        }
    };

    //iterate through contacts list and delete 
    //contact if found
    this.delete = function(id) {
        for(var i in contacts) {
            if (contacts[i].id === id) {
                contacts.splice(i, 1);
            }
        }
    };

    //simply returns the contacts list
    this.list = function() {
        return contacts;
    };
});

// Define controller
contactApp.controller('ContactController', ['$scope', 'ContactService', function ($scope, ContactService) {
    $scope.contacts = ContactService.list();
    
    $scope.saveContact = function() {
        ContactService.save($scope.newcontact);
        $scope.newcontact = {};
    };

    $scope.delete = function(id) {
        ContactService.delete(id);
        if ($scope.newcontact.id === id) {
            $scope.newcontact = {};
        }
    };

    $scope.edit = function(id) {
        $scope.newcontact = angular.copy(ContactService.get(id));
    };
}]);