document.addEventListener('DOMContentLoaded', function() {
    
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

     // Load tasks from Local Storage
     function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }


    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;


        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); 

        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        };

   
        listItem.appendChild(removeButton);

        taskList.appendChild(listItem);

        taskInput.value = '';

        // Save to Local Storage if needed
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

     // Function to save a task to Local Storage
     function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

   
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
     // Load tasks when the DOM is fully loaded
     loadTasks();
});
