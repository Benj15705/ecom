// user_login.js

document.addEventListener('DOMContentLoaded', () => {
    const userLoginForm = document.getElementById('user-login-form');

    userLoginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('user-username').value;
        const password = document.getElementById('user-password').value;

        try {
            const response = await fetch('http://localhost:5000/login', { // Replace with your deployed backend URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.role === 'owner') {
                    window.location.href = 'owner_overview.html'; // Redirect to owner overview
                } else {
                    window.location.href = 'index.html'; // Redirect to homepage
                }
            } else {
                const errorData = await response.json();
                alert(errorData.error);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    });
});