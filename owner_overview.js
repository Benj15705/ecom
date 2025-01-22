// owner_overview.js

document.addEventListener('DOMContentLoaded', async () => {
    const overviewDataElement = document.getElementById('overview-data');

    try {
        const response = await fetch('http://localhost:5000/owner-overview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: 'OwnerAccess' }), // Replace with the actual owner password
        });

        if (response.ok) {
            const data = await response.json();
            overviewDataElement.innerHTML = `
                <p>Total Users: ${data.totalUsers}</p>
                <p>Total Sellers: ${data.totalSellers}</p>
                <p>Total Products: ${data.totalProducts}</p>
                <p>Total Orders: ${data.totalOrders}</p>
            `;
        } else {
            const errorData = await response.json();
            alert(errorData.error);
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
    }
});