function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;      
    return JSON.parse(raw);                 
  } catch (error) {
    return fallback;                        
  }
}
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));   
  } catch (error) {
  }
}

class Product {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.category = data.category;
    this.type = data.type;          
    this.sale = data.sale;
    this.image = data.image;
    this.description = data.description;
  }

  getPrice() {
    return "Rp. " + this.price.toLocaleString("de-DE");
  }

  matches(searchText, onlySale, type) {
    const nameOk = this.name.toLowerCase().includes(searchText.toLowerCase());
    const saleOk = !onlySale || this.sale;
    const typeOk = type === "all" || this.type === type;
    return nameOk && saleOk && typeOk;
  }

  createCard() {
    const card = document.createElement("article");
    card.className = "card-item";

    let saleBadge = "";
    if (this.sale) {
      saleBadge = '<span class="badge-sale">SALE</span>';
    }

    card.innerHTML = saleBadge + `
      <img src="${this.image}" alt="${this.name}">
      <p class="item-name">${this.name}</p>
      <p class="item-price">${this.getPrice()}</p>
      <p class="item-desc">${this.description}</p>
      <button class="btn btn-melora details-btn" type="button">MORE</button>
      <button class="fav-btn" type="button">♥</button>
    `;

    const heart = card.querySelector(".fav-btn");
    
    if (favorites.includes(this.id)) {
      heart.classList.add("active");
    }
    heart.addEventListener("click", (event) => {
      toggleFavorite(this.id, event.target);
    });

    return card;
  }
}

const productData = [
  { id: 1, name: "Look 1 Gold Beads", price: 125000, category: "party", sale: true, image: "photo_2026-10-03 19.18.44.jpeg", description: "Party dress with gold beads." },
  { id: 2, name: "Look 2 Blue Gown", price: 180000, category: "party", sale: false, image: "photo_2026-10-03 19.18.39.jpeg", description: "Blue beaded evening gown." },
  { id: 3, name: "Look 3 Floral Dress", price: 129000, category: "party", sale: true, image: "photo_2026-10-03 19.21.45.jpeg", description: "Floral embroidered dress with pink shawl." },
  { id: 4, name: "Look 4 Sequins", price: 125000, category: "party", sale: false, image: "photo_2026-10-03 19.18.38.jpeg", description: "Dress with colorful sequins." },
  { id: 5, name: "Look 5 Pearl Dress", price: 180000, category: "party", sale: false, image: "photo_2026-10-03 19.18.35.jpeg", description: "Pearl dress with beige shawl." },
  { id: 6, name: "Look 6 Red Roses", price: 129000, category: "party", sale: false, image: "photo_2026-10-03 19.21.47.jpeg", description: "Black dress with red roses." },

  { id: 7, name: "Bridal Look 1", price: 129000000, category: "bridal", type: "ball-gown", sale: false, image: "photo_2026-10-03 19.18.34.jpeg", description: "Ball gown with lace sleeves." },
  { id: 8, name: "Bridal Look 2", price: 139000000, category: "bridal", type: "lace", sale: false, image: "photo_2026-10-03 19.18.40.jpeg", description: "Lace halter dress with a high slit." },
  { id: 9, name: "Bridal Look 3", price: 130000000, category: "bridal", type: "a-line", sale: false, image: "photo_2026-10-03 19.21.51.jpeg", description: "Wedding dress with V-neck and lace sleeves." },
  { id: 10, name: "Bridal Look 4", price: 229000000, category: "bridal", type: "lace", sale: false, image: "photo_2026-10-03 19.18.37.jpeg", description: "Short lace dress with a long veil." },
  { id: 11, name: "Bridal Look 5", price: 119000000, category: "bridal", type: "mermaid", sale: false, image: "photo_2026-10-03 19.21.48.jpeg", description: "Mermaid lace wedding dress with veil." },
  { id: 12, name: "Bridal Look 6", price: 225000000, category: "bridal", type: "lace", sale: false, image: "photo_2026-10-03 19.21.49.jpeg", description: "Lace wedding dress with long sleeves and veil." },

  { id: 13, name: "Gold Clutch Cecilia", price: 95000, category: "clutch", sale: false, image: "photo_2026-10-03 21.24.36.jpeg", description: "Gold clutch with Carvela Cecilia trim." },
  { id: 14, name: "Carvela Cecilia Hard Clutch", price: 110000, category: "clutch", sale: true, image: "G80658s4(2).jpg", description: "Hard clutch with a pearl finish." },
  { id: 15, name: "Silver Elida Clutch", price: 105000, category: "clutch", sale: false, image: "photo_2026-10-03 21.27.01.jpeg", description: "Silver crystal clutch with a gold chain (Dune London Elida)." },
  { id: 16, name: "Silver Envelope Clutch", price: 85000, category: "clutch", sale: false, image: "photo_2026-10-03 21.25.35.jpeg", description: "Silver envelope clutch." },
  { id: 17, name: "Silver Printed Clutch", price: 100000, category: "clutch", sale: false, image: "photo_2026-10-03 21.28.05.jpeg", description: "Silver crystal bow clutch (Dune London Printed)." }
];

const products = [];
for (const data of productData) {
  products.push(new Product(data));
}

const savedFavorites = loadFromStorage("melora-favorites", []);
let favorites = Array.isArray(savedFavorites) ? savedFavorites : [];
