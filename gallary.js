const imageCount = 60;

const API_KEY = 'bbDyJUBnFCoHK5L_oZ4BV6JWxoBhYOdOZb8iHAkuPiA'
const NEW_API_KEY = 'WLf8g2PBLI-bqrlGLHpN9C4kVmUfRVjLB2gxG8HuTsw'
const API_URL = `https://api.unsplash.com/photos/random?client_id=${NEW_API_KEY}&count=${imageCount}`


let imageData = []
const imageDataAll = [];
const gallaryContainer = document.querySelector('.gallary-container')


function displayData(data, parentElement){
    data.forEach((item, i) => {
        const img = document.createElement('img');
        img.src = item.urls.full; 
        img.classList.add('img-container');
        parentElement.appendChild(img);
    })
}


function fetchData(url) {
    fetch(url)
        .then(res =>{
            return res.json()
        })
        .then(data => {
            console.log(data.length);
            imageData = data;  
            imageDataAll.push(...imageData) 
            console.log(imageDataAll);   
        })
        .then(() => displayData(imageData, gallaryContainer))
        .catch(err => console.error('Error fetching data:', err));
}

fetchData(API_URL)

// window.addEventListener('scroll',()=>{
//     console.log("scrolled", window.scrollY)
//     console.log(window.innerHeight) 
//     if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
//         fetchData(API_URL)
//     }
// })

const item = {
    id: 'BfCooHxOI1E',
    slug: 'a-blurry-image-of-a-building-with-a-clock-on-it-BfCooHxOI1E',
    alternative_slugs: {
      en: 'a-blurry-image-of-a-building-with-a-clock-on-it-BfCooHxOI1E',
      es: 'una-imagen-borrosa-de-un-edificio-con-un-reloj-BfCooHxOI1E',
      ja: '時計が描かれた建物のぼやけた画像-BfCooHxOI1E',
      fr: 'une-image-floue-dun-batiment-avec-une-horloge-dessus-BfCooHxOI1E',
      it: 'unimmagine-sfocata-di-un-edificio-con-un-orologio-su-di-esso-BfCooHxOI1E',
      ko: '시계가-있는-건물의-흐릿한-이미지-BfCooHxOI1E',
      de: 'ein-verschwommenes-bild-eines-gebaudes-mit-einer-uhr-darauf-BfCooHxOI1E',
      pt: 'uma-imagem-borrada-de-um-predio-com-um-relogio-BfCooHxOI1E'
    },
    created_at: '2024-08-26T16:51:11Z',
    updated_at: '2024-09-23T17:09:22Z',
    promoted_at: '2024-09-03T11:51:55Z',
    width: 8736,
    height: 11648,
    color: '#d90c0c',
    blur_hash: 'LNM|A#OH0:k7[LOuOYWD0Ww}tijI',
    description: null,
    alt_description: 'A blurry image of a building with a clock on it',
    breadcrumbs: [],
    urls: {
      raw: 'https://images.unsplash.com/photo-1724690413301-cc1d6344e4b1?ixid=M3w2NTcyNDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjcxODAwNTJ8&ixlib=rb-4.0.3',
      full: 'https://images.unsplash.com/photo-1724690413301-cc1d6344e4b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NTcyNDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjcxODAwNTJ8&ixlib=rb-4.0.3&q=85',
      regular: 'https://images.unsplash.com/photo-1724690413301-cc1d6344e4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTcyNDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjcxODAwNTJ8&ixlib=rb-4.0.3&q=80&w=1080',
      small: 'https://images.unsplash.com/photo-1724690413301-cc1d6344e4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTcyNDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjcxODAwNTJ8&ixlib=rb-4.0.3&q=80&w=400',
      thumb: 'https://images.unsplash.com/photo-1724690413301-cc1d6344e4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTcyNDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjcxODAwNTJ8&ixlib=rb-4.0.3&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1724690413301-cc1d6344e4b1'
    },
    links: {
      self: 'https://api.unsplash.com/photos/a-blurry-image-of-a-building-with-a-clock-on-it-BfCooHxOI1E',
      html: 'https://unsplash.com/photos/a-blurry-image-of-a-building-with-a-clock-on-it-BfCooHxOI1E',
      download: 'https://unsplash.com/photos/BfCooHxOI1E/download?ixid=M3w2NTcyNDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjcxODAwNTJ8', 
      download_location: 'https://api.unsplash.com/photos/BfCooHxOI1E/download?ixid=M3w2NTcyNDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjcxODAwNTJ8'
    },
    likes: 36,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: null,
    topic_submissions: { experimental: [Object] },
    asset_type: 'photo',
    user: {
      id: '1Ii2-3J-e_o',
      updated_at: '2024-09-23T21:26:50Z',
      username: 'jakobowens1',
      name: 'Jakob Owens',
      first_name: 'Jakob',
      last_name: 'Owens',
      twitter_username: 'jakobOwenss',
      portfolio_url: 'https://amap.to/jakobowens/',
      bio: 'Filmmaker, Photographer, Entrepreneur : LA/PHX - Instagram: @JakobOwens\r\n' +
        'EVERYTHING I DO: https://amap.to/jakobowens/',
      location: null,
      links: [Object],
      profile_image: [Object],
      instagram_username: 'jakobowens',
      total_collections: 2,
      total_likes: 444,
      total_photos: 1193,
      total_promoted_photos: 846,
      total_illustrations: 0,
      total_promoted_illustrations: 0,
      accepted_tos: true,
      for_hire: true,
      social: [Object]
    },
    exif: {
      make: 'FUJIFILM',
      model: 'GFX100S II',
      name: 'FUJIFILM, GFX100S II',
      exposure_time: '1',
      aperture: '1.0',
      focal_length: null,
      iso: 100
    },
    location: { name: null, city: null, country: null, position: [Object] },
    views: 256167,
    downloads: 1346
  }
 