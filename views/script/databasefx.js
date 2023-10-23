
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
