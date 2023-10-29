import inquirer from "inquirer";
const Conversion = {
    "USD": {
        "USD": 1.00,
        "PKR": 225.50,
        "GBP": 0.83,
        "EUR": 0.91,
        "JPY": 110.12,
        "AUD": 1.33,
        "CAD": 1.28,
        "INR": 73.15,
        "CNY": 6.89,
        "SGD": 1.34,
        "AED": 3.67
    },
    "GBP": {
        "USD": 1.21,
        "PKR": 271.79,
        "EUR": 1.10,
        "JPY": 150.23,
        "AUD": 1.79,
        "CAD": 1.71,
        "INR": 94.63,
        "CNY": 8.84,
        "SGD": 1.75,
        "AED": 4.44
    },
};
//console.log(Conversion)
const currencyOptions = Object.keys(Conversion);
function updateRates() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'baseCurrency',
            message: 'Select a base currency to update:',
            choices: Object.keys(Conversion)
        },
        {
            type: 'list',
            name: 'targetCurrency',
            message: 'Select a target currency to update:',
            choices: Object.keys(Conversion.USD)
        },
        {
            type: 'input',
            name: 'newRate',
            message: 'Enter the new exchange rate:',
            validate: function (value) {
                // You can add validation logic here to ensure the input is a valid number.
                return !isNaN(value) || 'Please enter a valid number';
            },
        },
    ])
        .then((answers) => {
        const { baseCurrency, targetCurrency, newRate } = answers;
        Conversion[baseCurrency][targetCurrency] = parseFloat(newRate);
        console.log(`Updated rate from ${baseCurrency} to  ${targetCurrency}`);
        //console.log('New Updated Rates:');
        // console.log(Conversion);
        updateRates(); // Continue updating rates if desired.
    });
}
console.log('Currency Conversion Rates:');
console.log(Conversion);
updateRates(); // Start the rate update process.
