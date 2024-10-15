export default function addHoverEffect(element, styleToApply){
    element.onmouseenter = function(){
        styleToApply.length && styleToApply.forEach((item) => {
            element.style[item.styleProp] = item.styleValue  
        })
    }

    element.onmouseleave = function(){
        styleToApply.length && styleToApply.forEach((item) => {
            element.style[item.styleProp] = ''   
        }) 
    }
}