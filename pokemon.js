let pokTab = [];
const pokTabDataBase = []

const dataCount = 20
const API_URL = `https://pokeapi.co/api/v2/pokemon?count=${dataCount}`



function fetchKantoPokemon() {
    fetch(API_URL)
     .then(response => response.json())
     .then((allpokemon) => {
        const pokemonPromises = allpokemon.results.map((pokemon) => fetchPokemonData(pokemon));
        Promise.all(pokemonPromises).then((allPokeData) => {
            pokTab = allPokeData; 
            pokTabDataBase.push(...pokTab)
            console.log('All Pokémon data fetched:', pokTab.length);
            
            pokTab.forEach(item => {
                renderPokemon(item);  
            });
        });
     })
     .catch(err => console.error('Error fetching Pokémon:', err));
}

async function fetchPokemonData(pokemon) {
    let url = pokemon.url;
    return fetch(url)
      .then(response => response.json())
      .then((pokeData) => {
          return pokeData; 
      });
}


fetchKantoPokemon();

function renderPokemon(pokeData) {
    const container = document.querySelector('#pokeCardsContainer');
    let pokeContainer = document.createElement("div");
    pokeContainer.classList.add('card');

    let pokeImg = document.createElement('img');
    pokeImg.classList.add('img');
    pokeImg.src = pokeData.sprites.front_default
    
    let pokeName = document.createElement('h4');
    pokeName.innerText = pokeData.name;
    

    pokeContainer.append(pokeImg, pokeName);
    container.appendChild(pokeContainer);
}


window.addEventListener('scroll',()=>{
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        fetchKantoPokemon(API_URL)
    }
})

function searchTask(value) {
    let filterList = pokTabDataBase.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filterList)
    filterList.length
      ? renderListOfPokemon(filterList)
      : (document.querySelector("#pokeCardsContainer").innerHTML = '<h2>Data Not Found</h2>');
  }

  document
    .querySelector("#searchBar")
    .addEventListener("input", function(e) {
      const searchValue = this.value.trim();
      if (searchValue.length) {
        searchTask(searchValue);
      } else {
        renderListOfPokemon(pokTabDataBase);
      }
    });


function renderListOfPokemon(list){
    document.querySelector('#pokeCardsContainer').innerHTML = ''
    list.forEach(item => renderPokemon(item))
}