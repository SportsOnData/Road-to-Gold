const pantallaInicio = document.querySelector("#pantallaInicio");
const pantallaDeportes = document.querySelector("#pantallaDeportes");
const pantallaJuego = document.querySelector("#pantallaJuego");
const pantallaFinal = document.querySelector("#pantallaFinal");
const pantallaResultados = document.querySelector("#pantallaResultados");

const botonEmpezar = document.querySelector("#botonEmpezar");
const botonReroll = document.querySelector("#botonReroll");
const botonNuevaPartida = document.querySelector("#botonNuevaPartida");
const botonComenzarDraft = document.querySelector(
  "#botonComenzarDraft"
);
const botonComenzarJuegos = document.querySelector(
  "#botonComenzarJuegos"
);
const progreso = document.querySelector("#progreso");

const banderaActual = document.querySelector("#banderaActual");
const banderaAlternativa = document.querySelector("#banderaAlternativa");
const nombrePaisActual = document.querySelector("#nombrePaisActual");
const cartaPais = document.querySelector(".carta-pais");

const tableroDeportes = document.querySelector("#tableroDeportes");
const mensajeJuego = document.querySelector("#mensajeJuego");
const resumenFinal = document.querySelector("#resumenFinal");
const textoPaisActual = document.querySelector("#textoPaisActual");
const presentacionDeportes = document.querySelector(
  "#presentacionDeportes"
);
const resultadosPorDeporte = document.querySelector(
  "#resultadosPorDeporte"
);

const totalOros = document.querySelector("#totalOros");
const totalPlatas = document.querySelector("#totalPlatas");
const totalBronces = document.querySelector("#totalBronces");
const totalMedallas = document.querySelector("#totalMedallas");

let deportesPartida = [];
let paisesPendientes = [];
let paisActual = null;
let asignaciones = [];
let rerollDisponible = true;
let sorteoEnCurso = false;
let resultadosJuegos = [];

botonEmpezar.addEventListener("click", iniciarPartida);
botonNuevaPartida.addEventListener("click", iniciarPartida);
botonComenzarDraft.addEventListener("click", comenzarDraft);
botonComenzarJuegos.addEventListener("click", comenzarJuegos);
botonReroll.addEventListener("click", usarReroll);

function iniciarPartida() {
  deportesPartida = seleccionarDeportes();

  paisesPendientes = mezclar(
    PAISES.filter((pais) => {
      return pais.activo === true || pais.activo === "true";
    })
  );

  paisActual = null;
  asignaciones = [];
  resultadosJuegos = [];
  rerollDisponible = true;
  sorteoEnCurso = false;

  botonReroll.disabled = false;
  botonReroll.textContent = "↻ Usar reroll";

  botonComenzarDraft.disabled = true;

  mostrarPantalla(pantallaDeportes);
  mostrarPresentacionDeportes();
}

function mostrarPresentacionDeportes() {
  presentacionDeportes.innerHTML = "";

  deportesPartida.forEach((deporte, indice) => {
    const tarjeta = document.createElement("div");

    tarjeta.className = "tarjeta-presentacion-deporte";
    tarjeta.innerHTML = `
  <strong>${deporte.nombre}</strong>
  <span>${deporte.tamanoSimulacion} pruebas</span>
`;

    presentacionDeportes.appendChild(tarjeta);

    setTimeout(() => {
      tarjeta.classList.add("visible");
    }, indice * 180);
  });

  const tiempoTotal =
    deportesPartida.length * 180 + 250;

  setTimeout(() => {
    botonComenzarDraft.disabled = false;
  }, tiempoTotal);
}


function comenzarDraft() {
  mostrarPantalla(pantallaJuego);
  renderizarDeportes();
  sacarSiguientePais();
}

function seleccionarDeportes() {
  const deportesFijos = DEPORTES.filter(
    (deporte) =>
      deporte.grupo === "fijo" &&
      estaActivo(deporte)
  );

  const deportesGrandes = seleccionarPonderados(
    "grande",
    2
  );

  const deportesMedianos = seleccionarPonderados(
    "mediano",
    1
  );

  const deportesPequenos = seleccionarPonderados(
    "pequeno",
    1
  );

  return [
    ...deportesFijos,
    ...deportesGrandes,
    ...deportesMedianos,
    ...deportesPequenos
  ];
}


