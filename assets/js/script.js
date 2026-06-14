// ---------- Data Source Code (Mock) ----------
const allProducts = [
  {
    id: 1,
    name: "Sistem Inventory Laravel",
    description:
      "Aplikasi inventory lengkap dengan manajemen stok, laporan, dan role user. Built with Laravel 10 & Tailwind.",
    price: 350000,
    category: "laravel",
    icon: "fab fa-laravel",
  },
  {
    id: 2,
    name: "E-Commerce React + Node",
    description:
      "Fullstack e-commerce modern dengan React, Redux, Node.js, dan MongoDB. Payment gateway integration.",
    price: 650000,
    category: "fullstack",
    icon: "fab fa-react",
  },
  {
    id: 3,
    name: "Aplikasi Kasir Mobile",
    description:
      "Aplikasi kasir berbasis React Native (Expo) dengan fitur cetak struk dan history transaksi.",
    price: 450000,
    category: "mobile",
    icon: "fas fa-mobile-alt",
  },
  {
    id: 4,
    name: "Dashboard Admin React",
    description:
      "Admin dashboard dengan tema gelap/terang, grafik interaktif, dan autentikasi JWT.",
    price: 280000,
    category: "react",
    icon: "fab fa-react",
  },
  {
    id: 5,
    name: "Blog CMS Laravel",
    description:
      "Content Management System untuk blog pribadi dengan SEO friendly, markdown support.",
    price: 320000,
    category: "laravel",
    icon: "fab fa-laravel",
  },
  {
    id: 6,
    name: "Aplikasi Donasi Online",
    description:
      "Platform donasi online menggunakan Midtrans, Laravel, dan Livewire. Fitur campaign.",
    price: 500000,
    category: "laravel",
    icon: "fas fa-hand-holding-heart",
  },
  {
    id: 7,
    name: "Social Media App (Flutter)",
    description:
      "Aplikasi sosial media ringan dengan Firebase Auth, realtime post, dan chat.",
    price: 580000,
    category: "mobile",
    icon: "fab fa-flutter",
  },
  {
    id: 8,
    name: "Task Manager MERN",
    description:
      "Manajemen tugas tim dengan drag & drop, notifikasi email, kolaborasi realtime.",
    price: 390000,
    category: "fullstack",
    icon: "fab fa-js",
  },
  {
    id: 9,
    name: "Portfolio React + Three.js",
    description:
      "3D portfolio interaktif dengan Three.js, animasi wow, dan responsive design.",
    price: 210000,
    category: "react",
    icon: "fas fa-cube",
  },
  {
    id: 10,
    name: "Sistem PPDB Online",
    description:
      "Penerimaan siswa baru online dengan upload berkas, generate nomor pendaftaran.",
    price: 480000,
    category: "laravel",
    icon: "fas fa-graduation-cap",
  },
  {
    id: 11,
    name: "Clone WhatsApp Web (React)",
    description:
      "Real-time chat app dengan socket.io, mirip antarmuka WhatsApp Web.",
    price: 720000,
    category: "react",
    icon: "fab fa-whatsapp",
  },
  {
    id: 12,
    name: "Aplikasi Laundry (React Native)",
    description:
      "Aplikasi laundry antar dengan tracking order dan push notification.",
    price: 540000,
    category: "mobile",
    icon: "fas fa-tshirt",
  },
  {
    id: 13,
    name: "SaaS Starter Kit (Next.js)",
    description:
      "Landing + auth + payment subscription (Stripe) menggunakan Next.js 14.",
    price: 890000,
    category: "fullstack",
    icon: "fab fa-nextjs",
  },
  {
    id: 14,
    name: "Sistem Absensi QR Code",
    description:
      "Absensi karyawan dengan QR Code, rekap excel, Laravel + MySQL.",
    price: 410000,
    category: "laravel",
    icon: "fas fa-qrcode",
  },
];

// konfigurasi pagination / load more
let itemsPerPage = 6;
let currentLoaded = itemsPerPage; // berapa item yang sudah ditampilkan
let activeCategory = "all";
let searchQuery = "";

// filtered products berdasarkan category & search
function getFilteredProducts() {
  let filtered = [...allProducts];
  if (activeCategory !== "all") {
    filtered = filtered.filter((p) => p.category === activeCategory);
  }
  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query),
    );
  }
  return filtered;
}

