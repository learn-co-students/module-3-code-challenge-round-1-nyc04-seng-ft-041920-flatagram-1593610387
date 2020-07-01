fetch("http://localhost:3000/images")
    .then(response => response.json())
    .then(images => renderAllImages(images)); //console.log(data)

function renderImage(data) {
  //console.log("Audio file ready at URL: " + data);
}

function renderAllImages(images) {
  images.forEach(image => renderAllImages(image))
}

async function postData(url = "http://localhost:3000/images", data = {}) {
  const response = await fetch("http://localhost:3000/images", {
    method: 'GET',
    method: 'POST',
    method: 'PUT',
    method: 'DELETE'
  });
}

body: JSON.stringify

const formData = new FormData();
const photos = document.querySelector(input[type='file'][multiple]);

fetch("http://localhost:3000/images", {
  method: 'POST',
  body: formData,
})
.then(response = response.json())