function seleccionarPonderados(grupo, cantidad) {
  const candidatos = DEPORTES
    .filter(
      (deporte) =>
        deporte.grupo === grupo &&
        estaActivo(deporte)
    )
    .map((deporte) => ({ ...deporte }));

  const elegidos = [];

  while (
    elegidos.length < cantidad &&
    candidatos.length > 0
  ) {
    const pesoTotal = candidatos.reduce(
      (total, deporte) =>
        total + Number(deporte.pesoAparicion),
      0
    );

    let numeroSorteado = Math.random() * pesoTotal;
    let indiceElegido = 0;

    for (
      let indice = 0;
      indice < candidatos.length;
      indice += 1
    ) {
      numeroSorteado -= Number(
        candidatos[indice].pesoAparicion
      );

      if (numeroSorteado <= 0) {
        indiceElegido = indice;
        break;
      }
    }

    const deporteElegido = candidatos.splice(
      indiceElegido,
      1
    )[0];

    elegidos.push(deporteElegido);
  }

  return elegidos;
}


function sacarSiguientePais(
  mensajeFinal = "Elige el deporte donde quieres colocar este país."
) {
  const paisSeleccionado = paisesPendientes.shift();

  if (!paisSeleccionado) {
    console.error("No quedan países disponibles.");
    return;
  }

  sorteoEnCurso = true;
  paisActual = null;
  textoPaisActual.textContent = "";

  botonReroll.disabled = true;
  mensajeJuego.textContent = "Sorteando país...";

  const candidatosVisuales = [
    paisSeleccionado,
    ...paisesPendientes
  ];

  let cambiosRealizados = 0;
  const totalCambios = 12;
  const velocidadSorteo = 75;

  const intervaloSorteo = setInterval(() => {
    const indiceAleatorio = Math.floor(
      Math.random() * candidatosVisuales.length
    );

    const paisProvisional =
      candidatosVisuales[indiceAleatorio];

    mostrarPaisEnCarta(paisProvisional);
    animarCartaPais();

    cambiosRealizados += 1;

    if (cambiosRealizados >= totalCambios) {
      clearInterval(intervaloSorteo);

      paisActual = paisSeleccionado;

      mostrarPaisActual();
      animarCartaPais();
      textoPaisActual.textContent = "Elige un deporte libre.";

      sorteoEnCurso = false;

      botonReroll.disabled = !rerollDisponible;
      mensajeJuego.textContent = mensajeFinal;
    }
  }, velocidadSorteo);
}


function mostrarPaisActual() {
  mostrarPaisEnCarta(paisActual);
}


function mostrarPaisEnCarta(pais) {
  nombrePaisActual.textContent = pais.nombre;

  cargarBandera(
    banderaActual,
    banderaAlternativa,
    pais
  );
}


function animarCartaPais() {
  cartaPais.classList.remove("sorteando");

  void cartaPais.offsetWidth;

  cartaPais.classList.add("sorteando");
}


function renderizarDeportes() {
  tableroDeportes.innerHTML = "";

  deportesPartida.forEach((deporte) => {
    const tarjeta = document.createElement("button");

    tarjeta.type = "button";
    tarjeta.className = "tarjeta-deporte";
    tarjeta.dataset.codigo = deporte.codigo;

    tarjeta.innerHTML = `
  <h3>${deporte.nombre}</h3>

  <p class="numero-pruebas">
    ${deporte.tamanoSimulacion} pruebas
  </p>

  <div class="hueco">
    Pulsa para asignar
  </div>
`;

    tarjeta.addEventListener("click", () => {
      colocarPais(deporte, tarjeta);
    });

    tableroDeportes.appendChild(tarjeta);
  });
}


