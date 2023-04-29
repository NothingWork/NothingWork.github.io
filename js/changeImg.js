var images = [
    "濒危.png",
    "河南大暴雨.png",
    "地中海沿岸山火.png"
];

var currentImageIndex = 0;
var imageContainer = document.getElementById("image-container");

imageContainer.addEventListener("click", function () {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    var currentImageURL = images[currentImageIndex];
    var imageElement = document.querySelector("#image-container img");
    imageElement.src ='image/'+ currentImageURL;
    console.log(imageElement.src)
});