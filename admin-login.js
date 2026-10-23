document.addEventListener("DOMContentLoaded", function () {

    const adminLoginForm = document.getElementById("admin-login-form");

    adminLoginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username = document.getElementById("admin-username").value.trim();
        const password = document.getElementById("admin-password").value;
        const message = document.getElementById("message");

        if (username === "admin" && password === "onkar123") {

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

});
