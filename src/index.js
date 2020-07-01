// write your code here
const imgUrl = 'http://localhost:3000/images'
const commentUrl = "http://localhost:3000/comments"

const imgContainer = document.querySelector('.image-container')
const card = document.querySelector('.image-card')

/**initial render */
getImgComment()

function getImgComment(){
  fetch(imgUrl)
    .then(r => r.json())
    .then(imgs => {
      console.log(imgs)
      imgs.forEach(img => {
        renderImg(img)
      });
    })
  
    fetch(commentUrl)
    .then(r => r.json())
    .then(comments => {
      console.log(comments)
      comments.forEach(comment => {
        renderComment(comment)
      });
    })
}
/*******************/

//Render Helpers
function renderImg(img){
  const title = card.querySelector('.title')
  const image = card.querySelector('img')
  const likes = card.querySelector('.likes')
  card.dataset.id = img.id
  title.textContent = img.title
  image.src = img.image
  likes.textContent = `${img.likes} likes`

  addLikeEvent(img)
}

function renderComment(comment){
  const commentUl = card.querySelector('.comments')
  const commentLi = document.createElement('li')
  commentLi.innerText = comment.content
  commentUl.append(commentLi)  
}

//passimistic update likes
function renderUpdatedLikes(img){
  const card = document.querySelector(`.image-card[data-id='${img.id}']`)
  const likes = card.querySelector('.likes')
  likes.textContent = `${img.likes} likes`
}

// API requets
function patchLikesReq(img){
  const url = `${imgUrl}/${img.id}`
  const configObj ={
    method : 'PATCH',
    headers : {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"likes": img.likes+1})
  }
  fetch(url,configObj)
    .then(r => r.json())
    .then(renderUpdatedLikes)
}

function updateComment(newCommentObj){
  const configObj ={
    method : 'POST',
    headers : {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCommentObj)
  }

  fetch(commentUrl,configObj)
    .then(r => r.json())
    .then(renderComment)
}

// Event Listeners

function addLikeEvent(img){
  const likeBtn = card.querySelector('.like-button')
  const likes = card.querySelector('.likes')
  likeBtn.addEventListener('click', e => {

    /**optimistic update likes */
    // let newlikes = parseInt(likes.innerText) + 1
    // likes.innerText = `${newlikes} likes`
    // img.likes = newlikes
    /**end****** */
    
    //fetch patch for image - likes update
    patchLikesReq(img)
  })
}

const commentForm = document.querySelector('.comment-form')
commentForm.addEventListener('submit', e => {
  e.preventDefault()
  let newCommentObj = {
    "imageId": e.target.closest('.image-card').dataset.id,
    "content": e.target.comment.value
  }
  // fetch POST fo comments
  updateComment(newCommentObj)
  commentForm.reset()
})


