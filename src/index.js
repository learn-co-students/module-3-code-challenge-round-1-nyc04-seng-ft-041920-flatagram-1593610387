// // write your code here
// GET /images/1
// PATCH /images/1
// POST /comments
// DELETE /comments/:id
// Core Deliverables
// As a user, I can:

// fetch image 
// fetch title, 
// fetch likes 
// fetch comments

// fetch update heart likes

// Add a comment (no persistance needed)

let titleLoc = document.querySelector(".title")
let imageLoc = document.querySelector(".image")
let likeBtn = document.querySelector(".like-button")
let likeNum = document.querySelector(".likes")
//let inputComt = //target.value
let submitBtn = document.querySelector(".comment-button")


// fetch
// when X event
// then get Y
// then 

let imgUrl = "http://localhost:3000/images"
let cmtUrl = "http://localhost:3000/comments"



/**** TITLE ****/

function title(imgUrl){

    const data = { "title": "Woofing those bugs away"}

    const response = fetch(imgUrl, {
        method: 'POST',
        hearders: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
     console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
}
title(imgUrl)



/******LIKES *****/
//FETCH UPDATE
likeBtn.addEventListener("click", e => {
    console.log("clicked")
    let newNum = parseInt(likeNum.innerHTML) + 1
    console.log(newNum)
    likeNum.innerHTML = `${newNum} likes`
})



//FETCH CREATE
let imgFet = fetch(imgUrl +  "/assets/coder-dog.png")
    .then(resp => {
        resp = resp.json()
        console.log(resp)
    })
    .then(img => {
        outside = URL.createObjectURL(img)
        console.log(outside)
    })
    
console.log(imgFet)


//COMMENT SUBMIT FETCH GET 
submitBtn.addEventListener("submit", e => {
    console.log("!!!!!!!!!")
    e.preventDefault()
    console.log("submit clicked!")
})
