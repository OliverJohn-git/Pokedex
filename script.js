let allPokemon = [];
let pokemonI = 0;
const POKEMON_BATCH_SIZE = 20;
let observer;
let isLoading = false;

const typeColors = {
    Grass: '#78C850',
    Fire: '#F08030',
    Water: '#6890F0',
    Bug: '#A8B820',
    Normal: '#A8A878',
    Poison: '#A040A0',
    Electric: '#F8D030',
    Ground: '#E0C068',
    Fairy: '#EE99AC',
    Fighting: '#C03028',
    Psychic: '#F85888',
    Rock: '#B8A038',
    Ghost: '#705898',
    Ice: '#98D8D8',
    Dragon: '#7038F8',
    Dark: '#705848',
    Steel: '#B8B8D0',
    Flying: '#A890F0'
};

function init() {
    loadPokeApi();
    initObserver();
}

async function loadPokeApi() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`);
    let pokeApi = await response.json();
    allPokemon = pokeApi.results;
    renderPokeCard(); 
}

async function renderPokeCard() {
    let content = document.getElementById('content');
    for (let i = pokemonI; i < pokemonI + POKEMON_BATCH_SIZE && i < allPokemon.length; i++) {
        let singlePokemon = await singlePokemonData(allPokemon[i].url);
        let pokeTypeOne = singlePokemon.types[0].type.name.charAt(0).toUpperCase() + singlePokemon.types[0].type.name.slice(1);
        let pokeTypeTwo = singlePokemon.types.length > 1 ? singlePokemon.types[1].type.name.charAt(0).toUpperCase() + singlePokemon.types[1].type.name.slice(1) : null;

        pokemonCardTemp(i, singlePokemon, pokeTypeOne, pokeTypeTwo);
    }
    pokemonI += POKEMON_BATCH_SIZE;
    isLoading = false;
    observeLastPokemon(); 
}

async function singlePokemonData(url) {
    let singlePokemonResponse = await fetch(url);
    let singlePokemonApi = await singlePokemonResponse.json();
    return singlePokemonApi;
}

function loadMorePokemon() {
    if (!isLoading){
        isLoading = true;
        renderPokeCard();
    }
}

function searchPokemon() {
    let searchQuery = document.getElementById('searchBar').value.toLowerCase();
    if (searchQuery.length < 3) {
        return; 
    }
    let filteredPokemon = allPokemon.filter(pokemon =>
        pokemon.name.includes(searchQuery)
    );
    renderSearchedPokemon(filteredPokemon);
}

async function renderSearchedPokemon(filteredPokemon) {
    let content = document.getElementById('content');
    content.innerHTML = ""; 

    for (let pokemon of filteredPokemon) {
        let singlePokemon = await singlePokemonData(pokemon.url);
        let pokeTypeOne = singlePokemon.types[0].type.name.charAt(0).toUpperCase() + singlePokemon.types[0].type.name.slice(1);
        let pokeTypeTwo = singlePokemon.types.length > 1 ? singlePokemon.types[1].type.name.charAt(0).toUpperCase() + singlePokemon.types[1].type.name.slice(1) : null;

        pokemonCardTemp(allPokemon.indexOf(pokemon), singlePokemon, pokeTypeOne, pokeTypeTwo);
    }
}

function initObserver() {
    const options = {
        root: null, 
        rootMargin: '0px',
        threshold: 1.0 
    };

    observer = new IntersectionObserver(handleIntersect, options);
    observeLastPokemon();
}

function observeLastPokemon() {
    let lastPokemonCard = document.querySelector('.singlePokemonCard:last-child');
    if (lastPokemonCard) {
        observer.observe(lastPokemonCard);
    }
}

function handleIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadMorePokemon(); 
            observer.unobserve(entry.target); 
            setTimeout(observeLastPokemon, 500); 
        }
    });
}
