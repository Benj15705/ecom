// seller_signup.js

document.addEventListener('DOMContentLoaded', () => {
    const sellerSignupForm = document.getElementById('seller-signup-form');

    sellerSignupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-seller-username').value;
        const password = document.getElementById('signup-seller-password').value;
        const role = 'seller'; // Set the role to 'seller' for seller signup

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
                window.location.href = 'seller_login.html'; // Redirect to login page
            } else {
                const errorData = await response.json();
                alert(errorData.error);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    });
});