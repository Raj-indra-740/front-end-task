const url = new URL(window.location.href);
const queryParams = new URLSearchParams(url.search);
const userId = queryParams.get('id') ?? 1;
const userName = queryParams.get('userName');
const USER_API_URL = `https://jsonplaceholder.typicode.com/users/${userId}/posts`

let userPostData = JSON.parse(localStorage.getItem('userPostData')) ?? []


const userNameHeading = document.querySelector('#userName')
const userPostcontainer = document.querySelector('#userPostcontainer')
const createPostBtn = document.querySelector('#createPostBtn')
const titleInput = document.querySelector('#postTitle')
const contentInput = document.querySelector('#postContent')
const createPostForm = document.querySelector('#createPostForm')
const editPostForm = document.querySelector('#editPostForm')
const updatePostBtn = editPostForm.querySelector('#editPostBtn')
const cancelPostEditBtn = editPostForm.querySelector('#cancelPostEditBtn')

const userIdOfPost = editPostForm.querySelector('#userIdOfPost')
const postIdOfPost = editPostForm.querySelector('#postIdOfPost')
const editPostTitle = editPostForm.querySelector('#editPostTitle')
const editPostContent = editPostForm.querySelector('#editPostContent')




window.addEventListener('DOMContentLoaded', function (e) {
    userNameHeading.innerText = userName;
    //intial render
    if (!userPostData.length) {
        console.log('API Called')
        fetchData(USER_API_URL, { method: 'GET' }, userPostData)
    } else {
        renderPosts()
    }

})

cancelPostEditBtn.addEventListener('click', function (e) {
    e.preventDefault()
    createPostForm.style.display = 'flex';
    editPostForm.style.display = 'none';
    editPostForm.dataset.id = '';

})

createPostBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const POST_USER_API_URL = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
    const userPostTitle = titleInput.value;
    const userPostContent = contentInput.value;

    if (userPostTitle && userPostContent) {
        const maxPostId = userPostData.length
            ? Math.max(...userPostData.map(post => post.id)) 
            : 0; 
        const newPostId = maxPostId + 1;  

        const postHeaderObj = {
            method: 'POST',
            body: JSON.stringify({
                id: newPostId, 
                title: userPostTitle,
                body: userPostContent,
                userId: userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        };

        fetchData(POST_USER_API_URL, postHeaderObj, userPostData, { newPostId });
    }
    titleInput.value = '';
    contentInput.value = '';
});


function renderPosts() {
    userPostcontainer.innerHTML = '';
    userPostData.forEach(item => {
        userPostcontainer.innerHTML += createUserPostCard(item);
    });

    addClikEventForDeleEdit()
}

function addClikEventForDeleEdit(){
    // re-attach delete event listeners after re-rendering
    const deleteBtns = document.querySelectorAll('#deletePost');
    deleteBtns.forEach(item => {
        item.addEventListener('click', function (e) {
            const target = e.target;
            if (target.closest('.card').dataset.id === target.dataset.id) {
                showConfirmModal(target.dataset.id);
            }
        });
    });



    const editBtns = document.querySelectorAll('#editPost')
    console.log(editBtns)
    editBtns.forEach(item => {
        item.addEventListener('click', function (e) {
            goToEditForm(e.target.dataset.id)
        })
    })

    console.log(editBtns.length, deleteBtns.length)


}
function createUserPostCard(data) {
    console.log('called')
    return (
        `
        <div class='card flex flex-col gap-10 pb-60' id=${data.username} data-id=${data.id}>
            <p><b>Title:</b> ${data.title}</p>
            <p class="four-line-ellipsis"><b>Content:</b> ${data.body}</p>
            <div class="card-btns flex justify-space-btw justify-self-end">
                <button class="btn bg-black white px-30" id="editPost" data-id=${data.id}>Edit</button>
                <button class="btn bg-black white px-30" id="deletePost" data-id=${data.id}>Delete</button>
            </div>                
        </div>
        `
    )
}

function deletePost(postId) {
    console.log(postId)
    const DELE_POST_USER_API_URL = `https://jsonplaceholder.typicode.com/users/posts?id=${postId}`;

    const deleteHeaderObj = {
        method: 'DELETE',
        id: postId,
    }

    fetchData(DELE_POST_USER_API_URL, deleteHeaderObj, userPostData, { postId })
}

function showConfirmModal(postId) {
    const modal = document.querySelector("#deleteConfirmModal");
    const confirmDeleteBtn = document.querySelector("#confirmDeleteBtn");
    const cancelDeleteBtn = document.querySelector("#cancelDeleteBtn");


    confirmDeleteBtn.addEventListener('click', function () {
        deletePost(postId)
        closeConfirmModal()
    })

    cancelDeleteBtn.addEventListener('click', function () {
        confirmFlag = false;
        closeConfirmModal()
    })

    modal.style.display = 'flex';

}

function closeConfirmModal() {
    const modal = document.querySelector("#deleteConfirmModal");
    modal.style.display = 'none';
}


function goToEditForm(postId) {
    createPostForm.style.display = 'none';
    editPostForm.style.display = 'flex';
    editPostForm.dataset.id = postId;
    postIdOfPost.value = postId;
    userIdOfPost.value = userId;

    const postData = userPostData.find(item => item.id == postId)
    console.log(postData)

    editPostTitle.value = postData.title;
    editPostContent.value = postData.body;

    updatePostBtn?.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('update click')
        const postId = editPostForm.dataset.id;
        const PUT_USER_API_URL = `https://jsonplaceholder.typicode.com/posts/${postId}`;

        const putHeaderObj = {
            method: 'PUT',
            body: JSON.stringify({
                id: postId,
                title: editPostTitle.value,
                body: editPostContent.value,
                userId: userIdOfPost.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        };

        // call fetchData to handle the PUT request
        fetchData(PUT_USER_API_URL, putHeaderObj, userPostData, { postId })
            .then(() => {
                createPostForm.style.display = 'flex';
                editPostForm.style.display = 'none';
                editPostForm.dataset.id = '';
            });
    });
}




async function fetchData(url, optionalObj = {}, dataContainer, extraData = {}) {
    console.log('fetch called');
    let res = await fetch(url, optionalObj);
    let data = await res.json();
    console.log(data);

    switch (optionalObj.method) {
        case 'GET':
            if (Array.isArray(data)) {
                dataContainer.push(...[...dataContainer, ...data]);
            }
            renderPosts();
            break;

        case 'POST':
            if (extraData?.newPostId) {
                data.id = extraData.newPostId;
            }
            userPostData.push(data);
            userPostcontainer.innerHTML += createUserPostCard(data);
            addClikEventForDeleEdit()
            break;

        case 'DELETE':
            if (res.ok) {
                console.log('Post deleted successfully');
                userPostData = userPostData.filter(item => item.id != extraData.postId);
                renderPosts();
            } else {
                console.error('Failed to delete post');
            }
            break;

        case 'PUT':
            console.log('Edit Post using PUT method successful!');
            const updatedPostIndex = userPostData.findIndex(item => item.id == extraData.postId);
            if (updatedPostIndex !== -1) {
                userPostData[updatedPostIndex] = data;
            }
            renderPosts();
            break;
    }

    localStorage.setItem('userPostData', JSON.stringify(userPostData));
}