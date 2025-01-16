// orders.js

// Function to update the order count
function updateOrderCount() {
    const orderCountElement = document.getElementById('order-count');
    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    if (orderCountElement) {
        orderCountElement.textContent = orderItems.length;
    }
}

// Function to display order items
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
                    <button class="remove-from-order" data-index="${index}">Remove</button>
                `;
                orderItemsElement.appendChild(orderItemElement);
            });

            // Add event listeners to all "Remove" buttons
            document.querySelectorAll('.remove-from-order').forEach(button => {
                button.addEventListener('click', removeFromOrder);
            });
        }
    }
}

// Function to add item to the order
function addToOrder(event) {
    const productElement = event.target.closest('.product');
    const productName = productElement.querySelector('h3').textContent;
    const productPrice = productElement.querySelector('p').textContent;
    const productImage = productElement.querySelector('img').src;

    let orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    orderItems.push({ name: productName, price: productPrice, image: productImage });
    localStorage.setItem('orderItems', JSON.stringify(orderItems));

    updateOrderCount();
    displayOrderItems(); // Update the order display when an item is added
}

// Function to remove item from the order
function removeFromOrder(event) {
    const index = event.target.getAttribute('data-index');
    let orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    orderItems.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('orderItems', JSON.stringify(orderItems));

    updateOrderCount();
    displayOrderItems(); // Update the order display when an item is removed
}

// Add event listeners to all "Add to Order" buttons
document.querySelectorAll('.add-to-order').forEach(button => {
    button.addEventListener('click', addToOrder);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    updateOrderCount();
    displayOrderItems();
});

// Chatroom functionality
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatInput.value;
    if (message.trim() !== '') {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.textContent = `You: ${message}`;
        chatMessages.appendChild(messageElement);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate a response from the seller
        setTimeout(() => {
            const sellerMessageElement = document.createElement('div');
            sellerMessageElement.className = 'chat-message';
            sellerMessageElement.textContent = `Seller: Thank you for your message!`;
            chatMessages.appendChild(sellerMessageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
});