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

import java.util.Scanner;

public class TwentyOne {

    private static Scanner reader = new Scanner(System.in);

    public static boolean twentyOneGame() throws Exception {

        int firstCard = drawNumber(1, 13);
        System.out.println("You got the card number " + firstCard);

        int secondCard = drawNumber(1, 13);
        System.out.println("You got the card number " + secondCard);

        int sum = firstCard + secondCard;

        while (sum < 21) {
            System.out.println("Sum is " + sum);
            System.out.println("Do you want to take more cards (y/n):");

            String answer = reader.next();
            if (answer.charAt(0) == 'n') {
                break;
            }
            int newCard = drawNumber(1, 13);
            System.out.println("You got the card number " + newCard);
            sum += newCard;
        }
        System.out.println("The sum of your cards is " + sum);


        if (sum == 21) {
            return true;
        }
        if (sum > 21) {
            return false;
        }


        int dealer = 0;
        while (sum > dealer) {
            int newCard = drawNumber(1, 13);
            System.out.println("Dealer got the card number " + newCard);
            dealer += newCard;
        }
        System.out.println("Dealer got " + dealer + " points.");
        if (dealer > 21) {
            return true;
        }

        return false;
    }

    public static int drawNumber(int smallest, int biggest) {

        double drawedNumber = smallest + (biggest - smallest) * Math.random();
        return (int) Math.round(drawedNumber);
    }

    public static void logo() {
        System.out.println("*************************");
        System.out.println("****T*W*E*N*T*Y*O*N*E****");
        System.out.println("*************************");
    }

    public static void main(String[] args) throws Exception {

        System.out.println("How many games do you want to play:");
        int gamesNumber = reader.nextInt();

        int points = 0;
        int games = 0;
        while (games < gamesNumber) {
            logo();
            games++;
            boolean result = twentyOneGame();
            if (result == true) {
                System.out.println("You won!");
                points++;
            } else {
                System.out.println("You lost!");
            }
        }
        System.out.println("\nYou won " + points + "/" + games + " games.");
    }
}