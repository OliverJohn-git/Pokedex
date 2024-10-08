function init() {
    loadPokeApi();
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
}

async function singlePokemonData(url) {
    let singlePokemonResponse = await fetch(url);
    let singlePokemonApi = await singlePokemonResponse.json();
    return singlePokemonApi;
}

function loadMorePokemon() {
    renderPokeCard();
}

function searchPokemon() {
    let searchQuery = document.getElementById('searchBar').value.toLowerCase();
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