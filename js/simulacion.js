/*
  ROAD TO GOLD · SIMULACION

  Ceremonia, resultados y conexión con el motor olímpico.
*/

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

  const medallas = simularDeporte(
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

    const numeroTotalMedallas =
    orosAcumulados +
    platasAcumuladas +
    broncesAcumulados;

  totalMedallas.textContent =
    numeroTotalMedallas;

  if (
    modoJuegoActual === MODO_CARRERA &&
    estadoCarrera
  ) {
    tituloResultadosJuegos.textContent =
      "Medallero de la delegación";

    nombreDelegacionResultados.textContent =
      estadoCarrera.nombreDelegacion ||
      "Tu delegación";

    nombreDelegacionResultados.classList.remove(
      "oculto"
    );
  } else {
    tituloResultadosJuegos.textContent =
      "Tu medallero";

    nombreDelegacionResultados.classList.add(
      "oculto"
    );
  }

    if (
  modoJuegoActual === MODO_CARRERA
) {
  limpiarCelebracionRecords();

  zonaRecords.classList.add("oculto");

  botonNuevaPartida.textContent =
    "Volver al menú de Carrera";

  const resumenCarrera =
    registrarResultadosCarrera();

  mostrarProgresoResultadoCarrera(
    resumenCarrera
  );

  mostrarPantalla(pantallaResultados);

  return;
}
resumenProgresoCarrera.classList.add(
  "oculto"
);

resumenLogrosConseguidos.classList.add(
  "oculto"
);

resumenRecordsCarrera.classList.add(
  "oculto"
);

listaLogrosConseguidos.innerHTML = "";
listaRecordsCarrera.innerHTML = "";

zonaRecords.classList.remove("oculto");

botonNuevaPartida.textContent =
  "Nueva partida";

const estadoRecords =
  guardarRecordsPartida(
    orosAcumulados,
    platasAcumuladas,
    broncesAcumulados
  );

actualizarTarjetasRecords();

mostrarPantalla(pantallaResultados);

mostrarCelebracionRecords(
  estadoRecords,
  orosAcumulados,
  numeroTotalMedallas
);
}
