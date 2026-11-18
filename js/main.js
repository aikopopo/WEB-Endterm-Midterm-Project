let pageList = [];

let currentType = "all";

function filterProducts(searchText, onlySale, type) {
  const result = [];
  for (const item of pageList) {
    if (item.matches(searchText, onlySale, type)) {
      result.push(item);
    }
  }
  return result;
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
    grid.appendChild(item.createCard());   
  });
  setupMoreButtons();
}

function applyFilters() {
  const searchText = document.getElementById("search-input").value;
  const saleBox = document.getElementById("sale-only");
  const onlySale = saleBox ? saleBox.checked : false;
  showProducts(filterProducts(searchText, onlySale, currentType));
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

    const tabLinks = document.querySelectorAll(".tabs a");
    tabLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();               
        currentType = link.dataset.type;      

        tabLinks.forEach(function (other) {   
          other.classList.remove("active");
        });
        link.classList.add("active");         

        applyFilters();
      });
    });
  }

  document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
});
