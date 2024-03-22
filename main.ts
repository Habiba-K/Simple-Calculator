#! /usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 3000);
    })
}

async function welcome() {
    let neonTitle = chalkAnimation.neon(`\nLet's Start Calculation\n`); // Animation starts
    await sleep();
   
    neonTitle.stop();
   
}
async function lines() {
    let rainbowTitle = chalkAnimation.rainbow(`--------------------------`)
    await sleep();
    rainbowTitle.stop();
}
await welcome();
await lines();

async function askQuestion() {
    let ans = await inquirer
        .prompt([
            {
                type: "list",
                name: "operator",
                message: chalk.cyanBright("which operation you want to perform? \n"),
                choices: ["Addition", "Subtraction", "Multiplication", "Division"]
            },
         ]);

        let num1: number;
        let num2: number;

    // Validation loop for the first number
    do {
        let { firstNumber } = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstNumber',
                message: 'Enter first number:',
                validate: (value: string) => {
                    if (!isNaN(Number(value))) {
                        return true;
                    }
                    return chalk.red('Please enter a valid number.');
                },
            },
        ]);

        num1 = parseFloat(firstNumber);

        if (isNaN(num1)) {
            console.log(chalk.red('Error! Please enter a number.'));
        }
    } while (isNaN(num1));

    // Validation loop for the second number
    do {
        let { secondNumber } = await inquirer.prompt([
            {
                type: 'input',
                name: 'secondNumber',
                message: 'Enter second number:',
                validate: (value: string) => {
                    if (!isNaN(Number(value))) {
                        return true;
                    }
                    return chalk.red('Please enter a valid number.');
                },
            },
        ]);

        num2 = parseFloat(secondNumber);

        if (isNaN(num2)) {
          console.log(chalk.red('Error! Please enter a number.'));
        }
    } while (isNaN(num2));
   

if (ans.operator == "Addition") {
    console.log(chalk.green(`\t${num1} + ${num2} = ${num1 + num2}`));
}
else if (ans.operator == "Subtraction") {
    console.log(chalk.green(`\t${num1} - ${num2} = ${num1 - num2}`));
}
else if (ans.operator == "Multiplication") {
    console.log(chalk.green(`\t${num1} * ${num2} = ${num1 * num2}`));
}
else if (ans.operator == "Division") {
    if(num2 === 0){
        console.log(chalk.red('Divide by zero is not possible.'));
    }
    else{
    console.log(chalk.green(`\t${num1} / ${num2} = ${num1 / num2}`));
}
}

};


do {
    await askQuestion();
    var again = await inquirer
        .prompt(
            {
                type: "input",
                name: "restart",
                message: "Do you want to continue? Press y or n: "
            }
        )
        console.log("\n");
} while (again.restart == 'y' || again.restart == 'Y' || again.restart == 'yes' || again.restart == 'YES');
