function app() {
  const commentForm = document.querySelector('.comment-form')
  
  function updateLikeComment(commentObj, image_id) {
    fetch(`http://localhost:3000/images/${image_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }, 
      body: JSON.stringify(commentObj)
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json() 
      } else {
        throw new Error("Ops! We couldn't update the like at this time.")
      }
    }).then(updateLike => {
      console.log("Success! Like updated.")
    })
    .catch(error => {
      console.log(error)
    })

  }

  function deleteComment(comment_id) {
      fetch(`http://localhost:3000/comments/${comment_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        throw new Error("We cannot delete your comment at this time. Try again later.")
      }
    })
    .then(comment => {
      console.log("Your comment was deleted.")
    })
    .catch(error => {
      console.log(error)
    })
  }

  function newComment(newContent) {
      fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newContent)
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        throw new Error("Ops! We're sorry, but we cannot post that comment at the moment. We're working on our servers to fix it. Try again later.")
      }
    })
    .then(comment => {
      displayComment(comment)
    })
    .catch(error => {
      console.log(error)
    })
  }

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
    const imageBox = document.getElementById('image-box')
    
    imageBox.innerHTML += `
      <h2 class="title">${data.title}</h2>
      <img src="${data.image}" class="image" />
      <div class="likes-section">
        <span class="likes"> <span class="likes-count">${data.likes}</span> likes</span>
        <button class="like-button">♥</button>
      </div>
    `
    const likeBtn = imageBox.querySelector('.like-button')
    const spanCount = imageBox.querySelector('.likes-count')
    likeBtn.addEventListener('click', (event) => {
      spanCount.innerText = parseInt(spanCount.innerText) + 1
      const commentObj = { 
        "id": 1,
        "title": "Woofing those bugs away",
        "likes": spanCount.innerText,
      }
      updateLikeComment(commentObj, data.id)
    })
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
    // Clear input value
    event.target[0].value = ""
  })
}

app()