// user_signup.js

document.addEventListener('DOMContentLoaded', () => {
    const userSignupForm = document.getElementById('user-signup-form');

    userSignupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        // Example signup logic
        if (username && password) {
            alert('Signup successful! You can now log in.');
            window.location.href = 'user_login.html'; // Redirect to login page
        } else {
            alert('Signup failed. Please try again.');
        }
    });
});