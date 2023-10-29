import inquirer from "inquirer";
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { Teacher } from "./classes.js";
import { Student } from "./classes.js";
import { Course } from "./classes.js";
let teacher = Teacher.teacher;
let student = Student.student;
let course = Course.course;
let sleep = () => new Promise((r) => setTimeout(r, 1000));
export async function teacherOptions() {
    const result = await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'teacherMenu',
            message: 'Teacher Menu : ',
            choices: [
                'Add New Teacher',
                'View Teacher',
                'Assign Course',
                'Back'
            ],
        }
    ]);
    if (result.teacherMenu == "Add New Teacher") {
        await teacherAdd();
    }
    if (result.teacherMenu == "View Teacher") {
        await ViewTeacher(teacher);
    }
    if (result.teacherMenu == "Assign Course") {
        await assignTeacher(teacher, student, course);
    }
}
async function teacherAdd() {
    const result = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Teacher Name : "
        },
        {
            type: "number",
            name: "age",
            message: "Enter Teacher Age : "
        }
    ]);
    let newTeachers = new Teacher(result.name, result.age);
    const spinner = createSpinner('Adding Teacher').start();
    await sleep();
    Teacher.addTeacher(newTeachers);
    spinner.success({ text: chalk.greenBright("Teacher Added Successfully") });
}
// View Teacher Function
async function ViewTeacher(teacher) {
    if (!teacher.length) {
        console.log(chalk.redBright('############ No Teacher Available ############'));
        return;
    }
    console.table(teacher.map((val) => {
        return {
            Name: val.name,
            Age: val.age,
            Assigned_Course: val.courseEnroll.length ? val.courseEnroll : "No Course Assigned"
        };
    }));
}
async function assignTeacher(teachers, students, courses) {
    if (!teacher.length) {
        console.log(chalk.redBright('############ No Teacher Available ############'));
        return;
    }
    ViewTeacher(teacher);
    const input = await inquirer.prompt([
        {
            name: 'index',
            message: 'Enter Index to Register In Course OR Any key to Exit : ',
            type: 'number'
        }
    ]);
    const index = input['index'];
    if (index <= teacher.length - 1 && index >= 0) {
        if (!courses.length) {
            console.log(chalk.redBright('############ No Course Available ############'));
            return;
        }
        const courseChoices = courses.map(val => {
            return { name: `${val.courseName}` };
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
        let teacher_Name = teachers[index].name;
        let teacher = teachers.at(index);
        if (teacher?.courseEnroll.includes(selectedCourseName)) {
            console.log(chalk.redBright("############ TEACHER ALREADY ASSIGNED IN THIS COURSE ############"));
            return;
        }
        if (selectedCourse) {
            teachers[index].courseEnroll.push(courseInput.course);
            selectedCourse.teacherName.push(teacher_Name);
            console.log(chalk.yellowBright(`Course ${selectedCourseName} assign for teacher ${teachers[index].name}.`));
        }
        else {
            console.log('Course not found or not selected. Assignment failed.');
        }
    }
    else {
        console.log(chalk.redBright('############ Teacher Not Found ############'));
    }
}
