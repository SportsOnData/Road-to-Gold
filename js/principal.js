/*
  ROAD TO GOLD · PRINCIPAL

  Inicio de partidas y conexión de todos los eventos de la interfaz.
*/

function configurarVisibilidadModoCarrera() {
  botonModoCarrera.classList.toggle(
    "oculto",
    !MOSTRAR_MODO_CARRERA
  );
}

function iniciarPartidaRapida() {
  modoJuegoActual =
    MODO_PARTIDA_RAPIDA;

  iniciarPartida();
}

function iniciarPartidaCarrera() {
  if (!estadoCarrera) {
    estadoCarrera = cargarCarrera();
  }

  modoJuegoActual =
    MODO_CARRERA;

  iniciarPartida();
}

function gestionarBotonNuevaPartida() {
  if (
    modoJuegoActual === MODO_CARRERA
  ) {
    iniciarModoCarrera();
    return;
  }

  iniciarPartidaRapida();
}

function actualizarIndicadoresModo() {
  const esCarrera =
    modoJuegoActual === MODO_CARRERA;

  indicadorModoDeportes.classList.toggle(
    "oculto",
    !esCarrera
  );

  indicadorModoDraft.classList.toggle(
    "oculto",
    !esCarrera
  );

  indicadorModoCeremonia.classList.toggle(
    "oculto",
    !esCarrera
  );

  indicadorModoResultados.classList.toggle(
    "oculto",
    !esCarrera
  );
}

function iniciarPartida() {
  actualizarIndicadoresModo();
  limpiarCelebracionRecords();
  
  deportesPartida =
    modoJuegoActual === MODO_CARRERA
      ? seleccionarDeportesCarrera()
      : seleccionarDeportes();

  const paisesDisponibles =
    obtenerPaisesDisponiblesPartida();

  paisesPendientes = mezclar(
    paisesDisponibles
  );

  paisActual = null;
  asignaciones = [];
  resultadosJuegos = [];
  rerollUsadoEnEdicion = false;
  esperandoPaisReroll = false;
  codigoPaisRerollEnEdicion = "";
  const rerollDisponibleEnEsteModo =
    modoJuegoActual ===
      MODO_PARTIDA_RAPIDA ||
    (
      modoJuegoActual ===
        MODO_CARRERA &&
      estadoCarrera
        ?.rerollDesbloqueado
    );

  rerollDisponible =
    Boolean(
      rerollDisponibleEnEsteModo
    );

  sorteoEnCurso = false;

  botonReroll.classList.toggle(
    "oculto",
    !rerollDisponibleEnEsteModo
  );

  botonReroll.disabled =
    !rerollDisponible;

botonReroll.textContent =
  "↻ Usar reroll";

botonDraftAleatorio.disabled = false;

  botonComenzarDraft.disabled = true;

  mostrarPantalla(pantallaDeportes);
  mostrarPresentacionDeportes();
}


const URL_COMPARTIR_ROAD_TO_GOLD =
  "https://sportsondata.github.io/Road-to-Gold/";

function enriquecerResultadoParaCompartir(
  resultado
) {
  const pruebas =
    resultado.deporte.tamanoSimulacion || 0;

  const medallasPorPrueba =
    resultado.deporte.medallasPorPrueba || 3;

  const oportunidades =
    pruebas * medallasPorPrueba;

  const total =
    resultado.oros +
    resultado.platas +
    resultado.bronces;

  return {
    ...resultado,
    total: total,

    puntuacionNormalizada:
      oportunidades > 0
        ? total / oportunidades
        : 0,

    indiceFortuna:
      resultado.fortuna?.indice || 0,

    claseFortuna:
      resultado.fortuna?.clase ||
      "fortuna-neutral",

    simboloFortuna:
      resultado.fortuna?.simbolo || "—"
  };
}

function ordenarPorRendimientoNormalizado(
  resultados
) {
  return [...resultados].sort(
    (a, b) =>
      b.puntuacionNormalizada -
        a.puntuacionNormalizada ||
      b.oros - a.oros ||
      b.total - a.total
  );
}

