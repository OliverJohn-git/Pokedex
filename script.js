function init(){
    loadApi();
    render();
}
let limit=0

async function loadApi(limit) {
    let pokeApi = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
    limit=20
}

function render(pokeApi, limit){
    for (let i = 1; i == limit; i++) {
        const singlePokemon = pokeApi [i];
        console.log(singlePokemon)
    }
}