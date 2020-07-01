// write your code here
//DOM elements
const imgContainer = document.querySelector(".image-container")
const comments = document.querySelector(".comment-input")

//Event Listeners



//Render Helpers

// function  renderComments(commObj) {
//    let comments = document.querySelector(".comments")
//          comments.innerHTML = `
//          <ul class="comments">
//          <li>${comments.content}</li>
//          <li>${comments.content}</li>
//          <li>${comments.content}</li>
//          </ul>
//          `
//          console.log ("comments render fu")

//          }
 

function renderImg(imgObj) {
   // grab created card
   
   const imgCard = document.querySelector(".image-card")
   
      imgCard.innerHTML = `
      <h2 class="title">${imgObj.title}</h2>
      <img src="${imgObj.image}" class="image" />
      <div class="likes-section">
         <span class="likes">${imgObj.likes} likes</span>
         <button class="like-button">♥</button>
      </div>
      <ul class="comments">
      <li>${comments.content}</li>
      <li>${comments.content}</li>
      <li>${comments.content}</li>
      </ul>
      `
      }

// function  renderComments(commObj) 
//    let comments = document.querySelector(".comments")
//          comments.innerHTML = `
//          <ul class="comments">
//                   <li>${comments.content}</li>
//                   <li>${comments.content}</li>
//                   <li>${comments.content}</li>
//                </ul>
//          `
//          }
 
//Initialize
fetch("http://localhost:3000/images/1")
   .then(r => r.json())
   .then ( imgObj => {
    renderImg(imgObj)
    
   })
// fetch("http://localhost:3000/comments")
// .then(r => r.json())
// .then (comments => {
//    comments.forEach(commObj => {
//    renderComments(commObj)
// })
// fetch("http://localhost:3000/images/1")
//    .then(r => r.json())
//    .then ( imgObj => {
//     renderImg(imgObj)
    
//    })
  
//})

   // fetch("http://localhost:3000/comments")
   // .then(r => r.json())
   // .then (comments => {
   //    comments.forEach(commObj => {
   //    renderComments(commObj)
   // })
// })