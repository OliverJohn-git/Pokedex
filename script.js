function init(){
    loadPokeApi();
}

async function loadPokeApi() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    let pokeApi = await response.json();

    console.log(pokeApi);

    renderPokeCard(pokeApi);
}

async function renderPokeCard(pokeApi){
    let content = document.getElementById('content');
    content.innerHTML="";

    for (let pokemonI = 0; pokemonI < pokeApi.count; pokemonI++) {
        let singlePokemon = await singlePokemonData(pokeApi.results[pokemonI].url);
        let pokeTypeOne = singlePokemon.types[0].type.name.charAt(0).toUpperCase() + singlePokemon.types[0].type.name.slice(1);
        let pokeTypeTwo = singlePokemon.types.length > 1 ? singlePokemon.types[1].type.name.charAt(0).toUpperCase() + singlePokemon.types[1].type.name.slice(1): null;
        
        pokemonCardTemp(pokeApi, pokemonI, singlePokemon, pokeTypeOne, pokeTypeTwo);
    };
    
}

function pokemonCardTemp(pokeApi, pokemonI, singlePokemon, pokeTypeOne, pokeTypeTwo){
    content.innerHTML += /*html*/`
        <div class="singlePokemonCard">
            <h1>${pokeApi.results[pokemonI].name.charAt(0).toUpperCase() + pokeApi.results[pokemonI].name.slice(1) }</h1>;
            <img class="singlePokemonImg" src="${singlePokemon.sprites.front_default}">
            <div class="pokemonTypes">
                <div>${pokeTypeOne}</div>
                ${pokeTypeTwo? `<div>${pokeTypeTwo}</div>` : ''}
            </div>
        </div>
    `
}

 async function singlePokemonData(url) {
    let singlePokemonResponse = await fetch(url);
    let singlePokemonApi = await singlePokemonResponse.json();
    return singlePokemonApi;
 }