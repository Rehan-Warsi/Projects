#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { Player,Opponent } from './classes.js'

console.clear()

console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<===========================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=======>>>  ${chalk.redBright.bold('CLI BASED ADVENTURE GAME')}  <<<========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<===========================================>>>\n`));

const result = await inquirer.prompt([
    {
        type: "input",
        name: "playerName",
        message: "Enter Player Name : ",
        
    },
    {
        type: "list",
        name: "opponentName",
        message: "Enter Opponent Name",
        choices: ["Zombie","Assasin"]
    }   
        
]);

console.log(chalk.bold.blueBright(`\n${result.playerName} VS ${result.opponentName}\n`))

let newPlayer = new Player(result.playerName)
let newOpponent = new Opponent(result.opponentName)

while(true){

    const option = await inquirer.prompt([
    
        {
            type: "list",
            name: "optionChoice",
            message: "How You Wants to Play",
            choices: ["Strike","Drink Energy Portion"]
        }   
        
    ]);

    if(option.optionChoice == "Strike"){
        let num = Math.floor(Math.random()*2)    

        if(num == 0){
            newOpponent.healthDecrease()
            console.log(chalk.bold.greenBright(`\n${newPlayer.name} health is ${newPlayer.health}`))
            console.log(chalk.bold.redBright(`${newOpponent.name} health is ${newOpponent.health}\n`))
    
        }else{
            newPlayer.healthDecrease()
            console.log(chalk.bold.greenBright(`\n${newPlayer.name} health is ${newPlayer.health}`))
            console.log(chalk.bold.redBright(`${newOpponent.name} health is ${newOpponent.health}\n`))
        }

    }

    if(option.optionChoice == "Drink Energy Portion"){

        newPlayer.health += 25
        console.log(chalk.bold.greenBright(`\nYou have taken the Energy Portion your health is ${newPlayer.health} again.\n`))
    }

    if(newPlayer.health == 0){
        console.log(chalk.bold.redBright(`\n ${newPlayer.name} loose. Better Luck Next Time`))
        break
    }

    if(newOpponent.health == 0){
        console.log(chalk.bold.redBright(`\n${newOpponent.name} loose. Hurray.... You Won`))
        break
    }
}