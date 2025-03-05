var modal = document.createElement("modal-form");

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(modal);

  const saveSocialHandler = (e) => {
    let card = document.querySelector(`[data-id="${e.detail.id}"]`) || document.createElement("social-card");
    card.setAttribute("name", e.detail.name);
    card.setAttribute("url", e.detail.url);
    card.setAttribute("photo", e.detail.photo);
    document.querySelector("#list").appendChild(card);
  };

  const editSocialHandler = (e) => {
    modal.show(e.detail);
  };

  const loadSocialsFromLocalStorage = () => {
    const socials = getFromLocalStorage("socials") || [];
    socials.forEach((social) => {
      document.dispatchEvent(new CustomEvent("save-social", { detail: social }));
    });
  };

  loadSocialsFromLocalStorage();

  document.addEventListener("save-social", saveSocialHandler);
  document.addEventListener("edit-social", editSocialHandler);
});

