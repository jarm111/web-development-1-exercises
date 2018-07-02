/*
 * The game is called Twentyone.
 *
 * 1. Player takes two cards
 * 2. Dealer asks if player takes more cards.
 * 3. If player says yes, dealer gives one card, if player says no, dealer
 * shows the cards of player.
 * 4. if player has under 21 points, dealer tries to take so many cards that
 * sum of the cards is bigger than players points but not more than 21
 *
 * - If player has 21 points, player wins - if player has over 21 points
 * he loses - if dealer has over 21 points, player wins - if player
 * points > dealer points, player wins. if dealer points > player points,
 * dealer wins.
 */

/*
 * Try this little text based Java game in NetBeans. Then Rewrite the game in Javascript.
 * The JS game must work in browser. You can reuse this Java code, because Java and JS
 * resemble each other quite much. Comment all things that are different
 * in Javascript compared to Java. Tip: You can use prompt() to text input
 * in Javascript.
 *
 */

/* exported start */

// Main game logic
var twentyOneGame = function() {
    var firstCard = drawNumber(1, 13);

    document.writeln('You got the card number ' + firstCard);

    var secondCard = drawNumber(1, 13);

    document.writeln('You got the card number' + secondCard);

    var sum = firstCard + secondCard;

    while (sum < 21) {
        document.writeln('Sum is ' + sum);
        var answer = confirm('Do you want to take more cards (y/n):');
        if (!answer) {
            break;
        }

        var newCard = drawNumber(1, 13);
        document.writeln('You got the card number ' + newCard);
        sum += newCard;
    }

    document.writeln('The sum of your cards is ' + sum);

    if (sum === 21) {
        return true;
    }

    if (sum > 21) {
        return false;
    }

    var dealer = 0;

    while (sum > dealer) {
        newCard = drawNumber(1, 13);
        document.writeln('Dealer got the card number ' + newCard);
        dealer += newCard;
    }

    document.writeln('Dealer got ' + dealer + ' points.');
    if (dealer > 21) {
        return true;
    }

    return false;
};

// Returns random number between 1-13.
var drawNumber = function(smallest, biggest) {
    var drawedNumber = smallest + (biggest - smallest) * Math.random();
    return Math.round(drawedNumber);
};

// Outputs the logo.
var logo = function() {
    document.writeln('');
    document.writeln('*************************');
    document.writeln('****T*W*E*N*T*Y*O*N*E****');
    document.writeln('*************************');
};

// Clears the browser window, if user presses confirms. Document write doesn't work after that.
var clearBrowser = function() {
    var answer = confirm('Do you want to clear the window?');
    if (answer) {
        document.body.innerHTML = '';
    }
};

// The initializing loop.
var start = function() {
    var gamesNumber = prompt('How many games do you want to play:');
    var points = 0;
    var games = 0;
    while (games < gamesNumber) {
        logo();
        games++;
        var result = twentyOneGame();
        if (result === true) {
            document.writeln('You won!');
            points++;
        } else {
            document.writeln('You lost!');
        }
        clearBrowser();
    }
    document.writeln('\nYou won ' + points + '/' + games + ' games.');
};
