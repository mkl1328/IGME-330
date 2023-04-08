class myFooter extends HTMLElement {
  constructor() {
    super();
    this.name = "Max Lama";
    this.year = "2023";
  }

  static get observedAttributes() {
    return ["data-name", "data-year"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if(oldValue === newValue) return;
    if(attributeName == "data-name") {
      this.name = newValue;
    }
    if(attributeName == "data-year") {
      this.year = newValue;
    }
    this.render();
  }

  render() {
    this.innerHTML = `&copy; ${this.year} ${this.name}`
    // this.textContent = `&copy; ${this.year} ${this.name}`;
  }
}

customElements.define('my-footer', myFooter);