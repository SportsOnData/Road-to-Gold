/*
  ROAD TO GOLD · UTILIDADES

  Funciones comunes utilizadas por varios sistemas.
*/

function cargarBandera(imagen, alternativa, pais) {
  imagen.style.display = "none";
  alternativa.style.display = "grid";
  alternativa.textContent = pais.codigo;

  imagen.onload = function () {
    imagen.style.display = "block";
    alternativa.style.display = "none";
  };

  imagen.onerror = function () {
    imagen.style.display = "none";
    alternativa.style.display = "grid";
  };

  imagen.alt = `Bandera de ${pais.nombre}`;

  imagen.src =
    `assets/banderas/${pais.nombre}.png`;
}

function mostrarPantalla(pantallaVisible) {
  document
    .querySelectorAll(".pantalla")
    .forEach(pantalla => {
      pantalla.classList.add("oculto");
    });

  if (pantallaVisible) {
    pantallaVisible.classList.remove("oculto");
  }
}

function mezclar(lista) {
  const copia = [...lista];

  for (
    let indice = copia.length - 1;
    indice > 0;
    indice -= 1
  ) {
    const indiceAleatorio = Math.floor(
      Math.random() * (indice + 1)
    );

    [
      copia[indice],
      copia[indiceAleatorio]
    ] = [
      copia[indiceAleatorio],
      copia[indice]
    ];
  }

  return copia;
}

function estaActivo(elemento) {
  return elemento.activo === true;
}
