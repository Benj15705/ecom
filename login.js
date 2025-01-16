// login.js

document.addEventListener('DOMContentLoaded', () => {
    const userLoginForm = document.getElementById('user-login-form');
    const sellerLoginForm = document.getElementById('seller-login-form');

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

    sellerLoginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('seller-username').value;
        const password = document.getElementById('seller-password').value;

        // Validate seller credentials (this is a placeholder; replace with real validation)
        const storedPassword = localStorage.getItem('seller_' + username);

        if (storedPassword && storedPassword === password) {
            localStorage.setItem('loggedInSeller', username); // Store the logged-in seller
            window.location.href = 'seller_profile.html'; // Redirect to seller profile page
        } else {
            alert('Invalid username or password.');
        }
    });
});