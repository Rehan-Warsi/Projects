import chalk from "chalk";
import { type } from "os";
export class Customers {
    First_Name: string
    Last_Name: string
    Age:number
    Gender:string
    Account_No: number
    Mob_Number : string

    constructor(fname:string,lname:string,age:number,gender:string,accountNo:number,mobNumber:string){
        this.First_Name = fname
        this.Last_Name= lname
        this.Age = age
        this.Gender = gender
        this.Account_No = accountNo
        this.Mob_Number = mobNumber 
    }
}

interface BankAccount{
    Account_No: number
    Balance : number
    
}

export class Bank{
    customer : Customers[] = []
    account : BankAccount[]= []
    addCustomer(obj:Customers){
        this.customer.push(obj)
    }
    addAccount(obj:BankAccount){
        this.account.push(obj)
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

    displayIndividualCustomer(id:number){
        const customer = this.customer.find((type) => type.Account_No === id);
        if (customer) {
            const account = this.account.find((type) => type.Account_No === customer.Account_No);
            if (account) {
                console.table([{ ...customer, ...account }]);
            }
        } else {
            console.log(chalk.red.bold.italic("****** CUSTOMER NOT FOUND ******"));
        }
    }
    
    transaction(obj:BankAccount){
        let updatedAccount = this.customer.findIndex((type) =>type.Account_No == obj.Account_No)

        this.account[updatedAccount]= obj

    }
}
