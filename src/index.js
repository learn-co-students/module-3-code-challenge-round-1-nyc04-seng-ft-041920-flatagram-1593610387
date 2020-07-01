// write your code here

const imgTitleTag = document.querySelector('.title')
const imgTag = document.querySelector('.image')
const likesSpan = document.querySelector('.likes')
const likeBtn  = document.querySelector('.like-button')
const disLikeBtn  = document.querySelector('.dislike-button')
const commentsContainer = document.querySelector('.comments')
const commentForm = document.querySelector('.comment-form')



//initial fetch 
fetch('http://localhost:3000/images/1')
.then(resp => resp.json())
.then(data => {
    imgTitleTag.innerText = data.title 
    imgTag.src = data.image 
    likesSpan.innerText = `${data.likes} likes`
    data.comments.forEach(comment => {
        // const liTag = document.createElement('li')
        // liTag.innerText = comment.content 
        // commentsContainer.append(liTag)
        displayComment(comment)
    })
    //adding item id to comment form 
    commentForm.dataset.id = data.id 
})



likeBtn.addEventListener('click', () => {
    likesHandler(1)
})



disLikeBtn.addEventListener('click', () => {
    likesHandler(-1)
})


//likes handling  
function likesHandler(num){

    let likesNum = parseInt(likesSpan.innerText) + num
        likesSpan.innerText = `${likesNum} likes`
    
        const config = {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({"likes": likesNum})
        }

        fetch('http://localhost:3000/images/1', config)
        .then(resp => resp.json())
        .then(console.log)
}

  



//handle comment submission 
commentForm.addEventListener('submit', e => {
    e.preventDefault()
    const comment = commentForm.comment.value 
    //persist comments 
    const imageId = parseInt(commentForm.dataset.id)
    
    const content = {
        "imageId": imageId,
        "content": comment
      }

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }

    fetch('http://localhost:3000/comments', config)
    .then(resp => resp.json())
    .then(commentObj => {
        displayComment(commentObj) 
    })

    commentForm.reset()
})



//helper method to display comment 

function displayComment(commentObj){
    const liTag = document.createElement('li')
    liTag.innerText = commentObj.content
    liTag.dataset.id = commentObj.id 
    commentsContainer.append(liTag)

    liTag.addEventListener('click', e => {
        
        fetch(`http://localhost:3000/comments/${e.target.dataset.id}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(commentObj => {
            liTag.remove()
        })
     })
}