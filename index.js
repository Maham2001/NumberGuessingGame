#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => new Promise((res, rej) => setTimeout(res, 2000));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(`Let's start the game!!!`);
    await sleep();
    rainbowTitle.stop();
}
let playerLife = 3;
async function askQuestion() {
    let randomNumber = Math.floor(Math.random() * 10 + 1);
    do {
        playerLife--;
        console.log(`Player life left  ${playerLife}`);
        var que = await inquirer
            .prompt([{
                type: "number",
                name: "user_num",
                message: chalk.rgb(250, 128, 114)("Select the number between 1-10="),
            }]);
        if (que.user_num === randomNumber) {
            console.log(chalk.green(`You guess the right number`));
        }
        else if (que.user_num < randomNumber) {
            console.log(`${que.user_num} is lesser than the guess number`);
        }
        else if (que.user_num > randomNumber) {
            console.log(`${que.user_num} is greater than the guess number`);
        }
    } while (playerLife > 0 && randomNumber !== que.user_num);
    if (playerLife == 0 && randomNumber !== que.user_num) {
        console.log(chalk.redBright("GAME OVER!!!"));
    }
}
async function startAgain() {
    do {
        console.clear();
        await welcome();
        playerLife = 3;
        await askQuestion();
        var restart = await inquirer.prompt([{
                type: "input",
                name: "start_again",
                message: "Do you want to play again? press y or n"
            }]);
    } while (restart.start_again === "Y" || restart.start_again === "y" || restart.start_again === "yes");
}
startAgain();
