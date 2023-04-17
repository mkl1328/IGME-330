import { MyBookmark, MyHero } from "./Components.js";
import { Favorite } from "./favorite.js"
import { storeFavorites, getFavorites } from "./localStorage.js";

let favorites = [];

const submitClicked = (evt) => {
  console.log("submitClicked");
  evt.preventDefault();

  let inputs = document.querySelectorAll(".input");
  let addText = inputs[0].value.trim();
  let addURL = inputs[1].value.trim();
  let addComments = inputs[2].value.trim();

  if(addText && addURL && addComments) {
    let newFave = new Favorite(crypto.randomUUID(), addText, addURL, addComments);
    favorites.push(newFave)
    createBookmarkComponent(newFave.fid, newFave.text, newFave.url, newFave.comments);
    updateFavoritesNumber();
    storeFavorites(favorites);

    console.log("added Favorite");
  } else {
    // Alert empty cells
    console.error("All fields need to be filled.")

    if(!addText) {
      inputs[0].classList.add("is-danger");
      //clears input box if there are just spaces.
      inputs[0].value = "";
    }
    if(!addURL) {
      inputs[1].classList.add("is-danger");
      inputs[1].value = "";
    }
    if(!addComments) {
      inputs[2].classList.add("is-danger");
      inputs[2].value = ""
    }
  }
  return false;
}

const clearFormFields = (evt) => {
  let inputs = document.querySelectorAll(".input");
  for(let box of inputs) {
    box.value = "";
  }
  evt.preventDefault();
  return false;
}

const deleteFavorite = (fid) => {

  console.log("Delete")
  
  let toDelete = document.querySelector(`li my-bookmark[data-fid='${fid}']`);
  console.log(toDelete);
  for(let i = 0; i < favorites.length; i++) {
    console.log(favorites[i])
    if (fid == favorites[i].fid) {
      favorites.splice(i,1);
    }
  }
  toDelete.remove()
  console.log(favorites)
  storeFavorites(favorites);
  updateFavoritesNumber();
}

const createBookmarkComponent = (fid, text, url, comments) => {
  let newBookmark = document.createElement("my-bookmark");
  newBookmark.dataset.fid = fid
  newBookmark.dataset.text = text;
  newBookmark.dataset.url = url;
  newBookmark.dataset.comments = comments;

  const newLI = document.createElement("li");
  newLI.appendChild(newBookmark);
  document.querySelector("#bookmarks").appendChild(newLI);

  initButtons(newBookmark);
}

const createHero = (title, subtitle) => {
  let newHero = document.createElement("my-hero");
  newHero.dataset.title = title;
  newHero.dataset.subtitle = subtitle;

  document.body.prepend(newHero);
}

const loadFavoritesFromStorage = (toLoad = favorites) => {
  if(favorites) {
    for(let fav of toLoad) {
      createBookmarkComponent(fav.fid, fav.text, fav.url, fav.comments);
    }
  }
}

const updateFavoritesNumber = () => {
  let numberToDisplay = favorites? favorites.length : 0; 
  let numberOfFavorites = document.querySelector("#number-of-favorites");
  numberOfFavorites.innerHTML = `Number of favorites: ${numberToDisplay}`
}

const setupUI = () => {
  document.querySelector("#favorite-submit-button").onclick = submitClicked;
  document.querySelector("#favorite-cancel-button").onclick = clearFormFields;

  let inputBoxes = document.querySelectorAll(".input");
  for(let inputBox of inputBoxes) {
    inputBox.onfocus = () => inputBox.classList.remove("is-danger")
  }
} 

const initButtons = (item) => {
  let deleteButton = item.shadowRoot.querySelector("button").nextElementSibling//.parentNode.childNodes//.lastChild//.lastChild;
  console.log(deleteButton);
  deleteButton.onclick = () => deleteFavorite(item.dataset.fid);

  let favoriteButton = item.shadowRoot.querySelector("button");
  favoriteButton.setAttribute("disabled", true);
}

window.onload = () => {
  createHero("HW-3 - Link Buddy!","Save your links for later")
  
  favorites = getFavorites();
  if(!favorites) {
    favorites = [];
    favorites.push(new Favorite(crypto.randomUUID(), "RIT", "https://www.rit.edu", "A private university located near Rochester, NY."));
  }
  storeFavorites(favorites);
  loadFavoritesFromStorage();
  updateFavoritesNumber();
  setupUI();
}

// const bookmarks = [
//   {
//     text: "Bing",
//     url: "https://www.bing.com",
//     comments: "Bing is a web search engine owned and operated by Microsoft."
//   },
//   {
//     text: "Google",
//     url: "https://www.google.com",
//     comments: "Google Search is a search engine provided and operated by Google."
//   },
//   {
//     text: "DuckDuckGo",
//     url: "https://duckduckgo.com/",
//     comments: "DuckDuckGo (DDG) is an internet search engine that emphasizes protecting searchers' privacy."
//   }
// ];

// window.onload = () => {
//   // // Create a MyBookmark and add it to the list
//   // const bing = document.createElement("my-bookmark");

//   // // ANOTHER way to set custom attributes, the .dataset property
//   // // note that these 2 lines of code will also trigger attributeChangedCallback()
//   // bing.dataset.text = "Bing";
//   // bing.dataset.url = "https://www.bing.com/";

//   // const newLI = document.createElement("li");
//   // newLI.appendChild(bing);
//   // document.querySelector("#bookmarks").appendChild(newLI);

//   for(let bookmark of bookmarks) {
//     let bmConstructor = document.createElement("my-bookmark");
//     bmConstructor.dataset.text = bookmark.text;
//     bmConstructor.dataset.url = bookmark.url;
//     bmConstructor.dataset.comments = bookmark.comments;

//     const newLI = document.createElement("li");
//     newLI.appendChild(bmConstructor);
//     document.querySelector("#bookmarks").appendChild(newLI);
//   }
// };