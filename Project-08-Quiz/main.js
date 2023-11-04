#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from 'nanospinner';
console.clear();
let sleep = () => new Promise((r) => setTimeout(r, 1000));
console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<============================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=======>>>  ${chalk.redBright.bold('CLI BASED INTERAVTIVE QUIZ')}  <<<=======>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<============================================>>>\n`));
const apiLink = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let response = await fetchQuiz.json();
    return response.results;
};
let apiData = await fetchData(apiLink);
const spinner = createSpinner('Initializing Quiz').start();
await sleep();
spinner.success({ text: chalk.greenBright("Quiz initilized Successfully") });
let startQuiz = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        type: "input",
        name: "userName",
        message: "Enter Your Name: "
    });
    for (let i = 0; i < 5; i++) {
        let answers = [...apiData[i].incorrect_answers, apiData[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: apiData[i].question,
            choices: answers.map((val) => val)
        });
        if (ans.quiz == apiData[i].correct_answer) {
            ++score;
            console.log(`\nCorrect answers is ${chalk.bold.italic.underline.yellowBright(apiData[i].correct_answer)}\n`);
        }
        else {
            console.log(`\nCorrect answers is ${chalk.bold.italic.underline.redBright(apiData[i].correct_answer)}\n`);
        }
    }
    console.log(`Dear ${chalk.bold.greenBright(name.userName)} Your Score is ${chalk.bold.red(score)} out of ${chalk.bold.red(5)}`);
};
startQuiz();
