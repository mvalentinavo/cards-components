class SocialCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
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
        }
        .card img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-bottom: 10px;
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
      <div class="card">
        <img src="${this.getAttribute("photo") || "default.jpg"}" alt="Foto">
        <h3>${this.getAttribute("name")}</h3>
        <p>URL: <a href="${this.getAttribute("url")}" target="_blank">${this.getAttribute("url")}</a></p>
        <button class="edit">Editar</button>
        <button class="delete">Eliminar</button>
      </div>
    `;
    this.shadowRoot.querySelector(".edit").addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("edit-social", { detail: { 
        id: this.dataset.id, 
        name: this.getAttribute("name"), 
        url: this.getAttribute("url"), 
        photo: this.getAttribute("photo")
      }}));
    });
    this.shadowRoot.querySelector(".delete").addEventListener("click", () => {
      this.remove();
      deleteCard(this.dataset.id);
      saveToLocalStorage();
    });
  }
}
customElements.define("social-card", SocialCard);