function obtenerSiguienteMejorNormalizado(
  ordenados,
  usados
) {
  return ordenados.find(
    (resultado) =>
      !usados.has(resultado)
  );
}

function obtenerResultadosDestacadosParaCompartir() {
  const resultados =
    resultadosJuegos.map(
      enriquecerResultadoParaCompartir
    );

  const normalizados =
    ordenarPorRendimientoNormalizado(
      resultados
    );

  const usados = new Set();
  const seleccion = [];

  const agregar = (
    resultado,
    etiqueta
  ) => {
    if (
      !resultado ||
      usados.has(resultado)
    ) {
      return false;
    }

    usados.add(resultado);

    seleccion.push({
      resultado: resultado,
      etiqueta: etiqueta
    });

    return true;
  };

  const mejorNormalizado =
    normalizados[0];

  const doblesVerdes =
    resultados
      .filter(
        (resultado) =>
          resultado.claseFortuna ===
          "fortuna-muy-positiva"
      )
      .sort(
        (a, b) =>
          b.indiceFortuna -
          a.indiceFortuna
      );

  const doblesRojas =
    resultados
      .filter(
        (resultado) =>
          resultado.claseFortuna ===
          "fortuna-muy-negativa"
      )
      .sort(
        (a, b) =>
          a.indiceFortuna -
          b.indiceFortuna
      );

  const intensidadVerde =
    doblesVerdes
      .slice(0, 2)
      .reduce(
        (total, resultado) =>
          total + resultado.indiceFortuna,
        0
      );

  const intensidadRoja =
    doblesRojas
      .slice(0, 2)
      .reduce(
        (total, resultado) =>
          total +
          Math.abs(resultado.indiceFortuna),
        0
      );

  if (
    doblesVerdes.length >= 2 &&
    (
      doblesRojas.length < 2 ||
      intensidadVerde >= intensidadRoja
    )
  ) {
    doblesVerdes
      .slice(0, 2)
      .forEach((resultado) => {
        agregar(
          resultado,
          "GOLPE DE FORTUNA"
        );
      });

    agregar(
      mejorNormalizado,
      "MEJOR RENDIMIENTO"
    );

    while (
      seleccion.length < 3
    ) {
      agregar(
        obtenerSiguienteMejorNormalizado(
          normalizados,
          usados
        ),
        "MEJOR RENDIMIENTO"
      );
    }

    return seleccion.slice(0, 3);
  }

  if (
    doblesRojas.length >= 2
  ) {
    doblesRojas
      .slice(0, 2)
      .forEach((resultado) => {
        agregar(
          resultado,
          "DESASTRE ABSOLUTO"
        );
      });

    agregar(
      mejorNormalizado,
      "MEJOR RENDIMIENTO"
    );

    while (
      seleccion.length < 3
    ) {
      agregar(
        obtenerSiguienteMejorNormalizado(
          normalizados,
          usados
        ),
        "MEJOR RENDIMIENTO"
      );
    }

    return seleccion.slice(0, 3);
  }

  agregar(
    mejorNormalizado,
    "MEJOR RENDIMIENTO"
  );

  const masAfortunado =
    resultados
      .filter(
        (resultado) =>
          (
            resultado.claseFortuna ===
              "fortuna-positiva" ||
            resultado.claseFortuna ===
              "fortuna-muy-positiva"
          ) &&
          !usados.has(resultado)
      )
      .sort(
        (a, b) =>
          b.indiceFortuna -
          a.indiceFortuna
      )[0];

  if (
    !agregar(
      masAfortunado,
      "GOLPE DE FORTUNA"
    )
  ) {
    agregar(
      obtenerSiguienteMejorNormalizado(
        normalizados,
        usados
      ),
      "MEJOR RENDIMIENTO"
    );
  }

  const peorSuerte =
    resultados
      .filter(
        (resultado) =>
          (
            resultado.claseFortuna ===
              "fortuna-negativa" ||
            resultado.claseFortuna ===
              "fortuna-muy-negativa"
          ) &&
          !usados.has(resultado)
      )
      .sort(
        (a, b) =>
          a.indiceFortuna -
          b.indiceFortuna
      )[0];

  if (
    !agregar(
      peorSuerte,
      "DESASTRE ABSOLUTO"
    )
  ) {
    agregar(
      obtenerSiguienteMejorNormalizado(
        normalizados,
        usados
      ),
      "MEJOR RENDIMIENTO"
    );
  }

  while (
    seleccion.length < 3
  ) {
    agregar(
      obtenerSiguienteMejorNormalizado(
        normalizados,
        usados
      ),
      "MEJOR RENDIMIENTO"
    );
  }

  return seleccion.slice(0, 3);
}

