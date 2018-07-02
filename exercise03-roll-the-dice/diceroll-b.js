/**
 * Harjoitus 3B
 * b) Laita kaikki edellisen tehtävän funktiot modulin sisään ja käytä niitä sieltä. 
 * Kyseessä on siis Module pattern ja moduulin nimeksi voit antaa esim. dicemodule. 
 * Funktion kutsu voi olla  esim. dicemodule.showresults(). 
 * Kts. malliksi Module pattern -esimerkki funktioesimerkeistä.
 */

/* exported diceModule */

/**
 * Roll-a-dice module
 * @module diceModule
 */
var diceModule = (function() {
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
        return avg;
    };

    /**
     * Writes Dice-roll results to the document. 
     * @param {number} numberOfThrows 
     */
    var showResults = function(numberOfThrows) {
        var results = rollDice(numberOfThrows);

        for (var n in results) {
            document.writeln('Roll #' + (Number(n) + 1) + ' is ' + results[n]);
        }

        document.writeln('Max: ' + returnMax(results));
        document.writeln('Min: ' + returnMin(results));
        document.writeln('Average: ' + returnAverage(results));
    };

    return {
        showResults: showResults
    };
}());
