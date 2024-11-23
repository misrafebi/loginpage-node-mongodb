document.getElementById('user-register-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === '' || password === '' ) {
        swal('Error', 'All fields are required!','error')
        return false; 
    } 
    
   

    this.submit();
});
