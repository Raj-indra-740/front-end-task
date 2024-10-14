import applyStye from "./utilities/applyStyle.js";
import NavBar from "./components/NavBar.js";


const styleElement = document.createElement('style');
styleElement.innerHTML = `
    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
    }
`;

const mainDiv = document.createElement('div');
mainDiv.id = 'mainDiv';


applyStye(mainDiv, {
    width: '100%',
    height: '100vh',
    backgroundColor: "#ffffff",
})

document.head.appendChild(styleElement)
document.body.appendChild(mainDiv)


mainDiv.appendChild(NavBar())