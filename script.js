// Sélection des éléments du DOM
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// Charger les tâches enregistrées dans le navigateur au démarrage
document.addEventListener('DOMContentLoaded', loadTasks);

// Fonction pour ajouter une tâche
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    createTaskElement(text, false);
    saveTasksToLocalStorage();
    
    taskInput.value = ""; // Vider le champ de saisie
    updateTaskCount();
}

// Permettre d'ajouter en appuyant sur la touche "Entrée"
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Créer visuellement l'élément HTML d'une tâche
function createTaskElement(text, isCompleted) {
    const li = document.createElement('li');
    li.className = `task-item ${isCompleted ? 'completed' : ''}`;

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;
    
    // Cliquer sur le texte pour barrer/débarrer la tâche
    span.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasksToLocalStorage();
        updateTaskCount();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    
    // Cliquer sur la corbeille pour supprimer la tâche
    deleteBtn.addEventListener('click', function() {
        li.remove();
        saveTasksToLocalStorage();
        updateTaskCount();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    
    updateTaskCount();
}

// Mettre à jour le compteur de tâches restantes
function updateTaskCount() {
    const totalTasks = document.querySelectorAll('.task-item').length;
    const completedTasks = document.querySelectorAll('.task-item.completed').length;
    const remaining = totalTasks - completedTasks;
    
    taskCount.textContent = `${remaining} tâche(s) restante(s) sur ${totalTasks}`;
}

// Sauvegarder dans le stockage local du navigateur (LocalStorage)
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Charger les tâches depuis le LocalStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}