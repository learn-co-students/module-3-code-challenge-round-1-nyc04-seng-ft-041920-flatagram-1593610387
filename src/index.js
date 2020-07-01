// DOM Elements
const imageCard = document.querySelector(".image-card")

// Render Helpers
function renderCardData(cardObj){
  imageCard.innerHTML = `<h2 class="title">${cardObj.title}</h2>
  <img src="${cardObj.image}" class="image" alt="${cardObj.title}" />
  <div class="likes-section">
    <span class="likes">${cardObj.likes} likes</span>
    <button class="like-button">♥</button>
  </div>
  <ul class="comments">
  </ul>
  <form class="comment-form">
    <input class="comment-input" type="text" name="comment" placeholder="Add a comment..." />
    <button class="comment-button" type="submit">Post</button>
  </form>`

  //after innerHTML is created, add the comments by appending
  cardObj.comments.forEach(renderOneComment)

  // nested event listener for liking
  const likeBtn = document.querySelector(".like-button")
  const likesSpan = document.querySelector(".likes")
  likeBtn.addEventListener("click", function(e){
    cardObj.likes++
    increaseLikes(cardObj.likes, likesSpan)
  })

  // nested eventListener for Post
  const commentForm = document.querySelector(".comment-form")
  commentForm.addEventListener("submit", function(e){
    e.preventDefault()
    // post to /comments
    postComment(cardObj.id, e.target.comment.value)
  })
}

function renderOneComment(comment){
  let commentList = document.querySelector(".comments")
  // create an li for each comment and append it to the ul
  let commentLi = document.createElement("li");
  commentLi.textContent = comment.content
  commentList.append(commentLi) 
  // clear the comment input field if applicable
  document.querySelector(".comment-input").value = ""
  
  commentLi.addEventListener("click", function(e){
    console.log(e.target)
    deleteComment(comment.id, e.target)
  })
}

// PATCH (doesn't return comment details)
function increaseLikes(numLikes, likesSpan){
  fetch("http://localhost:3000/images/1", {
    method: 'PATCH',
    headers: 
    {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "likes": numLikes
    })
  })
  .then(r => r.json())
  .then(imageData =>
    // update the DOM (pessimistic rendering)
    likesSpan.textContent = `${imageData.likes} likes`
  )
}

// POST /comments
function postComment(imageId, comment){
  fetch("http://localhost:3000/comments", {
    method: 'POST',
    headers: 
    {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "imageId": imageId,
      "content": comment
    })
  })
  .then(r => r.json())
  .then(renderOneComment)
}

// DELETE /comments/:id
function deleteComment(commentId, commentElement){
  fetch(`http://localhost:3000/comments/${commentId}`, {
    method: 'DELETE'
  })
  .then(r => r.json())
  .then(commentElement.remove())
}


// Initialization
// GET
fetch("http://localhost:3000/images/1")
.then(r => r.json())
.then(renderCardData)