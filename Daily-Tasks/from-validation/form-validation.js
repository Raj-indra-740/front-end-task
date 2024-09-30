const form = document.querySelector('#userInfoForm')
const inputTextField = document.querySelectorAll('input[type="text"]')


inputTextField.forEach(item => {
    console.log(item)
    item.addEventListener('input', function(e){
        validateInputTextField(this)
    })
})

form.addEventListener('submit', function(e){
    e.preventDefault()
    let flag = true
    document.querySelectorAll('input[type="text"]').forEach(item => {
       console.log(validateInputTextField(item))
    })
    console.log(flag)
    if(flag) return
})


function validateInputTextField(element){
    let validFlag = true;
    switch(element.id){
        case 'firstName':
            if(isInputEmpty(element.value.trim())){
                setError(element, 'Input field can\' be empty')
                return false
            }else if(!isStringValid(element.value.trim())){
                setError(element, 'Input is not valid')
                return false
            }else{
                clearError(element)
                return true
            }
            break;
        case 'lastName': 
            if(isInputEmpty(element.value.trim())){
                setError(element, 'Input field can\' be empty')
                return false
            }else if(!isStringValid(element.value.trim())){
                setError(element, 'Input is not valid')
                return false
            }else{
                clearError(element)
                return true
            }
            break;
        case 'userEmail':
            if(isInputEmpty(element.value.trim())){
                setError(element, 'Email field can\'t be empty')
                return false
            }else if(!isEmailValid(element.value.trim())){
                setError(element, 'Email is not valid')
                return false
            }else{
                clearError(element)
                return true
            }
            break;
        case 'phoneNumber':
            if(isInputEmpty(element.value.trim())){
                setError(element, 'Phone number field can\'t be empty')
                return false
            }else if(!isNumberValid(element.value.trim())){
                setError(element, 'Phone number is not valid')
                return false
            }else{
                clearError(element)
                return true
            }
            break;
    }

    return  true
}


function setError(element, errorMessage){
    element.classList.remove('success')
    element.classList.add('error')
    const parent = element.parentElement
    parent.querySelector('.error-message').innerText = errorMessage
}
function clearError(element){
    element.classList.remove('error')
    element.classList.add('success')
    const parent = element.parentElement
    parent.querySelector('.error-message').innerText = ''
}




function isInputEmpty(value){
    return value.trim().length ? false : true;
}

function isStringValid(value){
    const pattern = /^[a-zA-Z ]{2,30}$/;
    return pattern.test(value)
}

function isEmailValid(value){
    const pattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return pattern.test(value)
}

function isNumberValid(value){
    const pattern = /^\d{10}$/
    return pattern.test(value)
}


// document.querySelector('#userEmail').addEventListener('input', function(e){
//     if(!isEmailValid(this.value)){
//         this.style.border = '5px solid red';
//     }else{
//         this.style.border = '5px solid green';
//     }
// })

