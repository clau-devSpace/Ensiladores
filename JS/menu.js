function toggleMenu() {
  const menu = document.getElementById("menu");
  // Cambia la transformación del contenedor del menú
  if (menu.style.transform === "translateX(0%)") {
    menu.style.transform = "translateX(100%)"; // Ocultar menú
  } else {
    menu.style.transform = "translateX(0%)"; // Mostrar menú
  }
}


