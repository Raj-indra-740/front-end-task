const mainCommentInput = document.querySelector('#comment')
const userNameInput = document.querySelector('#userName')
const commentBtns = document.querySelector('#commentBtns')
const userIdInputSection = document.querySelector('#userIdInput')
const commentSection = document.querySelector('#commentSection')

const profileImageCollection = [
    'https://a.thumbs.redditmedia.com/Klk3OD9m_TfcfI1nMWxG2NByj5EtcWfLDBD-eb3P9R0.jpg',
    'https://preview.redd.it/my-old-profile-pic-on-discord-that-i-made-is-now-in-the-v0-mmxyfo61pds81.jpg?width=640&crop=smart&auto=webp&s=1d82da4169e12186c0aa106df1af6de2a7568c85',
    'https://preview.redd.it/dog-de-cria-v0-pef5ivm603gc1.jpeg?auto=webp&s=b48b4155f1f2b009ec503467a80fac14783a710e',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_XBS7dHQ6aEPYGS6jIdR7ufF-rMRdHgGEFLPOWmR2MNReEX-RIrZP-nOXRIIknVwuxE&usqp=CAU',
    'https://media.tenor.com/3uMtKR_aKh4AAAAe/dog-walter.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtCSm6agZqyRLmnjpqxC29SVLkqZB6b1snOS2qkxpV0if2CuMZgmg4i9A5Ixt4ynNe_C0&usqp=CAU',
    'https://media.licdn.com/dms/image/v2/D5612AQFlR6CXtEk3og/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1709355454835?e=1733356800&v=beta&t=n5vaOZ3zvd-gnZKBkWDse2Xsph8fij3Usuj3Zcc6zeU',
    'https://media.licdn.com/dms/image/v2/D5612AQHV7OQuC-dRvQ/article-inline_image-shrink_400_744/article-inline_image-shrink_400_744/0/1709355461942?e=1733356800&v=beta&t=w1OE__AXRqCmZRq9z9ADGHBbhgYNH0YgT8qQzmfVjog',
    'https://play-lh.googleusercontent.com/oAdsB4clAlg85k_X2IVtmVr5pxr0RlJ14JGr6yXUbSJ4XZCWCrUcPXRmKk12fKnLm0M',
    'https://play-lh.googleusercontent.com/5vFtxLadFS4y0a4b6Wm3QU39-0QHrm858Xx58FfWRCsMA5JAgqKFbyTsZCb3A3E-iw=w526-h296-rw',

]

let marginForNested = 0;

const userIdCollection = new Map()
const postComments = [
       {
        userID: '831AR',
        userImg: 'https://play-lh.googleusercontent.com/oAdsB4clAlg85k_X2IVtmVr5pxr0RlJ14JGr6yXUbSJ4XZCWCrUcPXRmKk12fKnLm0M',
        userName: "BaByShark1",
        commentDate:  'Mon Jan 07 2022',
        content : 'Sharks are more tasty Emoooo! ',
        parentId: null,
        replies: [],
       },
       {
        userID: '211XW',
        userImg: 'https://media.tenor.com/3uMtKR_aKh4AAAAe/dog-walter.png',
        userName: "Squisy22",
        commentDate:  'Mon Sep 12 2022',
        content : 'No non-veg! only Veg',
        parentId: null,
        replies: [
           {
            userID: '321AW',
            userName: "CaratBro",
            content : 'See who is here!! Mr.veggy',
            replies: [],
              },
           ]
       },
]

mainCommentInput.addEventListener('focus', function(e){
    userIdInputSection.classList.add('flex')
})

commentBtns.addEventListener('click', function(e){
    if(e.target.tagName == 'BUTTON'){
        toggleClass(userIdInputSection, 'flex')
       
        if(e.target.id == 'addCommentBtn'){
            const content = mainCommentInput.value
            const userName = userNameInput.value
            const userID = randomIdGenerator({userName, content})
            const userImg = profileImageCollection[randomIndexBtwRange(9)]
            const commentDate = new Date()


            let userObj = createUserCommentObj(userID,userImg, userName, commentDate.toDateString(), content)
            console.log(userObj)
            postComments.push(userObj)

            mainCommentInput.value = '';
            userNameInput.value = '';

            renderComments(postComments)

        }
        console.log(e.target.tagName)

    }  
})


function toggleClass(element, className, ){
    element.classList.toggle(className)
}   

function randomIndexBtwRange(range){
    return Math.floor(Math.random() * range)
}
function randomIdGenerator(userObject){
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let id = '';
    do {
        id = '';
        for (let i = 0; i < 8; i++) {
            id += charSet[randomIndexBtwRange(charSet.length)];
        }
    } while (userIdCollection.has(id));

    userIdCollection.set(id, userObject);
    return id;
}

function createUserCommentObj(userId = null, userImg = null, userName = null ,commentDate = null, content = '', parentId = null, replies=[]){
    return {userId, userImg, userName,commentDate, parentId, content, replies}
}

function renderComments(comments, parentElement = commentSection) {
    parentElement.innerHTML = '';

    comments.forEach((item) => {
        const mainDiv = document.createElement('div');
        const div = document.createElement('div');
        div.classList.add('comment-card');
        div.id = item.userID;

        div.innerHTML = `
            <img src=${item.userImg} class='comment-card-image' alt="" width=50 height=50>
            <div class="comment-content">
                <h3 class='comment-heading'>${item.userName}</h3>
                <p class='comment-date'>${item.commentDate}</p>
                <p class='comment-text'>${item.content}</p>
            </div>
            <button class='btn item-end bg-black white' id=${item.userID}>Reply</button>
        `;
        mainDiv.appendChild(div)
        parentElement.appendChild(mainDiv);

        if (item.replies.length) {
            const repliesContainer = document.createElement('div');
            repliesContainer.classList.add('replies-container');
            repliesContainer.style.marginLeft = marginForNested + 40
            mainDiv.appendChild(repliesContainer);

            renderComments(item.replies, repliesContainer);
        }
    });
}



renderComments(postComments)

commentSection.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const parentId = e.target.id;

        // Display input to add a reply
        const replyInput = document.createElement('textarea');
        replyInput.placeholder = 'Add a reply...';
        e.target.parentElement.appendChild(replyInput);

        // Add button to submit reply
        const submitReplyBtn = document.createElement('button');
        submitReplyBtn.innerText = 'Submit Reply';
        e.target.parentElement.appendChild(submitReplyBtn);

        submitReplyBtn.addEventListener('click', function() {
            const content = replyInput.value;
            const userName = userNameInput.value; // Get from an appropriate input or default value
            const userID = randomIdGenerator({ userName, content });
            const userImg = profileImageCollection[randomIndexBtwRange(9)];
            const commentDate = new Date();

            let replyObj = createUserCommentObj(userID, userImg, userName, commentDate.toDateString(), content, this.parentElement.id);
            console.log(replyObj);


            addReply(postComments, replyObj);

            renderComments(postComments);
        });
    }
});
            // Find the parent comment in postComments and add the reply
            function addReply(comments, reply) {
                for (let comment of comments) {
                    if (comment.userID === reply.parentId) {
                        comment.replies.push(reply);
                        renderComments(postComments)
                        return;
                    }
                    if (comment.replies.length) {
                        addReply(comment.replies, reply);
                    }
                }
            }