export class Person {
    name: string
    age: number

    constructor(name:string,age:number){
        this.name = name,
        this.age = age
    }
}

export class Student extends Person {
    studentID : number 
    fees : number
    feesPaid : number
    courseEnroll : Course[] = []
    static student:Student[] = []
    constructor(name:string,age:number,studentID:number,fees:number,feesPaid : number){
        super(name,age)
        this.studentID = studentID
        this.fees = fees
        this.feesPaid = feesPaid
    }
    static addStudent(student:Student){
        this.student.push(student)
    }
}

export class Course {
    courseName : string
    courseTiming: string
    courseFees: number 
    studentName: string[] = []
    teacherName: string[]
    static course:Course[] = []
    constructor(name:string,timing:string,fees: number,studentName : string[], teacherName:string[]){
        this.courseName = name
        this.courseTiming = timing
        this.courseFees = fees
        this.studentName = studentName
        this.teacherName= teacherName

    }
    
    static addCourse(course:Course){
        this.course.push(course)
    }
}


export class Teacher extends Person {
    courseEnroll : Course[] = []

    static teacher:Teacher[] = []
    constructor(name:string,age:number){
        super(name,age)
        
        
    }
    
    static addTeacher(teacher:Teacher){
        this.teacher.push(teacher)
    }
}

export class FeesStatus {
    
    studentName:string
    stutentId : number
    isFeesPaid : boolean
    courseName: string
    static fessStatus : FeesStatus[] = []

        constructor(name:string,id:number,feesPaid:boolean,courseName:string) {
            this.studentName = name
            this.stutentId = id
            this.courseName = courseName
            this.isFeesPaid = feesPaid
        }
    
    static updateFeesStatus(feesStatus:FeesStatus){
        this.fessStatus.push(feesStatus)
    }


}
