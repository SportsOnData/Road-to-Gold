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
  "sportsondata.github.io/Road-to-Gold/";

function obtenerResultadosDestacadosParaCompartir() {
  return [...resultadosJuegos]
    .map((resultado) => {
      const pruebas =
        resultado.deporte
          .tamanoSimulacion || 0;

      const medallasPorPrueba =
        resultado.deporte
          .medallasPorPrueba || 3;

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
            : 0
      };
    })
    .sort(
      (a, b) =>
        b.puntuacionNormalizada -
          a.puntuacionNormalizada ||
        b.oros - a.oros ||
        b.total - a.total
    )
    .slice(0, 3);
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
  contexto.roundRect(
    x,
    y,
    ancho,
    alto,
    radio
  );
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

async function generarImagenResultadoCompartible() {
  const canvas =
    canvasCompartirResultado;

  const contexto =
    canvas.getContext("2d");

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

  contexto.fillStyle =
    "#f4c63f";

  contexto.font =
    "700 30px Arial";

  contexto.fillText(
    "ROAD TO GOLD",
    ancho / 2,
    115
  );

  contexto.fillStyle =
    "#ffffff";

  contexto.font =
    "800 48px Arial";

  contexto.fillText(
    "PARTIDA RÁPIDA",
    ancho / 2,
    180
  );

  contexto.fillStyle =
    "#aebbd5";

  contexto.font =
    "500 26px Arial";

  contexto.fillText(
    "Tu delegación olímpica",
    ancho / 2,
    225
  );

  contexto.fillStyle =
    "#f4c63f";

  contexto.font =
    "900 112px Arial";

  contexto.fillText(
    String(totalMedallas),
    ancho / 2,
    360
  );

  contexto.fillStyle =
    "#ffffff";

  contexto.font =
    "700 30px Arial";

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

      contexto.fillStyle =
        "#ffffff";

      contexto.font =
        "700 35px Arial";

      contexto.fillText(
        `${icono} ${valor}`,
        x,
        505
      );

      contexto.fillStyle =
        "#aebbd5";

      contexto.font =
        "700 18px Arial";

      contexto.fillText(
        etiqueta,
        x,
        548
      );
    }
  );

  contexto.fillStyle =
    "#ffffff";

  contexto.font =
    "800 29px Arial";

  contexto.fillText(
    "MIS 3 MEJORES RENDIMIENTOS",
    ancho / 2,
    655
  );


  destacados.forEach(
    (resultado, indice) => {
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
    115,
    y + 25,
    125,
    82,
    16
  );

  contexto.fill();

  contexto.fillStyle =
    "#f4c63f";

  contexto.font =
    "800 26px Arial";

  contexto.textAlign =
    "center";

  contexto.fillText(
    resultado.pais.codigo,
    177,
    y + 76
  );

      contexto.textAlign = "left";

      contexto.fillStyle =
        "#ffffff";

      contexto.font =
        "800 30px Arial";

      contexto.fillText(
        ajustarTextoCanvas(
          contexto,
          resultado.deporte.nombre,
          390
        ),
        280,
        y + 52
      );

      contexto.fillStyle =
        "#aebbd5";

      contexto.font =
        "500 21px Arial";

      contexto.fillText(
        ajustarTextoCanvas(
          contexto,
          resultado.pais.nombre,
          390
        ),
        280,
        y + 88
      );

      contexto.textAlign =
        "right";

      contexto.fillStyle =
        "#ffffff";

      contexto.font =
        "700 27px Arial";

      contexto.fillText(
        `🥇 ${resultado.oros}   ` +
        `🥈 ${resultado.platas}   ` +
        `🥉 ${resultado.bronces}`,
        ancho - 115,
        y + 73
      );
    }
  );

  contexto.textAlign = "center";

  contexto.fillStyle =
    "#f4c63f";

  contexto.font =
    "800 34px Arial";

  contexto.fillText(
    "¿PUEDES SUPERAR MI DELEGACIÓN?",
    ancho / 2,
    1230
  );

  contexto.fillStyle =
    "#ffffff";

  contexto.font =
    "600 25px Arial";

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
          "¿Puedes superar mi delegación?",
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
