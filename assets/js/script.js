(function () {
  const products = [
    {
      id: 1,
      title: "Landing Page Pro",
      category: "website",
      price: "Rp 149.000",
      image: "https://picsum.photos/id/0/400/250",
      demo: "https://demo.codemart.id/landing",
      desc: "Landing page modern dengan animasi halus.",
    },
    {
      id: 2,
      title: "E-Commerce Mobile UI",
      category: "mobile",
      price: "Rp 249.000",
      image: "https://picsum.photos/id/1/400/250",
      demo: "https://demo.codemart.id/mobileui",
      desc: "UI kit Flutter untuk toko online.",
    },
    {
      id: 3,
      title: "Admin Dashboard",
      category: "dashboard",
      price: "Rp 299.000",
      image: "https://picsum.photos/id/20/400/250",
      demo: "https://demo.codemart.id/admin",
      desc: "Dashboard admin React + Tailwind.",
    },
    {
      id: 4,
      title: "REST API Starter",
      category: "api",
      price: "Rp 199.000",
      image: "https://picsum.photos/id/26/400/250",
      demo: "https://api-demo.codemart.id",
      desc: "Node.js Express + JWT auth.",
    },
    {
      id: 5,
      title: "Portfolio Fotografer",
      category: "website",
      price: "Rp 129.000",
      image: "https://picsum.photos/id/250/400/250",
      demo: "https://demo.codemart.id/photo",
      desc: "Tema portfolio minimalis.",
    },
    {
      id: 6,
      title: "Blog CMS",
      category: "website",
      price: "Rp 179.000",
      image: "https://picsum.photos/id/2/400/250",
      demo: "https://demo.codemart.id/blog",
      desc: "CMS blog markdown SEO.",
    },
    {
      id: 7,
      title: "POS Kasir",
      category: "dashboard",
      price: "Rp 350.000",
      image: "https://picsum.photos/id/30/400/250",
      demo: "https://demo.codemart.id/pos",
      desc: "Point of sale lengkap.",
    },
    {
      id: 8,
      title: "Chat App Mobile",
      category: "mobile",
      price: "Rp 275.000",
      image: "https://picsum.photos/id/180/400/250",
      demo: "https://demo.codemart.id/chat",
      desc: "Real-time chat Firebase.",
    },
  ];

  let visibleCount = 4;
  const increment = 4;
  let currentFilter = "all";
  let searchQuery = "";

  const body = document.body;
  const darkToggle = document.getElementById("darkModeToggle");
  const grid = document.getElementById("productGrid");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const modal = document.getElementById("productModal");
  const closeModal = document.getElementById("closeModal");
  const modalContent = document.getElementById("modalContent");
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  // Dark mode
  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark");
    darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  darkToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
    darkToggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });

  // Sidebar toggle
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    sidebarOverlay.classList.toggle("active");
  });
  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
  });

  function getFiltered() {
    return products.filter((p) => {
      const matchCat = currentFilter === "all" || p.category === currentFilter;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  function renderProducts(reset = true) {
    if (reset) visibleCount = increment;
    const filtered = getFiltered();
    const toShow = filtered.slice(0, visibleCount);
    grid.innerHTML = toShow
      .map(
        (p) => `
          <div class="card">
            <div class="card-thumb"><img src="${p.image}" alt="${p.title}"></div>
            <div class="card-body">
              <span class="category-badge">${p.category}</span>
              <h3>${p.title}</h3>
              <div class="price">${p.price}</div>
              <div class="actions">
                <button class="btn btn-outline detail-btn" data-id="${p.id}"><i class="fas fa-info-circle"></i> Detail</button>
                <a href="${p.demo}" target="_blank" class="btn btn-outline"><i class="fas fa-external-link-alt"></i> Demo</a>
                <button class="btn btn-wa buy-btn" data-title="${p.title}"><i class="fab fa-whatsapp"></i> Beli</button>
              </div>
            </div>
          </div>
        `,
      )
      .join("");

    loadMoreBtn.parentElement.style.display =
      filtered.length <= visibleCount ? "none" : "flex";

    document.querySelectorAll(".detail-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        openModal(parseInt(e.currentTarget.dataset.id)),
      );
    });
    document.querySelectorAll(".buy-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const title = e.currentTarget.dataset.title;
        window.open(
          `https://wa.me/6281234567890?text=${encodeURIComponent("Halo, saya tertarik source code *" + title + "*")}`,
          "_blank",
        );
      });
    });
  }

  function openModal(id) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    modalContent.innerHTML = `
          <img src="${p.image}" style="width:100%; border-radius:20px; margin-bottom:16px;">
          <h2>${p.title}</h2><span class="category-badge">${p.category}</span>
          <p style="margin:16px 0">${p.desc}</p>
          <p class="price" style="font-size:1.5rem">${p.price}</p>
          <a href="${p.demo}" target="_blank" class="btn btn-outline" style="width:100%; margin-bottom:10px;"><i class="fas fa-play"></i> Lihat Demo</a>
          <button class="btn btn-wa" style="width:100%" id="modalBuyBtn"><i class="fab fa-whatsapp"></i> Beli via WhatsApp</button>
        `;
    modal.classList.add("active");
    document.getElementById("modalBuyBtn").addEventListener("click", () => {
      window.open(
        `https://wa.me/6281234567890?text=${encodeURIComponent("Halo, saya ingin membeli *" + p.title + "*")}`,
        "_blank",
      );
    });
  }

  closeModal.addEventListener("click", () => modal.classList.remove("active"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });

  loadMoreBtn.addEventListener("click", () => {
    visibleCount += increment;
    renderProducts(false);
  });
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderProducts(true);
  });
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.category;
      searchInput.value = "";
      searchQuery = "";
      renderProducts(true);
    });
  });

  renderProducts(true);
})();
