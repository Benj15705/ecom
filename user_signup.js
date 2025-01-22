// user_signup.js

document.addEventListener('DOMContentLoaded', () => {
    const userSignupForm = document.getElementById('user-signup-form');

    userSignupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const role = 'user'; // Set the role to 'user' for user signup

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, role }),
            });

            if (response.ok) {
                alert('Signup successful! You can now log in.');
                window.location.href = 'user_login.html'; // Redirect to login page
            } else {
                const errorData = await response.json();
                alert(errorData.error);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    });
});