// write your code here

const imgContainer = document.querySelector(".image-container");
const imgDiv = document.querySelector(".image-card");
const likesDiv = document.querySelector(".likes-section");
const ulComments = document.querySelector(".comments");
const postComment = document.querySelector(".comment-form");
const likeButton = document.querySelector("button.like-button");

// Displays the page data
function populatePage(){
    fetch(`http://localhost:3000/images`)
    .then(resp => resp.json())
    .then(json => populatePageData(json[0]));
}

// Displays Comments
function grabComments(){
    // I wish we could just make our own web page lol
    while (ulComments.firstChild) {
        ulComments.removeChild(ulComments.firstChild);
    }
    // Grabs comments API
    fetch(`http://localhost:3000/comments`)
    .then(resp => resp.json())
    .then(json => populateMultipleComments(json));
}

// Creates a single Comment
function populateSingleComment(comment){
    let newLi = document.createElement("li");
    newLi.innerText = comment.content;

    ulComments.appendChild(newLi);
}

// Displays Multiple comments
function populateMultipleComments(comments){
    comments.forEach(populateSingleComment);
}

// Populates page logic
function populatePageData(x){

    // Shows Image Div
    imgDiv.innerHTML =
    `
    <h2 class="title">${x.title}</h2>
    <img src="${x.image}" class="image" />
    `

    // Shows Likes Div
    likesDiv.innerHTML =
    `
    <span class="likes">${x.likes} likes</span>
    <button class="like-button">♥</button>
    `

    postComment.innerHTML=
    `
    <input
        class="comment-input"
        type="text"
        name="comment"
        placeholder="Add a comment..."
    />

    <button class="comment-button" type="submit">Post</button>
    `   

    // Creates the final Image Div
    imgDiv.appendChild(likesDiv);
    imgDiv.appendChild(ulComments);
    imgDiv.appendChild(postComment);

    // Appennds Final Div to main container
    imgContainer.appendChild(imgDiv);

    // Displays Comments
    grabComments()
    //Updates Likes
    updateLikes()

}

// Updates like by hitting like button
function updateLikes(){
    console.log(likeButton)
    likeButton.addEventListener("click", e => {

        const likesObj = {
            "likes": e.target.likes.value
        }

        console.log(likesObj)
    
        fetch(`http://localhost:3000/images/1`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(likesObj)
        })
    })
    .then(resp => resp.json())
    .then(json => json.likes++);;


}


populatePage()