function colocarPais(deporte, tarjeta) {
  if (sorteoEnCurso || !paisActual) {
    return;
  }

  if (tarjeta.classList.contains("ocupada")) {
    return;
  }

  const nota = obtenerNotaPais(
    paisActual,
    deporte.codigo
  );

  const color = obtenerColor(nota);

  const paisColocado = paisActual;

  asignaciones.push({
    deporte: deporte,
    pais: paisColocado,
    color: color
  });

  tarjeta.classList.add("ocupada");
  tarjeta.classList.add(color);

  tarjeta.disabled = true;

  tarjeta.querySelector(".hueco").outerHTML = `
    <div class="pais-colocado">

      <div class="marco-bandera">

        <img
          src=""
          alt="Bandera de ${paisColocado.nombre}"
        >

        <span class="bandera-alternativa">
          ${paisColocado.codigo}
        </span>

      </div>

      <strong>${paisColocado.nombre}</strong>

    </div>
  `;

  const bloquePais = tarjeta.querySelector(
    ".pais-colocado"
  );

  const imagen = bloquePais.querySelector("img");

  const alternativa = bloquePais.querySelector(
    ".bandera-alternativa"
  );

  cargarBandera(
    imagen,
    alternativa,
    paisColocado
  );

  if (asignaciones.length === 7) {
    terminarPartida();
    return;
  }

  sacarSiguientePais();
}


function usarReroll() {
  if (
    sorteoEnCurso ||
    !rerollDisponible ||
    !paisActual
  ) {
    return;
  }

  const paisDescartado = paisActual;

  rerollDisponible = false;

  botonReroll.disabled = true;
  botonReroll.textContent = "↻ Reroll utilizado";

  sacarSiguientePais(
    `${paisDescartado.nombre} ha sido descartado.`
  );
}


function terminarPartida() {
  resumenFinal.innerHTML = asignaciones
    .map(({ deporte, pais, color }) => {
      return `
        <div class="resumen-item ${color}">
          <strong>${deporte.nombre}</strong>
          <span>${pais.nombre}</span>
        </div>
      `;
    })
    .join("");

  mostrarPantalla(pantallaFinal);
}

function comenzarJuegos() {
  resultadosJuegos = asignaciones.map(
    ({ deporte, pais }) => {
      const nota = obtenerNotaPais(
        pais,
        deporte.codigo
      );

      const medallas = simularDeporteLaboratorio(
        nota,
        Number(deporte.tamanoSimulacion),
        Number(deporte.variabilidad)
      );

      return {
        deporte: deporte,
        pais: pais,
        oros: medallas.oros,
        platas: medallas.platas,
        bronces: medallas.bronces
      };
    }
  );

  mostrarResultadosJuegos();
}


function mostrarResultadosJuegos() {
  let orosAcumulados = 0;
  let platasAcumuladas = 0;
  let broncesAcumulados = 0;

  resultadosPorDeporte.innerHTML = resultadosJuegos
    .map((resultado) => {
      orosAcumulados += resultado.oros;
      platasAcumuladas += resultado.platas;
      broncesAcumulados += resultado.bronces;

      return `
        <div class="fila-resultado">
          <strong>${resultado.deporte.nombre}</strong>
          <span>${resultado.pais.nombre}</span>
          <span class="cantidad-medalla">
            ${resultado.oros}
          </span>
          <span class="cantidad-medalla">
            ${resultado.platas}
          </span>
          <span class="cantidad-medalla">
            ${resultado.bronces}
          </span>
        </div>
      `;
    })
    .join("");

  totalOros.textContent = orosAcumulados;
  totalPlatas.textContent = platasAcumuladas;
  totalBronces.textContent = broncesAcumulados;

  totalMedallas.textContent =
    orosAcumulados +
    platasAcumuladas +
    broncesAcumulados;

  mostrarPantalla(pantallaResultados);
}

function obtenerNotaPais(pais, codigoDeporte) {
  let nota;

  // Estructura 1:
  // pais.notas.atletismo
  if (
    pais.notas &&
    pais.notas[codigoDeporte] !== undefined
  ) {
    nota = Number(pais.notas[codigoDeporte]);
  }

  // Estructura 2:
  // pais.notaAtletismo
  if (nota === undefined) {
    const nombrePropiedad =
      "nota" +
      codigoDeporte.charAt(0).toUpperCase() +
      codigoDeporte.slice(1);

    if (pais[nombrePropiedad] !== undefined) {
      nota = Number(pais[nombrePropiedad]);
    }
  }

  if (nota === undefined || Number.isNaN(nota)) {
    console.warn(
      `No se encontró la nota de ${pais.nombre} para ${codigoDeporte}.`,
      pais
    );

    return 0;
  }

  console.log(
    `${pais.nombre} · ${codigoDeporte} · nota interna: ${nota}`
  );

  return nota;
}


