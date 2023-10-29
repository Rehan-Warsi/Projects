#!/usr/bin/env node

import inquirer from "inquirer"
import { welcome,checkBal,receiptOption,balReceipt,withdrawlReceipt, transferReceipt } from "./functions.js";
import chalk from "chalk";

console.clear()

let messsage = `
                                            ****************************************
                                            **** Welcome to ATM-Machine Project ****
                                            ****************************************
`;

await welcome(messsage);

messsage = `
                                            ********Enter Your Credentials ********`;

console.clear()
await welcome(messsage)

//************************************************* USER INFORMATIONS ***************************************************/   
interface  UserInfo  {
    userName: string
    userAccount : string
    userPin : string

}

let userInfo :UserInfo = await inquirer.prompt([

    {
        name : "userName",
        type : "string",
        message : "Enter Your Name : ",
        validate: (answer) => {
            if (answer == "" ) {
                return "Please enter a valid Name : ";
            }
            return true
        },
                 
    },

    {
        name : "userAccount",
        type : "number",
        message : "Enter Your (16) Account Number : ",
        default: "1234-33443434344-1"
    },
    {
        name : "userPin",
        type : "password",
        message : "Enter Your Password / Pin : ",
        validate: (answer) => {
            if (isNaN(answer) || (answer == "")) {
                return "Please enter a valid number";
            }
            return true
        },
        
    }
        
])


 let availableBal = Math.floor(Math.random() * 10000);
 let formatRandomNo = ""

 messsage = `
                                             ********* Hi, ${userInfo.userName} Hope You Are Doing Good ********`;

console.clear()
await welcome(messsage)
console.clear()

let conntinueLopp = true
    
