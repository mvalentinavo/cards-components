class ModalForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.editingId = null;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: none;
          align-items: center;
          justify-content: center;
        }
        .modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 300px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .modal input {
          width: calc(100% - 16px);
          padding: 8px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .modal button {
          width: 48%;
          padding: 10px;
          margin: 5px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .buttons {
          display: flex;
        }
        #save {
          background: #28a745;
          color: white;
        }
        #cancel {
          background: #dc3545;
          color: white;
        }
        
      </style>
      <div class="modal-overlay">
        <div class="modal">
          <h2>Crea tu Red Social</h2>
          <div>
            <label>Nombre:</label>
            <input type="text" id="name">
          </div>
          <label>URL: <input type="url" id="url"></label>
          <label>Foto: <input type="file" id="photo" accept="image/*"></label>
          <div class="buttons">
            <button id="save">Guardar</button>
            <button id="cancel">Cancelar</button>
          </div>
        </div>
      </div>
    `;
    this.shadowRoot.querySelector("#save").addEventListener("click", () => this._save());
    this.shadowRoot.querySelector("#cancel").addEventListener("click", () => this.hide());
  }

  show(data = {}) {
    this.editingId = data.id ? parseInt(data.id) : null;
    this.shadowRoot.querySelector("#name").value = data.name || "";
    this.shadowRoot.querySelector("#url").value = data.url || "";
    this.shadowRoot.querySelector("#photo").value = "";
    this.shadowRoot.querySelector(".modal-overlay").style.display = "flex";
  }

  hide() {
    this.shadowRoot.querySelector(".modal-overlay").style.display = "none";
  }

  async _save() {
    const name = this.shadowRoot.querySelector("#name").value;
    const url = this.shadowRoot.querySelector("#url").value;
    const photoInput = this.shadowRoot.querySelector("#photo");
    
    const socials = getFromLocalStorage("socials") || [];
    
    let photo = "assets/default.jpg";
    if (photoInput.files[0]) {
      photo = await fileToBase64(photoInput.files[0]);
    } else if (this.editingId) {
      const existingSocial = socials.find(social => social.id === this.editingId);
      if (existingSocial && existingSocial.photo) {
        photo = existingSocial.photo;
      }
    }
    
    const newSocial = { id: this.editingId || Date.now(), name, url, photo };
    const existingIndex = socials.findIndex(social => social.id === newSocial.id);
    if (existingIndex !== -1) {
      socials[existingIndex] = newSocial;
    } else {
      socials.push(newSocial);
    }
    saveInLocalStorage("socials", socials);
    document.dispatchEvent(new CustomEvent("save-social", { detail: newSocial }));
    this.hide();

    this.shadowRoot.querySelector("#name").value = "";
    this.shadowRoot.querySelector("#url").value = "";
    this.shadowRoot.querySelector("#photo").value = "";
  }
}
customElements.define("modal-form", ModalForm);