function obtenerColor(nota) {
  if (nota >= 9) {
    return "azul";
  }

  if (nota >= 7) {
    return "verde";
  }

  if (nota >= 4) {
    return "amarillo";
  }

  return "rojo";
}

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
  pantallaInicio.classList.add("oculto");
  pantallaDeportes.classList.add("oculto");
  pantallaJuego.classList.add("oculto");
  pantallaFinal.classList.add("oculto");
  pantallaResultados.classList.add("oculto");

  pantallaVisible.classList.remove("oculto");
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
  return (
    elemento.activo === true ||
    elemento.activo === "true"
  );
}

/* ===================================================== */
/* LABORATORIO TEMPORAL DEL MOTOR OLÍMPICO               */
/* ===================================================== */

const PARAMETROS_VARIABILIDAD = {
  1: {
    probabilidadMaximaMedalla: 1,
    repartoPaisExcelente: {
      oro: 0.875,
      plata: 0.125,
      bronce: 0
    },
    exponenteCalidad: 2.4,
    probabilidadSorpresa: 0.00002
  },

  2: {
    probabilidadMaximaMedalla: 0.82,
    repartoPaisExcelente: {
      oro: 0.48,
      plata: 0.22,
      bronce: 0.12
    },
    exponenteCalidad: 2,
    probabilidadSorpresa: 0.00008
  },

  3: {
    probabilidadMaximaMedalla: 0.625,
    repartoPaisExcelente: {
      oro: 0.25,
      plata: 0.20,
      bronce: 0.175
    },
    exponenteCalidad: 1.68,
    probabilidadSorpresa: 0.00015
  },

  4: {
    probabilidadMaximaMedalla: 0.46,
    repartoPaisExcelente: {
      oro: 0.15,
      plata: 0.15,
      bronce: 0.16
    },
    exponenteCalidad: 1.55,
    probabilidadSorpresa: 0.00025
  },

  5: {
    probabilidadMaximaMedalla: 0.38,
    repartoPaisExcelente: {
      oro: 0.10,
      plata: 0.12,
      bronce: 0.16
    },
    exponenteCalidad: 1.45,
    probabilidadSorpresa: 0.0004
  }
};


/*
  Simula todas las pruebas de un deporte.

  Por ejemplo:
  nota 8
  40 pruebas
  variabilidad 3
*/
function simularDeporteLaboratorio(
  nota,
  numeroPruebas,
  variabilidad
) {
  const resultado = {
    oros: 0,
    platas: 0,
    bronces: 0
  };

  for (
    let prueba = 0;
    prueba < numeroPruebas;
    prueba += 1
  ) {
    const medalla = simularUnaPrueba(
      nota,
      variabilidad
    );

    if (medalla === "oro") {
      resultado.oros += 1;
    }

    if (medalla === "plata") {
      resultado.platas += 1;
    }

    if (medalla === "bronce") {
      resultado.bronces += 1;
    }
  }

  return resultado;
}


/*
  Realiza el sorteo de una única prueba.

  El resultado puede ser:
  - oro
  - plata
  - bronce
  - null, que significa no conseguir medalla
*/
function simularUnaPrueba(nota, variabilidad) {
  const probabilidades = calcularProbabilidadesPrueba(
    nota,
    variabilidad
  );

  const sorteo = Math.random();

  if (sorteo < probabilidades.oro) {
    return "oro";
  }

  if (
    sorteo <
    probabilidades.oro +
    probabilidades.plata
  ) {
    return "plata";
  }

  if (
    sorteo <
    probabilidades.oro +
    probabilidades.plata +
    probabilidades.bronce
  ) {
    return "bronce";
  }

  return null;
}


