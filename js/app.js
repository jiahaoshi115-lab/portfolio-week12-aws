(() => {
  const app = window.PORTFOLIO;
  if (!app) return;
  const { profile, projects } = app;
  document.querySelectorAll("[data-profile]").forEach((node) => {
    const value = profile[node.dataset.profile];
    if (Array.isArray(value)) {
      node.replaceChildren(...value.map((item) => { const li = document.createElement("li"); li.textContent = item; return li; }));
    } else if (value != null) {
      node.textContent = value;
      if (node.dataset.profile === "email") node.href = `mailto:${value}`;
    }
  });
  const nav = document.querySelector(".site-nav");
  const button = document.querySelector(".menu-button");
  if (nav && button) button.addEventListener("click", () => { const open = nav.classList.toggle("open"); button.setAttribute("aria-expanded", String(open)); });
  const active = document.body.dataset.page;
  document.querySelector(`[data-nav="${active}"]`)?.classList.add("active");
  const list = document.querySelector("#project-list");
  const dialog = document.querySelector("#project-dialog");
  if (!list || !dialog) return;
  projects.forEach((project, index) => {
    const card = document.createElement("article"); card.className = "project-card";
    card.innerHTML = `<p class="eyebrow">${project.category}</p><h2>${project.title}</h2><p>${project.summary}</p><button class="text-button" type="button">상세 보기</button>`;
    card.querySelector("button").addEventListener("click", () => {
      dialog.querySelector("#dialog-category").textContent = project.category;
      dialog.querySelector("#dialog-title").textContent = project.title;
      dialog.querySelector("#dialog-description").textContent = project.description;
      dialog.querySelector("#dialog-skills").replaceChildren(...project.skills.map((skill) => { const li = document.createElement("li"); li.textContent = skill; return li; }));
      dialog.showModal();
    });
    list.append(card);
  });
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
})();
