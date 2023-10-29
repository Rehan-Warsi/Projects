#! /usr/bin/env node
"use strict";
console.clear();
import { divide, multi, subs, sum } from "./functions.js";
import inquirer from "inquirer";
let continueLoop = true;
while (continueLoop) {
    const answers = await inquirer.prompt([
        {
            name: "num1",
            message: "Enter first number",
            type: "number",
        },
        {
            name: "num2",
            message: "Enter second number",
            type: "number",
        },
        {
            name: "Operator",
            type: "list",
            message: "Enter your choice: ",
            choices: ["+", "-", "*", "/"]
        },
    ]);
    if (answers.Operator == "+") {
        const result = sum(answers.num1, answers.num2);
        console.log("Your answer is ", result);
    }
    else if (answers.Operator == "-") {
        const result = subs(answers.num1, answers.num2);
        console.log("Your answer is ", result);
    }
    else if (answers.Operator == "*") {
        const result = multi(answers.num1, answers.num2);
        console.log("Your answer is ", result);
    }
    else if (answers.Operator == "/") {
        const result = divide(answers.num1, answers.num2);
        console.log("Your answer is ", result);
    }
    else {
        console.log("Enter Valid Choice");
    }
    const again = await inquirer.prompt({
        type: "list",
        name: "againLoop",
        choices: ["Yes", "No"],
        message: "Do you want to continue "
    });
    if (again.againLoop == "No") {
        break;
    }
    console.clear();
}
console.log("Program terminated");
