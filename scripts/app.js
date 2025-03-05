document.addEventListener("DOMContentLoaded", () => {
  const modal = document.createElement("modal-form");
  document.body.appendChild(modal);

  document.querySelector("#create").addEventListener("click", () => {
    modal.show();
  });

  document.addEventListener("save-social", (e) => {
    let card = document.querySelector(`[data-id="${e.detail.id}"]`) || document.createElement("social-card");
    card.setAttribute("name", e.detail.name);
    card.setAttribute("url", e.detail.url);
    card.setAttribute("photo", e.detail.photo);
    document.querySelector("#list").appendChild(card);
    saveToLocalStorage();
  });

  document.addEventListener("edit-social", (e) => {
    modal.show(e.detail);
  });
});
