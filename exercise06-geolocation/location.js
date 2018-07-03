'use strict';
/**
 * Harjoitus6.
 * Tee HTML5 Geolocation API:n ja Google Mapsin avulla pieni kartta jonka keskipisteessä on merkki joka osoittaa oman sijaintisi. 
 */

/*global google*/
/* exported initAll */

var latLong = {
    lat: 60.0,
    lng: 20.0
};

/**
 * Locates the user and outputs location information
 * @param {Function} callback that handles what happens with successful retrieval of location
 */
function geoFindMe(callback) {
    var output = document.getElementById('out');

    if (!navigator.geolocation) {
        output.innerHTML = '<p>Geolocation is not supported by your browser</p>';
        return;
    }

    function success(position) {
        latLong.lat = position.coords.latitude;
        latLong.lng = position.coords.longitude;

        output.innerHTML = '<p>Latitude is ' + latLong.lat + '° <br>Longitude is ' + latLong.lng + '°</p>';
        
        if (typeof callback === 'function') {
            callback(latLong);
        } else {
            console.log('callback not a function');
        }
    }

    function error() {
        output.innerHTML = 'Unable to retrieve your location';
    }

    output.innerHTML = '<p>Locating…</p>';

    navigator.geolocation.getCurrentPosition(success, error);
}

/**
 * Draws a gogle map inside browser window
 * @param {Object} Object with latitude and longitude properties
 */
function initMap(position) {
    var location = position;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: location
    });

    var infowindow = new google.maps.InfoWindow({
        content: 'My Location'
    });

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        label: ':)'
    });

    infowindow.open(map, marker);
}

/**
 * Call geoFindMe-function and pass in a callback function which
 * geoFindMe-function runs when it has located the user.
 */
function initAll() {
    geoFindMe(initMap);
}
