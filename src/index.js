document.addEventListener("DOMContentLoaded", function() {
    fetchPost()
})

function fetchPost() {
    fetch("http://localhost:3000/images/1")
    .then(function(res) {
        return res.json()
    })
    .then(function(postObj) {
        console.log(postObj)
        renderPost(postObj)
    })
}

function renderPost(postObj) {
    const imageCard = document.querySelector(".image-card")
    imageCard.innerHTML = `
        <h2 class="title">${postObj.title}</h2>
        <img src="${postObj.image}" class="image" />
        <div class="likes-section">
            <span class="likes">${postObj.likes} likes</span>
            <button class="like-button">♥</button>
        </div>
        <ul class="comments">
        </ul>
        <form class="comment-form">
            <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder="Add a comment..."
            />
            <button class="comment-button" type="submit">Post</button>
        </form>
    `
    //render comments
    const commentUl = imageCard.querySelector(".comments")
    renderComments(commentUl, postObj.comments)

    //add likes
    const likeButton = imageCard.querySelector(".like-button")
    likeButton.addEventListener("click", function() {
        likeObj = {"likes": postObj.likes + 1}
        patchLike(postObj)
    })

    //add comments
    const commentForm = imageCard.querySelector(".comment-form")
    commentForm.addEventListener("submit", function(e) {
        e.preventDefault()
        const commentObj = {
            "imageId": postObj.id,
            "content": commentForm.comment.value
        }
        postComment(commentObj)
    })
}


function patchLike(postObj) {
    configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(likeObj)
    }
    fetch(`http://localhost:3000/images/${postObj.id}`, configObj)
    .then(function(res){
        return res.json()
    })
    .then(function(newLike){
        console.log(newLike)
        fetchPost()
    })
}

function postComment(newComment) {
    configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment)
    }
    fetch(`http://localhost:3000/comments`, configObj)
    .then(function(res){
        return res.json()
    })
    .then(function(newComment){
        console.log(newComment)
        fetchPost()
    })
}

//helper to loop through comments arr
function renderComments(commentUl, commentsArr) {
    commentsArr.forEach(function(comment){
        const commentLi = document.createElement("li")
        commentLi.innerHTML = `${comment.content} <button class="delete-btn"> delete me</button>`
        commentUl.append(commentLi)
    })
}

//update DOM with like
// function updateLike(newLike) {
//     const likeSpan = document.querySelector(".likes")
//     const likeNum = parseInt(likeSpan.textContent)
//     likeSpan.textContent = `${likeNum + 1} likes`
// }

//update DOM with comment
// function renderNewComment(newComment, commentUl) {
//     const newCommentLi = document.createElement("li")
//     newCommentLi.innerHTML = `${newComment.content} <button class="delete-btn"> delete me</button>`
//     commentUl.append(newCommentLi)
// }

