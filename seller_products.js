// seller_products.js

document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const editProductForm = document.getElementById('edit-product-form');
    const productList = document.getElementById('product-list');
    const loggedInSeller = localStorage.getItem('loggedInSeller');
    let editIndex = null;

    if (!loggedInSeller) {
        alert('You must be logged in as a seller to manage products.');
        window.location.href = 'seller_login.html';
        return;
    }

    // Ensure only valid numbers are entered in the inputs
    document.getElementById('product-price').addEventListener('input', validateNumber);
    document.getElementById('product-inventory').addEventListener('input', validateNumber);
    document.getElementById('edit-product-price').addEventListener('input', validateNumber);
    document.getElementById('edit-product-inventory').addEventListener('input', validateNumber);

    function validateNumber(event) {
        if (event.target.value < 0) {
            event.target.value = 0;
        }
    }

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('product-name').value.trim();
        const price = parseFloat(document.getElementById('product-price').value.trim());
        const description = document.getElementById('product-description').value.trim();
        const inventory = parseInt(document.getElementById('product-inventory').value.trim(), 10);
        const imageFile = document.getElementById('product-image').files[0];

        if (name && price > 0 && price <= 1000 && description && inventory >= 0 && inventory <= 100 && imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                addProduct(loggedInSeller, name, price, description, inventory, imageUrl);
                productForm.reset();
            };
            reader.readAsDataURL(imageFile);
        } else {
            alert('Please enter valid product details. Price should be between 0 and 1000. Inventory should be between 0 and 100.');
        }
    });

    editProductForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('edit-product-name').value.trim();
        const price = parseFloat(document.getElementById('edit-product-price').value.trim());
        const description = document.getElementById('edit-product-description').value.trim();
        const inventory = parseInt(document.getElementById('edit-product-inventory').value.trim(), 10);
        const imageFile = document.getElementById('edit-product-image').files[0];

        if (name && price > 0 && price <= 1000 && description && inventory >= 0 && inventory <= 100) {
            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageUrl = e.target.result;
                    updateProduct(loggedInSeller, editIndex, name, price, description, inventory, imageUrl);
                    resetEditForm();
                };
                reader.readAsDataURL(imageFile);
            } else {
                const products = JSON.parse(localStorage.getItem(`products_${loggedInSeller}`)) || [];
                const product = products[editIndex];
                updateProduct(loggedInSeller, editIndex, name, price, description, inventory, product.imageUrl);
                resetEditForm();
            }
        } else {
            alert('Please enter valid product details. Price should be between 0 and 1000. Inventory should be between 0 and 100.');
        }
    });

    function addProduct(seller, name, price, description, inventory, imageUrl) {
        const products = JSON.parse(localStorage.getItem(`products_${seller}`)) || [];
        products.push({ name, price, description, inventory, imageUrl });
        localStorage.setItem(`products_${seller}`, JSON.stringify(products));
        displayProducts();
    }

    function updateProduct(seller, index, name, price, description, inventory, imageUrl) {
        const products = JSON.parse(localStorage.getItem(`products_${seller}`)) || [];
        products[index] = { name, price, description, inventory, imageUrl };
        localStorage.setItem(`products_${seller}`, JSON.stringify(products));
        displayProducts();
    }

    function displayProducts() {
        const products = JSON.parse(localStorage.getItem(`products_${loggedInSeller}`)) || [];
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';
            productElement.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>${product.description}</p>
                <p>Inventory: ${product.inventory}</p>
                <button class="edit-product" data-index="${index}">Edit</button>
                <button class="delete-product" data-index="${index}">Delete</button>
            `;
            productList.appendChild(productElement);
        });

        document.querySelectorAll('.delete-product').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                deleteProduct(index);
            });
        });

        document.querySelectorAll('.edit-product').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                editProduct(index);
            });
        });
    }

    function deleteProduct(index) {
        const products = JSON.parse(localStorage.getItem(`products_${loggedInSeller}`)) || [];
        products.splice(index, 1);
        localStorage.setItem(`products_${loggedInSeller}`, JSON.stringify(products));
        displayProducts();
    }

    function editProduct(index) {
        const products = JSON.parse(localStorage.getItem(`products_${loggedInSeller}`)) || [];
        const product = products[index];

        document.getElementById('edit-product-name').value = product.name;
        document.getElementById('edit-product-price').value = product.price;
        document.getElementById('edit-product-description').value = product.description;
        document.getElementById('edit-product-inventory').value = product.inventory;

        editIndex = index;

        // Show the edit product tab and switch to it
        document.getElementById('edit-product-tab-button').style.display = 'block';
        document.getElementById('edit-product-tab-button').click();
    }

    function resetEditForm() {
        editProductForm.reset();
        editIndex = null;
        document.getElementById('edit-product-tab-button').style.display = 'none';
        document.querySelector('.tab-button').click();
    }

    // Function to handle tab switching
    window.openTab = function(evt, tabName) {
        const tabcontent = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        const tabbuttons = document.getElementsByClassName("tab-button");
        for (let i = 0; i < tabbuttons.length; i++) {
            tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    };

    displayProducts();
});
