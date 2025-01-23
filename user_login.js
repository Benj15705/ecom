// user_login.js

document.addEventListener('DOMContentLoaded', () => {
    const userLoginForm = document.getElementById('user-login-form');

    userLoginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('user-username').value;
        const password = document.getElementById('user-password').value;

        // Example login logic
        if (username === 'user' && password === 'UserAccess') {
            window.location.href = 'index.html'; // Redirect to homepage
        } else {
            alert('Invalid username or password');
        }
    });
});