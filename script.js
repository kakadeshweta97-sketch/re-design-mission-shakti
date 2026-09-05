
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("loginModal");
  const openLogin = document.querySelectorAll("[data-login]");
  const closeLogin = document.querySelectorAll("[data-close]");
  openLogin.forEach(btn => btn.addEventListener("click", () => modal?.classList.add("show")));
  closeLogin.forEach(btn => btn.addEventListener("click", () => modal?.classList.remove("show")));
  modal?.addEventListener("click", e => { if(e.target === modal) modal.classList.remove("show"); });

  const langBtn = document.querySelector("[data-lang]");
  langBtn?.addEventListener("click", () => {
    const english = document.body.dataset.lang !== "mr";
    document.body.dataset.lang = english ? "mr" : "en";
    document.querySelectorAll("[data-en][data-mr]").forEach(el => {
      el.textContent = english ? el.dataset.mr : el.dataset.en;
    });
    langBtn.textContent = english ? "English" : "मराठी";
  });

  const skip = document.querySelector("[data-skip]");
  skip?.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("main-content")?.focus();
    document.getElementById("main-content")?.scrollIntoView({behavior:"smooth"});
  });

  const input = document.querySelector("[data-search]");
  const box = document.querySelector("[data-results]");
  const items = [...document.querySelectorAll("[data-search-item]")];
  input?.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if(!q){ box?.classList.remove("show"); return; }
    const matches = items.filter(i => i.textContent.toLowerCase().includes(q)).slice(0,7);
    if(!box) return;
    box.innerHTML = matches.length
      ? matches.map(i => `<a class="result" target="_blank" href="${i.dataset.href}"><b>${i.dataset.title}</b>${i.dataset.desc}</a>`).join("")
      : `<div class="result">No matching page found. Try “women”, “child”, “RTS”, “RTI” or “charter”.</div>`;
    box.classList.add("show");
  });
  document.addEventListener("click", e => {
    if(!e.target.closest(".search")) box?.classList.remove("show");
  });

  const year = document.querySelector("[data-year]");
  if(year) year.textContent = new Date().getFullYear();

  document.querySelectorAll("[data-demo]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      alert("This is a frontend demonstration. Connect this button to the official portal/backend before production use.");
    });
  });
});
