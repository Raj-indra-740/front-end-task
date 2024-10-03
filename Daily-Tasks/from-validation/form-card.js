const card = document.querySelector('.card')
const droppableArea = document.querySelector('.delete-section')
const selectAllBtn = droppableArea.querySelector('#selectAll')
const deleteBtn = droppableArea.querySelector('#delete')
const userData = JSON.parse(localStorage.getItem('userInfo')) || {}
console.log(userData)

//Intial call for card rendering
document.addEventListener('DOMContentLoaded',function(){
    createCard(card, userData)

    let isCardDrop = JSON.parse(localStorage.getItem('isCardDrop'))

    if(isCardDrop){
        reRenderAllSections(userData)
        onDropSuccess()
    }
})


//healping function to create card using user data
function createCard(parentElement, data) {
    const innerHTMLforCard = `
                    <div id="image">
                    <img 
                        class='card-img'
                        src=${data.image ? data.image : "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg"} 
                        alt="user image"
                        draggable=false
                    />
                    </div>
                    <h3 class = "card-details" id="firstName">Name:${data.firstName} ${data.lastName}</h3>  
                    <h3 class = "card-details"  id="email">Email:${data.email}</h3>  
                    <h3 class = "card-details" id="phoneNumber">Phone Number:${data.phoneNumber}</h3>  
                    <h3 class = "card-details" id="gender">Gender:${data.gender}</h3>  
                    <h3 class = "card-details" id="education">Educational Qulification:${data.education}</h3>  
                `
    parentElement.innerHTML = innerHTMLforCard

}



//Event to redirect to form page on edit
document.querySelector('#edit').addEventListener('click', function (e) {
    const currentPath = window.location.pathname;
    const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    window.location.href = `${window.location.origin}${basePath}/form-validation.html?edit=true`;
})


// Drag and Drop Event Listener
card.addEventListener('dragstart', function (e) {
    e.dataTransfer.setData('text/html', e.target.outerHTML);
})

droppableArea.addEventListener('drop', function (e) {
    e.preventDefault();

    localStorage.setItem('isCardDrop', true)

    if (droppableArea.querySelector('#deleteSectionCard')) {
        alert('Delete section already contains a card!');
        return;
    }

    if(isDataEmpty('userInfo')){
        let confirmationToRedirectToForm = confirm('would you like to go to Form page?')
        if(confirmationToRedirectToForm){
            const currentPath = window.location.pathname;
            const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
            window.location.href = `${window.location.origin}${basePath}/form-validation.html?edit=true`;
        }
        return;  
    }
    const cardHTML = e.dataTransfer.getData('text/html');
    const container = document.createElement('div');
    container.innerHTML = cardHTML;


    const newCard = container.firstElementChild
    newCard.id = 'deleteSectionCard'
    newCard.classList.add('card')

    const div = document.createElement('div')

    Array.from(newCard.children).forEach(item => {
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = item.id

        console.log(item.nodeName)
        if (item.nodeName == 'DIV') {
            item.firstElementChild.style.width = '100px';
        }
        item.classList.add('delete-section-card-elements')
        item.appendChild(checkbox)
    })

    console.log(newCard.children)
    console.log(newCard)

    e.target.firstElementChild.after(newCard)

    onDropSuccess()
})

droppableArea.addEventListener('dragover', (event) => {
    event.preventDefault();
});


function onDropSuccess() {
    const btnSection = document.querySelector('.delete-section-btn')
    btnSection.style.display = 'block'
}

//Event to select all check box in delete section
selectAllBtn.addEventListener('click', function () {
    checkedAllCheckBox(droppableArea)
})

//Helping function to check all check box
function checkedAllCheckBox(parentDiv) {
    const checkbox = parentDiv.querySelectorAll('input[type="checkbox"]')
    checkbox.forEach(item => item.checked = !item.checked)
}

//Delete button click event
deleteBtn.addEventListener('click', function (e) {
    const checkbox = droppableArea.querySelectorAll('input[type="checkbox"]:checked')
    console.log(checkbox)
    if (checkbox.length) {
        console.log('delete')

        let userConfirmation = confirm('do you really want to delete?', false)

        if (userConfirmation) {
            const data = JSON.parse(localStorage.getItem('userInfo'))

            checkbox.forEach(item => {
                if (data[item.name]) {
                    if (item.name == 'firstName') {
                        data.lastName = ''
                        data[item.name] = ''
                    }
                    data[item.name] = ''
                }
                item.checked = false;
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
            reRenderAllSections(data);
        }
    }
})

//Re-render function on deletion operation
function reRenderAllSections(data) {
    card.innerHTML = '';
    createCard(card, data);

    const deleteSectionCard = droppableArea.querySelector('#deleteSectionCard');
    if (deleteSectionCard) {
        deleteSectionCard.remove();
    }
    if(isDataEmpty('userInfo')){
        document.querySelector('.delete-section-btn').style.display = 'none'
    }

    if (Object.values(data).some(value => value.trim() !== '')) {
        const newCard = document.createElement('div');
        newCard.id = 'deleteSectionCard';
        newCard.classList.add('card');

        createCard(newCard, data);

        Array.from(newCard.children).forEach(item => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = item.id;

            if (item.nodeName === 'DIV') {
                item.firstElementChild.style.width = '100px';
            }
            item.classList.add('delete-section-card-elements');
            item.appendChild(checkbox);
        });

        droppableArea.firstElementChild.after(newCard);
    }
}

//Function To check if if user info object value are empty or not
function isDataEmpty(objName) {
    let data = JSON.parse(localStorage.getItem(objName))
    return Object.values(data).every(value => !value.trim());
}