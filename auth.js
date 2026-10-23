// SWEET SCOOPS AUTHENTICATION

// USER REGISTRATION
const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const message = document.getElementById("message");

        if (username.length < 3) {
            message.textContent = "Username must have at least 3 characters.";
            message.style.color = "red";
            return;
        }

        if (password.length < 6) {
            message.textContent = "Password must have at least 6 characters.";
            message.style.color = "red";
            return;
        }

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match!";
            message.style.color = "red";
            return;
        }

        const users = JSON.parse(localStorage.getItem("sweetScoopsUsers") || "[]");

        const existingUser = users.find(function (user) {
            return user.username.toLowerCase() === username.toLowerCase();
        });

        if (existingUser) {
            message.textContent = "Username already exists!";
            message.style.color = "red";
            return;
        }

        users.push({
            username: username,
            password: password
        });

        localStorage.setItem("sweetScoopsUsers", JSON.stringify(users));

        message.style.color = "green";
        message.textContent = "Registration successful! Redirecting to login...";

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1500);
    });
}


// USER LOGIN
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        const users = JSON.parse(localStorage.getItem("sweetScoopsUsers") || "[]");

        const matchedUser = users.find(function (user) {
            return user.username.toLowerCase() === username.toLowerCase()
                && user.password === password;
        });

        if (matchedUser) {
            localStorage.setItem("sweetScoopsLoggedInUser", matchedUser.username);

            message.style.color = "green";
            message.textContent = "Login successful! Opening shop...";

            setTimeout(function () {
                window.location.href = "shop.html";
            }, 1000);

        } else {
            message.style.color = "red";
            message.textContent = "Invalid username or password!";
        }
    });
}


// LOGOUT FUNCTION
function sweetScoopsLogout() {
    localStorage.removeItem("sweetScoopsLoggedInUser");
    window.location.href = "login.html";
}
