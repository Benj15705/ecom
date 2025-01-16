// product_details.js

document.addEventListener('DOMContentLoaded', () => {
    const productInfo = document.getElementById('product-info');
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');
    const sellerName = urlParams.get('seller');

    if (productName && sellerName) {
        const products = JSON.parse(localStorage.getItem(`products_${sellerName}`)) || [];
        const product = products.find(p => p.name === productName);

        if (product) {
            productInfo.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>${product.description}</p>
                <p>Seller: ${sellerName}</p>
                <button class="chat-with-seller" data-seller="${sellerName}">Chat with Seller</button>
            `;

            document.querySelector('.chat-with-seller').addEventListener('click', () => {
                localStorage.setItem('currentChatSeller', sellerName);
                window.location.href = 'chat_with_seller.html';
            });
        } else {
            productInfo.innerHTML = '<p>Product not found.</p>';
        }
    } else {
        productInfo.innerHTML = '<p>Invalid product details.</p>';
    }
});