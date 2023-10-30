export class Person {
    constructor() {
        this._personality = 'Mystery';
    }
    ;
    askQuestion(answer) {
        if (answer === 1) {
            this._personality = 'Extravert';
        }
        else if (answer === 2) {
            this._personality = 'Introvert';
        }
        else {
            this._personality = 'You are still a Mystery';
        }
    }
    ;
    get getPersonality() {
        return this._personality;
    }
    ;
}
;
export class Student extends Person {
    constructor() {
        super();
        this._name = '';
    }
    ;
    get getName() {
        return this._name;
    }
    ;
    set setName(value) {
        this._name = value;
    }
    ;
}
;
