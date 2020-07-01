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

        renderComment(newComment)
    })
}

function renderComment(commentInstance) {
    const commentLine = document.createElement("li")
    commentLine.textContent = `${commentInstance.content}`
    commentPlaceholder.append(commentLine)
}

// Initialize
fetch("http://localhost:3000/images/1")
    .then(r => r.json())
    .then(postData => {
        renderPost(postData)
    })