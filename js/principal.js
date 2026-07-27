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
