const toggleBtn = document.getElementById("themeToggle");

// Apply saved theme on load
function loadTheme() {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
        document.body.classList.add("dark-mode");
        if (toggleBtn) toggleBtn.innerHTML = "☀️";
    } else {
        document.body.classList.remove("dark-mode");
        if (toggleBtn) toggleBtn.innerHTML = "🌙";
    }
}

loadTheme();

if (toggleBtn) {
    toggleBtn.onclick = () => {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        localStorage.setItem("theme", isDark ? "dark" : "light");

        toggleBtn.innerHTML = isDark ? "☀️" : "🌙";
    };
}