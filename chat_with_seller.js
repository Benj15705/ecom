// chat_with_seller.js
document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const userList = document.getElementById('users');

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('You must be logged in as a user to access this page.');
        window.location.href = 'user_login.html';
        return;
    }

    let currentSeller = localStorage.getItem('currentChatSeller');
    if (!currentSeller) {
        alert('No seller selected for chat.');
        window.location.href = 'products.html';
        return;
    }

    const sellers = ['Seller1', 'Seller2', 'Seller3']; // Example seller list

    // Populate seller list
    sellers.forEach(seller => {
        const sellerElement = document.createElement('li');
        sellerElement.textContent = seller;
        sellerElement.addEventListener('click', () => {
            currentSeller = seller;
            localStorage.setItem('currentChatSeller', seller);
            loadChatMessages(seller);
        });
        userList.appendChild(sellerElement);
    });

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const message = chatInput.value.trim();
        if (message && currentSeller) {
            addMessage(currentSeller, loggedInUser, message);
            chatInput.value = '';
        }
    });

    function addMessage(seller, sender, text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom

        // Save message to localStorage
        const chatHistory = JSON.parse(localStorage.getItem(`chat_${seller}`)) || [];
        chatHistory.push({ sender, text });
        localStorage.setItem(`chat_${seller}`, JSON.stringify(chatHistory));
    }

    function loadChatMessages(seller) {
        chatMessages.innerHTML = ''; // Clear current messages
        const chatHistory = JSON.parse(localStorage.getItem(`chat_${seller}`)) || [];
        chatHistory.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message';
            messageElement.innerHTML = `<strong>${message.sender}:</strong> ${message.text}`;
            chatMessages.appendChild(messageElement);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }

    loadChatMessages(currentSeller);
});