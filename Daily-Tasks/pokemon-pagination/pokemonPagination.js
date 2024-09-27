let pokTab = [];
const pokTabDataBase = new Map();

const limit = 10;
const API_URL = `https://pokeapi.co/api/v2/pokemon`;

let totalPages = 1;
let currentPage = 1;
let ascendingFlag = true;
let filterFlag = false;


//update the URL
function updateUrlParams(params){
    const url = new URL(window.location.href)
    Object.keys(params).forEach((key) => url.searchParams.set(key, params[key]));
    history.pushState(null, "", url.toString());
}

function getUrlParams(){
    const urlParams = new URLSearchParams(window.location.search);
    return{
        currpage: urlParams.get("page") || 1,
        filter: urlParams.get("filter") || null,
        sort: urlParams.get("sort") || null,
        order: urlParams.get("order") || 'asc', // asc or desc
        search: urlParams.get("search") || null
    }
}

// Fetch Pokémon Data
function fetchKantoPokemon(pageNumber = 1, sortType = null, order = 'asc', searchValue = null) {
    const offset = (pageNumber - 1) * limit;
    const paginatedUrl = `${API_URL}?offset=${offset}&limit=${limit}`;

    fetch(paginatedUrl)
        .then((response) => response.json())
        .then((allpokemon) => {
            totalPages =
                totalPages === Math.ceil(allpokemon.count / limit)
                    ? totalPages
                    : Math.ceil(allpokemon.count / limit);

            //Prevented repeative fetch call to api for already call api
            const pokemonPromises = allpokemon.results.map((pokemon) => {
                if (!pokTabDataBase.has(pokemon.name)) {
                    return fetchPokemonData(pokemon);
                } else {
                    return Promise.resolve(pokTabDataBase.get(pokemon.name));
                }
            });

            //render pokemon card on all promise resolve
            Promise.all(pokemonPromises).then((allPokeData) => {
                pokTab = allPokeData;
                allPokeData.forEach((poke) => {
                    pokTabDataBase.set(poke.name, poke);
                });

                if(sortType){
                    renderListOfPokemon(sortItems(pokTab, sortType, order))
                }else{
                    renderListOfPokemon(pokTab);
                }
                renderPaginationBar(currentPage, totalPages);
            });
        })
        .catch((err) => {
            console.error("Error fetching Pokémon:", err);
        });
}

//fetch function for fetching each pokemon
async function fetchPokemonData(pokemon) {
    let url = pokemon.url;
    return fetch(url)
        .then((response) => response.json())
        .then((pokeData) => pokeData);
}

//Create Pokemon card use fetch data
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

//Create pagination bar base on total number of response and current page 
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

//function for adding pagination number button
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

//function for adding  '...' aka Ellipsis
function addEllipsis() {
    const pageNumbersContainer = document.getElementById("pageNumbers");
    const ellipsis = document.createElement("span");
    ellipsis.innerText = "...";
    pageNumbersContainer.appendChild(ellipsis);
}

//function updating page on change in page number 
function updatePage(pageNumber, totalPages) {
    currentPage = pageNumber;
    const { sort, order } = getUrlParams();
    updateUrlParams({currpage:currentPage, sort, order})
    fetchKantoPokemon(currentPage, sort, order);
    renderPaginationBar(currentPage, totalPages);
}

//Search item on input change in current page
function searchItem(value) {
    let filterList = pokTab.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
    );
    filterList.length
        ? renderListOfPokemon(filterList)
        : (document.querySelector("#pokeCardsContainer").innerHTML =
            "<h2>Data Not Found</h2>");
}

//event listner on input field for searching data base on input value
document.querySelector("#searchBar").addEventListener("input", function () {
    const searchValue = this.value.trim();
    if (searchValue.length) {
        searchItem(searchValue);
    } else {
        renderListOfPokemon(pokTab);
    }
});

//filter opetions
// document.querySelectorAll(".filter-option").forEach((item, i) => {
//     item.addEventListener("click", function (e) {
//         document
//             .querySelectorAll("i")
//             .forEach((item) => item.classList.remove("hide"));
//         if (e.target.id === "reset") {
//             renderListOfPokemon(pokTab);
//             return;
//         } else {
//             let sortedData = sortItems(pokTab, e.target.dataset.value);
//             localStorage.setItem('sortedData', JSON.stringify(sortedData))
//             ascendingFlag = !ascendingFlag;
//             console.log(ascendingFlag);
//             if (ascendingFlag) {
//                 this.querySelector(".down").classList.add("hide");
//                 this.querySelector(".up").classList.remove("hide");
               
//                 renderListOfPokemon(JSON.parse(localStorage.getItem('sortedData')).toReversed());
//             } else {
//                 this.querySelector(".up").classList.add("hide");
//                 this.querySelector(".down").classList.remove("hide");
//                 renderListOfPokemon(JSON.parse(localStorage.getItem('sortedData')));
//             }
//         }
//     });
// });

document.querySelector('#filterList').addEventListener('change', function(e){
    const sortType = this.value;
    ascendingFlag = !ascendingFlag
    const order = ascendingFlag ? 'asc' : 'desc';

    updateUrlParams({sort: sortType, order, page:currentPage});

    fetchKantoPokemon(currentPage, sortType, order)
})
//sorting function, return sorted array defending give data and property
function sortItems(data, sortType, order) {
    const sortedData = data.sort((a, b) => a[sortType] - b[sortType]);
    return order === 'asc' ? sortedData : sortedData.reverse();
}

//Render enire list of data fetch from api
function renderListOfPokemon(list) {
    document.querySelector("#pokeCardsContainer").innerHTML = "";
    list.forEach((item) => createPokemonCard(item));
}

window.onload = function () {
    const { currpage, sort, order, search } = getUrlParams();

    // Update the currentPage and ascendingFlag based on the URL
    currentPage = parseInt(currpage, 10); // Convert the page to an integer
    ascendingFlag = order === 'asc'; // Set ascendingFlag based on the order in the URL

    // Set input fields based on the URL parameters
    if (sort) document.querySelector('#filterList').value = sort;
    if (search) document.querySelector("#searchBar").value = search;

    // Fetch Pokémon based on URL parameters and update pagination
    fetchKantoPokemon(currentPage, sort, order, search);
    renderPaginationBar(currentPage, totalPages);
};


//intial render of data and pagination bar
renderPaginationBar(1, totalPages);
fetchKantoPokemon(1);

