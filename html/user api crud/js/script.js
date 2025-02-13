let currentPage = 1;
const rowsPerPage = 10;
let tableData = [];

// Fetch Data from API and Store in tableData
fetch('http://localhost:8080/Api/html/user api crud/api/api.php')
    .then(response => response.json())
    .then(data => {
        tableData = data;
        displayTable(currentPage);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to display table data with pagination
function displayTable(page) {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Clear previous data

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = tableData.slice(start, end);

    if (paginatedItems.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: red;">No Data Found</td></tr>`;
        return;
    }

    paginatedItems.forEach(item => {
        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.phone_number}</td>
                <td class="buttons">
                    <button class="btn edit-btn" onclick="editRecord(${item.id}, '${item.name}', '${item.phone_number}')">
                        ✏️
                    </button>
                    <button class="btn delete-btn" onclick="deleteRecord(${item.id})">
                        ❌
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    updatePaginationButtons();
}

// Update Pagination Buttons
function updatePaginationButtons() {
    document.getElementById('pageNumber').innerText = `Page ${currentPage} of ${Math.ceil(tableData.length / rowsPerPage)}`;
}

// Next Page
function nextPage() {
    if (currentPage < Math.ceil(tableData.length / rowsPerPage)) {
        currentPage++;
        displayTable(currentPage);
    }
}

// Previous Page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTable(currentPage);
    }
}
        // Search Functionality
document.getElementById('searchBar').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const tableRows = document.querySelectorAll('#dataTable tbody tr');
    let hasMatch = false;

    tableRows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(searchValue)) {
            row.style.display = '';  // Show the row if it matches
            hasMatch = true;
        } else {
            row.style.display = 'none';  // Hide the row if it doesn't match
        }
    });

    // Display "No Data Found" if there are no matches
    const noDataRow = document.getElementById('noDataRow');
    if (!hasMatch) {
        if (!noDataRow) {
            const tbody = document.querySelector('#dataTable tbody');
            const newRow = document.createElement('tr');
            newRow.id = 'noDataRow';
            newRow.innerHTML = `
                <td colspan="5" style="text-align: center; color: red;">No Data Found</td>
            `;
            tbody.appendChild(newRow);
        }
    } else {
        if (noDataRow) {
            noDataRow.remove();  // Remove "No Data Found" if a match is found
        }
    }
});


        // Open Add Modal
        document.getElementById('addBtn').addEventListener('click', () => {
            document.getElementById('addModal').style.display = "block";
        });

        // Close Add Modal
        function closeAddModal() {
            document.getElementById('addModal').style.display = "none";
        }

        // Save New Record
        function saveAdd() {
            const name = document.getElementById('addName').value;
            const phone = document.getElementById('addPhone').value;
             // Validation: Check if fields are empty
            if (name === '' || phone === '') {
            alert('Name and Phone fields cannot be empty!');
            return;
             }
            const newData = { name, phone };

            fetch('http://localhost:8080/Api/html/user%20api%20crud/api/api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                closeAddModal();
                location.reload(); // Reload to update the table
            })
            .catch(error => console.error('Error adding record:', error));
        }

        // Edit Record
        function editRecord(id, name, phone) {
            document.getElementById('editId').value = id;
            document.getElementById('editName').value = name;
            document.getElementById('editPhone').value = phone;
            document.getElementById('editModal').style.display = "block";
        }

        // Save Edited Record
        function saveEdit() {
            const id = document.getElementById('editId').value;
            const name = document.getElementById('editName').value;
            const phone = document.getElementById('editPhone').value;
            // Validation: Check if fields are empty
            if (name === '' || phone === '') {
             alert('Name and Phone fields cannot be empty!');
             return;
            }
            const updatedData = { id, name, phone};

            fetch('http://localhost:8080/Api/html/user%20api%20crud/api/api.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                closeModal();
                location.reload(); // Reload to update the table
            })
            .catch(error => console.error('Error updating record:', error));
        }

        // Close Edit Modal
        function closeModal() {
            document.getElementById('editModal').style.display = "none";
        }

        // Delete Record
        function deleteRecord(id) {
            const confirmDelete = confirm("Are you sure you want to delete this record?");
            if (confirmDelete) {
                fetch('http://localhost:8080/Api/html/user%20api%20crud/api/api.php', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id })
                })
                .then(response => response.json())
                .then(result => {
                    alert(result.message);
                    location.reload(); // Reload to update the table
                })
                .catch(error => console.error('Error deleting record:', error));
            }
        }

        // For resizable columns
const resizeHandles = document.querySelectorAll('.resize-handle');
        let isResizing = false;
        let currentTh = null;
        let startX = 0;
        let startWidth = 0;

        resizeHandles.forEach(handle => {
            handle.addEventListener('mousedown', (e) => {
                isResizing = true;
                currentTh = e.target.parentElement;
                startX = e.clientX;
                startWidth = currentTh.offsetWidth;
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', stopResizing);
            });
        });

        function handleMouseMove(e) {
            if (isResizing && currentTh) {
                const newWidth = startWidth + (e.clientX - startX);
                currentTh.style.width = `${newWidth}px`;
            }
        }

        function stopResizing() {
            isResizing = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', stopResizing);
        }
