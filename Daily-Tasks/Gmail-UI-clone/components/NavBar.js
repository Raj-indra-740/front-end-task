import applyStyle from "../utilities/applyStyle.js";

 
const createElement = document.createElement.bind(document)
export default function NavBar(){
    const navDiv = createElement('div');
    navDiv.id = 'navDiv';

    applyStyle(navDiv, {
        width: '100%',
        backgroundColor: '#f6f8fc',
        // borderBottom: '1px solid black',
        display: 'flex',
        justifyContent: 'space-between',
    })

    // navDiv.onclick = () => hover(navDiv)

    // navDiv.innerHTML = `
    //     <div>   
    //         <div>
    //             <i class="fa-solid fa-bars"></i>
    //         </div>
    //         <img src="./assests/gmailLogo.png" width='108'>
    //     </div>
    //     <div>
    //         <div>
    //             <input '
    //         </div>
    //     </div>
    //     <div>
    //     </div>
    // `

    const navLogoMenu = createElement('div');
    navLogoMenu.id = 'navLogoMenu'
    applyStyle(navLogoMenu, {
        display:'flex',
        alignItems:'center',
        paddingRight: '30px'
    })

    const menuIconDiv = createElement('div');
    applyStyle(menuIconDiv, {
        height:'100%',
        backgroundColor:'#eaf1fb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 15px',
    })
    const menuIcon = createImgContainer('menuIcon','./assests/burger-menu.png', 14, 12)
    applyStyle(menuIcon, {
        margin: '12px',
        cursor:'pointer',
        opacity:'0.7',
    })
    menuIconDiv.appendChild(menuIcon);

    const logoText = createImgContainer('menuIcon','./assests/gmailLogo.png', 100, 35)
    applyStyle(logoText, {
        margin: '0  0  0 22px',
        cursor:'pointer',
    })

    // Search bar main div
    const searchBarDiv = createElement('div');
    searchBarDiv.id = 'searchBarDiv';
    applyStyle(searchBarDiv, {
        width:'100%',
        padding: '8px 0',
        paddingLeft: '88px',
        display:'flex',
        justifyContent:'space-between',
        gap: '10px'
    })

    // Search bar child divs
    const searchInputdiv =  createElement('div');
    searchInputdiv.id = 'searchInputDiv';
    applyStyle(searchInputdiv, {
        position:'relative',
        width:'100%',
        maxWidth: '720px'

    })

    const searchInput = createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'searchInput';
    searchInput.placeholder = 'Search Mail';
    applyStyle(searchInput, {
        width:'100%',
        backgroundColor:'#eaf1fb',
        border: 'none',
        borderRadius: '20px',
        padding: '13px 96px 13px  44px',
        outline: 'none'
    })
    
    const searchIcon = createImgContainer('searchIcon','./assests/search.png', 16, 16)
    applyStyle(searchIcon, {
        position:'absolute',
        left: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: '0.7',
        cursor:'pointer',
    })

    const settingIcon = createImgContainer('settingIcon','./assests/setting.png', 20, 20)
    applyStyle(settingIcon, {
        position:'absolute',
        right: '30px',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: '0.7',
        cursor:'pointer',
    })
    
    searchInputdiv.append(searchInput, searchIcon, settingIcon)




    const serchBarRightMostDiv = createElement('div');
    serchBarRightMostDiv.id = 'serchBarRightMostDiv'
    applyStyle(serchBarRightMostDiv, {
        width:'100%',
        maxWidth:'fit-content',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:'5px',
    })


    //Active status Div
    const activeStatusDiv = createElement('div');
    activeStatusDiv.id = 'activeStatusDiv';
    activeStatusDiv.innerHTML = `
        <div style='display:flex; justify-content:center; align-items:center; gap:5px;'>
            <span id='statusBall' style='display:inline-block; border-radius:50%; background-color:#1e8e3e; width:12px; height:12px;'></span>
            <span id='statusText' style='font-size:14px; '>Active</span>
            <img src='./assests/down-arrow.png' width='12' height='12'/>
        </div>`
    applyStyle(activeStatusDiv, {
        width:'100%',
        maxWidth: '101px',
        backgroundColor:'#eaf1fb',
        border: 'none',
        borderRadius: '20px',
        padding: '13px 8px',
        textAlign:'center',
        fontFamily: 'sans-serif',
        cursor:'pointer',
    })

    //Help Icon Div //here sstar
    const helpIconDiv = createElement('div');
    helpIconDiv.id = 'helpIconDiv';
    applyStyle(helpIconDiv, {
        padding:'8px',
    })

    const helpIcon = createImgContainer('helpIcon', './assests/helpIcon.png', 22, 22)
    applyStyle(helpIcon, {
        opacity:'0.7',
        cursor:'pointer',
    })
    helpIconDiv.appendChild(helpIcon);

    //Help Icon Div 
    const settingTwoIconDiv = createElement('div');
    settingTwoIconDiv.id = 'settingTwoIconDiv';
    applyStyle(settingTwoIconDiv, {
        padding:'8px',
    })


    //Setting Icon Div 
    const settingTwoIcon = createImgContainer('helpIcon', './assests/setting-two.png', 22, 22)
    applyStyle(settingTwoIcon, {
        opacity:'0.7',
        cursor:'pointer',
    })
    settingTwoIconDiv.appendChild(settingTwoIcon);

    serchBarRightMostDiv.append(activeStatusDiv, helpIconDiv, settingTwoIconDiv)
    
    //profile and more menu div
    const gamilAccountDiv =  createElement('div');
    gamilAccountDiv.id = 'gamilAccountDiv';
    applyStyle(gamilAccountDiv, {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:'0 15px', 
        gap:'15px',
    })

    //Setting Icon Div 
    const moreFetureMenuDiv = createElement('div');
    settingTwoIconDiv.id = 'moreFetureMenuDiv';
    applyStyle(settingTwoIconDiv, {
        padding:'8px',
    })

    const moreFetureMenu = createImgContainer('moreFetureMenu', './assests/dots.png', 22, 22)
    applyStyle(moreFetureMenu, {
        opacity:'0.7',
        cursor:'pointer',
    })
    moreFetureMenuDiv.appendChild(moreFetureMenu);

    //gmail accpunt
    const gamilAccount = createElement('div');
    gamilAccount.id = 'gamilAccount';
    applyStyle(gamilAccount, {
        border:'1px solid #dadce0',
        borderRadius: '8px',
        padding:'4px 8px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:'10px',
        cursor:'pointer',
    })

    const gooleLogo = createImgContainer('googleLogo', 'https://www.google.com/u/0/ac/images/logo.gif?uid=106989696975894147002&service=google_gsuite', 78, 25)
    applyStyle(gooleLogo,{
        
    })

    const accountHolderIdentity = createElement('div');
    accountHolderIdentity.id = 'accountHolderIdentity';
    accountHolderIdentity.innerHTML = 'R';
    applyStyle(accountHolderIdentity, {
        width:'31px',
        height: '31px',
        fontFamily: 'sans-serif',
        color:'white',
        backgroundColor:'#7b1fa2',
        borderRadius:'50%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',

    })

    gamilAccount.append(gooleLogo, accountHolderIdentity)




    //sub div append
    navLogoMenu.append(menuIconDiv, logoText)
    searchBarDiv.append(searchInputdiv, serchBarRightMostDiv)
    gamilAccountDiv.append(moreFetureMenuDiv, gamilAccount)

   
   
    //main div append
    navDiv.append(navLogoMenu, searchBarDiv, gamilAccountDiv )

    return navDiv
}

// function hover(ele){
//     ele.style.backgroundColor = 'aqua'; 
// }

function createImgContainer(id, src, width, height){
    const img = createElement('img');
    img.id = id;
    img.src = src;
    img.width = width;
    img.height = height;
 
    return img;
}