import { useEffect, useRef } from "react";

export function useSlideshow() {
  const slidesRef = useRef(null);
  const indicadoresRef = useRef(null);
  const slideActual = useRef(1);

  useEffect(() => {
    const slides = slidesRef.current;
    const indicadores = indicadoresRef.current;

    if (!slides || !indicadores) return;

    const siguienteSlide = () => {
      const primerSlide = slides.children[0];
      if (!primerSlide) return;

      const ancho = primerSlide.offsetWidth;
      const velocidad = 200;

      slides.style.transition = `ease-out ${velocidad}ms all`;
      slides.style.transform = `translateX(-${ancho}px)`;

      setTimeout(() => {
        if (slides.children.length > 0) {
          slides.appendChild(primerSlide);
          slides.style.transition = "none";
          slides.style.transform = "translateX(0)";
        }
      }, velocidad);

      // Cambiar los indicadores.
      if (slideActual.current < indicadores.children.length) {
        slideActual.current++;
      } else {
        slideActual.current = 1;
      }

      const activoActual = indicadores.querySelector(".active");
      if (activoActual) {
        activoActual.classList.remove("active");
      }

      const indiceIndex = slideActual.current - 1;
      if (indicadores.children[indiceIndex]) {
        indicadores.children[indiceIndex].classList.add("active");
      }
    };
    const intervalo = setInterval(siguienteSlide, 2_000);
    return () => clearInterval(intervalo);
  }, []);

  return {
    slidesRef,
    indicadoresRef,
  };
}
