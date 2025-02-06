// orders.js

document.addEventListener('DOMContentLoaded', () => {
    updateOrderCount();
    displayOrderItems();
    setupEventListeners();
});

function updateOrderCount() {
    const orderCountElement = document.getElementById('order-count');
    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    if (orderCountElement) {
        orderCountElement.textContent = orderItems.length;
    }
}

function displayOrderItems() {
    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    const orderItemsElement = document.getElementById('order-items');
    if (orderItemsElement) {
        orderItemsElement.innerHTML = '';

        if (orderItems.length === 0) {
            orderItemsElement.innerHTML = '<p>Your order list is empty.</p>';
        } else {
            orderItems.forEach((item, index) => {
                const orderItemElement = document.createElement('div');
                orderItemElement.className = 'order-item';
                orderItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                    <button class="buy-now" data-index="${index}">Buy Now</button>
                    <button class="remove-from-order" data-index="${index}">Remove</button>
                `;
                orderItemsElement.appendChild(orderItemElement);
            });

            document.querySelectorAll('.buy-now').forEach(button => {
                button.addEventListener('click', buyNow);
            });

            document.querySelectorAll('.remove-from-order').forEach(button => {
                button.addEventListener('click', removeFromOrder);
            });
        }
    }
}

function buyNow(event) {
    const index = event.target.getAttribute('data-index');
    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    const item = orderItems[index];
    enterDetails(item);
}

function enterDetails(item) {
    const detailsForm = document.getElementById('details-form');
    detailsForm.innerHTML = `
        <h3>Enter Details for ${item.name}</h3>
        <label for="address">Address:</label>
        <input type="text" id="address" required>
        <label for="payment">Payment Method:</label>
        <input type="text" id="payment" required>
        <button id="confirm-checkout">Confirm Checkout</button>
        <button id="cancel-checkout">Cancel</button>
    `;
    document.getElementById('confirm-checkout').addEventListener('click', () => confirmCheckout(item));
    document.getElementById('cancel-checkout').addEventListener('click', displayOrderItems);
}

function confirmCheckout(item) {
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;
    if (address && payment) {
        orderProduct(item, address, payment);
    } else {
        alert('Please enter all details.');
    }
}

function orderProduct(item, address, payment) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({ ...item, address, payment, status: 'Pending' });
    localStorage.setItem('orders', JSON.stringify(orders));
    alert('Product ordered successfully!');
    displayOrderItems();
}

function removeFromOrder(event) {
    const index = event.target.getAttribute('data-index');
    let orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    orderItems.splice(index, 1);
    localStorage.setItem('orderItems', JSON.stringify(orderItems));
    updateOrderCount();
    displayOrderItems();
}

function setupEventListeners() {
    document.getElementById('view-orders').addEventListener('click', displayOrders);
}

function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersElement = document.getElementById('orders');
    ordersElement.innerHTML = '';

    if (orders.length === 0) {
        ordersElement.innerHTML = '<p>You have no orders.</p>';
    } else {
        orders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order';
            orderElement.innerHTML = `
                <h3>${order.name}</h3>
                <p>Price: ${order.price}</p>
                <p>Address: ${order.address}</p>
                <p>Payment: ${order.payment}</p>
                <p>Status: ${order.status}</p>
                <button class="chat-with-farmer" data-name="${order.name}">Chat with Farmer</button>
            `;
            ordersElement.appendChild(orderElement);
        });

        document.querySelectorAll('.chat-with-farmer').forEach(button => {
            button.addEventListener('click', chatWithFarmer);
        });
    }
}

function chatWithFarmer(event) {
    const productName = event.target.getAttribute('data-name');
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML = `
        <h3>Chat with Farmer about ${productName}</h3>
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
        messages.push({ sender: 'User', text: message });
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