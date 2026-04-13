loginBtn.onclick = () => {
    const user = localStorage.getItem("currentUser");

    if (user) {
        localStorage.removeItem("currentUser");
        alert("Logged out");
        location.reload();
    } else {
        modal.style.display = "flex";
    }
};
const modal = document.getElementById("authModal");
const closeModal = document.getElementById("closeModal");

const submitBtn = document.getElementById("submitBtn");
const toggleForm = document.getElementById("toggleForm");
const formTitle = document.getElementById("formTitle");
const toggleText = document.getElementById("toggleText");

let isLogin = true;
const currentUser = localStorage.getItem("currentUser");

if (currentUser) {
    loginBtn.innerText = currentUser;
}

loginBtn.onclick = () => {
    const user = localStorage.getItem("currentUser");

    if (user) {
        localStorage.removeItem("currentUser");
        alert("Logged out");
        location.reload();
    } else {
        modal.style.display = "flex";
    }
};

closeModal.onclick = () => modal.style.display = "none";

function toggleMode() {
    isLogin = !isLogin;

    if (isLogin) {
        formTitle.innerText = "Login";
        submitBtn.innerText = "Login";
        toggleText.innerHTML =
            `Don't have an account? <span id="toggleForm">Register</span>`;
    } else {
        formTitle.innerText = "Register";
        submitBtn.innerText = "Register";
        toggleText.innerHTML =
            `Already have an account? <span id="toggleForm">Login</span>`;
    }

    document.getElementById("toggleForm").onclick = toggleMode;
}

toggleForm.onclick = toggleMode;

submitBtn.onclick = () => {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!user || !pass) {
        alert("Fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "{}");

    if (isLogin) {
        if (users[user] === pass) {
            localStorage.setItem("currentUser", user);
            loginBtn.innerText = user;
            alert("Login successful");
            modal.style.display = "none";
        } else {
            alert("Invalid credentials");
        }
    } else {
        if (users[user]) {
            alert("User already exists");
        } else {
            users[user] = pass;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registered successfully");
        }
    }
};