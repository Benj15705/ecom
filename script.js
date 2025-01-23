// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Remove these lines
    // const token = localStorage.getItem('token');
    // const homeButton = document.getElementById('home-button');
    // const profileLink = document.getElementById('profile-link');

    // if (token) {
    //     const userRole = localStorage.getItem('userRole');

    //     if (userRole === 'owner') {
    //         homeButton.href = 'owner_dashboard.html';
    //         profileLink.href = 'owner_profile.html';
    //     } else if (userRole === 'seller') {
    //         homeButton.href = 'seller_homepage.html';
    //         profileLink.href = 'seller_profile.html';
    //     } else {
    //         homeButton.href = 'index.html';
    //         profileLink.href = 'user_profile.html';
    //     }
    // } else {
    //     homeButton.href = 'user_login.html'; // Default to user login page
    //     profileLink.href = 'user_login.html'; // Default to user login page
    // }
});

function checkAuthentication() {
    // Remove these lines
    // const token = localStorage.getItem('token');

    // if (!token) {
    //     window.location.href = 'user_login.html'; // Redirect to user login page if not logged in
    // }
}

function checkOwnerAuthentication() {
    // Remove these lines
    // const token = localStorage.getItem('token');
    // const userRole = localStorage.getItem('userRole');

    // if (!token || userRole !== 'owner') {
    //     window.location.href = 'user_login.html'; // Redirect to user login page if not logged in or not owner
    // }
}