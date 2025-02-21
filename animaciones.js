document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.box');

    function checkVisibility() {
        boxes.forEach(box => {
            const boxPosition = box.getBoundingClientRect();
            if (boxPosition.top < window.innerHeight && boxPosition.bottom >= 0) {
                box.classList.add('visible');
            }
        });
    }

    document.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Verifica la visibilidad al cargar la página
});
