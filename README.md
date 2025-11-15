# 🇨🇦 Lululemon CA Proxy Purchase Estimator

This is a lightweight frontend tool to help estimate the **total cost of purchasing Lululemon products from the CA** through a proxy (代購). It’s perfect for IG sellers, side hustlers, or anyone helping friends buy overseas.

## ✨ Features

- ✅ **Auto-loads live CAD to TWD exchange rates**
  - Primary source: Taiwan government open data API
  - Fallback: Parses data from Bank of Taiwan’s website (via multiple CORS proxies)
- 💰 **Applies a 10% service fee** to item price
- 🚚 **Estimates 2nd-stage local shipping cost** (default: NT$60~150)
- 🔁 One-click to reload exchange rate
- ✍️ Exchange rate field can be edited manually (double-click to unlock)

## 🧾 How to Use

1. Open `index.html` in any browser (no backend required)
2. Enter the CAD price of the item
3. Wait for exchange rate to load (or enter it manually)
4. Click **Calculate Total**
5. View a breakdown of service fee and shipping

## 🌐 Exchange Rate Sources

- **Primary**: [Taiwan Futures Exchange Open API](https://openapi.taifex.com.tw/v1/DailyForeignExchangeRates)
- **Backup**: Scrapes [Bank of Taiwan Exchange Rate Page](https://rate.bot.com.tw/xrt?Lang=zh-TW) using CORS proxies:
  - `https://api.allorigins.win/`
  - `https://corsproxy.io/`
  - `https://api.codetabs.com/`

## 🛠️ Tech Stack

- Pure **HTML + JavaScript**
- No frameworks or build tools
- Built-in resilience: gracefully falls back if exchange rate sources fail
- DOM parsing to extract rates from fallback HTML when API is down

## 👩‍💻 Author

Created by @jiasyuanchu(Instagram)

This tool is designed for casual use and personal proxy buying. Feedback or suggestions are welcome via Instagram DM 💌

---

Feel free to fork or modify this project for your own proxy store or community use!
