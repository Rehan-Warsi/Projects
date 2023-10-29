import inquirer from "inquirer";
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { Course } from "./classes.js";
import { Student } from "./classes.js";
import { Teacher } from "./classes.js";
let course = Course.course;
let student = Student.student;
let teacher = Teacher.teacher;
let sleep = () => new Promise((r) => setTimeout(r, 1000));
export async function courseOptions() {
    const result = await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'courseMenu',
            message: 'Course Menu : ',
            choices: [
                'Add New Course',
                'View Course',
                'Back'
            ],
        }
    ]);
    if (result.courseMenu == "Add New Course") {
        await courseAdd();
    }
    if (result.courseMenu == "View Course") {
        await ViewCourse(course);
    }
}
async function courseAdd() {
    const result = await inquirer.prompt([
        {
            type: "input",
            name: "courseName",
            message: "Enter Course Name : "
        },
        {
            type: "input",
            name: "courseTiming",
            message: "Enter Course Timing: "
        },
        {
            type: "number",
            name: "courseFees",
            message: "Enter Course Fees: "
        }
    ]);
    let studentName = [];
    let teacherName = [];
    let newCourse = new Course(result.courseName, result.courseTiming, result.courseFees, studentName, teacherName);
    const spinner = createSpinner('Adding Course').start();
    await sleep();
    Course.addCourse(newCourse);
    spinner.success({ text: chalk.greenBright("Course Added Successfully") });
}
// View Course Function
async function ViewCourse(course) {
    if (!course.length) {
        console.log(chalk.redBright('############ No Course Available ############'));
        return;
    }
    console.table(course.map((val) => {
        return {
            Name: val.courseName,
            Timing: val.courseTiming,
            Fees: val.courseFees,
            Students_Name: val.studentName.length ? val.studentName : "No Student Enrolled",
            Teachers_Name: val.teacherName.length ? val.teacherName : "No Teacher Assigned",
        };
    }));
}
