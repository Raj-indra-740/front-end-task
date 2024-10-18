import applyStyle from "../utilities/applyStyle.js";
import addHoverEffect from "../utilities/addHoverEffect.js";
import createImgContainer from "../utilities/createImgContainer.js";
import { emailData } from "../constants/emailData.js";

const createElement = document.createElement.bind(document)
const inboxUnreadEmailCount = emailData.filter(item => !item.isRead)
// console.log(inboxUnreadEmailCount)

export default function PopSideBar(){

    const popSideBarMainDiv =  createElement('div');
    popSideBarMainDiv.id = 'popSideBarMainDiv'
    applyStyle(popSideBarMainDiv, {
        width:'100%',
        maxWidth:'256px', 
        overflowX:'hidden',
        transition: 'all 1s ease-in-out 0s',
    })

    const popSideBarDiv = createElement('div');
    popSideBarDiv.id = 'popSideBarDiv';
    applyStyle(popSideBarDiv, {
        width:'100%',     //0% to hide
        backgroundColor:'#f6f8fc',
        padding:'10px',   //0 to hide
        display: 'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        gap:'10px',
        overflowX:'hidden',  //for toggle pop
        // transition: 'all 1s ease-in-out 0s',
    })

    //Compose Email button section
    const composeBtn = createElement('button');
    composeBtn.id = 'composeBtn';
    applyStyle(composeBtn,  {
        display:'flex',
        alignItems:'center',
        backgroundColor: '#c2e7ff',
        color:'#001d35',
        gap:'10px',
        border:'none',
        borderRadius:'16px', 
        padding:'15px 20px',
        fontFamily: 'sans-serif',
        fontWeight:'500',
        fontSize: '14px',
        transition: 'box-shadow .08s linear, min-width 0.15s cubic-bezier(0.4,0,0.2,1)',
        cursor:'pointer',
    })
    addHoverEffect(composeBtn, [{
        styleProp : 'boxShadow',
        styleValue: 'rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px',
    }])
    const blackPen = createImgContainer('blackPen', './assests/main-section/blackPen.png', 24, 24)
    
    const composeBtnText = createElement('span');
    composeBtnText.id = 'composeBtnText';
    composeBtnText.innerText = 'Compose';

    
    
    composeBtn.append(blackPen, composeBtnText)

    //Email section's list
    const emailSectionList = createElement('ul');
    emailSectionList.id = 'emailSectionList';
    applyStyle(emailSectionList, {
        width:'100%',
        fontSize:'14px',
        color:'#202124',
    })

    const emailSectionListData = [
        {
            liName: 'Inbox',
            liIcon: './assests/main-section/inboxBaseline.png',
            liIconBlack: './assests/main-section/inboxBlack.png',
            liExtra: inboxUnreadEmailCount.length,
        },
        {
            liName: 'Starred',
            liIcon: './assests/main-section/starBaseline.png',
            liIconBlack: './assests/main-section/starBlack.png',
            liExtra: '',
        },
        {
            liName: 'Snoozed',
            liIcon: './assests/main-section/clockBaseline.png',
            liIconBlack: './assests/main-section/clockBlack.png',
            liExtra: '',
        },
        {
            liName: 'Sent',
            liIcon: './assests/main-section/sentBaseline.png',
            liIconBlack: './assests/main-section/sentBlack.png',
            liExtra: '',
        },
        {
            liName: 'More',
            liIcon: './assests/main-section/more.png',
            liIconBlack: './assests/main-section/more.png',
            liExtra: '',
        },
    ]

    emailSectionListData.forEach((item, i) => {
        const li = createElement('li');
        li.id = item.liName + i;
        
        applyStyle(li, {
            display:'flex',
            justifyContent:'flex-start',
            alignItems:'center',
            gap:'16px',
            width:'100%',
            padding:'8px 12px 8px 16px',
            backgroundColor:'inherit',
            borderRadius:'26px',
            cursor:'pointer',
        })

        addHoverEffect(li, [
            {
                styleProp: 'backgroundColor',
                styleValue: '#d3e3fd',
            },
            {
                styleProp: 'fontWeight',
                styleValue: '600',
            }
        ])
        
        const liIcon = createImgContainer(item.liName, item.liIcon, 20, 20)
        const liText = createElement('p');
        applyStyle(liText, {
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            width:'100%',
        })
        liText.innerHTML = `
            <span>${item.liName}</span>
            <span style='font-size:12px;'>${item.liExtra ? inboxUnreadEmailCount.length : ''}</span>
        `;

        li.append(liIcon, liText)
        
        emailSectionList.appendChild(li)
    }) 

    //label section
    const labelDiv = createElement('div');
    labelDiv.id = 'labelDiv';


    applyStyle(labelDiv, {
        width:'100%',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center', 
        padding:'8px 8px 8px 16px',
        fontSize:'16px',
    })

    const labelText = createElement("p");
    labelText.innerText = 'Labels';


    const labelAddIconDiv = createElement('div')
    labelAddIconDiv.id = 'labelAddIconDiv';
    
    applyStyle(labelAddIconDiv, {
        padding:'7px',
        borderRadius:'50%',
        display:'flex',
        placeContents:'center',
        cursor:'pointer',
    })

    addHoverEffect(labelAddIconDiv, [{styleProp:'backgroundColor', styleValue:'#dcdee1'}])

    const labelAddIcon = createImgContainer('labelAddIcon', './assests/main-section/plus.png', 20, 20)
    labelAddIcon.id = 'labelAddIcon';

    labelAddIconDiv.appendChild(labelAddIcon)
    
    labelDiv.append(labelText, labelAddIconDiv)

    popSideBarDiv.append(composeBtn, emailSectionList, labelDiv)

    popSideBarMainDiv.append(popSideBarDiv)

    return popSideBarMainDiv
}

