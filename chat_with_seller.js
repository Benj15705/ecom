document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatWindow = document.getElementById('chat-window');
    const sellerSelect = document.getElementById('seller-select');

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('You must be logged in as a user to access this page.');
        window.location.href = 'user_login.html';
        return;
    }

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            const selectedSeller = sellerSelect.value;
            addMessage(loggedInUser, message, selectedSeller);
            chatInput.value = '';
            setTimeout(() => sellerReply(selectedSeller), 1000); // Simulate a seller reply after 1 second
        }
    });

    function addMessage(sender, text, receiver) {
        const messageElement = document.createElement('div');
        messageElement.className = sender === loggedInUser ? 'chat-message customer' : 'chat-message seller';
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text} <span class="timestamp">${new Date().toLocaleTimeString()}</span>`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom

        // Store message in localStorage
        const chatHistory = JSON.parse(localStorage.getItem(`chat_${receiver}`)) || [];
        chatHistory.push({ sender, text, timestamp: new Date().toLocaleTimeString() });
        localStorage.setItem(`chat_${receiver}`, JSON.stringify(chatHistory));
    }

    function sellerReply(receiver) {
        const responses = [
            "Thank you for your interest!",
            "Sure, I can provide more details.",
            "Shipping cost depends on your location.",
            "You're welcome!"
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        addMessage("Seller", response, receiver); // Simulate a seller response
    }

    // Load initial chat history for the selected seller
    loadChatHistory(sellerSelect.value);
});