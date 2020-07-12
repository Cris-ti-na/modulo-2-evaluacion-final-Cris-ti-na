'use strict';

const API_DATA = {
    baseUrl: 'http://api.tvmaze.com',
    endpoint: 'search/shows'
};

let favourites = [];

const form = document.getElementById('searchForm');

const setEventListenerToShow = (show, item) => {
    const {
        image,
        name,
        id
    } = show;

    item.addEventListener('click', e => {
        e.preventDefault();
        const itemToPush = {id, image, name};
        if (favourites.some(el => el.id === itemToPush.id)) {
            favourites = favourites.filter(el => el.id !== itemToPush.id);
            item.classList.remove('favourite');
        } else {
            const favouritesList = document.querySelector('#favourites');
            favourites.push(itemToPush);
            item.classList.add('favourite');
            renderShow(itemToPush, favouritesList.querySelector('.series-container-list'));
        }

    });

}

const renderShow = (show, target) => {
    const {
        image,
        name,
    } = show;
    const altImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    const altText = 'No hay imagen disponible';
    const item = document.createElement('div');
    const template = `
                    <img src="${image ? image.original : altImage}" 
                         alt="${image ? name : altText}"
                         title="${name}">
                    <h3>${name}</h3>
                    <div class="results-item-favourite">
                        <i class="fa fa-star fa-2x"><span class="reader">Mark as Favourite</span></i>
                    </div>
                `;

    item.classList.add('results-item');
    item.innerHTML = template;

    setEventListenerToShow(show, item)

    target.appendChild(item);
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const query = document.getElementById('formQuery').value;
    const apiUrl = `${API_DATA.baseUrl}/${API_DATA.endpoint}?q=${query}`;
    const target = document.querySelector('#result');

    target.querySelector('.series-container-list').innerHTML = '';
    fetch(apiUrl)
        .then(res => res.json())
        .then(results => {
            results.forEach(result => {
                renderShow(result.show, target.querySelector('.series-container-list'));
            });
        });
});
'use strict';

console.log('>> Ready :)');

const form = document.querySelector('#form');

let shows = []
let favourites = []

form.addEventListener('submit', function(event){
    event.preventDefault();
    
    const resultsList = document.querySelector('#resultsList');
    resultsList.innerHTML = '';
    

    const search = document.querySelector('#input-search');
    const searchValue = search.value;

    const API_DATA = {
        baseUrl: 'http://api.tvmaze.com',
        endpoint: 'search/shows'
    }
    const apiUrl = `${API_DATA.baseUrl}/${API_DATA.endpoint}?q=${searchValue}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(results => {
            results.forEach(result => {
                renderShow(result);
            })                
        });

    function renderShow (element) {
        /*
        // OPERADOR LÓGICO AND / OR
        const template = `
            <div class="results-item">   
            <img    src="${(element.show.image && element.show.image.original) || 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'}"
                    alt="${(element.show.image && element.show.name) || 'No hay imagen disponible'}">
                <h2>${element.show.name}</h2>
            </div>
        `;
        */
        
        // OPERADOR TERNARIO
        const template = `
            <img
                src="${element.show.image ? element.show.image.original : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'}"
                alt="${element.show.image ? element.show.name : 'No hay imagen disponible'}">
            <h3>${element.show.name}</h3>
        `;
        const item = document.createElement('div');
        item.classList.add('results-item');
        item.innerHTML = template;

        item.addEventListener ('click', (event) => {
            if (favourites.includes(element)) {
                console.log('sí');
                favourites.splice(favourites.indexOf(element), 1);
                item.classList.remove('favourite');
            } else {
                console.log('no');
                favourites.push(element);
                item.classList.add('favourite');
            }
            //console.log(favourites);
        });

        resultsList.appendChild(item);

        const favouritesList = document.querySelector('#favouritesList');
        favouritesList.innerHTML = 
    }

});
//# sourceMappingURL=main.js.map
