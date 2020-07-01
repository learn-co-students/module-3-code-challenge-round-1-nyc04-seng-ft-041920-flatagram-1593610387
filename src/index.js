// write your code here
document.addEventListener("DOMContentLoaded", (event) => {
    fetchImage();
    fetchComments()
})

function fetchImage() {
   fetch('http://localhost:3000/images')
    .then(resp => resp.json())
    .then(data => renderImage(data)) 
} 


function renderImage(images) {
    let card = document.querySelector('.image-card')
    // let h2Title = document.querySelector('.title')
    // let pic = document.querySelector('img')
    images.forEach(image => {
        card.innerHTML = `
        <h2>${image.title}</h2>
        <img src="${image.image}" class="image" />
        <div class="likes-section">
          <span class="likes">${image.likes} likes</span>
          <button class="like-button">♥</button>
          
        </div>
        <ul class="comments">
          
        </ul>
        <form class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <button class="comment-button" type="submit">Post</button>
        </form>
        `

        
        let likeButton = document.querySelector('.like-button')
        likeButton.addEventListener("click", (event) => {
            event.preventDefault();
            let likesDiv = document.querySelector('.likes-section')

            let likesSpan = document.querySelector('span')
            image.likes = image.likes + 1
            likesSpan.innerText = `${image.likes} likes`
            
            // likesDiv.appendChild(likesSpan)
            // not working like I would hope
            
            
            // fetch('http://localhost:3000/images')
            // method post
            // Know I want to use something like this not sure how to find it

        })
    });
}



function fetchComments() {
    fetch('http://localhost:3000/comments')
     .then(resp => resp.json())
     .then(data => renderComments(data)) 
 } 
 
 
 function renderComments(comments) {
     let commentsUl = document.querySelector('.comments')
     // let h2Title = document.querySelector('.title')
     // let pic = document.querySelector('img')
     console.log(commentsUl)
     comments.forEach(comment => {
        let commentLi = document.createElement('li')
        commentLi.innerText = comment.content

        commentsUl.appendChild(commentLi)
     });
 }



