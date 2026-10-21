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

async function placeOrder() {
    const customerName =
        document.getElementById("customer-name").value.trim();

    if (!customerName) {
        alert("Please enter your name.");
        return;
    }

    if (cart.length === 0) {
        alert("Please add ice cream to your cart.");
        return;
    }

    const order = {
        customerName: customerName,

        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),

        total: cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        )
    };

    try {
        const response = await fetch(
            "http://localhost:8080/api/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(order)
            }
        );

        if (!response.ok) {
            throw new Error("Order could not be saved.");
        }

        const result = await response.json();

        alert(
            "Order placed successfully! Order ID: " + result.id
        );

        cart = [];

        document.getElementById("customer-name").value = "";

        displayCart();

    } catch (error) {
        alert(
            "Could not connect to the backend. " +
            "Please make sure the Spring Boot server is running."
        );
    }
}

displayCart();
