// owner_dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const overviewElement = document.getElementById('overview');

    // Fetch overview data from the backend (this is a placeholder; replace with real data fetching)
    const overviewData = {
        totalUsers: 100,
        totalSellers: 20,
        totalProducts: 500,
        totalOrders: 200,
    };

    overviewElement.innerHTML = `
        <p>Total Users: ${overviewData.totalUsers}</p>
        <p>Total Sellers: ${overviewData.totalSellers}</p>
        <p>Total Products: ${overviewData.totalProducts}</p>
        <p>Total Orders: ${overviewData.totalOrders}</p>
    `;
});