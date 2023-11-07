#!/usr/bin/env node
import { welcome, addTask, updateTask, printList } from "./functions.js";
import inquirer from "inquirer";
import chalk from "chalk";
console.clear();
let messsage = `
                                            ****************************************
                                            ******* Welcome to TODOS Project *******
                                            ****************************************
`;
await welcome(messsage);
let newTodo = new Array;
let completedTodo = new Array;
let continueLoop = true;
while (continueLoop) {
    let menu = await inquirer.prompt([
        {
            name: "todo",
            type: "list",
            message: "Select your option :",
            choices: ["New Task", "List Tasks", "Update Tasks", "List Completed Tasks", "Exit"]
        }
    ]);
    if (menu.todo == "Exit") {
        break;
    }
    let again = true;
    if (menu.todo == "New Task") {
        do {
            let answers = await inquirer.prompt([
                {
                    name: "newTasks",
                    type: "input",
                    message: "Enter New Task"
                }
            ]);
            addTask(newTodo, answers.newTasks);
            let answersAgain = await inquirer.prompt([
                {
                    name: "answer",
                    type: "list",
                    message: "Do You Want To Add More Tasks :",
                    choices: ["Yes", "No"]
                }
            ]);
            if (answersAgain.answer == "No") {
                again = false;
            }
        } while (again);
    }
    if (menu.todo == "List Tasks") {
        let todoType = "New";
        printList(newTodo, todoType);
    }
    if (menu.todo == "Update Tasks") {
        if (!newTodo.length) {
            console.log(chalk.bgRedBright(`\nYour Task List is Empty\n`));
            continue;
        }
        let ansUpdatedTask = await inquirer.prompt([
            {
                name: "answer",
                type: "list",
                message: "Select Your Completed Tasks :",
                choices: newTodo
            }
        ]);
        updateTask(completedTodo, newTodo, ansUpdatedTask.answer);
    }
    if (menu.todo == "List Completed Tasks") {
        let todoType = "Completed";
        printList(completedTodo, todoType);
    }
}
