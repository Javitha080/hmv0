// Initialize AOS
AOS.init();

let allItems = [];
let currentPage = 1;
const itemsPerPage = 6;

async function fetchNewsData() {
    const loader = document.getElementById("loader");
    if(loader) loader.classList.remove("hidden");

    try {
        const response = await fetch('/api/news');
        allItems = await response.json();
        renderItems();
    } catch (error) {
        console.error('Failed to fetch news:', error);
        showNotification("Failed to load news.");
    } finally {
        if(loader) loader.classList.add("hidden");
    }
}

function renderItems(filter = "all", query = "") {
  let filteredItems = [...allItems];

  if (filter !== "all") {
    filteredItems = filteredItems.filter(item => item.category === filter);
  }

  if (query) {
    const q = query.toLowerCase();
    filteredItems = filteredItems.filter(item =>
      item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    );
  }

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(start, start + itemsPerPage);

  const grid = document.getElementById("grid");
  if (!grid) return;

  grid.innerHTML = "";

  if (paginatedItems.length === 0) {
    showNotification("No items found.");
  }

  paginatedItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.setAttribute("data-aos", "fade-up");
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <div class="glass backdrop-blur-md rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300" onclick='showModal(${JSON.stringify(item)})'>
        <img src="${item.image}" alt="${item.title}" class="w-full h-40 object-cover">
        <div class="p-4">
          <h3 class="font-semibold text-lg">${item.title}</h3>
          <p class="text-sm mt-1 line-clamp-2">${item.description}</p>
          <span class="text-xs text-gray-500 dark:text-gray-400 mt-2 block">${new Date(item.date).toLocaleDateString()}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  updatePagination(filteredItems.length);
  if(typeof feather !== 'undefined') feather.replace();
}

function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageInfo = document.getElementById("pageInfo");
  const prevPage = document.getElementById("prevPage");
  const nextPage = document.getElementById("nextPage");

  if(pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  if(prevPage) prevPage.disabled = currentPage === 1;
  if(nextPage) nextPage.disabled = currentPage === totalPages;
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentPage = 1;
    const searchInput = document.getElementById("searchInput");
    renderItems(btn.dataset.filter, searchInput ? searchInput.value : "");
  });
});

const searchInput = document.getElementById("searchInput");
if(searchInput) {
    searchInput.addEventListener("input", e => {
        currentPage = 1;
        const activeFilter = document.querySelector(".filter-btn.active");
        renderItems(activeFilter ? activeFilter.dataset.filter : 'all', e.target.value);
    });
}


const prevPage = document.getElementById("prevPage");
if(prevPage) {
    prevPage.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            const activeFilter = document.querySelector(".filter-btn.active");
            const searchInput = document.getElementById("searchInput");
            renderItems(activeFilter ? activeFilter.dataset.filter : 'all', searchInput ? searchInput.value : "");
        }
    });
}

const nextPage = document.getElementById("nextPage");
if(nextPage) {
    nextPage.addEventListener("click", () => {
        const totalPages = Math.ceil(allItems.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            const activeFilter = document.querySelector(".filter-btn.active");
            const searchInput = document.getElementById("searchInput");
            renderItems(activeFilter ? activeFilter.dataset.filter : 'all', searchInput ? searchInput.value : "");
        }
    });
}


// Modal functions
function showModal(item) {
  const modal = document.getElementById("modal");
  if(!modal) return;

  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalDate = document.getElementById("modalDate");
  const modalImage = document.getElementById("modalImage");

  if(modalTitle) modalTitle.innerText = item.title;
  if(modalDescription) modalDescription.innerText = item.description;
  if(modalDate) modalDate.innerText = new Date(item.date).toLocaleDateString();
  if(modalImage) modalImage.src = item.image;

  modal.classList.remove("hidden");
  AOS.refresh();
  if(typeof feather !== 'undefined') feather.replace();
}

function closeModal() {
  const modal = document.getElementById("modal");
  if(modal) modal.classList.add("hidden");
}

const closeModalBtn = document.getElementById("closeModalBtn");
if(closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

// Toast notification
function showNotification(message) {
  const toast = document.getElementById("toast");
  if(!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

// Dark mode toggle
document.addEventListener('alpine:init', () => {
    Alpine.data('darkMode', () => ({
        on: false,
        init() {
            this.on = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if(this.on) document.documentElement.classList.add("dark");
        },
        toggle() {
            this.on = !this.on;
            document.documentElement.classList.toggle("dark", this.on);
        }
    }))
})

// Initial fetch
fetchNewsData();
