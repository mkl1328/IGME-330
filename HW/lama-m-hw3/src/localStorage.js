const storeFavorites = (obj) => {
  localStorage.setItem("mkl_HW3_favorites", JSON.stringify(obj));
}

const getFavorites = () => {
  let favList = JSON.parse(localStorage.getItem("mkl_HW3_favorites"));
  return favList;
}

export{storeFavorites, getFavorites}