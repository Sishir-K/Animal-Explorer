document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("currentUser");

    if (!user) {
        document.body.innerHTML = `
            <div style="
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                flex-direction:column;
                color:white;
                background: #0a0a0a;
            ">
                <h2 style="font-size:4rem;margin-bottom:5px;">🔒 Login Required</h2>
                <p style="font-size:1.5rem;margin:0 0 20px 0">Please login to view animal details</p>
                <button id="loadingBtn" onclick="window.location.href='index.html'">
                    Go to Home
                </button>
            </div>
        `;
        return;
    }

    const params = new URLSearchParams(window.location.search);
    let name = params.get("name");
    if (!name) return;
    name = name.toLowerCase().trim();

    // View counter
    let views = JSON.parse(localStorage.getItem("animalViews") || "{}");
    views[name] = (views[name] || 0) + 1;
    localStorage.setItem("animalViews", JSON.stringify(views));

    fetch(`animals/${name}/info.json`)
        .then(res => res.json())
        .then(data => {
            // Name
            document.getElementById("animalName").innerText = data.name || name;

            // Scientific name
            document.getElementById("animalScientific").innerText =
                data.scientific_name ? `( ${data.scientific_name} )` : "";

            // Status badge
            const statusBadge = document.getElementById("statusBadge");
            const cat = (data.category || "Normal").toLowerCase();
            statusBadge.textContent = data.category || "Normal";
            statusBadge.className = "status-badge status-" + cat;

            // Views badge
            const viewCount = views[name];
            document.getElementById("animalViews").textContent =
                `${viewCount} ${viewCount === 1 ? "view" : "views"}`;

            // Description
            document.getElementById("animalDesc").innerText =
                data.description || "No description available.";

            // Stats — plain text values (labels are in HTML)
            document.getElementById("animalHabitat").textContent =
                data.habitat || "Unknown";

            document.getElementById("animalDiet").textContent =
                data.diet || "Unknown";

            if (data.lifespan) {
                document.getElementById("animalLifespanWild").textContent =
                    data.lifespan.wild || "Unknown";
                document.getElementById("animalLifespanProtected").textContent =
                    data.lifespan.protected || "Unknown";
            } else {
                document.getElementById("animalLifespanWild").textContent = "Unknown";
                document.getElementById("animalLifespanProtected").textContent = "Unknown";
            }

            // Breeds — rendered as pill tags
            const breedsEl = document.getElementById("animalBreeds");
            if (data.breeds && data.breeds.length > 0) {
                breedsEl.innerHTML = data.breeds
                    .map(b => `<span class="breed-pill">${b}</span>`)
                    .join("");
            } else {
                breedsEl.innerHTML = `<span class="breed-pill breed-na">Not available</span>`;
            }

            // ── Gallery ──────────────────────────────────
            const mainImage    = document.getElementById("mainImage");
            const thumbnailsDiv = document.getElementById("thumbnails");
            const modal        = document.getElementById("imageModal");
            const modalImg     = document.getElementById("modalImg");
            const closeBtn     = document.getElementById("closeImage");
            const prevBtn      = document.getElementById("prevBtn");
            const nextBtn      = document.getElementById("nextBtn");
            const scrollAmount = 130;

            mainImage.onclick = () => {
                modal.style.display = "flex";
                modalImg.src = mainImage.src;
            };
            closeBtn.onclick = () => modal.style.display = "none";
            modal.onclick    = () => modal.style.display = "none";

            const images = data.images || [];
            if (images.length === 0) { mainImage.style.display = "none"; return; }

            mainImage.src = `animals/${name}/${images[0]}`;

            images.forEach((imgName, index) => {
                const thumb = document.createElement("img");
                thumb.src = `animals/${name}/${imgName}`;
                if (index === 0) thumb.classList.add("active");

                thumb.onclick = () => {
                    mainImage.classList.add("fade");
                    setTimeout(() => {
                        mainImage.src = thumb.src;
                        mainImage.classList.remove("fade");
                    }, 150);
                    thumbnailsDiv.querySelectorAll("img")
                        .forEach(img => img.classList.remove("active"));
                    thumb.classList.add("active");
                };

                thumb.addEventListener("dblclick", () => {
                    modal.style.display = "flex";
                    modalImg.src = thumb.src;
                });

                thumbnailsDiv.appendChild(thumb);
            });

            prevBtn.addEventListener("click", () =>
                thumbnailsDiv.scrollBy({ left: -scrollAmount, behavior: "smooth" }));
            nextBtn.addEventListener("click", () =>
                thumbnailsDiv.scrollBy({ left: scrollAmount, behavior: "smooth" }));

            function updateButtons() {
                const overflow = thumbnailsDiv.scrollWidth > thumbnailsDiv.clientWidth;
                prevBtn.style.display = overflow ? "block" : "none";
                nextBtn.style.display = overflow ? "block" : "none";
            }
            function updateButtonState() {
                prevBtn.disabled = thumbnailsDiv.scrollLeft <= 0;
                nextBtn.disabled =
                    thumbnailsDiv.scrollLeft + thumbnailsDiv.clientWidth >=
                    thumbnailsDiv.scrollWidth;
            }
            updateButtonState();
            updateButtons();
            thumbnailsDiv.addEventListener("scroll", updateButtonState);
            window.addEventListener("resize", updateButtons);
        })
        .catch(() => {
            const desc = document.getElementById("animalDesc");
            if (desc) desc.innerText = "Failed to load data.";
        });

    // Search/filter redirect from animal page
    const searchInput    = document.getElementById("search");
    const categoryFilter = document.getElementById("categoryFilter");

    if (searchInput && categoryFilter) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const q = searchInput.value.trim();
                const cat = categoryFilter.value;
                window.location.href = `index.html?search=${encodeURIComponent(q)}&category=${cat}`;
            }
        });
        categoryFilter.addEventListener("change", () => {
            const q = searchInput.value.trim();
            const cat = categoryFilter.value;
            window.location.href = `index.html?search=${encodeURIComponent(q)}&category=${cat}`;
        });
    }
});