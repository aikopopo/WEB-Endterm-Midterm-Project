const RATES_URL = "https://open.er-api.com/v6/latest/IDR";
const ALLOWED_CURRENCIES = ["IDR", "USD", "EUR", "KZT"];

let ratesUpdated = "";

function setRateStatus(text, type) {
  const box = document.getElementById("rate-status");
  if (box) {
    box.textContent = text;
    box.className = "rate-status " + type;
  }
}

async function changeCurrency(code) {
  const select = document.getElementById("currency-select");

  if (code === "IDR") {
    currentCurrency = "IDR";
    setRateStatus("Prices are shown in Indonesian rupiah (Rp.)", "success");
    saveToStorage("melora-currency", currentCurrency);
    applyFilters();
    return;
  }

  select.disabled = true;                              
  setRateStatus("Loading exchange rates...", "loading");   

  try {
    if (!rates) {
      const response = await fetch(RATES_URL);         
      if (!response.ok) {
        throw new Error("HTTP " + response.status);    
      }
      const data = await response.json();              
      rates = data.rates || null;
      ratesUpdated = data.time_last_update_utc || "";
    }

    if (!rates || !rates[code]) {
      currentCurrency = "IDR";
      select.value = "IDR";
      setRateStatus("No exchange rate available for " + code + ". Prices are shown in Rp.", "empty");
    } else {
      currentCurrency = code;
      setRateStatus("Rates updated: " + ratesUpdated, "success");
    }
  } catch (error) {
    currentCurrency = "IDR";
    select.value = "IDR";
    setRateStatus("Could not load exchange rates. Check your connection. Prices are shown in Rp.", "error");
  } finally {
    select.disabled = false;                           
  }

  saveToStorage("melora-currency", currentCurrency);
  applyFilters();                                      
}

document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("currency-select");
  if (!select) return;                                 

  let saved = loadFromStorage("melora-currency", "IDR");
  if (!ALLOWED_CURRENCIES.includes(saved)) {
    saved = "IDR";
  }
  select.value = saved;
  changeCurrency(saved);

  select.addEventListener("change", function (event) {
    changeCurrency(event.target.value);
  });
});