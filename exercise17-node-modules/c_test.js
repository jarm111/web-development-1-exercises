const myObj = require('./c_module');

// const minMaxes = [[0, 1], [1, 10], [10, 100], [999, 9999], [-5, 0]];
// for (let minMax of minMaxes) {
//     let result = myObj.randomNumber(...minMax);
//     console.log(result);
// }

[[0, 1], [1, 10], [10, 100], [999, 9999], [-5, 0]]
    .map(a => console.log(myObj.randomNumber(...a)));

const numbers = [1, 20, 9, 11];
const average = myObj.calcAverage(numbers);
console.log(average);