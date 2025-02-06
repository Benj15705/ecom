// manage_orders.js

document.addEventListener('DOMContentLoaded', () => {
    displayPendingOrders();
    displayCompletedOrders();
});

function displayPendingOrders() {
    const pendingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const pendingOrdersList = document.getElementById('pending-orders-list');
    pendingOrdersList.innerHTML = '';

    pendingOrders.forEach((order, index) => {
        if (order.status === 'Pending') {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-item';
            orderElement.innerHTML = `
                <h3>${order.name}</h3>
                <p>Price: ${order.price}</p>
                <p>Address: ${order.address}</p>
                <p>Payment: ${order.payment}</p>
                <button class="discuss-details" data-index="${index}">Discuss Details</button>
                <button class="distribute-order" data-index="${index}">Distribute Order</button>
            `;
            pendingOrdersList.appendChild(orderElement);
        }
    });

    document.querySelectorAll('.discuss-details').forEach(button => {
        button.addEventListener('click', discussDetails);
    });

    document.querySelectorAll('.distribute-order').forEach(button => {
        button.addEventListener('click', distributeOrder);
    });
}

function displayCompletedOrders() {
    const completedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const completedOrdersList = document.getElementById('completed-orders-list');
    completedOrdersList.innerHTML = '';

    completedOrders.forEach(order => {
        if (order.status === 'Completed') {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-item';
            orderElement.innerHTML = `
                <h3>${order.name}</h3>
                <p>Price: ${order.price}</p>
                <p>Address: ${order.address}</p>
                <p>Payment: ${order.payment}</p>
                <button class="chat-with-customer" data-name="${order.name}">Chat with Customer</button>
            `;
            completedOrdersList.appendChild(orderElement);
        }
    });

    document.querySelectorAll('.chat-with-customer').forEach(button => {
        button.addEventListener('click', chatWithCustomer);
    });
}

function discussDetails(event) {
    const index = event.target.getAttribute('data-index');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders[index];
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML = `
        <h3>Discuss Details with Customer about ${order.name}</h3>
        <div id="messages"></div>
        <input type="text" id="message-input" placeholder="Enter your message">
        <button id="send-message">Send</button>
    `;
    document.getElementById('send-message').addEventListener('click', () => sendMessage(order.name));
}

function distributeOrder(event) {
    const index = event.target.getAttribute('data-index');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders[index];
    enterOrderDetails(order, index);
}

function enterOrderDetails(order, index) {
    const orderDetailsForm = document.getElementById('order-details-form');
    orderDetailsForm.innerHTML = `
        <h3>Enter Order Details for ${order.name}</h3>
        <label for="distribution-details">Distribution Details:</label>
        <input type="text" id="distribution-details" required>
        <button id="confirm-distribution">Confirm Distribution</button>
        <button id="cancel-distribution">Cancel</button>
    `;
    document.getElementById('confirm-distribution').addEventListener('click', () => confirmDistribution(order, index));
    document.getElementById('cancel-distribution').addEventListener('click', displayPendingOrders);
}

function confirmDistribution(order, index) {
    const distributionDetails = document.getElementById('distribution-details').value;
    if (distributionDetails) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders[index].status = 'Completed';
        orders[index].distributionDetails = distributionDetails;
        localStorage.setItem('orders', JSON.stringify(orders));
        alert('Order distribution successful!');
        displayPendingOrders();
        displayCompletedOrders();
    } else {
        alert('Please enter distribution details.');
    }
}

function chatWithCustomer(event) {
    const productName = event.target.getAttribute('data-name');
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML = `
        <h3>Chat with Customer about ${productName}</h3>
        <div id="messages"></div>
        <input type="text" id="message-input" placeholder="Enter your message">
        <button id="send-message">Send</button>
    `;
    document.getElementById('send-message').addEventListener('click', () => sendMessage(productName));
}

function sendMessage(productName) {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    if (message) {
        const messages = JSON.parse(localStorage.getItem(`messages_${productName}`)) || [];
        messages.push({ sender: 'Seller', text: message });
        localStorage.setItem(`messages_${productName}`, JSON.stringify(messages));
        displayMessages(productName);
        messageInput.value = '';
    }
}

function displayMessages(productName) {
    const messages = JSON.parse(localStorage.getItem(`messages_${productName}`)) || [];
    const messagesElement = document.getElementById('messages');
    messagesElement.innerHTML = '';
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `<strong>${msg.sender}:</strong> ${msg.text}`;
        messagesElement.appendChild(messageElement);
    });
}