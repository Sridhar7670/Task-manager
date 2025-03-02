const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load tasks from local storage and add them to the list
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach((task) => addTask(task.text, task.completed));

// Event listener for adding a new task
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText, false);
    taskInput.value = "";
  }
});

function addTask(text, completed) {
  // Create task item and set text
  const taskItem = document.createElement("li");
  const taskText = document.createElement("span");
  
  
  taskText.textContent = text;
 

  // Mark as completed if applicable

  // Create and add "Complete" button
  const complete=document.createElement('button')
  complete.innerText='task-done'

  // Create and add "Edit" button
  const edit=document.createElement('button');
  edit.innerText='edit-item'

  // Add logic for editing a task

  // Create and add "Delete" button
  const del=document.createElement('button');
  del.innerText='del-item'

  // Append buttons to task item and task item to list

  taskList.appendChild(taskItem);
  taskItem.append(taskText,edit,del,complete);
  edit.addEventListener('click',()=>{taskText.textContent=prompt()})
  complete.addEventListener('click',()=>{taskText.style.textDecoration='line-through'})
  del.addEventListener('click',()=>{taskItem.remove(taskList)})
  // Save updated tasks to local storage
  saveTasks();

  
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map((task) => ({
    text: task.querySelector("span").textContent, // Extract task text
    completed: task.classList.contains("completed") // Check if task is completed
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to local storage
}
