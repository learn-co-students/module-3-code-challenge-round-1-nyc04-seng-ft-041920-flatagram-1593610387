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
                //tried inserting id from each instance of data but couldn't figure it out. Rest of code
                // what I would do if this all worked.
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
                        headers: {
                            'Content-Type': 'application/json'
                        }, 
                        body: JSON.stringify({
                            comment: commentInput
                        })
                            .then(response => response.json())
                            .then(commentInput => {

                            })

                
                    })
                    commentButton.addEventListnener("click", (event) => {
                         const comments
                        /*
                            clear ul element of content, foreach each comment POST (add each new one with
                                += when assigning innerHTML with appropriate string interpolation) invoke 
                                this function on line 42 to render each submitted comment to the frontend
                        */       
                    })
                })
            })
        }
    
})