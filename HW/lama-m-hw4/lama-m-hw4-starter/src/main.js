import * as map from "./map.js";
import * as ajax from "./ajax.js";

// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];

let favoriteIds = ["p20","p79","p180","p43"];
let geojson;

const storageKey = "mkl1328-map-favorites";

// II. Functions
const setupUI = () => {
	// NYS Zoom 5.2
	document.querySelector("#btn1").onclick = () => {
		map.setZoomLevel(5.2);
		map.setPitchAndBearing(0,0);
		map.flyTo(lnglatNYS);
	}

	// NYS isometric view
	document.querySelector("#btn2").onclick = () => {
		map.setZoomLevel(5.5);
		map.setPitchAndBearing(45,0);
		map.flyTo(lnglatNYS);
	}

	// World zoom 0
	document.querySelector("#btn3").onclick = () => {
		map.setZoomLevel(3);
		map.setPitchAndBearing(0,0);
		map.flyTo(lnglatUSA);
	}

	refreshFavorites();
}

const showFeatureDetails = (id) => {
	// console.log(`showFeatureDetails - id=${id}`);
	const feature = getFeatureById(id);
	// console.log(feature);
	document.querySelector("#details-1").innerHTML = `Info for ${feature.properties.title}`;
	document.querySelector("#details-2").innerHTML = `<p><strong>Address: </strong>${feature.properties.address}</p>
																										<p><strong>Phone: </strong><a href="tel:${feature.properties.phone}">${feature.properties.phone}</a></p>
																										<p><strong>Website: </strong><a href="${feature.properties.url}">${feature.properties.url}</a></p>
																										<button id="favorite-btn" class="button is-success"><i class="fas fa-check fa-sm"></i>Favorite</button>
																										<button id="delete-btn" class="button is-warning">Delete<i class="fas fa-x fa-xs"</button>
																										`;
	document.querySelector("#details-3").innerHTML = feature.properties.description;
	document.querySelector("#favorite-btn").onclick = () => {addFavorite(feature)};	
	document.querySelector("#delete-btn").onclick = () => {deleteFavorite(feature)};
	if(favoriteIds.includes(id)) {
		document.querySelector("#favorite-btn").setAttribute("disabled","true");
	} else {
		document.querySelector("#delete-btn").setAttribute("disabled","true");
	}
}

const addFavorite = (feature) => {
	document.querySelector("#favorite-btn").setAttribute("disabled","true");
	document.querySelector("#delete-btn").removeAttribute("disabled");
	favoriteIds.push(feature.id);
	refreshFavorites();
	console.log("run")
}

const deleteFavorite = (feature) => {
	document.querySelector("#delete-btn").setAttribute("disabled","true");
	document.querySelector("#favorite-btn").removeAttribute("disabled");
	favoriteIds.splice(favoriteIds.indexOf(feature.id),1);
	refreshFavorites();
}

const getFeatureById = (id) => { return geojson.features.find(element => element.id == id);};

const refreshFavorites = () => {
	const favoritesContainer = document.querySelector("#favorites-list");
	favoritesContainer.innerHTML = "";
	for (const id of favoriteIds) {
		favoritesContainer.appendChild(createFavoriteElement(id));
	}
	localStorage.setItem(storageKey, JSON.stringify(favoriteIds));
}

const createFavoriteElement = (id) => {
	const feature = getFeatureById(id);
	const a = document.createElement("a");
	a.className = "panel-block";
	a.id = feature.id;
	a.onclick = () => {
		showFeatureDetails(a.id);
		map.setZoomLevel(6);
		map.flyTo(feature.geometry.coordinates);
	};
	a.innerHTML = `
		<span class="panel-icon">
			<i class="fas fa-map-pin"></i>
		</span>
		${feature.properties.title}
	`;
	return a;
};

const init = () => {
	map.initMap(lnglatNYS);
	ajax.downloadFile("data/parks.geojson", (str) => {
		geojson = JSON.parse(str);
		console.log(geojson);
		map.addMarkersToMap(geojson, showFeatureDetails);
		setupUI();
	});
	let favIDs = JSON.parse(localStorage.getItem(storageKey));
	if(favIDs) { 
		favoriteIds = favIDs; 
	}
};

init();