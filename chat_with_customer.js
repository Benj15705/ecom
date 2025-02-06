document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatWindow = document.getElementById('chat-window');
    const customerSelect = document.getElementById('customer-select');

    const loggedInFarmer = localStorage.getItem('loggedInFarmer');
    if (!loggedInFarmer) {
        alert('You must be logged in as a farmer to access this page.');
        window.location.href = 'farmer_login.html';
        return;
    }

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            const selectedCustomer = customerSelect.value;
            addMessage(loggedInFarmer, message, selectedCustomer);
            chatInput.value = '';
            setTimeout(() => customerReply(selectedCustomer), 1000); // Simulate a customer reply after 1 second
        }
    });

    function addMessage(sender, text, receiver) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom

        // Store message in localStorage
        const chatHistory = JSON.parse(localStorage.getItem(`chat_${receiver}`)) || [];
        chatHistory.push({ sender, text, timestamp: new Date().toLocaleTimeString() });
        localStorage.setItem(`chat_${receiver}`, JSON.stringify(chatHistory));
    }

    function customerReply(customer) {
        const replies = [
            "Thank you for the update!",
            "Can you provide more details?",
            "I appreciate your help.",
            "When will the order be ready?",
            "Can I change my order?"
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        addMessage(customer, randomReply, loggedInFarmer);
    }

    // Populate customer select dropdown with customers who have placed orders
    function populateCustomerSelect() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const customers = [...new Set(orders.map(order => order.customer))]; // Get unique customers
        customers.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer;
            option.textContent = customer;
            customerSelect.appendChild(option);
        });
    }

    populateCustomerSelect();
});