
function toggleMenu() { 
  const menu = document.getElementById('menu');
  const titulo = document.getElementById('titulo');
  const main = document.getElementById('main');
  const footer = document.getElementById('footer');
  const close = document.getElementById('close-menu');
  const open = document.getElementById('menu-2');
  const nosotrosLink = document.getElementById('nosotros');
  const areasLink = document.getElementById('areas');
  const items2 = document.getElementById('items2');
  const items3 = document.getElementById('items3');

  const encabezado = document.getElementById('encabezado');
  const tablaContainer = document.getElementById('tabla-container');

  const containerItems2 = items2.parentNode;
  const containerItems3 = items3.parentNode;

  const shouldApplyOpacity = !document.body.classList.contains('no-opacity-page');

  function mostrarLista(listaMostrar, listaOcultar, linkActivo, linkInactivo) {
    const containerMostrar = listaMostrar.parentNode;
    const containerOcultar = listaOcultar.parentNode;

    containerMostrar.style.display = 'block';
    containerOcultar.style.display = 'none';

    listaMostrar.style.display = 'block';
    listaMostrar.style.textAlign = 'left';

    linkActivo.style.fontWeight = 'bold';
    linkInactivo.style.fontWeight = '100';
  }

  nosotrosLink.addEventListener('click', function(event) {
    event.preventDefault();
    mostrarLista(items2, items3, nosotrosLink, areasLink);
  });

  areasLink.addEventListener('click', function(event) {
    event.preventDefault();
    mostrarLista(items3, items2, areasLink, nosotrosLink);
  });

  menu.classList.toggle('activo');
  close.classList.toggle('activo');

  if (menu.classList.contains('activo')) {
    menu.style.display = 'flex';
    open.style.display = 'none';
    close.style.display = 'block';

    mostrarLista(items2, items3, nosotrosLink, areasLink);

    menu.classList.remove('animate__slideOutRight');
    menu.classList.add('animate__slideInRight');

    if (shouldApplyOpacity) {
      setTimeout(() => {
        titulo.classList.add('opacidad');
        main.classList.add('opacidad');
        footer.classList.add('opacidad');
        if (encabezado) encabezado.classList.add('opacidad');
        if (tablaContainer) tablaContainer.classList.add('opacidad');
      }, 1000);
    }

  } else {
    menu.classList.remove('animate__slideInRight');
    menu.classList.add('animate__slideOutRight');

    if (shouldApplyOpacity) {
      titulo.classList.remove('opacidad');
      main.classList.remove('opacidad');
      footer.classList.remove('opacidad');
      if (encabezado) encabezado.classList.remove('opacidad');
      if (tablaContainer) tablaContainer.classList.remove('opacidad');
    }

    setTimeout(() => {
      menu.style.display = 'none';
      close.style.display = 'none';
      open.style.display = 'block'; 
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const nosotrosLink = document.getElementById('nosotros');
  const areasLink = document.getElementById('areas');
  const items2 = document.getElementById('items2');
  const items3 = document.getElementById('items3');
  const menu = document.getElementById('menu');

  const containerItems2 = items2.parentNode;
  const containerItems3 = items3.parentNode;

  if (getComputedStyle(menu).display === 'flex') {
    containerItems2.style.display = 'block';
    containerItems2.style.textAlign = 'left';

    containerItems3.style.display = 'none';

    items2.style.display = 'block';
    items2.style.textAlign = 'left';

    nosotrosLink.style.fontWeight = 'bold';
    areasLink.style.fontWeight = '100';
  } else {
    containerItems2.style.display = 'none';
    containerItems3.style.display = 'none';

    nosotrosLink.style.fontWeight = 'normal';
    areasLink.style.fontWeight = 'normal';
  }
});