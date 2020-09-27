const weather = document.querySelector(".js-weather");
const jsPlace = document.querySelector(".js-place");

const API_KEY = "6bcba254b4a97aa3209a7fb8f751494a";
const COORDS = 'coords';

function getWeather(lat, lon) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
		).then(function(response) {
			return response.json();
		})
		.then(function(json) {
			const temperature = json.main.temp;
			const place = json.name;
			weather.innerText = `${temperature}`;
			jsPlace.innerText = `@ ${place}`;
		});
}

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError() {
	console.log("Can't access geo location");
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords() {
	const loadedCoords = localStorage.getItem(COORDS);
	if(loadedCoords === null) {
		askForCoords();
	} else {
		const parseCoords = JSON.parse(loadedCoords);
		getWeather(parseCoords.latitude, parseCoords.longitude);
	}
}

function init() {
	loadCoords();
}

init();