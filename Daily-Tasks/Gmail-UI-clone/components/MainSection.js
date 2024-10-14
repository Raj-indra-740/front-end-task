import SideBar from "../ui/sideBar.js";
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
        height:'100%',

    })

    mainSectionDiv.append(SideBar(gmailSpecificIconData))

    
    return mainSectionDiv
}