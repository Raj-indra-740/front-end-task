import applyStyle from "../utilities/applyStyle.js";
import addHoverEffect from "../utilities/addHoverEffect.js";
import createImgContainer from "../utilities/createImgContainer.js";

const createElement = document.createElement.bind(document)

export default function EmailContentSection(){
    const emailContentSection = createElement('div');
    emailContentSection.id = 'emailContentSection';
    applyStyle(emailContentSection, {
        backgroundColor:'white',
        width: '100%',
        height: '100%',
        borderRadius:'16px',
    })

    const emailContentSectionHead = createElement('div');
    emailContentSectionHead.id = 'emailContentSectionHead'
    applyStyle(emailContentSectionHead, {
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        padding: '10px 16px'
    })

    //check box list section
    const cheackBoxListDiv = createElement('div');
    cheackBoxListDiv.id = 'cheackBoxListDiv'
    applyStyle(cheackBoxListDiv, {
        display:'flex',
        alignItems:'center',
    })

    const cheackBoxDiv = createElement('div');
    applyStyle(cheackBoxDiv, {
        padding:'5px 1px',
        borderRadius:'5px',
    })
    const cheackBox = createElement('div')
    applyStyle(cheackBox, {
        width:'16px',
        height:'16px',
        margin:'5px',
        border:'3px solid #5d5f5e',
        borderRadius:'2px',
        opacity:'0.7',
    })
    addHoverEffect(cheackBoxDiv, [{
        styleProp:'backgroundColor',
        styleValue: '#eaebef',
    }])

    cheackBoxDiv.append(cheackBox)

    //checkboc list drop down
    const cheackBoxListDropDownIcon = createElement('div')
    cheackBoxListDropDownIcon.id = 'cheackBoxListDropDownIcon';
    applyStyle(cheackBoxListDropDownIcon, {
        padding:'5px',
        borderRadius:'5px',
        
    })
    cheackBoxListDropDownIcon.innerHTML = '<img style="opacity:0.7;" src="./assests/main-section/down.png" width="8" height="8" alt="image">'

    addHoverEffect(cheackBoxListDropDownIcon, [{
        styleProp:'backgroundColor',
        styleValue: '#eaebef',
    }])

    cheackBoxListDiv.append(cheackBoxDiv, cheackBoxListDropDownIcon)
    
    // referesh boc
    const refereshIconDiv =  createElement('div');
    refereshIconDiv.id = 'refereshIconDiv';
    applyStyle(refereshIconDiv, {
        width:'fit-content',
        marginLeft:'10px',
        padding:'10px',
        borderRadius:'50%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        opacity:'0.7',
    })

    addHoverEffect(refereshIconDiv, [{
        styleProp:'backgroundColor',
        styleValue: '#eaebef',
    }])

    refereshIconDiv.innerHTML = `<img src="./assests/main-section/refresh.png" width="16" height="16" alt="image">`
    
    // referesh boc
    const threeDotMenuIconDiv =  createElement('div');
    threeDotMenuIconDiv.id = 'threeDotMenuIconDiv';
    applyStyle(threeDotMenuIconDiv, {
        width:'fit-content',
        padding:'10px',
        borderRadius:'50%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        opacity:'0.7',
    })

    addHoverEffect(threeDotMenuIconDiv, [{
        styleProp:'backgroundColor',
        styleValue: '#eaebef',
    }])

    threeDotMenuIconDiv.innerHTML = `<img src="./assests/main-section/threeDots.png" width="16" height="16" alt="image">`


    //pagination count section
    const paginationCountDiv = createElement('div');
    paginationCountDiv.id = 'paginationCountDiv';
    applyStyle(paginationCountDiv, {
        display:'flex',
        alignItems:'center',
        gap:'10px',
    })

    applyStyle(paginationCountDiv, {
        width:'fit-content',
        marginLeft: 'auto',
    })

    const paginationCountContent = createElement('div');
    paginationCountContent.id = 'paginationCountContent';
    applyStyle(paginationCountContent, {
        fontSize:'12px',
        color:'#5e5e5e',

    })

    paginationCountContent.innerHTML = `<span>1</span> - <span>50</span> of <span>70</span>`

    
    const navigationOfPaginationDiv = createElement('div');
    navigationOfPaginationDiv.id = 'navigationOfPaginationDiv';
    applyStyle(navigationOfPaginationDiv,{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:'20px'
    })
    
    navigationOfPaginationDiv.innerHTML = `
        <img style="transform:rotate(90deg)" src="./assests/main-section/more.png" width="16" height="16" alt="image">
        <img style="transform:rotate(270deg)" src="./assests/main-section/more.png" width="16" height="16" alt="image">
    `
    paginationCountDiv.append(paginationCountContent, navigationOfPaginationDiv)


    emailContentSectionHead.append(cheackBoxListDiv, refereshIconDiv, threeDotMenuIconDiv, paginationCountDiv)


    const emailContentTable = createElement('table');
    emailContentTable.id = 'emailContentTable';

    const emailContentTehead = createElement('tbody');
    emailContentTehead.id = 'emailContentTehead';




    emailContentSection.append(emailContentSectionHead, emailContentTable)

    return emailContentSection
}