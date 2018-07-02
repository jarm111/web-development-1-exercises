/*Harjoitus 3B
b) Laita kaikki edellisen tehtävän funktiot modulin sisään ja käytä niitä sieltä. Kyseessä on siis Module pattern ja moduulin nimeksi voit antaa esim. dicemodule. Funktion kutsu voi olla  esim. dicemodule.showresults(). Kts. malliksi Module pattern -esimerkki funktioesimerkeistä.
*/


var diceModule = (function() {
    // Returns array size of n, content is numbers between 1-6
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

    // Prints results to browser
    var printResults = function(array) {
        for (var n in array) {
            console.log('Roll #' + (Number(n) + 1) + ' is ' + array[n]);
            document.writeln('Roll #' + (Number(n) + 1) + ' is ' + array[n]);
        }
    };

    // Takes array as input and outputs the maximum value
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

    // Takes array as input and outputs the minimum value
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

    var returnAverage = function(array) {
        var sum = 0;
        for (var n in array) {
            sum += array[n];
        }
        var avg = sum / array.length;
        console.log('Average: ' + avg);
        return avg;
    };

    var showResults = function(numberOfThrows) {
        var result = rollDice(numberOfThrows);
        printResults(result);
        document.writeln('Max: ' + returnMax(result));
        document.writeln('Min: ' + returnMin(result));
        document.writeln('Average: ' + returnAverage(result));
    };
    return {
        showResults: showResults
    };
}());

//diceModule.showResults(5);