function dibujarRectanguloRedondeado(
  contexto,
  x,
  y,
  ancho,
  alto,
  radio
) {
  contexto.beginPath();

  if (
    typeof contexto.roundRect ===
    "function"
  ) {
    contexto.roundRect(
      x,
      y,
      ancho,
      alto,
      radio
    );

    return;
  }

  const r =
    Math.min(
      radio,
      ancho / 2,
      alto / 2
    );

  contexto.moveTo(x + r, y);
  contexto.lineTo(x + ancho - r, y);

  contexto.quadraticCurveTo(
    x + ancho,
    y,
    x + ancho,
    y + r
  );

  contexto.lineTo(
    x + ancho,
    y + alto - r
  );

  contexto.quadraticCurveTo(
    x + ancho,
    y + alto,
    x + ancho - r,
    y + alto
  );

  contexto.lineTo(x + r, y);

  contexto.quadraticCurveTo(
    x,
    y + alto,
    x,
    y + alto - r
  );

  contexto.lineTo(x, y + r);

  contexto.quadraticCurveTo(
    x,
    y,
    x + r,
    y
  );

  contexto.closePath();
}

function ajustarTextoCanvas(
  contexto,
  texto,
  anchoMaximo
) {
  if (
    contexto.measureText(texto).width <=
    anchoMaximo
  ) {
    return texto;
  }

  let textoCortado = texto;

  while (
    textoCortado.length > 1 &&
    contexto.measureText(
      textoCortado + "…"
    ).width > anchoMaximo
  ) {
    textoCortado =
      textoCortado.slice(0, -1);
  }

  return textoCortado + "…";
}

function formatearIndiceFortunaCompartir(
  indice
) {
  return indice >= 0
    ? `+${indice.toFixed(2)}`
    : indice.toFixed(2);
}

