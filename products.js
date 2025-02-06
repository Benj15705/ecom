// products.js

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    function displayProducts() {
        const allProducts = [];
        const sellers = Object.keys(localStorage)
            .filter(key => key.startsWith('products_'))
            .forEach(key => {
                const products = JSON.parse(localStorage.getItem(key)) || [];
                allProducts.push(...products.map(product => ({ ...product, seller: key.replace('products_', '') })));
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
                <p>Seller: ${product.seller}</p>
                <button class="add-to-order" data-product='${JSON.stringify(product)}'>Add to Order</button>
                <button class="chat-with-seller" data-seller="${product.seller}">Chat with Seller</button>
            `;
            productElement.addEventListener('click', () => {
                window.location.href = `product_details.html?product=${encodeURIComponent(product.name)}&seller=${encodeURIComponent(product.seller)}`;
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

        document.querySelectorAll('.chat-with-seller').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the click event from propagating to the product item
                const seller = event.target.getAttribute('data-seller');
                localStorage.setItem('currentChatSeller', seller);
                window.location.href = 'chat_with_seller.html';
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