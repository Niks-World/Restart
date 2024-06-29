document.addEventListener('DOMContentLoaded', () => {
    const archives = JSON.parse(localStorage.getItem('archive')) || [];
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    const archiveList = document.getElementById('archive-list');
    const filterPrioritySelect = document.getElementById('filter-priority');
    const filterStatusSelect = document.getElementById('filter-status');

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

    renderArchives(archives);
});
