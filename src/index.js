// IMAGE
const commentForm = document.querySelector('.comment-form')
// console.log(commentForm)

function deleteComment(comment_id) {
  fetch(`http://localhost:3000/comments/${comment_id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
})
.then(resp => resp.json())
.then(comment => {
  console.log("Success!", comment)
})}

function newComment(newContent) {
  fetch("http://localhost:3000/comments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(newContent)
})
.then(resp => resp.json())
.then(comment => {
  displayComment(comment)
})}

// fetch comments
fetch("http://localhost:3000/comments")
.then(resp => resp.json())
.then(comments => {
  renderComments(comments)
})

// fetch image
fetch("http://localhost:3000/images")
.then(resp => resp.json())
.then(image => {
  displayImage(image[0])
})

function displayImage(data) {
  const imageFrame = document.getElementById('image-frame')
  const title = document.querySelector('.title')
  const likes = document.querySelector('.likes')
  const photo = document.createElement('img')
  title.innerText = data.title
  likes.innerText = data.likes
  photo.className = "image"
  photo.src = data.image
  imageFrame.append(photo)
}

function displayComment(comment) {
  const ulContainer = document.querySelector('.comments')
  const commentContainer = document.createElement('div')
  commentContainer.className = "comment-container"
  commentContainer.innerHTML = `
    <li>${comment.content}</li> 
    <div class="delete-btn">
      <i class="fa fa-trash" aria-hidden="true"></i> 
    <div>
  `
  ulContainer.append(commentContainer)

  const deleteBtn = commentContainer.querySelector('.delete-btn')
  deleteBtn.addEventListener('click', (event) => {
    event.target.closest('.comment-container').remove()
    deleteComment(comment.id)
  })
}

function renderComments(comments) {
  comments.forEach(displayComment)
}

commentForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const newContent = {
    "imageId": 1,
    "content": event.target[0].value
  }
  newComment(newContent)
})