// script.js
document.addEventListener('DOMContentLoaded', () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const archives = JSON.parse(localStorage.getItem('archive')) || [];
    
    const todoTitleInput = document.getElementById('todo-title');
    const todoPrioritySelect = document.getElementById('todo-priority');
    const addTodoButton = document.getElementById('add-todo-button');
    const todoList = document.getElementById('todo-list');
    const archiveList = document.getElementById('archive-list');
    const filterPrioritySelect = document.getElementById('filter-priority');
    const filterStatusSelect = document.getElementById('filter-status');

    addTodoButton.addEventListener('click', () => {
        const title = todoTitleInput.value.trim();
        const priority = todoPrioritySelect.value;
        if (!title) {
            alert('Todo cannot be empty!');
            return;
        }
        const newTodo = { title, priority, status: 'Pending🔃' };
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos(todos);
        todoTitleInput.value = '';
    });

    const renderTodos = (todos) => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${todo.title}</td>
                <td class="${todo.priority}">${todo.priority}</td>
                <td><button onclick="toggleStatus(${index})">${todo.status}</button></td>
                <td><button onclick="archiveTask(${index})">Archive</button></td>
            `;
            todoList.appendChild(tr);
        });
    };

    window.toggleStatus = (index) => {
        todos[index].status = todos[index].status === 'Pending🔃' ? 'Completed✅' : 'Pending🔃';
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos(todos);
    };

    window.archiveTask = (index) => {
        const archivedTodo = todos.splice(index, 1)[0];
        archives.push(archivedTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('archive', JSON.stringify(archives));
        renderTodos(todos);
    };

    const renderArchives = (archives) => {
        archiveList.innerHTML = '';
        archives.forEach((archive, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${archive.title}</td>
                <td class="${archive.priority}">${archive.priority}</td>
                <td>${archive.status}</td>
                <td><button onclick="restoreTask(${index})">Restore</button></td>
                <td><button onclick="deleteTask(${index})">Delete</button></td>
            `;
            archiveList.appendChild(tr);
        });
    };

    window.restoreTask = (index) => {
        const restoredTodo = archives.splice(index, 1)[0];
        todos.push(restoredTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('archive', JSON.stringify(archives));
        renderArchives(archives);
    };

    window.deleteTask = (index) => {
        archives.splice(index, 1);
        localStorage.setItem('archive', JSON.stringify(archives));
        renderArchives(archives);
    };

    if (window.location.pathname.includes('index.html')) {
        renderTodos(todos);
    } else if (window.location.pathname.includes('archive.html')) {
        renderArchives(archives);

        filterPrioritySelect.addEventListener('change', filterArchives);
        filterStatusSelect.addEventListener('change', filterArchives);

        function filterArchives() {
            let filteredArchives = archives;

            if (filterPrioritySelect.value !== 'all') {
                filteredArchives = filteredArchives.filter(archive => archive.priority === filterPrioritySelect.value);
            }

            if (filterStatusSelect.value !== 'all') {
                filteredArchives = filteredArchives.filter(archive => archive.status === filterStatusSelect.value);
            }

            renderArchives(filteredArchives);
        }
    }
});

//done js
