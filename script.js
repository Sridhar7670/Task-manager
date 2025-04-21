document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const totalTasksSpan = document.getElementById('total-tasks');
    const completedTasksSpan = document.getElementById('completed-tasks');

    // Load tasks from local storage
    loadTasks();

    // Add task when button is clicked
    addTaskButton.addEventListener('click', addTaskFromInput);

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTaskFromInput();
        }
    });

    function addTaskFromInput() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText, false);
            taskInput.value = '';
            taskInput.focus();
        }
    }

    function addTask(text, completed = false) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item' + (completed ? ' completed' : '');
        
        const taskContent = document.createElement('span');
        taskContent.className = 'task-content';
        taskContent.textContent = text;
        
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';
        
        // Complete button
        const completeBtn = document.createElement('button');
        completeBtn.className = 'task-btn complete-btn';
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        completeBtn.title = 'Complete';
        completeBtn.addEventListener('click', function() {
            taskItem.classList.toggle('completed');
            updateTaskStats();
            saveTasks();
        });
        
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'task-btn edit-btn';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.title = 'Edit';
        editBtn.addEventListener('click', function() {
            const newText = prompt('Edit task:', taskContent.textContent);
            if (newText !== null && newText.trim() !== '') {
                taskContent.textContent = newText.trim();
                saveTasks();
            }
        });
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-btn delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.title = 'Delete';
        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this task?')) {
                taskItem.remove();
                updateTaskStats();
                saveTasks();
            }
        });
        
        taskActions.append(completeBtn, editBtn, deleteBtn);
        taskItem.append(taskContent, taskActions);
        taskList.appendChild(taskItem);
        
        updateTaskStats();
        saveTasks();
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        
        if (savedTasks.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <i class="fas fa-tasks"></i>
                <p>No tasks yet. Add one above!</p>
            `;
            taskList.appendChild(emptyState);
        } else {
            savedTasks.forEach(task => {
                addTask(task.text, task.completed);
            });
        }
        
        updateTaskStats();
    }

    function saveTasks() {
        const taskItems = document.querySelectorAll('.task-item');
        const tasks = [];
        
        taskItems.forEach(item => {
            tasks.push({
                text: item.querySelector('.task-content').textContent,
                completed: item.classList.contains('completed')
            });
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskStats() {
        const totalTasks = document.querySelectorAll('.task-item').length;
        const completedTasks = document.querySelectorAll('.task-item.completed').length;
        
        totalTasksSpan.textContent = `${totalTasks} ${totalTasks === 1 ? 'task' : 'tasks'}`;
        completedTasksSpan.textContent = `${completedTasks} completed`;
    }
});
