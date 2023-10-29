export class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name,
            this.age = age;
    }
}
export class Student extends Person {
    studentID;
    fees;
    feesPaid;
    courseEnroll = [];
    static student = [];
    constructor(name, age, studentID, fees, feesPaid) {
        super(name, age);
        this.studentID = studentID;
        this.fees = fees;
        this.feesPaid = feesPaid;
    }
    static addStudent(student) {
        this.student.push(student);
    }
}
export class Course {
    courseName;
    courseTiming;
    courseFees;
    studentName = [];
    teacherName;
    static course = [];
    constructor(name, timing, fees, studentName, teacherName) {
        this.courseName = name;
        this.courseTiming = timing;
        this.courseFees = fees;
        this.studentName = studentName;
        this.teacherName = teacherName;
    }
    static addCourse(course) {
        this.course.push(course);
    }
}
export class Teacher extends Person {
    courseEnroll = [];
    static teacher = [];
    constructor(name, age) {
        super(name, age);
    }
    static addTeacher(teacher) {
        this.teacher.push(teacher);
    }
}
export class FeesStatus {
    studentName;
    stutentId;
    isFeesPaid;
    courseName;
    static fessStatus = [];
    constructor(name, id, feesPaid, courseName) {
        this.studentName = name;
        this.stutentId = id;
        this.courseName = courseName;
        this.isFeesPaid = feesPaid;
    }
    static updateFeesStatus(feesStatus) {
        this.fessStatus.push(feesStatus);
    }
}
