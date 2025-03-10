// script.js

document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('home-button');
    const profileLink = document.getElementById('profile-link');
    const usernameElement = document.getElementById('username');
    const profileImg = document.querySelector('.profile-button img');

    const loggedInUser = localStorage.getItem('loggedInUser');
    const loggedInSeller = localStorage.getItem('loggedInSeller');

    if (loggedInUser) {
        homeButton.href = 'index.html';
        profileLink.href = 'user_profile.html';
        usernameElement.textContent = loggedInUser;
    } else if (loggedInSeller) {
        homeButton.href = 'seller_homepage.html';
        profileLink.href = 'seller_profile.html';
        usernameElement.textContent = loggedInSeller;
    } else {
        homeButton.href = 'user_login.html'; // Default to user login page
        profileLink.href = 'user_login.html'; // Default to user login page
    }

    // Load profile picture from localStorage if available
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) {
        profileImg.src = storedProfilePic;
    }
});

function checkAuthentication() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loggedInSeller = localStorage.getItem('loggedInSeller');

    if (!loggedInUser && !loggedInSeller) {
        window.location.href = 'user_login.html'; // Redirect to user login page if not logged in
    }
}

function checkOwnerAuthentication() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loggedInSeller = localStorage.getItem('loggedInSeller');

    if (!loggedInUser && !loggedInSeller) {
        window.location.href = 'user_login.html'; // Redirect to user login page if not logged in or not owner
    }
}