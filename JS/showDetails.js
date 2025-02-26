const openModal = document.querySelector('.hero__cta');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');
const volverListado = document.querySelector('.volver-listado');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
});

volverListado.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modal--show');
});

