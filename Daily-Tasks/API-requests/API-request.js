const userContainer = document.querySelector('#userContainer');
const ALL_USER_API_URL = `https://jsonplaceholder.typicode.com/users`


const userData = JSON.parse(localStorage.getItem('userData')) || [];

window.addEventListener('DOMContentLoaded', function(e){
    if(!userData.length){
        fetchData(ALL_USER_API_URL, {}, userData)

    }
    setTimeout(()=>{
        console.log(userData)
        userData.forEach(item => {
            userContainer.innerHTML += createUserCard(item)
        })
    }, 500)
})


async function fetchData(url, optionalObj={}, dataContainer){
    console.log('fetch called')
    let res = await fetch(url, optionalObj)
    let data = await res.json()

    dataContainer.push(...data)
    localStorage.setItem('userData', JSON.stringify(userData))
}

function createUserCard(data){
    return (
        `
        <div class='card' id=${data.username} data-id=${data.id}>
            <p><b>User Name:</b> ${data.username}</p>
            <p><b>Name:</b> ${data.name}</p>
            <p><b>Email:</b> ${data.email}</p>
            <p><b>website:</b> ${data.website}</p>
        </div>
        
        `
    )
}


userContainer.addEventListener('click', function(e){
    let element = e.target
    if( element.classList.contains('card') || element.closest('.card') ){

        console.log('card click with data-id',element.closest('.card').dataset.id,element.classList.contains('card'))
        const userDataId = element.closest('.card').dataset.id
        const userId = element.closest('.card').id
        
        const currentPath = window.location.pathname
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'))
        console.log(basePath)
        window.location.href = `${window.origin}/${basePath}/userPage.html?id=${userDataId}&userName=${userId}`;
    }
})