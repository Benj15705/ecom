document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatWindow = document.getElementById('chat-window');

    const loggedInSeller = localStorage.getItem('loggedInSeller') || "Seller"; // Default for testing
    if (!localStorage.getItem('loggedInSeller')) {
        alert('You must be logged in as a seller to access this page.');
        window.location.href = 'seller_login.html';
        return;
    }

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const message = chatInput.value.trim();
        if (message) {
            addMessage(loggedInSeller, message);
            chatInput.value = '';
            setTimeout(() => customerReply(), 1000);
        }
    });

    function addMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.className = sender === loggedInSeller ? 'chat-message seller' : 'chat-message customer';
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text} <span class="timestamp">${new Date().toLocaleTimeString()}</span>`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function customerReply() {
        const responses = [
            "I'm interested in your product!",
            "Can you provide more details?",
            "How much is the shipping cost?",
            "Thank you!"
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        addMessage("Customer", response);
    }
});
