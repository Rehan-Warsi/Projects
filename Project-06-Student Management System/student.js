import inquirer from "inquirer";
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { Student } from "./classes.js";
import { Course } from "./classes.js";
import { feesPayment } from "./fees.js";
import { FeesStatus } from "./classes.js";
let course = Course.course;
let students = Student.student;
let sleep = () => new Promise((r) => setTimeout(r, 1000));
export async function studentOptions() {
    const result = await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'studentMenu',
            message: 'Student Menu : ',
            choices: [
                'Add New Student',
                'View Student',
                'Enroll in Course',
                'Pay Fees',
                'Back'
            ],
        }
    ]);
    if (result.studentMenu == "Add New Student") {
        await studentAdd();
    }
    if (result.studentMenu == "View Student") {
        await ViewStudents(students);
    }
    if (result.studentMenu == "Enroll in Course") {
        await enrollCourse(students, course);
    }
    if (result.studentMenu == "Pay Fees") {
        await feesPayment();
    }
}
async function studentAdd() {
    const result = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Student Name : "
        },
        {
            type: "number",
            name: "age",
            message: "Enter Student Age : "
        }
    ]);
    let studentId = Math.floor(Math.random() * 325850);
    let fees = 0;
    let feesDue = 0;
    let newStudents = new Student(result.name, result.age, studentId, fees, feesDue);
    const spinner = createSpinner('Adding Student').start();
    await sleep();
    Student.addStudent(newStudents);
    spinner.success({ text: chalk.greenBright("Student Added Successfully") });
}
// View Students Function
export async function ViewStudents(students) {
    if (!students.length) {
        console.log(chalk.redBright('############ No Student Available ############'));
        return;
    }
    console.table(students.map((val) => {
        return {
            student_ID: val.studentID,
            Name: val.name,
            Age: val.age,
            Course_Name: val.courseEnroll.length ? val.courseEnroll : "No Course Selected",
            Course_Fees: val.fees,
            Fees_Paid: val.feesPaid
        };
    }));
}
async function enrollCourse(students, courses) {
    if (!students.length) {
        console.log(chalk.redBright('############ No Student Available ############'));
        return;
    }
    ViewStudents(students);
    const input = await inquirer.prompt([
        {
            name: 'index',
            message: 'Enter Index to Register In Course OR Any key to Exit : ',
            type: 'number'
        }
    ]);
    const index = input['index'];
    if (index <= students.length - 1 && index >= 0) {
        if (!courses.length) {
            console.log(chalk.redBright('############ No Course Available ############'));
            return;
        }
        const courseChoices = courses.map(val => {
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
        const selectedCourseName = courseInput.course;
        const selectedCourse = courses.find((course) => course.courseName === selectedCourseName);
        let student_Name = students[index].name;
        let student = students[index];
        let studentId = students[index].studentID;
        let isFeesPaid = false;
        let courseIndex = courseChoices.findIndex((item) => item.name === courseInput.course);
        if (student?.courseEnroll.includes(selectedCourseName)) {
            console.log(chalk.redBright("############ STUDENT ALREADY ENROLLED IN THIS COURSE ############"));
            return;
        }
        let currentFees = students[index].fees + courseChoices[courseIndex].fees;
        if (selectedCourse) {
            students[index].courseEnroll.push(courseInput.course);
            students[index].fees = currentFees;
            selectedCourse.studentName.push(student_Name);
            let feesstatus = new FeesStatus(student_Name, studentId, isFeesPaid, selectedCourseName);
            FeesStatus.updateFeesStatus(feesstatus);
            console.log(chalk.yellowBright(`Course ${selectedCourseName} enrolled for student ${students[index].name}.`));
        }
        else {
            console.log('Course not found or not selected. Enrollment failed.');
        }
    }
    else {
        console.log(chalk.redBright('############ Student Not Found ############'));
    }
}