async function generarImagenResultadoCompartible() {
  const canvas =
    canvasCompartirResultado;

  const contexto =
    canvas.getContext("2d");

  if (!contexto) {
    throw new Error(
      "El navegador no permite crear el canvas."
    );
  }

  const ancho = canvas.width;
  const alto = canvas.height;

  const oros =
    resultadosJuegos.reduce(
      (total, resultado) =>
        total + resultado.oros,
      0
    );

  const platas =
    resultadosJuegos.reduce(
      (total, resultado) =>
        total + resultado.platas,
      0
    );

  const bronces =
    resultadosJuegos.reduce(
      (total, resultado) =>
        total + resultado.bronces,
      0
    );

  const totalMedallas =
    oros + platas + bronces;

  const destacados =
    obtenerResultadosDestacadosParaCompartir();

  contexto.clearRect(
    0,
    0,
    ancho,
    alto
  );

  const fondo =
    contexto.createLinearGradient(
      0,
      0,
      0,
      alto
    );

  fondo.addColorStop(
    0,
    "#142957"
  );

  fondo.addColorStop(
    1,
    "#07142f"
  );

  contexto.fillStyle = fondo;

  contexto.fillRect(
    0,
    0,
    ancho,
    alto
  );

  contexto.strokeStyle =
    "#f4c63f";

  contexto.lineWidth = 5;

  dibujarRectanguloRedondeado(
    contexto,
    42,
    42,
    ancho - 84,
    alto - 84,
    34
  );

  contexto.stroke();

  contexto.textAlign = "center";
  contexto.fillStyle = "#f4c63f";
  contexto.font = "700 30px Arial";
  contexto.fillText(
    "ROAD TO GOLD",
    ancho / 2,
    115
  );

  contexto.fillStyle = "#ffffff";
  contexto.font = "800 48px Arial";
  contexto.fillText(
    "PARTIDA RÁPIDA",
    ancho / 2,
    180
  );

  contexto.fillStyle = "#aebbd5";
  contexto.font = "500 26px Arial";
  contexto.fillText(
    "Tu delegación olímpica",
    ancho / 2,
    225
  );

  contexto.fillStyle = "#f4c63f";
  contexto.font = "900 112px Arial";
  contexto.fillText(
    String(totalMedallas),
    ancho / 2,
    360
  );

  contexto.fillStyle = "#ffffff";
  contexto.font = "700 30px Arial";
  contexto.fillText(
    "MEDALLAS",
    ancho / 2,
    405
  );

  const medallas = [
    ["🥇", oros, "OROS"],
    ["🥈", platas, "PLATAS"],
    ["🥉", bronces, "BRONCES"]
  ];

  medallas.forEach(
    ([icono, valor, etiqueta], indice) => {
      const x =
        195 + indice * 345;

      contexto.fillStyle =
        "rgba(255,255,255,0.055)";

      dibujarRectanguloRedondeado(
        contexto,
        x - 135,
        445,
        270,
        145,
        22
      );

      contexto.fill();

      contexto.fillStyle = "#ffffff";
      contexto.font = "700 35px Arial";

      contexto.fillText(
        `${icono} ${valor}`,
        x,
        505
      );

      contexto.fillStyle = "#aebbd5";
      contexto.font = "700 18px Arial";

      contexto.fillText(
        etiqueta,
        x,
        548
      );
    }
  );

  contexto.fillStyle = "#ffffff";
  contexto.font = "800 29px Arial";

  contexto.fillText(
    "HISTORIAS DE LA DELEGACIÓN",
    ancho / 2,
    655
  );

  destacados.forEach(
    (destacado, indice) => {
      const resultado =
        destacado.resultado;

      const y =
        700 + indice * 160;

      contexto.fillStyle =
        "rgba(255,255,255,0.055)";

      dibujarRectanguloRedondeado(
        contexto,
        82,
        y,
        ancho - 164,
        132,
        20
      );

      contexto.fill();

      contexto.fillStyle =
        "rgba(255,255,255,0.08)";

      dibujarRectanguloRedondeado(
        contexto,
        110,
        y + 25,
        135,
        82,
        16
      );

      contexto.fill();

      contexto.textAlign = "center";
      contexto.fillStyle = "#f4c63f";
      contexto.font = "800 26px Arial";

      contexto.fillText(
        resultado.pais.codigo,
        177,
        y + 77
      );

      contexto.textAlign = "left";
      contexto.fillStyle = "#f4c63f";
      contexto.font = "800 17px Arial";

      contexto.fillText(
        destacado.etiqueta,
        280,
        y + 30
      );

      contexto.fillStyle = "#ffffff";
      contexto.font = "800 29px Arial";

      contexto.fillText(
        ajustarTextoCanvas(
          contexto,
          resultado.deporte.nombre,
          335
        ),
        280,
        y + 65
      );

      contexto.fillStyle = "#aebbd5";
      contexto.font = "500 20px Arial";

      contexto.fillText(
        ajustarTextoCanvas(
          contexto,
          resultado.pais.nombre,
          335
        ),
        280,
        y + 96
      );

      contexto.textAlign = "right";
      contexto.fillStyle = "#ffffff";
      contexto.font = "700 25px Arial";

      contexto.fillText(
        `🥇 ${resultado.oros}  ` +
        `🥈 ${resultado.platas}  ` +
        `🥉 ${resultado.bronces}`,
        ancho - 105,
        y + 58
      );

      contexto.fillStyle =
        resultado.indiceFortuna >= 0
          ? "#66d68a"
          : "#ff7777";

      contexto.font = "800 23px Arial";

      contexto.fillText(
        `${resultado.simboloFortuna} ` +
        `${formatearIndiceFortunaCompartir(
          resultado.indiceFortuna
        )}`,
        ancho - 105,
        y + 94
      );
    }
  );

  contexto.textAlign = "center";
  contexto.fillStyle = "#f4c63f";
  contexto.font = "800 34px Arial";

  contexto.fillText(
    "¿PUEDES SUPERAR MI DELEGACIÓN?",
    ancho / 2,
    1230
  );

  contexto.fillStyle = "#ffffff";
  contexto.font = "600 25px Arial";

  contexto.fillText(
    URL_COMPARTIR_ROAD_TO_GOLD,
    ancho / 2,
    1276
  );

  return new Promise(
    (resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(
              new Error(
                "No se pudo crear la imagen."
              )
            );
          }
        },
        "image/png"
      );
    }
  );
}

