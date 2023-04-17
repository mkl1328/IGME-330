const template = document.createElement("template");
  template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">
    <style>
      :host {
        display: inline-block;
        height: 3rem;
        line-height: 3rem;
      }
      #link {
        display: inline-block;
        width: 8rem;
      }
      #buttons {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
      }
      a {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
      }
    </style>
    <div class="has-background-link pl-1 pr-1">
      <span id="link" class="is-family-sans-serif">
        <a href="" class="has-text-light">???</a>
      </span>
      <span id="buttons">
        <button class="button is-success is-small">
          <span class="icon is-small">
            <i class="fas fa-check"></i>
          </span>
          <span>Favorite</span>
        </button>
        <button class="button is-warning is-small">
          <span>Delete</span>
          <span class="icon is-small">
            <i class="fas fa-times"></i>
          </span>
        </button>
      </span>
    </div>
  `;


  class MyBookmark extends HTMLElement {
    // called when the component is first created, but before it is added to the DOM
    constructor(){
      super();
      this._fid = "";
      this._text = "RIT";
      this._url = "https://www.rit.edu/";
      this._comments = "No comments found";

      this.attachShadow({mode: "open"});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // tell the component what attributes to "watch"
    static get observedAttributes() {
      return ["data-fid","data-text", "data-url", "data-comments"];
    }

    // ** lifecycle events **

    // called when the component is inserted into the DOM
    connectedCallback(){
      this.render();
    }

    // this method is invoked each time one of the component's "watched" attributes changes
    attributeChangedCallback(attributeName, oldValue, newValue) {
      console.log(attributeName, oldValue, newValue);
      if(oldValue === newValue) return;
      if(attributeName == "data-fid"){
        this._fid = newValue;
      }
      if(attributeName == "data-text"){
        this._text = newValue;
      }
      if(attributeName == "data-url"){
        this._url = newValue;
      }
      if(attributeName == "data-comments"){
        this._comments = newValue;
      }
      this.render();
    }

    // helper method
    render(){
      let a = this.shadowRoot.querySelector("a");
      if(a) {
        a.href = this._url;
        a.textContent = this._text;
        a.title = this._comments;
      }
    }
  }

  customElements.define('my-bookmark', MyBookmark);

  const template2 = document.createElement("template");
  template2.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <header class="hero is-small is-primary is-bold p-2">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Title Placeholder</h1>
          <h2 class="subtitle">Subtitle Placeholder</h2>
        </div>
      </div>
    </header>
  `;


  class MyHero extends HTMLElement {
    // called when the component is first created, but before it is added to the DOM
    constructor(){
      super();
      this._title = "HW-3 - Link Buddy!";
      this._subtitle = "Save your links for later";

      this.attachShadow({mode: "open"});
      this.shadowRoot.appendChild(template2.content.cloneNode(true));
    }

    // tell the component what attributes to "watch"
    static get observedAttributes() {
      return ["data-title","data-subtitle"];
    }

    // ** lifecycle events **

    // called when the component is inserted into the DOM
    connectedCallback(){
      this.render();
    }

    // this method is invoked each time one of the component's "watched" attributes changes
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

    // helper method
    render(){
      let h1 = this.shadowRoot.querySelector("h1");
      if(h1) h1.textContent = this._title;
      let h2 = this.shadowRoot.querySelector("h2");
      if(h2) h2.textContent = this._subtitle;
    }
  }

  customElements.define('my-hero', MyHero);

  export {MyBookmark, MyHero};