#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import {differenceInSeconds} from "date-fns"

console.clear()

console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<============================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=======>>>  ${chalk.redBright.bold('CLI BASED COUNTDOWN TIMER')}  <<<========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<============================================>>>\n`));

let name = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: "Please Enter the amount of second",
    validate: (input)=> {
        if(isNaN(input)) {
            return "Please Enter valid Number"
            
        }else{
            if(input > 60){
                return "Seconds must be in 60"
            }else {
                return true
            }
        }
    }
})
function startTime (val:number) {
	const intTime = new Date().setSeconds(new Date().getSeconds()+ val)
	const intervalTime= new Date(intTime)
	setInterval((()=>{
        const currentTime = new Date()
	    const timeDiff= differenceInSeconds(intervalTime,currentTime)
        if(timeDiff <= 0){
		    console.log("Timer has Expired")
		    process.exit()
	    }
        const min = Math.floor((timeDiff%(3600*24))/3600)
        const sec = Math.floor(timeDiff%60)
        console.log(`${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`)
    }),1000)
}

startTime(name.userInput)

