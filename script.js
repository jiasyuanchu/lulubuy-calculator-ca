// 只使用 HTML 解析方法，從台銀匯率表抓取「現金賣出」匯率
async function fetchTaiwanCashSellRate() {
  const exchangeInput = document.getElementById("exchangeRate");
  exchangeInput.value = "載入中...";

  const proxyUrls = [
    "https://api.allorigins.win/get?url=",
    "https://corsproxy.io/?",
    "https://api.codetabs.com/v1/proxy?quest="
  ];

  try {
    let html = null;

    for (const proxy of proxyUrls) {
      try {
        const url = proxy + encodeURIComponent("https://rate.bot.com.tw/xrt?Lang=zh-TW");
        const response = await fetch(url);

        if (proxy.includes('allorigins')) {
          const data = await response.json();
          html = data.contents;
        } else {
          html = await response.text();
        }

        if (html && html.length > 1000) {
          break; // 成功
        }
      } catch (e) {
        console.log(`代理失敗 ${proxy}`, e);
      }
    }

    if (!html) throw new Error("所有代理都失敗");

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    let cadRow = null;
    const rows = doc.querySelectorAll("tr");

    for (const row of rows) {
      const cells = row.querySelectorAll("td");
      const firstCell = cells[0]?.textContent?.trim() || "";
      if (firstCell.includes("加拿大元") || firstCell.includes("CAD")) {
        cadRow = row;
        break;
      }
    }

    if (!cadRow) throw new Error("找不到加拿大元匯率資料");

    const cells = cadRow.querySelectorAll("td");
    const cashSellText = cells[2]?.textContent?.trim();

    if (!cashSellText || isNaN(parseFloat(cashSellText))) {
      throw new Error("現金賣出匯率格式錯誤");
    }

    const rate = parseFloat(cashSellText);
    exchangeInput.value = rate.toFixed(2);
    console.log(`成功取得美元現金賣出匯率: ${rate}`);
  } catch (error) {
    console.error("抓取匯率失敗：", error);
    const fallbackRate = prompt("無法自動取得匯率，請手動輸入現金賣出匯率（如 22.5）：");
    if (fallbackRate && !isNaN(fallbackRate)) {
      exchangeInput.value = parseFloat(fallbackRate).toFixed(2);
    } else {
      exchangeInput.value = "錯誤";
      alert("請稍後再試或手動輸入正確匯率");
    }
  }
}

function calculate() {
  const cadPrice = parseFloat(document.getElementById("cadPrice").value);
  const exchangeRate = parseFloat(document.getElementById("exchangeRate").value);

  if (isNaN(cadPrice) || isNaN(exchangeRate)) {
    alert("請輸入正確的商品金額或等待匯率載入完成");
    return;
  }

  const roundedTotal = Math.ceil(cadPrice * exchangeRate * 1.15); // 含5%稅與10%代購費，無條件進位

  document.getElementById("total").innerText = roundedTotal.toLocaleString();
  document.getElementById("result").style.display = "block";
}

function reloadExchangeRate() {
  fetchTaiwanCashSellRate();
}

window.addEventListener("DOMContentLoaded", () => {
  fetchTaiwanCashSellRate();
});
