import chalk from "chalk";
export class Customers {
    constructor(fname, lname, age, gender, accountNo, mobNumber) {
        this.First_Name = fname;
        this.Last_Name = lname;
        this.Age = age;
        this.Gender = gender;
        this.Account_No = accountNo;
        this.Mob_Number = mobNumber;
    }
}
export class Bank {
    constructor() {
        this.customer = [];
        this.account = [];
    }
    addCustomer(obj) {
        this.customer.push(obj);
    }
    addAccount(obj) {
        this.account.push(obj);
    }
    displayAllData() {
        const combinedData = this.customer.map((cust, index) => {
            return {
                ...cust,
                ...this.account[index]
            };
        });
        console.table(combinedData);
    }
    displayIndividualCustomer(id) {
        const customer = this.customer.find((type) => type.Account_No === id);
        if (customer) {
            const account = this.account.find((type) => type.Account_No === customer.Account_No);
            if (account) {
                console.table([{ ...customer, ...account }]);
            }
        }
        else {
            console.log(chalk.red.bold.italic("****** CUSTOMER NOT FOUND ******"));
        }
    }
    transaction(obj) {
        let updatedAccount = this.customer.findIndex((type) => type.Account_No == obj.Account_No);
        this.account[updatedAccount] = obj;
    }
}
