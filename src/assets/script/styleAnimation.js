function estaEnPantalla(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function manejarAnimaciones() {
  const elementos = document.querySelectorAll('.animar');
  elementos.forEach(el => {
    if (estaEnPantalla(el)) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible'); // si querés que desaparezca al salir
    }
  });
}

window.addEventListener('scroll', manejarAnimaciones);
window.addEventListener('load', manejarAnimaciones);
