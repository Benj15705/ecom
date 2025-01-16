// seller_products.js

document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const loggedInSeller = localStorage.getItem('loggedInSeller');

    if (!loggedInSeller) {
        alert('You must be logged in as a seller to manage products.');
        window.location.href = 'seller_login.html';
        return;
    }

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('product-name').value.trim();
        const price = document.getElementById('product-price').value.trim();
        const description = document.getElementById('product-description').value.trim();
        const imageFile = document.getElementById('product-image').files[0];

        if (name && price && description && imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                addProduct(loggedInSeller, name, price, description, imageUrl);
                productForm.reset();
            };
            reader.readAsDataURL(imageFile);
        }
    });

    function addProduct(seller, name, price, description, imageUrl) {
        const products = JSON.parse(localStorage.getItem(`products_${seller}`)) || [];
        products.push({ name, price, description, imageUrl });
        localStorage.setItem(`products_${seller}`, JSON.stringify(products));
        displayProducts();
    }

    function displayProducts() {
        const products = JSON.parse(localStorage.getItem(`products_${loggedInSeller}`)) || [];
        productList.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';
            productElement.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>${product.description}</p>
            `;
            productList.appendChild(productElement);
        });
    }

    displayProducts();
});