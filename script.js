let index = 0;

const slides = document.getElementById("slides");
const bar = document.getElementById("bar");
const total = document.querySelectorAll(".slide").length;

function updateCarousel() {
  slides.style.transform = `translateX(-${index * 100}%)`;

  // barra progresso
bar.style.transform = `translateX(${index * 100}%)`;}

function nextSlide() {
  index = (index + 1) % total;
  updateCarousel();
}

function prevSlide() {
  index = (index - 1 + total) % total;
  updateCarousel();
}