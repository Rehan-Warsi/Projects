#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

let sleep = () => new Promise((r) => setTimeout(r, 1000))

console.clear()

console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<===========================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=========>>>  ${chalk.redBright.bold('WORD COUNTER PROJECT')}  <<<==========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<===========================================>>>\n`));

while (true)  {
    const result = await inquirer.prompt([
        {
            type: "rawlist",
            name: "menu_type",
            message: "Choose Menu : ",
            choices: [
                "Play Word Counter",
                "Exit"
            ],
        }
    ])

    if(result.menu_type == "Exit") {
        break
    }
    if(result.menu_type == "Play Word Counter") {
        const counter = await inquirer.prompt(
            {
                type: "input",
                name: "counterName",
                message: "Enter Text to Count : ",
            
            },
        )
        // To Start and Stop Spinner
        
        const spinner = createSpinner('Analyzing').start()
        await sleep()
        spinner.stop()
        console.clear()

        let sentence : string = counter.counterName
        let text : string[] = sentence.split(" ")
       
        let whiteSpaces : number = text.length -1 // To Count the White Spaces
       
        let words : number = text.length // To Count the Words
       
        let stringWithoutSpaces = text.join(""); 
       
        let characters = stringWithoutSpaces.length; // To Count All Characters Without White Spaces

        let countResult = [
            { 
                Text: sentence, 
                Words: words, 
                Characters: characters,
                white_Spaces: whiteSpaces
             }
        ]

        console.table(countResult)
             
    }
}

