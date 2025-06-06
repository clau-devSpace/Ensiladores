/*

let isDesktopMenuActive = false;
let isMobileMenuActive = false;

function toggleMenu() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth > 768) {
        toggleDesktopMenu();
    } else {
        toggleMobileMenu();
    }
}

function toggleDesktopMenu() {
    const menu = document.getElementById('desktop-menu');
    const closeBtn = document.getElementById('close-menu');
    const openBtn = document.getElementById('menu-btn');
    const nosotrosLink = document.getElementById('nosotros');
    const areasLink = document.getElementById('areas');
    const items2 = document.getElementById('items2');
    const items3 = document.getElementById('items3');

    isDesktopMenuActive = !isDesktopMenuActive;

    if (isDesktopMenuActive) {
        menu.style.display = 'flex';
        menu.classList.add('activo');
        openBtn.style.display = 'none';
        closeBtn.style.display = 'block';

        // Mostrar por defecto la sección "Nosotros" después de un pequeño delay
        setTimeout(() => {
            showDesktopList(items2, items3, nosotrosLink, areasLink);
        }, 100);

        menu.classList.remove('animate__slideOutRight');
        menu.classList.add('animate__slideInRight');
    } else {
        menu.classList.remove('animate__slideInRight');
        menu.classList.add('animate__slideOutRight');

        // Ocultar subcategorías al cerrar
        hideAllSubcategories();

        setTimeout(() => {
            menu.style.display = 'none';
            menu.classList.remove('activo');
            closeBtn.style.display = 'none';
            openBtn.style.display = 'block';
        }, 1000);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const hamburger = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');

    isMobileMenuActive = !isMobileMenuActive;

    if (isMobileMenuActive) {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        hamburger.style.display = 'none';
        closeBtn.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.style.display = 'block';
        closeBtn.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Cerrar todos los submenús móviles
        closeMobileSubmenus();
    }
}

function showDesktopList(listaMostrar, listaOcultar, linkActivo, linkInactivo) {
    // Ocultar todas las subcategorías primero
    hideAllSubcategories();
    
    // Mostrar la subcategoría seleccionada
    listaMostrar.classList.add('show');
    listaMostrar.style.display = 'block';
    
    // Actualizar estilos de los enlaces
    linkActivo.style.fontWeight = 'bold';
    linkInactivo.style.fontWeight = '100';
    
    console.log('Mostrando subcategorías:', listaMostrar.id); // Para debugging
}

function hideAllSubcategories() {
    const items2 = document.getElementById('items2');
    const items3 = document.getElementById('items3');
    
    if (items2) {
        items2.classList.remove('show');
        items2.style.display = 'none';
    }
    
    if (items3) {
        items3.classList.remove('show');
        items3.style.display = 'none';
    }
}

function closeMobileSubmenus() {
    const activeSubmenus = document.querySelectorAll('.mobile-submenu.active');
    const rotatedArrows = document.querySelectorAll('.mobile-dropdown-arrow.rotated');
    
    activeSubmenus.forEach(submenu => submenu.classList.remove('active'));
    rotatedArrows.forEach(arrow => arrow.classList.remove('rotated'));
}

// Event listeners para el menú desktop
document.addEventListener('DOMContentLoaded', function() {
    const nosotrosLink = document.getElementById('nosotros');
    const areasLink = document.getElementById('areas');
    const items2 = document.getElementById('items2');
    const items3 = document.getElementById('items3');

    // Verificar que los elementos existen - debugging detallado
    console.log('Elementos encontrados:', {
        nosotrosLink: !!nosotrosLink,
        areasLink: !!areasLink,
        items2: !!items2,
        items3: !!items3
    });
    
    // Debugging más detallado
    console.log('IDs buscados:');
    console.log('- nosotros:', document.getElementById('nosotros'));
    console.log('- areas:', document.getElementById('areas'));
    console.log('- items2:', document.getElementById('items2'));
    console.log('- items3:', document.getElementById('items3'));
    
    // Verificar si existen elementos con clases similares
    console.log('Elementos con clase items-2:', document.getElementsByClassName('items-2'));
    console.log('Elementos con clase items-3:', document.getElementsByClassName('items-3'));

    if (nosotrosLink && areasLink && items2 && items3) {
        nosotrosLink.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Click en Nosotros');
            showDesktopList(items2, items3, nosotrosLink, areasLink);
        });

        areasLink.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Click en Areas');
            showDesktopList(items3, items2, areasLink, nosotrosLink);
        });
    } else {
        console.error('No se encontraron todos los elementos necesarios');
    }
});

// Event listeners para el menú mobile
document.addEventListener('click', function(e) {
    const mobileNavLink = e.target.closest('.mobile-nav-link[data-submenu]');
    
    if (mobileNavLink) {
        e.preventDefault();
        
        const submenuId = 'mobile-submenu-' + mobileNavLink.getAttribute('data-submenu');
        const submenu = document.getElementById(submenuId);
        const arrow = mobileNavLink.querySelector('.mobile-dropdown-arrow');
        
        if (submenu && arrow) {
            const isActive = submenu.classList.contains('active');
            
            // Cerrar otros submenús
            closeMobileSubmenus();
            
            // Toggle del submenu actual
            if (!isActive) {
                submenu.classList.add('active');
                arrow.classList.add('rotated');
            }
        }
    }
});

// Cerrar menú al hacer click en el overlay
document.getElementById('menu-overlay').addEventListener('click', function() {
    if (isMobileMenuActive) {
        toggleMobileMenu();
    }
});

// Manejar redimensionamiento de ventana
window.addEventListener('resize', function() {
    // Cerrar menús activos al cambiar el tamaño de pantalla
    if (isDesktopMenuActive && window.innerWidth <= 768) {
        isDesktopMenuActive = false;
        const menu = document.getElementById('desktop-menu');
        menu.style.display = 'none';
        menu.classList.remove('activo');
        document.getElementById('close-menu').style.display = 'none';
        document.getElementById('menu-btn').style.display = 'block';
        hideAllSubcategories();
    }
    
    if (isMobileMenuActive && window.innerWidth > 768) {
        isMobileMenuActive = false;
        document.getElementById('mobile-menu').classList.remove('active');
        document.getElementById('menu-overlay').classList.remove('active');
        document.getElementById('close-menu').style.display = 'none';
        document.getElementById('menu-btn').style.display = 'block';
        document.body.style.overflow = 'auto';
        closeMobileSubmenus();
    }
});   


let isDesktopMenuActive = false;
let isMobileMenuActive = false;

function toggleMenu() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth > 768) {
        toggleDesktopMenu();
    } else {
        toggleMobileMenu();
    }
}

function toggleDesktopMenu() {
    const menu = document.getElementById('desktop-menu');
    const closeBtn = document.getElementById('close-menu');
    const openBtn = document.getElementById('menu-btn');
    const nosotrosLink = document.getElementById('nosotros');
    const areasLink = document.getElementById('areas');
    const items2 = document.getElementById('items2');
    const items3 = document.getElementById('items3');

    isDesktopMenuActive = !isDesktopMenuActive;

    if (isDesktopMenuActive) {
        menu.style.display = 'flex';
        menu.classList.add('activo');
        openBtn.style.display = 'none';
        closeBtn.style.display = 'block';

        // Mostrar items-2 (Nosotros) por defecto al abrir el menú
        showDesktopList(items2, items3, nosotrosLink, areasLink);
        
        menu.classList.remove('animate__slideOutRight');
        menu.classList.add('animate__slideInRight');
    } else {
        menu.classList.remove('animate__slideInRight');
        menu.classList.add('animate__slideOutRight');

        setTimeout(() => {
            menu.style.display = 'none';
            menu.classList.remove('activo');
            closeBtn.style.display = 'none';
            openBtn.style.display = 'block';
        }, 500);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const hamburger = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');

    isMobileMenuActive = !isMobileMenuActive;

    if (isMobileMenuActive) {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        hamburger.style.display = 'none';
        closeBtn.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.style.display = 'block';
        closeBtn.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        closeMobileSubmenus();
    }
}

function showDesktopList(listaMostrar, listaOcultar, linkActivo, linkInactivo) {
    // Ocultar todas las subcategorías primero
    hideAllSubcategories();
    
    // Mostrar la subcategoría seleccionada
    if (listaMostrar) {
        listaMostrar.classList.add('show');
        listaMostrar.style.display = 'block';
    }
    
    // Actualizar estilos de los enlaces
    if (linkActivo) {
        linkActivo.style.fontWeight = '700';
    }
    if (linkInactivo) {
        linkInactivo.style.fontWeight = '100';
    }
}

function hideAllSubcategories() {
    const items3 = document.getElementById('items3');
    if (items3) {
        items3.classList.remove('show');
        items3.style.display = 'none';
    }
}

function closeMobileSubmenus() {
    const activeSubmenus = document.querySelectorAll('.mobile-submenu.active');
    const rotatedArrows = document.querySelectorAll('.mobile-dropdown-arrow.rotated');
    
    activeSubmenus.forEach(submenu => submenu.classList.remove('active'));
    rotatedArrows.forEach(arrow => arrow.classList.remove('rotated'));
}

// Event listeners para el menú desktop
document.addEventListener('DOMContentLoaded', function() {
    const nosotrosLink = document.getElementById('nosotros');
    const areasLink = document.getElementById('areas');
    const items2 = document.getElementById('items2');
    const items3 = document.getElementById('items3');

    // Configurar el estado inicial - mostrar items-2
    if (items2) {
        items2.classList.add('show');
        items2.style.display = 'block';
    }
    if (nosotrosLink) {
        nosotrosLink.style.fontWeight = '700';
    }

    if (nosotrosLink && areasLink && items2 && items3) {
        nosotrosLink.addEventListener('click', function(event) {
            event.preventDefault();
            showDesktopList(items2, items3, nosotrosLink, areasLink);
        });

        areasLink.addEventListener('click', function(event) {
            event.preventDefault();
            showDesktopList(items3, items2, areasLink, nosotrosLink);
        });
    }
});

// Event listeners para el menú mobile
document.addEventListener('click', function(e) {
    const mobileNavLink = e.target.closest('.mobile-nav-link[data-submenu]');
    
    if (mobileNavLink) {
        e.preventDefault();
        
        const submenuId = 'mobile-submenu-' + mobileNavLink.getAttribute('data-submenu');
        const submenu = document.getElementById(submenuId);
        const arrow = mobileNavLink.querySelector('.mobile-dropdown-arrow');
        
        if (submenu && arrow) {
            const isActive = submenu.classList.contains('active');
            
            closeMobileSubmenus();
            
            if (!isActive) {
                submenu.classList.add('active');
                arrow.classList.add('rotated');
            }
        }
    }
});

// Cerrar menú al hacer click en el overlay
document.getElementById('menu-overlay').addEventListener('click', function() {
    if (isMobileMenuActive) {
        toggleMobileMenu();
    }
});

// Manejar redimensionamiento de ventana
window.addEventListener('resize', function() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth > 768) {
        // Si venimos de móvil, asegurarnos de resetear
        if (isMobileMenuActive) {
            toggleMobileMenu();
        }
        // Resetear iconos
        document.getElementById('close-menu').style.display = 'none';
        document.getElementById('menu-btn').style.display = 'block';
    } else {
        // Si venimos de desktop, asegurarnos de resetear
        if (isDesktopMenuActive) {
            toggleDesktopMenu();
        }
    }
});  */

