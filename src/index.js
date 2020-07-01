// write your code here

//Dom Elements
const dogContainer = document.querySelector(".image-container");
const commentForm = document.querySelector(".comment-form");
const postComment = document.querySelector(".comments")

//Event Listeners
dogContainer.addEventListener("click", function(event) {

    if(event.target.matches(".like-button")) { 
    const dogCard = event.target.closest(".image-card")
    const likesSpan = dogCard.querySelector(".likes")

    const newLikes = parseInt(likesSpan.textContent) + 1

    likesSpan.textContent = `${newLikes}`

    fetch('http://localhost:3000/images/1', {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({likes: newLikes}),
    })
    }
});

commentForm.addEventListener("submit", function(event) {
    event.preventDefault()

    const newComment = {
        content: event.target.comment.value
        }

    fetch('http://localhost:3000/comments', {
    method: 'POST', 
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    "imageId": 1,
    "content": newComment
}),
    })
    .then(response => response.json())
    .then(actualNewComment => {
        postComment.innerHTML =  `<li>${actualNewComment.content}</li>`
    });
}); 

    
//Initial Render 
fetch('http://localhost:3000/images/1')
    .then(response => response.json())
    .then(dogObject => {
        dogContainer.innerHTML = `<div class="image-card" data-id=${dogObject.id}>
        <h2 class="title">${dogObject.title}</h2>
        <img src="${dogObject.image}" class="image" />
        <div class="likes-section">
        <span class="likes">${dogObject.likes} likes</span>
        <button class="like-button">♥</button>
        </div>
        <ul class="comments">
        <li>${dogObject.comments[0].content}</li>
        <li>${dogObject.comments[1].content}</li>
        <li>${dogObject.comments[2].content}</li>
    </ul>
    <form class="comment-form">
        <input
        class="comment-input"
        type="text"
        name="comment"
        placeholder="Add a comment..."
        />
        <button class="comment-button" type="submit">Post</button>
    </form>`
        });
