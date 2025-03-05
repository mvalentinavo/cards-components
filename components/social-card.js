class SocialCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const id = this.getAttribute("id") || "";
    const name = this.getAttribute("name") || "";
    const url = this.getAttribute("url") || "";
    const photo = this.getAttribute("photo") || "assets/default.jpg";
    
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #ddd;
          padding: 15px;
          margin: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          background: #fff;
          font-family: Arial, sans-serif;
          text-align: center;
          min-width: 200px;
          max-width: 300px;
        }
        .card img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-bottom: 10px;
          object-fit: cover;
        }
        .card h3 {
          margin: 0 0 10px;
          font-size: 18px;
        }
        .card a {
          color: #007bff;
          text-decoration: none;
        }
        .card button {
          margin: 5px;
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .edit {
          background: #28a745;
          color: white;
        }
        .delete {
          background: #dc3545;
          color: white;
        }
      </style>
      <div class="card" id="${id}">
        <img src="${photo}" alt="Foto">
        <h3>${name}</h3>
        <p>URL: <a href="${url}" target="_blank">${url}</a></p>
        <button class="edit">Editar</button>
        <button class="delete">Eliminar</button>
      </div>
    `;
    
    this.shadowRoot.querySelector(".edit").addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("edit-social", { detail: { 
        id: this.getAttribute("id"),
        name: this.getAttribute("name"), 
        url: this.getAttribute("url"), 
        photo: this.getAttribute("photo")
      }}));
    });
    
    this.shadowRoot.querySelector(".delete").addEventListener("click", () => {
      const socials = getFromLocalStorage("socials") || [];
      const updatedSocials = socials.filter(social => social.id !== parseInt(this.getAttribute("id")));
      saveInLocalStorage("socials", updatedSocials);
      this.remove();
    });
  }
}
customElements.define("social-card", SocialCard);