const pantallaInicio = document.querySelector("#pantallaInicio");
const pantallaDeportes = document.querySelector("#pantallaDeportes");
const pantallaJuego = document.querySelector("#pantallaJuego");
const pantallaFinal = document.querySelector("#pantallaFinal");
const pantallaResultados = document.querySelector("#pantallaResultados");
const pantallaCeremonia = document.querySelector(
  "#pantallaCeremonia"
);
const botonEmpezar = document.querySelector("#botonEmpezar");
const botonReroll = document.querySelector("#botonReroll");
const botonDraftAleatorio = document.querySelector(
  "#botonDraftAleatorio"
);
const botonNuevaPartida = document.querySelector("#botonNuevaPartida");
const botonComenzarDraft = document.querySelector(
  "#botonComenzarDraft"
);
const botonComenzarJuegos = document.querySelector(
  "#botonComenzarJuegos"
);
const botonSiguienteDeporte = document.querySelector(
  "#botonSiguienteDeporte"
);
const botonSaltarCeremonia = document.querySelector(
  "#botonSaltarCeremonia"
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
const marcoCeremonia = document.querySelector(
  "#marcoCeremonia"
);

const progresoCeremonia = document.querySelector(
  "#progresoCeremonia"
);

const banderaCeremonia = document.querySelector(
  "#banderaCeremonia"
);

const banderaCeremoniaAlternativa = document.querySelector(
  "#banderaCeremoniaAlternativa"
);

const nombreDeporteCeremonia = document.querySelector(
  "#nombreDeporteCeremonia"
);

const nombrePaisCeremonia = document.querySelector(
  "#nombrePaisCeremonia"
);

const pruebasCeremonia = document.querySelector(
  "#pruebasCeremonia"
);

const resultadoCeremonia = document.querySelector(
  "#resultadoCeremonia"
);

const orosCeremonia = document.querySelector(
  "#orosCeremonia"
);

const platasCeremonia = document.querySelector(
  "#platasCeremonia"
);

const broncesCeremonia = document.querySelector(
  "#broncesCeremonia"
);

const textoActuacionCeremonia = document.querySelector(
  "#textoActuacionCeremonia"
);

const orosAcumuladosCeremonia = document.querySelector(
  "#orosAcumuladosCeremonia"
);

const platasAcumuladasCeremonia = document.querySelector(
  "#platasAcumuladasCeremonia"
);

const broncesAcumuladosCeremonia = document.querySelector(
  "#broncesAcumuladosCeremonia"
);

const totalAcumuladoCeremonia = document.querySelector(
  "#totalAcumuladoCeremonia"
);

let deportesPartida = [];
let paisesPendientes = [];
let paisActual = null;
let asignaciones = [];
let rerollDisponible = true;
let sorteoEnCurso = false;
let resultadosJuegos = [];
let resultadosCeremonia = [];
let indiceCeremonia = 0;

let medalleroAcumuladoCeremonia = {
  oros: 0,
  platas: 0,
  bronces: 0
};

let temporizadorRevelarCeremonia = null;
let temporizadorAvanzarCeremonia = null;

const TIEMPO_PRESENTACION_CEREMONIA = 1500;
const TIEMPO_LECTURA_CEREMONIA = 6500;

botonEmpezar.addEventListener("click", iniciarPartida);
botonNuevaPartida.addEventListener("click", iniciarPartida);
botonComenzarDraft.addEventListener("click", comenzarDraft);
botonComenzarJuegos.addEventListener("click", comenzarJuegos);
botonReroll.addEventListener("click", usarReroll);
botonSiguienteDeporte.addEventListener(
  "click",
  avanzarCeremonia
);
botonDraftAleatorio.addEventListener(
  "click",
  hacerDraftAleatorio
);
botonSaltarCeremonia.addEventListener(
  "click",
  saltarCeremonia
);

function iniciarPartida() {
  deportesPartida = seleccionarDeportes();

  paisesPendientes = mezclar(
  PAISES.filter((pais) => estaActivo(pais))
);

  paisActual = null;
  asignaciones = [];
  resultadosJuegos = [];
  rerollDisponible = true;
  sorteoEnCurso = false;

  botonReroll.disabled = false;
  botonReroll.textContent = "↻ Usar reroll";
  botonDraftAleatorio.disabled = false;

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

  const deporteFijoAlternativo =
    seleccionarUnoAleatorio(
      "fijo_alternativo"
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
    ...deporteFijoAlternativo,
    ...deportesGrandes,
    ...deportesMedianos,
    ...deportesPequenos
  ];
}

function seleccionarUnoAleatorio(grupo) {
  const candidatos = DEPORTES.filter(
    (deporte) =>
      deporte.grupo === grupo &&
      estaActivo(deporte)
  );

  if (candidatos.length === 0) {
    console.warn(
      `No hay deportes activos en el grupo: ${grupo}`
    );

    return [];
  }

  const indiceAleatorio = Math.floor(
    Math.random() * candidatos.length
  );

  return [candidatos[indiceAleatorio]];
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
  botonDraftAleatorio.disabled = true;

  mensajeJuego.textContent = "Sorteando país...";

  const candidatosVisuales = [
    paisSeleccionado,
    ...paisesPendientes
  ];

  let cambiosRealizados = 0;
  const totalCambios = 10;
  const velocidadSorteo = 70;

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

      botonDraftAleatorio.disabled =
        asignaciones.length > 0;

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

  const color = obtenerColor(
  nota,
  deporte.codigo
);

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
function hacerDraftAleatorio() {
  if (
    sorteoEnCurso ||
    asignaciones.length > 0 ||
    !paisActual
  ) {
    return;
  }

  botonDraftAleatorio.disabled = true;
  botonReroll.disabled = true;

  /*
    El país que acaba de salir es el primero
    del draft automático.
  */
  const paisesDraftAleatorio = [
    paisActual
  ];

  /*
    Tomamos los seis siguientes países
    del orden que ya fue sorteado al comenzar.
  */
  while (
    paisesDraftAleatorio.length <
      deportesPartida.length &&
    paisesPendientes.length > 0
  ) {
    paisesDraftAleatorio.push(
      paisesPendientes.shift()
    );
  }

  asignaciones = deportesPartida.map(
    (deporte, indice) => {
      const pais =
        paisesDraftAleatorio[indice];

      const nota = obtenerNotaPais(
        pais,
        deporte.codigo
      );

      const color = obtenerColor(
        nota,
        deporte.codigo
      );

      return {
        deporte: deporte,
        pais: pais,
        color: color
      };
    }
  );

  paisActual = null;

  terminarPartida();
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
  ({ deporte, pais, color }) => {
      const nota = obtenerNotaPais(
        pais,
        deporte.codigo
      );

      const numeroPruebas =
  Number(deporte.tamanoSimulacion);

  const variabilidad =
   Number(deporte.variabilidad);

  const medallas = simularDeporteLaboratorio(
    nota,
    numeroPruebas,
    variabilidad
  );

  const fortuna = calcularFortunaResultado(
    nota,
    numeroPruebas,
    variabilidad,
    medallas
  );

  return {
  deporte: deporte,
  pais: pais,
  color: color,
  oros: medallas.oros,
  platas: medallas.platas,
  bronces: medallas.bronces,
  fortuna: fortuna
};
    }
  );

  iniciarCeremoniaJuegos();
}

function iniciarCeremoniaJuegos() {
  resultadosCeremonia =
    ordenarResultadosCeremonia(resultadosJuegos);

  indiceCeremonia = 0;

  medalleroAcumuladoCeremonia = {
    oros: 0,
    platas: 0,
    bronces: 0
  };

  actualizarMedalleroAcumuladoCeremonia();
  mostrarDeporteCeremonia();
}


function ordenarResultadosCeremonia(resultados) {
  const resultadosGrandes = resultados.filter(
    (resultado) => {
      const codigo = resultado.deporte.codigo;
      const grupo = resultado.deporte.grupo;

      return (
        codigo === "atletismo" ||
        codigo === "natacion" ||
        grupo === "fijo_alternativo"
      );
    }
  );

  const resultadosRestantes = resultados.filter(
    (resultado) =>
      !resultadosGrandes.includes(resultado)
  );

  const grandesMezclados = mezclar(
    resultadosGrandes
  );

  const restantesMezclados = mezclar(
    resultadosRestantes
  );

  /*
    Caso normal:
    - un deporte grande abre;
    - otro deporte grande cierra;
    - el tercero aparece entre las posiciones 3 y 5.
  */
  if (grandesMezclados.length >= 3) {
    const deporteInicial =
      grandesMezclados[0];

    const deporteCentral =
      grandesMezclados[1];

    const deporteFinal =
      grandesMezclados[2];

    const orden = [
      deporteInicial,
      ...restantesMezclados,
      deporteFinal
    ];

    const posicionCentral =
      2 + Math.floor(Math.random() * 3);

    orden.splice(
      posicionCentral,
      0,
      deporteCentral
    );

    return orden;
  }

  /*
    Protección por si en el futuro cambia
    la estructura de deportes.
  */
  return mezclar(resultados);
}


function mostrarDeporteCeremonia() {
  limpiarTemporizadoresCeremonia();

  const resultado =
    resultadosCeremonia[indiceCeremonia];

  if (!resultado) {
    mostrarResultadosJuegos();
    return;
  }

  mostrarPantalla(pantallaCeremonia);

  progresoCeremonia.textContent =
    `DEPORTE ${indiceCeremonia + 1} DE ` +
    `${resultadosCeremonia.length}`;

  nombreDeporteCeremonia.textContent =
    resultado.deporte.nombre.toUpperCase();

  nombrePaisCeremonia.textContent =
    resultado.pais.nombre;

  pruebasCeremonia.textContent =
    `${resultado.deporte.tamanoSimulacion} pruebas`;

  cargarBandera(
    banderaCeremonia,
    banderaCeremoniaAlternativa,
    resultado.pais
  );

  marcoCeremonia.className =
    `marco-ceremonia eleccion-${resultado.color}`;

  resultadoCeremonia.classList.add("oculto");

  textoActuacionCeremonia.className =
    "texto-actuacion-ceremonia oculto";

  textoActuacionCeremonia.textContent = "";

  orosCeremonia.textContent = "0";
  platasCeremonia.textContent = "0";
  broncesCeremonia.textContent = "0";

  botonSiguienteDeporte.disabled = true;

  botonSiguienteDeporte.textContent =
    indiceCeremonia ===
    resultadosCeremonia.length - 1
      ? "Ver medallero final"
      : "Siguiente deporte";

  temporizadorRevelarCeremonia = setTimeout(
    revelarResultadoCeremonia,
    TIEMPO_PRESENTACION_CEREMONIA
  );
}


function revelarResultadoCeremonia() {
  const resultado =
    resultadosCeremonia[indiceCeremonia];

  if (!resultado) {
    return;
  }

  orosCeremonia.textContent =
    resultado.oros;

  platasCeremonia.textContent =
    resultado.platas;

  broncesCeremonia.textContent =
    resultado.bronces;

  resultadoCeremonia.classList.remove("oculto");

  mostrarValoracionCeremonia(
    resultado.fortuna
  );

  medalleroAcumuladoCeremonia.oros +=
    resultado.oros;

  medalleroAcumuladoCeremonia.platas +=
    resultado.platas;

  medalleroAcumuladoCeremonia.bronces +=
    resultado.bronces;

  actualizarMedalleroAcumuladoCeremonia();

  botonSiguienteDeporte.disabled = false;

  temporizadorAvanzarCeremonia = setTimeout(
    avanzarCeremonia,
    TIEMPO_LECTURA_CEREMONIA
  );
}


function mostrarValoracionCeremonia(fortuna) {
  const texto =
    obtenerFraseActuacion(fortuna.clase);

  if (!texto) {
    textoActuacionCeremonia.classList.add(
      "oculto"
    );

    return;
  }

  textoActuacionCeremonia.textContent =
    texto;

  textoActuacionCeremonia.className =
    `texto-actuacion-ceremonia ${fortuna.clase}`;
}
function saltarCeremonia() {
  limpiarTemporizadoresCeremonia();
  mostrarResultadosJuegos();
}

function obtenerFraseActuacion(clase) {
  const frases = {
    "fortuna-positiva": [
      "Gran actuación",
      "Por encima de las expectativas",
      "Excelente rendimiento",
      "Mejorando las predicciones"
    ],

    "fortuna-muy-positiva": [
      "Actuación extraordinaria",
      "Juegos inolvidables",
      "Una hazaña histórica",
      "Resultado excepcional"
    ],

    "fortuna-negativa": [
      "Actuación decepcionante",
      "Por debajo de las expectativas",
      "Resultado insuficiente",
      "No estuvo a la altura"
    ],

    "fortuna-muy-negativa": [
      "Fracaso absoluto",
      "Debacle deportiva",
      "Unos Juegos para olvidar",
      "Hundimiento inesperado"
    ]
  };

  const opciones = frases[clase];

  /*
    Si la actuación ha sido normal,
    no mostramos ningún mensaje.
  */
  if (!opciones) {
    return "";
  }

  const indiceAleatorio = Math.floor(
    Math.random() * opciones.length
  );

  return opciones[indiceAleatorio];
}


function actualizarMedalleroAcumuladoCeremonia() {
  const {
    oros,
    platas,
    bronces
  } = medalleroAcumuladoCeremonia;

  orosAcumuladosCeremonia.textContent =
    oros;

  platasAcumuladasCeremonia.textContent =
    platas;

  broncesAcumuladosCeremonia.textContent =
    bronces;

  totalAcumuladoCeremonia.textContent =
    oros + platas + bronces;
}


function avanzarCeremonia() {
  limpiarTemporizadoresCeremonia();

  botonSiguienteDeporte.disabled = true;

  const esUltimoDeporte =
    indiceCeremonia >=
    resultadosCeremonia.length - 1;

  if (esUltimoDeporte) {
    mostrarResultadosJuegos();
    return;
  }

  indiceCeremonia += 1;

  mostrarDeporteCeremonia();
}


function limpiarTemporizadoresCeremonia() {
  clearTimeout(
    temporizadorRevelarCeremonia
  );

  clearTimeout(
    temporizadorAvanzarCeremonia
  );

  temporizadorRevelarCeremonia = null;
  temporizadorAvanzarCeremonia = null;
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

      const indiceFortuna =
  resultado.fortuna.indice >= 0
    ? `+${resultado.fortuna.indice.toFixed(2)}`
    : resultado.fortuna.indice.toFixed(2);

return `
  <div class="fila-resultado eleccion-${resultado.color}">

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

    <span
      class="indicador-fortuna
      ${resultado.fortuna.clase}"
      title="
        Esperado:
        ${resultado.fortuna.puntuacionEsperada.toFixed(1)}
        puntos.
        Obtenido:
        ${resultado.fortuna.puntuacionReal}
        puntos.
      "
    >
      <strong>
        ${resultado.fortuna.simbolo}
        ${indiceFortuna}
      </strong>

      <small>
        ${resultado.fortuna.texto}
      </small>
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


function obtenerColor(nota, codigoDeporte) {
  // Escala especial de Atletismo
  if (codigoDeporte === "atletismo") {
    if (nota >= 7) {
      return "azul";
    }

    if (nota >= 5) {
      return "verde";
    }

    if (nota >= 3) {
      return "amarillo";
    }

    return "rojo";
  }

  // Escala especial de Natación
  if (codigoDeporte === "natacion") {
    if (nota >= 8) {
      return "azul";
    }

    if (nota >= 6) {
      return "verde";
    }

    if (nota >= 3) {
      return "amarillo";
    }

    return "rojo";
  }

  // Escala general para el resto de deportes
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
  pantallaCeremonia.classList.add("oculto");
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
  return elemento.activo === true;
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

function calcularFortunaResultado(
  nota,
  numeroPruebas,
  variabilidad,
  resultado
) {
  const probabilidades = calcularProbabilidadesPrueba(
    nota,
    variabilidad
  );

  /*
    Valor interno de cada resultado:

    oro = 3
    plata = 2
    bronce = 1
    sin medalla = 0
  */
  const puntuacionReal =
    resultado.oros * 3 +
    resultado.platas * 2 +
    resultado.bronces;

  /*
    Puntuación esperada en una sola prueba.
  */
  const mediaPorPrueba =
    probabilidades.oro * 3 +
    probabilidades.plata * 2 +
    probabilidades.bronce;

  /*
    E(X²) de una sola prueba.

    Oro: 3² = 9
    Plata: 2² = 4
    Bronce: 1² = 1
  */
  const mediaCuadradosPorPrueba =
    probabilidades.oro * 9 +
    probabilidades.plata * 4 +
    probabilidades.bronce;

  const varianzaPorPrueba =
    mediaCuadradosPorPrueba -
    Math.pow(mediaPorPrueba, 2);

  const puntuacionEsperada =
    mediaPorPrueba * numeroPruebas;

  const desviacionTipica =
    Math.sqrt(
      Math.max(
        0,
        varianzaPorPrueba * numeroPruebas
      )
    );

  /*
    El índice de fortuna indica cuántas desviaciones
    típicas se encuentra el resultado por encima
    o por debajo de lo esperado.
  */
  const indice =
    desviacionTipica > 0
      ? (
          puntuacionReal -
          puntuacionEsperada
        ) / desviacionTipica
      : 0;

  return {
    indice: indice,
    puntuacionReal: puntuacionReal,
    puntuacionEsperada: puntuacionEsperada,
    desviacionTipica: desviacionTipica,
    ...clasificarFortuna(indice)
  };
}


function clasificarFortuna(indice) {
  if (indice >= 2) {
    return {
      simbolo: "↑↑",
      texto: "Actuación extraordinaria",
      clase: "fortuna-muy-positiva"
    };
  }

  if (indice >= 0.75) {
    return {
      simbolo: "↑",
      texto: "Por encima de lo esperado",
      clase: "fortuna-positiva"
    };
  }

  if (indice <= -2) {
    return {
      simbolo: "↓↓",
      texto: "Gran decepción",
      clase: "fortuna-muy-negativa"
    };
  }

  if (indice <= -0.75) {
    return {
      simbolo: "↓",
      texto: "Por debajo de lo esperado",
      clase: "fortuna-negativa"
    };
  }

  return {
    simbolo: "—",
    texto: "Rendimiento esperado",
    clase: "fortuna-neutral"
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