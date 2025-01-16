// seller_login.js

document.addEventListener('DOMContentLoaded', () => {
    const sellerLoginForm = document.getElementById('seller-login-form');

    sellerLoginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('seller-username').value;
        const password = document.getElementById('seller-password').value;

        // Validate seller credentials (this is a placeholder; replace with real validation)
        const storedPassword = localStorage.getItem('seller_' + username);

        if (storedPassword && storedPassword === password) {
            localStorage.setItem('loggedInSeller', username); // Store the logged-in seller
            window.location.href = 'seller_homepage.html'; // Redirect to seller homepage
        } else {
            alert('Invalid username or password.');
        }
    });
});