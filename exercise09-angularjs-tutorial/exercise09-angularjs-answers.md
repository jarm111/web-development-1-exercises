# Exercise 9 - AngularJS Questions and Answers

## 1. Introduction: 

### Mitkä ovat tutoriaalin pienten sovellusten model, view ja controller?

Model on $scope-olion muuttujiin tallennetut arvot, eli "sometext".
View on käyttäjälle näkyvä renderöity DOM-puu.
Controlleria ei ole määritetty, ng-controller puuttuu sovelluksesta.

### Tarvitseeko Angularjs -sovelluksessa aina olla Controlleria?

Esimerkissä ei ole määritetty controlleria eli ei tarvitse.

### Mitä tarkoittaa Two-way data binding?

Model ja Viewit ovat automaattisesti synkronisoitu.

## 2. Controllers: 

### Mitkä ovat tutoriaalin pienten sovellusten model, view ja controller?

Model = $scopessa oleva contacts taulukko ja newcontact-olio

View = on käyttäjän selaimessa renderöity sivu jonka kanssa hän vuorovaikuttaa.

Controller = HTML:ssä ng-controller="ContactController" kertoo, että tämä kontrolleri on vastuussa tämän elementin ja sen lapsielementtien ohjauksesta.
Koodissa määritetään konstruktori-funktio 'ContactController', josta luodaan kontrollerin instanssi.

### Mikä on scope-olion merkitys?

Scope-olio on konteksti, johon model säilötään, jotta kontrollereilla, direktiiveilla ja expressioneilla on pääsy modeliin.

### Mikä on Angularjs -sovelluksen Moduuli ja miksi pitää tehdä Moduuleja?

Moduulit toimivat loogisina kokonaisuuksina, jotka oikein toteutettuna jakavat sovelluksen järkeviin, uudelleenkäytettäviin ja testattaviin palasiin. Se on säiliö sovelluksen muille osasille, kuten controllereille, serviceille, filtereille ja direktiiveille. Moduulit pitävät koodin rakenteen järkevämpänä.

## 3. Routing: 

### Mikä on Angularjs:n reitityksen periaate?

Reitityksen avulla sovelluksen voi jakaa useampaan eri näkymään. Angularin $routeProvider service hoitaa reitityksen. Sen avulla voi kytkeä yhteen controllerit, view templatet (osittaiset html-sivut) ja selaimen URL-osoitteen. 

### Mitä Angularjs:n komponentteja tarvitaan reitityksen toteuttamiseen?

Pitää ottaa käyttöön erillinen angular-route.js moduuli. Se tarjoaa $route servicen jota käytetään $routeProviderin avulla. config() metodilla määritetään sovelluksen reititys.

## 4. Services: 

### Mikä on Service ja sen rooli Angularjs-sovelluksessa.

Servicet ovat olioita, jotka pitävät sisällään sovelluksen yleistä business logiikkaa / hyödyllisiä funktioita. Niitä voivat käyttää toiset Servicet, Controllerit tai muut konstruktiot. Ne auttavat koodin organisoinnissa ja niiden avulla voi luoda uudelleenkäytettävää koodia.

### Millaisia valmiita Servicejä Angularjs tarjoaa ja kuinka ne otetaan käyttöön?

Esim: 
$filter - käyttäjälle näkyvän datan filtteröintiin
$http - mahdollistaa kommunikaation http-serverin kanssa
$location - tarjoaa pääsyn selaimen URL-osoitteen

AngularJS:n service otetaan käyttöön lisäämällä se riippuvuudeksi komponentille. 
myModule.controller('MyController', ['$scope', '$filter', function($scope, $filter)

### Mitä tarkoittaa Dependency Injection ja miten se toimii esimerkissä?

Dependency Injection on suunnittelumalli (Design Pattern) joka pyrkii poistamaan kovakoodatut riippuvuudet ohjelmakoodista ja mahdollistaa näin riippuvuuksien muuttamisen suorituksen tai kääntämisen aikaisesti. Se vähentää koodin tiukkaa sidonnaisuutta keskenään luo koodista modulaarisempaa, mitä on helpompi muokata ja testata. DI:n ansiosta on helpompi korvata yksi moduuli toisella vastaavalla ilman että moduulia käyttävää koodia välttämättä tarvitsee lainkaan muokata.

### Miksi Services -sivun kohdan 6. muokattava kontaktilista on arkkitehtuuriltaan parempi kuin aiemmin tehty samalla tavalla toimiva sovellus Controllers -sivulla?

Services-osion koodi on rakenteeltaan parempi, koska siinä koodi on jaettu sen hoitamien tehtävien mukaan eri palikoihin. Contact-service sisältää sovelluksen businesslogiikkaa, jota voitaisiin periaatteessa hyödyntää uudelleen muualla. Kontrollerille on taas jäänyt sille kuuluva tehtävä, eli se sitoo modelin dataa viewiin hyödyntäen $scope-oliota ja käyttää Contact-serviceä toiminnallisuuksien toteuttamiseen.

## 5. Asiakassovelluksen kommunikointi palvelimen kanssa

### Kuinka voit hakea palvelinpuolelta dataa Angularjs:iin ja kuinka lähetät dataa palvelimelle Angularjs -sovelluksesta? 

$http servicen avulla voi kommunikoida HTTP-palvelimen kanssa.

$http.get() metodilla voi hakea dataa
$http.get('/someUrl', config).then(successCallback, errorCallback);

$http.post() metodilla voi lähettää dataa
$http.post('/someUrl', data, config).then(successCallback, errorCallback);

### Mitä Angularjs:n Serviceä voit käyttää tähän? Etsi jokin tutoriaali (ja mainitse linkki) missä tämä on esitetty ja kerro pääpiirteittäin miten homma hoituu.

https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular

Jossain tutoriaalissa oli suositeltu hommassa käytettäväksi erillistä Restangular-moduulia, jolla voi kommunikoida palvelimen REST API:n kanssa, mutta valitsin yksinkertaisemman tutoriaalin, jossa on hyödynnetty em. $http-serviceä.

- annetaan kontrollerille käyttöön $http-service
    mainController($scope, $http)
- $http.get() metodilla määritetään, mitä tehdään get-pyynnöllä osoitteesta saatavalla datalla success polussa ja mitä tehdään kun se epäonnistuu (failure) 
- jonkin toiminnon yhteydessä voidaan lähetää dataa $http.post()-metodilla, jolle annetaan osoite ja lähtettävä data ja määritetään success ja failure tapahtumat.
- jonkin toiminnon yhteydessä poistaa dataa palvelimelta kutsumalla $http.delete()-metodia.