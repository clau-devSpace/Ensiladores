

document.addEventListener("DOMContentLoaded", function() {
    const animateItems = document.querySelectorAll('.animate-item');

    const options = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationClass = entry.target.getAttribute('data-animation');
                
                if (entry.target.classList.contains('sequential-animate')) {
                    const index = Array.prototype.indexOf.call(animateItems, entry.target);
                    setTimeout(() => {
                        entry.target.style.opacity = 1; 
                        entry.target.classList.add('animate__animated', animationClass); 
                    }, index * 300); 
                } else {
                    entry.target.style.opacity = 1; 
                    entry.target.classList.add('animate__animated', animationClass); 
                }

                observer.unobserve(entry.target); 
            }
        });
    }, options);

    animateItems.forEach(item => {
        observer.observe(item); 
    });
});


/*document.addEventListener('DOMContentLoaded', () => {
    const horizontalScrollSection = document.querySelector('.horizontal-scroll-section');
    const imageContainer = document.querySelector('.contenedor'); // Tu contenedor
    const scrollImages = document.querySelectorAll('.scroll-img'); // Tus imágenes

    // 1. Ajustar el ancho del contenedor de imágenes dinámicamente
    // Esto es crucial para que el efecto funcione con cualquier número de imágenes.
    imageContainer.style.width = `${scrollImages.length * 100}vw`;

    // 2. Opciones para el Intersection Observer
    const observerOptions = {
        root: null, // El viewport es el elemento raíz
        rootMargin: '0px',
        threshold: 0.5 // El callback se ejecuta cuando el 50% de la imagen es visible
    };

    // 3. Función que se ejecuta cuando un elemento (una imagen) entra o sale del viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentImage = entry.target;
                const imageIndex = Array.from(scrollImages).indexOf(currentImage); // Obtener el índice de la imagen

                // Remueve todas las clases show-img-X existentes del contenedor
                // Esto es importante para que solo una se active a la vez
                for (let i = 1; i <= scrollImages.length; i++) {
                    imageContainer.classList.remove(`show-img-${i}`);
                }

                // Añade la clase 'is-visible' a la imagen actual para su animación de aparición
                currentImage.classList.add('is-visible');

                // Añade la clase correspondiente para mover el contenedor horizontalmente
                // El índice es 0-basado, pero nuestras clases CSS son 1-basadas (show-img-1, show-img-2, etc.)
                imageContainer.classList.add(`show-img-${imageIndex + 1}`);

                // Opcional: Para que la animación de aparición de la imagen no se repita
                // observer.unobserve(currentImage);
            } else {
                // Opcional: Si quieres que las imágenes desaparezcan al salir del viewport
                // entry.target.classList.remove('is-visible');
            }
        });
    };

    // 4. Crea una nueva instancia de Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 5. Observa cada imagen individualmente
    scrollImages.forEach(img => {
        observer.observe(img);
    });
});*/

