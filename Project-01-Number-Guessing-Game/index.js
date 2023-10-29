#! /usr/bin/env node
import inquirer from "inquirer";
//****************  GET PLAYER NAME  *********************
console.clear();
const answer = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
        return 'Player';
    }
});
//*********************  CHOOSE LEVEL  ******************************
let Level = async () => {
    let result = await inquirer.prompt([
        {
            type: "list",
            name: "chooselevel",
            message: "choose a level",
            choices: ['Easy', 'Medium', 'Hard']
        }
    ]);
    if (result.chooselevel == "Easy") {
        console.log(`You have to guess a number between 1 to 25 in five(5) attempts`);
        let randomNumber = Math.floor(Math.random() * 25);
        let attempts = 5;
        guessNumber(randomNumber, attempts);
    }
    if (result.chooselevel == "Medium") {
        console.log(`You have to guess a number between 1 to 50 in seven(7) attempts`);
        let randomNumber = Math.floor(Math.random() * 50);
        let attempts = 7;
        guessNumber(randomNumber, attempts);
    }
    if (result.chooselevel == "Hard") {
        console.log(`You have to guess a number between 1 to 100 in ten(10) attempts`);
        let randomNumber = Math.floor(Math.random() * 100);
        let attempts = 10;
        guessNumber(randomNumber, attempts);
    }
};
Level();
//*****************  FUNCTION GUESS NUMBER  *********************************
let guessNumber = async (randomNumber, attempts) => {
    do {
        const result = await inquirer.prompt([
            {
                name: "userInput",
                type: 'number',
                message: "guess a number: ",
            }
        ]);
        if (randomNumber == result.userInput) {
            console.log("Well done !!, you guessed the right number...!!!");
            continueLoop();
            break;
        }
        else if (attempts == 0) {
            console.log("Game over, you lose! " + "Number is : " + randomNumber);
            continueLoop();
            break;
        }
        else {
            attempts--;
        }
        if (result.userInput > randomNumber) {
            console.log("High... Lower your number");
        }
        if (result.userInput < randomNumber) {
            console.log("Low... Raise your number");
        }
    } while (attempts >= 0);
};
let continueLoop = async () => {
    const again = await inquirer.prompt([
        {
            name: "resume",
            type: "list",
            choices: ["Yes", "No"],
            message: "Do you want play again : ",
        }
    ]);
    if (again.resume == "Yes") {
        console.clear();
        Level();
    }
};
//****************  END OF MODULE ***********************
