let allPokemon = [];
let pokemonI = 0;
const POKEMON_BATCH_SIZE = 35;

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
}

async function loadPokeApi() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    let pokeApi = await response.json();
    allPokemon = pokeApi.results;
    renderPokeCard(); // Initiales Rendern
}

async function renderPokeCard() {
    let content = document.getElementById('content');
    for (let i = pokemonI; i < pokemonI + POKEMON_BATCH_SIZE && i < allPokemon.length; i++) {
        let singlePokemon = await singlePokemonData(allPokemon[i].url);
        let pokeTypeOne = singlePokemon.types[0].type.name.charAt(0).toUpperCase() + singlePokemon.types[0].type.name.slice(1);
        let pokeTypeTwo = singlePokemon.types.length > 1 ? singlePokemon.types[1].type.name.charAt(0).toUpperCase() + singlePokemon.types[1].type.name.slice(1) : null;

        pokemonCardTemp(i, singlePokemon, pokeTypeOne, pokeTypeTwo);
    }
    pokemonI += POKEMON_BATCH_SIZE; // Update für das nächste Batch
}

function pokemonCardTemp(index, singlePokemon, pokeTypeOne, pokeTypeTwo) {
    let content = document.getElementById('content');
    let typeColor = typeColors[pokeTypeOne] || '#f0f0f0'; // Standardfarbe, falls kein Typ übereinstimmt

    content.innerHTML += /*html*/`
        <div class="singlePokemonCard" style="background-color: ${typeColor}">
            <h1>${allPokemon[index].name.charAt(0).toUpperCase() + allPokemon[index].name.slice(1)}</h1>
            <img class="singlePokemonImg" src="${singlePokemon.sprites.front_default}">
            <div class="pokemonTypes">
                <div>${pokeTypeOne}</div>
                ${pokeTypeTwo ? `<div>${pokeTypeTwo}</div>` : ''}
            </div>
        </div>
    `;
}

async function singlePokemonData(url) {
    let singlePokemonResponse = await fetch(url);
    let singlePokemonApi = await singlePokemonResponse.json();
    return singlePokemonApi;
}

// Funktion, um mehr Pokémon zu laden
function loadMorePokemon() {
    renderPokeCard(); // Lädt die nächsten 25 Pokémon
}

// Suchfunktion
function searchPokemon() {
    let searchQuery = document.getElementById('searchBar').value.toLowerCase();
    let filteredPokemon = allPokemon.filter(pokemon =>
        pokemon.name.includes(searchQuery)
    );
    renderSearchedPokemon(filteredPokemon);
}

async function renderSearchedPokemon(filteredPokemon) {
    let content = document.getElementById('content');
    content.innerHTML = ""; // Leert vorherige Ergebnisse

    for (let pokemon of filteredPokemon) {
        let singlePokemon = await singlePokemonData(pokemon.url);
        let pokeTypeOne = singlePokemon.types[0].type.name.charAt(0).toUpperCase() + singlePokemon.types[0].type.name.slice(1);
        let pokeTypeTwo = singlePokemon.types.length > 1 ? singlePokemon.types[1].type.name.charAt(0).toUpperCase() + singlePokemon.types[1].type.name.slice(1) : null;

        pokemonCardTemp(allPokemon.indexOf(pokemon), singlePokemon, pokeTypeOne, pokeTypeTwo);
    }
}
