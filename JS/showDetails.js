function showDetails(rowId) {
    if (rowId === 11) {  // Verificar si la fila es la fila 11
        const modal = document.getElementById('dataModal');
        const closeModal = document.getElementById('closeModal');
        const volverListado = document.getElementById('volverListado');

        // Mostrar el modal
        modal.style.display = 'block';

        // Cerrar el modal cuando se haga clic en el botón de cerrar
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            volverListado.style.display = 'none';
        });

        volverListado.addEventListener('click', () => {
            modal.style.display = 'none';

        });

        // Cerrar el modal si se hace clic fuera de la ventana del modal
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}
