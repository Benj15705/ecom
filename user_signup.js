// user_signup.js

document.addEventListener('DOMContentLoaded', () => {
    const userSignupForm = document.getElementById('user-signup-form');

    userSignupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        // Save user credentials (in a real application, you'd send this to the server)
        localStorage.setItem('user_' + username, password);
        alert('Signup successful! You can now log in.');
        window.location.href = 'user_login.html'; // Redirect to login page
    });
});