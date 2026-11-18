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
function sortProducts(list, sortType) {
  const sorted = list.slice();            
  if (sortType === "low") {
    sorted.sort(function (a, b) { return a.price - b.price; });   
  } else if (sortType === "high") {
    sorted.sort(function (a, b) { return b.price - a.price; });   
  }
  return sorted;                         
}

function updateFavCount() {
  const counter = document.getElementById("fav-count");
  if (counter) {
    counter.textContent = favorites.length;
  }
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
  saveToStorage("melora-favorites", favorites);
  updateFavCount();
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
  const sortBox = document.getElementById("sort-select");
  const sortType = sortBox ? sortBox.value : "default";

  const filtered = filterProducts(searchText, onlySale, currentType);
  showProducts(sortProducts(filtered, sortType));
}
function clearFavorites() {
  favorites = [];
  saveToStorage("melora-favorites", favorites);
  updateFavCount();
  applyFilters();
  showMessage("Favorites cleared");
}

function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  document.getElementById("theme-toggle").textContent = isDark ? "☀️" : "🌙";
  saveToStorage("melora-theme", isDark ? "dark" : "light");
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
    applyFilters();                    
    updateFavCount();

    document.getElementById("search-input").addEventListener("input", applyFilters);

    const saleBox = document.getElementById("sale-only");
    if (saleBox) {
      saleBox.addEventListener("change", applyFilters);
    }

    const sortBox = document.getElementById("sort-select");
    if (sortBox) {
      sortBox.addEventListener("change", applyFilters);
    }

    const clearBtn = document.getElementById("clear-favs");
    if (clearBtn) {
      clearBtn.addEventListener("click", clearFavorites);
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

  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    setTheme(loadFromStorage("melora-theme", "light") === "dark");

    themeBtn.addEventListener("click", function () {
      setTheme(!document.body.classList.contains("dark"));
    });
  }
});