let isDesktopMenuActive = false;
let isMobileMenuActive = false;

// Toggle principal del menú
function toggleMenu() {
    const screenWidth = window.innerWidth;
    screenWidth > 768 ? toggleDesktopMenu() : toggleMobileMenu();
}

// Menú desktop
function toggleDesktopMenu() {
    const menu = document.getElementById('desktop-menu');
    const closeBtn = document.getElementById('close-menu');
    const openBtn = document.getElementById('menu-btn');
    const nosotrosLink = document.getElementById('nosotros');
    const areasLink = document.getElementById('areas');
    const items2 = document.getElementById('items2');
    const items3 = document.getElementById('items3');

    isDesktopMenuActive = !isDesktopMenuActive;

    if (isDesktopMenuActive) {
        menu.style.display = 'flex';
        menu.classList.add('activo');
        openBtn.style.display = 'none';
        closeBtn.style.display = 'block';
        
        // Mostrar items-2 por defecto
        showDesktopList(items2, items3, nosotrosLink, areasLink);
    } else {
        menu.classList.remove('activo');
        closeBtn.style.display = 'none';
        openBtn.style.display = 'block';
    }
}

// Menú mobile
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const hamburger = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');

    isMobileMenuActive = !isMobileMenuActive;

    if (isMobileMenuActive) {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        hamburger.style.display = 'none';
        closeBtn.style.display = 'block';
    } else {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.style.display = 'block';
        closeBtn.style.display = 'none';
    }
}