// render card berdasarkan data yang sudah difilter + batas currentLoaded
function renderProducts() {
  const container = document.getElementById("productsContainer");
  if (!container) return;
  const filtered = getFilteredProducts();
  const productsToShow = filtered.slice(0, currentLoaded);

  if (productsToShow.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem;">😞 Tidak ada source code yang ditemukan.</div>`;
    document.getElementById("loadMoreWrapper").style.display = "none";
    return;
  }

  container.innerHTML = productsToShow
    .map(
      (product) => `
            <div class="product-card" data-id="${product.id}">
                <div class="card-img">
                    <i class="${product.icon}" style="font-size:3.5rem;"></i>
                </div>
                <div class="card-content">
                    <span class="card-category">${translateCategory(product.category)}</span>
                    <div class="card-title">${escapeHtml(product.name)}</div>
                    <div class="card-desc">${escapeHtml(product.description.substring(0, 80))}${product.description.length > 80 ? "..." : ""}</div>
                    <div class="card-price">Rp ${product.price.toLocaleString("id-ID")}</div>
                    <button class="btn-detail" data-id="${product.id}">Detail Produk</button>
                </div>
            </div>
        `,
    )
    .join("");

  // handle tombol detail
  document.querySelectorAll(".btn-detail").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(btn.getAttribute("data-id"));
      const product = allProducts.find((p) => p.id === id);
      if (product) openModal(product);
    });
  });

  // kontrol load more button
  const loadMoreWrapper = document.getElementById("loadMoreWrapper");
  if (filtered.length <= currentLoaded) {
    loadMoreWrapper.style.display = "none";
  } else {
    loadMoreWrapper.style.display = "block";
  }
}

function translateCategory(cat) {
  const map = {
    laravel: "Laravel",
    react: "React",
    mobile: "Mobile",
    fullstack: "Fullstack",
  };
  return map[cat] || cat;
}

function escapeHtml(str) {
  return str
    .replace(/[&<>]/g, function (m) {
      if (m === "&") return "&amp;";
      if (m === "<") return "&lt;";
      if (m === ">") return "&gt;";
      return m;
    })
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function (c) {
      return c;
    });
}

// load more
function loadMore() {
  const filteredTotal = getFilteredProducts().length;
  if (currentLoaded < filteredTotal) {
    currentLoaded += itemsPerPage;
    if (currentLoaded > filteredTotal) currentLoaded = filteredTotal;
    renderProducts();
  }
}

// reset pagination ketika filter / search berubah
function resetAndRender() {
  currentLoaded = itemsPerPage;
  renderProducts();
}

// modal logic
const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalCategorySpan = document.getElementById("modalCategory");
const modalPriceSpan = document.getElementById("modalPrice");
const whatsappLink = document.getElementById("whatsappLink");

function openModal(product) {
  modalTitle.innerText = product.name;
  modalDesc.innerText = product.description;
  modalCategorySpan.innerText = translateCategory(product.category);
  modalPriceSpan.innerText = `Rp ${product.price.toLocaleString("id-ID")}`;
  // buat pesan whatsapp: format produk + harga
  const message = `Halo CodeTlawXp, saya tertarik untuk membeli source code: *${product.name}* (Kategori: ${translateCategory(product.category)}) dengan harga Rp ${product.price.toLocaleString("id-ID")}. Apakah masih tersedia? Terima kasih.`;
  const encodedMsg = encodeURIComponent(message);
  whatsappLink.href = `https://wa.me/6283835121071?text=${encodedMsg}`; // ganti nomor sesuai keperluan (demo)
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

// event listeners
document.getElementById("closeModalBtn")?.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// filter buttons
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.getAttribute("data-category");
    resetAndRender();
  });
});

// search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  resetAndRender();
});

// load more button
document.getElementById("loadMoreBtn")?.addEventListener("click", loadMore);

// Dark mode toggle
const darkBtn = document.getElementById("darkModeBtn");
const darkSpan = darkBtn.querySelector("span");
darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
  if (isDark) {
    darkBtn.innerHTML = '<i class="fas fa-sun"></i> <span>Mode Terang</span>';
  } else {
    darkBtn.innerHTML = '<i class="fas fa-moon"></i> <span>Mode Gelap</span>';
  }
});

// cek local storage dark mode
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  darkBtn.innerHTML = '<i class="fas fa-sun"></i> <span>Mode Terang</span>';
} else {
  darkBtn.innerHTML = '<i class="fas fa-moon"></i> <span>Mode Gelap</span>';
}

// initial render
renderProducts();
