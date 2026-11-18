# MELORA clothing: Final Project

MELORA is a multi-page responsive website for an elegant clothing and accessories brand (party dresses, bridal dresses and clutches). This final project continues our midterm and endterm work: the topic, layout, navigation and pages are the same, and we extended the website into a more complete client-side web application with an external API, object-oriented JavaScript and persistent browser storage.

- **Live website:** https://aikopopo.github.io/WEB-Endterm-Midterm-Project/
- **Repository:** https://github.com/aikopopo/WEB-Endterm-Midterm-Project

## Group members
AIGERIM & MARZHAN

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home page with the hero section and theme switcher |
| `partydress.html` | Party dresses catalog: search, "Only sale", sorting, currency converter, favorites |
| `bridal.html` | Bridal catalog: tabs, search, sorting, currency converter, favorites, size guide |
| `clutches.html` | Clutches catalog: search, sorting, currency converter, favorites |
| `reviews.html` | Customer reviews and the Sign Up form with validation |

## Project structure

```
index.html, partydress.html, bridal.html, clutches.html, reviews.html
style.css            styles (Bootstrap + custom, dark theme, status messages)
js/
  data.js            Product class, product data, localStorage helpers, shared state
  main.js            filtering, sorting, rendering, favorites, tabs, theme
  api.js             currency API: fetch, loading / success / empty / error states
  effects.js         jQuery effects (message, MORE button, card hover)
  form.js            Sign Up form validation
```

## Final-stage features (new after the endterm)

### 1. API integration (mandatory): live currency converter
- Prices are stored in Indonesian rupiah (Rp.). The user can switch the catalog to **USD, EUR or KZT**, and all prices are recalculated with live exchange rates.
- Uses `fetch` with `async` / `await`, checks `response.ok` and parses the JSON response.
- Four clear states are shown under the currency selector:
  - **Loading:** "Loading exchange rates..." (the selector is disabled while loading)
  - **Success:** a green message with the date of the last rates update
  - **Empty data:** a message when the response has no rate for the chosen currency
  - **Error:** a message when the request fails (no internet or server error); prices stay in Rp.
- Rates are loaded once and reused, and the converted prices are shown on dynamically created cards.

### 2. Object-oriented programming (mandatory): `Product` class
- The class `Product` (in `data.js`) has a **constructor**, **properties** (id, name, price, category, type, sale, image, description) and **methods**:
  - `getPrice()` returns the price text in the selected currency
  - `matches(searchText, onlySale, type)` checks if the product fits the search and filters
  - `createCard()` builds the DOM card for the product, including the heart button
- 17 objects are created from the class with `new Product(data)` and are used on all catalog pages, so the class supports real project functionality.

### 3. localStorage (mandatory)
- **Favorites** (`melora-favorites`): saved as JSON on every change and restored when any page is opened. The counter in the header and the red hearts are restored too. The user can clear them with the **Clear favorites** button.
- **Theme** (`melora-theme`): the dark / light choice is remembered on all pages.
- **Currency** (`melora-currency`): the selected currency is restored after reload.
- Missing or broken stored values are handled safely with `try/catch` and a fallback value (`loadFromStorage` / `saveToStorage` helpers).

### 4. Additional feature: sorting
- A **Sort by price** selector (default, low to high, high to low) on all catalog pages.
- Works together with search, the "Only sale" filter, the Bridal tabs and the currency converter. Sorting uses a copy of the array (`slice`) and `sort` with a compare function.

### 5. Additional feature: dark theme with saved preference
- The dark theme switcher on every page, with the preference saved in localStorage and restored on the next visit.

## Features from the earlier stages (still working)

- **Endterm:** product cards created from an array, search, "Only sale" filter, Bridal tabs, favorites counter, MORE button, dark theme, Sign Up form validation (required fields, email format, password length, matching passwords, select, checkbox, messages under fields, success message), jQuery selectors, traversal, events and effects (`fadeIn` / `fadeOut`, `slideToggle`).
- **Midterm:** responsive layout with Bootstrap, navigation, five connected pages.

## API information

- **Service:** [ExchangeRate-API](https://www.exchangerate-api.com), open access endpoint
- **Endpoint used:** `https://open.er-api.com/v6/latest/IDR`
- **Authentication:** none. No API key is needed, so there are no secrets in the code.
- **Data used:** `rates` (exchange rates from IDR to other currencies) and `time_last_update_utc` (date of the last update).
- **Limits:** rates are updated once per day. Attribution is required, so the pages show a "Rates by ExchangeRate-API" link.

## How to run and test

**Run locally:** download or clone the repository and open `index.html` in a browser. No installation or build step is needed. An internet connection is required for the currency converter and for Bootstrap, jQuery and fonts from CDN.

**Test the features:**

1. **Currency converter (API):** on Party Dresses, Bridal or Clutches choose USD, EUR or KZT. You see the loading message, then a green success message, and the prices change. Choose IDR to go back to Rp.
2. **Error state:** open DevTools (F12) → Network → set **Offline**, reload the page, and choose a currency. A red error message appears and prices stay in Rp.
3. **localStorage:** click several hearts, choose a currency and turn on the dark theme. Reload the page or open another page: hearts, counter, currency and theme are restored. Click **Clear favorites** to remove all favorites. You can see the saved keys in DevTools → Application → Local Storage.
4. **Sorting:** choose "Price: low to high" or "high to low". Try it together with search, "Only sale" (Party Dresses) and the tabs (Bridal).
5. **Search, filters and tabs:** type in the search field, tick "Only sale", click the Bridal tabs (Mermaid, Lace and others).
6. **Favorites and MORE:** click a heart (it turns red and a message appears) and click MORE to open the description.
7. **Sign Up form (Reviews):** submit an empty form to see error messages, then try a wrong email or different passwords, then fill the form correctly to see the success message.
8. **Responsive design:** resize the browser or use DevTools device mode to check desktop, tablet and phone widths.

## Technologies

HTML5, CSS3, Bootstrap 5.3, JavaScript (ES6 classes, async / await, fetch, localStorage), jQuery 3.7. Hosted on GitHub Pages.
