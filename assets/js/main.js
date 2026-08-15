// =========================================================
// Baby Names Site — shared behaviour
// =========================================================

// ---- mobile nav toggle ----
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
});

// ---- countdown to due date (Jan 2027, exact day withheld/unknown) ----
function startCountdown(targetId, targetDate) {
  const el = document.getElementById(targetId);
  if (!el) return;
  function render() {
    const now = new Date();
    let diff = targetDate.getTime() - now.getTime();
    if (diff < 0) diff = 0;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    el.querySelector('[data-unit="days"] .num').textContent = days;
    el.querySelector('[data-unit="weeks"] .num').textContent = weeks;
  }
  render();
  setInterval(render, 1000 * 60 * 30); // refresh every 30 min, no need for per-second
}
window.startCountdown = startCountdown;

// ---- Rashi directory (names.html) ----
async function initNamesDirectory() {
  const listEl = document.getElementById("rashi-list");
  if (!listEl) return;

  let data;
  try {
    const res = await fetch("assets/data/names.json");
    data = await res.json();
  } catch (err) {
    listEl.innerHTML = '<p class="empty-state">Could not load the name list right now — please refresh.</p>';
    return;
  }

  const searchInput = document.getElementById("name-search");
  const genderButtons = document.querySelectorAll(".gender-toggle button");
  let activeGender = "both";
  let query = "";
  const openIds = new Set();

  function tagClass(tag) {
    const clean = tag.replace(/[^a-zA-Z]/g, "").toLowerCase();
    return "tag tag-" + clean;
  }

  function nameCard(entry) {
    const noteHtml = entry.note ? `<div class="src">${entry.note}</div>` : "";
    return `
      <div class="name-card" data-name="${entry.name.toLowerCase()}">
        <div class="nm">${entry.name}</div>
        <div class="mn">${entry.meaning}</div>
        ${noteHtml}
        <span class="${tagClass(entry.tag)}">${entry.tag}</span>
      </div>`;
  }

  function matchesQuery(entry) {
    if (!query) return true;
    const q = query.toLowerCase();
    return entry.name.toLowerCase().includes(q) || entry.meaning.toLowerCase().includes(q);
  }

  function renderRashi(rashi) {
    const boys = rashi.boys.filter(matchesQuery);
    const girls = rashi.girls.filter(matchesQuery);

    const showBoys = activeGender === "both" || activeGender === "boy";
    const showGirls = activeGender === "both" || activeGender === "girl";

    let bodyHtml = `<div class="letters-hint">Starting sounds: ${rashi.letters
      .map((l) => `<span class="chip">${l}</span>`)
      .join(" ")}</div>`;

    if (showBoys) {
      bodyHtml += `<div class="name-group"><h4>Boy names</h4>`;
      bodyHtml += boys.length
        ? `<div class="name-cards">${boys.map(nameCard).join("")}</div>`
        : `<div class="empty-state">No boy names yet for ${rashi.name} — be the first to suggest one!</div>`;
      bodyHtml += `</div>`;
    }
    if (showGirls) {
      bodyHtml += `<div class="name-group"><h4>Girl names</h4>`;
      bodyHtml += girls.length
        ? `<div class="name-cards">${girls.map(nameCard).join("")}</div>`
        : `<div class="empty-state">No girl names yet for ${rashi.name} — be the first to suggest one!</div>`;
      bodyHtml += `</div>`;
    }

    const totalShown = (showBoys ? boys.length : 0) + (showGirls ? girls.length : 0);

    return { html: bodyHtml, totalShown };
  }

  function render() {
    listEl.innerHTML = "";
    data.rashis.forEach((rashi, idx) => {
      const { html, totalShown } = renderRashi(rashi);
      if (query && totalShown === 0) return; // hide whole card if searching and no matches

      const isOpen = openIds.has(rashi.id) || (query && totalShown > 0);
      const card = document.createElement("div");
      card.className = "rashi-card" + (isOpen ? " open" : "");
      card.innerHTML = `
        <button class="rashi-head" aria-expanded="${isOpen ? "true" : "false"}">
          <span class="rashi-symbol">${rashi.symbol}</span>
          <span class="rashi-titles">
            <span class="name">${rashi.name} <span style="color:var(--ink-soft); font-weight:600;">· ${rashi.gujarati}</span></span>
            <span class="meta">${rashi.zodiac} sun-sign name, for reference — Rashi is set by the Moon</span>
          </span>
          <span class="rashi-chevron">⌄</span>
        </button>
        <div class="rashi-body">${html}</div>
      `;
      const head = card.querySelector(".rashi-head");
      head.addEventListener("click", () => {
        const nowOpen = card.classList.toggle("open");
        head.setAttribute("aria-expanded", nowOpen ? "true" : "false");
        if (nowOpen) openIds.add(rashi.id);
        else openIds.delete(rashi.id);
      });
      listEl.appendChild(card);
    });

    if (query && listEl.children.length === 0) {
      listEl.innerHTML = '<p class="empty-state">No names match your search yet — try another spelling, or suggest one!</p>';
    }
  }

  searchInput?.addEventListener("input", (e) => {
    query = e.target.value.trim();
    render();
  });

  genderButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      genderButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeGender = btn.dataset.gender;
      render();
    });
  });

  render();
}

document.addEventListener("DOMContentLoaded", initNamesDirectory);
