// login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

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
                    // Remove these lines
                    // localStorage.setItem('token', data.token);
                    // localStorage.setItem('loggedInUser', username);
                    // localStorage.setItem('userRole', data.role);

                    if (data.role === 'owner') {
                        window.location.href = 'owner_dashboard.html';
                    } else if (data.role === 'seller') {
                        window.location.href = 'seller_homepage.html';
                    } else {
                        window.location.href = 'index.html';
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