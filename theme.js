const toggleBtn = document.getElementById("themeToggle");

const themes = ["lion", "wolf", "flamingo"];
let currentThemeIndex = 0;

// Theme color palettes matching each background image
const themeColors = {
    lion: {
        light: {
            "--bg-color": "rgba(210, 140, 40, 0.45)",
            "--card-bg": "linear-gradient(145deg, rgb(160, 80, 10), rgb(120, 55, 5))",
            "--navbar-bg": "linear-gradient(135deg, rgb(220,130,20), rgb(180,100,10), rgb(140,70,5), rgb(100,60,10), rgb(200,140,30))",
            "--card-bo": "rgb(240, 180, 20)",
            "--box-sh": "4px 4px 10px rgb(100, 60, 5)",
            "--accent": "rgb(220,130,20)",
            "--sidebar-bg": "linear-gradient(160deg, rgba(200,120,15,0.97), rgba(140,70,5,0.97))",
            "--sidebar-item-bg": "rgba(255,200,80,0.18)",
            "--sidebar-item-hover": "rgba(255,200,80,0.35)",
        },
        dark: {
            "--bg-color": "rgba(30, 18, 5, 0.7)",
            "--card-bg": "linear-gradient(145deg, #2a1a05, #1a0f02)",
            "--navbar-bg": "linear-gradient(45deg, #0d0800, rgb(40,25,5), #1a1005)",
            "--card-bo": "rgba(80, 50, 10, 0.9)",
            "--box-sh": "4px 4px 12px rgb(15, 8, 1)",
            "--accent": "rgb(200,120,15)",
            "--sidebar-bg": "linear-gradient(160deg, rgba(30,18,5,0.98), rgba(15,8,2,0.98))",
            "--sidebar-item-bg": "rgba(200,120,15,0.15)",
            "--sidebar-item-hover": "rgba(200,120,15,0.3)",
        }
    },
    wolf: {
        light: {
            "--bg-color": "rgba(200, 215, 225, 0.5)",
            "--card-bg": "linear-gradient(145deg, rgb(80, 110, 140), rgb(50, 80, 110))",
            "--navbar-bg": "linear-gradient(135deg, rgb(80,110,150), rgb(60,90,130), rgb(40,70,110), rgb(30,60,100), rgb(70,100,140))",
            "--card-bo": "rgb(120, 160, 200)",
            "--box-sh": "4px 4px 10px rgb(40, 60, 90)",
            "--accent": "rgb(80,110,150)",
            "--sidebar-bg": "linear-gradient(160deg, rgba(80,110,150,0.97), rgba(40,70,110,0.97))",
            "--sidebar-item-bg": "rgba(150,190,230,0.18)",
            "--sidebar-item-hover": "rgba(150,190,230,0.35)",
        },
        dark: {
            "--bg-color": "rgba(8, 12, 20, 0.75)",
            "--card-bg": "linear-gradient(145deg, #0d1520, #060c16)",
            "--navbar-bg": "linear-gradient(45deg, #020408, rgb(10,15,25), #08101c)",
            "--card-bo": "rgba(30, 50, 80, 0.9)",
            "--box-sh": "4px 4px 12px rgb(2, 5, 12)",
            "--accent": "rgb(70,100,150)",
            "--sidebar-bg": "linear-gradient(160deg, rgba(8,12,22,0.98), rgba(3,6,14,0.98))",
            "--sidebar-item-bg": "rgba(70,100,160,0.15)",
            "--sidebar-item-hover": "rgba(70,100,160,0.3)",
        }
    },
    flamingo: {
        light: {
            "--bg-color": "rgba(255, 180, 190, 0.45)",
            "--card-bg": "linear-gradient(145deg, rgb(200, 80, 110), rgb(160, 50, 80))",
            "--navbar-bg": "linear-gradient(135deg, rgb(240,100,140), rgb(210,80,120), rgb(180,60,100), rgb(150,50,90), rgb(220,90,130))",
            "--card-bo": "rgb(255, 140, 170)",
            "--box-sh": "4px 4px 10px rgb(150, 50, 80)",
            "--accent": "rgb(230,90,130)",
            "--sidebar-bg": "linear-gradient(160deg, rgba(220,90,130,0.97), rgba(160,50,90,0.97))",
            "--sidebar-item-bg": "rgba(255,180,210,0.18)",
            "--sidebar-item-hover": "rgba(255,180,210,0.35)",
        },
        dark: {
            "--bg-color": "rgba(40, 8, 18, 0.7)",
            "--card-bg": "linear-gradient(145deg, #2d0a18, #1a0510)",
            "--navbar-bg": "linear-gradient(45deg, #0f0208, rgb(35,8,18), #1a0510)",
            "--card-bo": "rgba(90, 20, 50, 0.9)",
            "--box-sh": "4px 4px 12px rgb(20, 3, 10)",
            "--accent": "rgb(200,70,110)",
            "--sidebar-bg": "linear-gradient(160deg, rgba(40,8,18,0.98), rgba(18,3,10,0.98))",
            "--sidebar-item-bg": "rgba(180,60,100,0.15)",
            "--sidebar-item-hover": "rgba(180,60,100,0.3)",
        }
    }
};

