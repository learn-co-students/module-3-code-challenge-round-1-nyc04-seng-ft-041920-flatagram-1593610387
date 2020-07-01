// write your code here
const imageContainer = document.querySelector(".image-container");

fetch("http://localhost:3000/images/1")
  .then(function (response) {
    return response.json();
  })
  .then((json)=> {
    const title = imageContainer.querySelector(".title");
    title.innerText = json.title;

    const image = imageContainer.querySelector(".image");
    image.setAttribute("src", json.image);

    const likes = imageContainer.querySelector(".likes");
    likes.innerHTML = `<span>${json.likes}</span> likes`;

    const commentsUl = imageContainer.querySelector(".comments");
    commentsUl.innerHTML = "";
    comments.forEach(function (comment) {
      const commentLi = document.createElement("li");
      commentLi.innerText = comment.content;

      commentsUl.append(commentLi);
    });
  });

const likeButton = imageContainer.querySelector(".like-button");
likeButton.addEventListener("click", (e) =>{
  const likes = imageContainer.querySelector(".likes");
  const likeSpan = likes.querySelector("span");

  const parsed = parseInt(likeSpan.innerText);
  likeSpan.innerText = parsed +1;

  fetch("http://localhost:3000/images/1", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: parsed +1,
    }),
  });
});

const commentForm = imageContainer.querySelector(".comment-form");
commentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const commentsUl = imageContainer.querySelector(".comments");
  commentsUl.innerHTML += `${event.target.comment.value} <br>`;
});