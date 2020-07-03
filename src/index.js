// Images
const imgContainer = document.querySelector(".image-container");
const imgDiv = document.querySelector(".image-card");
const imgTitle = document.querySelector(".title");
const img = document.querySelector(".image");
// Likes
const likesDiv = document.querySelector(".likes-section");
const likesSpan = document.querySelector('.likes');
const likeButton = document.querySelector("button.like-button");
// Comments
const ulComments = document.querySelector(".comments");
const postComment = document.querySelector(".comment-form");
const commentInput = document.querySelector(".comment-input")


// Displays the page data
fetch(`http://localhost:3000/images/1`)
    .then(resp => resp.json())
    .then(json => populatePageData(json));

// Displays Comments
function grabComments(comment){
    // I wish we could just make our own web page lol
    while (ulComments.firstChild) {
        ulComments.removeChild(ulComments.firstChild);
    }

    // Displays the comments
    populateMultipleComments(comment)
}

// Creates a single Comment
function populateSingleComment(comment){
    let newLi = document.createElement("li");
    newLi.innerText = comment;

    ulComments.appendChild(newLi);
}

// Displays Multiple comments
function populateMultipleComments(comments){
    comments.forEach(x => {
        populateSingleComment(x.content)
    });
}

// Populates page logic
function populatePageData(x){
    // Shows Image Div
    imgTitle.textContent = x.title;
    img.src = x.image;

    // Shows Likes
    likesSpan.innerText = `${x.likes} likes`;

    // Displays Comments
    grabComments(x.comments)

    // Increases Likes
    increasesLikes()
}

function increasesLikes(){
    likeButton.addEventListener('click', () => {
        let likeInc = parseInt(likesSpan.innerText) + 1
        likesSpan.innerText = `${likeInc} likes`
    
        fetch('http://localhost:3000/images/1', { 
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({"likes": likeInc})
        }
        )
        .then(resp => resp.json())
        .then(console.log)
    })
}

// Adds Comments
// postComment.addEventListener("submit", (e) => {
//     e.preventDefault()
//     // console.log(commentInput.value)
//     populateSingleComment(commentInput.value)
//     fetch('http://localhost:3000/comments', { 
//         method: 'POST',
//         headers: {
//             "Content-Type": 'application/json'
//         },
//         body: JSON.stringify({"likes": likeInc})
//     }
//     )
//     .then(resp => resp.json())
//     .then(console.log)
// });