(() => {
  const form = document.querySelector("#guestbook-form");
  const list = document.querySelector("#guestbook-list");
  if (!form || !list) return;
  const key = "portfolio-guestbook-v1";
  const read = () => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } };
  const render = () => {
    const entries = read(); list.replaceChildren();
    if (!entries.length) { const empty = document.createElement("p"); empty.className = "empty-state"; empty.textContent = "아직 등록된 메시지가 없습니다."; list.append(empty); return; }
    entries.forEach((entry) => { const article = document.createElement("article"); article.className = "guestbook-entry"; const head = document.createElement("div"); const name = document.createElement("strong"); name.textContent = entry.name; const time = document.createElement("time"); time.dateTime = entry.createdAt; time.textContent = new Date(entry.createdAt).toLocaleDateString("ko-KR"); const message = document.createElement("p"); message.textContent = entry.message; head.append(name, time); article.append(head, message); list.append(article); });
  };
  form.addEventListener("submit", (event) => { event.preventDefault(); const values = new FormData(form); const entries = read(); entries.unshift({ name: String(values.get("name")).trim(), message: String(values.get("message")).trim(), createdAt: new Date().toISOString() }); localStorage.setItem(key, JSON.stringify(entries.slice(0, 30))); form.reset(); document.querySelector("#form-status").textContent = "메시지가 이 브라우저에 저장되었습니다."; render(); });
  render();
})();
