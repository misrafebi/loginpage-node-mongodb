document.getElementById('user-register-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    
    if (username === '' || password === '' || confirmPassword === '') {
       
        swal('Error', 'All fields are required!','error')

        return false; 
    } 
    
    if (password !== confirmPassword) {
       
        swal('Error', "Passwords do not match!",'error')

        return false; 
    }

   
    this.submit();
});
