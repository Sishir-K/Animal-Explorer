// FAKE DATABASE 
const animals = [
    // Normal (30)
    { name: "Bear", folder: "bear" },
    { name:"Buffalo", folder: "buffalo"},
    { name: "Cat", folder: "cat" },
    { name: "Cow", folder: "cow" },
    { name: "Deer", folder: "deer" },
    { name: "Dog", folder: "dog" },
    { name: "Dolphin", folder: "dolphin" },
    { name: "Duck", folder: "duck" },
    { name: "Eagle", folder: "eagle" },
    { name: "Flamingo", folder: "flamingo" },
    { name: "Fox", folder: "fox" },
    { name: "Giraffe", folder: "giraffe" },
    { name: "Goat", folder: "goat" },
    { name: "Hawk", folder: "hawk" },
    { name: "Hedgehog", folder: "hedgehog" },
    { name: "Horse", folder: "horse" },
    { name: "Leopard", folder: "leopard"},
    { name: "Lion", folder: "lion"},
    { name: "Meerkat", folder: "meerkat" },
    { name: "Owl", folder: "owl" },
    { name: "Parrot", folder: "parrot" },
    { name: "Penguin", folder: "penguin" },
    { name: "Pig", folder: "pig" },
    { name: "Platypus", folder: "platypus" },
    { name: "Rabbit", folder: "rabbit" },
    { name: "Shark", folder: "shark" },
    { name: "Sheep", folder: "sheep" },
    { name: "Squirrel", folder: "squirrel" },
    { name: "Swan", folder: "swan" },
    { name: "Whale", folder: "whale" },
    { name: "Wolf", folder: "wolf" },
    { name: "Zebra", folder: "zebra" },

    // Endangered (23)
    { name: "Axolotl", folder: "axolotl" },
    { name: "Albatross", folder: "albatross"},
    { name: "Amur Leopard", folder: "amur_leopard" },
    { name: "Black Rhino", folder: "black_rhino" },
    { name: "Blue Whale", folder: "blue_whale" },
    { name: "Cheetah", folder: "cheetah" },
    { name: "Cross River Gorilla", folder: "cross_river_gorilla" },
    { name: "Giant Otter", folder: "giant_otter" },
    { name: "Gorilla", folder: "gorilla" },
    { name: "Hawksbill Turtle", folder: "hawksbill_turtle" },
    { name: "Kakapo", folder: "kakapo" },
    { name: "Orangutan", folder: "orangutan" },
    { name: "Panda", folder: "panda" },
    { name: "Philippine Eagle", folder: "philippine_eagle" },
    { name: "Polar Bear", folder: "polar_bear" },
    { name: "Rhino", folder: "rhino" },
    { name: "Saola", folder: "saola" },
    { name: "Snow Leopard", folder: "snow_leopard" },
    { name: "Sumatran Elephant", folder: "sumatran_elephant" },
    { name: "Tapir", folder: "tapir" },
    { name: "Tiger", folder: "tiger" },
    { name: "Vaquita", folder: "vaquita" },
    { name: "White Tiger", folder: "white_tiger" },

    // Extinct (20)
    { name: "Auroch", folder: "auroch" },
    { name: "Brachiosaurus", folder: "brachiosaurus" },
    { name: "Dodo", folder: "dodo" },
    { name: "Great Auk", folder: "great_auk" },
    { name: "Haast Eagle", folder: "haast_eagle" },
    { name: "Irish Elk", folder: "irish_elk" },
    { name: "Mammoth", folder: "mammoth" },
    { name: "Megalodon", folder: "megalodon" },
    { name: "Moa", folder: "moa" },
    { name: "Passenger Pigeon", folder: "passenger_pigeon" },
    { name: "Pterodactyl", folder: "pterodactyl" },
    { name: "Pyrenean Ibex", folder: "pyrenean_ibex" },
    { name: "Quagga", folder: "quagga" },
    { name: "Saber-Toothed Cat", folder: "saber_toothed_cat" },
    { name: "Spinosaurus", folder: "spinosaurus" },
    { name: "Stegosaurus", folder: "stegosaurus" },
    { name: "Thylacine", folder: "thylacine" },
    { name: "T-Rex", folder: "trex" },
    { name: "Triceratops", folder: "triceratops" },
    { name: "Velociraptor", folder: "velociraptor" }
];

const endangered = ["albatross","amur_leopard","axolotl", "black_rhino", "blue_whale", "cheetah", "cross_river_gorilla", "giant_otter", "gorilla", "hawksbill_turtle", "kakapo", "orangutan", "panda", "philippine_eagle", "polar_bear", "rhino", "saola", "snow_leopard", "sumatran_elephant", "tapir", "tiger", "vaquita", "white_tiger"];
const extinct = ["auroch", "brachiosaurus", "dodo", "great_auk", "haast_eagle", "irish_elk", "mammoth", "megalodon", "moa", "passenger_pigeon", "pterodactyl", "pyrenean_ibex", "quagga", "saber_toothed_cat", "spinosaurus", "stegosaurus", "thylacine", "trex", "triceratops", "velociraptor"];

