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
            addMessage(loggedInSeller, message);
            chatInput.value = '';
        }
    });

    function addMessage(sender, text, timestamp = new Date()) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text} <span class="timestamp">${new Date(timestamp).toLocaleTimeString()}</span>`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function loadChatMessages(user) {
        chatMessages.innerHTML = ''; // Clear current messages
        // Example chat history
        const chatHistory = [
            { sender: user, message: 'Hello!', timestamp: new Date() },
            { sender: loggedInSeller, message: 'Hi there!', timestamp: new Date() }
        ];
        chatHistory.forEach(message => {
            addMessage(message.sender, message.message, message.timestamp);
        });
    }
});