// write your code here
// const imageEle = document.querySelector(".image");

const imageContainer = document.querySelector(".image-container");

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

    const likes = imageContainer.querySelector(".likes");
    likes.innerHTML = `<span>${json.likes}</span> likes`;

    const commentsUl = imageContainer.querySelector(".comments");
    commentsUl.innerHTML = "";
    json.comments.forEach(function (comment) {
      const commentLi = document.createElement("li");
      commentLi.innerText = comment.content;

      commentsUl.append(commentLi);
    });
  });

const likeButton = imageContainer.querySelector(".like-button");
likeButton.addEventListener("click", function (event) {
  const likes = imageContainer.querySelector(".likes");
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

  const commentsUl = imageContainer.querySelector(".comments");
  commentsUl.innerHTML += `<li>${event.target.comment.value} </li>`;

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
