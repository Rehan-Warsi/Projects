import chalk from "chalk"
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

/************************************************* BANNER ANIMATION ***************************************************/ 

const sleep = (ms = 2000): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

const welcome = async (param: string) => {
  const welcomeScreen = chalkAnimation.rainbow(param);

  await sleep();
  welcomeScreen.stop();
};

/************************************************* FUNCTIONS **********************************************************/ 

function checkBal(bal:number,withdrawl:number) {
  
  if (withdrawl > bal) {
    let formatRandomNo = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(bal);
    console.log(chalk.redBright(`Insufficient Balance !! Your available balance is : ${formatRandomNo}`))
    
}else {
    bal= bal- withdrawl
    let formatRandomNo = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(bal);
    console.log(chalk.greenBright(`Transaction Successfull !!. Your remaining balance is : ${formatRandomNo}`)) 
    
  }
  return bal
}

//************************************************ Receipt Option *******************************************************/

const receiptOption = async() => {
  let ansReceipt = await inquirer.prompt([
    {
        name: "options",
        type: "confirm",
        message: "Do You Want To Print The Receipt :",
    }
  ])
  
    if (ansReceipt.options == true) {
        return true
    }else {
      return false
    }
}

//*********************************************** DEPOSIT RECEIPT ******************************************************/

const balReceipt = (userName:string, accNumber: string, balance:number) => 
{
  let formatBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(balance);
 
  const receipt =`
                Receipt
******************************************

  A/C Holder Name    :   ${userName}

  Account Number     :   ${accNumber}

  Available Balance  :   ${formatBalance}

******************************************
`;

  console.log(chalk.greenBright(receipt)) 

}

//*********************************************** WITHDRAWL RECEIPT ******************************************************/

const withdrawlReceipt = (userName:string, accNumber: string, withdrawlAmt: number,balance:number) => 
{
  let formatBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(balance);
  let formatWithdrawl = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(withdrawlAmt);
  const receipt =`
                 Receipt
****************************************

  A/C Holder Name   :  ${userName}

  Account Number    :  ${accNumber}

  Withdrawl Amount  :  ${formatWithdrawl}

  Available Balance :  ${formatBalance}

****************************************
`;

  console.log(chalk.greenBright(receipt)) 

}

//*********************************************** TRANSFER RECEIPT ******************************************************/

const transferReceipt = (userName:string, withdrawlAmt: number,transferMode: string,trnsferAcno:number,balance:number) => 
{
  let formatBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(balance);
  let formatWithdrawl = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(withdrawlAmt);
  const receipt =`
                   Receipt
*******************************************

  A/C Holder Name   :  ${userName}

  Transfer through  :  ${transferMode}

  Transfer to a/c # :  ${trnsferAcno}

  Amount Transfer   :  ${formatWithdrawl}

  Available Balance :  ${formatBalance}

*******************************************
`;

  console.log(chalk.greenBright(receipt)) 

}

      
export {welcome,checkBal,receiptOption,balReceipt,withdrawlReceipt,transferReceipt}
