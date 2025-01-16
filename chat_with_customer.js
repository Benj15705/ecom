// chat_with_customer.js
document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const userList = document.getElementById('users');

    const loggedInSeller = localStorage.getItem('loggedInSeller');
    if (!loggedInSeller) {
        alert('You must be logged in as a seller to access this page.');
        window.location.href = 'seller_login.html';
        return;
    }

    let currentUser = null;
    const users = ['User1', 'User2', 'User3']; // Example user list

    // Populate user list
    users.forEach(user => {
        const userElement = document.createElement('li');
        userElement.textContent = user;
        userElement.addEventListener('click', () => {
            currentUser = user;
            loadChatMessages(user);
        });
        userList.appendChild(userElement);
    });

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const message = chatInput.value.trim();
        if (message && currentUser) {
            addMessage(currentUser, loggedInSeller, message);
            chatInput.value = '';
        }
    });

    function addMessage(user, sender, text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom

        // Save message to localStorage
        const chatHistory = JSON.parse(localStorage.getItem(`chat_${user}`)) || [];
        chatHistory.push({ sender, text });
        localStorage.setItem(`chat_${user}`, JSON.stringify(chatHistory));
    }

    function loadChatMessages(user) {
        chatMessages.innerHTML = ''; // Clear current messages
        const chatHistory = JSON.parse(localStorage.getItem(`chat_${user}`)) || [];
        chatHistory.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message';
            messageElement.innerHTML = `<strong>${message.sender}:</strong> ${message.text}`;
            chatMessages.appendChild(messageElement);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }
});