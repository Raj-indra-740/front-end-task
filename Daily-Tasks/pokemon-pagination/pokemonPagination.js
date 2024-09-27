let pokTab = [];
const pokTabDataBase = new Map();

const limit = 10; 
let totalPages = 1; 
const API_URL = `https://pokeapi.co/api/v2/pokemon`;

let currentPage = 1;

let ascendingFlag = true;

// Fetch Pokémon Data
function fetchKantoPokemon(pageNumber = 1) {
    const offset = (pageNumber - 1) * limit; 
    const paginatedUrl = `${API_URL}?offset=${offset}&limit=${limit}`;
    
    fetch(paginatedUrl)
        .then(response => response.json())
        .then((allpokemon) => {
            totalPages = totalPages === Math.ceil(allpokemon.count / limit) ? totalPages : Math.ceil(allpokemon.count / limit);

            const pokemonPromises = allpokemon.results.map((pokemon) => {
                if(!pokTabDataBase.has(pokemon.name)){
                    return fetchPokemonData(pokemon)
                }
                else{
                    return Promise.resolve(pokTabDataBase.get(pokemon.name))
                }  
            });
            Promise.all(pokemonPromises).then((allPokeData) => {
                pokTab = allPokeData;
                allPokeData.forEach((poke) => {
                    pokTabDataBase.set(poke.name, poke);
                });
                document.querySelector('#pokeCardsContainer').innerHTML = ''; 
                pokTab.forEach(item => createPokemonCard(item)); 
                
                renderPaginationBar(currentPage, totalPages);
            });
        })
        .catch(err => {
            console.error('Error fetching Pokémon:', err);
        });
}


async function fetchPokemonData(pokemon) {
    let url = pokemon.url;
    return fetch(url)
        .then(response => response.json())
        .then((pokeData) => pokeData);
}

function parseArrOfObj(){
    return data.length ? Array.from(data).map(item => JSON.parse(item)) : []
}

function createPokemonCard(pokeData) {
    const container = document.querySelector('#pokeCardsContainer');
    let pokeContainer = document.createElement("div");
    pokeContainer.classList.add('card');

    let pokeImg = document.createElement('img');
    pokeImg.classList.add('img');
    pokeImg.src = pokeData.sprites.front_default ?? 'https://i.pinimg.com/736x/bf/d8/d7/bfd8d7704cf357fdc06f003e8bfdc272.jpg';

    let cardDetail = document.createElement('div')
    cardDetail.classList.add('card-detail')

    
    let pokeName = document.createElement('p');
    pokeName.innerHTML =`<b>Name:</b> ${pokeData.name}`;

    let pokeHeight = document.createElement('p');
    pokeHeight.innerHTML =`<b>Height:</b> ${pokeData.height}`;


    let pokeWeight = document.createElement('p');
    pokeWeight.innerHTML =`<b>Weight:</b> ${pokeData.weight}kg`;

    let pokeOrder = document.createElement('p');
    pokeOrder.innerHTML =`<b>Order:</b> ${pokeData.order}`;
    
    cardDetail.append( pokeName, pokeHeight, pokeWeight, pokeOrder)
    pokeContainer.append(pokeImg,cardDetail);
    container.appendChild(pokeContainer);

    // console.log(pokeData.sprites.front_default, pokeData.name, pokeData.height, pokeData.weight)
}


function renderPaginationBar(currentPage, totalPages) {
    const pageNumbersContainer = document.getElementById('pageNumbers');
    pageNumbersContainer.innerHTML = ''; 

    let visiblePages = 10;
    let startPage = Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1;
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);

   
    const prevButton = document.getElementById('prevButton');
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
        if (currentPage > 1) {
            updatePage(currentPage - 1, totalPages);
        }
    };

    if (startPage > 1) {
        addPageButton(1);  
        addEllipsis();
    }

    for (let i = startPage; i <= endPage; i++) {
        addPageButton(i);
    }

    if (endPage < totalPages) {
        addEllipsis();
        addPageButton(totalPages);  
    }

    const nextButton = document.getElementById('nextButton');
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            updatePage(currentPage + 1, totalPages);
        }
    };
}


function addPageButton(pageNumber) {
    const pageNumbersContainer = document.getElementById('pageNumbers');
    const pageButton = document.createElement('button');
    pageButton.innerText = pageNumber;

    if (pageNumber === currentPage) {
        pageButton.classList.add('active'); 
    }

    pageButton.onclick = () => updatePage(pageNumber, totalPages);
    pageNumbersContainer.appendChild(pageButton);
}


function addEllipsis() {
    const pageNumbersContainer = document.getElementById('pageNumbers');
    const ellipsis = document.createElement('span');
    ellipsis.innerText = '...';
    pageNumbersContainer.appendChild(ellipsis);
}


function updatePage(pageNumber, totalPages) {
    currentPage = pageNumber;  
    fetchKantoPokemon(pageNumber);  
    renderPaginationBar(currentPage, totalPages);  
}

function searchTask(value) {
    let filterList = pokTab.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
    );
    filterList.length
        ? renderListOfPokemon(filterList)
        : (document.querySelector("#pokeCardsContainer").innerHTML = '<h2>Data Not Found</h2>');
}

document
    .querySelector("#searchBar")
    .addEventListener("input", function() {
        const searchValue = this.value.trim();
        if (searchValue.length) {
            searchTask(searchValue);
        } else {
            renderListOfPokemon(pokTab);
        }
    });

function renderListOfPokemon(list) {
    // console.log('re-render')
    document.querySelector('#pokeCardsContainer').innerHTML = '';
    list.forEach(item => createPokemonCard(item));
}


renderPaginationBar(1, totalPages); 
fetchKantoPokemon(1);  

document.querySelectorAll('.filter-option').forEach((item, i) => {
    item.addEventListener('click', function(e){
        document.querySelectorAll('i').forEach(item => item.classList.remove('hide'))
        if(e.target.id === 'reset'){

            renderListOfPokemon(pokTab)
            return
        }else{
            let sortedData = sortItems(pokTab, e.target.dataset.value)
            ascendingFlag = !ascendingFlag;
            console.log(ascendingFlag)
            if(ascendingFlag){
                this.querySelector('.down').classList.add('hide')
                this.querySelector('.up').classList.remove('hide')
                renderListOfPokemon(sortedData.toReversed())
            }else{
                // console.log(this.querySelector('.down'))
                this.querySelector('.up').classList.add('hide')
                this.querySelector('.down').classList.remove('hide')
                renderListOfPokemon(sortedData)
            }
        }


        // console.log(sortedData)
    })
})

function sortItems(data, sortType){
    return data.toSorted((a, b) => a[sortType] - b[sortType])
}