document.addEventListener('DOMContentLoaded', () => {
    const productInfo = document.getElementById('product-info');
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');

    if (productName) {
        const loggedInSeller = localStorage.getItem('loggedInSeller');
        const products = JSON.parse(localStorage.getItem(`products_${loggedInSeller}`)) || [];

        const product = products.find(p => p.name === productName);
        if (product) {
            productInfo.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Inventory:</strong> ${product.inventory}</p>
            `;
        } else {
            productInfo.innerHTML = '<p>Product not found.</p>';
        }
    } else {
        productInfo.innerHTML = '<p>No product selected.</p>';
    }
});
