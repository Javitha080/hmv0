// Initialize AOS
AOS.init();

// Sample Data
const items = [
  {
    type: "news",
    tags: ["education"],
    title: "New Campus Expansion Announced",
    description: "The university is expanding its campus to include new labs and student housing.",
    date: "2025-04-01",
    image: "https://picsum.photos/id/1011/600/400 "
  },
  {
    type: "event",
    tags: ["workshop"],
    title: "Tech Innovation Summit",
    description: "Join us for the annual summit on technology and innovation in education.",
    date: "2025-04-15",
    image: "https://picsum.photos/id/1015/600/400 "
  },
  {
    type: "news",
    tags: ["sports"],
    title: "Award Winning Faculty Member",
    description: "Dr. Jane Doe wins national award for excellence in teaching.",
    date: "2025-03-28",
    image: "https://picsum.photos/id/1025/600/400 "
  },
  {
    type: "event",
    tags: ["education", "workshop"],
    title: "Spring Career Fair",
    description: "Connect with top employers at our Spring Career Fair next week.",
    date: "2025-04-10",
    image: "https://picsum.photos/id/1033/600/400 "
  }
];

let currentPage = 1;
const itemsPerPage = 6;

function renderItems(filter = "all", query = "") {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");

  setTimeout(() => {
    let filteredItems = [...items];

    if (filter !== "all") {
      filteredItems = filteredItems.filter(item => item.type === filter);
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
    grid.innerHTML = "";

    if (paginatedItems.length === 0) {
      showNotification("No items found.");
    }

    paginatedItems.forEach((item, index) => {
      const card = document.createElement("div");
      card.setAttribute("data-aos", "fade-up");
      card.style.animationDelay = `${index * 0.1}s`;
      card.innerHTML = `
        <div class="glass backdrop-blur-md rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300" onclick="showModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
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
    loader.classList.add("hidden");
    feather.replace();
  }, 500);
}

function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentPage = 1;
    renderItems(btn.dataset.filter, document.getElementById("searchInput").value);
  });
});

document.getElementById("searchInput").addEventListener("input", e => {
  currentPage = 1;
  renderItems(document.querySelector(".filter-btn.active").dataset.filter, e.target.value);
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderItems(document.querySelector(".filter-btn.active").dataset.filter, document.getElementById("searchInput").value);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  renderItems(document.querySelector(".filter-btn.active").dataset.filter, document.getElementById("searchInput").value);
});

// Modal functions
function showModal(item) {
  const modal = document.getElementById("modal");
  document.getElementById("modalTitle").innerText = item.title;
  document.getElementById("modalDescription").innerText = item.description;
  document.getElementById("modalDate").innerText = new Date(item.date).toLocaleDateString();
  document.getElementById("modalImage").src = item.image;
  modal.classList.remove("hidden");
  AOS.refresh();
  feather.replace();
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

document.getElementById("closeModalBtn").addEventListener("click", closeModal);

// Toast notification
function showNotification(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

// Dark mode toggle
document.querySelector("[x-data]").addEventListener("alpine:init", () => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
    Alpine.store("darkMode", true);
  }
});