// DOM Access
const imageCard = document.querySelector(".image-card")
const commentPlaceholder = imageCard.querySelector(".comments")

// Render Helpers
function renderPost(postData) {
    const titlePlaceholder = imageCard.querySelector(".title")
    const imagePlaceholder = imageCard.querySelector(".image")
    const likesPlaceholder = imageCard.querySelector(".likes")
    const likeButton = document.querySelector(".like-button")
    const commentForm = document.querySelector(".comment-form")

    imagePlaceholder.src = postData.image
    titlePlaceholder.textContent = postData.title
    likesPlaceholder.textContent = `${postData.likes} likes`
    commentPlaceholder.innerHTML = ""

    postData.comments.forEach(renderComment)

    likeButton.addEventListener("click", () => {
        postData.likes++

        fetch("http://localhost:3000/images/1", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                likes: postData.likes
            })
        })
            .then(r => r.json())
            .then(updatedData => {
                likesPlaceholder.textContent = `${updatedData.likes} likes`
            })
    })

    commentForm.addEventListener("submit", event => {
        event.preventDefault()
        const commentContent = event.target.comment.value

        const newComment = {
            imageId: 1,
            content: commentContent
        }

        // renderComment(newComment)

        fetch("http://localhost:3000/comments", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "imageId": newComment.imageId,
                "content": newComment.content
            })
        })
            .then(r => r.json())
            .then(newComment => {
                renderComment(newComment)
            })
    })
}

function renderComment(commentInstance) {
    const commentLine = document.createElement("li")
    const deleteButton = document.createElement("button")
    commentLine.textContent = `${commentInstance.content}`
    deleteButton.textContent = "Delete"
    commentPlaceholder.append(commentLine)
    commentLine.append(deleteButton)

    deleteButton.addEventListener("click", event => {
        commentDeleted = event.target.closest("li")
        commentPlaceholder.removeChild(commentDeleted)
        // console.log(commentInstance)
        fetch(`http://localhost:3000/comments/${commentInstance.id}`, {
            method: 'DELETE'
        })
            .then(r => r.json())
            .then(console.log)
    })
}

// Initialize
fetch("http://localhost:3000/images/1")
    .then(r => r.json())
    .then(postData => {
        renderPost(postData)
    })