/*
  Convierte la nota y la variabilidad
  en probabilidades de medalla para una prueba.
*/
function calcularProbabilidadesPrueba(
  nota,
  variabilidad
) {
  const parametros =
    PARAMETROS_VARIABILIDAD[variabilidad];

  if (!parametros) {
    console.error(
      `Variabilidad no válida: ${variabilidad}`
    );

    return {
      oro: 0,
      plata: 0,
      bronce: 0
    };
  }

  const notaLimitada = Math.max(
    0,
    Math.min(10, Number(nota))
  );

  /*
    La nota 1 representa el punto desde el que
    empieza a crecer de verdad la capacidad.

    Una nota 1 mantiene únicamente una posibilidad
    minúscula de sorpresa.
  */
  const calidadNormalizada = Math.max(
    0,
    (notaLimitada - 1) / 9
  );

  const fuerzaCalculada = Math.pow(
    calidadNormalizada,
    parametros.exponenteCalidad
  );

  /*
    Incluso una nota muy baja tiene una probabilidad
    diminuta de producir una sorpresa.
  */
  const probabilidadSorpresa =
    parametros.probabilidadSorpresa *
    ((notaLimitada + 1) / 11);

  const probabilidadTotalMedalla =
    probabilidadSorpresa +
    (
      parametros.probabilidadMaximaMedalla -
      probabilidadSorpresa
    ) *
    fuerzaCalculada;

  /*
    Un país débil, cuando consigue medalla,
    tiende principalmente al bronce.
  */
  const repartoPaisDebil = {
    oro: 0.10,
    plata: 0.20,
    bronce: 0.70
  };

  const repartoExcelente =
    normalizarReparto(
      parametros.repartoPaisExcelente
    );

  /*
    A medida que aumenta la nota,
    el reparto pasa de estar cargado hacia el bronce
    a parecerse al de un país dominante.
  */
  const pesoRepartoExcelente =
    Math.pow(calidadNormalizada, 1.2);

  const repartoFinal = {
    oro: mezclarValores(
      repartoPaisDebil.oro,
      repartoExcelente.oro,
      pesoRepartoExcelente
    ),

    plata: mezclarValores(
      repartoPaisDebil.plata,
      repartoExcelente.plata,
      pesoRepartoExcelente
    ),

    bronce: mezclarValores(
      repartoPaisDebil.bronce,
      repartoExcelente.bronce,
      pesoRepartoExcelente
    )
  };

  return {
    oro:
      probabilidadTotalMedalla *
      repartoFinal.oro,

    plata:
      probabilidadTotalMedalla *
      repartoFinal.plata,

    bronce:
      probabilidadTotalMedalla *
      repartoFinal.bronce
  };
}


function normalizarReparto(reparto) {
  const total =
    reparto.oro +
    reparto.plata +
    reparto.bronce;

  return {
    oro: reparto.oro / total,
    plata: reparto.plata / total,
    bronce: reparto.bronce / total
  };
}


function mezclarValores(
  valorInicial,
  valorFinal,
  peso
) {
  return (
    valorInicial * (1 - peso) +
    valorFinal * peso
  );
}


/*
  Ejecuta el mismo deporte muchas veces
  para conocer su resultado medio.
*/
function probarCasoMotor(
  nota,
  numeroPruebas,
  variabilidad,
  repeticiones = 10000
) {
  let orosTotales = 0;
  let platasTotales = 0;
  let broncesTotales = 0;
  let simulacionesSinMedalla = 0;

  for (
    let repeticion = 0;
    repeticion < repeticiones;
    repeticion += 1
  ) {
    const resultado = simularDeporteLaboratorio(
      nota,
      numeroPruebas,
      variabilidad
    );

    orosTotales += resultado.oros;
    platasTotales += resultado.platas;
    broncesTotales += resultado.bronces;

    const totalMedallas =
      resultado.oros +
      resultado.platas +
      resultado.bronces;

    if (totalMedallas === 0) {
      simulacionesSinMedalla += 1;
    }
  }

  const resultadoMedio = {
    nota: nota,
    pruebas: numeroPruebas,
    variabilidad: variabilidad,

    orosMedios:
      (orosTotales / repeticiones).toFixed(2),

    platasMedias:
      (platasTotales / repeticiones).toFixed(2),

    broncesMedios:
      (broncesTotales / repeticiones).toFixed(2),

    porcentajeSinMedalla:
      (
        simulacionesSinMedalla /
        repeticiones *
        100
      ).toFixed(2) + "%"
  };

  console.table(resultadoMedio);

  return resultadoMedio;
}