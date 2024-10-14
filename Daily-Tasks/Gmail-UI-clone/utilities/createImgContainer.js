export default function createImgContainer(id, src, width, height){
    const img = document.createElement('img');
    img.id = id;
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = 'image';
 
    return img;
}