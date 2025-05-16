
function toggleMenu() {
  const menu = document.getElementById('menu');
  const titulo = document.getElementById('titulo');
  const main = document.getElementById('main');
  const footer = document.getElementById('footer');
  menu.classList.toggle('activo'); // Alterna la clase 'active'
  
  // Cambia el display directamente
  if (menu.classList.contains('activo')) {
      menu.style.display = 'flex'; // Muestra el menú
      titulo.classList.add('opacidad');
      main.classList.add('opacidad');
      footer.classList.add('opacidad');
      
  } else {
      menu.style.display = 'none'; // Oculta el menú
      titulo.classList.remove('opacidad');
      main.classList.remove('opacidad');
      footer.classList.remove('opacidad');
  }
}


const icono = document.getElementById('menu-2');

icono.addEventListener('click', function() {
    icono.classList.toggle('active');
});
