//moduli jossa mukana ngRoute reititystä varten
var studentApp = angular.module('studentApp', ['ngRoute']);
// configure our routes
studentApp.run();//ajetaan aina käynnistyksessä run()

studentApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'pages/show.html',
            controller: 'showController'
        })

        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })

        .when('/admin', {
            templateUrl: 'pages/admin.html',
            controller: 'adminController'

        });
});

/* run-funktiossa tutkitaan $locationChangeStart -olion avulla
 * ollaanko vaihtamassa sivua. Jos ollaan vaihtamassa sivua ja
 * mennään suojatulle sivulle ja tokenia ei ole, niin ei päästetä
 * sivulle. Kun avaat kommentista tämän funktion, sovellus ei aluksi
 * toimi.
 */
/*
studentApp.run(function ($rootScope, $http, $location, $window, authService) {
   //toteutus tänne
});
*/

/*
 * authService huolehtii sovelluksen autentikaatiosta
 * otetaan vastaan web token ja katsotaan että kyseessä on
 * varmasti se token joka on tullut palvelimelta.
 * Token tallennetaan sessionStorageen jossa se on voimassa
 * niin kauan kuin selain on auki.
 *
 * $http:llä saadaan tavara serveriltä
 * $window:lla päästään käsiksi sessionstorageen
 */


studentApp.factory('authService', function ($http, $window) {
    /*
    Toteutus tänne
    */


});


/*
 * Kaikki yhteydet backendiin ovat dataservicessä
 * controllerin scope-funktiot käyttävät dataserviceä
 * controllerin funktiot ovat saman nimisiä kuin dataservicessä
 *
 * factory palauttaa funktioita jotka palauttavat promisen
 */

studentApp.factory('dataService', function ($http) {


    return {
        read: function () {
            //palautetaan promise
            return $http.get('http://localhost:3000/students')
                .then(function (result) {
                    return result.data;
                });

        },
        create: function (formdata) {
            //lähetetään data backendiin, palautetaan promise
            return $http({
                method: 'post',
                url: 'http://localhost:3000/students',
                data: formdata
            }).then(function (result) {
                return result.data;

            });
        },
        del: function (student) {

            //toteutus tänne
        },
        update: function (formdata) {

            //toteutus tänne
        }
    };
});




//etusivun controller
studentApp.controller('showController', ['$scope', 'dataService', function ($scope, dataService) {

    //promisen käyttö
    dataService.read().then(function (data) {
        $scope.students = data;
    });
}]);



//login-sivun controller hakee tunnarit login-sivulta ja välittää ne authServiceen
studentApp.controller('loginController', ['$scope', 'authService', function ($scope, authService) {



}]);

//admin-sivun controller
studentApp.controller('adminController', ['$scope', 'dataService', function ($scope, dataService) {

    //Nappien alkutilanne
    $scope.createbtn = true;
    $scope.updatebtn = false;

    $scope.read = function () {

        dataService.read().then(function (data) {
            $scope.students = data;
        });

    };

    $scope.read();//luetaan uusin data aina ensin kun tullaan admin-tilaan


    $scope.create = function () {

        dataService.create($scope.formdata).then(function () {

            $scope.read();
        });

    };


    $scope.del = function (student) {

        //toteutus tänne

    };

    /*
     * updateform -napin painaminen laittaa muokattavat tiedot scopeen
     * jolloin ne näkyvät viewissä muokkauslomakkeella.
     * Tässä siis ladataan data muokkauslomakkeelle
     * update-funktio vie datan kantaan ja hakee kannasta päivittyneen
     * datan joka laitetaan scopeen ja scope ladataan uudestaan
     */
    $scope.updateform = function (student) {

        $scope.formdata = {};//määritellään formdata -taulukko ja tyhjennetään jos on jo olemassa

        $scope.formdata._id = student._id;
        $scope.formdata.student_number = student.student_number;
        $scope.formdata.name = student.name;
        $scope.formdata.email = student.email;
        $scope.formdata.study_points = student.study_points;

        $scope.createbtn = false;
        $scope.updatebtn = true;


    };

    $scope.update = function () {


        //toteutus tänne

    };

}]);
