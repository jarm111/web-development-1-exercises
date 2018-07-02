/**
 * Harjoitus 3A
 * a) Tee JS-funktio (ES5) jossa heitetään noppaa n kertaa: function rollDice(n) {}. 
 * Nopassa on kuusi sivua joissa on numerot 1-6. Funktio kerää heittojen tulokset taulukkoon joka palautetaan lopuksi. 
 * Tee funktio joka ottaa taulukon parametrikseen ja tulostaa selaimeen nopanheiton tulokset. 
 * Tee lisäksi kolme funktiota jotka ottavat rollDice(n) -funktion palauttaman taulukon parametrikseen. 
 * Ensimmäinen funktio palauttaa suurimman arvon, toinen funktio palauttaa pienimmän arvon ja kolmas funktio palauttaa kaikkien heittojen keskiarvon. 
 * Kokeile kymmenellä heitolla eli var n=10;.
 * 
 * @author  Jarmo Syvälahti
 */

/**
 * Returns array size of n with numbers between 1..6.
 * @param {number} n
 * 
 * @returns {number[]}
 */
var rollDice = function(n) {
    var min = 1;
    var max = 7;
    var results = [];

    for (var i = 0; i < n; i++) {
        results[i] = (function(minimum, maximum) {
            return Math.floor(Math.random() * (maximum - minimum)) + minimum;
        })(min, max);
    }

    return results;
};

/**
 * Writes Dice-roll results to the document.
 * @param {number[]} array 
 */
var printResults = function(array) {
    for (var n in array) {
        console.log('Roll #' + (Number(n) + 1) + ' is ' + array[n]);
        document.writeln(array[n]);
    }
    document.writeln(returnMax(array));
    document.writeln(returnMin(array));
    document.writeln(returnAverage(array));
};

/**
 * Takes array of numbers and returns the maximum value.
 * @param {number[]} array
 * 
 * @returns {number} maximum value in the array
 */
var returnMax = function(array) {
    var max = array[0];

    for (var n in array) {
        if (array[n] > max) {
            max = array[n];
        }
    }

    console.log('Max: ' + max);
    return max;
};

/**
 * // Takes array of numbers and returns the minimum value
 * @param {number[]} array
 * 
 * @returns {number} minimum value in the array
 */
var returnMin = function(array) {
    var min = array[0];

    for (var n in array) {
        if (array[n] < min) {
            min = array[n];
        }
    }

    console.log('Min: ' + min);
    return min;
};

/**
 * // Takes array of numbers and returns the average
 * @param {number[]} array
 * 
 * @returns {number} average
 */
var returnAverage = function(array) {
    var sum = 0;

    for (var n in array) {
        sum += array[n];
    }

    var avg = sum / array.length;
    console.log('Average: ' + avg);
    return avg;
};

var temp = rollDice(3);
printResults(temp);
