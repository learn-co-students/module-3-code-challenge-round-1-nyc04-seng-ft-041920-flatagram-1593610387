const h2Tag = document.querySelector(".title")
const imgTag = document.querySelector(".image")
const likesSection = document.querySelector(".likes-section")
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
  let likeLi = document.createElement('li')
  likeLi.textContent = input
  commentsList.appendChild(likeLi)
  form.reset();
})

function renderImage(item) {
  card.dataset.id = item.id
  h2Tag.textContent = item.title
  imgTag.src = item.image
  likes.textContent = `${item.likes} likes`

  likesSection.addEventListener('click', e => {

    likes.textContent = `${item.likes + 1} likes`
    if (e.target.className === 'like-button')
      e.preventDefault();{
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
    }
  })
  // the post to add new comments will come here??
}

function renderComments(item) {
  item.forEach(comment => {
    comments(comment)
  })
}

function comments(item, ) {
  // bout the least dryest thing im about to do
  // welp SOS
  let likeLi = document.createElement('li')
  likeLi.textContent = item.content
  commentsList.appendChild(likeLi)
}

// so having to grab the index here VS iterating over each item with forEach

// on refactor: can have a render many, then another function to iterate over to render a single one -- this is an ugly brute force solution but it's the most time friendly bc IT'S JUST ONE DOGGO... WHY CAN'T WE ADD OUR OWN?????

// like you would have a function here normally to render multiple, but you just have one image here

// PROBLEM HERE: IT KEEPS REFRESHING on like, SO WHAT DO???
// does it keep refreshing cause it's in the function to render it from the fetch
// nope need to ask why it keeps refreshing :(
// if i take it out of this function, i'll get to use the dataset to find the exact element it's doing this for
