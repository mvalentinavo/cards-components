var modal = document.createElement("modal-form");

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(modal);

  const saveSocialHandler = (e) => {
    let card = document.getElementById(e.detail.id);
    if (!card) {
      card = document.createElement("social-card");
    }
    card.setAttribute("id", e.detail.id);
    card.setAttribute("name", e.detail.name);
    card.setAttribute("url", e.detail.url);
    card.setAttribute("photo", e.detail.photo);
    document.querySelector("#list").appendChild(card);
  };

  const editSocialHandler = (e) => {
    modal.show(e.detail);
  };

  const loadSocialsFromLocalStorage = () => {
    console.log("loadSocialsFromLocalStorage");
    const socials = getFromLocalStorage("socials") || [];
    console.log(socials);
    socials.forEach((social) => {
      console.log(social);
      document.dispatchEvent(new CustomEvent("save-social", { detail: social }));
    });
  };

  
  document.addEventListener("save-social", saveSocialHandler);
  document.addEventListener("edit-social", editSocialHandler);
  loadSocialsFromLocalStorage();
});