// Mostrar subcategorías
function showDesktopList(listaMostrar, listaOcultar, linkActivo, linkInactivo) {
    // Ocultar todas las subcategorías
    document.querySelectorAll('.items-2, .items-3').forEach(item => {
        item.style.display = 'none';
        item.classList.remove('show');
    });
    
    // Mostrar la seleccionada
    if (listaMostrar) {
        listaMostrar.style.display = 'block';
        listaMostrar.classList.add('show');
    }
    
    // Actualizar estilos
    if (linkActivo) linkActivo.style.fontWeight = '700';
    if (linkInactivo) linkInactivo.style.fontWeight = '100';
}

// Event listeners al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Botones del menú
    document.getElementById('menu-btn').addEventListener('click', toggleMenu);
    document.getElementById('close-menu').addEventListener('click', toggleMenu);
    
    // Submenús
    const nosotrosLink = document.getElementById('nosotros');
    const areasLink = document.getElementById('areas');
    const items2 = document.getElementById('items2');
    const items3 = document.getElementById('items3');

    if (nosotrosLink && areasLink) {
        nosotrosLink.addEventListener('click', (e) => {
            e.preventDefault();
            showDesktopList(items2, items3, nosotrosLink, areasLink);
        });
        
        areasLink.addEventListener('click', (e) => {
            e.preventDefault();
            showDesktopList(items3, items2, areasLink, nosotrosLink);
        });
    }

    // Configurar estado inicial
    if (items2 && nosotrosLink) {
        items2.style.display = 'block';
        items2.classList.add('show');
        nosotrosLink.style.fontWeight = '700';
    }
});

// Manejo de redimensionamiento
window.addEventListener('resize', function() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth > 768 && isMobileMenuActive) {
        toggleMobileMenu();
    } else if (screenWidth <= 768 && isDesktopMenuActive) {
        toggleDesktopMenu();
    }
});