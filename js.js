// Define UI Vars
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // Dom load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear Task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);

};

// Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
        return;
    };
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.classList.add('collection-item');
    // Create text node & append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.classList.add('delete-item', 'secondary-content');
    // Add icon html
    link.innerHTML = `<i class='fa fa-remove'></i>`;
    //Append the link to li
    li.appendChild(link);
    // APPend the li to ul
    taskList.appendChild(li);
    // Store in Ls
    storeTaskInLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';
    e.preventDefault()
}// End addTask func

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
} // End storeTaskInLocalStorage func

// Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}// End removeTask func

// Remove task from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let item = taskItem.firstChild.textContent.toLowerCase()

    tasks.forEach((task, index) => {
        if (task === item) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}// End removeTaskFromLocalStorage func

function clearTasks() {
    if (confirm('Are You Sure?')) {
        const li = document.querySelectorAll('li');
        li.forEach((task) => {
            task.remove();
        });
        clearTaskFromLocalStorage()
    }
}// End clearTasks func

// Clear tasks from LS
function clearTaskFromLocalStorage() {
    localStorage.clear()
}// End clearTaskFromLocalStorage func

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    const tasks = document.querySelectorAll('li');
    tasks.forEach((task) => {
        const item = task.firstChild.textContent.toLowerCase();
        if (item.indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
}// End filterTasks func

// Get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task) => {
        const li = document.createElement('li');
        // Add class
        li.classList.add('collection-item');
        // Create text node & append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.classList.add('delete-item', 'secondary-content');
        // Add icon html
        link.innerHTML = `<i class='fa fa-remove'></i>`;
        //Append the link to li
        li.appendChild(link);
        // APPend the li to ul
        taskList.appendChild(li);
    })

}// End getTasks func