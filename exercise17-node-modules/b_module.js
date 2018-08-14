/*
 * Export prototype
 */
var MyClass = function() {};

MyClass.prototype.randomNumber = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

MyClass.prototype.calcAverage = function(numArr) {
    let sum = 0;
    for (let num of numArr) {
        sum += num;
    }
    return sum / numArr.length;
};

exports.MyClass = MyClass;