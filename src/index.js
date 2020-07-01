//DOM

const viewImage = document.querySelector(".image")
const imgTitle = document.querySelector(".title")
const imgLikes = document.querySelector(".likes")
const imgComments = document.querySelector(".comments")
const likeDiv = document.querySelector(".likes-section")
const imgCommentForm = document.querySelector(".comment-form")




//Fetch for image
fetch('http://localhost:3000/images')
.then(response => response.json())
.then(imgData => {
    imgData.forEach(imgObj =>{
        
        renderImage(imgObj)
    })
})
// render pic, title, likes
function renderImage(imgObj) {
    
    viewImage.src = `${imgObj.image}` 
    
    imgTitle.innerHTML = `
    ${imgObj.title}
    `
    imgLikes.innerHTML = `
    ${imgObj.likes}
    `
    //add likes feature and persist in database
    const likeButton = likeDiv.querySelector(".like-button")
    
    likeButton.addEventListener("click", () => {
    imgObj.likes++
    imgLikes.textContent = `${imgObj.likes}`

    fetch(`http://localhost:3000/images/${imgObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({
            'likes': imgObj.likes
        })

    })

    })
}

// Fetch for comments
fetch('http://localhost:3000/comments')
.then(response => response.json())
.then(imgComments => {
    imgComments.forEach(imgComment =>{
        
        renderComment(imgComment)
    })
})
// render comments
function renderComment(imgComment) {
    imgComments.innerHTML = `
    ${imgComment.content}
    `
}

//add comment
imgCommentForm.addEventListener("submit", event => {
    event.preventDefault()
    // debugger
    const post = event.target.comment.value

    fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            "content": post
        })
    })
    .then(response => response.json())
    .then(imgComment => {
        renderComment(imgComment)
    })
})



