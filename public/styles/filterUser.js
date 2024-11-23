function filterUsers() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('userTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const usernameCell = rows[i].getElementsByTagName('td')[1];
        if (usernameCell) {
            const username = usernameCell.textContent || usernameCell.innerText;
            if (username.toLowerCase().indexOf(filter) > -1) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}