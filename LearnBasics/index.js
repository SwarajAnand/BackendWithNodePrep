// console.log("Hello world");

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { v4: idGenerator } = require("uuid");

// fs.writeFileSync("hello.txt", "Hello world");

const { readFileSync, existsSync, writeFileSync } = fs;

// fs.readFileSync("hello.txt")

// const todoFile = path.join(__dirname, "hello.txt");
// const todoFile = path.join(__dirname, "todo.json");
const todoFile = path.join(__dirname, "todo1.json");

if (!existsSync(todoFile)) {
  writeFileSync(todoFile, "[]");
}
// else{
//     console.log("File already existed")
// }
// console.log(todoFile);

// fs.readFileSync('hello.txt', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showMenu = () => {
  console.log("\nWhat would you like to do?");
  console.log("1. Add a task");
  console.log("2. Show tasks");
  console.log("3. Delete tasks");
  console.log("4. Update tasks");
  console.log("Type 'Quit' or 'CTRL + C' to close");
};

const getMyTasks = () => {
  const tasks = fs.readFileSync(todoFile, "utf-8");
  // console.log(tasks)
  return JSON.parse(tasks);
};

const saveMyTasks = (tasks) => {
  fs.writeFileSync(todoFile, JSON.stringify(tasks));
  return;
};

const deleteTodo = (id) => {
    // 
    let todoArr = getMyTasks();

    let index = parseInt(id);
    // console.log(isNaN(index));

    if(id > todoArr.length - 1 || isNaN(index)){
        console.log("Try again unvalid input");
        return;
    }


    todoArr = todoArr.filter((_, idx) => idx + 1 != id)
    saveMyTasks(todoArr)

    console.log("Deleted Successfully")
};

const ShowTodo = () => {
    console.log("\nTodos Are ---->")
  const todoArr = getMyTasks();
  for (let i = 0; i < todoArr.length; i++) {
    console.log(`${i+1} ` + " " + todoArr[i]);
  }
}

const addTask = (task) => {
  // console.log(task)
  const todoArr = getMyTasks();
//   let obj = {
//     id: idGenerator(),
//     task,
//   };

  todoArr.push(task);
  saveMyTasks(todoArr);
};


const updateTodo = (updatedTask, id) => {
    console.log(updatedTask, id);
    let todoArr = getMyTasks();

    todoArr = todoArr.map((ele, idx) => {
        if(idx + 1 == id){
            return updatedTask
        }else{
            return ele
        }
    }) 

    saveMyTasks(todoArr);

    console.log("Updated Successfully");
    ShowTodo();

    todoManager();
}

const todoManager = () => {
  showMenu();
  rl.question("Please select a optioon\n", (ans) => {
    switch (ans) {
      case "1":
        rl.question("Enter your task: ", (task) => {
          console.log(`Adding task: ${task}`);
          addTask(task);
          todoManager();
        });
        break;

      case "2": {
        ShowTodo();
        todoManager();
      }
      break;

      case "3":
        ShowTodo();
        rl.question("Which task You want to Delete: \n", (id) => {
        deleteTodo(id)
          todoManager();
        });
        break;

        case "4": {
            ShowTodo();
            rl.question("Which task You want to Update: \n", (id) => {
                rl.question("Enter the update Task\n", (updatedTask) => {
                    updateTodo(updatedTask, id)
                })
                });

                
          }
          break;

      case "Quit": {
        rl.close();
        return;
      }
      default:
        console.log("Invalid option");
        todoManager();
    }
  });
};

todoManager();
