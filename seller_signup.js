// seller_signup.js

document.addEventListener('DOMContentLoaded', () => {
    const sellerSignupForm = document.getElementById('seller-signup-form');

    sellerSignupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-seller-username').value;
        const password = document.getElementById('signup-seller-password').value;

        // Save seller credentials (in a real application, you'd send this to the server)
        localStorage.setItem('seller_' + username, password);
        alert('Signup successful! You can now log in.');
        window.location.href = 'seller_login.html'; // Redirect to login page
    });
});