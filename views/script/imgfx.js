
function showRows(database) {
    var rows = document.querySelectorAll("#database tr");
    var count = 1; 

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];

        if (row.id === "header") {
            row.style.display = "table-row";
            continue; 
        }

        row.style.display = "none"; 

        if (row.getAttribute("database") === database || database === "All") {
            row.style.display = "table-row";

            if (row.getAttribute("database") === database) {
                row.cells[0].textContent = count;
                count++;
            } else if (database === "All") {
                row.cells[0].textContent = count;
                count++;
            }
        }
    }
}

const tableRows = document.querySelectorAll('tbody tr');

tableRows.forEach((row, index) => {
    const noColumn = row.querySelector('td:first-child');
    noColumn.textContent = index + 1;
});

document.addEventListener("DOMContentLoaded", function() {
    // Add a click event listener to all delete buttons
    const deleteButtons = document.querySelectorAll(".delete-record");
    deleteButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            updateDatabase();
        });
    });

    function updateDatabase() {
        // Send an HTTP request to the '/update' route in your imgprocessRouter
        fetch('/img_process/update', {
            method: "POST",
        })
        .then(response => {
            if (response.ok) {
                // Reload the page or update the UI as needed
                window.location.reload();
            } else {
                // Handle errors
                console.error("Error updating the database");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
});
