// chat_with_seller.js

document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const userList = document.getElementById('users');

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('You must be logged in to access this page.');
        window.location.href = 'user_login.html';
        return;
    }

    let currentSeller = null;
    const sellers = ['Seller1', 'Seller2', 'Seller3']; // Example seller list

    // Populate seller list
    sellers.forEach(seller => {
        const sellerElement = document.createElement('li');
        sellerElement.textContent = seller;
        sellerElement.addEventListener('click', () => {
            currentSeller = seller;
            loadChatMessages(seller);
        });
        userList.appendChild(sellerElement);
    });

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const message = chatInput.value.trim();
        if (message && currentSeller) {
            addMessage(loggedInUser, message);
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

    function loadChatMessages(seller) {
        chatMessages.innerHTML = ''; // Clear current messages
        // Example chat history
        const chatHistory = [
            { sender: seller, message: 'Hello!', timestamp: new Date() },
            { sender: loggedInUser, message: 'Hi there!', timestamp: new Date() }
        ];
        chatHistory.forEach(message => {
            addMessage(message.sender, message.message, message.timestamp);
        });
    }
});