let pageList = [];

function formatPrice(price) {
  return "Rp. " + price;
}

function filterProducts(searchText, onlySale) {
  const result = [];
  for (const item of pageList) {
    const nameOk = item.name.toLowerCase().includes(searchText.toLowerCase());
    const saleOk = !onlySale || item.sale;
    if (nameOk && saleOk) {
      result.push(item);
    }
  }
  return result;
}

function createCard(item) {
  const card = document.createElement("article");
  card.className = "card-item";

  let saleBadge = "";
  if (item.sale) {
    saleBadge = '<span class="badge-sale">SALE</span>';
  }

  card.innerHTML = saleBadge + `
    <img src="${item.image}" alt="${item.name}">
    <p class="item-name">${item.name}</p>
    <p class="item-price">${formatPrice(item.price)}</p>
    <p class="item-desc">${item.description}</p>
    <button class="btn btn-melora details-btn" type="button">MORE</button>
    <button class="fav-btn" type="button">♥</button>
  `;

 
  const heart = card.querySelector(".fav-btn");
  heart.addEventListener("click", function (event) {
    toggleFavorite(item.id, event.target);
  });

  return card;
}


function toggleFavorite(id, button) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(function (x) { return x !== id; });
    button.classList.remove("active");
    showMessage("Removed from favorites");
  } else {
    favorites.push(id);
    button.classList.add("active");
    showMessage("Added to favorites");
  }
  document.getElementById("fav-count").textContent = favorites.length;
}

function showProducts(list) {
  const grid = document.getElementById("featured-grid");
  grid.innerHTML = "";
  list.forEach(function (item) {
    grid.appendChild(createCard(item));
  });
  setupMoreButtons();
}


function applyFilters() {
  const searchText = document.getElementById("search-input").value;
  const saleBox = document.getElementById("sale-only");
  const onlySale = saleBox ? saleBox.checked : false;
  showProducts(filterProducts(searchText, onlySale));
}

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("featured-grid");

  if (grid) {
    const category = grid.dataset.category;

    for (const item of products) {
      if (!category || item.category === category) {
        pageList.push(item);
      }
    }
    showProducts(pageList);

    document.getElementById("search-input").addEventListener("input", applyFilters);

    const saleBox = document.getElementById("sale-only");
    if (saleBox) {
      saleBox.addEventListener("change", applyFilters);
    }
  }

  document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
});
