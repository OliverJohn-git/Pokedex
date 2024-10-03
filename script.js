let allPokemon = [];
let pokemonIndex = 0;
const POKEMON_BATCH_SIZE = 30;

function init(){
    loadPokeApi();
}

async function loadPokeApi() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    let pokeApi = await response.json();
    allPokemon = pokeApi.results;
    renderPokeCard();
}

async function renderPokeCard() {
    let content = document.getElementById('content');
    for (let i = pokemonIndex; i < pokemonIndex + POKEMON_BATCH_SIZE && i < allPokemon.length; i++) {
        let singlePokemon = await singlePokemonData(allPokemon[i].url);
        let pokeTypeOne = singlePokemon.types[0].type.name.charAt(0).toUpperCase() + singlePokemon.types[0].type.name.slice(1);
        let pokeTypeTwo = singlePokemon.types.length > 1 ? singlePokemon.types[1].type.name.charAt(0).toUpperCase() + singlePokemon.types[1].type.name.slice(1): null;

        content.innerHTML += /*html*/`
            <div class="singlePokemonCard">
                <h1>${allPokemon[i].name.charAt(0).toUpperCase() + allPokemon[i].name.slice(1) }</h1>
                <img class="singlePokemonImg" src="${singlePokemon.sprites.front_default}">
                <div class="pokemonTypes">
                    <div>${pokeTypeOne}</div>
                    ${pokeTypeTwo ? `<div>${pokeTypeTwo}</div>` : ''}
                </div>
            </div>
        `;
    }
    pokemonIndex += POKEMON_BATCH_SIZE;
}

async function singlePokemonData(url) {
    let singlePokemonResponse = await fetch(url);
    let singlePokemonApi = await singlePokemonResponse.json();
    return singlePokemonApi;
}

// Funktion, um mehr Pokémon zu laden
function loadMorePokemon() {
    // Lädt die nächsten 30 Pokémon
    renderPokeCard();  
}

// Suchfunktion, die auf alle Pokémon zugreift
function searchPokemon() {
    let searchQuery = document.getElementById('searchBar').value.toLowerCase();
    let filteredPokemon = allPokemon.filter(pokemon => 
        pokemon.name.includes(searchQuery)
    );
    renderSearchedPokemon(filteredPokemon);
}

async function renderSearchedPokemon(filteredPokemon) {
    let content = document.getElementById('content');
    content.innerHTML = ""; // Clear previous results
    for (let pokemon of filteredPokemon) {
        let singlePokemon = await singlePokemonData(pokemon.url);
        let pokeTypeOne = singlePokemon.types[0].type.name.charAt(0).toUpperCase() + singlePokemon.types[0].type.name.slice(1);
        let pokeTypeTwo = singlePokemon.types.length > 1 ? singlePokemon.types[1].type.name.charAt(0).toUpperCase() + singlePokemon.types[1].type.name.slice(1): null;

        content.innerHTML += /*html*/`
            <div class="singlePokemonCard">
                <h1>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }</h1>
                <img class="singlePokemonImg" src="${singlePokemon.sprites.front_default}">
                <div class="pokemonTypes">
                    <div>${pokeTypeOne}</div>
                    ${pokeTypeTwo ? `<div>${pokeTypeTwo}</div>` : ''}
                </div>
            </div>
        `;
    }
}
