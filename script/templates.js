function pokemonCardTemp(index, singlePokemon, pokeTypeOne, pokeTypeTwo) {
    let content = document.getElementById('content');
    let typeColor = typeColors[pokeTypeOne] || '#f0f0f0'; 

    content.innerHTML += /*html*/`
        <div class="singlePokemonCard" onclick="openOverlay(${index})" style="background-color: ${typeColor}">
            <h1>${allPokemon[index].name.charAt(0).toUpperCase() + allPokemon[index].name.slice(1)}</h1>
            <img class="singlePokemonImg" src="${singlePokemon.sprites.front_default}">
            <div class="pokemonTypes">
                <div>${pokeTypeOne}</div>
                ${pokeTypeTwo ? `<div>${pokeTypeTwo}</div>` : ''}
            </div>
        </div>
    `;
}

function pokemonOverlayCard (pokemon, pokeTypeOne){
    let overlayContent = document.getElementById('overlayContent');
    let typeColor = typeColors[pokeTypeOne] || '#f0f0f0';
    
    overlayContent.innerHTML = /*html*/`
        <div id="pokemonDetails" style="background-color: ${typeColor}">
            <h1>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            <img src="${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="${pokemon.name}">
            <p>HP: ${pokemon.stats[0].base_stat}</p>
            <p>Angriff: ${pokemon.stats[1].base_stat}</p>
            <p>Verteidigung: ${pokemon.stats[2].base_stat}</p>
            <div><button id="prevPokemon" onclick="navigatePokemon(-1)">←</button></div>
            <div><button id="nextPokemon" onclick="navigatePokemon(1)">→</button></div>
        </div>
       
    `;
}