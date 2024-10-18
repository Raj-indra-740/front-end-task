console.log('functional script is loaded!!')
import addHoverEffect from "./utilities/addHoverEffect.js";
import applyStye from "./utilities/applyStyle.js";

let togglePopSideBarFlag = false;
let statusListFlag = false;
const popSideBarDiv = document.querySelector('#popSideBarDiv');
const menuIconDiv = document.querySelector('#menuIconDiv')
const emailContentPreviewDiv = document.querySelectorAll('.emailContentPreviewDiv')
const activeStatusDiv = document.querySelector('#activeStatusDiv')

// console.log(popSideBarDiv, menuIconDiv)
// console.log(emailContentPreviewDiv)

menuIconDiv.addEventListener('click', function(){
    if(!togglePopSideBarFlag){
        popSideBarDiv.style.width = '0%';
        setTimeout(() => {
            popSideBarDiv.style.padding = '0px';
            emailContentPreviewDiv.forEach(item => item.style.maxWidth = '668px')
        }, 900)
        togglePopSideBarFlag = !togglePopSideBarFlag;
    }else{
        popSideBarDiv.style.width = '100%';
        popSideBarDiv.style.padding = '10px';
        emailContentPreviewDiv.forEach(item => item.style.maxWidth = '468px')
        togglePopSideBarFlag = !togglePopSideBarFlag;
    }
})

const statusData = [{type:'Auto', iconColor:'#1e8e3e'}, {type:'Do not disturb', iconColor:'red'}, {type:'Set as away', iconColor:'#fbbc04' }]


function statusList(){
    const div = document.createElement('div');
    div.id = 'statusList';
    applyStye(div, {
        borderRadius:'5px',
        width:'200px',
        backgroundColor:'white',
        position:'absolute',
        top:'60px',
        right: '-30px',
        display:'none',
        flexDirection:'column',
        alignItems:'start',
        gap:'10px',
        zIndex: '5',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',
        overflow:'hidden',
    })

    statusData.forEach(item => {
        const option = document.createElement('div')
        option.classList.add('statusListContents')
        applyStye(option, {
            width:'100%',
        })
        option.innerHTML = `
        <div
        style=
            '
            display:flex; 
            justify-content:start; 
            align-items:center; 
            gap:5px;
            padding:20px;
            cursor:pointer;
            '>
            <span id='statusBall' 
                style='
                    display:inline-block; 
                    border-radius:50%;
                    background-color: ${item.iconColor ? item.iconColor : 'white' };
                    border: 1px solid ${item.iconColor ? item.iconColor : 'black' };
                    width:12px; height:12px;
                '>
            </span>
            <span id='statusText' style='font-size:14px; '>${item.type}</span>
        </div>
        `
        addHoverEffect(option, [{styleProp:'backgroundColor', styleValue:'#eaebef'}])
    
        option.addEventListener('click', function(){
            activeStatusDiv.innerHTML = `
                    <div style='display:flex; justify-content:center; align-items:center; gap:5px;'>
                        <span id='statusBall' style='display:inline-block; border-radius:50%; background-color:${item.iconColor};  border: 1px solid ${item.iconColor ? item.iconColor : 'black' }; width:12px; height:12px;'></span>
                        <span id='statusText' style='font-size:14px; '>${item.type}</span>
                        <img src='./assests/down-arrow.png' width='12' height='12'/>
                    </div>
            `
            this.parentElement.style.display = 'none'
            statusListFlag = false;
        })
    

        div.appendChild(option)

    }) 


    return div
}

activeStatusDiv.after(statusList())
activeStatusDiv.addEventListener('click', function(){
    event.stopPropagation();
    console.log('clicked')
    if(!statusListFlag){
        document.querySelector('#statusList').style.display = 'flex'
        statusListFlag = !statusListFlag
    }else{
        document.querySelector('#statusList').style.display = 'none'
        // activeStatusDiv.after(statusList())
        statusListFlag = !statusListFlag
    }
})



