// Search bar functionality
function filterTable() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const table = document.getElementById('table');
    const tableRow = table.getElementsByTagName('tr');
    const column = document.getElementById('column-filter');
    const columnNumber = column.options[column.selectedIndex].value;
    for (let i = 0; i < tableRow.length; i++) {
        const td = tableRow[i].getElementsByTagName('td')[columnNumber];
        if (td && columnNumber) {
            if (td.innerText.toLowerCase().indexOf(searchTerm) > -1) {
                tableRow[i].style.display = '';
            } else {
                tableRow[i].style.display = 'none';
            }
        } else {
            // TODO - filter multiple columns
        }
    }
}