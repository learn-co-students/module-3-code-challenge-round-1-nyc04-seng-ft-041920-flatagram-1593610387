// write your code here
// See the image received from the server, including its title, likes and comments when the page loads
// const newComment = document.createElementby('.comment-form');

const image = document.querySelector(`.image`)
const likeBtn = document.querySelector(`.like-button`)
// const commentData = document.querySelector(`.comments`)
const singleComment = document.createElementby("ul")

/* how to grab name?? */
/** maybe newComment = {
 * name = `name`} */


console.log(image)
console.log(likeBtn)
console.log(commentData)

/** how to grab 'ul' and than place newComment in <li> tags  */
newComment.addEventListener("submit", function(event) {
    event.preventDefault()
    console.log(event.target)
}),

/** how to put in li */
// Click on the heart icon to increase image likes, and still see them when I reload the page
// Add a comment (no persistance needed)
function renderOneComment(singleComment) {
    // singleComment.textContent('li')
    console.log(singleComment)
}


function renderImages(allComments) {
    allComments.forEach(oneComment)
}


fetch(`http://localhost:3000/comments`, {
method: "POST",
headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    "title": title,
    "comments" : comments, 
    "likes" : 0, /** or is this 0 - i think thats only during create*/ 
}),
// DOM 


    fetch(`http://localhost:3000/images/1`) 
    // method: "GET"
        .then(r => r.json())
        .then(renderImages(allComments))




fetch(`http://localhost:3000/images/1`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
    body: 
  {
    "likes": 


  /**  */



})
// initilize 