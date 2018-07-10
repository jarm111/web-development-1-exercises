'use strict';

/**
 * Toteuta JQuery-kirjaston avulla Ajax-esimerkissä1 esitetty sovellus 
 * jolla tarkistetaan palvelinpuolelta tietokannasta onko lomakkeelle 
 * syötetty tunnus jo käytössä. Käytä esim. JQueryn $.ajax()-metodia. 
 * Laita kyseinen metodi seuraavanlaiseen callback-funktioon: 
 * $('#username').blur(function(){ koodi tänne }); 
 * Näin ajax-tapahtuma suoritetaan kun käyttäjä siirtää kursorin pois tekstikentästä 
 * jonka id on username. Katso mallia vaikkapa tästä. 
 * Huomaa että esimerkin PHP-koodiin ei tarvitse koskea lainkaan 
 * (paitsi kantatunnarit pitää vaihtaa samoiksi kuin omassa kannassa jos sitä ei ole aiemmin jo tehty).
 */

$(document).ready(function () {
    $('#username').blur(function () {
        $.get('dbquery.php?q=' + $('#username').val(), function(results) {
            // console.log(results);
            $('#dbdata').html(results);
        });
    });

    function enableButton() {
        if ($('#username').val() === ''
            || $('#password').val() === ''
            || $('#dbdata').html() !== 'Käytettävissä') {
            $('#submit').prop('disabled', true );
        } else {
            $('#submit').prop('disabled', false );
        }
    }
    /**
     * Run enableButton repeatedly
     */
    setInterval(enableButton, 100);
});
