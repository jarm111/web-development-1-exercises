let MyClass = require('./b_module').MyClass;
let myObj = new MyClass();

let random = myObj.randomNumber(1, 10);
console.log(random);

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let average = myObj.calcAverage(numbers);
console.log(average);