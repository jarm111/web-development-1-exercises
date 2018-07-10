/*ajax.js
 Sisältää neljä JavaScript-funktiota. Yhdellä
 luodaan XMLhttpRequest-olio ja kahdella muulla toteutetaan 
 asynkroninen tiedon haku tietokannasta.
 Neljäs funktio ei liity Ajaxiin mutta laajentaa 
 asiakassovelluksen (tämän skriptin) toimintaa.
 */

//Luodaan XMLhttpRequest -olio
//Tämä toimii myös erittäin vanhalla IE-selaimella (IE5) koska
//voidaan tarvittaessa luoda myös "Microsoft.XMLHTTP"
        function createXMLHttpR() {
            var ro;
            if (window.ActiveXObject) {
                ro = new ActiveXObject("Microsoft.XMLHTTP");
            } else if (window.XMLHttpRequest) {
                ro = new XMLHttpRequest();
            }
            return ro;
        }
//Luotu olio sijoitetaan muuttujaan http
var http = createXMLHttpR();

/*
 startRequest() -funktiolla  aloitetaan ajax-tiedonsiirto eli
 tehdään pyyntö palvelimella sijaitsevalle ohjelmalle
 */
function startRequest(input) {
    //asetetaan tapahtumankäsittelijä jolla seurataan tapahtuman tilaa
    http.onreadystatechange = handleHttpResponse;
    //Määritetään url johon otetaan yhteys. Lomakkeelta saadan kentän arvo (input)
    var url = 'dbquery.php?q=' + input;
    //Yhteys dbquery.php -skriptiin alustetaan open-metodilla
    http.open("GET", url, true);
    //send-metodi tekee pyynnön. 
    http.send(null);
}

/*
 handleHttpResponse() -funktiolla käsitellään pyynnön tulos
 eli otetaan palvelimella sijaitsevalta ohjelmalta saatu data talteen.
 mikäli kaikki data on saatu sieltä onnistuneesti*/
function handleHttpResponse() {
    //Suoritetaan jos datan pyynnön tila valmis (readyState == 4)
    if (http.readyState === 4) {
        //Suoritetaan jos HTTP-pyyntö on onnistunut (status==200)
        if (http.status === 200) {
            //haetaan oliossa oleva tekstitieto responseText -metodilla
            results = http.responseText;
            //sijoitetaan se HTML-tiedostoon sen elementin sisään jonka id="dbdata"
            document.getElementById('dbdata').innerHTML = results;
        }
        else {
            window.alert("Error:" + http.status);
        }
    }
}

/*
 enableButton() -funktio ei liity Ajaxiin, mutta siirtää toimintaa asiakaspuolelle
 ja tekee sovelluksesta käytettävämmän ja interaktiivisemman.
 Nappi jolla kantaan lisätään tunnus ja salasana on toimii vain 
 kun tunnus ja salasana on syötetty ja tunnus on käytettävissä.
 */
function enableButton() {

    if (document.getElementById('username').value === '' || document.getElementById('password').value === ''
            || document.getElementById('dbdata').innerHTML !== 'Käytettävissä') {
        document.getElementById('submit').disabled = true;
    }
    else
    {
        document.getElementById('submit').disabled = false;
    }
}
//ajetaan enableButton jatkuvasti
if (document.all || document.getElementById)
    setInterval("enableButton()", 100);
