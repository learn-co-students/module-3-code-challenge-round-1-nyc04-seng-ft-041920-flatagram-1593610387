// write your code here
// const imageEle = document.querySelector(".image");

const imageContainer = document.querySelector(".image-container");

const commentsUl = imageContainer.querySelector(".comments");

const likes = imageContainer.querySelector(".likes");

fetch("http://localhost:3000/images/1")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    // console.log(json);
    const title = imageContainer.querySelector(".title");
    title.innerText = json.title;

    const image = imageContainer.querySelector(".image");
    image.setAttribute("src", json.image);

    likes.innerHTML = `<span>${json.likes}</span> likes`;

    commentsUl.innerHTML = "";
    json.comments.forEach(function (comment) {
      const commentLi = document.createElement("li");
      commentLi.innerText = comment.content;
      commentLi.innerHTML += "<button>delete</button>";

      commentsUl.append(commentLi);

      const deleteBtn = commentLi.querySelector("button");
      deleteBtn.addEventListener("click", function (event) {
        commentLi.remove();
      });
    });
  });

const likeButton = imageContainer.querySelector(".like-button");
likeButton.addEventListener("click", function (event) {
  const likeNumberSpan = likes.querySelector("span");
  //   console.log(typeof likeNumberSpan.innerText);

  const parsed = parseInt(likeNumberSpan.innerText);
  likeNumberSpan.innerText = parsed + 1;

  fetch("http://localhost:3000/images/1", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: parsed + 1,
    }),
  });
});

const commentForm = imageContainer.querySelector(".comment-form");
commentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  commentsUl.innerHTML += `<li>${event.target.comment.value} <button>delete</button></li>`;

  fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      imageId: 1,
      content: event.target.comment.value,
    }),
  });
});
