/* sophisicated_code.js */

// This code is a complex implementation of a task management system that allows users to create, manage, and prioritize tasks.

// Task class represents a single task with a title, description, priority, and status
class Task {
  constructor(title, description, priority) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = 'New';
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }
}

// TaskManager class manages the tasks, allowing creation, deletion, sorting, and filtering of tasks
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  createTask(title, description, priority) {
    const newTask = new Task(title, description, priority);
    this.tasks.push(newTask);
  }

  deleteTask(title) {
    const taskIndex = this.tasks.findIndex(task => task.title === title);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }
  }

  sortTasks() {
    this.tasks.sort((a, b) => a.priority - b.priority);
  }

  filterTasksByStatus(status) {
    return this.tasks.filter(task => task.status === status);
  }

  getTasks() {
    return this.tasks;
  }
}

// Usage example of the TaskManager
const taskManager = new TaskManager();
taskManager.createTask('Task 1', 'This is task 1', 3);
taskManager.createTask('Task 2', 'This is task 2', 2);
taskManager.createTask('Task 3', 'This is task 3', 1);

console.log(`Total tasks: ${taskManager.getTasks().length}`);
console.log(taskManager.filterTasksByStatus('New'));

taskManager.sortTasks();

console.log(taskManager.getTasks());

taskManager.deleteTask('Task 2');

console.log(taskManager.getTasks());
