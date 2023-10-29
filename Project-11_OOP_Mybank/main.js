#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from 'nanospinner';
import { Bank, Customers } from "./classes.js";
import { faker } from "@faker-js/faker";
console.clear();
let sleep = () => new Promise((r) => setTimeout(r, 1000));
console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<=======================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=========>>>  ${chalk.redBright.bold('CLI BASED MY BANK')}  <<<=========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<=======================================>>>\n`));
let myBank = new Bank;
for (var i = 1; i <= 10; i++) {
    let fname = faker.person.firstName("male");
    let lname = faker.person.lastName();
    let mobNumber = faker.phone.number("3##-###-####");
    let gen = faker.person.sexType();
    //let bal = Math.floor(Math.random() * 1000)
    const newCustomer = new Customers(fname, lname, 25 + 5, gen, 1000 + i, mobNumber);
    const newAccount = { Account_No: newCustomer.Account_No, Balance: 500 * i };
    myBank.addCustomer(newCustomer);
    myBank.addAccount(newAccount);
}
let spinner = createSpinner('Initializing Customers').start();
await sleep();
spinner.success({ text: chalk.greenBright("Customers initilized Successfully") });
while (true) {
    let ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Enter Your choice:",
        choices: ["View All Customers", "View Individual Customer", "Deposit", "Withdrawl", "Exit"],
    });
    if (ans.select == "Exit") {
        break;
    }
    if (ans.select == "View All Customers") {
        myBank.displayAllData();
    }
    if (ans.select == "View Individual Customer") {
        let find = await inquirer.prompt({
            type: "number",
            name: "select",
            message: "Enter Customer Account Number to View:",
        });
        myBank.displayIndividualCustomer(find.select);
    }
    if (ans.select == "Deposit") {
        let ans = await inquirer.prompt({
            type: "number",
            name: "acc_No",
            message: "Enter Customer Account Number for Deposit:",
        });
        const account = myBank.account.find((type) => type.Account_No === ans.acc_No);
        if (!account) {
            console.log(chalk.red.bold.italic("****** CUSTOMER NOT FOUND ******"));
        }
        else {
            let deposit = await inquirer.prompt({
                type: "number",
                name: "amount",
                message: "Enter Amount to Deposit:",
            });
            if (myBank.account.find((type) => type.Account_No === ans.acc_No)) {
                let newBal = account.Balance + deposit.amount;
                const withdrawlObj = { Account_No: ans.acc_No, Balance: newBal };
                myBank.transaction(withdrawlObj);
                let spinner = createSpinner('Processing Deposit Request').start();
                await sleep();
                spinner.success({ text: chalk.greenBright("Transaction Successful") });
            }
        }
    }
    if (ans.select == "Withdrawl") {
        let ans = await inquirer.prompt({
            type: "number",
            name: "acc_No",
            message: "Enter Customer Account Number for Withdrawl:",
        });
        const account = myBank.account.find((type) => type.Account_No === ans.acc_No);
        if (!account) {
            console.log(chalk.red.bold.italic("****** CUSTOMER NOT FOUND ******"));
        }
        else {
            let draw = await inquirer.prompt({
                type: "number",
                name: "amount",
                message: "Enter Amount to Withdraw:",
            });
            if (myBank.account.find((type) => type.Account_No === ans.acc_No && type.Balance >= draw.amount)) {
                let newBal = account.Balance - draw.amount;
                const withdrawlObj = { Account_No: ans.acc_No, Balance: newBal };
                myBank.transaction(withdrawlObj);
                let spinner = createSpinner('Processing Withdrawl Request').start();
                await sleep();
                spinner.success({ text: chalk.greenBright("Transaction Successful") });
            }
            else {
                console.log(chalk.red.bold.italic("****** INSUFFICIENT BALANCE ******"));
            }
        }
    }
}
