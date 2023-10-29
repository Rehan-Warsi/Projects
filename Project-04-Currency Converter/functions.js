import chalkAnimation from "chalk-animation";
import chalk from "chalk";
import { parityRates } from "./currencyParity.js";
import inquirer from "inquirer";
/************************************************* BANNER ANIMATION ***************************************************/
const sleep = (ms = 2000) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});
const welcome = async (param) => {
    const welcomeScreen = chalkAnimation.rainbow(param);
    await sleep();
    welcomeScreen.stop();
};
/************************************************* PRINT PARITY LIST ***************************************************/
const printList = async () => {
    const rateList = await inquirer.prompt([
        {
            name: "currency",
            type: "list",
            message: "Select Currency :",
            choices: Object.keys(parityRates)
        }
    ]);
    console.log(chalk.bgBlueBright(`\nExchange Parity Rates as on 16 Sept. 2023 `));
    console.log(chalk.bgBlueBright(`******************************************\n`));
    const rates = parityRates[rateList.currency];
    console.log(chalk.bgGreen(`Conversion rates from ${rateList.currency}:\n`));
    for (const keys in rates) {
        console.log(`${keys}: ${rates[keys]}`);
    }
};
export { welcome, printList };