while (conntinueLopp) {

//*********************************************** OPERATION OPTIONS ***************************************************/   

let opertionalOptions : { options: string} = await inquirer.prompt([

        {
            name : "options",
            type : "list",
            message : "Select Your Options : ",
            choices : ["Balance Inquiry", "Deposit","Withdrawls","Transfer","Exit"]
            
        }
    ])    
  
    if (opertionalOptions.options == "Exit") {
        break
    }

//*********************************************** BALANCE ENQUIRY ************************************************************/        

    if (opertionalOptions.options == "Balance Inquiry") {
        formatRandomNo = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(availableBal);
        console.log(chalk.yellowBright(`Your available balance is ${formatRandomNo}`))  

        let Option = await receiptOption()
            if (Option == true) {
                balReceipt(userInfo.userName,userInfo.userAccount,availableBal)        
            } 
    }

//*********************************************** DEPOSITS ************************************************************/        
  
     if (opertionalOptions.options == "Deposit") {
        
        let answersDeposit : {options : number} = await inquirer.prompt([

            {
                name : "options",
                type : "number",
                message : "Enter Your Amount to Depsit : ",
                validate: (answer) => {
                    if (isNaN(answer) || (answer == "")) {
                        return "Please Enter Valid Amount :";
                    }
                    return true
                }                                   
            }   
                
        ])
        availableBal = availableBal + answersDeposit.options
        let Option = await receiptOption()
            if (Option == true) {
                balReceipt(userInfo.userName,userInfo.userAccount,availableBal)        
            } 
    }
              
//***********************************************  WITHDRAWL ***********************************************************/    

    if (opertionalOptions.options == "Withdrawls") {
        let answersWithdrawl : {options : string} = await inquirer.prompt([
            {
                name : "options",
                type : "list",
                message : "Select Your Options : ",
                choices : ["Fast Cash", "Other Amount"]

            }

        ])  
                
        if (answersWithdrawl.options == "Fast Cash"){
            
            let answersFast : {options : number}  = await inquirer.prompt([
            
                {
                    name : "options",
                    type : "list",
                    message : "Select Your Options : ",
                    choices : [5000, 10000,15000,20000]
                    
                }
            ])  
            let availableBal1 = availableBal
            availableBal = checkBal(availableBal,answersFast.options)
                if (availableBal !== availableBal1) {
                    let Option = await receiptOption()
                        if (Option == true) {
                            withdrawlReceipt(userInfo.userName,userInfo.userAccount,answersFast.options,availableBal)        
                        } 
                }
            
        }else if(answersWithdrawl.options == "Other Amount") {    
            let answersOther : {options : number} = await inquirer.prompt([

                {
                    name : "options",
                    type : "input",
                    message : "Enter Your Withdrawl Amount : ",
                    validate: (answer:number) => {
                        if (isNaN(answer) ) {
                            return "Please Enter Valid Amount :";
                        }
                        return true
                    }
                }
                
            ])  
            let availableBal1 = availableBal
            availableBal = checkBal(availableBal,answersOther.options)
                if (availableBal !== availableBal1) {
                    let Option = await receiptOption()
                        if (Option == true) {
                            withdrawlReceipt(userInfo.userName,userInfo.userAccount,answersOther.options,availableBal)        
                        } 
                }
            } 
    }

//************************************************* TRANSFER *********************************************************************/ 

    if(opertionalOptions.options == "Transfer") {
        let answers : {options : string} = await inquirer.prompt([
            {
                name : "options",
                type : "list",
                message : "Select Your Options : ",
                choices : ["Bank Account", "Mobile Wallet"]
            
            },
        ])
        interface AnswerTransfer { acno : number, amt: number}
        if (answers.options == "Bank Account") {
            let answersTransfer : AnswerTransfer = await inquirer.prompt([

                {
                    name : "acno",
                    type : "number",
                    default: "1234-33443434344-1",
                    message : "Enter Bank Account Number "
               },
                
                {
                    name : "amt",
                    type : "number",
                    message : "Enter Your Amount to Transfer: ",
                    validate: (ans) => {
                        if (isNaN(ans) || (ans == "")) {
                            return "Please Enter Valid Amount :";
                        }
                        return true;
                    }    
                }
            ])
            
            let availableBal1 = availableBal
            availableBal = checkBal(availableBal,answersTransfer.amt)
                if (availableBal !== availableBal1) {
                    let Option = await receiptOption()
                        if (Option == true) {
                            transferReceipt(userInfo.userName,answersTransfer.amt,answers.options,answersTransfer.acno,availableBal)             
                        } 
    
                }

        } else if (answers.options == "Mobile Wallet") {
            let answersMobWallet : {wallets : string} = await inquirer.prompt([

                {
                    name : "wallets",
                    type : "list",
                    message : "Select Your Mobile Wallet",
                    choices: ["EASY PAISA", "JAZZ CASH", "UPAISA", "SADA PAY"]
                
                }
            ])
    
            if (answersMobWallet.wallets == "EASY PAISA") {
                let answersTransfer : AnswerTransfer = await inquirer.prompt([

                    {
                        name : "acno",
                        type : "number",
                        default: "03453344551",
                        message : "Enter Mobile Number: "
                    
                    },
                    
                    {
                        name : "amt",
                        type : "number",
                        message : "Enter Your Amount to Transfer: ",
                        validate: (ans) => {
                            if (isNaN(ans) || (ans == "")) {
                                return "Please Enter Valid Amount :";
                            }
                            return true;
                        }    
                    }
                ])
                
                let availableBal1 = availableBal
                availableBal = checkBal(availableBal,answersTransfer.amt)
                    if (availableBal !== availableBal1) {
                        let Option = await receiptOption()
                            if (Option == true) {
                                transferReceipt(userInfo.userName,answersTransfer.amt,answersMobWallet.wallets,answersTransfer.acno,availableBal)             
                            } 
                    }
            }

            if (answersMobWallet.wallets == "JAZZ CASH") {
                let answersTransfer : AnswerTransfer = await inquirer.prompt([

                    {
                        name : "acno",
                        type : "number",
                        default: "0300-3344551",
                        message : "Enter Mobile Number: "
                    
                    },
                    
                    {
                        name : "amt",
                        type : "number",
                        message : "Enter Your Amount to Transfer: ",
                        validate: (ans) => {
                            if (isNaN(ans) || (ans == "")) {
                                return "Please Enter Valid Amount :";
                            }
                            return true;
                        }    
                    }
                    
                ])
                
                let availableBal1 = availableBal
                availableBal = checkBal(availableBal,answersTransfer.amt)
                    if (availableBal !== availableBal1) {
                        let Option = await receiptOption()
                            if (Option == true) {
                                transferReceipt(userInfo.userName,answersTransfer.amt,answersMobWallet.wallets,answersTransfer.acno,availableBal)             
                            } 

                    }
                
            }
            if (answersMobWallet.wallets == "UPAISA") {
                let answersTransfer : AnswerTransfer = await inquirer.prompt([

                    {
                        name : "acno",
                        type : "number",
                        default: "03333344551",
                        message : "Enter Mobile Number: "
                    
                    },
                    
                    {
                        name : "amt",
                        type : "number",
                        message : "Enter Your Amount to Transfer: ",
                        validate: (ans) => {
                            if (isNaN(ans) || (ans == "")) {
                                return "Please Enter Valid Amount :";
                            }
                            return true;
                        }    
                    }
                    
                ])
                               
                let availableBal1 = availableBal
                availableBal = checkBal(availableBal,answersTransfer.amt)
                    if (availableBal !== availableBal1) {
                        let Option = await receiptOption()
                            if (Option == true) {
                                transferReceipt(userInfo.userName,answersTransfer.amt,answersMobWallet.wallets,answersTransfer.acno,availableBal)             
                            } 
                    }
            }
            if (answersMobWallet.wallets == "SADA PAY") {
                let answersTransfer : AnswerTransfer = await inquirer.prompt([

                    {
                        name : "acno",
                        type : "number",
                        default: "03333344551",
                        message : "Enter Mobile Number: "
                    },
                    
                    {
                        name : "amt",
                        type : "number",
                        message : "Enter Your Amount to Transfer: ",
                        validate: (ans) => {
                            if (isNaN(ans) || (ans == "")) {
                                return "Please Enter Valid Amount :";
                            }
                            return true;
                        }    
                    }
                ])
                               
                let availableBal1 = availableBal
                availableBal = checkBal(availableBal,answersTransfer.amt)
                    if (availableBal !== availableBal1) {
                        let Option = await receiptOption()
                            if (Option == true) {
                                transferReceipt(userInfo.userName,answersTransfer.amt,answersMobWallet.wallets,answersTransfer.acno,availableBal)             
                            } 
                    }
            }
        }
    }
}
