// script.js
document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("items-list");
  const categorySelect = document.getElementById("category-filter");
  const searchBar = document.getElementById("search-bar");
  let ITEMS = [];

  function fetchItems() {
    return fetch("items.json").then(r => {
      if (!r.ok) throw new Error("Failed to load items.json");
      return r.json();
    });
  }

  function populateCategories(items) {
    const cats = Array.from(new Set(items.map(it => it.category || "Uncategorized")));
    cats.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  function render() {
    const q = searchBar.value.trim().toLowerCase();
    const category = categorySelect.value;
    listEl.innerHTML = "";

    ITEMS.forEach((item, idx) => {
      const matchesCategory = category === "all" || (item.category === category);
      const matchesQuery = item.name.toLowerCase().includes(q);
      if (!matchesCategory || !matchesQuery) return;

      // show only first image as thumbnail
      const thumb = (item.images && item.images.length) ? item.images[0] : "images/placeholder.jpg";

      const card = document.createElement("article");
      card.className = "item-card";
      card.innerHTML = `
        <div class="card-thumb"><img src="${thumb}" alt="${escapeHtml(item.name)}"></div>
        <div class="card-body">
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.description || "")}</p>
          <div class="card-row">
            <div class="price">${escapeHtml(item.price || "")}</div>
            <div class="muted">${escapeHtml(item.category || "")}</div>
          </div>
        </div>
      `;
      card.addEventListener("click", () => {
        window.location = `item.html?id=${idx}`;
      });
      listEl.appendChild(card);
    });
  }

  // small helper to avoid HTML injection
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]))}

  // init
  fetchItems()
    .then(items => {
      ITEMS = items;
      populateCategories(items);
      render();
    })
    .catch(err => {
      listEl.innerHTML = `<p style="padding:18px;color:#c0392b">Error loading items: ${escapeHtml(err.message)}</p>`;
      console.error(err);
    });

  categorySelect.addEventListener("change", render);
  searchBar.addEventListener("input", render);
});
