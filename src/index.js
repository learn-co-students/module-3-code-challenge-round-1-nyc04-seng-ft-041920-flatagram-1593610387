// DOM Elements
const imageCard = document.querySelector(".image-card")

// Render Helpers
function renderCardData(cardObj){
  imageCard.innerHTML = `<h2 class="title">${cardObj.title}</h2>
  <img src="${cardObj.image}" class="image" alt="${cardObj.title}" />
  <div class="likes-section">
  <button class="dislike-button">👎</button>
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

  // event listener for liking/disliking
  const likesSection = document.querySelector(".likes-section")
  console.log(likesSection)
  // const likeBtn = document.querySelector(".like-button")
  const likesSpan = document.querySelector(".likes")
  likesSection.addEventListener("click", function(e){
    console.log(e.target)
    if(e.target.matches(".like-button")){
      cardObj.likes++
    }
    // dislike
    else{
      cardObj.likes--
    }
    // increase or decrease likes
    updateLikes(cardObj.likes, likesSpan)
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
  commentLi.innerHTML = `<button class="delete-button" data-id="${comment.id}">X</button>  ${comment.content}`
  commentList.append(commentLi) 
  // clear the comment input field if applicable
  document.querySelector(".comment-input").value = ""
  
  // delete comment event listener
  let deleteButton = commentLi.querySelector(".delete-button")
  deleteButton.addEventListener("click", function(e){
    deleteComment(comment.id, e.target)
  })
}

// PATCH (doesn't return comment details)
function updateLikes(numLikes, likesSpan){
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
function deleteComment(commentId, targetElement){
  fetch(`http://localhost:3000/comments/${commentId}`, {
    method: 'DELETE'
  })
  .then(r => r.json())
  // remove the li that holds the button and comment
  .then(targetElement.parentElement.remove())
}


// Initialization
// GET
fetch("http://localhost:3000/images/1")
.then(r => r.json())
.then(renderCardData)