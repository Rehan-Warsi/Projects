#!/usr/bin/env node

import { Person, Student} from "./classes.js";

import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import chalk from 'chalk';

const sleep = () => new Promise(resolve => setTimeout((resolve), 1500))

const wellcomeScreen=async()=>{
    let title=chalkAnimation.rainbow(`
=======================================================================
>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PROJECT OPP <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
=======================================================================    
    `);
    await sleep();
    title.stop();
};

await wellcomeScreen();



class MainProgram{
     
    async main(){
        const myPerson=new Person();
        const anwser=await inquirer.prompt([
            {
                type:"number",
                name:"ans",
                message:"Type 1 if you like to talk to others and type 2 if you would rather keep to yourself:",
                validate:(value)=>{
                    if(isNaN(value)){
                        return 'please enter Integer Number:'
                    };
                    return true;
                },

            },
        ]);
        myPerson.askQuestion(anwser.ans);
        console.log(`${chalk.bgGreen("Yor Are:")} ${chalk.cyanBright(myPerson.getPersonality)}`);

        const myStudent = new Student();
        const studentName=await inquirer.prompt([
            {
                type:"input",
                name:"stName",
                message:"please enter a Name: ",
                validate:(value)=>{
                    if(isNaN(value)){
                        return true;
                    }else{
                        return "Enter a right Name:";
                    };
                },
            },
        ]);
        myStudent.setName=studentName.stName;
        myStudent.askQuestion(anwser.ans);
        console.log(`Your Name is :${chalk.red(myStudent.getName)} and your personality type is: ${chalk.red(myStudent.getPersonality)}`);

    };
     
};

const program=new MainProgram();
await program.main();