const imgCard = document.querySelector(".image-card");
const likesSection = document.querySelector(".likes-section");
const commentsSection = document.querySelector(".comments");

function fetchImage() {
    fetch('http://localhost:3000/images/1').then(resp => resp.json()).then(imageObj => {
        renderImage(imageObj)
    })
}

function renderImage(imageObj) {
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    h2.className = 'title';
    img.className = 'image';
    const likesSpan = document.createElement('span');
    likesSpan.className = 'likes';
    const likesBtn = document.createElement('button');
    likesBtn.className = 'like-button';
    likesBtn.innerHTML = '♥'
    likesBtn.dataset.id = imageObj.id;
    h2.textContent = imageObj.title;
    img.src = imageObj.image
    likesSpan.innerHTML = imageObj.likes + ' likes';
    renderComments(imageObj)
    imgCard.prepend(h2, img);
    likesSection.append(likesSpan, likesBtn);
    activateLikes(likesBtn)
    // downvoteLikes(likesBtn)
    addComment()
}

fetchImage()


function activateLikes(likesBtn) {
    likesBtn.addEventListener('click', (e) => {
        likesBtn.classList.toggle('.like-button')
        let currentLikes = (document.querySelector('.likes').innerText.split(' ')[0]);
        const id = likesBtn.dataset.id;
        let newLikes = parseInt(currentLikes) + 1;
        sendLikes(id, newLikes)
        document.querySelector('.likes').innerHTML = `${newLikes} likes`;
    })
}


function sendLikes(id, newLikes) {
    const data = {
        "likes": newLikes
    }

    const payload = {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }

    fetch("http://localhost:3000/images/1", payload).then(resp => resp.json()).then(resp => {
        console.log(resp)
    })
}

function addComment() {
    const commentForm = document.querySelector('.comment-form');
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const comment = e.target.comment.value;
        const id = parseInt(e.target.parentElement.children[2].children[1].dataset.id);
        persistComment(id, comment);
    })
}

function persistComment(id, comment) {
    const commentObj = {
        "imageId": id,
        "content": comment
    }

    const payload = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentObj)
    }
    fetch(`http://localhost:3000/comments`, payload).then(resp => resp.json()).then(resp => {
        console.log(resp)
    })
}


function renderComments(imageObj) {
    // console.log(imageObj, li)
    if (imageObj.comments.length > 0) {
        imageObj.comments.forEach(comment => {
            const li = document.createElement('li');
            const delBtn = document.createElement('button')
            delBtn.dataset.id = comment.id;
            activateDelete(delBtn, li)
            delBtn.innerText = "delete"
            li.innerHTML = comment.content
            commentsSection.append(li, delBtn);
        });
    }
}



function activateDelete(delBtn, li) {
    delBtn.addEventListener('click', (e) => {
        const id = parseInt(delBtn.dataset.id);
        deleteComment(id)
        li.remove()
        delBtn.remove()
    })
}

function deleteComment(id) {
    const payload = {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    }
    fetch(`http://localhost:3000/comments/${id}`, payload).then(resp => resp.json()).then(resp => {
        console.log(resp)
    })
}
