function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active'); // Alterna la clase 'active'
  
  // Cambia el display directamente
  if (menu.classList.contains('active')) {
      menu.style.display = 'block'; // Muestra el menú
  } else {
      menu.style.display = 'none'; // Oculta el menú
  }
}

