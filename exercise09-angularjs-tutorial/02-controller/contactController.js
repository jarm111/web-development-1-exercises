/* exported ContactController */
/* globals angular */

angular.module('contactApp', []);

angular.module('contactApp').controller('ContactController', function() {
    var vm = this;
    vm.contacts = ['hi@email.com', 'hello@email.com'];
    
    vm.add = function() {
        vm.contacts.push(vm.newcontact);
        vm.newcontact = '';
    };
});