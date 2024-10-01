const card = document.querySelector('.card')
const droppableArea = document.querySelector('.delete-section')
const selectAllBtn = droppableArea.querySelector('#selectAll')
const deleteBtn = droppableArea.querySelector('#delete')
const userData = JSON.parse(localStorage.getItem('userInfo')) || {}
console.log(userData)

function createCard(parentElement, data) {

    const innerHTMLforCard = `
                    <div>
                    <img 
                        class='card-img'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_L2wiy5nonchopSVEph1GA_yJi_ExMRniXA&s" alt="user image"
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

createCard(card, userData)


document.querySelector('#edit').addEventListener('click', function (e) {
    const currentPath = window.location.pathname;
    const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    window.location.href = `${window.location.origin}${basePath}/form-validation.html?edit=true`;
})


card.addEventListener('dragstart', function (e) {
    e.dataTransfer.setData('text/html', e.target.outerHTML);
})
droppableArea.addEventListener('drop', function (e) {
    e.preventDefault();

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

    onDropSucess()
})
droppableArea.addEventListener('dragover', (event) => {
    event.preventDefault();
});


function onDropSucess() {
    const btnSection = document.querySelector('.delete-section-btn')
    btnSection.style.display = 'block'


}

function checkedAllCheckBox(parentDiv) {
    const checkbox = parentDiv.querySelectorAll('input[type="checkbox"]')
    checkbox.forEach(item => item.checked = !item.checked)
}


selectAllBtn.addEventListener('click', function () {
    checkedAllCheckBox(droppableArea)
})

deleteBtn.addEventListener('click', function (e) {
    const checkbox = droppableArea.querySelectorAll('input[type="checkbox"]:checked')

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
            
            // Re-render the card and delete sections with updated data
            reRenderAllSections(data);
        }
    }
})

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

function isDataEmpty(objName) {
    let data = JSON.parse(localStorage.getItem(objName))
    return Object.values(data).every(value => !value.trim());
}