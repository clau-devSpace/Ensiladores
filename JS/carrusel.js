//Carrusel
let currentIndex = 0;
const imagesContainer = document.querySelector(".carousel-images");
const images = document.querySelectorAll(".carousel-item");
const totalImages = images.length; // Total de imágenes (10 en este caso)// Botones de navegación
const leftButton = document.getElementById("left-btn");
const rightButton = document.getElementById("right-btn");

// Función para mover el carrusel hacia la izquierda
function moveLeft() {
  if (currentIndex > 0) {
    currentIndex--; // Mover una imagen a la vez
  }
  updateCarouselPosition();
  updateButtonState();
}

// Función para mover el carrusel hacia la derecha
function moveRight() {
  // Asegurarse de no mover más allá de la última imagen
  if (currentIndex < totalImages - 1) {
    currentIndex++; // Mover una imagen a la vez
  }
  updateCarouselPosition();
  updateButtonState();
}

// Función para actualizar la posición del carrusel
function updateCarouselPosition() {
  const offset = -currentIndex * (190 + 8); // Desplazamiento calculado en función del ancho de cada imagen más el margen
  imagesContainer.style.transform = `translateX(${offset}px)`;
}

// Ajustar el número de imágenes visibles según el tamaño de la pantalla
let imagesPerSlide = 5;

function updateImagesPerSlide() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 480) {
    imagesPerSlide = Math.floor(screenWidth / (190 + 8));
  } else if (screenWidth <= 768) {
    imagesPerSlide = Math.floor(screenWidth / (190 + 8));
    imagesPerSlide = Math.floor(screenWidth / (190 + 8));
  }

  currentIndex = 0; // Resetear el índice al principio del carrusel cuando cambie el tamaño de la pantalla
  updateCarouselPosition(); // Actualiza la posición del carrusel según el número de imágenes por slide
}

// Función para actualizar el estado de los botones (habilitar/deshabilitar)
function updateButtonState() {
  if (currentIndex === 0) {
    leftButton.disabled = true;
  } else {
    leftButton.disabled = false;
  }

  if (currentIndex === totalImages - 1) {
    rightButton.disabled = true;
  } else {
    rightButton.disabled = false;
  }
}

leftButton.addEventListener("click", moveLeft);
rightButton.addEventListener("click", moveRight);

updateImagesPerSlide();

window.addEventListener("resize", updateImagesPerSlide);

updateButtonState();