function descargarImagenResultado(blob) {
  const url =
    URL.createObjectURL(blob);

  const enlace =
    document.createElement("a");

  enlace.href = url;

  enlace.download =
    "road-to-gold-resultado.png";

  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();

  setTimeout(
    () =>
      URL.revokeObjectURL(url),
    1000
  );
}

async function compartirResultadoPartidaRapida() {
  if (
    modoJuegoActual !==
    MODO_PARTIDA_RAPIDA
  ) {
    return;
  }

  botonCompartirResultado.disabled =
    true;

  mensajeCompartirResultado.textContent =
    "Preparando imagen...";

  mensajeCompartirResultado.classList.remove(
    "oculto"
  );

  try {
    const blob =
      await generarImagenResultadoCompartible();

    const archivo = new File(
      [blob],
      "road-to-gold-resultado.png",
      {
        type: "image/png"
      }
    );

    const textoCompartir =
      "¿Puedes superar mi delegación " +
      "en Road to Gold?\n" +
      URL_COMPARTIR_ROAD_TO_GOLD;

    if (
      navigator.share &&
      navigator.canShare?.({
        files: [archivo]
      })
    ) {
      await navigator.share({
        title:
          "Mi delegación en Road to Gold",

        text:
          textoCompartir,

        files: [archivo]
      });

      mensajeCompartirResultado.textContent =
        "Resultado compartido.";
    } else {
      descargarImagenResultado(blob);

      mensajeCompartirResultado.textContent =
        "Imagen descargada.";
    }
  } catch (error) {
    if (
      error?.name === "AbortError"
    ) {
      mensajeCompartirResultado.textContent =
        "Compartición cancelada.";
    } else {
      console.error(
        "Error al compartir resultado:",
        error
      );

      mensajeCompartirResultado.textContent =
        "No se pudo generar la imagen.";
    }
  } finally {
    botonCompartirResultado.disabled =
      false;

    setTimeout(() => {
      mensajeCompartirResultado.classList.add(
        "oculto"
      );
    }, 2800);
  }
}

function volverAlInicioDesdeResultados() {
  mostrarPantalla(pantallaInicio);
}


/* -------------------------------- */
/* EVENTOS E INICIO DE LA APLICACIÓN */
/* -------------------------------- */

botonEmpezar.addEventListener(
  "click",
  iniciarPartidaRapida
);

botonModoCarrera.addEventListener("click", () => {
  iniciarModoCarrera();
});

botonVolverInicioCarrera.addEventListener("click", () => {
  mostrarPantalla(pantallaInicio);
});

botonBorrarCarrera.addEventListener(
  "click",
  borrarCarreraGuardada
);

botonJugarCarrera.addEventListener(
  "click",
  iniciarPartidaCarrera
);



botonTutorialVerPaises.addEventListener(
  "click",
  mostrarPaisesTutorialInicial
);

botonTutorialVerDeportes.addEventListener(
  "click",
  mostrarDeportesTutorialInicial
);

botonTutorialComenzar.addEventListener(
  "click",
  completarTutorialInicialCarrera
);

botonAbrirEstadisticas.addEventListener(
  "click",
  abrirPantallaEstadisticas
);

