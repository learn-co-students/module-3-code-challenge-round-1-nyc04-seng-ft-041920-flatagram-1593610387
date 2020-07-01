const h2Tag = document.querySelector(".title")
const imgTag = document.querySelector(".image")
const btnContainer = document.querySelector(".btnContainer")
const likes = document.querySelector(".likes")
// trust me on this
const card = document.querySelector(".image-container")
const commentsList = document.querySelector(".comments")
const form = document.querySelector(".comment-form")

fetch('http://localhost:3000/images')
.then(resp => resp.json())
.then(img => renderImage(img[0]))

fetch('http://localhost:3000/comments')
.then(resp => resp.json()).then(comments => renderComments(comments))

form.addEventListener('submit', e => {
  e.preventDefault();
  let input = e.target.comment.value;
  fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      imageId: 1,
      content: `${input}`
    })
  }).then(resp => resp.json()).then(comment => console.log(comment))

  comments(input)
  form.reset();
})

function renderImage(item) {
  card.dataset.id = item.id
  h2Tag.textContent = item.title
  imgTag.src = item.image
  likes.textContent = `${item.likes} likes`

  btnContainer.addEventListener('click', e => {
    if (e.target.id === 'like') {
      e.preventDefault();
      likes.textContent = `${item.likes + 1} likes`
      // get your patch going here
      fetch(`http://localhost:3000/images/${item.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({likes: item.likes + 1})
        }
      ).then(resp => resp.json()).then(updatedLikes => {
        item.likes = updatedLikes.likes
      })
    } else if (e.target.id === 'downvote') {
      likes.textContent = `${item.likes - 1} likes`
      fetch(`http://localhost:3000/images/${item.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({likes: item.likes - 1})
        }
      ).then(resp => resp.json()).then(updatedLikes => {
        item.likes = updatedLikes.likes
      })
    }
  })
  // the post to add new comments will come here??
}

function renderComments(item) {
  item.forEach(comment => {
    let content = comment.content
    comments(content)
  })
}

function comments(item) {
  let likeLi = document.createElement('li')
  likeLi.textContent = item
  commentsList.appendChild(likeLi)
}
