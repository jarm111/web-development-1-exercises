/* globals angular */

//moduli jossa mukana ngRoute reititystä varten
var studentApp = angular.module('studentApp', ['ngRoute']);
// configure our routes
studentApp.run(); //ajetaan aina käynnistyksessä run()

studentApp.config(function($routeProvider) {
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
studentApp.run(function($rootScope, $http, $location, $window, authService) {
    // var currentUser = JSON.parse($window.sessionStorage.getItem('currentUser'));
    function getCurrentUser() {
        return JSON.parse($window.sessionStorage.getItem('currentUser'));
    }
    var currentUser = getCurrentUser();
    // keep user logged in after page refresh
    if (currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.token;
    }
    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        console.log(getCurrentUser());
        var publicPages = ['/', '/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !getCurrentUser()) {
            $location.path('/login');
        }
    });
});

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
studentApp.factory('authService', function($http, $window) {
    return {
        login: function(email, password, callback) {
            $http.post(
                'http://localhost:3000/auth/login/',
                {
                    email: email,
                    password: password
                }
            ).then(function successCallback(response) {
                var token = response.data.token;
                if (token) {
                    // store username and token in session storage to keep user logged as long as browser tab is open
                    $window.sessionStorage.setItem('currentUser', JSON.stringify({email: email, token: token}));
                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;

                    // execute callback with true to indicate successful login
                    callback(response.status);
                } else {
                    callback(499);
                }
            }, function errorCallback(response) {
                callback(response.status);
            });
        },

        logout: function() {
            // remove user from session storage and clear http auth header
            sessionStorage.removeItem('currentUser');
            $http.defaults.headers.common.Authorization = '';    
        }
    };
});

/*
 * Kaikki yhteydet backendiin ovat dataservicessä
 * controllerin scope-funktiot käyttävät dataserviceä
 * controllerin funktiot ovat saman nimisiä kuin dataservicessä
 *
 * factory palauttaa funktioita jotka palauttavat promisen
 */
studentApp.factory('dataService', function($http) {
    return {
        read: function() {
            //palautetaan promise
            return $http.get('http://localhost:3000/students')
                .then(function(result) {
                    return result.data;
                });
        },
        readUnder100: function() {
            //palautetaan promise
            return $http.get('http://localhost:3000/students/under100')
                .then(function(result) {
                    return result.data;
                });
        },
        create: function(formdata) {
            //lähetetään data backendiin, palautetaan promise
            return $http({
                method: 'post',
                url: 'http://localhost:3000/students',
                data: formdata
            }).then(function(result) {
                return result.data;
            });
        },
        del: function(id) {
            return $http({
                method: 'delete',
                url: 'http://localhost:3000/students/' + id,
            });
        },
        update: function(formdata) {
            return $http({
                method: 'put',
                url: 'http://localhost:3000/students/' + formdata.id,
                data: formdata
            }).then(function(result) {
                return result.data;
            });
        }
    };
});

//etusivun controller
studentApp.controller('showController', ['$scope', 'dataService', function($scope, dataService) {
    $scope.showUnder100credits = false;
    updateStudentData();

    $scope.toggleUnder100credits = function() {
        $scope.showUnder100credits = $scope.showUnder100credits ? false : true;
        updateStudentData();
    };

    function updateStudentData() {
        if ($scope.showUnder100credits) {
            dataService.readUnder100().then(function(data) {
                $scope.students = data;
            });
        } else {
            //promisen käyttö
            dataService.read().then(function(data) {
                $scope.students = data;
            });
        }
    }
}]);

//login-sivun controller hakee tunnarit login-sivulta ja välittää ne authServiceen
studentApp.controller('loginController', ['$scope', 'authService', function($scope, authService) {
    $scope.loginData = {};
    $scope.loginData.message = '';

    $scope.login = function() {
        authService.login($scope.loginData.email, $scope.loginData.password, function(result) {
            if (result === 200) {
                $scope.loginData.message = 'Login successful!';
            } else if (result === 404) {
                $scope.loginData.message = 'User with provided email not found!';
            } else if (result === 401) {
                $scope.loginData.message = 'Wrong Password!';
            } else if (result === 499) {
                $scope.loginData.message = 'No token found!';
            } else {
                $scope.loginData.message = 'Unknown error: ' + result;
            }
        });
    };
}]);

//admin-sivun controller
studentApp.controller('adminController', ['$scope', 'dataService', function($scope, dataService) {
    //Nappien alkutilanne
    $scope.createbtn = true;
    $scope.updatebtn = false;
    $scope.studentNumberRegex = /^[a-z]{1}[0-9]{4}$/;
    $scope.studyPointsRegex = /^[0-9]{1,4}$/;
    $scope.required = true;
    $scope.nameMaxLength = 30;

    $scope.read = function() {
        dataService.read().then(function(data) {
            $scope.students = data;
        });
    };

    $scope.read();//luetaan uusin data aina ensin kun tullaan admin-tilaan

    $scope.create = function() {
        dataService.create($scope.formdata).then(function() {
            $scope.read();
        });
    };

    $scope.del = function(student) {
        dataService.del(student.id).then(function() {
            $scope.read();
        });
    };

    /*
     * updateform -napin painaminen laittaa muokattavat tiedot scopeen
     * jolloin ne näkyvät viewissä muokkauslomakkeella.
     * Tässä siis ladataan data muokkauslomakkeelle
     * update-funktio vie datan kantaan ja hakee kannasta päivittyneen
     * datan joka laitetaan scopeen ja scope ladataan uudestaan
     */
    $scope.updateform = function(student) {
        $scope.formdata = {};//määritellään formdata -taulukko ja tyhjennetään jos on jo olemassa

        $scope.formdata.id = student.id;
        $scope.formdata.studentnumber = student.onumero;
        $scope.formdata.surname = student.snimi;
        $scope.formdata.forename = student.enimi;
        $scope.formdata.credits = student.opisteet;

        $scope.createbtn = false;
        $scope.updatebtn = true;
    };

    $scope.update = function() {
        dataService.update($scope.formdata).then(function() {
            $scope.read();
        });
    };
}]);
