// Configuración de límites para colores
const LIMIT_BUSY = 3;
const LIMIT_SATURATED = 5;

// Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === "") {
        alert('Por favor, escribe una tarea.');
        return;
    }

    const taskId = 'task-' + Date.now();
    createTaskElement(taskText, taskId, 'pending-tasks');
    saveTasks();
    
    input.value = "";
    showConfirmation();
    updateColumnColors();
}

function createTaskElement(text, id, columnId) {
    const task = document.createElement('div');
    task.className = 'task-card';
    task.id = id;
    task.draggable = true;
    task.innerHTML = `
        <span class="task-text">${text}</span>
        <button class="delete-btn" onclick="deleteTask('${id}')">×</button>
    `;
    
    task.ondragstart = (event) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData("text", event.currentTarget.id);
    };

    const container = document.getElementById(columnId);
    if (container) {
        container.appendChild(task);
    }
}

// Eliminar una tarea
function deleteTask(taskId) {
    const task = document.getElementById(taskId);
    if (task && confirm('¿Deseas eliminar esta tarea?')) {
        task.remove();
        saveTasks();
        updateColumnColors();
    }
}

// Funciones de Drag & Drop
function allowDrop(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const taskElement = document.getElementById(taskId);
    
    if (!taskElement) return;
    
    // Encontrar el contenedor de tareas más cercano
    let target = event.target;
    let tasksContainer = null;
    
    if (target.classList.contains('kanban-tasks')) {
        tasksContainer = target;
    } else if (target.closest('.kanban-tasks')) {
        tasksContainer = target.closest('.kanban-tasks');
    } else if (target.classList.contains('kanban-column')) {
        tasksContainer = target.querySelector('.kanban-tasks');
    } else if (target.closest('.kanban-column')) {
        tasksContainer = target.closest('.kanban-column').querySelector('.kanban-tasks');
    }

    if (tasksContainer) {
        tasksContainer.appendChild(taskElement);
        saveTasks();
        updateColumnColors();
    }
}

// Manejo de LocalStorage
function saveTasks() {
    const boardState = {
        'pending-tasks': getTaskData('pending-tasks'),
        'in-progress-tasks': getTaskData('in-progress-tasks'),
        'completed-tasks': getTaskData('completed-tasks')
    };
    localStorage.setItem('kanbanBoard', JSON.stringify(boardState));
}

function getTaskData(columnId) {
    const tasks = [];
    const container = document.getElementById(columnId);
    if (container) {
        container.querySelectorAll('.task-card').forEach(task => {
            tasks.push({ id: task.id, text: task.querySelector('.task-text').innerText });
        });
    }
    return tasks;
}

function loadTasks() {
    const saved = localStorage.getItem('kanbanBoard');
    if (!saved) {
        updateColumnColors();
        return;
    }
    
    try {
        const boardState = JSON.parse(saved);
        Object.keys(boardState).forEach(columnId => {
            boardState[columnId].forEach(task => {
                createTaskElement(task.text, task.id, columnId);
            });
        });
    } catch (error) {
        console.error('Error al cargar tareas:', error);
    }
    updateColumnColors();
}

// Lógica de colores dinámicos
function updateColumnColors() {
    const columns = document.querySelectorAll('.kanban-column');
    columns.forEach(col => {
        const count = col.querySelectorAll('.task-card').length;
        col.classList.remove('free', 'busy', 'saturated');
        
        // Actualizar contador de tareas
        const countElement = col.querySelector('.task-count');
        if (countElement) {
            countElement.innerText = count;
        }

        if (count >= LIMIT_SATURATED) {
            col.classList.add('saturated');
        } else if (count >= LIMIT_BUSY) {
            col.classList.add('busy');
        } else {
            col.classList.add('free');
        }
    });
}

function showConfirmation() {
    const msg = document.getElementById('confirmMessage');
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 2000);
}
