let pokTab = [];
const pokTabDataBase = new Map();

const limit = 10;
const API_URL = `https://pokeapi.co/api/v2/pokemon`;

let totalPages = 1;
let currentPage = 1;
// let ascendingFlag = false;

// Update the URL with the current state
function updateUrlParams(params) {
    const url = new URL(window.location.href);
    Object.keys(params).forEach((key) => url.searchParams.set(key, params[key]));
    history.pushState(null, "", url.toString());
}

// Get parameters from the URL
function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        currpage: urlParams.get("currpage") || 1,
        filter: urlParams.get("filter") || null,
        sort: urlParams.get("sort") || null,
        order: urlParams.get("order") || 'asc', // Default to ascending order
        search: urlParams.get("search") || null
    };
}

// Fetch Pokémon Data
function fetchKantoPokemon(pageNumber = 1, sortType = null, order = 'asc', searchValue = null) {
    const offset = (pageNumber - 1) * limit;
    const paginatedUrl = `${API_URL}?offset=${offset}&limit=${limit}`;

    fetch(paginatedUrl)
        .then((response) => response.json())
        .then((allpokemon) => {
            totalPages = Math.ceil(allpokemon.count / limit);

            // Prevent redundant API calls
            const pokemonPromises = allpokemon.results.map((pokemon) => {
                if (!pokTabDataBase.has(pokemon.name)) {
                    return fetchPokemonData(pokemon);
                } else {
                    return Promise.resolve(pokTabDataBase.get(pokemon.name));
                }
            });

            // Render Pokémon cards on all promises resolved
            Promise.all(pokemonPromises).then((allPokeData) => {
                pokTab = allPokeData;
                allPokeData.forEach((poke) => {
                    pokTabDataBase.set(poke.name, poke);
                });

                if (sortType) {
                    renderListOfPokemon(sortItems(pokTab, sortType, order));
                } else {
                    renderListOfPokemon(pokTab);
                }
                renderPaginationBar(currentPage, totalPages);
            });
        })
        .catch((err) => {
            console.error("Error fetching Pokémon:", err);
        });
}

// Fetch function for each Pokémon's detailed data
async function fetchPokemonData(pokemon) {
    let url = pokemon.url;
    return fetch(url)
        .then((response) => response.json())
        .then((pokeData) => pokeData);
}

// Create a Pokémon card using fetched data
function createPokemonCard(pokeData) {
    const container = document.querySelector("#pokeCardsContainer");
    let pokeContainer = document.createElement("div");
    pokeContainer.classList.add("card");

    let pokeImg = document.createElement("img");
    pokeImg.classList.add("img");
    pokeImg.src =
        pokeData.sprites.front_default ??
        "https://i.pinimg.com/736x/bf/d8/d7/bfd8d7704cf357fdc06f003e8bfdc272.jpg";

    let cardDetail = document.createElement("div");
    cardDetail.classList.add("card-detail");

    let pokeName = document.createElement("p");
    pokeName.innerHTML = `<b>Name:</b> ${pokeData.name}`;

    let pokeHeight = document.createElement("p");
    pokeHeight.innerHTML = `<b>Height:</b> ${pokeData.height}`;

    let pokeWeight = document.createElement("p");
    pokeWeight.innerHTML = `<b>Weight:</b> ${pokeData.weight}kg`;

    let pokeOrder = document.createElement("p");
    pokeOrder.innerHTML = `<b>Order:</b> ${pokeData.order}`;

    cardDetail.append(pokeName, pokeHeight, pokeWeight, pokeOrder);
    pokeContainer.append(pokeImg, cardDetail);
    container.appendChild(pokeContainer);
}

// Create pagination bar based on total number of responses and current page
function renderPaginationBar(currentPage, totalPages) {
    const pageNumbersContainer = document.getElementById("pageNumbers");
    pageNumbersContainer.innerHTML = "";

    let visiblePages = 10;
    let startPage = Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1;
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);

    const prevButton = document.getElementById("prevButton");
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

    const nextButton = document.getElementById("nextButton");
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            updatePage(currentPage + 1, totalPages);
        }
    };
}

// Add pagination button for each page
function addPageButton(pageNumber) {
    const pageNumbersContainer = document.getElementById("pageNumbers");
    const pageButton = document.createElement("button");
    pageButton.innerText = pageNumber;

    if (pageNumber === currentPage) {
        pageButton.classList.add("active");
    }

    pageButton.onclick = () => updatePage(pageNumber, totalPages);
    pageNumbersContainer.appendChild(pageButton);
}

// Add ellipsis for pagination
function addEllipsis() {
    const pageNumbersContainer = document.getElementById("pageNumbers");
    const ellipsis = document.createElement("span");
    ellipsis.innerText = "...";
    pageNumbersContainer.appendChild(ellipsis);
}

// Update the page on change in page number
function updatePage(pageNumber, totalPages) {
    currentPage = pageNumber;
    const { sort, order } = getUrlParams();
    updateUrlParams({ currpage: currentPage, sort, order });
    fetchKantoPokemon(currentPage, sort, order);
    renderPaginationBar(currentPage, totalPages);
}

// Handle search input and filter data based on search term
function searchItem(value) {
    let filterList = pokTab.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
    );
    filterList.length
        ? renderListOfPokemon(filterList)
        : (document.querySelector("#pokeCardsContainer").innerHTML =
            "<h2>Data Not Found</h2>");
}

// Event listener on search input field
document.querySelector("#searchBar").addEventListener("input", function () {
    const searchValue = this.value.trim();
    if (searchValue.length) {
        searchItem(searchValue);
    } else {
        renderListOfPokemon(pokTab);
    }
});

// Handle sorting using filter dropdown
document.querySelector('#filterList').addEventListener('change', function(e) {
    const sortType = this.value;
    const selectElement = e.target; 
    const selectedIndex = selectElement.selectedIndex;
    const selectedOption = selectElement.options[selectedIndex];

    console.log(selectedOption.dataset.order)
    
    const order = selectedOption.dataset.order == 'asc' ? 'asc' : 'desc';

    updateUrlParams({ sort: sortType, order, currpage: currentPage });
    fetchKantoPokemon(currentPage, sortType, order);
});

// Sorting function, returns sorted array based on sort type and order
function sortItems(data, sortType, order) {
    console.log(sortType)
    const sortedData = data.sort((a, b) => a[sortType] - b[sortType]);
    console.log(sortedData)
    return order === 'asc' ? sortedData : sortedData.reverse();
}

// Render the list of Pokémon cards
function renderListOfPokemon(list) {
    document.querySelector("#pokeCardsContainer").innerHTML = "";
    list.forEach((item) => createPokemonCard(item));
}

// Initialize the page and restore the state from URL parameters on load
window.onload = function () {
    const { currpage, sort, order, search } = getUrlParams();

    // Update state variables based on URL params
    currentPage = parseInt(currpage, 10);
    // ascendingFlag = order === 'asc';

    // Set input fields based on the URL parameters
    if (sort) document.querySelector('#filterList').value = sort;
    if (search) document.querySelector("#searchBar").value = search;

    // Fetch Pokémon based on the parameters from the URL
    fetchKantoPokemon(currentPage, sort, order, search);
    renderPaginationBar(currentPage, totalPages);
};

// Initial render of pagination bar and Pokémon data
renderPaginationBar(1, totalPages);
fetchKantoPokemon(1);
