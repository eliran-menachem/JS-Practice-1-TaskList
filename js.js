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
    // Clear input
    taskInput.value = '';


    e.preventDefault()
}// End addTask func

// Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}// End removeTask func
function clearTasks() {
    if (confirm('Are You Sure?')) {
        const li = document.querySelectorAll('li');
        li.forEach((task) => {
            task.remove();
        });
    }
}// End clearTasks func

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
