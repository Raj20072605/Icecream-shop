let cart = [];

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

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalElement = document.getElementById("total");

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

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
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

displayCart();
