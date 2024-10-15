import applyStyle from "../utilities/applyStyle.js";
import createImgContainer from "../utilities/createImgContainer.js";

const createElement = document.createElement.bind(document)


export default function SideBar(iconData){

    const sideBarDiv = createElement('div');
    sideBarDiv.id = 'sideBarDiv';

    applyStyle(sideBarDiv, {
        width:'fit-content',
        // height: '100%',
        backgroundColor: '#eaf1fb',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
       
    })

    iconData.forEach((data, i) => {
        const sideBarLink = createElement('div');
        sideBarDiv.id = data.iconName;
        applyStyle(sideBarLink, {
            width:'40px',
            height:'40px',
            padding:'34px',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            alignItems: 'center',
            gap:'10px',
            cursor:'pointer',
        })

        const hoverEffectDiv = createElement('div');
        applyStyle(hoverEffectDiv, {
            width: '40px',
            height:'30px',
            padding:'5px 0',
            borderRadius: '20px',
            backgroundColor:'transparent',
            display:'flex',
            placeContent:'center',
        })
        
        const sideBarLinkIcon = createImgContainer(data.iconName, data.iconSrc, data.iconWidth, data.iconHeight)
        applyStyle(sideBarLinkIcon, {
            opacity: '0.7',
        })

    

        hoverEffectDiv.appendChild(sideBarLinkIcon)

        hoverEffectDiv.onmouseenter = function(){
            this.style.backgroundColor = '#d3e3fd';
        }

        hoverEffectDiv.onmouseleave = function(){
            this.style.backgroundColor = 'transparent';
        }

        const sideBarLinkText = createElement('p')
        sideBarLinkText.id = `${data.iconText}${i}`
        sideBarLinkText.innerText = data.iconText
        applyStyle(sideBarLinkText, {
            fontFamily: 'sans-serif',
            color:'#1F1F1F',
            fontSize:'12px',

        })

        sideBarLink.append(hoverEffectDiv, sideBarLinkText)
        sideBarDiv.appendChild(sideBarLink)
    })

    return sideBarDiv
}