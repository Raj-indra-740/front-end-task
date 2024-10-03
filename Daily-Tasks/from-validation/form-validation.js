const form = document.querySelector('#userInfoForm')
const inputTextField = document.querySelectorAll('input[type="text"]')
const genderRadio = document.querySelectorAll('input[type="radio"]')
const selectionList = document.querySelectorAll('select')
const imageInput = document.querySelector('#imageInput');


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
    selectionList.forEach(item => {
        if(validateSelectionList()){
            item.classList.remove('error')
            item.classList.add('success')
        }else{
            item.classList.remove('success')
            item.classList.add('error')
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

            localStorage.setItem('isCardDrop', false)

            const currentPath = window.location.pathname;
            const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
            window.location.href = `${window.location.origin}${basePath}/form-card.html`; 
        }, 2000)
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
    selectionList.forEach(item => {
        item.nextElementSibling.innerText = ''
        item.classList.remove('success')
        item.classList.remove('error')
        item.value = ''
    })
    genderRadio[0].parentElement.lastElementChild.innerText = ''
})

//Image size validation
imageInput.addEventListener('change', function() {
    const file = this.files[0]; // Get the selected file
    console.log
    if (file) {
        const maxSizeInKB = 300; 
        const maxSizeInBytes = maxSizeInKB * 1024; 

        if (file.size > maxSizeInBytes) {
            setError(imageInput, `File size must be less than ${maxSizeInKB}KB.`);
            this.value = ''; 
        } else {
            clearError(imageInput);
        }
    }
});

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
        if(validateSelectionList()){
            item.classList.remove('error')
            item.classList.add('success')
        }else{
            item.classList.remove('success')
            item.classList.add('error')
        }
        // validateSelectionList()
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

//Country code plugin
const input = document.querySelector("#phoneNumber");
const phoneNumber = window.intlTelInput(input, {
    initialCountry: "in",
    geoIpLookup: 'in',
    countryOrder: ["in","us", "uk" , "de"],
    separateDialCode: true,
    validationNumberType:'MOBILE',
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.5.1/build/js/utils.js",
});

// const phoneNumber = intlTelInput(input);
const extension = phoneNumber.getExtension();
console.log(extension)


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
            // console.log([phoneNumber.getNumber(), phoneNumber.isValidNumber()])
            if (isInputEmpty(element.value.trim())) {
                setError(element, 'Phone number field can\'t be empty')
                return false
            } else if (!phoneNumber.isValidNumber()) {
                setError(element, 'Phone number is not valid')
                return false
            } else {
                clearError(element)
                return true
            }
    }
    return true
}

//function to set error message
function setError(element, errorMessage) {
    element.classList.remove('success')
    element.classList.add('error')
    const parent = element.parentElement
    console.log(element.id)
    if(element.id == 'phoneNumber'){
        document.querySelector('#phoneNumberError').innerText = errorMessage
    }else{
        parent.querySelector('.error-message').innerText = errorMessage
    }
}

//function clear error message on validatiom
function clearError(element) {
    element.classList.remove('error')
    element.classList.add('success')
    const parent = element.parentElement
    if(element.id == 'phoneNumber'){
        document.querySelector('#phoneNumberError').innerText = ''
    }else{
        parent.querySelector('.error-message').innerText = ''
    }
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
    console.log('storeData called')
    let exsitingData = JSON.parse(localStorage.getItem('userInfo'))
    let userData = Object.fromEntries(formData)
    
    userData.phoneNumber = `+${phoneNumber.getSelectedCountryData().dialCode} ${userData.phoneNumber}`
    
    console.log(userData)
    
    const imageFile = imageInput.files[0];
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            userData.image = event.target.result; 
            localStorage.setItem('userInfo', JSON.stringify(userData));
            console.log('Data stored successfully:', userData);
        };
        reader.readAsDataURL(imageFile); 
    } else {
        userData.image = exsitingData.image ? exsitingData.image : '';
        localStorage.setItem('userInfo', JSON.stringify(userData));
        console.log('Data stored without image:', userData);
    }
    console.log(userData)
}


document.addEventListener('DOMContentLoaded', function(e){
    const url = new URL(window.location.href)
    const quertParams = new URLSearchParams(url.search)

    console.log(quertParams)
    if(JSON.parse(quertParams.get('edit'))){
        console.log(localStorage.getItem('userInfo'))
        let userInfo =  JSON.parse(localStorage.getItem('userInfo'));
        populateFormWithData(userInfo)
    }
})

function populateFormWithData(data){
    inputTextField.forEach(item => {
        if(item.name == 'firstName'){
            item.value = data.firstName
        } 
        else if(item.name == 'lastName'){
            item.value = data.lastName
        } 
        if(item.name == 'email'){
            item.value = data.email
        } 
        if(item.name == 'phoneNumber'){
            item.value = data.phoneNumber
        } 
    })

    genderRadio.forEach(item => {
        if(item.value === data.gender){
            item.checked = true
        }
    })

    selectionList.forEach(item => {
        item.value = data.education;
    })

    imageInput.value = item.image
}