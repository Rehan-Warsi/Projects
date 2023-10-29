import chalkAnimation from "chalk-animation"
import chalk from "chalk";

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

/*************************************************** ADD NEW TODO *****************************************************/ 

const addTask = (Todo :string[],task:string) => {
  
    Todo.push(task)
    console.log(chalk.bgGreen(`${task} succesfully added`))

}

/************************************************ UPDATE COMPLETED TODOS ************************************************/ 

const updateTask = (completedTodo :string[],newTodo:string[],task:string) => {
  let indexNo = newTodo.indexOf(task)
  completedTodo.push(task) 
  newTodo.splice(indexNo,1)
}

/****************************************************** PRINT TODOS *****************************************************/ 

const printList = (todo : string[], todoType :string) => {
  
  if(todo.length !== 0  ){
    for (var i=0,j = 1; i<todo.length;i++,j++) {
      if(todoType == "New") {
        console.log(chalk.bgRedBright(` ${j}.) ${todo[i]}`))
      } else 
        console.log(chalk.bgGreenBright(` ${j}.) ${todo[i]}`))
    }
  }else if (todoType == "New"){
    console.log(chalk.bgRedBright(`\nYour ${todoType} Task List is Empty\n`))
  } else 
    console.log(chalk.bgGreenBright(`\nYour ${todoType} Task List is Empty\n`))

}

export {welcome, addTask,updateTask,printList}