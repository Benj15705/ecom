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

        sendMessage();
    });

    // Send message function
    function sendMessage() {
        let messageText = chatInput.value.trim();
        if (messageText === "") return;

        addMessage(loggedInSeller, messageText);  // Add the message to the chat window

        chatInput.value = "";  // Clear input field after sending

        setTimeout(() => customerReply(), 1000);  // Simulate customer reply after 1 second
    }

    // Add a new message to the chat window
    function addMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add("message", sender === loggedInSeller ? "seller" : "customer");

        messageElement.innerHTML = `<strong>${sender}:</strong> ${text} <span class="timestamp">${getTime()}</span>`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;  // Scroll to the bottom of the chat window
    }

    // Simulate a customer reply
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

    // Get current time in a readable format
    function getTime() {
        let now = new Date();
        return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
});
