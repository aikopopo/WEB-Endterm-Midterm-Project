function formatPrice(price) {
  return "Rp. " + price;
}


function filterProducts(searchText) {
  const result = [];
  for (const item of products) {
    if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
      result.push(item);
    }
  }
  return result;
}

function createCard(item) {
  const card = document.createElement("article");
  card.className = "card-item";

  card.innerHTML = `
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

document.addEventListener("DOMContentLoaded", function () {
  showProducts(products);

  
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function (event) {
    showProducts(filterProducts(event.target.value));
  });


  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
});