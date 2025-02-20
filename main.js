function toggleMenu() {
    const menu = document.getElementById('menu');
    // Cambia la transformación del contenedor del menú
    if (menu.style.transform === 'translateX(0%)') {
        menu.style.transform = 'translateX(100%)'; // Ocultar menú
    } else {
        menu.style.transform = 'translateX(0%)'; // Mostrar menú
    }
}

let currentIndex = 0;
const imagesContainer = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-item');
const totalImages = images.length;  // Total de imágenes (10 en este caso)

// Botones de navegación
const leftButton = document.getElementById('left-btn');
const rightButton = document.getElementById('right-btn');

// Función para mover el carrusel hacia la izquierda
function moveLeft() {
    if (currentIndex > 0) {
        currentIndex--;  // Mover una imagen a la vez
    }
    updateCarouselPosition();
    updateButtonState();
}

// Función para mover el carrusel hacia la derecha
function moveRight() {
    // Asegurarse de no mover más allá de la última imagen
    if (currentIndex < totalImages - 1) {
        currentIndex++;  // Mover una imagen a la vez
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
let imagesPerSlide = 5;  // Establecer el número de imágenes visibles por defecto

function updateImagesPerSlide() {
    const screenWidth = window.innerWidth;

    // Ajustamos el número de imágenes visibles según el tamaño de la pantalla
    if (screenWidth <= 480) {
        imagesPerSlide = Math.floor(screenWidth / (190 + 8)); // Se ajusta al ancho de la pantalla
    } else if (screenWidth <= 768) {
        imagesPerSlide = Math.floor(screenWidth / (190 + 8)); // Se ajusta al ancho de la pantalla
    } else {
        imagesPerSlide = Math.floor(screenWidth / (190 + 8)); // Se ajusta al ancho de la pantalla
    }

    currentIndex = 0;  // Resetear el índice al principio del carrusel cuando cambie el tamaño de la pantalla
    updateCarouselPosition();  // Actualiza la posición del carrusel según el número de imágenes por slide
}

// Función para actualizar el estado de los botones (habilitar/deshabilitar)
function updateButtonState() {
    // Deshabilitar el botón izquierdo si estamos en la primera imagen
    if (currentIndex === 0) {
        leftButton.disabled = true;
    } else {
        leftButton.disabled = false;
    }

    // Deshabilitar el botón derecho si estamos en la última imagen
    if (currentIndex === totalImages - 1) {
        rightButton.disabled = true;
    } else {
        rightButton.disabled = false;
    }
}

// Asignar eventos a los botones
leftButton.addEventListener('click', moveLeft);
rightButton.addEventListener('click', moveRight);

// Llamamos a la función para que ajuste el número de imágenes por slide cuando la página cargue
updateImagesPerSlide();

// Ajustar el número de imágenes visibles cada vez que se redimensione la ventana
window.addEventListener('resize', updateImagesPerSlide);

// Inicializar el estado de los botones al cargar
updateButtonState();


