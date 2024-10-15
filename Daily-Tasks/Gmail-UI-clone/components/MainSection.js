import PopSideBar from "../ui/PopSideBar.js";
import SideBar from "../ui/SideBar.js";
import applyStyle from "../utilities/applyStyle.js";

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

export default function MainSection(){
    const mainSectionDiv = createElement('div');
    applyStyle(mainSectionDiv, {
        width:'100%',
        height:'calc(100% - 55px)',
        display:'flex',
    })


    mainSectionDiv.append(SideBar(gmailSpecificIconData), PopSideBar())


    
    return mainSectionDiv
}