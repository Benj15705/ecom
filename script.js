// script.js

document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('home-button');
    const profileLink = document.getElementById('profile-link');

    homeButton.href = 'user_login.html'; // Default to user login page
    profileLink.href = 'user_login.html'; // Default to user login page
});

function checkAuthentication() {
    window.location.href = 'user_login.html'; // Redirect to user login page if not logged in
}

function checkOwnerAuthentication() {
    window.location.href = 'user_login.html'; // Redirect to user login page if not logged in or not owner
}