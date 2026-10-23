let cart = [];

// ADD TO CART
function addToCart(name, price) {
    const item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}


// DISPLAY CART
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalElement = document.getElementById("total");

    if (!cartItems || !cartCount || !totalElement) return;

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    }

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;

        total += subtotal;
        count += item.quantity;

        const row = document.createElement("div");
        row.className = "cart-row";

        const name = document.createElement("span");
        name.textContent =
            `${item.name} × ${item.quantity} = ₹${subtotal}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.onclick = () => {
            cart.splice(index, 1);
            displayCart();
        };

        row.appendChild(name);
        row.appendChild(removeButton);
        cartItems.appendChild(row);
    });

    cartCount.textContent = count;
    totalElement.textContent = total;
}


// PLACE ORDER
function placeOrder() {
    const customerName =
        document.getElementById("customer-name").value.trim();

    if (customerName === "") {
        alert("Please enter your name.");
        return;
    }

    if (cart.length === 0) {
        alert("Please add ice cream to your cart.");
        return;
    }

    const loggedInUser =
        localStorage.getItem("sweetScoopsLoggedInUser");

    if (!loggedInUser) {
        alert("Please register or log in before placing an order.");
        window.location.href = "login.html";
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const quantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const order = {
        id: "SS" + Date.now(),
        customer: customerName,
        username: loggedInUser,
        iceCreams: cart.map(item =>
            `${item.name} × ${item.quantity}`
        ).join(", "),
        quantity: quantity,
        total: total,
        items: cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        date: new Date().toLocaleString()
    };

    const orders = JSON.parse(
        localStorage.getItem("sweetScoopsOrders") || "[]"
    );

    orders.push(order);

    localStorage.setItem(
        "sweetScoopsOrders",
        JSON.stringify(orders)
    );

    let orderDetails = "";

    cart.forEach(item => {
        orderDetails +=
            `${item.name} × ${item.quantity}\n`;
    });

    alert(
        "🍦 ORDER CONFIRMED!\n\n" +
        "Customer: " + customerName + "\n\n" +
        "Your Order:\n" + orderDetails +
        "\nTotal Amount: ₹" + total +
        "\n\nThank you for choosing Sweet Scoops!"
    );

    cart = [];

    document.getElementById("customer-name").value = "";

    displayCart();
}


// LOGOUT USER
function logoutUser() {
    localStorage.removeItem("sweetScoopsLoggedInUser");
    window.location.href = "login.html";
}


// INITIALIZE CART
displayCart();
