// Function to load tasks from localStorage
function loadTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear current list
  
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks from localStorage, or use an empty array if none
  
    tasks.forEach(task => {
      const taskItem = createTaskElement(task.text, task.completed);
      taskList.appendChild(taskItem);
    });
  }
  
  // Function to create a task element
  function createTaskElement(text, completed = false) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');
    if (completed) taskItem.classList.add('completed'); // Mark as completed if needed
  
    const taskSpan = document.createElement('span');
    taskSpan.classList.add('task-text');
    taskSpan.innerText = text;
  
    // Toggle completion on click
    taskSpan.addEventListener('click', () => {
      taskItem.classList.toggle('completed');
      saveTasks(); // Save updated tasks to localStorage
    });
  
    // Edit task on double-click
    taskSpan.addEventListener('dblclick', () => {
      const newText = prompt('Edit task:', taskSpan.innerText);
      if (newText !== null && newText.trim() !== '') {
        taskSpan.innerText = newText.trim();
        saveTasks(); // Save updated tasks to localStorage
      }
    });
  
    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      taskItem.remove();
      saveTasks(); // Save updated tasks to localStorage
    });
  
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteButton);
  
    return taskItem;
  }
  
  // Function to save tasks to localStorage
  function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    
    Array.from(taskList.children).forEach(taskItem => {
      const taskText = taskItem.querySelector('.task-text').innerText;
      const completed = taskItem.classList.contains('completed');
      tasks.push({ text: taskText, completed });
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to localStorage
  }
  
  // Function to add a new task
  function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
  
    if (taskText === '') return;
  
    const taskList = document.getElementById('task-list');
  
    // Create new task element
    const taskItem = createTaskElement(taskText);
  
    taskList.appendChild(taskItem);
    taskInput.value = ''; // Clear input field
  
    saveTasks(); // Save updated tasks to localStorage
  }
  
  // Add task on button click
  document.getElementById('add-task-button').addEventListener('click', addTask);
  
  // Add task on Enter key press
  document.getElementById('task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });
  
  // Load tasks from localStorage when the page is loaded
  window.addEventListener('DOMContentLoaded', loadTasks);
  