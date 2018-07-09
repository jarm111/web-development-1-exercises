// Build "Rock, Paper, Scissors"
var userChoice = prompt('Do you choose rock, paper or scissors?');

var computerChoice = Math.random();
console.log(computerChoice);

if (computerChoice < 0.33) {
    computerChoice = 'rock';
} else if (computerChoice >= 0.33 && computerChoice < 0.67) {
    computerChoice = 'paper';
} else {
    computerChoice = 'scissors';
}

function compare(choice1, choice2) {
    if (choice1 === choice2) {
        return 'The result is a tie!';
    } else if (choice1 === 'rock') {
        if (choice2 === 'scissors') {
            return 'rock wins';
        } else {
            return 'paper wins';
        }
    } else if (choice1 === 'paper') {
        if (choice2 === 'rock') {
            return 'paper wins';
        } else {
            return 'scissors wins';
        }
    } else if (choice1 === 'scissors') {
        if (choice2 === 'rock') {
            return 'rock wins';
        } else {
            return 'scissors wins';
        }
    }
}
compare(userChoice, computerChoice);