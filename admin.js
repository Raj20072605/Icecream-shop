// SWEET SCOOPS ADMIN DASHBOARD

document.addEventListener("DOMContentLoaded", function () {

    const orders = JSON.parse(
        localStorage.getItem("sweetScoopsOrders") || "[]"
    );

    const totalOrders = orders.length;

    let totalSold = 0;
    let totalSales = 0;

    orders.forEach(function (order) {
        totalSold += Number(order.quantity) || 0;
        totalSales += Number(order.total) || 0;
    });

    document.getElementById("total-orders").textContent = totalOrders;

    document.getElementById("total-sold").textContent = totalSold;

    document.getElementById("total-sales").textContent =
        "₹" + totalSales.toFixed(2);

    const ordersList = document.getElementById("orders-list");

    ordersList.innerHTML = "";

    if (orders.length === 0) {
        ordersList.innerHTML = `
            <tr>
                <td colspan="5">No orders available yet.</td>
            </tr>
        `;
    } else {
        orders.forEach(function (order, index) {

            const row = document.createElement("tr");

            const values = [
                order.id || index + 1,
                order.customer || "Guest",
                order.iceCreams || "Ice Cream",
                order.quantity || 0,
                "₹" + (Number(order.total) || 0).toFixed(2)
            ];

            values.forEach(function (value) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            ordersList.appendChild(row);
        });
    }

    // DEMONSTRATION-ONLY ADMIN CHECK
    // This is NOT secure authentication.
    const adminLoggedIn =
        sessionStorage.getItem("sweetScoopsAdminLoggedIn");

    if (adminLoggedIn !== "true") {
        alert("Please log in through the admin login page.");
        window.location.href = "admin-login.html";
        return;
    }

    // ADMIN LOGOUT
    document.getElementById("logout-btn").addEventListener(
        "click",
        function () {
            sessionStorage.removeItem("sweetScoopsAdminLoggedIn");
            window.location.href = "admin-login.html";
        }
    );

});