function applyThemeColors(animal, isDark) {
    const root = document.documentElement;
    const palette = themeColors[animal]?.[isDark ? "dark" : "light"];
    if (!palette) return;
    Object.entries(palette).forEach(([key, val]) => root.style.setProperty(key, val));
}

function loadTheme() {
    const isDark = localStorage.getItem("darkMode") === "true";
    const savedAnimal = localStorage.getItem("animalTheme") || "lion";

    document.body.classList.toggle("dark-mode", isDark);
    document.body.classList.remove(...themes.map(t => t + "-theme"));
    document.body.classList.add(savedAnimal + "-theme");
    currentThemeIndex = themes.indexOf(savedAnimal);

    applyThemeColors(savedAnimal, isDark);

    if (toggleBtn) toggleBtn.innerHTML = isDark ? "☀️" : "🌙";

    updateSidebarState();
}

loadTheme();

// ── Popup menu on button click ──────────────────────────
let popupOpen = false;

function createThemePopup() {
    if (document.getElementById("themePopup")) return;
    const popup = document.createElement("div");
    popup.id = "themePopup";
    popup.innerHTML = `
        <button id="popupDarkToggle">
            <span id="popupDarkIcon">${document.body.classList.contains("dark-mode") ? "☀️" : "🌙"}</span>
            <span id="popupDarkLabel">${document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button id="popupThemeToggle">
            <span>🎨</span>
            <span id="popupThemeLabel">${capitalise(themes[(currentThemeIndex + 1) % themes.length])} Theme</span>
        </button>
    `;
    document.body.appendChild(popup);

    document.getElementById("popupDarkToggle").onclick = (e) => {
        e.stopPropagation();
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDark);
        toggleBtn.innerHTML = isDark ? "☀️" : "🌙";
        document.getElementById("popupDarkIcon").textContent = isDark ? "☀️" : "🌙";
        document.getElementById("popupDarkLabel").textContent = isDark ? "Light Mode" : "Dark Mode";
        const animal = localStorage.getItem("animalTheme") || "lion";
        applyThemeColors(animal, isDark);
        updateSidebarState();
        closePopup();
    };

    document.getElementById("popupThemeToggle").onclick = (e) => {
        e.stopPropagation();
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        document.body.classList.remove(...themes.map(t => t + "-theme"));
        document.body.classList.add(newTheme + "-theme");
        localStorage.setItem("animalTheme", newTheme);
        const isDark = document.body.classList.contains("dark-mode");
        applyThemeColors(newTheme, isDark);
        document.getElementById("popupThemeLabel").textContent =
            capitalise(themes[(currentThemeIndex + 1) % themes.length]) + " Theme";
        updateSidebarState();
        closePopup();
    };

    positionPopup();
}

function positionPopup() {
    const popup = document.getElementById("themePopup");
    if (!popup || !toggleBtn) return;
    const rect = toggleBtn.getBoundingClientRect();
    popup.style.top = (rect.bottom + 10 + window.scrollY) + "px";
    popup.style.left = (rect.left + rect.width / 2) + "px";
    popup.style.transform = "translateX(-50%)";
}

function closePopup() {
    const popup = document.getElementById("themePopup");
    if (popup) { popup.remove(); popupOpen = false; }
}

toggleBtn.onclick = (e) => {
    e.stopPropagation();
    if (popupOpen) { closePopup(); return; }
    popupOpen = true;
    createThemePopup();
};

document.addEventListener("click", () => closePopup());

function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Sidebar state sync ───────────────────────────────────
function updateSidebarState() {
    const isDark = document.body.classList.contains("dark-mode");
    const animal = localStorage.getItem("animalTheme") || "lion";

    // Dark mode toggle in sidebar
    const sidebarDarkToggle = document.getElementById("sidebarDarkToggle");
    if (sidebarDarkToggle) {
        sidebarDarkToggle.checked = isDark;
    }

    // Theme selector in sidebar
    const themeOptions = document.querySelectorAll(".sidebar-theme-option");
    themeOptions.forEach(opt => {
        opt.classList.toggle("active-theme", opt.dataset.theme === animal);
    });

    // Category in sidebar
    const sidebarCategory = document.getElementById("sidebarCategory");
    if (sidebarCategory && typeof currentCategory !== "undefined") {
        sidebarCategory.value = currentCategory;
    }
}