/* exported ContactController */

function ContactController($scope) {
    $scope.contacts = ['hi@email.com', 'hello@email.com'];
    
    $scope.add = function() {
        $scope.contacts.push($scope.newcontact);
        $scope.newcontact = '';
    };
}