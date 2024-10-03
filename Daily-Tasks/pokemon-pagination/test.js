let pokTab = [];
const pokTabDataBase = new Map();

let limit = 10; // Default limit
const API_URL = `https://pokeapi.co/api/v2/pokemon`;

let totalPages = 1;
let currentPage = 1;

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
        currpage: parseInt(urlParams.get("currpage"), 10) || 1,
        filter: urlParams.get("filter") || null,
        sort: urlParams.get("sort") || null,
        order: urlParams.get("order") || 'asc', // Default to ascending order
        search: urlParams.get("search") || null,
        limit: parseInt(urlParams.get('limit'), 10) || limit,
        totalPageLimit: parseInt(urlParams.get('totalPageLimit')) || null,
    };
}

// Fetch Pokemon Data
function fetchKantoPokemon(pageNumber = 1, sortType = null, order = 'asc', searchValue = null,limit,totalPageLimit) {

    console.log('totalPageLimit',totalPageLimit)

    const offset = (pageNumber - 1) * limit;
    const paginatedUrl = `${API_URL}?offset=${offset}&limit=${limit}`;

    fetch(paginatedUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((allpokemon) => {
            totalPages = totalPageLimit || Math.ceil(allpokemon.count / limit)
            const pokemonPromises = allpokemon.results.map((pokemon) => {
                if (!pokTabDataBase.has(pokemon.name)) {
                    return fetchPokemonData(pokemon);
                } else {
                    return Promise.resolve(pokTabDataBase.get(pokemon.name));
                }
            });

            // Render Pokemon cards on all promises resolved
            Promise.all(pokemonPromises).then((allPokeData) => {
                pokTab = allPokeData;
                allPokeData.forEach((poke) => {
                    pokTabDataBase.set(poke.name, poke);
                });

                renderListOfPokemon(sortType ? sortItems(pokTab, sortType, order) : pokTab);
                renderPaginationBar(currentPage, totalPages);
            });
        })
        .catch((err) => {
            console.error("Error fetching Pokemon:", err);
        });
}

// Fetch function for each Pokemon's detailed data
async function fetchPokemonData(pokemon) {
    return fetch(pokemon.url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

// Create a Pokemon card using fetched data
function createPokemonCard(pokeData) {
    const container = document.querySelector("#pokeCardsContainer");
    const pokeContainer = document.createElement("div");
    pokeContainer.classList.add("card");

    const pokeImg = document.createElement("img");
    pokeImg.classList.add("img");
    pokeImg.src = pokeData.sprites.front_default ?? "https://i.pinimg.com/736x/bf/d8/d7/bfd8d7704cf357fdc06f003e8bfdc272.jpg";

    const cardDetail = document.createElement("div");
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

    const visiblePages = 10;
    const startPage = Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1;
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);

    const prevButton = document.getElementById("prevButton");
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => updatePage(currentPage - 1);

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
    nextButton.onclick = () => updatePage(currentPage + 1);
}

// Add pagination button for each page
function addPageButton(pageNumber) {
    const pageNumbersContainer = document.getElementById("pageNumbers");
    const pageButton = document.createElement("button");
    pageButton.innerText = pageNumber;
    pageButton.onclick = () => updatePage(pageNumber);
    
    if (pageNumber === currentPage) {
        pageButton.classList.add("active");
    }

    pageNumbersContainer.appendChild(pageButton);
}

// Add ellipsis for pagination
function addEllipsis() {
    const pageNumbersContainer = document.getElementById("pageNumbers");
    const ellipsis = document.createElement("span");
    ellipsis.innerText = "...";
    pageNumbersContainer.appendChild(ellipsis);
}

// Function to update the page on change in page number
function updatePage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Prevent invalid pages
    currentPage = pageNumber;
    const { sort, order, limit, totalPageLimit } = getUrlParams();
    updateUrlParams({ currpage: currentPage, sort, order, limit });
    fetchKantoPokemon(currentPage, sort, order, undefined, limit, totalPageLimit);
}

// Handle search input and filter data based on search term
function searchItem(value) {
    const filterList = pokTab.filter((item) =>
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
document.querySelector('#filterList').addEventListener('change', function (e) {
    const sortType = this.value;
    const selectElement = e.target; 
    const selectedIndex = selectElement.selectedIndex;
    const selectedOption = selectElement.options[selectedIndex];

    console.log(selectedOption.dataset.order)
    
    const order = selectedOption.dataset.order == 'asc' ? 'asc' : 'desc';
    const { currpage, sort, search, limit: urlLimit, totalPageLimit } = getUrlParams();
    updateUrlParams({ sort: sortType, order, currpage: currentPage });
    fetchKantoPokemon(currentPage, sortType, order,search, limit, totalPageLimit);
});

// Sorting function, returns sorted array based on sort type and order
function sortItems(data, sortType, order) {
    return data.sort((a, b) => {
        const valueA = a[sortType];
        const valueB = b[sortType];
        return order === 'asc' ? valueA - valueB : valueB - valueA;
    });
}

// Render the list of Pokemon cards
function renderListOfPokemon(list) {
    const container = document.querySelector("#pokeCardsContainer");
    container.innerHTML = ""; // Clear existing cards
    if (list.length === 0) {
        container.innerHTML = "<h2>Data Not Found</h2>";
        return;
    }
    list.forEach(createPokemonCard);
}

// Initialize the page and restore the state from URL parameters on load
window.onload = function () {
    const { currpage, sort, order, search, limit: urlLimit, totalPageLimit } = getUrlParams();
    currentPage = currpage;
    limit = urlLimit;
    totalPages = totalPageLimit
    if (sort) document.querySelector('#filterList').value = sort;
    if (search) document.querySelector("#searchBar").value = search;

    fetchKantoPokemon(currentPage, sort, order, search, limit, totalPages);
};

// Handle total page selection
document.querySelector('#totalCardPerPageSelectionList').addEventListener('change', function (e) {
    limit = parseInt(this.value, 10); // Convert limit to an integer
    const { currpage, filter, sort, search, order, totalPageLimit } = getUrlParams();

    // Update URL params and fetch Pokemon with the new limit
    updateUrlParams({ limit });
    fetchKantoPokemon(currpage, sort, order, search, limit, totalPageLimit);
});

document.querySelector('#totalPageSelectionList').addEventListener('change', function (e) {
    if(this.value != 'default') {
        totalPages = parseInt(this.value, 10);
    }else{
        totalPages = null
    } 
    // Update URL params and fetch Pokemon with the new limit
    updateUrlParams({ totalPageLimit : totalPages });
    const { currpage, filter, sort, search, order , limit, totalPageLimit} = getUrlParams();
    console.log(totalPageLimit)
    fetchKantoPokemon(currpage, sort, order, search, limit,totalPageLimit);
});
