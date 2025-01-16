// script.js

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loggedInSeller = localStorage.getItem('loggedInSeller');
    const profileLink = document.getElementById('profile-link');

    if (loggedInUser) {
        profileLink.textContent = 'Profile';
        profileLink.href = 'user_profile.html';
    } else if (loggedInSeller) {
        profileLink.textContent = 'Profile';
        profileLink.href = 'seller_profile.html';
    } else {
        profileLink.textContent = 'Login';
        profileLink.href = 'user_login.html'; // Default to user login page
    }
});

function checkAuthentication() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loggedInSeller = localStorage.getItem('loggedInSeller');

    if (!loggedInUser && !loggedInSeller) {
        window.location.href = 'user_login.html'; // Redirect to user login page if not logged in
    }
}