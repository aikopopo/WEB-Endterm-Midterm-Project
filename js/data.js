// Массив 1: список товаров (из него строятся карточки)
const products = [
  { id: 1, name: "Gold Beaded Dress", price: 125000, image: "photo_2026-10-03 19.18.44.jpeg", description: "Party dress with gold beads." },
  { id: 2, name: "Blue Evening Gown", price: 180000, image: "photo_2026-10-03 19.18.39.jpeg", description: "Gown with blue beadwork." },
  { id: 3, name: "Lace Ball Gown", price: 129000000, image: "photo_2026-10-03 19.18.34.jpeg", description: "Ball gown with lace sleeves." },
  { id: 4, name: "Gold Crystal Clutch", price: 95000, image: "photo_2026-10-03 21.24.36.jpeg", description: "Gold clutch with crystal clasp." }
];

// Массив 2: тут хранятся товары, которые нажали сердечком
let favorites = [];