#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { parityRates } from "./currencyParity.js";
import { welcome,printList } from "./functions.js";

console.clear()

let messsage = `
                                            *****************************************************
                                            ******* Welcome to Currency Converter Project *******
                                            *****************************************************
`;

await welcome(messsage);

let continueLoop = true

while (continueLoop){
    let menu = await inquirer.prompt([
        {
            name : "converter",
            type : "list",
            message : "Select your option :",
            choices : ["List Parity Rate", "Update/Edit Parity Rate", "Currency Converter","Exit"]
        }
    ])
    
    if (menu.converter == "Exit"){
        break
    }

    if (menu.converter == "List Parity Rate"){
       await printList()
    }

    if (menu.converter == "Update/Edit Parity Rate"){
        
        const   {fromCurrency } : {fromCurrency : string, toCurrency : string} = await inquirer.prompt([
            {
                name : "fromCurrency",
                type : "list",
                message : "Select From Currency :",
                choices : Object.keys(parityRates)
            },
        ])
        
        const { toCurrency } : {toCurrency : string} = await inquirer.prompt([    
            {
                name : "toCurrency",
                type : "list",
                message : "Select To Currency  :",
                choices: Object.keys(parityRates[fromCurrency])
                 
            },
        ])
        const defaultRate = parityRates[fromCurrency][toCurrency]
        const { amount } : {amount : number}= await inquirer.prompt([      
            {
                name : "amount",
                type : "input",
                message : "Enter Updated Rate :",
                default: defaultRate,
                validate:(answer:number) => {
                    if (isNaN(answer) ) {
                        return "Please Enter Valid Amount :";
                    }
                    return true 
                }    
            },
        ])

        parityRates[fromCurrency][toCurrency] = amount
    }

    if (menu.converter == "Currency Converter"){
        const  { fromCurrency } :{fromCurrency: string}= await inquirer.prompt([
            {
                name : "fromCurrency",
                type : "list",
                message : "Select From Currency :",
                choices : Object.keys(parityRates)
            }
        ])
        
        const { toCurrency } :{toCurrency : string} = await inquirer.prompt([    
            {
                name : "toCurrency",
                type : "list",
                message : "Select To Currency  :",
                choices: Object.keys(parityRates[fromCurrency]),
                 
            },
        ])
        const { amount } : {amount : number}= await inquirer.prompt([      
            {
                name : "amount",
                type : "input",
                message : "Enter Amount to be Converted :",
                validate:(answer:number) => {
                    if (isNaN(answer) ) {
                        return "Please Enter Valid Amount :";
                    }
                    return true 
                }    
            },
        ])   
        
        console.log(chalk.green(`${(amount*1).toLocaleString()} ${fromCurrency} = ${(parityRates[fromCurrency][toCurrency]*amount).toLocaleString()} ${toCurrency}`));
        
    }
    
}
