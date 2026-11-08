// Функция 1: делает из числа текст цены. Возвращает значение (return)
function formatPrice(price) {
  return "Rp. " + price;
}

// Функция 2: ищет товары по названию. Возвращает новый массив (return)
function filterProducts(searchText) {
  const result = [];
  for (const item of products) {
    if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
      result.push(item);
    }
  }
  return result;
}

// Функция 3: создаёт одну карточку товара
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

  // Нажали на сердечко -> вызываем функцию 4
  const heart = card.querySelector(".fav-btn");
  heart.addEventListener("click", function (event) {
    toggleFavorite(item.id, event.target);
  });

  return card;
}

// Функция 4: добавляет товар в избранное или убирает
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

// Функция 5: показывает карточки на странице
function showProducts(list) {
  const grid = document.getElementById("featured-grid");
  grid.innerHTML = "";                       // очищаем старые карточки
  list.forEach(function (item) {             // цикл forEach
    grid.appendChild(createCard(item));      // добавляем новую карточку
  });
  setupMoreButtons();                        // подключаем jQuery к новым кнопкам
}

// Когда страница загрузилась
document.addEventListener("DOMContentLoaded", function () {
  showProducts(products);

  // Поиск: срабатывает при каждой набранной букве
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function (event) {
    showProducts(filterProducts(event.target.value));
  });

  // Тёмная тема
  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
});