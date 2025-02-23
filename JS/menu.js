// menu.js
function cargarMenu() {
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el menú:', error));
}

// Llamar a la función para cargar el menú al cargar la página
cargarMenu();