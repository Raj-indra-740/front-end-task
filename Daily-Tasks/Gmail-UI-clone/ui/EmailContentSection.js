import applyStyle from "../utilities/applyStyle.js";
import addHoverEffect from "../utilities/addHoverEffect.js";
import createImgContainer from "../utilities/createImgContainer.js";
import EmailContentSectionHeader from "./EmailContentSectionHeader.js";
import { emailData } from "../constants/emailData.js";

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


    const emailContentDiv = createElement('div');
    emailContentDiv.id = 'emailContentDiv';

    applyStyle(emailContentDiv,{
        width:'100%',
        height: 'calc(100% - 56px)',
        overflowY:'scroll',
    })

    const emailContenSubDiv = createElement('div');
    emailContenSubDiv.id = 'emailContenSubDiv';

    emailData.forEach((item, i) => {
        const emailContentRow = createElement('div');
        emailContentRow.id = 'emailContentRow'+ item.id
        applyStyle(emailContentRow, {
            width:"100%",
            backgroundColor:'#f2f6fc',
            marginBottom:'0px',
            padding:'5px 0',
            display:'flex',
            alignItems:'center',
            // justifyContent:'space-between',

        })


        const cheackBoxDiv = createElement('div');
        applyStyle(cheackBoxDiv, {
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft:'15px '
        })
        const cheackBox = createElement('div')
        applyStyle(cheackBox, {
            width:'16px',
            height:'16px',
            margin:'5px',
            border:'2px solid #5d5f5e',
            borderRadius:'2px',
            opacity:'0.7',  
        })
        addHoverEffect(cheackBoxDiv, [{
            styleProp:'backgroundColor',
            styleValue: '#eaebef',
        }])
        cheackBoxDiv.append(cheackBox)

        const startIcondiv = createElement('div');
        applyStyle(startIcondiv, {
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor:'pointor',
        })
        const startIcon = createImgContainer('emailContentStarIcon', './assests/main-section/starBaseline.png', 20, 20)

        addHoverEffect(startIcondiv, [{
            styleProp:'backgroundColor',
            styleValue: '#eaebef',
        }])
        startIcondiv.append(startIcon)
        
        // Sender name
        const senderNameDiv = createElement('div');
        senderNameDiv.id = item.id;
        senderNameDiv.innerText = item.sender;
        applyStyle(senderNameDiv, {
            width:'100%',
            maxWidth:'168px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize:'14px',
            fontWeight: item.isRead ? 'normal' : 'bold',
            color:item.isRead ? '#5F6368' : '#202124',
        })
        // console.log(item)


        //Email content
        const emailContentPreviewDiv = createElement('div');
        emailContentPreviewDiv.id ='emailContentPreviewDiv';
        emailContentPreviewDiv.classList.add('emailContentPreviewDiv')
        emailContentPreviewDiv.innerHTML = `
            <span id=emailSubject${i} 
                style="
                    color:${item.isRead ? '#5F6368' : '#202124'};
                    font-weight:${item.isRead ? 'normal' : 'bold'}; 
                    marginRight:5px;

                ">
                ${item.subject}
            </span>
            <span>
                &nbsp;-&nbsp;
            </span>
            <span id=emailBody${i} 
                style="
                   color:#5F6368;
                "
            >
                ${item.body}
            </span>
        `
        applyStyle(emailContentPreviewDiv, {
            width:'100%',
            maxWidth:'468px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize:'14px',
            fontWeight:'normal',
        })
        
        //extra menu div
        const emailContentExtraMenuDiv =  createElement('div');
        emailContentExtraMenuDiv.id = 'emailContentExtraMenuDiv'+item.id;

        applyStyle(emailContentExtraMenuDiv, {
            width:'100%',
            maxWidth:'fit-content',
            marginLeft:'auto',
            display:'flex',
            alignItems:'center',
            gap:'10px',
            display:'none',
        })

        const linkButton = createElement('button');
        linkButton.id = 'linkButton';
        linkButton.innerText = 'Unsubscribe';
        applyStyle(linkButton, {
            fontSize:'12px',
            backgroundColor:'#f2f6fc',
            border:'1px solid #5F6368',
            borderRadius:'3px',
            padding:'3px 5px',
        })
        // addHoverEffect(linkButton,[{styleProp:'backgroundColor', styleValue:'#E8EAEC'}])

        const archiveIconDiv = createElement('div');
        archiveIconDiv.id = 'archiveIconDiv';
        applyStyle(archiveIconDiv, {
            width:'30px',
            height:'30px',
            borderRadius: '50%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        })
        addHoverEffect(archiveIconDiv, [{styleProp:'backgroundColor', styleValue:'#eaebef'}])
        const archiveIcon = createImgContainer('archiveIcon', './assests/main-section/archive.png', 20, 20)

        archiveIconDiv.appendChild(archiveIcon) 

        const deleteIconDiv = createElement('div');
        deleteIconDiv.id = 'deleteIconDiv';
        applyStyle(deleteIconDiv, {
            width:'30px',
            height:'30px',
            borderRadius: '50%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        })
        addHoverEffect(deleteIconDiv, [{styleProp:'backgroundColor', styleValue:'#eaebef'}])
        const deleteIcon = createImgContainer('deleteIcon', './assests/main-section/delete.png', 20, 20)

        deleteIconDiv.appendChild(deleteIcon) 

        const draftIconDiv = createElement('div');
        draftIconDiv.id = 'draftIconDiv';
        applyStyle(draftIconDiv, {
            width:'30px',
            height:'30px',
            borderRadius: '50%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        })
        addHoverEffect(draftIconDiv, [{styleProp:'backgroundColor', styleValue:'#eaebef'}])
        const draftIcon = createImgContainer('draftIcon', './assests/main-section/drafts.png', 20, 20)

        draftIconDiv.appendChild(draftIcon) 

        const emailClockIconDiv = createElement('div');
        emailClockIconDiv.id = 'emailClockIconDiv';
        applyStyle(emailClockIconDiv, {
            width:'30px',
            height:'30px',
            borderRadius: '50%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        })
        addHoverEffect(emailClockIconDiv, [{styleProp:'backgroundColor', styleValue:'#eaebef'}])
        const emailClockIcon = createImgContainer('emailClockIcon', './assests/main-section/clockBaseline.png', 20, 20)

        emailClockIconDiv.appendChild(emailClockIcon) 

        emailContentExtraMenuDiv.append(linkButton, archiveIconDiv, deleteIconDiv, draftIconDiv,emailClockIconDiv)


        //date container
        const emailContentDate = createElement('div');
        emailContentDate.id = 'emailContentDate'+item.id;
        emailContentDate.innerText = item.date.split(',')[0]
        applyStyle(emailContentDate, {
            fontSize:'12px',
            padding: '0px 10px',
            color: item.isRead ? '#5F6368' : '#202124',
            marginLeft:'auto',
            fontWeight: item.isRead ? 'normal' : 'bold',

        })


        emailContentRow.append(cheackBoxDiv, startIcondiv, senderNameDiv, emailContentPreviewDiv,emailContentExtraMenuDiv, emailContentDate)
    
        //pop effect and visiblity of extramenu div
        emailContentRow.addEventListener('mouseenter', function () {
            emailContentRow.style.boxShadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px';
            emailContentRow.style.marginBottom = '1px';
            emailContentPreviewDiv.style.maxWidth = '368px';
            emailContentExtraMenuDiv.style.display = 'flex';
            emailContentDate.style.display = 'none';
        });
    
        emailContentRow.addEventListener('mouseleave', function () {
            emailContentRow.style.boxShadow = '';
            emailContentRow.style.marginBottom = '0px';
            emailContentPreviewDiv.style.maxWidth = '468px';
            emailContentExtraMenuDiv.style.display = 'none';
            emailContentDate.style.display = 'block';
        });
        emailContenSubDiv.appendChild(emailContentRow)
    })




    emailContentDiv.append(emailContenSubDiv)

    

    emailContentSection.append(EmailContentSectionHeader(), emailContentDiv)

    return emailContentSection
}