// SWEET SCOOPS ADMIN LOGIN
// Demonstration only — not secure for a real website.

const adminLoginForm = document.getElementById("admin-login-form");

adminLoginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("admin-username").value.trim();
    const password = document.getElementById("admin-password").value;
    const message = document.getElementById("message");

    // Demo credentials
    const adminUsername = "admin";
    const adminPassword = "onkar123";

    if (username === adminUsername && password === adminPassword) {
        sessionStorage.setItem("sweetScoopsAdminLoggedIn", "true");

        message.style.color = "green";
        message.textContent = "Login successful! Opening dashboard...";

        setTimeout(function () {
            window.location.href = "admin.html";
        }, 800);
    } else {
        message.style.color = "red";
        message.textContent = "Invalid admin username or password!";
    }
});
