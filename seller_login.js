// seller_login.js

document.addEventListener('DOMContentLoaded', () => {
    const sellerLoginForm = document.getElementById('seller-login-form');

    sellerLoginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('seller-username').value.trim();
        const password = document.getElementById('seller-password').value.trim();

        if (username && password) {
            try {
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    if (data.role === 'seller') {
                        window.location.href = 'seller_homepage.html';
                    } else {
                        alert('Invalid role. Please log in as a seller.');
                    }
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        }
    });
});