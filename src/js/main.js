'use strict';

const API_DATA = 'http://api.tvmaze.com/search/shows';

let shows = [];
let favourites = getFavouritesFromLocalStorage();

const form = document.querySelector('#searchForm');

function setEventListenerToShow (show, item) {
    const {image, name, id} = show;

    item.addEventListener('click', event => {
        event.preventDefault();
        const itemToPush = {id, image, name};
        if (favourites.some(element => element.id === itemToPush.id)) {
            favourites = favourites.filter(element => element.id !== itemToPush.id);
            item.classList.remove('favourite');
        } else {
            favourites.push(itemToPush);
            item.classList.add('favourite');
        }
        renderFavourites();
        renderShows();
        setFavouritesToLocalStorage();
        getFavouritesFromLocalStorage();
    });
}

function renderShow (show, target) {
    const {image, name, id} = show;
    const altImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV-SHOW';
    const altText = 'No hay imagen disponible';
    const item = document.createElement('div');
    const template = `
                    <img src="${image ? image.original : altImage}" 
                         alt="${image ? name : altText}"
                         title="${name}">
                    <h3>${name}</h3>
                    <div class="results-item-favourite">
                        <i class="fa fa-star fa-2x"><span class="star"></span></i>
                    </div>
                `;

    item.classList.add('results-item');
    if (favourites.some(element => element.id === id)) {
        item.classList.add('favourite');
    }
    item.innerHTML = template;

    setEventListenerToShow(show, item)

    target.appendChild(item);
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const query = document.getElementById('formQuery').value;
    const apiUrl = `${API_DATA}?q=${query}`;
    const target = document.querySelector('#result');

    shows = [];

    target.querySelector('.series__container-list').innerHTML = '';
    fetch(apiUrl)
        .then(res => res.json())
        .then(results => {
            results.forEach(result => {
                shows.push(result.show);
            });

            renderShows();
        });
});

function renderFavourites () {
    const favouritesList = document.querySelector('#favourites .series__container-list');
    favouritesList.innerHTML = '';
    favourites.forEach(favourite => {
        renderShow(favourite, favouritesList)
    });
}

function renderShows () {
    const showsList = document.querySelector('#result .series__container-list');
    showsList.innerHTML = '';
    shows.forEach(show => {
        renderShow(show, showsList)
    });
}

function setFavouritesToLocalStorage() {
    localStorage.setItem('favourites', JSON.stringify(favourites));
}

function getFavouritesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('favourites')) || [];
}

renderFavourites ();


/*
Cuando haga click en el botón
favourites = []
renderFavourites();
renderShows();
setFavouritesToLocalStorage();
*/