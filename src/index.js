// write your code here

const imgTitleTag = document.querySelector('.title')
const imgTag = document.querySelector('.image')
const likesSpan = document.querySelector('.likes')
const likeBtn  = document.querySelector('.like-button')
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
        const liTag = document.createElement('li')
        liTag.innerText = comment.content 
        commentsContainer.append(liTag)
    })
    //console.log(data.comments)
})


//likes handling  
likeBtn.addEventListener('click', () => {
    let likesNum = parseInt(likesSpan.innerText) + 1
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
})


//handle comment submission 
commentForm.addEventListener('submit', e => {
    e.preventDefault()
    const comment = commentForm.comment.value 
    commentsContainer.innerHTML += `
        <li>${comment}</li>
    `


    commentForm.reset()
})
