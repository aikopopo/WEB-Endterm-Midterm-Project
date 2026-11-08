# MELORA clothing: Endterm Project

MELORA is a multi-page responsive website for an elegant clothing and accessories brand (party dresses, bridal dresses and clutches). This endterm project continues our midterm website: the topic, layout, navigation and pages are the same, and we added interactive JavaScript and jQuery features to them.

**Live website:** https://aikopopo.github.io/WEB-Endterm-Midterm-Project/
**Repository:** https://github.com/aikopopo/WEB-Endterm-Midterm-Project

## Group members
Marzhan & Aigerim

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home page with the hero section and theme switcher |
| `partydress.html` | Party dresses catalog: search, "Only sale" filter, favorites |
| `bridal.html` | Bridal catalog: working tabs, search, favorites, size guide table |
| `clutches.html` | Clutches catalog: search, favorites |
| `reviews.html` | Customer reviews and the Sign Up form with validation |

## Project structure

```
index.html, partydress.html, bridal.html, clutches.html, reviews.html
style.css          styles (Bootstrap + custom, dark theme)
js/
  data.js          arrays: products, favorites
  main.js          catalog rendering, search, filters, tabs, favorites, theme switcher
  effects.js       jQuery: messages, MORE button, card hover
  form.js          Sign Up form validation
```

The same `main.js` works on all catalog pages. Each page tells the script which products to show with `data-category` (for example `data-category="party"`).

## New endterm features

**JavaScript**
- **Arrays:** `products` (all dresses and clutches) and `favorites` (ids of liked items).
- **Loops:** `for...of` in `filterProducts`, `forEach` in `showProducts` and in the tabs code.
- **Functions:** `formatPrice` and `filterProducts` (return values), `createCard`, `toggleFavorite`, `showProducts`, `applyFilters`, and the `check...` functions in `form.js`.

**DOM manipulation and events**
- Product cards are created from the array, not written in HTML.
- Cards are added and removed when searching or filtering.
- Classes, text and visibility change on user actions.
- Events used: `DOMContentLoaded`, `input`, `change`, `click`, `submit`.
- `event.target` is used in the search and favorites handlers; `event.preventDefault()` is used in the bridal tabs and the form.

**Interface features**
1. Search by name (Party Dresses, Bridal, Clutches)
2. "Only sale" filter (Party Dresses)
3. Working tabs: All, Ball Gown, A-Line, Mermaid, Lace (Bridal)
4. Favorites with heart buttons and a counter in the header
5. Dark theme switcher (all pages)
6. MORE button that shows and hides the product description

**Form validation (Reviews page, Sign Up form)**
- Full name: required, at least 2 characters
- Email: required, correct format
- Password: required, at least 8 characters
- Confirm password: must match the password
- Interest (select): an option must be chosen
- Checkbox "I agree": must be checked
- Error messages appear under each field, the field turns red, and the form is not submitted while errors remain.
- When everything is valid, the form is replaced by a "Welcome to MELORA" message.

**jQuery**
- Selectors: ID (`#message`, `#featured-grid`), class (`.details-btn`, `.card-item`).
- Traversal: `closest()`, `find()`.
- Events: `click`, `mouseenter`, `mouseleave`.
- Effects: `fadeIn` / `fadeOut` for the "Added to favorites" message, `slideToggle` for the product description.

## How to test the interactive features

1. **Dark theme (any page):** click the moon button in the header. The page turns dark and the icon changes.
2. **Search (Party Dresses, Bridal, Clutches):** type a word, for example `blue` on Party Dresses or `silver` on Clutches. Only matching cards stay. Clear the field to see all cards again.
3. **Only sale (Party Dresses):** tick the checkbox. Only items with the SALE badge remain.
4. **Tabs (Bridal):** click Mermaid, Lace, Ball Gown and A-Line. The cards change, the active tab is highlighted and the page does not jump. Search works together with tabs.
5. **Favorites:** click the heart on a card. It turns red, the counter in the header goes up and a message appears and fades out. Click again to remove it.
6. **MORE button:** click MORE on a card. The description slides open; click again to hide it.
7. **Card hover:** move the mouse over a card. It gets a shadow.
8. **Sign Up form (Reviews):**
   - Press SIGN UP with empty fields: error messages appear under every field.
   - Enter `abc` as email, a short password or different passwords: you get specific messages.
   - Start fixing a field: its error disappears.
   - Fill everything correctly, tick the checkbox and submit: the success message appears.

## Technologies

HTML5, CSS3, Bootstrap 5.3, JavaScript (ES6), jQuery 3.7. Hosted on GitHub Pages.
