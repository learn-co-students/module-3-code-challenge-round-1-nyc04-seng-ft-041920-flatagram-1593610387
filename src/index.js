// write your code here
document.addEventListener("DOMContentLoaded", (event) => {
    fetchImage();
    fetchComments();
})

function fetchImage() {
   fetch('http://localhost:3000/images/1')
    .then(resp => resp.json())
    .then(data => renderImage(data)) 
} 


function renderImage(image) {
    let card = document.querySelector('.image-card')
    // let h2Title = document.querySelector('.title')
    // let pic = document.querySelector('img')
    // images.forEach(image => {
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
            
            const likeObj = {
                likes: image.likes
            }

           console.log(likeObj)

            fetch('http://localhost:3000/images/1', {
            method: "PATCH", 
            // use patch to update an existing object
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(likeObj),
                
            })
            
            
            })

            let commentForm = document.querySelector('.comment-form')
            commentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log(commentForm.comment.value)
            let cList = document.querySelector('.comments')
            let newLi = document.createElement('li')
             newLi.innerText = commentForm.comment.value
            

            const cObj = {
                imageId: image.id,
                content: commentForm.comment.value
            }

            fetch('http://localhost:3000/comments', {
            method: "POST", 
            // use post to add a new object
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(cObj),
                
            })
            .then(response => response.json())
            .then(cObj => {
             renderComment(cObj);
            })
            
            


            })
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



function renderComment(comment) {
    let commentsUl = document.querySelector('.comments')
    let commentLi = document.createElement('li')
        commentLi.innerText = comment.content

        commentsUl.appendChild(commentLi)
}

