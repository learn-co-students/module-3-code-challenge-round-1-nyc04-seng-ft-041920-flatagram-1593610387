// write your code here
window.addEventListener("load", (event) =>{
    //console.log("works!")
    fetch(`http://localhost:3000/images`)
        .then(response => response.json())
        .then((posts) => {
            //console.log(posts)
            fetchEachPost(posts)
        })
    
        function fetchEachPost(posting) {
                
            posting.forEach((post) => {
                console.log(post)
                const imageElement = document.querySelector(".image");
                imageElement = imageElement.setAttribute("src", `${post.image}`);
                const containerElement = document.querySelector(".imageContainer");
                const containerElementAttr = containerElement.setAttribute("data-id", `${post.id}`)
                containerElement.append(containerElementAttr)
                const postTitle = document.querySelector('.title');
                
                //postTitleID = setAttribute("value", `${post.id}`);
                //postTitle.postTitleID
                postTitle = postTitle.innerText = `${post.title}`;
                const likesSpan = document.querySelector(".likes")
                likesSpan = likesSpan.innerText =`${post.likes}`

                const commentButton = document.querySelector(".comment-button")
                commentButton.addEventListener("submit", (event) => {
                    event.preventDefault();
                    const commentInput = event.target.comment.value
                    fetch("http://localhost:3000/comments", {
                        method: 'POST',
                        
                    })
                })
            })
        }
    
})