// write your code here
const baseUrl = "http://localhost:3000"
const commentsUl = document.querySelector(".comments")
const commentForm = document.querySelector(".comment-form")
const likeButton = document.querySelector("#upvote")
const downvoteButton = document.querySelector("#downvote")
const imgCard = document.querySelector(".image-card")

document.addEventListener("DOMContentLoaded", () => {
    
    fetchImage()
    
    commentForm.addEventListener("submit", e => {
        e.preventDefault()
        const commentObj = {
            "imageId": parseInt(imgCard.id),
            "content": commentForm.comment.value
        }
        commentForm.reset()
        postComment(commentObj)
        .then(comment => renderComment(comment))
    })

    likeButton.addEventListener("click", e => {
        const likes = renderLikes(1)
        patchLikes(likes)
    })

    downvoteButton.addEventListener("click", e => {
        const likes = renderLikes(-1)
        patchLikes(likes)
    })

})


//Fetches
function fetchImage() {
    return fetch(baseUrl + "/images/1")
    .then(res => res.json())
    .then(image => renderImage(image))
}

function patchLikes(likes) {
    fetch(baseUrl + "/images/1", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({"likes": likes})
    })
    .then(res => res.json())
}

function postComment(commentObj) {
    return fetch(baseUrl + "/comments", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(commentObj)
    })
    .then(res => res.json())
}

function deleteComment(commentId) {
    fetch(baseUrl + `/comments/${commentId}`, {
        method: "DELETE"
    })
}


// Render Helpers
function renderImage(img) {
    imgCard.id = img.id
    imgCard.querySelector(".title").textContent = img.title
    imgCard.querySelector(".image").src = img.image
    imgCard.querySelector(".likes").textContent = img.likes
    commentsUl.innerHTML = ''
    img.comments.forEach(comment => renderComment(comment))
}

function renderComment(comment) {
    const commentLi = document.createElement("li")
    commentLi.id = comment.id
    commentLi.innerHTML = `${comment.content}` + ' <button id="delete-comment">✖</button>' 
    commentsUl.append(commentLi)
    const delButton = commentLi.querySelector("#delete-comment")
    delButton.addEventListener("click", e => {
        deleteComment(commentLi.id)
        commentsUl.removeChild(commentLi)
    })
    
}

function renderLikes(nbr) {
    const likesSpan = document.querySelector(".likes")
    const likes = parseInt(likesSpan.textContent) + nbr
    likesSpan.textContent = likes
    return likes
}

