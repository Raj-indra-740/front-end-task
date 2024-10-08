const mainCommentInput = document.querySelector('#comment');
const userNameInput = document.querySelector('#userName');
const commentBtns = document.querySelector('#commentBtns');
const userIdInputSection = document.querySelector('#userIdInput');
const commentSection = document.querySelector('#commentSection');

const profileImageCollection = [
    'https://a.thumbs.redditmedia.com/Klk3OD9m_TfcfI1nMWxG2NByj5EtcWfLDBD-eb3P9R0.jpg',
    'https://media.tenor.com/3uMtKR_aKh4AAAAe/dog-walter.png',
    'https://play-lh.googleusercontent.com/oAdsB4clAlg85k_X2IVtmVr5pxr0RlJ14JGr6yXUbSJ4XZCWCrUcPXRmKk12fKnLm0M',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_XBS7dHQ6aEPYGS6jIdR7ufF-rMRdHgGEFLPOWmR2MNReEX-RIrZP-nOXRIIknVwuxE&usqp=CAU',
    'https://play-lh.googleusercontent.com/5vFtxLadFS4y0a4b6Wm3QU39-0QHrm858Xx58FfWRCsMA5JAgqKFbyTsZCb3A3E-iw=w526-h296-rw',
];

const userIdCollection = new Map()
const postComments = [
    {
        userId: '831AR',
        userImg: 'https://play-lh.googleusercontent.com/oAdsB4clAlg85k_X2IVtmVr5pxr0RlJ14JGr6yXUbSJ4XZCWCrUcPXRmKk12fKnLm0M',
        userName: "BaByShark1",
        commentDate: 'Mon Jan 07 2022',
        content: 'Sharks are more tasty Emoooo! ',
        parentId: null,
        replies: [],
    },
    {
        userId: '211XW',
        userImg: 'https://media.tenor.com/3uMtKR_aKh4AAAAe/dog-walter.png',
        userName: "Squisy22",
        commentDate: 'Mon Sep 12 2022',
        content: 'No non-veg! only Veg',
        parentId: null,
        replies: [
            {
                userId: '321AW',
                userImg: 'https://a.thumbs.redditmedia.com/Klk3OD9m_TfcfI1nMWxG2NByj5EtcWfLDBD-eb3P9R0.jpg',
                userName: "CaratBro",
                commentDate: 'Mon Sep 12 2022',
                content: 'See who is here!! Mr.veggy',
                parentId: '211XW',
                replies: [
                    {
                        userId: '831AR',
                        userImg: 'https://play-lh.googleusercontent.com/oAdsB4clAlg85k_X2IVtmVr5pxr0RlJ14JGr6yXUbSJ4XZCWCrUcPXRmKk12fKnLm0M',
                        userName: "BaByShark1",
                        commentDate: 'Mon Jan 07 2022',
                        content: 'Sharks are more tasty Emoooo! ',
                        parentId: '321AW',
                        replies: [],
                    },
                ],
            },
            {
                userId: '321AW',
                userImg: 'https://a.thumbs.redditmedia.com/Klk3OD9m_TfcfI1nMWxG2NByj5EtcWfLDBD-eb3P9R0.jpg',
                userName: "CaratBro",
                commentDate: 'Mon Sep 12 2022',
                content: 'See who is here!! Mr.veggy',
                parentId: '211XW',
                replies: [
                    {
                        userId: '831AR',
                        userImg: 'https://play-lh.googleusercontent.com/oAdsB4clAlg85k_X2IVtmVr5pxr0RlJ14JGr6yXUbSJ4XZCWCrUcPXRmKk12fKnLm0M',
                        userName: "BaByShark1",
                        commentDate: 'Mon Jan 07 2022',
                        content: 'Sharks are more tasty Emoooo! ',
                        parentId: '321AW',
                        replies: [],
                    },
                ],
            },
        ]
    },
]

// const postComments = []
mainCommentInput.addEventListener('focus', function (e) {
    userIdInputSection.classList.add('flex')
})

commentBtns.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        toggleClass(userIdInputSection, 'flex');

        if (e.target.id === 'addCommentBtn') {
            addCommentOrReply();
        }
    }
});

function toggleClass(element, className) {
    element.classList.toggle(className);
}

