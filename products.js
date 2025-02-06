// products.js

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    function displayProducts() {
        const allProducts = [];
        const farmers = Object.keys(localStorage)
            .filter(key => key.startsWith('products_'))
            .forEach(key => {
                const products = JSON.parse(localStorage.getItem(key)) || [];
                allProducts.push(...products.map(product => ({ ...product, farmer: key.replace('products_', '') })));
            });

        productList.innerHTML = '';
        allProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';
            productElement.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>${product.description}</p>
                <p>Farmer: ${product.farmer}</p>
                <button class="add-to-order" data-product='${JSON.stringify(product)}'>Add to Order</button>
                <button class="chat-with-farmer" data-farmer="${product.farmer}">Chat with Farmer</button>
            `;
            productElement.addEventListener('click', () => {
                window.location.href = `product_details.html?product=${encodeURIComponent(product.name)}&farmer=${encodeURIComponent(product.farmer)}`;
            });
            productList.appendChild(productElement);
        });

        document.querySelectorAll('.add-to-order').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the click event from propagating to the product item
                const product = JSON.parse(event.target.getAttribute('data-product'));
                addToOrder(product);
            });
        });

        document.querySelectorAll('.chat-with-farmer').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the click event from propagating to the product item
                const farmer = event.target.getAttribute('data-farmer');
                localStorage.setItem('currentChatFarmer', farmer);
                window.location.href = 'chat_with_farmer.html';
            });
        });
    }

    function addToOrder(product) {
        const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
        orderItems.push(product);
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        alert('Product added to order!');
    }

    displayProducts();
});