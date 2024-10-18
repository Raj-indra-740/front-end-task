import EmailContentSection from "../ui/EmailContentSection.js";
import PopSideBar from "../ui/PopSideBar.js";
import SideBar from "../ui/SideBar.js";
import applyStyle from "../utilities/applyStyle.js";
import { emailData } from "../constants/emailData.js";

const createElement = document.createElement.bind(document)

const gmailSpecificIconData = [
    {
        iconName: 'mailIcon',
        iconSrc: './assests/main-section/email.png',
        iconWidth: 16,
        iconHeight: 16,
        iconText: 'Mail',
    },
    {
        iconName: 'chatIcon',
        iconSrc: './assests/main-section/chat.png',
        iconWidth: 16,
        iconHeight: 16,
        iconText: 'Chat',
    },
    {
        iconName: 'videoCallIcon',
        iconSrc: './assests/main-section/video-camera.png',
        iconWidth: 16,
        iconHeight: 16,
        iconText: 'Meet',
    },
]
const googleAppIconData = [
    {
        iconName: 'mailIcon',
        iconSrc: './assests/main-section/calendar.png',
        iconWidth: 20,
        iconHeight: 20,
        iconText: '',
    },
    {
        iconName: 'chatIcon',
        iconSrc: './assests/main-section/keep.png',
        iconWidth: 20,
        iconHeight: 20,
        iconText: '',
    },
    {
        iconName: 'videoCallIcon',
        iconSrc: './assests/main-section/tasks.png',
        iconWidth: 20,
        iconHeight: 20,
        iconText: '',
    },
    {
        iconName: 'videoCallIcon',
        iconSrc: './assests/main-section/contacts.png',
        iconWidth: 20,
        iconHeight: 20,
        iconText: '',
    },
    {
        iconName: 'videoCallIcon',
        iconSrc: './assests/main-section/minus-sign.png',
        iconWidth: 20,
        iconHeight: 20,
        iconText: '',
        opacity:'0.1',
    },
    {
        iconName: 'videoCallIcon',
        iconSrc: './assests/main-section/plus.png',
        iconWidth: 24,
        iconHeight: 24,
        iconText: '',
    },
]

const googleAppIconDataStyle = {
    backgroundColor:'#f6f8fc',
    paddingIconBox: '26px 26px',
    isSymmetricEffect: true,
}

export default function MainSection(){
    const mainSectionDiv = createElement('div');
    applyStyle(mainSectionDiv, {
        width:'100%',
        height:'calc(100% - 55px)',
        display:'flex',
        backgroundColor:'#f6f8fc',
    })


    mainSectionDiv.append(SideBar(gmailSpecificIconData, emailData), PopSideBar(), EmailContentSection(), SideBar(googleAppIconData, googleAppIconDataStyle))


    
    return mainSectionDiv
}