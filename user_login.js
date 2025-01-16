// user_login.js

document.addEventListener('DOMContentLoaded', () => {
    const userLoginForm = document.getElementById('user-login-form');

    userLoginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('user-username').value;
        const password = document.getElementById('user-password').value;

        // Validate user credentials (this is a placeholder; replace with real validation)
        const storedPassword = localStorage.getItem('user_' + username);

        if (storedPassword && storedPassword === password) {
            localStorage.setItem('loggedInUser', username); // Store the logged-in user
            window.location.href = 'index.html'; // Redirect to homepage
        } else {
            alert('Invalid username or password.');
        }
    });
});