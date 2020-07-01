// write your code here
const baseUrl = "http://localhost:3000"
const commentsUl = document.querySelector(".comments")
const commentForm = document.querySelector(".comment-form")
const likeButton = document.querySelector(".like-button")

function fetchImage() {
    return fetch(baseUrl + "/images/1")
    .then(res => res.json())
    .then(image => renderImage(image))
}

function patchLikes(likes) {
    const likesObj = {
        "likes": likes
    }
    fetch(baseUrl + "/images/1", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(likesObj)
    })
    .then(res => res.json())
}

function renderImage(img) {
    const imgCard = document.querySelector(".image-card")
    imgCard.querySelector(".title").textContent = img.title
    imgCard.querySelector(".image").src = img.image
    imgCard.querySelector(".likes").textContent = img.likes
    commentsUl.innerHTML = ''
    img.comments.forEach(comment => renderComment(comment.content))
}

function renderComment(comment) {
    const commentLi = document.createElement("li")
    commentLi.textContent = comment
    commentsUl.append(commentLi)

}

document.addEventListener("DOMContentLoaded", () => {
    fetchImage()
    
    commentForm.addEventListener("submit", e => {
        e.preventDefault()
        renderComment(commentForm.comment.value)
        commentForm.reset()
    })

    likeButton.addEventListener("click", e => {
        const likesSpan = document.querySelector(".likes")
        const likes = parseInt(likesSpan.textContent) + 1
        likesSpan.textContent = likes
        patchLikes(likes)
    })

})
