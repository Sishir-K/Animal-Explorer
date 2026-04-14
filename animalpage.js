document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    let name = params.get("name");

    if (!name) return;

    name = name.toLowerCase().trim();
    /* VIEWS BASED ON SERVER
    let views = JSON.parse(localStorage.getItem("animalViews") || "{}");
    let viewed = JSON.parse(localStorage.getItem("viewedAnimals") || "[]");
    if (!viewed.includes(name)) {
        views[name] = (views[name] || 0) + 1;
        viewed.push(name);

        localStorage.setItem("animalViews", JSON.stringify(views));
        localStorage.setItem("viewedAnimals", JSON.stringify(viewed));
    }*/
    let views = JSON.parse(localStorage.getItem("animalViews") || "{}");
    views[name] = (views[name] || 0) + 1;
    localStorage.setItem("animalViews", JSON.stringify(views));

    fetch(`animals/${name}/info.json`)
        .then(res => res.json())
        .then(data => {

            document.getElementById("animalName").innerText = data.name;

            document.getElementById("animalScientific").innerHTML =
                `<strong>(</strong> ${data.scientific_name || "Unknown"}<strong>)</strong>`;

            document.getElementById("animalDesc").innerText =
                data.description || "No description available.";

            document.getElementById("animalStatus").innerHTML =
                `<strong>Status:</strong> ${data.category || "Unknown"}`;

            document.getElementById("animalHabitat").innerHTML =
                `<strong>Habitat:</strong> ${data.habitat || "Unknown"}`;

            document.getElementById("animalDiet").innerHTML =
                `<strong>Diet:</strong> ${data.diet || "Unknown"}`;

            const lifespan = data.lifespan ? `Wild: ${data.lifespan.wild}, Protected: ${data.lifespan.protected}`
                : "Unknown";

            document.getElementById("animalLifespan").innerHTML =
                `<strong>Lifespan:</strong> ${lifespan}`;

            const breeds = data.breeds && data.breeds.length > 0
                ? data.breeds.join(", ") : "Not available";

            document.getElementById("animalBreeds").innerHTML =
                `<strong>Breeds / Species:</strong> ${breeds}`;

            const mainImage = document.getElementById("mainImage");
            const thumbnailsDiv = document.getElementById("thumbnails");
            const modal = document.getElementById("imageModal");
            const modalImg = document.getElementById("modalImg");
            const closeBtn = document.getElementById("closeImage");

            const prevBtn = document.getElementById("prevBtn");
            const nextBtn = document.getElementById("nextBtn");
            const scrollAmount = 100;


            mainImage.onclick = () => {
                modal.style.display = "flex";
                modalImg.src = mainImage.src;
            };
            closeBtn.onclick = () => {
                modal.style.display = "none";
            };
            modal.onclick = () => {
                modal.style.display = "none";
            };

            const images = data.images || [];

            if (images.length === 0) {
                mainImage.style.display = "none";
                return;
            }
            mainImage.src = `/animals/${name}/${images[0]}`;

            images.forEach((imgName, index) => {
                const thumb = document.createElement("img");
                thumb.src = `/animals/${name}/${imgName}`;

                if (index === 0) thumb.classList.add("active");

                thumb.onclick = () => {
                    mainImage.classList.add("fade");

                    setTimeout(() => {
                        mainImage.src = thumb.src;
                        mainImage.classList.remove("fade");
                    }, 150);
                    document.querySelectorAll(".thumbnails img")
                        .forEach(img => img.classList.remove("active"));

                    thumb.classList.add("active");

                    const modal = document.getElementById("imageModal");
                    const modalImg = document.getElementById("modalImg");
                    const closeBtn = document.getElementById("closeImage");

                    thumb.addEventListener("dblclick", () => {
                        modal.style.display = "flex";
                        modalImg.src = thumb.src;
                    });

                    closeBtn.onclick = () => modal.style.display = "none";
                    modal.onclick = () => modal.style.display = "none";
                };

                thumbnailsDiv.appendChild(thumb);
            });
            prevBtn.addEventListener("click", () => {
                thumbnailsDiv.scrollBy({
                    left: -scrollAmount,
                    behavior: "smooth"
                });
            })
            nextBtn.addEventListener("click", () => {
                thumbnailsDiv.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth"
                });
            });
            function updateButtons() {
                const isOverflowing =
                    thumbnailsDiv.scrollWidth > thumbnailsDiv.clientWidth;

                prevBtn.style.display = isOverflowing ? "block" : "none";
                nextBtn.style.display = isOverflowing ? "block" : "none";
            }
            function updateButtonState() {
                prevBtn.disabled = thumbnailsDiv.scrollLeft <= 0;
                nextBtn.disabled =
                    thumbnailsDiv.scrollLeft + thumbnailsDiv.clientWidth >=
                    thumbnailsDiv.scrollWidth;
            }

            updateButtonState();
            thumbnailsDiv.addEventListener("scroll", updateButtonState);

            updateButtons();
            window.addEventListener("resize", updateButtons);
        })
        .catch(() => {
            document.getElementById("animalDesc").innerText = "Failed to load data.";
        });

    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("categoryFilter");

    if (searchInput && categoryFilter) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const query = searchInput.value.trim();
                const category = categoryFilter.value;

                window.location.href = `index.html?search=${query}&category=${category}`;
            }
        });

        categoryFilter.addEventListener("change", () => {
            const query = searchInput.value.trim();
            const category = categoryFilter.value;

            window.location.href = `index.html?search=${query}&category=${category}`;
        });
    }

});
