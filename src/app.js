import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import {validateIp} from './helpers/index.js';
import icon from '../images/icon-location.svg';


const inputIp = document.querySelector(".search-bar__input");
const btnSearchId = document.querySelector(".search-bar__btn");

const ip = document.getElementById('ip');
const location = document.getElementById('location');
const timeZone = document.getElementById('timeZone');
const isp = document.getElementById('isp');


const mapArea = document.querySelector('.map');

const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
});

L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

const setInfo = (mapData) => {
    const {country, timezone, lat,lng} = mapData.location;
    ip.innerText = mapData.ip;
    location.innerText = country;
    timeZone.innerText = timezone;
    isp.innerText = mapData.isp;

    map.setView([lat, lng]);
    L.marker([lat, lng], {icon: markerIcon}).addTo(map);
}

const getData = () => {
    if (validateIp(inputIp.value)) {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_L7jdQzQbDnBhEdK18XT83Yy7O0gOP&ipAddress=${inputIp.value}`)
        .then(res => res.json())
        .then(setInfo)
    }
}

const hendleKey = (e) => {
    if (e.key === 'Enter') {
        getData();
    }
}


btnSearchId.addEventListener('click', getData);
inputIp.addEventListener('keydown',hendleKey);