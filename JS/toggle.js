class ResponsiveMenu {
  constructor() {
    this.menuToggle = document.getElementById("menuToggle");
    this.menuContainer = document.getElementById("menuContainer");
    this.mainContent = document.getElementById("mainContent");
    this.menuLinks = document.querySelectorAll("[data-submenu]");
    this.submenus = document.querySelectorAll(".submenu");
    this.mobileSubmenus = document.querySelectorAll(".mobile-submenu");
    this.isOpen = false;
    this.isMobile = false;

    this.init();
  }

  init() {
    this.checkIfMobile();

    this.menuToggle.addEventListener("click", () => this.toggleMenu());

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (
        this.isOpen &&
        !this.menuContainer.contains(e.target) &&
        !this.menuToggle.contains(e.target)
      ) {
        this.closeMenu();
      }
    });

    // Manejar submenús
    this.menuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        if (this.isMobile) {
          this.toggleMobileSubmenu(link);
        } else {
          this.showDesktopSubmenu(link.dataset.submenu);
          this.setActiveLink(link);
        }
      });
    });

    // Cerrar menú con tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeMenu();
      }
    });

    // Manejar cambios de orientación y redimensionado
    window.addEventListener("resize", () => {
      this.handleResize();
    });

    // Prevenir scroll del body cuando el menú está abierto
    this.preventBodyScroll();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;

    // Mostrar/ocultar indicadores de expansión
    const expandIndicators = document.querySelectorAll(".expand-indicator");
    expandIndicators.forEach((indicator) => {
      indicator.style.display = this.isMobile ? "block" : "none";
    });
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.menuToggle.querySelector(".menu-icon-open").style.display = "none";
    this.menuToggle.querySelector(".menu-icon-close").style.display = "inline";
    this.isOpen = true;
    this.menuToggle.classList.add("active");
    this.menuContainer.classList.add("active");
    this.mainContent.classList.add("blurred");
    document.body.style.overflow = "hidden";

    // Animar elementos del menú
    this.animateMenuItems();

    // En escritorio, mostrar submenu por defecto
    if (!this.isMobile) {
      setTimeout(() => {
        this.showDesktopSubmenu("nosotros");
        const firstLink = document.querySelector('[data-submenu="nosotros"]');
        this.setActiveLink(firstLink);
      }, 300);
    }
  }

  closeMenu() {
    this.menuToggle.querySelector(".menu-icon-open").style.display = "inline";
    this.menuToggle.querySelector(".menu-icon-close").style.display = "none";
    this.isOpen = false;
    this.menuToggle.classList.remove("active");
    this.menuContainer.classList.remove("active");
    this.mainContent.classList.remove("blurred");
    document.body.style.overflow = "";

    // Cerrar todos los submenús móviles
    if (this.isMobile) {
      this.mobileSubmenus.forEach((submenu) => {
        submenu.classList.remove("active");
      });

      // Resetear indicadores
      document.querySelectorAll(".expand-indicator").forEach((indicator) => {
        indicator.classList.remove("expanded");
      });
    }
  }

  showDesktopSubmenu(submenuId) {
    this.submenus.forEach((submenu) => {
      submenu.classList.remove("active");
      if (submenu.id === submenuId) {
        submenu.classList.add("active");
        this.animateSubmenuItems(submenu);
      }
    });
  }

  toggleMobileSubmenu(link) {
    const submenuId = "mobile-" + link.dataset.submenu;
    const submenu = document.getElementById(submenuId);
    const indicator = link.querySelector(".expand-indicator");

    if (submenu.classList.contains("active")) {
      // Cerrar
      submenu.classList.remove("active");
      indicator.classList.remove("expanded");
    } else {
      // Cerrar otros submenús primero
      this.mobileSubmenus.forEach((sub) => {
        if (sub !== submenu) {
          sub.classList.remove("active");
        }
      });

      document.querySelectorAll(".expand-indicator").forEach((ind) => {
        if (ind !== indicator) {
          ind.classList.remove("expanded");
        }
      });

      // Abrir el seleccionado
      submenu.classList.add("active");
      indicator.classList.add("expanded");
      this.animateMobileSubmenuItems(submenu);
    }
  }

  setActiveLink(activeLink) {
    this.menuLinks.forEach((link) => {
      link.classList.remove("active");
    });
    activeLink.classList.add("active");
  }

  animateMenuItems() {
    const menuItems = document.querySelectorAll(".menu-items > li");
    menuItems.forEach((item, index) => {
      item.style.animation = "none";
      item.offsetHeight; // Trigger reflow
      item.style.animation = `slideInLeft 0.6s ease ${index * 0.1}s forwards`;
    });
  }

  animateSubmenuItems(submenu) {
    const items = submenu.querySelectorAll("li");
    items.forEach((item, index) => {
      item.style.animation = "none";
      item.offsetHeight; // Trigger reflow
      item.style.animation = `slideInUp 0.5s ease ${index * 0.1}s forwards`;
    });
  }

  animateMobileSubmenuItems(submenu) {
    const items = submenu.querySelectorAll("li");
    items.forEach((item, index) => {
      item.style.animation = "none";
      item.offsetHeight; // Trigger reflow
      item.style.animation = `slideInDown 0.4s ease ${index * 0.1}s forwards`;
    });
  }

  handleResize() {
    const wasMobile = this.isMobile;
    this.checkIfMobile();

    // Si cambió de móvil a escritorio o viceversa
    if (wasMobile !== this.isMobile && this.isOpen) {
      // Resetear submenús
      this.submenus.forEach((submenu) => submenu.classList.remove("active"));
      this.mobileSubmenus.forEach((submenu) =>
        submenu.classList.remove("active")
      );

      // Si cambió a escritorio, mostrar submenu por defecto
      if (!this.isMobile) {
        setTimeout(() => {
          this.showDesktopSubmenu("nosotros");
          const firstLink = document.querySelector('[data-submenu="nosotros"]');
          this.setActiveLink(firstLink);
        }, 100);
      }
    }

    // Cerrar menú en cambios drásticos de tamaño
    if (window.innerWidth > 1024 && this.isOpen) {
      this.closeMenu();
    }
  }

  preventBodyScroll() {
    let startY = 0;

    this.menuContainer.addEventListener("touchstart", (e) => {
      startY = e.touches[0].clientY;
    });

    this.menuContainer.addEventListener(
      "touchmove",
      (e) => {
        const scrollable = e.target.closest(".menu-content");
        if (scrollable) {
          const currentY = e.touches[0].clientY;
          const scrollTop = scrollable.scrollTop;
          const scrollHeight = scrollable.scrollHeight;
          const clientHeight = scrollable.clientHeight;

          if (
            (scrollTop === 0 && currentY > startY) ||
            (scrollTop + clientHeight >= scrollHeight && currentY < startY)
          ) {
            e.preventDefault();
          }
        } else {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }
}

// Inicializar el menú cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new ResponsiveMenu();
});

// Mejorar rendimiento en dispositivos móviles
if ("ontouchstart" in window) {
  document.body.classList.add("touch-device");
}