function randomIndexBtwRange(range) {
    return Math.floor(Math.random() * range);
}

//function to genrate Ranndom User Id
function randomIdGenerator(userObject) {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
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

//function to create user object
function createUserCommentObj(userId, userImg, userName, commentDate, content, parentId = null, replies = []) {
    return { userId, userImg, userName, commentDate, content, parentId, replies };
}

// function to add comments
function addCommentOrReply() {
    const content = mainCommentInput.value.trim();
    const userName = userNameInput.value.trim();
    
    if (!content || !userName) {
        alert("Please provide both a username and a comment.");
        return;
    }

    const userID = randomIdGenerator({ userName, content });
    const userImg = `https://picsum.photos/200/300?random=${randomIndexBtwRange(200)}`;
    const commentDate = new Date().toDateString();

    let userCommentObj = createUserCommentObj(userID, userImg, userName, commentDate, content);

    postComments.push(userCommentObj);

    clearInputs();
    renderComments(postComments);
}

function clearInputs() {
    mainCommentInput.value = '';
    userNameInput.value = '';
}

//recursive rendering of comments, including replies
function renderComments(comments, parentElement = commentSection) {
    parentElement.innerHTML = ''; 

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.id = comment.userId;
        commentDiv.classList.add('all-comments');


        commentDiv.innerHTML = `
            <div class="comment-card">
                <img src="${comment.userImg}" class="comment-card-image" alt="user image" width="50" height="50">
                <div class="comment-content">
                    <h3 class="comment-heading">${comment.userName}</h3>
                    <p class="comment-date">${comment.commentDate}</p>
                    <p class="comment-text">${comment.content}</p>
                </div>
                <button class="btn bg-black white reply-btn" data-id="${comment.userId}">Reply</button>
            </div>
        `;

        comment.parentId &&  commentDiv.classList.add('reply-comment')

        parentElement.appendChild(commentDiv); 

        if (comment.replies.length > 0) {
            const repliesContainer = document.createElement('div');
            repliesContainer.classList.add('replies-container');
            // repliesContainer.style.marginLeft = '20px';

            renderComments(comment.replies, repliesContainer);
            commentDiv.appendChild(repliesContainer);
        }
    });
}

//reply button clicks event
commentSection.addEventListener('click', function (e) {
    if (e.target.classList.contains('reply-btn')) {
        const parentId = e.target.getAttribute('data-id');
        renderReplyInput(parentId, e.target.parentElement);
    }
});

function renderReplyInput(parentId, parentElement) {
    const inputDiv = document.createElement('div');
    inputDiv.innerHTML = `
        <textarea class="input-field border-rounded p-10 text-area" id="replyInput" placeholder="Add a reply..."></textarea>
        <div class="reply-controls">
            <input class="input-field" type="text" id="replyUserName" placeholder="Your Name">
            <button class="btn bg-black white" id="submitReplyBtn" data-parent-id="${parentId}">Submit Reply</button>
        </div>
    `;

    parentElement.appendChild(inputDiv);

    const submitReplyBtn = document.querySelector(`#submitReplyBtn[data-parent-id='${parentId}']`);
    submitReplyBtn.addEventListener('click', () => submitReply(parentId));
}

function submitReply(parentId) {
    const replyContent = document.querySelector('#replyInput').value.trim();
    const replyUserName = document.querySelector('#replyUserName').value.trim();

    if (!replyContent || !replyUserName) {
        alert("Please provide both a username and a reply.");
        return;
    }

    const userID = randomIdGenerator({ replyUserName, replyContent });
    const userImg = `https://picsum.photos/200/300?random=${randomIndexBtwRange(200)}`;
    const commentDate = new Date().toDateString();

    let replyObj = createUserCommentObj(userID, userImg, replyUserName, commentDate, replyContent, parentId);

    addReply(postComments, replyObj);
    renderComments(postComments);
}

function addReply(comments, replyObj) {
    for (let comment of comments) {
        if (comment.userId === replyObj.parentId) {
            comment.replies.push(replyObj);
            return;
        }
        if (comment.replies.length) {
            addReply(comment.replies, replyObj);  
        }
    }
}

// Intial Rander of comment
renderComments(postComments);
