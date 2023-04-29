var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slideshow")[0].getElementsByTagName("img");
    var prevBtn = document.getElementsByClassName("prev")[0];
    var nextBtn = document.getElementsByClassName("next")[0];
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
    }
    slides[slideIndex-1].style.opacity = "1";
    prevBtn.onclick = function() {
        plusSlides(-1);
    }
    nextBtn.onclick = function() {
        plusSlides(1);
    }
}