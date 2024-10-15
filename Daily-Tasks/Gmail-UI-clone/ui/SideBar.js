import applyStyle from "../utilities/applyStyle.js";
import createImgContainer from "../utilities/createImgContainer.js";
import addHoverEffect from "../utilities/addHoverEffect.js";

const createElement = document.createElement.bind(document)


export default function SideBar(iconData, additionInfo={}){

    const sideBarDiv = createElement('div');
    sideBarDiv.id = 'sideBarDiv';

    applyStyle(sideBarDiv, {
        width:'fit-content',
        // height: '100%',
        backgroundColor: additionInfo.backgroundColor ? additionInfo.backgroundColor : '#eaf1fb',
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
            padding: additionInfo.paddingIconBox ? additionInfo?.paddingIconBox : '34px',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            alignItems: 'center',
            gap:'10px',
            cursor:'pointer',
        })

        const hoverEffectDiv = createElement('div');
        applyStyle(hoverEffectDiv, {
            width: additionInfo.isSymmetricEffect ? 'fit-content' :'40px',
            height:additionInfo.isSymmetricEffect ? 'fit-content' :'30px',
            padding:additionInfo.isSymmetricEffect ? '10px' : '5px 0',
            borderRadius: additionInfo.isSymmetricEffect ? '50%' :'20px',
            backgroundColor:'transparent',
            display:'flex',
            placeContent:'center',
        })
        
        const sideBarLinkIcon = createImgContainer(data.iconName, data.iconSrc, data.iconWidth, data.iconHeight)
        applyStyle(sideBarLinkIcon, {
            opacity: data.opacity ? data.opacity :  '0.7',
        })

    
        if(additionInfo.isSymmetricEffect){
            addHoverEffect(hoverEffectDiv, [{styleProp:'backgroundColor',styleValue: '#eaebef',}])
        }else{
            addHoverEffect(hoverEffectDiv, [{styleProp:'backgroundColor',styleValue: '#d3e3fd',}])
        }

        hoverEffectDiv.appendChild(sideBarLinkIcon)



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