const headerTemplate = document.createElement("template");
  headerTemplate.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <header class="hero is-small is-info is-bold p-2">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Title Placeholder</h1>
          <h2 class="subtitle">Subtitle Placeholder</h2>
        </div>
      </div>
    </header>
  `;


  class MyHeader extends HTMLElement {
    constructor(){
      super();
      this._title = "HW-4 - NY State Park Buddy!";
      this._subtitle = "Your one-stop resource for NYS parks!";

      this.attachShadow({mode: "open"});
      this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
    }

    static get observedAttributes() {
      return ["data-title","data-subtitle"];
    }

    connectedCallback(){
      this.render();
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
      console.log(attributeName, oldValue, newValue);
      if(oldValue === newValue) return;
      if(attributeName == "data-title"){
        this._title = newValue;
      }
      if(attributeName == "data-subtitle"){
        this._subtitle = newValue;
      }
    }

    render(){
      let h1 = this.shadowRoot.querySelector("h1");
      if(h1) h1.textContent = this._title;
      let h2 = this.shadowRoot.querySelector("h2");
      if(h2) h2.textContent = this._subtitle;
    }
  }

  const footerTemplate = document.createElement("template");
  footerTemplate.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <div class="footer has-background-info has-text-centered has-text-light p-1">Footer Placeholder</div>
  `;


  class MyFooter extends HTMLElement {
    constructor(){
      super();
      this._footerText = "\u00A9 2023 Max Lama";
      this.attachShadow({mode: "open"});
      this.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
    }

    static get observedAttributes() {
      return ["footer-text"];
    }

    connectedCallback(){
      this.render();
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
      console.log(attributeName, oldValue, newValue);
      if(oldValue === newValue) return;
      if(attributeName == "footer-text"){
        this._footerText = newValue;
      }
    }

    render(){
      let div = this.shadowRoot.querySelector("div");
      if(div) div.textContent = this._footerText;
    }
  }

  customElements.define('my-header', MyHeader);
  customElements.define('my-footer', MyFooter);

  export{MyHeader, MyFooter};