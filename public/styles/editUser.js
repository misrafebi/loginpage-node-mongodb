function openEditUser(username) {
    document.getElementById('editUsername').value = username;
  }
  
  function saveChanges() {
    const username = document.getElementById('editUsername').value;
    const password = document.getElementById('editPassword').value;
    fetch('/admin/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
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
      }).catch(error => {
        console.error('Error:', error);
      swal("Error", "Something went wrong!", "error");
      });
  }
  
  
  
  