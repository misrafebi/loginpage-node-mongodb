

function addUser() {
  const username = document.getElementById('addUsername').value;
  const password = document.getElementById('addPassword').value;

  fetch('/admin/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Show success alert
        swal("Good job!", data.successMessage, "success").then(() => {
          location.reload(); // Reload page after user adds
        });
      } else {
        // Show error alert
        swal("Error", data.errorMessage, "error");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      swal("Error", "Something went wrong!", "error");
    });
}
