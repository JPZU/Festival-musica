// "use strict";
// alert("hoal");

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
  scrollNav();
  navegacionfija();
}

function navegacionfija() {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  const body = document.querySelector("body");
  window.addEventListener("scroll", function () {
    // console.log(sobreFestival.getBoundingClientRect());
    if (sobreFestival.getBoundingClientRect().bottom < 0) {
      // console.log("ya pasamos el elemnto");
      barra.classList.add("fijo");
      body.classList.add("body-scroll");
    } else {
      // console.log("Aun no");
      barra.classList.remove("fijo");
      body.classList.remove("body-scroll");
    }
  });
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();
      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}
function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");
  //   galeria.textContent = "Vamos a crear la galeria";
  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
    <source srcset="build/img/thumb/${i}.avif" alt="image/avif" />
    <source srcset="build/img/thumb/${i}.webp" alt="image/webp" />
    <img
      loading="lazy"
      width="200"
      height="300"
      ="build/img/thumb/${i}.jpg"
      alt="imagen galeria"
    />
    `;
    imagen.onclick = function () {
      mostrarImagen(i);
    };
    galeria.appendChild(imagen);
    // console.log(imagen);
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" alt="image/avif" />
    <source srcset="build/img/grande/${id}.webp" alt="image/webp" />
    <img
      loading="lazy"
      width="200"
      height="300"
      ="build/img/grande/${id}.jpg"
      alt="imagen galeria"
    />
    `;

  // crea el overlay con la imagen
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };

  //   Boton para cerrar modal
  const cerrarModal = document.createElement("P");
  cerrarModal.textContent = "X";
  cerrarModal.onclick = function () {
    const body = document.querySelector("body");

    body.classList.remove("fijar-body");
    overlay.remove();
  };

  cerrarModal.classList.add("btn-cerrar");

  overlay.appendChild(cerrarModal);

  // Anadirlo al HTML
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
