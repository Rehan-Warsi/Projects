#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { Student } from './classes.js'
import { studentOptions} from './student.js'
import { teacherOptions } from './teacher.js';
import { courseOptions } from './course.js'

console.clear()

console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<===========================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=======>>>  ${chalk.redBright.bold('STUDENT MANAGEMENT SYSTEM')}  <<<=======>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<===========================================>>>\n`));


while (true)  {
    const result = await inquirer.prompt([
        {
            type: "rawlist",
            name: "menu_type",
            message: "Choose Menu : ",
            choices: [
                "Student",
                "Course",
                "Teacher",
                "Exit"
            ],
        }
    ]);

    if(result.menu_type == "Exit") {
        break
    }
    if(result.menu_type == "Student") {
        await studentOptions()
    }
    if(result.menu_type == "Course") {
       await courseOptions()
    }
    if(result.menu_type == "Teacher") {
        await teacherOptions()
    }
}
