let currentPokemonIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.singlePokemonCard').forEach((card, index) => {
        card.addEventListener('click', () => openOverlay(index));
    });
});

function openOverlay(index) {
    currentPokemonIndex = index;
    loadPokemonDetails(index);
    document.getElementById('overlay').classList.remove('d_none');
    document.body.classList.add('no-scroll');
}

function closeOverlay() {
    document.getElementById('overlay').classList.add('d_none');
    document.body.classList.remove('no-scroll');
}

async function loadPokemonDetails(index, pokeTypeOne) {
    let pokemon = await singlePokemonData(allPokemon[index].url);
    pokemonOverlayCard (pokemon, pokeTypeOne)
}

function navigatePokemon(direction) {
    currentPokemonIndex = (currentPokemonIndex + direction + allPokemon.length) % allPokemon.length;
    console.log('Navigating to Pokemon index:', currentPokemonIndex);
    loadPokemonDetails(currentPokemonIndex);
}