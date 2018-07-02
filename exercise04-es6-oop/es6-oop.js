
/**
 * Harjoitus 4
 * 
 * Tee JS-luokka Henkilo (ES6) jolla on kolme attribuuttia(muuttujaa) etunimi, sukunimi ja henkiloTunnus 
 * sekä metodit(funktiot): konstruktori eli alustajafunktio jossa annetaan muuttujille alkuarvot, get- ja set-metodit kaikille attribuuteille. 
 * Tee myös tulosta()-metodi jossa tulostat attribuuttien arvot. Käytä luokkaa siten että tulostat seuraavan lauseen: "x on Henkilö jonka henkilötunnus on y".
 * 
 * Tee Henkilo -luokalle aliluokka Opiskelija joka perii Henkilon ominaisuudet. 
 * Tee Opiskelija -luokalle muuttuja op ja sille getteri ja setteri. 
 * Hae konstruktorissa yliluokan attribuutit super-viittauksella. 
 * Ylikirjoita tulosta()-metodi niin että myös opintopisteet tulostuvat. 
 * Käytä luokkaa siten että tulostat seuraavan lauseen: "x on opiskelija jonka henkilötunnus on y ja opintopistekertymä z kpl".
 * 
 * Tulosta molemmat luomasi oliot olio-esimerkissä olevan olioiden tulostusmetodin avulla.
 * 
 * Käytä tehtävässä siis ES6:n olio-ohjelmoinnin syntaksia joka on samantapainen kuin Javassa. Koodin voit suorittaa konsolissa ilman selainta.
 */

/**
 * @class Henkilo
 */
class Henkilo {
    constructor(etunimi, sukunimi, henkilotunnus) {
        this.etunimi = etunimi;
        this.sukunimi = sukunimi;
        this.henkilotunnus = henkilotunnus;
    }
    getEtunimi() {
        return this.etunimi;
    }
    getSukunimi() {
        return this.sukunimi;
    }
    gethenkilotunnus() {
        return this.henkilotunnus;
    }
    setEtunimi(etunimi) {
        this.etunimi = etunimi;
    }
    setSukunimi(sukunimi) {
        this.sukunimi = sukunimi;
    }
    sethenkiloTunnu(henkilotunnus) {
        this.henkilotunnus = henkilotunnus;
    }
    tulosta() {
        console.log('Etunimi: ' + this.etunimi + ' Sukunimi: ' + this.sukunimi
    + ' Henkilötunnus: ' + this.henkilotunnus);
    }
}

/**
 * @class Opiskelija
 */
class Opiskelija extends Henkilo {
    constructor(etunimi, sukunimi, henkilotunnus, op) {
        super(etunimi, sukunimi, henkilotunnus);
        this.op = op;
    }
    getOp() {
        return this.op;
    }
    setOp(op) {
        this.op = op;
    }
    tulosta() {
        console.log('Etunimi: ' + this.etunimi + ' Sukunimi: ' + this.sukunimi
    + ' Henkilötunnus: ' + this.henkilotunnus + ' Opintopisteet: ' + this.op);
    }
}

/**
 * Helper function to convert Object details to string array.
 * @param {Object} Obj 
 * @param {string} sSeparator 
 * @param {string} sText 
 */
function objInspect(Obj, sSeparator, sText) {
    var r = [];
    var p, t;

    if (typeof sText === 'undefined') {
        sText = '';
    }
    if (typeof sSeparator === 'undefined') {
        sSeparator = ',';
    }

    if (sText.length > 64) {
        return '[MAX LEN!]';
    }

    for (p in Obj) {
        if (p in Obj) {
            t = typeof Obj[p];

            if (t === 'number') {
                t = 'n';
            } else if (t === 'string') {
                t = 's';
            } else if (t === 'boolean') {
                t = 'b';
            } else if (t === 'function') {
                t = 'fnct';
            } else if (t === 'null') {
                t = 'N';
            } else if (t === 'undefined') {
                t = 'undef';
            }

            r.push(sText + p + '[' + t + ']=' + (t === 'object' ? 'obj:' +
                objInspect(Obj[p], sText + ';') : Obj[p]));
        }
    }
    return r.join(sText + sSeparator);
}
/**
 * Prints Objects details to console.
 * @param {Object} obj 
 */
function printObj(obj) {
    console.log('Contents of object from constructor ' + obj.constructor.name + ':\n' + objInspect(obj, '\n'));
}

let pertti = new Henkilo('Pertti', 'Puurtinen', '051169-003Q');
let pirkko = new Opiskelija('Pirkko', 'Parkkonen', '310150-238C', 59);

console.log(pertti.getEtunimi() + ' on ' + pertti.constructor.name
    + ' jonka henkilötunnus on ' + pertti.gethenkilotunnus());

console.log(pirkko.getEtunimi() + ' on ' + pirkko.constructor.name
    + ' jonka henkilötunnus on ' + pirkko.gethenkilotunnus()
    + ' ja opintopistekertymä ' + pirkko.getOp() + ' kpl');

printObj(pertti);
printObj(pirkko);
