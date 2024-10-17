console.log('functional script is loaded!!')
import applyStye from "./utilities/applyStyle.js";

let togglePopSideBarFlag = false;
let statusListFlag = false;
const popSideBarDiv = document.querySelector('#popSideBarDiv');
const menuIconDiv = document.querySelector('#menuIconDiv')
const emailContentPreviewDiv = document.querySelectorAll('.emailContentPreviewDiv')
const activeStatusDiv = document.querySelector('#activeStatusDiv')

console.log(popSideBarDiv, menuIconDiv)
console.log(emailContentPreviewDiv)

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

const statusData = [{type:'Automatic', iconColor:'#1e8e3e'}, {type:'Do not disturb', iconColor:'red'}, {type:'Set as away', iconColor:null }]


function statusList(){
    const div = document.createElement('div');
    div.id = 'statusList';
    applyStye(div, {
        display:'block',
        borderRadius:'10px',
        width:'fit-content',
        backgroundColor:'white',
        position:'absolute',
        bottom:'-150px',
        display:'flex',
        flexDirection:'column',
        alignItems:'start',
        gap:'10px',
    })

    statusData.forEach(item => {
        const option = document.createElement('div')
        option.innerHTML = `
        <div style=
            '
            display:flex; 
            justify-content:center; 
            align-items:center; 
            gap:5px;
            margin-bottom:5px;
            padding:10px 20px;
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


        div.appendChild(option)

    }) 


    return div
}

activeStatusDiv.addEventListener('click', function(){

    if(!statusListFlag){
        activeStatusDiv.after(statusList())
        statusListFlag = !statusListFlag
    }else{
        document.querySelector('#statusList').remove()
        // activeStatusDiv.after(statusList())
        statusListFlag = !statusListFlag
    }
})