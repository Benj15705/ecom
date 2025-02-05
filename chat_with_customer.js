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
    console.log('Logged in as: ', loggedInSeller);  // For debugging

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();  // Prevent form from reloading the page

        const message = chatInput.value.trim();
        if (message) {
            addMessage(loggedInSeller, message);
            chatInput.value = '';  // Clear input after sending the message
            setTimeout(() => customerReply(), 1000);  // Simulate a customer reply after 1 second
        }
    });

    function addMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.className = sender === loggedInSeller ? 'chat-message seller' : 'chat-message customer';
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text} <span class="timestamp">${new Date().toLocaleTimeString()}</span>`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;  // Scroll to bottom
    }

    function customerReply() {
        const responses = [
            "I'm interested in your product!",
            "Can you provide more details?",
            "How much is the shipping cost?",
            "Thank you!"
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        addMessage("Customer", response);  // Simulate a customer response
    }
});
