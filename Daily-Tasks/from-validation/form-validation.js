const form = document.querySelector('#userInfoForm')
const inputTextField = document.querySelectorAll('input[type="text"]')
const genderRadio = document.querySelectorAll('input[type="radio"]')
const selectionList = document.querySelectorAll('select')


// Validate all input fields on form submit
form.addEventListener('submit', function (e) {
    e.preventDefault()
    let flag = true
    inputTextField.forEach(item => {
        if (!validateInputTextField(item) || !validRadioBtn() || !validateSelectionList()) {
            console.log(!validateInputTextField(item) , !validRadioBtn() , !validateSelectionList())
            flag = false
        }
    })
    console.log(flag)

    if (flag) {
        console.log('Form submitted successfully')
        const formData =  new FormData(form)
        storeData(formData)
        document.querySelector('#loaderContainer').style.display = 'block'

        setTimeout(() => {
            document.querySelector('#loaderContainer').style.display = 'none'
            console.log(window.location.origin)
            this.reset()
            window.location.href = `http://127.0.0.1:5501/Daily-Tasks/from-validation/form-card.html`
        }, 3000)
    }
})

//form reset functionality
form.addEventListener('reset', function(e){
    inputTextField.forEach(item => {
        item.classList.remove('success')
        item.classList.remove('error')
        item.nextElementSibling.innerText = ''
        item.value = ''
    })
    genderRadio[0].parentElement.lastElementChild.innerText = ''
})


//Validate each radio button on change event
genderRadio.forEach(item =>  {
    item.addEventListener('change', function(e){
        validRadioBtn()
    })
})

// Validate each input field on input event
inputTextField.forEach(item => {
    item.addEventListener('input', function () {
        validateInputTextField(this)
    })
})

//Validate each Selection list 
selectionList.forEach(item => {
    item.addEventListener('change', function(e){
        validateSelectionList()
    })
})

//function to validate selection lisst
function validateSelectionList(){
    const selectListOfElments = Array.from(document.querySelectorAll('select'))
    let validFlag = selectListOfElments.some(item =>  item.value.length)

    if(!validFlag){
        setError(selectListOfElments[0].parentElement.lastElementChild, 'Need to select Educational qualification')
        return false
    }else{   
        clearError(selectListOfElments[0].parentElement.lastElementChild)
        return true
    }
}

//function to validate radio button
function validRadioBtn(){
    const radioBtnArr = Array.from(document.querySelectorAll('input[type="radio"]'))
    let validFlag = radioBtnArr.some(item => item.checked)
    if(!validFlag){
        setError(radioBtnArr[0].parentElement.lastElementChild, 'Need to select gender')
        return false
    }else{
        clearError(radioBtnArr[0].parentElement.lastElementChild)
        return true
    }

}

//function to validate text field
function validateInputTextField(element) {
    switch (element.id) {
        case 'firstName':
        case 'lastName':
            if (isInputEmpty(element.value.trim())) {
                setError(element, 'Input field can\'t be empty')
                return false
            } else if (!isStringValid(element.value.trim())) {
                setError(element, 'Input is not valid')
                return false
            } else {
                clearError(element)
                return true
            }
        case 'userEmail':
            if (isInputEmpty(element.value.trim())) {
                setError(element, 'Email field can\'t be empty')
                return false
            } else if (!isEmailValid(element.value.trim())) {
                setError(element, 'Email is not valid')
                return false
            } else {
                clearError(element)
                return true
            }
        case 'phoneNumber':
            if (isInputEmpty(element.value.trim())) {
                setError(element, 'Phone number field can\'t be empty')
                return false
            } else if (!isNumberValid(element.value.trim())) {
                setError(element, 'Phone number is not valid')
                return false
            } else {
                clearError(element)
                return true
            }
    }
    return true
}

//functoion to set error message
function setError(element, errorMessage) {
    element.classList.remove('success')
    element.classList.add('error')
    const parent = element.parentElement
    parent.querySelector('.error-message').innerText = errorMessage
}

//function clear error message on validatiom
function clearError(element) {
    element.classList.remove('error')
    element.classList.add('success')
    const parent = element.parentElement
    parent.querySelector('.error-message').innerText = ''
}

//validation functon
function isInputEmpty(value) {
    return value.trim().length === 0;
}

function isStringValid(value) {
    const pattern = /^[a-zA-Z ]{2,30}$/;
    return pattern.test(value)
}

function isEmailValid(value) {
    const pattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return pattern.test(value)
}

function isNumberValid(value) {
    const pattern = /^\d{10}$/
    return pattern.test(value)
}



function storeData(formData){
    let userData = Object.fromEntries(formData)
    localStorage.setItem('userInfo', JSON.stringify(userData))
    console.log(userData)
}


document.addEventListener('DOMContentLoaded', function(e){
    const url = new URL(window.location.href)
    const quertParams = new URLSearchParams(url.search)

    console.log(quertParams)
    if(quertParams.get('edit')){
        console.log(localStorage.getItem('userInfo'))
        let userInfo =  JSON.parse(localStorage.getItem('userInfo'));

        inputTextField.forEach(item => {
            if(item.name == 'firstName'){
                item.value = userInfo.firstName
            } 
            else if(item.name == 'lastName'){
                item.value = userInfo.lastName
            } 
            if(item.name == 'email'){
                item.value = userInfo.email
            } 
            if(item.name == 'phoneNumber'){
                item.value = userInfo.phoneNumber
            } 
        })

        genderRadio.forEach(item => {
            if(item.value === userInfo.gender){
                item.checked = true
            }
        })

        selectionList.forEach(item => {
            item.value = userInfo.education;
        })
    }
})