document.addEventListener('DOMContentLoaded', () => {
    const userSignupForm = document.getElementById('user-signup-form');
    const sellerSignupForm = document.getElementById('seller-signup-form');

    userSignupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        // Store user information in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            alert('Username already exists. Please choose a different username.');
        } else {
            users.push({ username, password, role: 'user' });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful! You can now log in.');
            window.location.href = 'user_login.html'; // Redirect to login page
        }
    });

    sellerSignupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-seller-username').value;
        const password = document.getElementById('signup-seller-password').value;

        // Store seller information in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            alert('Username already exists. Please choose a different username.');
        } else {
            users.push({ username, password, role: 'seller' });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful! You can now log in.');
            window.location.href = 'seller_login.html'; // Redirect to login page
        }
    });
});