let currentCategory = "all";

function loadPopularAnimals() {
    const views = JSON.parse(localStorage.getItem("animalViews") || "{}");

    const sorted = Object.entries(views)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const popularContainer = document.getElementById("popularContainer");
    if (!popularContainer) return;

    popularContainer.innerHTML = "";

    let rank = 0;
    let lastViews = -1;
    let nextRank = 1;

    sorted.forEach(([name, count]) => {

        if (count !== lastViews) rank = nextRank;
        lastViews = count;
        nextRank++;

        let medal = "";
        if (rank === 1) medal = `<span class="medal gold">1</span>`;
        else if (rank === 2) medal = `<span class="medal silver">2</span>`;
        else if (rank === 3) medal = `<span class="medal bronze">3</span>`;
        else medal = `<span class="medal normal">${rank}</span>`;

        const imgFile = `${name}.jpg`;
        const displayName = name
            .replace(/_/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase());

        popularContainer.insertAdjacentHTML("beforeend", `
            <div class="card">
                ${medal}
                <a href="animal.html?name=${name}">
                    <img src="animals/${name}/${imgFile}" alt="${displayName}">
                    <h3>${displayName}</h3>
                    <p>${count} ${count === 1 ? "view" : "views"}</p>
                </a>
            </div>
        `);
    });
}

function loadAllAnimals() {
    const animalContainer = document.getElementById("animalContainer");
    if (!animalContainer) return;

    animalContainer.innerHTML = "";

    animals.forEach(animal => {
        const cardHTML = `
        <div class="card">
            <a href="animal.html?name=${animal.folder}">
                <img src="animals/${animal.folder}/${animal.folder}.jpg">
                <h3>${animal.name}</h3>
            </a>
        </div>
        `;

        if (extinct.includes(animal.folder))
            document.getElementById("extinctContainer")?.insertAdjacentHTML("beforeend", cardHTML);
        else if (endangered.includes(animal.folder))
            document.getElementById("endangeredContainer")?.insertAdjacentHTML("beforeend", cardHTML);
        else
            animalContainer.insertAdjacentHTML("beforeend", cardHTML);
    });
}

function applyFilters() {
    const searchInput = document.getElementById("search");
    const query = searchInput.value.toLowerCase();
    const cat = currentCategory;

    document.querySelectorAll(".card").forEach(card => {
        const name = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const link = card.querySelector("a")?.href || "";
        const folder = link.split("name=")[1] || "";

        const matchesSearch = name.includes(query);

        let matchesCat = true;
        if (cat === "endangered") matchesCat = endangered.includes(folder);
        else if (cat === "extinct") matchesCat = extinct.includes(folder);
        else if (cat === "normal") matchesCat = !endangered.includes(folder) && !extinct.includes(folder);

        card.style.display = (matchesSearch && matchesCat) ? "" : "none";
    });

    document.querySelectorAll(".animal-sections section").forEach(section => {
        const visibleCards = Array.from(section.querySelectorAll(".card"))
            .filter(card => card.style.display !== "none");
        section.style.display = visibleCards.length > 0 ? "" : "none";
    });
}

function setupCustomDropdown() {
    const dropdown = document.getElementById("categoryFilter");
    if (!dropdown) return;

    const selectedDisplay = dropdown.querySelector(".selected-value");
    const optionsList = dropdown.querySelector(".options-list");
    const options = dropdown.querySelectorAll(".option");

    // Toggle open/close
    dropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("open");
    });

    // Select an option
    options.forEach(option => {
        option.addEventListener("click", (e) => {
            e.stopPropagation();

            const value = option.getAttribute("data-value");
            const label = option.textContent;

            // Update display text
            selectedDisplay.textContent = label;

            // Update active style
            options.forEach(o => o.classList.remove("active"));
            option.classList.add("active");

            // Update the JS variable and re-filter
            currentCategory = value;
            dropdown.classList.remove("open");
            applyFilters();
        });
    });

    // Close when clicking outside
    document.addEventListener("click", () => {
        dropdown.classList.remove("open");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadPopularAnimals();
    loadAllAnimals();
    setupCustomDropdown();

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", applyFilters);

    // Handles URL params 
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    const categoryParam = params.get("category");

    if (searchParam) {
        searchInput.value = searchParam;
    }

    if (categoryParam) {
        currentCategory = categoryParam;

        const dropdown = document.getElementById("categoryFilter");
        if (dropdown) {
            const matchingOption = dropdown.querySelector(`.option[data-value="${categoryParam}"]`);
            if (matchingOption) {
                dropdown.querySelector(".selected-value").textContent = matchingOption.textContent;
                matchingOption.classList.add("active");
            }
        }
    }

    applyFilters();
});
