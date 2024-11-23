function openDeleteUser(username) {
  const deleteUsernameInput = document.getElementById('deleteUsername');
  if (deleteUsernameInput) {
    deleteUsernameInput.value = username;
  } else {
    console.error('Element with id "deleteUsername" not found');
  }
}

function confirmDelete() {
  const username = document.getElementById('deleteUsername').value;

  fetch('/admin/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        swal("Good job!", data.successMessage, "success").then(() => {
          location.reload(); // Reload page after user adds
        });
      } else {
        swal("Error", data.errorMessage, "error");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      swal("Error", "Something went wrong!", "error");
    });
}