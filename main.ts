#! /usr/bin/env node
import { log } from "console";
import inquirer from "inquirer";

// Defining type
interface Worker {
  workerId: number;
  workerName: string;
  salary: number;
}

// Variable initialization
let collectionOfWorkers: Worker[] = [];

async function startWorkerManagementSystem() {
  console.log(`***************** Welcome to Worker Management System **************************`);
  console.log("\n");

  let selectedOption = await inquirer.prompt([
    {
      name: "userSelectedOption",
      type: "list",
      message: "Please select an option from below list",
      choices: [
        "Add Worker",
        "View Worker",
        "Delete Worker",
        "Update Worker",
        "Exit",
      ],
    },
  ]);

  switch (selectedOption.userSelectedOption) {
    case "Add Worker":
      await addWorker();
      break;
    case "View Worker":
      await viewAllWorkers();
      break;
    case "Delete Worker":
      await deleteWorker();
      break;
    case "Update Worker":
      await updateWorker();
      break;
    case "Exit":
      console.log("Exiting Worker Management System. Goodbye!");
      return; // Exit the function to prevent further recursion
    default:
      break;
  }

  // Recursive call to start the system again, unless the user selects "Exit"
  startWorkerManagementSystem();
}

async function addWorker() {
  console.log("\n");

  let workerDetails = await inquirer.prompt([
    {
      name: "workerName",
      message: "Please enter worker name",
      type: "input",
    },
    {
      name: "workerId",
      message: "Please enter worker ID",
      type: "number",
    },
    {
      name: "salary",
      message: "Please enter worker salary",
      type: "number",
    },
  ]);

  collectionOfWorkers.push({
    workerId: workerDetails.workerId,
    workerName: workerDetails.workerName,
    salary: workerDetails.salary,
  });

  console.log("\n");
  console.log("*********************** Worker Added Successfully *****************");
  console.log(collectionOfWorkers[collectionOfWorkers.length - 1]);
}

async function viewAllWorkers() {
  console.log("******************* View All Of Your Workers ****************");
  console.log("\n");

  for (let i = 0; i < collectionOfWorkers.length; i++) {
    console.log(collectionOfWorkers[i]);
    console.log("\n");
  }
}

async function deleteWorker() {
  console.log("******************* Delete A Worker ****************");

  let workerId = await inquirer.prompt([
    {
      name: "workerId",
      message: "Please enter worker ID to delete",
      type: "number",
    },
  ]);

  collectionOfWorkers = collectionOfWorkers.filter(
    (worker) => worker.workerId !== workerId.workerId
  );

  console.log("\n");
  console.log("*********************** Worker Deleted Successfully ************");
}

async function updateWorker() {
  console.log("******************* Update A Worker ****************");

  let workerId = await inquirer.prompt([
    {
      name: "workerId",
      message: "Please enter worker ID to update",
      type: "number",
    },
  ]);

  let worker = collectionOfWorkers.find(
    (worker) => worker.workerId === workerId.workerId
  );

  if (worker) {
    let updatedDetails = await inquirer.prompt([
      {
        name: "workerName",
        message: `Please enter new name (current: ${worker.workerName})`,
        type: "input",
        default: worker.workerName,
      },
      {
        name: "salary",
        message: `Please enter new salary (current: ${worker.salary})`,
        type: "number",
        default: worker.salary,
      },
    ]);

    worker.workerName = updatedDetails.workerName;
    worker.salary = updatedDetails.salary;

    console.log("\n");
    console.log("*********************** Worker Updated Successfully *******************");
    console.log(worker);
  } else {
    console.log("\nWorker not found.");
  }
}

startWorkerManagementSystem();
