// write your code here
const imageCard = document.querySelector(".image-card")
const imageTitle = document.querySelector(".title")
const imageSource = document.querySelector(".image")
const imageLikes = document.querySelector(".likes")
const heartButton = document.querySelector(".like-button")
const commentForm = document.querySelector(".comment-form")
const commentList = document.querySelector(".comments")
const likesSection = document.querySelector(".likes-section")

fetch(`http://localhost:3000/images`)
    .then(response => response.json())
    .then(imagesInfo => {
        renderAllImages(imagesInfo)
    })

function renderOneImage(element){
    fetch(`http://localhost:3000/images/${element.id}`)
    .then(response => response.json())
    .then(singleImageObject => {
    imageTitle.innerText = singleImageObject.title
    imageSource.src = singleImageObject.image
    imageLikes.innerText = `${singleImageObject.likes} likes`
})
    heartButton.addEventListener("click", () => {
        element.likes++
        imageLikes.innerText = `${element.likes} likes`

        fetch (`http://localhost:3000/images/${element.id}`, {
            method: 'PATCH', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                likes: element.likes
            }),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        
    })

    downVote.addEventListener("click", () => {
        element.likes--
        imageLikes.innerText = `${element.likes} likes`

        fetch (`http://localhost:3000/images/${element.id}`, {
            method: 'PATCH', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                likes: element.likes
            }),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        
    })

    commentForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const newComment = document.createElement("li")
        newComment.innerText = event.target.comment.value
        fetch(`http://localhost:3000/comments`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imageId: 1,
                content: newComment.innerText
            }),
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        commentList.append(newComment)
        commentForm.reset()

    })
}

function renderAllImages(imagesInfo){
    imagesInfo.forEach(element => {
        renderOneImage(element)
    })   
}

fetch(`http://localhost:3000/comments`)
    .then(response => response.json())
    .then(commentsInfo => {
        commentsInfo.forEach(element => {
            renderOneComment (element)
        })
    })

function renderOneComment (element){
    const comment = document.createElement("li")
    comment.innerText = element.content
    commentList.append(comment)

}
//Advanced Deliverables
const downVote = document.createElement("button")
likesSection.append(downVote)
downVote.classList = "dislike-button"
downVote.innerText = "dislike"