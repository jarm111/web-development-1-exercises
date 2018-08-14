let myObj = require('./c_module');

let random = myObj.randomNumber(50, 99);
console.log(random);

let numbers = [1, 20, 9, 11];
let average = myObj.calcAverage(numbers);
console.log(average);