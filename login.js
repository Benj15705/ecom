// login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username && password) {
            // Example login logic
            if (username === 'owner' && password === 'OwnerAccess') {
                window.location.href = 'owner_dashboard.html';
            } else if (username === 'seller' && password === 'SellerAccess') {
                window.location.href = 'seller_homepage.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            alert('Invalid username or password');
        }
    });
});