botonVolverEstadisticas.addEventListener(
  "click",
  iniciarModoCarrera
);

filtrosEstadisticas.addEventListener(
  "click",
  (evento) => {
    const boton = evento.target.closest(
      "[data-seccion-estadisticas]"
    );

    if (!boton) {
      return;
    }

    cambiarSeccionEstadisticas(
      boton.dataset.seccionEstadisticas,
      boton
    );
  }
);

botonAbrirLogros.addEventListener(
  "click",
  abrirPantallaLogros
);

botonVerTodosLogros.addEventListener(
  "click",
  abrirPantallaLogros
);

botonVolverLogros.addEventListener(
  "click",
  iniciarModoCarrera
);

filtrosLogros.addEventListener(
  "click",
  (evento) => {
    const boton = evento.target.closest(
      "[data-categoria-logro]"
    );

    if (!boton) {
      return;
    }

    cambiarCategoriaLogros(
      boton.dataset.categoriaLogro,
      boton
    );
  }
);


botonLimpiarRecords.addEventListener(
  "click",
  limpiarRecordsGuardados
);
botonNuevaPartida.addEventListener(
  "click",
  gestionarBotonNuevaPartida
);

botonCompartirResultado.addEventListener(
  "click",
  compartirResultadoPartidaRapida
);

botonVolverInicioResultados.addEventListener(
  "click",
  volverAlInicioDesdeResultados
);
botonComenzarDraft.addEventListener("click", comenzarDraft);
botonComenzarJuegos.addEventListener("click", comenzarJuegos);
botonReroll.addEventListener("click", usarReroll);

botonVolverInicioDraft.addEventListener(
  "click",
  () => {
    mostrarPantalla(pantallaInicio);
  }
);
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
botonGuardarNombreDelegacion.addEventListener(
  "click",
  guardarNombreDelegacion
);

botonPosponerNombreDelegacion.addEventListener(
  "click",
  posponerNombreDelegacion
);

botonElegirEstadosUnidos.addEventListener(
  "click",
  () => {
    elegirPotenciaCarrera("USA");
  }
);

botonElegirChina.addEventListener(
  "click",
  () => {
    elegirPotenciaCarrera("CHN");
  }
);

botonContinuarNivel4.addEventListener(
  "click",
  completarRecompensaNivel4
);

botonesDeporteColectivo.forEach((boton) => {
  boton.addEventListener("click", () => {
    elegirDeporteColectivoCarrera(
      boton.dataset.deporteColectivo
    );
  });
});



botonIniciarSorteoNivel7.addEventListener(
  "click",
  gestionarBotonSorteoNivel7
);

botonCompletarNivel7.addEventListener(
  "click",
  completarRecompensaNivel7
);

botonContinuarTrasBeta.addEventListener(
  "click",
  continuarTrasBetaSuperada
);

botonIniciarSorteoNivel6.addEventListener(
  "click",
  gestionarBotonSorteoNivel6
);

botonesPaisEleccionNivel6.forEach(
  (boton) => {
    boton.addEventListener(
      "click",
      () => {
        elegirSegundoPaisNivel6(
          boton.dataset.paisNivel6
        );
      }
    );
  }
);

botonCompletarNivel6.addEventListener(
  "click",
  completarRecompensaNivel6
);

botonEditarNombreDelegacion.addEventListener(
  "click",
  abrirModalNombreDelegacion
);

inputNombreDelegacion.addEventListener(
  "keydown",
  (evento) => {
    if (evento.key === "Enter") {
      guardarNombreDelegacion();
    }
  }
);

recordOros.addEventListener("click", () => {
  abrirRecord(
    CLAVE_RECORD_OROS,
    "Récord de oros"
  );
});

recordMedallas.addEventListener("click", () => {
  abrirRecord(
    CLAVE_RECORD_MEDALLAS,
    "Récord de medallas"
  );
});

botonVolverResultados.addEventListener(
  "click",
  () => {
    mostrarPantalla(pantallaResultados);
  }
);

configurarVisibilidadModoCarrera();
actualizarTarjetasRecords();
