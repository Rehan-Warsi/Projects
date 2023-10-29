import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import { Student } from "./classes.js";
import { Course } from "./classes.js";
import {ViewStudents} from "./student.js"
import { FeesStatus } from './classes.js';

let course = Course.course
let students = Student.student
let feesStatus = FeesStatus.fessStatus

let sleep = () => new Promise((r) => setTimeout(r, 1000))

export async function feesPayment() {

    if (!students.length) {
        console.log(chalk.redBright('############ No Student Available ############'))
        return
    }

    ViewStudents(students)
    const input = await inquirer.prompt([
        {
            name: 'index',
            message: 'Enter Index to Fees Payment OR Any key to Exit : ',
            type: 'number'
        }
    ]);

    const index: number = input['index'];
    
    if (index <= students.length - 1 && index >= 0) {
        
        if (!course.length) {
            console.log(chalk.redBright('############ No Course Available ############'));
            return;
        }
        
        const courseChoices = course.map(val => {
            return { name: val.courseName, fees: val.courseFees };

        });

        
        const courseInput = await inquirer.prompt([
            {

                name: 'course',
                message: 'Select Course: ',
                type: 'list',
                choices: courseChoices
            }
        ]);
        let student_Id = students[index].studentID
        let courseIndex = courseChoices.findIndex(item => item.name === courseInput.course);
                
        const feesIndex = feesStatus.findIndex(item => item.stutentId === student_Id && 
            item.courseName === courseChoices[courseIndex].name && item.isFeesPaid === false);
        
        let currentFees = students[index].feesPaid + courseChoices[courseIndex].fees
        
        if( feesStatus.find((feesStatus) => feesStatus.courseName === courseChoices[courseIndex].name &&
            feesStatus.stutentId === student_Id && feesStatus.isFeesPaid === false)) {
                       
            if (courseIndex !== -1) {

                console.log(chalk.greenBright(`********** Fees Rs ${courseChoices[courseIndex].fees} Successfully Paid *********`));
                students[index].feesPaid = currentFees
                feesStatus[feesIndex].isFeesPaid = true
                
            } else {
                console.log(chalk.red("******* Course not found. ******"));
            }
        }else {
            console.log(chalk.redBright('############ Fees Already Paid OR Student is Not Enrolled in This Course  ############'));
        }
    }
}