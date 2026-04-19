// ═══════════════════════════════════════════════════════
//  sidebar.js  —  Animal Explorer accessibility sidebar
// ═══════════════════════════════════════════════════════

(function () {
    const sidebar        = document.getElementById("sidebar");
    const overlay        = document.getElementById("sidebarOverlay");
    const toggleBtn      = document.getElementById("sidebarToggle");
    const closeBtn       = document.getElementById("closeSidebar");

    if (!sidebar) return;

    // ── Open / Close ─────────────────────────────────────
    function openSidebar()  {
        sidebar.classList.add("sidebar-open");
        overlay.classList.add("overlay-show");
        document.body.style.overflow = "hidden";
    }
    function closeSidebar() {
        sidebar.classList.remove("sidebar-open");
        overlay.classList.remove("overlay-show");
        document.body.style.overflow = "";
    }

    toggleBtn?.addEventListener("click", (e) => { e.stopPropagation(); openSidebar(); });
    closeBtn?.addEventListener("click", closeSidebar);
    overlay?.addEventListener("click", closeSidebar);

    // ── Dark Mode Toggle ─────────────────────────────────
    const darkToggle = document.getElementById("sidebarDarkToggle");
    if (darkToggle) {
        // Sync initial state
        darkToggle.checked = document.body.classList.contains("dark-mode");

        darkToggle.addEventListener("change", () => {
            const isDark = darkToggle.checked;
            document.body.classList.toggle("dark-mode", isDark);
            localStorage.setItem("darkMode", isDark);

            const mainToggleBtn = document.getElementById("themeToggle");
            if (mainToggleBtn) mainToggleBtn.innerHTML = isDark ? "☀️" : "🌙";

            const animal = localStorage.getItem("animalTheme") || "lion";
            if (typeof applyThemeColors === "function") applyThemeColors(animal, isDark);
        });
    }

    // ── Theme Option Buttons ──────────────────────────────
    const themeOptions = document.querySelectorAll(".sidebar-theme-option");
    const savedAnimal  = localStorage.getItem("animalTheme") || "lion";

    themeOptions.forEach(btn => {
        // Mark the active one on load
        if (btn.dataset.theme === savedAnimal) btn.classList.add("active-theme");

        btn.addEventListener("click", () => {
            const newTheme = btn.dataset.theme;
            const allThemes = ["lion", "wolf", "flamingo"];

            document.body.classList.remove(...allThemes.map(t => t + "-theme"));
            document.body.classList.add(newTheme + "-theme");
            localStorage.setItem("animalTheme", newTheme);

            themeOptions.forEach(o => o.classList.remove("active-theme"));
            btn.classList.add("active-theme");

            const isDark = document.body.classList.contains("dark-mode");
            if (typeof applyThemeColors === "function") applyThemeColors(newTheme, isDark);

            // sync main toggle index
            if (typeof themes !== "undefined" && typeof currentThemeIndex !== "undefined") {
                window.currentThemeIndex = allThemes.indexOf(newTheme);
            }
        });
    });

    // ── Category buttons (index page only) ──────────────
    const catBtns = document.querySelectorAll(".sidebar-cat-btn");
    catBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const val = btn.dataset.value;

            // If on index page, trigger category change
            if (typeof currentCategory !== "undefined" && typeof applyFilters === "function") {
                window.currentCategory = val;
                applyFilters();

                // Also update main navbar dropdown display
                const mainDropdown = document.getElementById("categoryFilter");
                if (mainDropdown) {
                    const selectedDisp = mainDropdown.querySelector(".selected-value");
                    if (selectedDisp) selectedDisp.textContent = btn.textContent.replace(/[⚠️🦴]/g, "").trim();
                    mainDropdown.querySelectorAll(".option").forEach(o => {
                        o.classList.toggle("active", o.dataset.value === val);
                    });
                }
            } else if (window.location.pathname.includes("animal.html")) {
                // On animal page, redirect to index with category param
                const q = document.getElementById("sidebarSearch")?.value.trim() || "";
                window.location.href = `index.html?search=${encodeURIComponent(q)}&category=${val}`;
            }

            catBtns.forEach(b => b.classList.remove("active-cat"));
            btn.classList.add("active-cat");
            closeSidebar();
        });
    });

    // ── Search from sidebar ───────────────────────────────
    const sidebarSearch = document.getElementById("sidebarSearch");
    if (sidebarSearch) {
        // Sync with main search bar
        const mainSearch = document.getElementById("search");
        if (mainSearch) sidebarSearch.value = mainSearch.value;

        sidebarSearch.addEventListener("input", () => {
            const mainSearch = document.getElementById("search");
            if (mainSearch) {
                mainSearch.value = sidebarSearch.value;
                if (typeof applyFilters === "function") applyFilters();
            }
        });

        sidebarSearch.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                if (window.location.pathname.includes("animal.html")) {
                    const q = sidebarSearch.value.trim();
                    window.location.href = `index.html?search=${encodeURIComponent(q)}`;
                } else {
                    closeSidebar();
                }
            }
        });
    }

    // ── Sidebar auth button ───────────────────────────────
    const sidebarAuthBtn  = document.getElementById("sidebarAuthBtn");
    const sidebarUserInfo = document.getElementById("sidebarUserInfo");

    function syncSidebarAuth() {
        const user = localStorage.getItem("currentUser");
        if (!sidebarAuthBtn || !sidebarUserInfo) return;
        if (user) {
            sidebarAuthBtn.style.display = "none";
            sidebarUserInfo.style.display = "flex";
            sidebarUserInfo.innerHTML = `
                <span class="sidebar-username">👤 ${user}</span>
                <button class="sidebar-logout-btn" id="sidebarLogout">Log Out</button>
            `;
            document.getElementById("sidebarLogout")?.addEventListener("click", () => {
                localStorage.removeItem("currentUser");
                location.reload();
            });
        } else {
            sidebarAuthBtn.style.display = "block";
            sidebarUserInfo.style.display = "none";
        }
    }

    sidebarAuthBtn?.addEventListener("click", () => {
        closeSidebar();
        // Open main auth modal
        const modal = document.getElementById("authModal");
        if (modal) modal.style.display = "flex";
    });

    syncSidebarAuth();

    // ── Keyboard accessibility (Escape to close) ─────────
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeSidebar();
    });

})();