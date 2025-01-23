// seller_login.js

document.addEventListener('DOMContentLoaded', () => {
    const sellerLoginForm = document.getElementById('seller-login-form');

    sellerLoginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('seller-username').value.trim();
        const password = document.getElementById('seller-password').value.trim();

        // Example login logic
        if (username === 'seller' && password === 'SellerAccess') {
            window.location.href = 'seller_homepage.html';
        } else {
            alert('Invalid username or password');
        }
    });
});