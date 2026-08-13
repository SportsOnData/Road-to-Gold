/*
  ROAD TO GOLD · CARRERA

  Estado, guardado, experiencia, niveles y progreso del modo Carrera.
*/

function iniciarModoCarrera() {
  estadoCarrera = cargarCarrera();

  actualizarHubCarrera();

  if (
    estadoCarrera.juegosDisputados === 0 &&
    !estadoCarrera.tutorialInicialVisto
  ) {
    abrirTutorialInicialCarrera();
    return;
  }

  mostrarPantalla(pantallaCarrera);

  setTimeout(
    mostrarSiguienteRecompensaPendiente,
    250
  );
}

function crearEstadoInicialCarrera() {
  return structuredClone(
    ESTADO_INICIAL_CARRERA
  );
}

function cargarCarrera() {
  const textoGuardado =
    localStorage.getItem(CLAVE_CARRERA);

  if (!textoGuardado) {
    const nuevaCarrera =
      crearEstadoInicialCarrera();

    guardarCarrera(nuevaCarrera);

    return nuevaCarrera;
  }

  try {
    const carreraGuardada =
  JSON.parse(textoGuardado);

const carreraCompletada =
  completarEstadoCarrera(
    carreraGuardada
  );

guardarCarrera(carreraCompletada);

return carreraCompletada;
  } catch (error) {
    console.warn(
      "No se pudo leer la Carrera guardada.",
      error
    );

    const nuevaCarrera =
      crearEstadoInicialCarrera();

    guardarCarrera(nuevaCarrera);

    return nuevaCarrera;
  }
}

function completarEstadoCarrera(carrera) {
  const estadoCompleto = {
    ...crearEstadoInicialCarrera(),
    ...carrera
  };
  estadoCompleto.personalizacionDelegacionDesbloqueada =
    carrera.personalizacionDelegacionDesbloqueada ||
    carrera.nivel >= 2;

  estadoCompleto.potenciaElegida =
    carrera.potenciaElegida || "";

  estadoCompleto.deporteColectivoElegido =
    carrera.deporteColectivoElegido || "";

  estadoCompleto.paisAleatorioNivel6 =
    carrera.paisAleatorioNivel6 || "";

  estadoCompleto.paisElegidoNivel6 =
    carrera.paisElegidoNivel6 || "";

  estadoCompleto.nivel6Completado =
    Boolean(carrera.nivel6Completado);

  estadoCompleto.paisTrampaNivel7 =
    carrera.paisTrampaNivel7 || "";

  estadoCompleto.nivel7Completado =
    Boolean(carrera.nivel7Completado);

  estadoCompleto.ochoParticipantesDesbloqueados =
    Boolean(
      carrera.ochoParticipantesDesbloqueados
    );

  estadoCompleto.faseBetaSuperada =
    Boolean(carrera.faseBetaSuperada);

  estadoCompleto.tutorialInicialVisto =
    Boolean(carrera.tutorialInicialVisto);

  estadoCompleto.recompensasPendientes =
    Array.isArray(carrera.recompensasPendientes)
      ? [...carrera.recompensasPendientes]
      : [];

  estadoCompleto.recompensasPendientes =
    estadoCompleto.recompensasPendientes.map(
      (recompensa) =>
        recompensa ===
        "nivel_4_tiro_logros"
          ? "nivel_4_tiro_logros"
          : recompensa
    );

  if (
    estadoCompleto.nivel >= 2 &&
    !estadoCompleto.nombreDelegacion &&
    !estadoCompleto.recompensasPendientes.includes(
      "nombre_delegacion"
    )
  ) {
    estadoCompleto.recompensasPendientes.push(
      "nombre_delegacion"
    );
  }

  if (
    estadoCompleto.nivel >= 3 &&
    !estadoCompleto.potenciaElegida &&
    !estadoCompleto.recompensasPendientes.includes(
      "elegir_potencia"
    )
  ) {
    estadoCompleto.recompensasPendientes.push(
      "elegir_potencia"
    );
  }

  const recompensaNivel4Incompleta =
    !estadoCompleto.deportesDesbloqueados.includes(
      "tiro"
    ) ||
    !estadoCompleto.paisesDesbloqueados.includes(
      "CAN"
    ) ||
    !estadoCompleto.logrosDesbloqueados;

  if (
    estadoCompleto.nivel >= 4 &&
    recompensaNivel4Incompleta &&
    !estadoCompleto.recompensasPendientes.includes(
      "nivel_4_tiro_logros"
    )
  ) {
    estadoCompleto.recompensasPendientes.push(
      "nivel_4_tiro_logros"
    );
  }

  const recompensaNivel5Incompleta =
    !estadoCompleto.deporteColectivoElegido ||
    !estadoCompleto.rerollDesbloqueado;

  if (
    estadoCompleto.nivel >= 5 &&
    recompensaNivel5Incompleta &&
    !estadoCompleto.recompensasPendientes.includes(
      "elegir_deporte_colectivo"
    )
  ) {
    estadoCompleto.recompensasPendientes.push(
      "elegir_deporte_colectivo"
    );
  }

  if (
    estadoCompleto.nivel >= 6 &&
    !estadoCompleto.nivel6Completado &&
    !estadoCompleto.recompensasPendientes.includes(
      "nivel_6_dos_paises_ciclismo"
    )
  ) {
    estadoCompleto.recompensasPendientes.push(
      "nivel_6_dos_paises_ciclismo"
    );
  }

  if (
    estadoCompleto.nivel >= 7 &&
    !estadoCompleto.nivel7Completado &&
    !estadoCompleto.recompensasPendientes.includes(
      "nivel_7_pais_tenis_ocho"
    )
  ) {
    estadoCompleto.recompensasPendientes.push(
      "nivel_7_pais_tenis_ocho"
    );
  }

  if (
    estadoCompleto.nivel >= 8 &&
    !estadoCompleto.faseBetaSuperada &&
    !estadoCompleto.recompensasPendientes.includes(
      "nivel_8_beta_superada"
    )
  ) {
    estadoCompleto.recompensasPendientes.push(
      "nivel_8_beta_superada"
    );
  }
  estadoCompleto.recordsConExperienciaDesbloqueados =
    Boolean(
      carrera.recordsConExperienciaDesbloqueados
    );

  estadoCompleto.logrosDesbloqueados =
    Boolean(carrera.logrosDesbloqueados);

  if (
    estadoCompleto.nivel >= 4 &&
    estadoCompleto.juegosDisputados > 0 &&
    !estadoCompleto.logrosConseguidos.includes(
      "ceremonia_inauguracion"
    )
  ) {
    estadoCompleto.logrosConseguidos.push(
      "ceremonia_inauguracion"
    );

    estadoCompleto.detalleLogros[
      "ceremonia_inauguracion"
    ] = {
      edicion: 1,
      fecha:
        estadoCompleto.historialEdiciones?.[0]?.fecha ||
        new Date().toISOString()
    };

    estadoCompleto.progresoLogros[
      "ceremonia_inauguracion"
    ] = {
      actual: 1,
      objetivo: 1,
      texto: "Completado",
      edicion: 1
    };
  }

  /*
    Compatibilidad con partidas anteriores:
    los récords dan EXP desde nivel 3,
    los logros desde nivel 4 y el reroll
    desde nivel 5.
  */
  if (estadoCompleto.nivel >= 3) {
    estadoCompleto
      .recordsConExperienciaDesbloqueados =
        true;
  }

  if (estadoCompleto.nivel >= 4) {
    estadoCompleto.logrosDesbloqueados =
      true;
  }

  if (estadoCompleto.nivel >= 5) {
    estadoCompleto.rerollDesbloqueado =
      true;
  }

  estadoCompleto.detalleLogros = {
    ...(carrera.detalleLogros || {})
  };

  estadoCompleto.progresoLogros = {
    ...(carrera.progresoLogros || {})
  };

  estadoCompleto.estadisticasLogros = {
    orosDesdeDesbloqueo:
      carrera.estadisticasLogros
        ?.orosDesdeDesbloqueo || 0,

    medallasPorDeporte: {
      ...(carrera.estadisticasLogros
        ?.medallasPorDeporte || {})
    },

    medallasPorPais: {
      ...(carrera.estadisticasLogros
        ?.medallasPorPais || {})
    },

    medallasPaisesRojos:
      carrera.estadisticasLogros
        ?.medallasPaisesRojos || 0,

    medallasDeportesEquipo:
      carrera.estadisticasLogros
        ?.medallasDeportesEquipo || 0,

    rerollsUsados:
      carrera.estadisticasLogros
        ?.rerollsUsados || 0,

    recordsGlobalesOrosBatidos:
      carrera.estadisticasLogros
        ?.recordsGlobalesOrosBatidos || 0,

    recordsGlobalesMedallasBatidos:
      carrera.estadisticasLogros
        ?.recordsGlobalesMedallasBatidos || 0,

    rachaBaloncestoOro:
      carrera.estadisticasLogros
        ?.rachaBaloncestoOro || 0,

    mejorRachaBaloncestoOro:
      carrera.estadisticasLogros
        ?.mejorRachaBaloncestoOro || 0,

    maxDefensasRecordDeportivo:
      carrera.estadisticasLogros
        ?.maxDefensasRecordDeportivo || 0,

    maxAntiguedadRecordSuperado:
      carrera.estadisticasLogros
        ?.maxAntiguedadRecordSuperado || 0
  };

  estadoCompleto.historialEdiciones =
    Array.isArray(carrera.historialEdiciones)
      ? [...carrera.historialEdiciones]
      : [];

  estadoCompleto.medalleroTotal = {
    oros:
      carrera.medalleroTotal?.oros || 0,

    platas:
      carrera.medalleroTotal?.platas || 0,

    bronces:
      carrera.medalleroTotal?.bronces || 0
  };

  estadoCompleto.progresoPaises =
    carrera.progresoPaises || {};

  Object.values(
    estadoCompleto.progresoPaises
  ).forEach((progresoPais) => {
    progresoPais.deportesConMedalla =
      Array.isArray(
        progresoPais.deportesConMedalla
      )
        ? progresoPais.deportesConMedalla
        : [];

    progresoPais.deportesConOro =
      Array.isArray(
        progresoPais.deportesConOro
      )
        ? progresoPais.deportesConOro
        : [];

    progresoPais.porDeporte = {
      ...(progresoPais.porDeporte || {})
    };

    progresoPais.colores = {
      azul:
        progresoPais.colores?.azul || 0,
      verde:
        progresoPais.colores?.verde || 0,
      amarillo:
        progresoPais.colores?.amarillo || 0,
      rojo:
        progresoPais.colores?.rojo || 0
    };
  });

  estadoCompleto.progresoDeportes =
    carrera.progresoDeportes || {};

  estadoCompleto.logrosConseguidos =
    carrera.logrosConseguidos || [];
    
  estadoCompleto.mejorEdicion = {
    oros:
      carrera.mejorEdicion?.oros || 0,

    medallas:
      carrera.mejorEdicion?.medallas || 0
  };

  estadoCompleto.recordsGlobales = {
    medallas:
      carrera.recordsGlobales?.medallas ||
      null,

    oros:
      carrera.recordsGlobales?.oros ||
      null
  };

  Object.values(
    estadoCompleto.progresoDeportes
  ).forEach((progresoDeporte) => {
    progresoDeporte.recordMedallas =
      progresoDeporte.recordMedallas ||
      null;

    progresoDeporte.recordOros =
      progresoDeporte.recordOros ||
      null;

    if (progresoDeporte.recordMedallas) {
      progresoDeporte.recordMedallas.defensas =
        progresoDeporte.recordMedallas.defensas || 0;
    }

    if (progresoDeporte.recordOros) {
      progresoDeporte.recordOros.defensas =
        progresoDeporte.recordOros.defensas || 0;
    }
  });

  /*
    Compatibilidad con partidas que ya habían
    completado la recompensa de nivel 5 antes
    de incorporar el sistema de logros.
  */
  if (
    estadoCompleto.nivel >= 5 &&
    estadoCompleto.deporteColectivoElegido
  ) {
    estadoCompleto.logrosDesbloqueados = true;
  }

  return estadoCompleto;
}

function guardarCarrera(carrera) {
  localStorage.setItem(
    CLAVE_CARRERA,
    JSON.stringify(carrera)
  );
}

function obtenerExperienciaNecesaria(nivel) {
  return (
    EXPERIENCIA_POR_NIVEL[nivel] ||
    2000
  );
}


function actualizarUltimosLogrosCarrera() {
  if (
    !estadoCarrera.logrosDesbloqueados
  ) {
    ultimosLogrosCarrera.classList.add(
      "oculto"
    );

    listaUltimosLogrosCarrera.innerHTML = "";
    return;
  }

  ultimosLogrosCarrera.classList.remove(
    "oculto"
  );

  const ultimosLogros =
    LOGROS_ACTIVOS
      .filter(
        (logro) =>
          estadoCarrera.logrosConseguidos.includes(
            logro.id
          )
      )
      .sort((logroA, logroB) => {
        const detalleA =
          estadoCarrera.detalleLogros[
            logroA.id
          ];

        const detalleB =
          estadoCarrera.detalleLogros[
            logroB.id
          ];

        const edicionA =
          detalleA?.edicion || 0;

        const edicionB =
          detalleB?.edicion || 0;

        if (edicionA !== edicionB) {
          return edicionB - edicionA;
        }

        return String(
          detalleB?.fecha || ""
        ).localeCompare(
          String(detalleA?.fecha || "")
        );
      })
      .slice(0, 3);

  if (ultimosLogros.length === 0) {
    listaUltimosLogrosCarrera.innerHTML = `
      <article class="sin-logros-carrera">
        <span>🎖️</span>

        <div>
          <strong>
            Tu primera hazaña está por llegar
          </strong>

          <p>
            Juega una nueva edición para empezar
            a completar logros.
          </p>
        </div>
      </article>
    `;

    return;
  }

  listaUltimosLogrosCarrera.innerHTML =
    ultimosLogros.map((logro) => {
      const detalle =
        estadoCarrera.detalleLogros[
          logro.id
        ];

      return `
        <article class="ultimo-logro-carrera">
          <span class="icono-ultimo-logro">
            ${obtenerIconoCategoriaLogro(
              logro.categoria
            )}
          </span>

          <div>
            <strong>${logro.nombre}</strong>
            <p>
              Edición ${detalle?.edicion || "—"}
              · +${logro.experiencia} EXP
            </p>
          </div>
        </article>
      `;
    }).join("");
}

function actualizarHubCarrera() {
  if (!estadoCarrera) {
    return;
  }

  nombreDelegacionCarrera.textContent =
  estadoCarrera.nombreDelegacion ||
  "Delegación sin nombre";

const puedeNombrarDelegacion =
  estadoCarrera
    .personalizacionDelegacionDesbloqueada;

botonEditarNombreDelegacion.classList.toggle(
  "oculto",
  !puedeNombrarDelegacion
);

if (!puedeNombrarDelegacion) {
  textoNombreDelegacionCarrera.textContent =
    "El nombre se desbloqueará en el nivel 2.";
} else if (estadoCarrera.nombreDelegacion) {
  textoNombreDelegacionCarrera.textContent =
    "Tu identidad olímpica.";
} else {
  textoNombreDelegacionCarrera.textContent =
    "Ya puedes poner nombre a tu delegación.";
}

  nivelCarrera.textContent =
    estadoCarrera.nivel;

  const experienciaNecesaria =
  obtenerExperienciaNecesaria(
    estadoCarrera.nivel
  );

experienciaCarrera.textContent =
  estadoCarrera.nivel >= 8
    ? "Nivel 8 · máximo en fase beta"
    : `${estadoCarrera.experiencia} / ` +
      `${experienciaNecesaria} EXP`;

  juegosDisputadosCarrera.textContent =
    estadoCarrera.juegosDisputados;

  cantidadPaisesCarrera.textContent =
    estadoCarrera.paisesDesbloqueados.length;

  cantidadDeportesCarrera.textContent =
    estadoCarrera.deportesDesbloqueados.length;

  cantidadPaisesMenuCarrera.textContent =
    `${estadoCarrera.paisesDesbloqueados.length} desbloqueados`;

  cantidadDeportesMenuCarrera.textContent =
    `${estadoCarrera.deportesDesbloqueados.length} desbloqueados`;

  const logrosDisponibles =
    obtenerLogrosDisponiblesCarrera().length;

  const logrosConseguidos =
    obtenerLogrosDisponiblesCarrera().filter(
      (logro) =>
        estadoCarrera.logrosConseguidos.includes(
          logro.id
        )
    ).length;

  botonAbrirLogros.disabled =
    !estadoCarrera.logrosDesbloqueados;

  if (estadoCarrera.logrosDesbloqueados) {
    estadoMenuLogros.textContent =
      `${logrosConseguidos} de ` +
      `${logrosDisponibles} conseguidos`;
  } else {
    estadoMenuLogros.textContent =
      "Se desbloquean en el nivel 4";
  }

  actualizarUltimosLogrosCarrera();

  const totalMedallasHistoricas =
    estadoCarrera.medalleroTotal.oros +
    estadoCarrera.medalleroTotal.platas +
    estadoCarrera.medalleroTotal.bronces;

  estadoMenuEstadisticas.textContent =
    estadoCarrera.juegosDisputados > 0
      ? `${estadoCarrera.juegosDisputados} JJOO · ` +
        `${totalMedallasHistoricas} medallas`
      : "Aún no hay JJOO disputados";

  const porcentajeExperiencia =
  Math.min(
    100,
    estadoCarrera.experiencia /
    experienciaNecesaria *
    100
  );
  progresoExperienciaCarrera.style.width =
    `${porcentajeExperiencia}%`;
}


function agregarRecompensaPendiente(
  codigoRecompensa
) {
  if (
    !estadoCarrera.recompensasPendientes.includes(
      codigoRecompensa
    )
  ) {
    estadoCarrera.recompensasPendientes.push(
      codigoRecompensa
    );
  }
}

function completarRecompensaPendiente(
  codigoRecompensa
) {
  estadoCarrera.recompensasPendientes =
    estadoCarrera.recompensasPendientes.filter(
      (recompensa) =>
        recompensa !== codigoRecompensa
    );

  guardarCarrera(estadoCarrera);
}

function mostrarSiguienteRecompensaPendiente() {
  if (
    !estadoCarrera ||
    estadoCarrera.recompensasPendientes.length === 0
  ) {
    return;
  }

  const siguienteRecompensa =
    estadoCarrera.recompensasPendientes[0];

  if (
    siguienteRecompensa ===
    "nombre_delegacion"
  ) {
    abrirModalNombreDelegacion();
    return;
  }

  if (
    siguienteRecompensa ===
    "elegir_potencia"
  ) {
    abrirModalElegirPotencia();
    return;
  }

  if (
    siguienteRecompensa ===
    "nivel_4_tiro_logros"
  ) {
    abrirModalRecompensaNivel4();
    return;
  }

  if (
    siguienteRecompensa ===
    "elegir_deporte_colectivo"
  ) {
    abrirModalElegirDeporteColectivo();
    return;
  }

  if (
    siguienteRecompensa ===
    "nivel_6_dos_paises_ciclismo"
  ) {
    abrirModalRecompensaNivel6();
    return;
  }

  if (
    siguienteRecompensa ===
    "nivel_7_pais_tenis_ocho"
  ) {
    abrirModalRecompensaNivel7();
    return;
  }

  if (
    siguienteRecompensa ===
    "nivel_8_beta_superada"
  ) {
    abrirPantallaBetaSuperada();
  }
}

function abrirModalNombreDelegacion() {
  if (
    !estadoCarrera ||
    !estadoCarrera
      .personalizacionDelegacionDesbloqueada
  ) {
    return;
  }

  inputNombreDelegacion.value =
    estadoCarrera.nombreDelegacion || "";

  mensajeNombreDelegacion.textContent = "";

  modalNombreDelegacion.classList.remove(
    "oculto"
  );

  setTimeout(() => {
    inputNombreDelegacion.focus();
    inputNombreDelegacion.select();
  }, 50);
}

function cerrarModalNombreDelegacion() {
  modalNombreDelegacion.classList.add(
    "oculto"
  );

  mensajeNombreDelegacion.textContent = "";
}

function guardarNombreDelegacion() {
  const nombreLimpio =
    inputNombreDelegacion.value
      .trim()
      .replace(/\s+/g, " ");

  if (nombreLimpio.length < 3) {
    mensajeNombreDelegacion.textContent =
      "El nombre debe tener al menos 3 caracteres.";

    return;
  }

  estadoCarrera.nombreDelegacion =
    nombreLimpio;

  completarRecompensaPendiente(
    "nombre_delegacion"
  );

  actualizarHubCarrera();
  cerrarModalNombreDelegacion();

  setTimeout(
    mostrarSiguienteRecompensaPendiente,
    250
  );
}

function posponerNombreDelegacion() {
  /*
    Conservamos el estado pendiente para que
    vuelva a sugerirse en otra entrada al hub.
  */
  cerrarModalNombreDelegacion();
}


function obtenerPaisPorCodigo(codigoPais) {
  return PAISES.find(
    (pais) =>
      pais.codigo === codigoPais &&
      estaActivo(pais)
  );
}

function abrirModalElegirPotencia() {
  const estadosUnidos =
    obtenerPaisPorCodigo("USA");

  const china =
    obtenerPaisPorCodigo("CHN");

  if (!estadosUnidos || !china) {
    console.error(
      "No se encontraron Estados Unidos o China.",
      {
        estadosUnidos,
        china
      }
    );

    return;
  }

  cargarBandera(
    banderaEstadosUnidosPotencia,
    banderaAlternativaEstadosUnidos,
    estadosUnidos
  );

  cargarBandera(
    banderaChinaPotencia,
    banderaAlternativaChina,
    china
  );

  modalElegirPotencia.classList.remove(
    "oculto"
  );
}

function cerrarModalElegirPotencia() {
  modalElegirPotencia.classList.add(
    "oculto"
  );
}

function elegirPotenciaCarrera(codigoPais) {
  if (
    codigoPais !== "USA" &&
    codigoPais !== "CHN"
  ) {
    return;
  }

  if (
    !estadoCarrera.paisesDesbloqueados.includes(
      codigoPais
    )
  ) {
    estadoCarrera.paisesDesbloqueados.push(
      codigoPais
    );
  }

  estadoCarrera.potenciaElegida =
    codigoPais;

  /*
    Desde el nivel 3, los récords batidos
    empiezan a conceder experiencia.
  */
  estadoCarrera
    .recordsConExperienciaDesbloqueados =
      true;

  completarRecompensaPendiente(
    "elegir_potencia"
  );

  actualizarHubCarrera();
  cerrarModalElegirPotencia();

  setTimeout(
    mostrarSiguienteRecompensaPendiente,
    250
  );
}

function abrirModalRecompensaNivel4() {
  const canada = obtenerPaisPorCodigo("CAN");

  if (
    canada &&
    banderaCanadaNivel4 &&
    banderaAlternativaCanadaNivel4
  ) {
    cargarBandera(
      banderaCanadaNivel4,
      banderaAlternativaCanadaNivel4,
      canada
    );
  }

  modalRecompensaNivel4.classList.remove(
    "oculto"
  );
}

function cerrarModalRecompensaNivel4() {
  modalRecompensaNivel4.classList.add(
    "oculto"
  );
}

function completarRecompensaNivel4() {
  if (
    !estadoCarrera.deportesDesbloqueados.includes(
      "tiro"
    )
  ) {
    estadoCarrera.deportesDesbloqueados.push(
      "tiro"
    );
  }

  /*
    Los logros empiezan a contar desde este
    momento. No se revisan ediciones anteriores.
  */
  estadoCarrera.logrosDesbloqueados =
    true;

  if (
    !estadoCarrera.paisesDesbloqueados.includes(
      "CAN"
    )
  ) {
    estadoCarrera.paisesDesbloqueados.push(
      "CAN"
    );
  }

  completarRecompensaPendiente(
    "nivel_4_tiro_logros"
  );

  actualizarHubCarrera();
  cerrarModalRecompensaNivel4();

  setTimeout(
    mostrarSiguienteRecompensaPendiente,
    250
  );
}


function abrirModalElegirDeporteColectivo() {
  modalElegirDeporteColectivo.classList.remove(
    "oculto"
  );
}

function cerrarModalElegirDeporteColectivo() {
  modalElegirDeporteColectivo.classList.add(
    "oculto"
  );
}

function elegirDeporteColectivoCarrera(
  codigoDeporte
) {
  const codigosPermitidos = [
    "futbol",
    "voleibol",
    "waterpolo"
  ];

  if (!codigosPermitidos.includes(codigoDeporte)) {
    return;
  }

  if (
    !estadoCarrera.deportesDesbloqueados.includes(
      codigoDeporte
    )
  ) {
    estadoCarrera.deportesDesbloqueados.push(
      codigoDeporte
    );
  }

  estadoCarrera.deporteColectivoElegido =
    codigoDeporte;

  /*
    Desde el nivel 5 se puede sustituir una vez
    por edición el país que acaba de aparecer.
  */
  estadoCarrera.rerollDesbloqueado =
    true;

  completarRecompensaPendiente(
    "elegir_deporte_colectivo"
  );

  actualizarHubCarrera();
  cerrarModalElegirDeporteColectivo();

  setTimeout(
    mostrarSiguienteRecompensaPendiente,
    250
  );
}








let temporizadoresTutorialInicial = [];

function limpiarTemporizadoresTutorialInicial() {
  temporizadoresTutorialInicial.forEach(clearTimeout);
  temporizadoresTutorialInicial = [];
}

function mostrarPasoTutorialInicial(pasoVisible) {
  [
    pasoTutorialBienvenida,
    pasoTutorialPaises,
    pasoTutorialDeportes
  ].forEach((paso) => {
    paso.classList.toggle("oculto", paso !== pasoVisible);
  });
}

function crearCartaPaisTutorial(pais) {
  const carta = document.createElement("article");
  carta.className = "carta-tutorial flip-pendiente";
  carta.innerHTML = `
    <div class="interior-carta-tutorial">
      <div class="cara-carta-tutorial reverso"><span>?</span></div>
      <div class="cara-carta-tutorial frente">
        <img src="assets/banderas/${pais.nombre}.png" alt="Bandera de ${pais.nombre}"
             onerror="this.style.display='none'">
        <strong>${pais.nombre}</strong>
      </div>
    </div>`;
  return carta;
}

function obtenerEmojiDeporteTutorial(
  codigoDeporte
) {
  const emojis = {
    atletismo: "🏃",
    natacion: "🏊",
    gimnasia: "🤸",
    remo: "🚣",
    boxeo: "🥊",
    piraguismo: "🛶",
    ciclismo: "🚴",
    judo: "🥋",
    tiro: "🎯",
    futbol: "⚽",
    baloncesto: "🏀",
    waterpolo: "🤽",
    balonmano: "🤾",
    voleibol: "🏐",
    tenis: "🎾",
    escalada: "🧗",
    tenismesa: "🏓",
    badminton: "🏸",
    rugby: "🏉",
    tiroarco: "🏹"
  };

  return emojis[codigoDeporte] || "🏅";
}

function crearCartaDeporteTutorial(deporte) {
  const carta = document.createElement("article");
  carta.className = "carta-tutorial carta-deporte-tutorial flip-pendiente";
  carta.innerHTML = `
    <div class="interior-carta-tutorial">
      <div class="cara-carta-tutorial reverso"><span>?</span></div>
      <div class="cara-carta-tutorial frente">
        <span class="icono-deporte-tutorial">${obtenerEmojiDeporteTutorial(deporte.codigo)}</span>
        <strong>${deporte.nombre}</strong>
      </div>
    </div>`;
  return carta;
}

function voltearCartasTutorial(contenedor) {
  limpiarTemporizadoresTutorialInicial();
  [...contenedor.querySelectorAll(".carta-tutorial")].forEach((carta, indice) => {
    temporizadoresTutorialInicial.push(setTimeout(() => {
      carta.classList.remove("flip-pendiente");
      carta.classList.add("flip-completado");
    }, indice * 170));
  });
}

function mostrarPaisesTutorialInicial() {
  mostrarPasoTutorialInicial(pasoTutorialPaises);
  listaPaisesTutorial.innerHTML = "";

  estadoCarrera.paisesDesbloqueados
    .map((codigo) => PAISES.find((pais) => pais.codigo === codigo))
    .filter(Boolean)
    .forEach((pais) => {
      listaPaisesTutorial.appendChild(
        crearCartaPaisTutorial(pais)
      );
    });

  requestAnimationFrame(() => {
    voltearCartasTutorial(listaPaisesTutorial);
  });
}

function mostrarDeportesTutorialInicial() {
  mostrarPasoTutorialInicial(pasoTutorialDeportes);
  listaDeportesTutorial.innerHTML = "";

  estadoCarrera.deportesDesbloqueados
    .map((codigo) => DEPORTES.find((deporte) => deporte.codigo === codigo))
    .filter(Boolean)
    .forEach((deporte) => {
      listaDeportesTutorial.appendChild(
        crearCartaDeporteTutorial(deporte)
      );
    });

  requestAnimationFrame(() => {
    voltearCartasTutorial(listaDeportesTutorial);
  });
}

function abrirTutorialInicialCarrera() {
  limpiarTemporizadoresTutorialInicial();
  mostrarPasoTutorialInicial(pasoTutorialBienvenida);
  mostrarPantalla(pantallaTutorialInicial);
}

function completarTutorialInicialCarrera() {
  limpiarTemporizadoresTutorialInicial();
  estadoCarrera.tutorialInicialVisto = true;
  guardarCarrera(estadoCarrera);
  iniciarPartidaCarrera();
}

let seccionEstadisticasActual =
  "resumen";

let codigoPaisEstadisticasSeleccionado =
  "";

let codigoDeporteEstadisticasSeleccionado =
  "";

const ordenEstadisticas = {
  paises: { clave: "total", direccion: "desc" },
  deportes: { clave: "total", direccion: "desc" },
  sorpresasActuacionesPositivas: { clave: "fortunaIndice", direccion: "desc" },
  sorpresasActuacionesNegativas: { clave: "fortunaIndice", direccion: "asc" },
  sorpresasEdicionesPositivas: { clave: "fortunaMedia", direccion: "desc" },
  sorpresasEdicionesNegativas: { clave: "fortunaMedia", direccion: "asc" }
};

function abrirPantallaEstadisticas(seccionInicial = "resumen") {
  const seccionesValidas = [
    "resumen",
    "paises",
    "deportes",
    "records",
    "sorpresas",
    "historial"
  ];

  seccionEstadisticasActual = seccionesValidas.includes(seccionInicial)
    ? seccionInicial
    : "resumen";

  codigoPaisEstadisticasSeleccionado = "";
  codigoDeporteEstadisticasSeleccionado = "";

  filtrosEstadisticas
    .querySelectorAll(
      "[data-seccion-estadisticas]"
    )
    .forEach((boton) => {
      boton.classList.toggle(
        "activo",
        boton.dataset.seccionEstadisticas ===
          seccionEstadisticasActual
      );
    });

  renderizarEstadisticas();
  mostrarPantalla(
    pantallaEstadisticas
  );
}

function formatearNumeroEstadistica(
  numero,
  decimales = 1
) {
  return new Intl.NumberFormat(
    "es-ES",
    {
      maximumFractionDigits:
        decimales
    }
  ).format(numero || 0);
}

function obtenerTotalMedallasProgreso(
  progreso
) {
  return (
    (progreso.oros || 0) +
    (progreso.platas || 0) +
    (progreso.bronces || 0)
  );
}

function crearTarjetaDato(
  etiqueta,
  valor,
  detalle = ""
) {
  return `
    <article class="tarjeta-dato-estadistica">
      <span>${etiqueta}</span>
      <strong>${valor}</strong>
      ${
        detalle
          ? `<small>${detalle}</small>`
          : ""
      }
    </article>
  `;
}

function renderizarResumenEstadisticas() {
  const medallero =
    estadoCarrera.medalleroTotal;

  const total =
    medallero.oros +
    medallero.platas +
    medallero.bronces;

  const juegos =
    estadoCarrera.juegosDisputados;

  const promedio =
    juegos > 0
      ? total / juegos
      : 0;

  const paisesUtilizados =
    Object.values(
      estadoCarrera.progresoPaises
    ).filter(
      (progreso) =>
        progreso.participaciones > 0
    ).length;

  const deportesUtilizados =
    Object.values(
      estadoCarrera.progresoDeportes
    ).filter(
      (progreso) =>
        progreso.apariciones > 0
    ).length;

  contenidoEstadisticas.innerHTML = `
    <section class="rejilla-datos-estadisticas">
      ${crearTarjetaDato(
        "JJOO disputados",
        juegos
      )}

      ${crearTarjetaDato(
        "Medallas totales",
        total,
        `${medallero.oros} oros · ` +
        `${medallero.platas} platas · ` +
        `${medallero.bronces} bronces`
      )}

      ${crearTarjetaDato(
        "Promedio por JJOO",
        formatearNumeroEstadistica(
          promedio,
          2
        )
      )}

      ${crearTarjetaDato(
        "Mejor edición",
        estadoCarrera.mejorEdicion
          .medallas,
        `${estadoCarrera.mejorEdicion.oros} ` +
        `oros como mejor marca`
      )}

      ${crearTarjetaDato(
        "Países utilizados",
        paisesUtilizados,
        `${estadoCarrera.paisesDesbloqueados.length} ` +
        `desbloqueados`
      )}

      ${crearTarjetaDato(
        "Deportes utilizados",
        deportesUtilizados,
        `${estadoCarrera.deportesDesbloqueados.length} ` +
        `desbloqueados`
      )}

      ${crearTarjetaDato(
        "Logros",
        estadoCarrera
          .logrosConseguidos
          .filter(
            (id) =>
              Boolean(
                obtenerLogroPorId(id)
              )
          ).length,
        `${LOGROS_ACTIVOS.length} disponibles`
      )}

      ${crearTarjetaDato(
        "Nivel de Carrera",
        estadoCarrera.nivel,
        `${estadoCarrera.experiencia} EXP actual`
      )}
    </section>

    <section class="bloque-destacado-estadisticas">
      <div>
        <p class="marca">
          IDENTIDAD DE LA DELEGACIÓN
        </p>
        <h2>
          ${
            estadoCarrera.nombreDelegacion ||
            "Delegación sin nombre"
          }
        </h2>
        <p>
          Una historia construida durante
          ${juegos} ediciones olímpicas.
        </p>
      </div>

      <div class="medallero-estadisticas">
        <span>🥇 ${medallero.oros}</span>
        <span>🥈 ${medallero.platas}</span>
        <span>🥉 ${medallero.bronces}</span>
      </div>
    </section>
  `;
}

function obtenerResumenDeportesPais(
  progresoPais
) {
  const entradas = Object.entries(
    progresoPais.porDeporte || {}
  );

  if (entradas.length === 0) {
    return {
      deporteMasUsado: null,
      filas: []
    };
  }

  const filas = entradas
    .map(([codigo, progreso]) => {
      const deporte =
        DEPORTES.find(
          (item) =>
            item.codigo === codigo
        );

      return {
        codigo: codigo,
        nombre:
          deporte?.nombre || codigo,
        participaciones:
          progreso.participaciones || 0,
        oros: progreso.oros || 0,
        platas: progreso.platas || 0,
        bronces: progreso.bronces || 0,
        colores: {
          azul:
            progreso.colores?.azul || 0,
          verde:
            progreso.colores?.verde || 0,
          amarillo:
            progreso.colores?.amarillo || 0,
          rojo:
            progreso.colores?.rojo || 0
        }
      };
    })
    .sort(
      (a, b) =>
        b.participaciones -
          a.participaciones ||
        (
          b.oros +
          b.platas +
          b.bronces
        ) -
        (
          a.oros +
          a.platas +
          a.bronces
        )
    );

  return {
    deporteMasUsado:
      filas[0] || null,
    filas: filas
  };
}

function crearLeyendaColoresPais(
  colores
) {
  return `
    <div
      class="leyenda-colores-pais"
      aria-label="Veces según el color de la asignación"
    >
      <span
        class="color-pais azul"
        title="Azul"
        aria-label="Azul: ${colores.azul || 0}"
      >
        <i></i>
        ${colores.azul || 0}
      </span>

      <span
        class="color-pais verde"
        title="Verde"
        aria-label="Verde: ${colores.verde || 0}"
      >
        <i></i>
        ${colores.verde || 0}
      </span>

      <span
        class="color-pais amarillo"
        title="Amarillo"
        aria-label="Amarillo: ${colores.amarillo || 0}"
      >
        <i></i>
        ${colores.amarillo || 0}
      </span>

      <span
        class="color-pais rojo"
        title="Rojo"
        aria-label="Rojo: ${colores.rojo || 0}"
      >
        <i></i>
        ${colores.rojo || 0}
      </span>
    </div>
  `;
}

function renderizarDetallePaisEstadisticas(
  fila
) {
  if (!fila) {
    return "";
  }

  const resumenDeportes =
    obtenerResumenDeportesPais(fila);

  const deportesDesbloqueados =
    estadoCarrera.deportesDesbloqueados
      .map((codigo) =>
        DEPORTES.find(
          (deporte) =>
            deporte.codigo === codigo
        )
      )
      .filter(Boolean)
      .sort(
        (a, b) =>
          a.nombre.localeCompare(
            b.nombre,
            "es"
          )
      );

  const datosDisponibles =
    resumenDeportes.filas.length > 0;

  return `
    <section class="detalle-pais-estadisticas">
      <header class="cabecera-detalle-pais">
        <div>
          <p class="marca">
            ESTADÍSTICAS DETALLADAS
          </p>

          <h2>${fila.nombre}</h2>

          <p>
            ${fila.participaciones}
            participaciones ·
            ${fila.total} medallas ·
            media de
            ${formatearNumeroEstadistica(
              fila.participaciones > 0
                ? fila.total / fila.participaciones
                : 0,
              2
            )}
          </p>
        </div>

        <div class="medallero-detalle-pais">
          <span>🥇 ${fila.oros}</span>
          <span>🥈 ${fila.platas}</span>
          <span>🥉 ${fila.bronces}</span>
        </div>
      </header>

      <div class="resumen-detalle-pais">
        <article>
          <span>Deporte más utilizado</span>
          <strong>
            ${
              resumenDeportes.deporteMasUsado
                ? resumenDeportes
                    .deporteMasUsado.nombre
                : "Sin datos detallados"
            }
          </strong>

          <small>
            ${
              resumenDeportes.deporteMasUsado
                ? `${resumenDeportes
                    .deporteMasUsado
                    .participaciones} apariciones`
                : "El desglose se registra desde esta versión"
            }
          </small>
        </article>

        <article>
          <span>Colores históricos</span>

          ${crearLeyendaColoresPais(
            fila.colores || {}
          )}
        </article>
      </div>

      ${crearHistoriasFortunaPais(
        fila.codigo
      )}

      ${
        datosDisponibles
          ? `
            <div class="lista-deportes-detalle-pais">
              ${deportesDesbloqueados.map(
                (deporte) => {
                  const progreso =
                    fila.porDeporte?.[
                      deporte.codigo
                    ] || {
                      participaciones: 0,
                      oros: 0,
                      platas: 0,
                      bronces: 0,
                      colores: {}
                    };

                  const total =
                    progreso.oros +
                    progreso.platas +
                    progreso.bronces;

                  const promedio =
                    progreso.participaciones > 0
                      ? total /
                        progreso.participaciones
                      : 0;

                  return `
                    <article
                      class="tarjeta-deporte-detalle-pais ${
                        progreso.participaciones > 0
                          ? ""
                          : "sin-apariciones"
                      }"
                    >
                      <header>
                        <div>
                          <strong>
                            ${deporte.nombre}
                          </strong>

                          <span>
                            ${progreso.participaciones}
                            apariciones
                          </span>
                        </div>

                        <strong class="total-deporte-pais">
                          ${total}
                        </strong>
                      </header>

                      <div class="medallas-deporte-pais">
                        <span>🥇 ${progreso.oros}</span>
                        <span>🥈 ${progreso.platas}</span>
                        <span>🥉 ${progreso.bronces}</span>
                        <span>
                          Media
                          ${formatearNumeroEstadistica(
                            promedio,
                            2
                          )}
                        </span>
                      </div>

                      ${crearLeyendaColoresPais(
                        progreso.colores || {}
                      )}
                    </article>
                  `;
                }
              ).join("")}
            </div>
          `
          : `
            <div class="aviso-detalle-pais">
              <strong>
                El historial general se conserva
              </strong>

              <p>
                Las medallas y participaciones anteriores
                siguen apareciendo, pero las estadísticas
                por deporte y por color comienzan a
                guardarse a partir de esta versión.
              </p>
            </div>
          `
      }
    </section>
  `;
}


function obtenerHistoriasFortunaPais(
  codigoPais
) {
  const actuaciones =
    estadoCarrera.historialEdiciones
      .flatMap((edicion) =>
        (edicion.resultados || [])
          .filter(
            (resultado) =>
              resultado.paisCodigo ===
                codigoPais &&
              Number.isFinite(
                resultado.fortunaIndice
              )
          )
          .map((resultado) => ({
            ...resultado,
            edicion: edicion.edicion
          }))
      );

  if (actuaciones.length === 0) {
    return {
      mejor: null,
      peor: null
    };
  }

  return {
    mejor: [...actuaciones].sort(
      (a, b) =>
        b.fortunaIndice -
        a.fortunaIndice
    )[0],

    peor: [...actuaciones].sort(
      (a, b) =>
        a.fortunaIndice -
        b.fortunaIndice
    )[0]
  };
}

function crearTarjetaHistoriaFortuna(
  titulo,
  resultado,
  tipo
) {
  if (!resultado) {
    return `
      <article class="tarjeta-historia-fortuna vacia">
        <span>${titulo}</span>
        <strong>Sin datos todavía</strong>
        <small>
          El seguimiento comienza con esta versión.
        </small>
      </article>
    `;
  }

  const indice =
    resultado.fortunaIndice >= 0
      ? `+${resultado.fortunaIndice.toFixed(2)}`
      : resultado.fortunaIndice.toFixed(2);

  return `
    <article class="tarjeta-historia-fortuna ${tipo}">
      <span>${titulo}</span>
      <strong>
        ${resultado.deporteNombre}
        · Edición ${resultado.edicion}
      </strong>
      <p>
        🥇 ${resultado.oros}
        · 🥈 ${resultado.platas}
        · 🥉 ${resultado.bronces}
      </p>
      <small>
        ${indice}
        · ${resultado.fortunaTexto || "Resultado registrado"}
      </small>
    </article>
  `;
}

function crearHistoriasFortunaPais(
  codigoPais
) {
  const historias =
    obtenerHistoriasFortunaPais(
      codigoPais
    );

  return `
    <section class="historias-fortuna-pais">
      <h3>Historias destacadas</h3>
      <div>
        ${crearTarjetaHistoriaFortuna(
          "MEJOR SORPRESA",
          historias.mejor,
          "positiva"
        )}
        ${crearTarjetaHistoriaFortuna(
          "MAYOR DECEPCIÓN",
          historias.peor,
          "negativa"
        )}
      </div>
    </section>
  `;
}


function compararValoresEstadisticas(valorA, valorB, direccion) {
  const a = Number.isFinite(Number(valorA)) ? Number(valorA) : 0;
  const b = Number.isFinite(Number(valorB)) ? Number(valorB) : 0;
  return direccion === "asc" ? a - b : b - a;
}

function ordenarFilasEstadisticas(filas, configuracion, desempate = () => 0) {
  return [...filas].sort((a, b) =>
    compararValoresEstadisticas(
      a[configuracion.clave],
      b[configuracion.clave],
      configuracion.direccion
    ) || desempate(a, b)
  );
}


const PAISES_OBTENIBLES_BETA = new Set([
  ...ESTADO_INICIAL_CARRERA.paisesDesbloqueados,
  "USA", "CHN", "CAN",
  "JPN", "GBR", "RSA", "ROU",
  "FIJ", "SMR", "KEN"
]);

const DEPORTES_OBTENIBLES_BETA = new Set([
  ...ESTADO_INICIAL_CARRERA.deportesDesbloqueados,
  "tiro", "futbol", "voleibol", "waterpolo",
  "ciclismo", "tenis"
]);

function crearTarjetaCatalogoPais(pais) {
  const desbloqueado = estadoCarrera.paisesDesbloqueados.includes(pais.codigo);
  const obtenible = PAISES_OBTENIBLES_BETA.has(pais.codigo);
  const progreso = estadoCarrera.progresoPaises[pais.codigo] || {};
  const total = obtenerTotalMedallasProgreso(progreso);
  return `<button type="button" class="tarjeta-catalogo-estadisticas pais ${desbloqueado ? "desbloqueada" : "bloqueada"} ${!obtenible ? "fuera-beta" : ""}" ${desbloqueado ? `data-codigo-pais-catalogo="${pais.codigo}"` : "disabled"} aria-label="${desbloqueado ? `Ver estadísticas de ${pais.nombre}` : `${pais.nombre}, bloqueado`}">
    <span class="bandera-catalogo"><img src="assets/banderas/${pais.nombre}.png" alt="" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid'"><span>${pais.codigo}</span></span>
    <strong>${pais.nombre}</strong>
    ${desbloqueado ? `<small>${progreso.participaciones || 0} participaciones · ${total} medallas</small>` : `<small>${!obtenible ? "No disponible en esta fase beta" : "País aún no desbloqueado"}</small>`}
  </button>`;
}

function crearTarjetaCatalogoDeporte(deporte) {
  const desbloqueado = estadoCarrera.deportesDesbloqueados.includes(deporte.codigo);
  const obtenible = DEPORTES_OBTENIBLES_BETA.has(deporte.codigo);
  const progreso = estadoCarrera.progresoDeportes[deporte.codigo] || {};
  const total = obtenerTotalMedallasProgreso(progreso);
  return `<button type="button" class="tarjeta-catalogo-estadisticas deporte ${desbloqueado ? "desbloqueada" : "bloqueada"} ${!obtenible ? "fuera-beta" : ""}" ${desbloqueado ? `data-codigo-deporte-catalogo="${deporte.codigo}"` : "disabled"} aria-label="${desbloqueado ? `Ver estadísticas de ${deporte.nombre}` : `${deporte.nombre}, bloqueado`}">
    <span class="icono-deporte-catalogo">${obtenerEmojiDeporteTutorial(deporte.codigo)}</span>
    <strong>${deporte.nombre}</strong>
    ${desbloqueado ? `<small>${progreso.apariciones || 0} apariciones · ${total} medallas</small>` : `<small>${!obtenible ? "No disponible en esta fase beta" : "Deporte aún no desbloqueado"}</small>`}
  </button>`;
}

function crearCatalogoPaisesEstadisticas() {
  const paises = PAISES.filter(estaActivo).sort((a,b)=>a.nombre.localeCompare(b.nombre,"es"));
  return `<section class="cabecera-catalogo-estadisticas"><p class="marca">CATÁLOGO DE CARRERA</p><h2>Países</h2><p>${estadoCarrera.paisesDesbloqueados.length} de ${paises.length} desbloqueados. Los sorteos pueden hacer que algunas Carreras terminen con colecciones diferentes.</p></section><div class="rejilla-catalogo-estadisticas">${paises.map(crearTarjetaCatalogoPais).join("")}</div>`;
}

function crearCatalogoDeportesEstadisticas() {
  const deportes = [...DEPORTES].sort((a,b)=>a.nombre.localeCompare(b.nombre,"es"));
  const desbloqueadosVisibles = deportes.filter((deporte) =>
    estadoCarrera.deportesDesbloqueados.includes(deporte.codigo)
  ).length;
  return `<section class="cabecera-catalogo-estadisticas"><p class="marca">CATÁLOGO DE CARRERA</p><h2>Deportes</h2><p>${desbloqueadosVisibles} de ${deportes.length} desbloqueados.</p></section><div class="rejilla-catalogo-estadisticas">${deportes.map(crearTarjetaCatalogoDeporte).join("")}</div>`;
}

function abrirCatalogoPaisesCarrera() {
  contenidoCatalogoPaises.innerHTML = crearCatalogoPaisesEstadisticas();
  mostrarPantalla(pantallaCatalogoPaises);
}

function abrirCatalogoDeportesCarrera() {
  contenidoCatalogoDeportes.innerHTML = crearCatalogoDeportesEstadisticas();
  mostrarPantalla(pantallaCatalogoDeportes);
}

function abrirDetallePaisDesdeCatalogo(codigo) {
  abrirPantallaEstadisticas("paises");
  codigoPaisEstadisticasSeleccionado = codigo;
  renderizarPaisesEstadisticas();

  contenidoEstadisticas
    .querySelector(".detalle-pais-estadisticas")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function abrirDetalleDeporteDesdeCatalogo(codigo) {
  abrirPantallaEstadisticas("deportes");
  codigoDeporteEstadisticasSeleccionado = codigo;
  renderizarDeportesEstadisticas();
}

function renderizarDetalleDeporteEstadisticas(codigo) {
  if (!codigo) return "";
  const deporte = DEPORTES.find(item=>item.codigo===codigo);
  const progreso = estadoCarrera.progresoDeportes[codigo] || {apariciones:0,oros:0,platas:0,bronces:0};
  const total = obtenerTotalMedallasProgreso(progreso);
  return `<section class="detalle-pais-estadisticas detalle-deporte-estadisticas"><header class="cabecera-detalle-pais"><div><p class="marca">ESTADÍSTICAS DEL DEPORTE</p><h2>${deporte?.nombre || codigo}</h2><p>${progreso.apariciones || 0} apariciones · ${total} medallas</p></div><div class="medallero-detalle-pais"><span>🥇 ${progreso.oros || 0}</span><span>🥈 ${progreso.platas || 0}</span><span>🥉 ${progreso.bronces || 0}</span></div></header><div class="resumen-detalle-pais"><article><span>Récord de medallas</span><strong>${progreso.recordMedallas?.valor ?? "—"}</strong><small>${progreso.recordMedallas?.paisNombre || "Sin marca registrada"}</small></article><article><span>Récord de oros</span><strong>${progreso.recordOros?.valor ?? "—"}</strong><small>${progreso.recordOros?.paisNombre || "Sin marca registrada"}</small></article></div></section>`;
}

function crearCabeceraOrdenableEstadisticas(etiqueta, seccionOrden, clave) {
  const configuracion = ordenEstadisticas[seccionOrden];
  const activa = configuracion?.clave === clave;
  const icono = activa
    ? (configuracion.direccion === "asc" ? "↑" : "↓")
    : "↕";

  return `<span class="cabecera-columna-ordenable"><span>${etiqueta}</span><button class="boton-orden-estadisticas ${activa ? "activo" : ""}" type="button" data-orden-estadisticas="${seccionOrden}" data-clave-orden-estadisticas="${clave}" title="Ordenar por ${etiqueta}" aria-label="Ordenar por ${etiqueta}">${icono}</button></span>`;
}

function renderizarPaisesEstadisticas() {
  const filas = Object.entries(estadoCarrera.progresoPaises)
    .map(([codigo, progreso]) => {
      const pais = PAISES.find((item) => item.codigo === codigo);
      const resumenDeportes = obtenerResumenDeportesPais(progreso);
      const total = obtenerTotalMedallasProgreso(progreso);
      return {
        codigo,
        nombre: pais?.nombre || codigo,
        ...progreso,
        colores: {
          azul: progreso.colores?.azul || 0,
          verde: progreso.colores?.verde || 0,
          amarillo: progreso.colores?.amarillo || 0,
          rojo: progreso.colores?.rojo || 0
        },
        total,
        media: progreso.participaciones > 0 ? total / progreso.participaciones : 0,
        deporteMasUsado: resumenDeportes.deporteMasUsado
      };
    })
    .filter((fila) => fila.participaciones > 0);

  const filasOrdenadas = ordenarFilasEstadisticas(
    filas,
    ordenEstadisticas.paises,
    (a, b) => b.total - a.total || b.oros - a.oros
  );

  if (filasOrdenadas.length === 0 && !codigoPaisEstadisticasSeleccionado) {
    contenidoEstadisticas.innerHTML = `<p class="mensaje-estadisticas-vacio">Todavía no hay actuaciones de países registradas.</p>`;
    return;
  }

  let filaSeleccionada = filasOrdenadas.find(
    (fila) => fila.codigo === codigoPaisEstadisticasSeleccionado
  );

  if (!filaSeleccionada && codigoPaisEstadisticasSeleccionado) {
    const paisSeleccionado = PAISES.find(
      (pais) => pais.codigo === codigoPaisEstadisticasSeleccionado
    );

    if (paisSeleccionado) {
      const progreso = estadoCarrera.progresoPaises[codigoPaisEstadisticasSeleccionado] || {};
      const resumenDeportes = obtenerResumenDeportesPais(progreso);
      const total = obtenerTotalMedallasProgreso(progreso);

      filaSeleccionada = {
        codigo: paisSeleccionado.codigo,
        nombre: paisSeleccionado.nombre,
        participaciones: progreso.participaciones || 0,
        oros: progreso.oros || 0,
        platas: progreso.platas || 0,
        bronces: progreso.bronces || 0,
        colores: {
          azul: progreso.colores?.azul || 0,
          verde: progreso.colores?.verde || 0,
          amarillo: progreso.colores?.amarillo || 0,
          rojo: progreso.colores?.rojo || 0
        },
        deportes: progreso.deportes || {},
        total,
        media: progreso.participaciones > 0 ? total / progreso.participaciones : 0,
        deporteMasUsado: resumenDeportes.deporteMasUsado
      };
    }
  }

  contenidoEstadisticas.innerHTML = `
    ${renderizarDetallePaisEstadisticas(filaSeleccionada)}
    <section class="bloque-tabla-rendimiento"><h3>Rendimiento acumulado</h3><div class="tabla-estadisticas-contenedor">
      <table class="tabla-estadisticas tabla-paises-estadisticas">
        <thead><tr>
          <th>País</th>
          <th>${crearCabeceraOrdenableEstadisticas("Participaciones", "paises", "participaciones")}</th>
          <th>${crearCabeceraOrdenableEstadisticas("🥇", "paises", "oros")}</th>
          <th>${crearCabeceraOrdenableEstadisticas("🥈", "paises", "platas")}</th>
          <th>${crearCabeceraOrdenableEstadisticas("🥉", "paises", "bronces")}</th>
          <th>${crearCabeceraOrdenableEstadisticas("Total", "paises", "total")}</th>
          <th>${crearCabeceraOrdenableEstadisticas("Media por JJOO", "paises", "media")}</th>
          <th>Deporte más usado</th>
          <th>Colores</th>
        </tr></thead>
        <tbody>${filasOrdenadas.map((fila) => `
          <tr class="fila-pais-estadisticas ${fila.codigo === codigoPaisEstadisticasSeleccionado ? "seleccionada" : ""}" data-codigo-pais-estadisticas="${fila.codigo}" tabindex="0" role="button" aria-pressed="${fila.codigo === codigoPaisEstadisticasSeleccionado}" aria-label="Ver estadísticas detalladas de ${fila.nombre}">
            <td data-etiqueta="País"><strong>${fila.nombre}</strong><small>${fila.codigo}</small></td>
            <td data-etiqueta="Participaciones">${fila.participaciones}</td>
            <td data-etiqueta="Oros">${fila.oros}</td>
            <td data-etiqueta="Platas">${fila.platas}</td>
            <td data-etiqueta="Bronces">${fila.bronces}</td>
            <td data-etiqueta="Total"><strong>${fila.total}</strong></td>
            <td data-etiqueta="Media por JJOO">${formatearNumeroEstadistica(fila.media, 2)}</td>
            <td data-etiqueta="Deporte más usado">${fila.deporteMasUsado ? `<strong>${fila.deporteMasUsado.nombre}</strong><small>${fila.deporteMasUsado.participaciones} veces</small>` : `<span class="dato-no-disponible">Desde esta versión</span>`}</td>
            <td data-etiqueta="Colores">${crearLeyendaColoresPais(fila.colores)}</td>
          </tr>`).join("")}</tbody>
      </table>
    </div></section>
  `;
}

function seleccionarPaisEstadisticas(
  codigoPais
) {
  codigoPaisEstadisticasSeleccionado =
    codigoPaisEstadisticasSeleccionado ===
    codigoPais
      ? ""
      : codigoPais;

  renderizarPaisesEstadisticas();

  if (
    codigoPaisEstadisticasSeleccionado
  ) {
    contenidoEstadisticas
      .querySelector(
        ".detalle-pais-estadisticas"
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  }
}

function renderizarDeportesEstadisticas() {
  const filas = Object.entries(estadoCarrera.progresoDeportes)
    .map(([codigo, progreso]) => {
      const deporte = DEPORTES.find((item) => item.codigo === codigo);
      return {
        codigo,
        nombre: deporte?.nombre || codigo,
        ...progreso,
        total: obtenerTotalMedallasProgreso(progreso),
        valorRecordMedallas: progreso.recordMedallas?.valor || 0,
        valorRecordOros: progreso.recordOros?.valor || 0
      };
    })
    .filter((fila) => fila.apariciones > 0);

  const filasOrdenadas = ordenarFilasEstadisticas(
    filas,
    ordenEstadisticas.deportes,
    (a, b) => b.total - a.total || b.oros - a.oros
  );

  if (filasOrdenadas.length === 0) {
    contenidoEstadisticas.innerHTML = `<p class="mensaje-estadisticas-vacio">Todavía no hay actuaciones de deportes registradas.</p>`;
    return;
  }

  contenidoEstadisticas.innerHTML = `
    ${renderizarDetalleDeporteEstadisticas(codigoDeporteEstadisticasSeleccionado)}
    <section class="bloque-tabla-rendimiento"><h3>Rendimiento acumulado</h3><div class="tabla-estadisticas-contenedor">
      <table class="tabla-estadisticas">
        <thead><tr>
          <th>Deporte</th>
          <th>${crearCabeceraOrdenableEstadisticas("Apariciones", "deportes", "apariciones")}</th>
          <th>${crearCabeceraOrdenableEstadisticas("🥇", "deportes", "oros")}</th>
          <th>${crearCabeceraOrdenableEstadisticas("🥈", "deportes", "platas")}</th>
          <th>${crearCabeceraOrdenableEstadisticas("🥉", "deportes", "bronces")}</th>
          <th>${crearCabeceraOrdenableEstadisticas("Total", "deportes", "total")}</th>
          <th>${crearCabeceraOrdenableEstadisticas("Récord medallas", "deportes", "valorRecordMedallas")}</th>
          <th>${crearCabeceraOrdenableEstadisticas("Récord oros", "deportes", "valorRecordOros")}</th>
        </tr></thead>
        <tbody>${filasOrdenadas.map((fila) => `
          <tr>
            <td data-etiqueta="Deporte"><strong>${fila.nombre}</strong></td>
            <td data-etiqueta="Apariciones">${fila.apariciones}</td>
            <td data-etiqueta="Oros">${fila.oros}</td>
            <td data-etiqueta="Platas">${fila.platas}</td>
            <td data-etiqueta="Bronces">${fila.bronces}</td>
            <td data-etiqueta="Total"><strong>${fila.total}</strong></td>
            <td data-etiqueta="Récord medallas">${fila.recordMedallas ? `${fila.recordMedallas.valor} · ${fila.recordMedallas.paisNombre}` : "—"}</td>
            <td data-etiqueta="Récord oros">${fila.recordOros ? `${fila.recordOros.valor} · ${fila.recordOros.paisNombre}` : "—"}</td>
          </tr>`).join("")}</tbody>
      </table>
    </div></section>`;
}

function seleccionarDeporteEstadisticas(codigo) {
  codigoDeporteEstadisticasSeleccionado = codigoDeporteEstadisticasSeleccionado === codigo ? "" : codigo;
  renderizarDeportesEstadisticas();
  if (codigoDeporteEstadisticasSeleccionado) contenidoEstadisticas.querySelector(".detalle-deporte-estadisticas")?.scrollIntoView({behavior:"smooth",block:"start"});
}

function crearResultadoEdicionRecord(
  numeroEdicion,
  record
) {
  const edicion =
    estadoCarrera.historialEdiciones.find(
      (item) =>
        item.edicion === numeroEdicion
    );

  if (!edicion) {
    return `
      <p class="sin-detalle-record">
        El detalle completo no está disponible
        para esta edición anterior.
      </p>
    `;
  }

  return `
    <div class="detalle-edicion-record">
      <div class="medallero-edicion-record">
        <span>🥇 ${edicion.oros}</span>
        <span>🥈 ${edicion.platas}</span>
        <span>🥉 ${edicion.bronces}</span>
        <strong>${edicion.total} medallas</strong>
      </div>

      <div class="delegacion-edicion-record">
        ${(edicion.resultados || []).map(
          (resultado) => `
            <article class="${
              record?.paisNombre &&
              resultado.paisNombre ===
                record.paisNombre
                ? "resultado-record-destacado"
                : ""
            }">
              <div>
                <strong>
                  ${resultado.deporteNombre}
                </strong>
                <span>
                  ${resultado.paisNombre}
                </span>
              </div>

              <p>
                🥇 ${resultado.oros}
                · 🥈 ${resultado.platas}
                · 🥉 ${resultado.bronces}
              </p>
            </article>
          `
        ).join("")}
      </div>
    </div>
  `;
}

function crearTarjetaRecordEstadisticas(
  titulo,
  record
) {
  if (!record) {
    return `
      <article class="tarjeta-record-estadistica vacia">
        <strong>${titulo}</strong>
        <span>Sin marca registrada</span>
      </article>
    `;
  }

  return `
    <details class="tarjeta-record-estadistica">
      <summary>
        <span class="icono-record-estadistica">
          🏆
        </span>

        <div>
          <small>${titulo}</small>
          <strong>${record.valor}</strong>

          <p>
            🥇 ${record.oros ?? "—"}
            · 🥈 ${record.platas ?? "—"}
            · 🥉 ${record.bronces ?? "—"}
          </p>

          <p>
            Edición ${record.edicion}
            ${
              record.paisNombre
                ? ` · ${record.paisNombre}`
                : ""
            }
          </p>
        </div>
      </summary>

      ${crearResultadoEdicionRecord(
        record.edicion,
        record
      )}
    </details>
  `;
}


function renderizarRecordsEstadisticas() {
  const tarjetasDeportes =
    Object.entries(
      estadoCarrera.progresoDeportes
    )
      .filter(
        ([, progreso]) =>
          progreso.recordMedallas ||
          progreso.recordOros
      )
      .sort(([codigoA], [codigoB]) => {
        const nombreA =
          DEPORTES.find(
            (deporte) =>
              deporte.codigo === codigoA
          )?.nombre || codigoA;

        const nombreB =
          DEPORTES.find(
            (deporte) =>
              deporte.codigo === codigoB
          )?.nombre || codigoB;

        return nombreA.localeCompare(
          nombreB,
          "es"
        );
      })
      .map(([codigo, progreso]) => {
        const deporte =
          DEPORTES.find(
            (item) =>
              item.codigo === codigo
          );

        return `
          <section class="grupo-records-deporte">
            <h3>${deporte?.nombre || codigo}</h3>

            <div class="rejilla-records-estadisticas">
              ${crearTarjetaRecordEstadisticas(
                "Récord de medallas",
                progreso.recordMedallas
              )}

              ${crearTarjetaRecordEstadisticas(
                "Récord de oros",
                progreso.recordOros
              )}
            </div>
          </section>
        `;
      })
      .join("");

  contenidoEstadisticas.innerHTML = `
    <section class="rejilla-records-estadisticas globales">
      ${crearTarjetaRecordEstadisticas(
        "Récord absoluto de medallas",
        estadoCarrera.recordsGlobales.medallas
      )}

      ${crearTarjetaRecordEstadisticas(
        "Récord absoluto de oros",
        estadoCarrera.recordsGlobales.oros
      )}
    </section>

    <div class="lista-records-estadisticas">
      ${
        tarjetasDeportes ||
        `<p class="estado-vacio-estadisticas">
          Todavía no hay récords deportivos.
        </p>`
      }
    </div>
  `;
}

function obtenerDatosSorpresasEstadisticas() {
  const actuaciones = [];
  const ediciones = [];
  estadoCarrera.historialEdiciones.forEach((edicion) => {
    const resultados = (edicion.resultados || []).filter(
      (resultado) => Number.isFinite(resultado.fortunaIndice)
    );
    resultados.forEach((resultado) => actuaciones.push({
      ...resultado,
      edicion: edicion.edicion,
      total: (resultado.oros || 0) + (resultado.platas || 0) + (resultado.bronces || 0)
    }));
    if (resultados.length) {
      const fortunaTotal = resultados.reduce((suma, resultado) => suma + resultado.fortunaIndice, 0);
      ediciones.push({
        ...edicion,
        fortunaMedia: fortunaTotal / resultados.length,
        actuacionesConFortuna: resultados.length
      });
    }
  });
  return { actuaciones, ediciones };
}

function formatearIndiceFortuna(indice) {
  return `${indice >= 0 ? "+" : ""}${indice.toFixed(2)}`;
}

function crearTablaSorpresasActuaciones(titulo, filas, seccionOrden, tipo) {
  const topCinco = [...filas]
    .sort((a, b) =>
      tipo === "positiva"
        ? b.fortunaIndice - a.fortunaIndice
        : a.fortunaIndice - b.fortunaIndice
    )
    .slice(0, 5);
  const ordenadas = ordenarFilasEstadisticas(
    topCinco,
    ordenEstadisticas[seccionOrden],
    (a, b) => b.total - a.total
  );
  return `<section class="bloque-ranking-sorpresas ${tipo}"><h3>${titulo}</h3><div class="tabla-estadisticas-contenedor"><table class="tabla-estadisticas tabla-sorpresas"><thead><tr>
    <th>Actuación</th>
    <th>${crearCabeceraOrdenableEstadisticas("Edición", seccionOrden, "edicion")}</th>
    <th>${crearCabeceraOrdenableEstadisticas("🥇", seccionOrden, "oros")}</th>
    <th>${crearCabeceraOrdenableEstadisticas("🥈", seccionOrden, "platas")}</th>
    <th>${crearCabeceraOrdenableEstadisticas("🥉", seccionOrden, "bronces")}</th>
    <th>${crearCabeceraOrdenableEstadisticas("Total", seccionOrden, "total")}</th>
    <th>${crearCabeceraOrdenableEstadisticas("Fortuna", seccionOrden, "fortunaIndice")}</th>
  </tr></thead><tbody>${ordenadas.map((fila) => `<tr>
    <td data-etiqueta="Actuación"><strong>${fila.paisNombre}</strong><small>${fila.deporteNombre}</small></td>
    <td data-etiqueta="Edición">${fila.edicion}</td><td data-etiqueta="Oros">${fila.oros || 0}</td><td data-etiqueta="Platas">${fila.platas || 0}</td><td data-etiqueta="Bronces">${fila.bronces || 0}</td><td data-etiqueta="Total"><strong>${fila.total}</strong></td>
    <td data-etiqueta="Fortuna"><strong>${formatearIndiceFortuna(fila.fortunaIndice)}</strong><small>${fila.fortunaTexto || ""}</small></td>
  </tr>`).join("")}</tbody></table></div></section>`;
}

function crearTablaSorpresasEdiciones(titulo, filas, seccionOrden, tipo) {
  const topCinco = [...filas]
    .sort((a, b) =>
      tipo === "positiva"
        ? b.fortunaMedia - a.fortunaMedia
        : a.fortunaMedia - b.fortunaMedia
    )
    .slice(0, 5);
  const ordenadas = ordenarFilasEstadisticas(
    topCinco,
    ordenEstadisticas[seccionOrden],
    (a, b) => b.total - a.total
  );
  return `<section class="bloque-ranking-sorpresas ${tipo}"><h3>${titulo}</h3><div class="tabla-estadisticas-contenedor"><table class="tabla-estadisticas tabla-sorpresas"><thead><tr>
    <th>Edición</th><th>${crearCabeceraOrdenableEstadisticas("🥇", seccionOrden, "oros")}</th><th>${crearCabeceraOrdenableEstadisticas("🥈", seccionOrden, "platas")}</th><th>${crearCabeceraOrdenableEstadisticas("🥉", seccionOrden, "bronces")}</th><th>${crearCabeceraOrdenableEstadisticas("Total", seccionOrden, "total")}</th><th>${crearCabeceraOrdenableEstadisticas("Media fortuna", seccionOrden, "fortunaMedia")}</th>
  </tr></thead><tbody>${ordenadas.map((fila) => `<tr>
    <td data-etiqueta="Edición"><strong>JJOO ${fila.edicion}</strong><small>${fila.actuacionesConFortuna} actuaciones</small></td><td data-etiqueta="Oros">${fila.oros || 0}</td><td data-etiqueta="Platas">${fila.platas || 0}</td><td data-etiqueta="Bronces">${fila.bronces || 0}</td><td data-etiqueta="Total"><strong>${fila.total || 0}</strong></td><td data-etiqueta="Media fortuna"><strong>${formatearIndiceFortuna(fila.fortunaMedia)}</strong></td>
  </tr>`).join("")}</tbody></table></div></section>`;
}

function renderizarSorpresasEstadisticas() {
  const datos = obtenerDatosSorpresasEstadisticas();
  if (!datos.actuaciones.length || !datos.ediciones.length) {
    contenidoEstadisticas.innerHTML = `<div class="estado-vacio-estadisticas"><strong>Sin datos de fortuna todavía</strong><p>El seguimiento de sorpresas comienza con las ediciones que guardan el índice de fortuna.</p></div>`;
    return;
  }
  contenidoEstadisticas.innerHTML = `
    <section class="introduccion-sorpresas-estadisticas"><p class="marca">FORTUNA Y DECEPCIÓN</p><h2>Las mayores sorpresas de tu Carrera</h2><p>Las actuaciones comparan cada pareja país–deporte. La fortuna global de una edición es la media de todos sus índices registrados.</p></section>
    <div class="rejilla-rankings-sorpresas">
      ${crearTablaSorpresasActuaciones("Top 5 actuaciones más afortunadas", datos.actuaciones.filter((fila) => fila.fortunaIndice >= 0), "sorpresasActuacionesPositivas", "positiva")}
      ${crearTablaSorpresasActuaciones("Top 5 actuaciones más desafortunadas", datos.actuaciones.filter((fila) => fila.fortunaIndice < 0), "sorpresasActuacionesNegativas", "negativa")}
      ${crearTablaSorpresasEdiciones("Top 5 ediciones más afortunadas", datos.ediciones.filter((fila) => fila.fortunaMedia >= 0), "sorpresasEdicionesPositivas", "positiva")}
      ${crearTablaSorpresasEdiciones("Top 5 ediciones más desafortunadas", datos.ediciones.filter((fila) => fila.fortunaMedia < 0), "sorpresasEdicionesNegativas", "negativa")}
    </div>`;
}

function renderizarHistorialEstadisticas() {
  const historial = [
    ...estadoCarrera.historialEdiciones
  ].reverse();

  if (historial.length === 0) {
    contenidoEstadisticas.innerHTML = `
      <div class="estado-vacio-estadisticas">
        <strong>
          El historial detallado empieza ahora
        </strong>

        <p>
          Las estadísticas acumuladas anteriores
          se conservan. A partir de esta versión,
          cada nueva edición guardará su resumen.
        </p>
      </div>
    `;

    return;
  }

  contenidoEstadisticas.innerHTML = `
    <div class="lista-historial-estadisticas">
      ${historial.map((edicion) => `
        <details class="edicion-historial">
          <summary>
            <div>
              <strong>
                JJOO ${edicion.edicion}
              </strong>

              <span>
                +${edicion.experiencia} EXP
                · ${edicion.recordsBatidos} récords
                · ${edicion.logros.length} logros
              </span>
            </div>

            <div class="medallero-historial">
              <span>🥇 ${edicion.oros}</span>
              <span>🥈 ${edicion.platas}</span>
              <span>🥉 ${edicion.bronces}</span>
              <strong>${edicion.total}</strong>
            </div>
          </summary>

          <div class="resultados-historial">
            ${edicion.resultados.map(
              (resultado) => `
                <article>
                  <div>
                    <strong>
                      ${resultado.deporteNombre}
                    </strong>
                    <span>
                      ${resultado.paisNombre}
                    </span>
                  </div>

                  <div>
                    🥇 ${resultado.oros}
                    · 🥈 ${resultado.platas}
                    · 🥉 ${resultado.bronces}
                  </div>
                </article>
              `
            ).join("")}
          </div>
        </details>
      `).join("")}
    </div>
  `;
}

function renderizarEstadisticas() {
  if (
    seccionEstadisticasActual ===
    "paises"
  ) {
    renderizarPaisesEstadisticas();
    return;
  }

  if (
    seccionEstadisticasActual ===
    "deportes"
  ) {
    renderizarDeportesEstadisticas();
    return;
  }

  if (
    seccionEstadisticasActual ===
    "records"
  ) {
    renderizarRecordsEstadisticas();
    return;
  }

  if (
    seccionEstadisticasActual ===
    "sorpresas"
  ) {
    renderizarSorpresasEstadisticas();
    return;
  }

  if (
    seccionEstadisticasActual ===
    "historial"
  ) {
    renderizarHistorialEstadisticas();
    return;
  }

  renderizarResumenEstadisticas();
}

contenidoCatalogoPaises.addEventListener("click", (evento) => {
  const tarjeta = evento.target.closest("[data-codigo-pais-catalogo]");
  if (tarjeta) abrirDetallePaisDesdeCatalogo(tarjeta.dataset.codigoPaisCatalogo);
});

contenidoCatalogoDeportes.addEventListener("click", (evento) => {
  const tarjeta = evento.target.closest("[data-codigo-deporte-catalogo]");
  if (tarjeta) abrirDetalleDeporteDesdeCatalogo(tarjeta.dataset.codigoDeporteCatalogo);
});

contenidoEstadisticas.addEventListener(
  "click",
  (evento) => {
    const botonOrden = evento.target.closest(
      "[data-orden-estadisticas]"
    );

    if (botonOrden) {
      const seccionOrden = botonOrden.dataset.ordenEstadisticas;
      const clave = botonOrden.dataset.claveOrdenEstadisticas;
      const configuracion = ordenEstadisticas[seccionOrden];

      if (configuracion) {
        if (configuracion.clave === clave) {
          configuracion.direccion = configuracion.direccion === "asc" ? "desc" : "asc";
        } else {
          configuracion.clave = clave;
          configuracion.direccion = "desc";
        }
        renderizarEstadisticas();
      }
      return;
    }

    const tarjetaDeporte = evento.target.closest(
      "[data-codigo-deporte-estadisticas]"
    );

    if (tarjetaDeporte) {
      seleccionarDeporteEstadisticas(
        tarjetaDeporte.dataset.codigoDeporteEstadisticas
      );
      return;
    }

    const fila = evento.target.closest(
      "[data-codigo-pais-estadisticas]"
    );

    if (!fila) {
      return;
    }

    seleccionarPaisEstadisticas(
      fila.dataset
        .codigoPaisEstadisticas
    );
  }
);

contenidoEstadisticas.addEventListener(
  "keydown",
  (evento) => {
    if (
      evento.key !== "Enter" &&
      evento.key !== " "
    ) {
      return;
    }

    const tarjetaDeporte = evento.target.closest(
      "[data-codigo-deporte-estadisticas]"
    );

    if (tarjetaDeporte) {
      evento.preventDefault();
      seleccionarDeporteEstadisticas(
        tarjetaDeporte.dataset.codigoDeporteEstadisticas
      );
      return;
    }

    const fila = evento.target.closest(
      "[data-codigo-pais-estadisticas]"
    );

    if (!fila) {
      return;
    }

    evento.preventDefault();

    seleccionarPaisEstadisticas(
      fila.dataset
        .codigoPaisEstadisticas
    );
  }
);

function cambiarSeccionEstadisticas(
  seccion,
  botonPulsado
) {
  seccionEstadisticasActual =
    seccion;

  if (seccion !== "paises") {
    codigoPaisEstadisticasSeleccionado = "";
  }

  if (seccion !== "deportes") {
    codigoDeporteEstadisticasSeleccionado = "";
  }

  filtrosEstadisticas
    .querySelectorAll(
      "[data-seccion-estadisticas]"
    )
    .forEach((boton) => {
      boton.classList.toggle(
        "activo",
        boton === botonPulsado
      );
    });

  renderizarEstadisticas();
}

const CODIGOS_SORTEO_NIVEL7 = [
  "FIJ",
  "SMR",
  "KEN"
];

let intervaloSorteoNivel7 = null;
let paisTemporalSorteoNivel7 = null;
let sorteoNivel7EnCurso = false;

function reiniciarVistaNivel7() {
  faseSorteoNivel7.classList.remove(
    "oculto"
  );

  faseResumenNivel7.classList.add(
    "oculto"
  );

  botonIniciarSorteoNivel7.disabled =
    false;

  botonIniciarSorteoNivel7.textContent =
    "Iniciar sorteo";

  nombrePaisSorteoNivel7.textContent =
    "Fiji · San Marino · Kenia";

  textoEstadoSorteoNivel7.textContent =
    "Pulsa para descubrir qué país se une a tu delegación";

  banderaSorteoNivel7.style.display =
    "none";

  banderaAlternativaSorteoNivel7.style.display =
    "grid";

  banderaAlternativaSorteoNivel7.textContent =
    "?";

  paisTemporalSorteoNivel7 = null;
  sorteoNivel7EnCurso = false;

  mensajeDatosNivel7.classList.add(
    "oculto"
  );

  mensajeDatosNivel7.textContent = "";
}

function abrirModalRecompensaNivel7() {
  reiniciarVistaNivel7();

  const faltantes =
    CODIGOS_SORTEO_NIVEL7.filter(
      (codigo) =>
        !obtenerPaisPorCodigo(codigo)
    );

  const tenisDisponible =
    DEPORTES.some(
      (deporte) =>
        deporte.codigo === "tenis"
    );

  if (
    faltantes.length > 0 ||
    !tenisDisponible
  ) {
    mensajeDatosNivel7.classList.remove(
      "oculto"
    );

    const partes = [];

    if (faltantes.length > 0) {
      partes.push(
        "Faltan los países: " +
        faltantes.join(", ")
      );
    }

    if (!tenisDisponible) {
      partes.push(
        "Falta el deporte Tenis"
      );
    }

    mensajeDatosNivel7.textContent =
      partes.join(". ") + ".";

    botonIniciarSorteoNivel7.disabled =
      true;
  }

  modalRecompensaNivel7.classList.remove(
    "oculto"
  );
}

function cerrarModalRecompensaNivel7() {
  if (intervaloSorteoNivel7) {
    clearInterval(
      intervaloSorteoNivel7
    );

    intervaloSorteoNivel7 = null;
  }

  modalRecompensaNivel7.classList.add(
    "oculto"
  );
}

function mostrarPaisEnRuletaNivel7(pais) {
  cargarBandera(
    banderaSorteoNivel7,
    banderaAlternativaSorteoNivel7,
    pais
  );

  nombrePaisSorteoNivel7.textContent =
    pais.nombre;
}

function iniciarSorteoNivel7() {
  if (sorteoNivel7EnCurso) {
    return;
  }

  const paises =
    CODIGOS_SORTEO_NIVEL7
      .map(obtenerPaisPorCodigo)
      .filter(Boolean);

  if (
    paises.length !==
    CODIGOS_SORTEO_NIVEL7.length
  ) {
    return;
  }

  sorteoNivel7EnCurso = true;

  botonIniciarSorteoNivel7.disabled =
    true;

  botonIniciarSorteoNivel7.textContent =
    "Sorteando...";

  textoEstadoSorteoNivel7.textContent =
    "El azar decidirá tu nueva oportunidad";

  let indice = 0;
  let cambios = 0;

  intervaloSorteoNivel7 = setInterval(
    () => {
      mostrarPaisEnRuletaNivel7(
        paises[indice]
      );

      indice =
        (indice + 1) %
        paises.length;

      cambios += 1;

      if (cambios >= 21) {
        clearInterval(
          intervaloSorteoNivel7
        );

        intervaloSorteoNivel7 = null;

        paisTemporalSorteoNivel7 =
          paises[
            Math.floor(
              Math.random() *
              paises.length
            )
          ];

        mostrarPaisEnRuletaNivel7(
          paisTemporalSorteoNivel7
        );

        textoEstadoSorteoNivel7.textContent =
          "¡País desbloqueado!";

        nombrePaisResumenNivel7.textContent =
          paisTemporalSorteoNivel7.nombre;

        botonIniciarSorteoNivel7.textContent =
          "Ver recompensa completa";

        botonIniciarSorteoNivel7.disabled =
          false;

        sorteoNivel7EnCurso = false;
      }
    },
    105
  );
}

function gestionarBotonSorteoNivel7() {
  if (!paisTemporalSorteoNivel7) {
    iniciarSorteoNivel7();
    return;
  }

  faseSorteoNivel7.classList.add(
    "oculto"
  );

  faseResumenNivel7.classList.remove(
    "oculto"
  );
}

function completarRecompensaNivel7() {
  if (!paisTemporalSorteoNivel7) {
    return;
  }

  const codigoPais =
    paisTemporalSorteoNivel7.codigo;

  if (
    !estadoCarrera.paisesDesbloqueados.includes(
      codigoPais
    )
  ) {
    estadoCarrera.paisesDesbloqueados.push(
      codigoPais
    );
  }

  if (
    !estadoCarrera.deportesDesbloqueados.includes(
      "tenis"
    )
  ) {
    estadoCarrera.deportesDesbloqueados.push(
      "tenis"
    );
  }

  estadoCarrera.paisTrampaNivel7 =
    codigoPais;

  estadoCarrera.ochoParticipantesDesbloqueados =
    true;

  estadoCarrera.nivel7Completado =
    true;

  completarRecompensaPendiente(
    "nivel_7_pais_tenis_ocho"
  );

  actualizarHubCarrera();
  cerrarModalRecompensaNivel7();

  setTimeout(
    mostrarSiguienteRecompensaPendiente,
    250
  );
}

function abrirPantallaBetaSuperada() {
  estadoCarrera.faseBetaSuperada =
    true;

  completarRecompensaPendiente(
    "nivel_8_beta_superada"
  );

  const medallero =
    estadoCarrera.medalleroTotal || {
      oros: 0,
      platas: 0,
      bronces: 0
    };

  const totalMedallas =
    (medallero.oros || 0) +
    (medallero.platas || 0) +
    (medallero.bronces || 0);

  betaNombreDelegacion.textContent =
    estadoCarrera.nombreDelegacion ||
    "Tu delegación";

  betaJuegosDisputados.textContent =
    estadoCarrera.juegosDisputados;

  betaLogrosConseguidos.textContent =
    estadoCarrera.logrosConseguidos.length;

  betaMedallasTotales.textContent =
    totalMedallas;

  betaOrosTotales.textContent =
    medallero.oros || 0;

  guardarCarrera(estadoCarrera);
  mostrarPantalla(
    pantallaBetaSuperada
  );
}

function seguirCarreraTrasBetaSuperada() {
  actualizarHubCarrera();
  mostrarPantalla(pantallaCarrera);
}

function nuevaCarreraTrasBetaSuperada() {
  const confirmar = window.confirm(
    "¿Quieres empezar una Carrera nueva? " +
    "Se borrará todo el progreso de la Carrera actual."
  );

  if (!confirmar) {
    return;
  }

  localStorage.removeItem(CLAVE_CARRERA);
  estadoCarrera = crearEstadoInicialCarrera();
  guardarCarrera(estadoCarrera);
  iniciarModoCarrera();
}


function obtenerMejorPaisCarrera() {
  return Object.entries(
    estadoCarrera.progresoPaises || {}
  )
    .map(([codigo, progreso]) => {
      const pais =
        PAISES.find(
          (item) =>
            item.codigo === codigo
        );

      const total =
        (progreso.oros || 0) +
        (progreso.platas || 0) +
        (progreso.bronces || 0);

      return {
        nombre: pais?.nombre || codigo,
        total: total,
        oros: progreso.oros || 0
      };
    })
    .sort(
      (a, b) =>
        b.total - a.total ||
        b.oros - a.oros
    )[0] || {
      nombre: "Sin datos",
      total: 0,
      oros: 0
    };
}

async function generarImagenResumenCarrera() {
  const canvas = canvasCompartirResultado;
  const contexto = canvas.getContext("2d");

  if (!contexto) {
    throw new Error(
      "El navegador no permite crear el canvas."
    );
  }

  const ancho = canvas.width;
  const alto = canvas.height;
  const medallero = estadoCarrera.medalleroTotal;
  const total =
    medallero.oros +
    medallero.platas +
    medallero.bronces;
  const logros =
    obtenerLogrosDisponiblesCarrera()
      .filter((logro) =>
        estadoCarrera.logrosConseguidos.includes(
          logro.id
        )
      ).length;
  const mejorPais = obtenerMejorPaisCarrera();
  const nombre =
    estadoCarrera.nombreDelegacion ||
    "Tu delegación";

  contexto.clearRect(0, 0, ancho, alto);

  const fondo = contexto.createLinearGradient(
    0,
    0,
    0,
    alto
  );
  fondo.addColorStop(0, "#142957");
  fondo.addColorStop(1, "#07142f");
  contexto.fillStyle = fondo;
  contexto.fillRect(0, 0, ancho, alto);

  contexto.strokeStyle = "#f4c63f";
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
  contexto.fillText("ROAD TO GOLD", ancho / 2, 115);

  contexto.fillStyle = "#ffffff";
  contexto.font = "800 48px Arial";
  contexto.fillText("CARRERA · FASE BETA", ancho / 2, 180);

  contexto.fillStyle = "#aebbd5";
  contexto.font = "600 27px Arial";
  contexto.fillText(
    ajustarTextoCanvas(contexto, nombre, 820),
    ancho / 2,
    230
  );

  contexto.fillStyle = "#f4c63f";
  contexto.font = "900 112px Arial";
  contexto.fillText(String(total), ancho / 2, 380);

  contexto.fillStyle = "#ffffff";
  contexto.font = "700 30px Arial";
  contexto.fillText("MEDALLAS ACUMULADAS", ancho / 2, 425);

  const medallas = [
    ["🥇", medallero.oros, "OROS"],
    ["🥈", medallero.platas, "PLATAS"],
    ["🥉", medallero.bronces, "BRONCES"]
  ];

  medallas.forEach(([icono, valor, etiqueta], indice) => {
    const x = 195 + indice * 345;
    contexto.fillStyle = "rgba(255,255,255,0.055)";
    dibujarRectanguloRedondeado(
      contexto,
      x - 135,
      470,
      270,
      145,
      22
    );
    contexto.fill();
    contexto.fillStyle = "#ffffff";
    contexto.font = "700 35px Arial";
    contexto.fillText(`${icono} ${valor}`, x, 530);
    contexto.fillStyle = "#aebbd5";
    contexto.font = "700 18px Arial";
    contexto.fillText(etiqueta, x, 573);
  });

  const datos = [
    ["JJOO DISPUTADOS", estadoCarrera.juegosDisputados],
    ["LOGROS", logros],
    ["NIVEL", "8 · MÁXIMO BETA"]
  ];

  datos.forEach(([etiqueta, valor], indice) => {
    const y = 700 + indice * 135;
    contexto.fillStyle = "rgba(255,255,255,0.055)";
    dibujarRectanguloRedondeado(
      contexto,
      110,
      y,
      ancho - 220,
      105,
      20
    );
    contexto.fill();
    contexto.textAlign = "left";
    contexto.fillStyle = "#aebbd5";
    contexto.font = "700 20px Arial";
    contexto.fillText(etiqueta, 150, y + 42);
    contexto.textAlign = "right";
    contexto.fillStyle = "#ffffff";
    contexto.font = "800 31px Arial";
    contexto.fillText(String(valor), ancho - 150, y + 65);
  });

  contexto.textAlign = "center";
  contexto.fillStyle = "#ffffff";
  contexto.font = "700 25px Arial";
  contexto.fillText(
    `Mejor país: ${ajustarTextoCanvas(contexto, mejorPais.nombre, 600)}`,
    ancho / 2,
    1125
  );
  contexto.fillStyle = "#aebbd5";
  contexto.font = "600 21px Arial";
  contexto.fillText(
    `${mejorPais.total} medallas acumuladas`,
    ancho / 2,
    1162
  );

  contexto.fillStyle = "#f4c63f";
  contexto.font = "800 29px Arial";
  contexto.fillText("@SportsOnData en X", ancho / 2, 1230);
  contexto.fillStyle = "#ffffff";
  contexto.font = "600 24px Arial";
  contexto.fillText(URL_COMPARTIR_ROAD_TO_GOLD, ancho / 2, 1275);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("No se pudo crear la imagen."));
        }
      },
      "image/png"
    );
  });
}

async function compartirResumenCarrera() {
  registrarEventoAnalitica("share_result", { share_surface: "career_summary" });
  const medallero = estadoCarrera.medalleroTotal;
  const total =
    medallero.oros +
    medallero.platas +
    medallero.bronces;
  const logros =
    obtenerLogrosDisponiblesCarrera()
      .filter((logro) =>
        estadoCarrera.logrosConseguidos.includes(
          logro.id
        )
      ).length;
  const mejorPais = obtenerMejorPaisCarrera();
  const texto =
    `He completado la primera fase de mi Carrera ` +
    `en Road to Gold con ${total} medallas, ` +
    `${medallero.oros} oros y ${logros} logros. ` +
    `Mi mejor país ha sido ${mejorPais.nombre} ` +
    `con ${mejorPais.total} medallas.\n\n` +
    `¿Puedes construir una delegación mejor?\n` +
    `Dame tu feedback en @SportsOnData en X.\n` +
    `${URL_COMPARTIR_ROAD_TO_GOLD}`;

  botonCompartirCarrera.disabled = true;

  try {
    const blob = await generarImagenResumenCarrera();
    const archivo = new File(
      [blob],
      "road-to-gold-carrera.png",
      { type: "image/png" }
    );

    if (
      navigator.share &&
      navigator.canShare?.({ files: [archivo] })
    ) {
      await navigator.share({
        title: "Mi Carrera en Road to Gold",
        text: texto,
        files: [archivo]
      });
      return;
    }

    descargarImagenResultado(blob);

    try {
      await navigator.clipboard.writeText(texto);
      window.alert(
        "Imagen descargada y resumen copiado."
      );
    } catch (errorPortapapeles) {
      window.prompt(
        "La imagen se ha descargado. Copia este resultado:",
        texto
      );
    }
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.error(
        "Error al compartir la Carrera:",
        error
      );
      window.prompt("Copia este resultado:", texto);
    }
  } finally {
    botonCompartirCarrera.disabled = false;
  }
}



const CODIGOS_SORTEO_NIVEL6 = [
  "JPN",
  "GBR",
  "CAN"
];

const CODIGOS_ELECCION_NIVEL6 = [
  "RSA",
  "ROU"
];

let intervaloSorteoNivel6 = null;
let paisTemporalSorteoNivel6 = null;
let paisElegidoTemporalNivel6 = null;
let sorteoNivel6EnCurso = false;

function obtenerPaisesNivel6(codigos) {
  return codigos
    .map(obtenerPaisPorCodigo)
    .filter(Boolean);
}

function obtenerCodigosSorteoDisponiblesNivel6() {
  return CODIGOS_SORTEO_NIVEL6.filter(
    (codigo) =>
      !estadoCarrera.paisesDesbloqueados.includes(
        codigo
      )
  );
}

function mostrarErrorDatosNivel6(codigosFaltantes) {
  mensajeDatosNivel6.classList.remove(
    "oculto"
  );

  mensajeDatosNivel6.textContent =
    "Faltan en datos/paises.js los países: " +
    codigosFaltantes.join(", ") +
    ". Añádelos con sus notas definitivas para " +
    "poder completar esta recompensa.";
}

function ocultarErrorDatosNivel6() {
  mensajeDatosNivel6.classList.add(
    "oculto"
  );

  mensajeDatosNivel6.textContent = "";
}

function comprobarDatosNivel6() {
  const codigosNecesarios = [
    ...CODIGOS_SORTEO_NIVEL6,
    ...CODIGOS_ELECCION_NIVEL6
  ];

  const codigosFaltantes =
    codigosNecesarios.filter(
      (codigo) =>
        !obtenerPaisPorCodigo(codigo)
    );

  return codigosFaltantes;
}

function reiniciarVistaNivel6() {
  faseSorteoNivel6.classList.remove(
    "oculto"
  );

  faseEleccionNivel6.classList.add(
    "oculto"
  );

  faseResumenNivel6.classList.add(
    "oculto"
  );

  botonIniciarSorteoNivel6.disabled =
    false;

  botonIniciarSorteoNivel6.textContent =
    "Iniciar sorteo";

  const nombresPaisesDisponibles =
    obtenerPaisesNivel6(
      obtenerCodigosSorteoDisponiblesNivel6()
    ).map((pais) => pais.nombre);

  nombrePaisSorteoNivel6.textContent =
    nombresPaisesDisponibles.join(" · ") ||
    "Todos los países ya están desbloqueados";

  textoEstadoSorteoNivel6.textContent =
    "Pulsa para iniciar el sorteo";

  banderaSorteoNivel6.style.display =
    "none";

  banderaAlternativaSorteoNivel6.style.display =
    "grid";

  banderaAlternativaSorteoNivel6.textContent =
    "?";

  paisTemporalSorteoNivel6 = null;
  paisElegidoTemporalNivel6 = null;
  sorteoNivel6EnCurso = false;
}

function prepararBanderasEleccionNivel6() {
  const sudafrica =
    obtenerPaisPorCodigo("RSA");

  const rumania =
    obtenerPaisPorCodigo("ROU");

  if (sudafrica) {
    cargarBandera(
      banderaSudafricaNivel6,
      banderaAlternativaSudafricaNivel6,
      sudafrica
    );
  }

  if (rumania) {
    cargarBandera(
      banderaRumaniaNivel6,
      banderaAlternativaRumaniaNivel6,
      rumania
    );
  }
}

function abrirModalRecompensaNivel6() {
  reiniciarVistaNivel6();
  ocultarErrorDatosNivel6();

  const codigosFaltantes =
    comprobarDatosNivel6();

  if (codigosFaltantes.length > 0) {
    mostrarErrorDatosNivel6(
      codigosFaltantes
    );

    botonIniciarSorteoNivel6.disabled =
      true;
  }

  prepararBanderasEleccionNivel6();

  modalRecompensaNivel6.classList.remove(
    "oculto"
  );
}

function cerrarModalRecompensaNivel6() {
  if (intervaloSorteoNivel6) {
    clearInterval(
      intervaloSorteoNivel6
    );

    intervaloSorteoNivel6 = null;
  }

  modalRecompensaNivel6.classList.add(
    "oculto"
  );
}

function mostrarPaisEnRuletaNivel6(pais) {
  if (!pais) {
    return;
  }

  cargarBandera(
    banderaSorteoNivel6,
    banderaAlternativaSorteoNivel6,
    pais
  );

  nombrePaisSorteoNivel6.textContent =
    pais.nombre;
}

function iniciarSorteoNivel6() {
  if (sorteoNivel6EnCurso) {
    return;
  }

  const codigosDisponibles =
    obtenerCodigosSorteoDisponiblesNivel6();

  const paisesDisponibles =
    obtenerPaisesNivel6(
      codigosDisponibles
    );

  const codigosFaltantes =
    codigosDisponibles.filter(
      (codigo) =>
        !obtenerPaisPorCodigo(codigo)
    );

  if (codigosFaltantes.length > 0) {
    mostrarErrorDatosNivel6(
      codigosFaltantes
    );

    return;
  }

  if (paisesDisponibles.length === 0) {
    mensajeDatosNivel6.classList.remove(
      "oculto"
    );

    mensajeDatosNivel6.textContent =
      "Todos los países de este sorteo ya están desbloqueados.";

    return;
  }

  sorteoNivel6EnCurso = true;
  botonIniciarSorteoNivel6.disabled =
    true;

  botonIniciarSorteoNivel6.textContent =
    "Sorteando...";

  textoEstadoSorteoNivel6.textContent =
    "Buscando un nuevo país para la delegación";

  let indiceVisual = 0;
  let cambiosRealizados = 0;

  intervaloSorteoNivel6 = setInterval(
    () => {
      mostrarPaisEnRuletaNivel6(
        paisesDisponibles[indiceVisual]
      );

      indiceVisual =
        (indiceVisual + 1) %
        paisesDisponibles.length;

      cambiosRealizados += 1;

      if (cambiosRealizados >= 18) {
        clearInterval(
          intervaloSorteoNivel6
        );

        intervaloSorteoNivel6 = null;

        const indiceGanador =
          Math.floor(
            Math.random() *
            paisesDisponibles.length
          );

        paisTemporalSorteoNivel6 =
          paisesDisponibles[
            indiceGanador
          ];

        mostrarPaisEnRuletaNivel6(
          paisTemporalSorteoNivel6
        );

        textoEstadoSorteoNivel6.textContent =
          "¡Nuevo país desbloqueado!";

        botonIniciarSorteoNivel6.textContent =
          "Continuar";

        botonIniciarSorteoNivel6.disabled =
          false;

        sorteoNivel6EnCurso = false;
      }
    },
    110
  );
}

function continuarTrasSorteoNivel6() {
  if (!paisTemporalSorteoNivel6) {
    iniciarSorteoNivel6();
    return;
  }

  faseSorteoNivel6.classList.add(
    "oculto"
  );

  faseEleccionNivel6.classList.remove(
    "oculto"
  );
}

function gestionarBotonSorteoNivel6() {
  if (paisTemporalSorteoNivel6) {
    continuarTrasSorteoNivel6();
    return;
  }

  iniciarSorteoNivel6();
}

function elegirSegundoPaisNivel6(
  codigoPais
) {
  if (
    !CODIGOS_ELECCION_NIVEL6.includes(
      codigoPais
    )
  ) {
    return;
  }

  const pais =
    obtenerPaisPorCodigo(codigoPais);

  if (!pais) {
    mostrarErrorDatosNivel6([
      codigoPais
    ]);

    return;
  }

  paisElegidoTemporalNivel6 = pais;

  nombrePaisAleatorioResumenNivel6.textContent =
    paisTemporalSorteoNivel6.nombre;

  nombrePaisElegidoResumenNivel6.textContent =
    paisElegidoTemporalNivel6.nombre;

  faseEleccionNivel6.classList.add(
    "oculto"
  );

  faseResumenNivel6.classList.remove(
    "oculto"
  );
}

function completarRecompensaNivel6() {
  if (
    !paisTemporalSorteoNivel6 ||
    !paisElegidoTemporalNivel6
  ) {
    return;
  }

  const nuevosPaises = [
    paisTemporalSorteoNivel6.codigo,
    paisElegidoTemporalNivel6.codigo
  ];

  nuevosPaises.forEach((codigoPais) => {
    if (
      !estadoCarrera.paisesDesbloqueados.includes(
        codigoPais
      )
    ) {
      estadoCarrera.paisesDesbloqueados.push(
        codigoPais
      );
    }
  });

  if (
    !estadoCarrera.deportesDesbloqueados.includes(
      "ciclismo"
    )
  ) {
    estadoCarrera.deportesDesbloqueados.push(
      "ciclismo"
    );
  }

  estadoCarrera.paisAleatorioNivel6 =
    paisTemporalSorteoNivel6.codigo;

  estadoCarrera.paisElegidoNivel6 =
    paisElegidoTemporalNivel6.codigo;

  estadoCarrera.nivel6Completado =
    true;

  completarRecompensaPendiente(
    "nivel_6_dos_paises_ciclismo"
  );

  actualizarHubCarrera();
  cerrarModalRecompensaNivel6();

  setTimeout(
    mostrarSiguienteRecompensaPendiente,
    250
  );
}


let categoriaLogrosActual = "todos";

function abrirPantallaLogros() {
  if (
    !estadoCarrera?.logrosDesbloqueados
  ) {
    return;
  }

  categoriaLogrosActual = "todos";

  filtrosLogros
    .querySelectorAll("[data-categoria-logro]")
    .forEach((boton) => {
      boton.classList.toggle(
        "activo",
        boton.dataset.categoriaLogro ===
          "todos"
      );
    });

  renderizarPantallaLogros();
  mostrarPantalla(pantallaLogros);
}

function calcularExperienciaLogrosConseguidos() {
  return obtenerLogrosDisponiblesCarrera().reduce(
    (total, logro) => {
      if (
        estadoCarrera.logrosConseguidos.includes(
          logro.id
        )
      ) {
        return total + logro.experiencia;
      }

      return total;
    },
    0
  );
}

function renderizarPantallaLogros() {
  const logrosDisponiblesCarrera =
    obtenerLogrosDisponiblesCarrera();

  const disponibles =
    logrosDisponiblesCarrera.length;

  const conseguidos =
    logrosDisponiblesCarrera.filter(
      (logro) =>
        estadoCarrera.logrosConseguidos.includes(
          logro.id
        )
    ).length;

  cantidadLogrosConseguidos.textContent =
    conseguidos;

  cantidadLogrosDisponibles.textContent =
    disponibles;

  porcentajeLogros.textContent =
    disponibles > 0
      ? `${Math.round(
          conseguidos / disponibles * 100
        )} %`
      : "0 %";

  experienciaTotalLogros.textContent =
    `${calcularExperienciaLogrosConseguidos()} EXP`;

  const logrosFiltrados =
    obtenerLogrosActivosPorCategoria(
      categoriaLogrosActual
    );

  listaLogros.innerHTML =
    logrosFiltrados.map((logro) => {
      const conseguido =
        estadoCarrera.logrosConseguidos.includes(
          logro.id
        );

      const detalle =
        estadoCarrera.detalleLogros[
          logro.id
        ];

      const textoDetalle =
        conseguido && detalle
          ? `Conseguido en la edición ` +
            `${detalle.edicion}`
          : obtenerNombreCategoriaLogro(
              logro.categoria
            );

      return `
        <article
          class="tarjeta-logro ${
            conseguido
              ? "logro-conseguido"
              : "logro-bloqueado"
          }"
        >
          <div class="icono-tarjeta-logro">
            ${
              conseguido
                ? "✓"
                : obtenerIconoCategoriaLogro(
                    logro.categoria
                  )
            }
          </div>

          <div class="contenido-tarjeta-logro">
            <div class="cabecera-tarjeta-logro">
              <strong>${logro.nombre}</strong>

              <span class="exp-tarjeta-logro">
                +${logro.experiencia} EXP
              </span>
            </div>

            <p>${logro.descripcion}</p>

            <small>${textoDetalle}</small>

            ${crearHtmlProgresoLogro(logro)}
          </div>
        </article>
      `;
    }).join("");
}

function cambiarCategoriaLogros(
  categoria,
  botonPulsado
) {
  categoriaLogrosActual = categoria;

  filtrosLogros
    .querySelectorAll("[data-categoria-logro]")
    .forEach((boton) => {
      boton.classList.toggle(
        "activo",
        boton === botonPulsado
      );
    });

  renderizarPantallaLogros();
}

function mostrarLogrosResultadoCarrera(
  logrosNuevos
) {
  if (
    !logrosNuevos ||
    logrosNuevos.length === 0
  ) {
    resumenLogrosConseguidos.classList.add(
      "oculto"
    );

    listaLogrosConseguidos.innerHTML = "";
    return;
  }

  resumenLogrosConseguidos.classList.remove(
    "oculto"
  );

  resumenLogrosConseguidos.open = true;

  botonDesplegarLogrosConseguidos.textContent =
    `Logros conseguidos (${logrosNuevos.length})`;

  listaLogrosConseguidos.innerHTML =
    logrosNuevos.map((logro) => `
      <article class="logro-conseguido-resultado">
        <span class="icono-logro-resultado">
          ${obtenerIconoCategoriaLogro(
            logro.categoria
          )}
        </span>

        <div>
          <strong>${logro.nombre}</strong>
          <p>${logro.descripcion}</p>
        </div>

        <span class="exp-logro-resultado">
          +${logro.experiencia} EXP
        </span>
      </article>
    `).join("");
}

function borrarCarreraGuardada() {
  const confirmar = window.confirm(
    "¿Seguro que quieres borrar toda la Carrera?"
  );

  if (!confirmar) {
    return;
  }

  localStorage.removeItem(CLAVE_CARRERA);

  estadoCarrera =
    crearEstadoInicialCarrera();

  guardarCarrera(estadoCarrera);
  actualizarHubCarrera();

  window.alert(
    "La Carrera se ha reiniciado correctamente."
  );
}


function crearRegistroRecordCarrera({
  valor,
  numeroEdicion,
  oros,
  platas,
  bronces,
  pais = null
}) {
  return {
    valor: valor,
    edicion: numeroEdicion,
    fecha: new Date().toISOString(),

    paisCodigo:
      pais?.codigo || "",

    paisNombre:
      pais?.nombre || "",

    oros: oros,
    platas: platas,
    bronces: bronces,
    defensas: 0
  };
}

function comprobarRecordCarrera({
  recordAnterior,
  valorActual,
  tipo,
  nombre,
  numeroEdicion,
  oros,
  platas,
  bronces,
  pais = null,
  experiencia,
  contarDefensa = false
}) {
  const existeRecordAnterior =
    recordAnterior !== null;

  const recordBatido =
    existeRecordAnterior &&
    valorActual > recordAnterior.valor;

  const debeActualizar =
    !existeRecordAnterior ||
    recordBatido;

  if (!debeActualizar) {
    if (contarDefensa && recordAnterior) {
      recordAnterior.defensas =
        (recordAnterior.defensas || 0) + 1;
    }

    return {
      nuevoRecord: recordAnterior,
      novedad: null,
      experiencia: 0,
      recordBatido: false,
      antiguedadSuperada: 0
    };
  }

  const nuevoRecord =
    crearRegistroRecordCarrera({
      valor: valorActual,
      numeroEdicion: numeroEdicion,
      oros: oros,
      platas: platas,
      bronces: bronces,
      pais: pais
    });

  /*
    La primera marca solo establece el récord.
    No aparece como récord batido y no concede EXP.
  */
  if (!recordBatido) {
    return {
      nuevoRecord: nuevoRecord,
      novedad: null,
      experiencia: 0,
      recordBatido: false,
      antiguedadSuperada: 0
    };
  }

  const antiguedadSuperada =
    recordAnterior?.defensas || 0;

  const experienciaConcedida =
    estadoCarrera
      .recordsConExperienciaDesbloqueados
      ? experiencia
      : 0;

  return {
    nuevoRecord: nuevoRecord,

    novedad: {
      tipo: tipo,
      nombre: nombre,
      valor: valorActual,

      oros: oros,
      platas: platas,
      bronces: bronces,

      paisNombre:
        pais?.nombre || "",

      experiencia:
        experienciaConcedida,

      antiguedadSuperada:
        antiguedadSuperada
    },

    experiencia:
      experienciaConcedida,

    recordBatido: true,
    antiguedadSuperada:
      antiguedadSuperada
  };
}

function registrarRecordsGlobalesCarrera({
  numeroEdicion,
  oros,
  platas,
  bronces
}) {
  const novedades = [];

  let experiencia = 0;

  const totalMedallas =
    oros + platas + bronces;

  const resultadoMedallas =
    comprobarRecordCarrera({
      recordAnterior:
        estadoCarrera.recordsGlobales
          .medallas,

      valorActual:
        totalMedallas,

      tipo:
        "record_global_medallas",

      nombre:
        "Récord absoluto de medallas",

      numeroEdicion:
        numeroEdicion,

      oros:
        oros,

      platas:
        platas,

      bronces:
        bronces,

      experiencia:
        EXP_RECORD_GLOBAL
    });

  estadoCarrera.recordsGlobales.medallas =
    resultadoMedallas.nuevoRecord;

  if (resultadoMedallas.novedad) {
    novedades.push(
      resultadoMedallas.novedad
    );
  }

  experiencia +=
    resultadoMedallas.experiencia;


  const resultadoOros =
    comprobarRecordCarrera({
      recordAnterior:
        estadoCarrera.recordsGlobales.oros,

      valorActual:
        oros,

      tipo:
        "record_global_oros",

      nombre:
        "Récord absoluto de oros",

      numeroEdicion:
        numeroEdicion,

      oros:
        oros,

      platas:
        platas,

      bronces:
        bronces,

      experiencia:
        EXP_RECORD_GLOBAL
    });

  estadoCarrera.recordsGlobales.oros =
    resultadoOros.nuevoRecord;

  if (resultadoOros.novedad) {
    novedades.push(
      resultadoOros.novedad
    );
  }

  experiencia +=
    resultadoOros.experiencia;

  return {
    novedades: novedades,
    experiencia: experiencia
  };
}

function registrarRecordsDeporteCarrera({
  resultado,
  progresoDeporte,
  numeroEdicion
}) {
  const novedades = [];

  let experiencia = 0;

  const medallasResultado =
    resultado.oros +
    resultado.platas +
    resultado.bronces;

  const resultadoMedallas =
    comprobarRecordCarrera({
      recordAnterior:
        progresoDeporte.recordMedallas,

      valorActual:
        medallasResultado,

      tipo:
        "record_deporte_medallas",

      nombre:
        `Récord de medallas en ` +
        `${resultado.deporte.nombre}`,

      numeroEdicion:
        numeroEdicion,

      oros:
        resultado.oros,

      platas:
        resultado.platas,

      bronces:
        resultado.bronces,

      pais:
        resultado.pais,

      experiencia:
        EXP_RECORD_DEPORTE,

      contarDefensa: true
    });

  progresoDeporte.recordMedallas =
    resultadoMedallas.nuevoRecord;

  if (resultadoMedallas.novedad) {
    novedades.push(
      resultadoMedallas.novedad
    );
  }

  experiencia +=
    resultadoMedallas.experiencia;


  const resultadoOros =
    comprobarRecordCarrera({
      recordAnterior:
        progresoDeporte.recordOros,

      valorActual:
        resultado.oros,

      tipo:
        "record_deporte_oros",

      nombre:
        `Récord de oros en ` +
        `${resultado.deporte.nombre}`,

      numeroEdicion:
        numeroEdicion,

      oros:
        resultado.oros,

      platas:
        resultado.platas,

      bronces:
        resultado.bronces,

      pais:
        resultado.pais,

      experiencia:
        EXP_RECORD_DEPORTE,

      contarDefensa: true
    });

  progresoDeporte.recordOros =
    resultadoOros.nuevoRecord;

  if (resultadoOros.novedad) {
    novedades.push(
      resultadoOros.novedad
    );
  }

  experiencia +=
    resultadoOros.experiencia;

  return {
    novedades: novedades,
    experiencia: experiencia
  };
}


function registrarResultadosCarrera() {
  if (
    modoJuegoActual !== MODO_CARRERA ||
    !estadoCarrera
  ) {
    return null;
  }

  const nivelAnterior =
    estadoCarrera.nivel;

  /*
    Antes de aumentar el contador comprobamos
    si estos son los primeros JJOO de la Carrera.
  */
  const esPrimeraEdicion =
    estadoCarrera.juegosDisputados === 0;

  let experienciaMedallas = 0;
  let experienciaHitos = 0;
  let experienciaRecords = 0;
  let experienciaLogros = 0;

  const hitosConseguidos = [];
  const recordsBatidos = [];

  const numeroEdicion =
    estadoCarrera.juegosDisputados + 1;

  let orosEdicion = 0;
  let platasEdicion = 0;
  let broncesEdicion = 0;


  resultadosJuegos.forEach((resultado) => {
    const codigoPais =
      resultado.pais.codigo;

    const codigoDeporte =
      resultado.deporte.codigo;

    const medallasResultado =
      resultado.oros +
      resultado.platas +
      resultado.bronces;


    orosEdicion += resultado.oros;
    platasEdicion += resultado.platas;
    broncesEdicion += resultado.bronces;


    /*
      La experiencia ordinaria se entrega
      en todas las ediciones, incluida la primera.
    */
    experienciaMedallas +=
      resultado.oros * EXP_ORO +
      resultado.platas * EXP_PLATA +
      resultado.bronces * EXP_BRONCE;


    if (
      !estadoCarrera.progresoPaises[
        codigoPais
      ]
    ) {
      estadoCarrera.progresoPaises[
        codigoPais
      ] = crearProgresoPaisCarrera();
    }


    if (
      !estadoCarrera.progresoDeportes[
        codigoDeporte
      ]
    ) {
      estadoCarrera.progresoDeportes[
        codigoDeporte
      ] = crearProgresoDeporteCarrera();
    }


    const progresoPais =
      estadoCarrera.progresoPaises[
        codigoPais
      ];

    const progresoDeporte =
      estadoCarrera.progresoDeportes[
        codigoDeporte
      ];


    const resumenRecordsDeporte =
      registrarRecordsDeporteCarrera({
        resultado: resultado,
        progresoDeporte: progresoDeporte,
        numeroEdicion: numeroEdicion
      });

    experienciaRecords +=
      resumenRecordsDeporte.experiencia;

    recordsBatidos.push(
      ...resumenRecordsDeporte.novedades
    );


    /*
      Guardamos cómo estaba el progreso antes
      de incorporar los resultados actuales.
    */
    const paisNoTeniaMedallas =
      progresoPais.oros +
      progresoPais.platas +
      progresoPais.bronces === 0;

    const paisNoTeniaOros =
      progresoPais.oros === 0;

    const deporteNoTeniaOros =
      progresoDeporte.oros === 0;


    /*
      Actualizamos siempre las estadísticas,
      también durante los primeros JJOO.
    */
    progresoPais.participaciones += 1;

    progresoPais.oros += resultado.oros;
    progresoPais.platas += resultado.platas;
    progresoPais.bronces += resultado.bronces;

    if (!progresoPais.porDeporte) {
      progresoPais.porDeporte = {};
    }

    if (!progresoPais.colores) {
      progresoPais.colores = {
        azul: 0,
        verde: 0,
        amarillo: 0,
        rojo: 0
      };
    }

    if (
      !progresoPais.porDeporte[
        codigoDeporte
      ]
    ) {
      progresoPais.porDeporte[
        codigoDeporte
      ] = {
        participaciones: 0,
        oros: 0,
        platas: 0,
        bronces: 0,
        colores: {
          azul: 0,
          verde: 0,
          amarillo: 0,
          rojo: 0
        }
      };
    }

    const progresoPaisDeporte =
      progresoPais.porDeporte[
        codigoDeporte
      ];

    progresoPaisDeporte.participaciones +=
      1;

    progresoPaisDeporte.oros +=
      resultado.oros;

    progresoPaisDeporte.platas +=
      resultado.platas;

    progresoPaisDeporte.bronces +=
      resultado.bronces;

    const colorResultado =
      resultado.color || "rojo";

    if (
      progresoPais.colores[
        colorResultado
      ] !== undefined
    ) {
      progresoPais.colores[
        colorResultado
      ] += 1;
    }

    if (
      progresoPaisDeporte.colores[
        colorResultado
      ] !== undefined
    ) {
      progresoPaisDeporte.colores[
        colorResultado
      ] += 1;
    }


    progresoDeporte.apariciones += 1;

    progresoDeporte.oros += resultado.oros;
    progresoDeporte.platas += resultado.platas;
    progresoDeporte.bronces += resultado.bronces;


    if (
      medallasResultado > 0 &&
      !progresoPais.deportesConMedalla.includes(
        codigoDeporte
      )
    ) {
      progresoPais.deportesConMedalla.push(
        codigoDeporte
      );
    }


    if (
      resultado.oros > 0 &&
      !progresoPais.deportesConOro.includes(
        codigoDeporte
      )
    ) {
      progresoPais.deportesConOro.push(
        codigoDeporte
      );
    }


    /*
      En los primeros JJOO no entregamos
      recompensas por primeros oros o medallas.

      Los resultados sí quedan registrados,
      por lo que tampoco se premiarán
      retroactivamente en otra edición.
    */
    if (esPrimeraEdicion) {
      return;
    }


    /*
      PRIMER ORO CON UN PAÍS

      Si el primer resultado histórico del país
      ya incluye un oro, recibe este premio,
      pero no acumula también primera medalla.
    */
    if (
      resultado.oros > 0 &&
      paisNoTeniaOros
    ) {
      experienciaHitos +=
        EXP_PRIMER_ORO_PAIS;

      hitosConseguidos.push(
        `Primer oro con ` +
        `${resultado.pais.nombre}: ` +
        `+${EXP_PRIMER_ORO_PAIS} EXP`
      );
    } else if (
      medallasResultado > 0 &&
      paisNoTeniaMedallas
    ) {
      /*
        PRIMERA MEDALLA CON UN PAÍS

        Solo se aplica si el resultado no contiene
        también el primer oro de ese país.
      */
      experienciaHitos +=
        EXP_PRIMERA_MEDALLA_PAIS;

      hitosConseguidos.push(
        `Primera medalla con ` +
        `${resultado.pais.nombre}: ` +
        `+${EXP_PRIMERA_MEDALLA_PAIS} EXP`
      );
    }


    /*
      El primer oro deportivo es independiente
      y sí puede acumularse con el primer oro
      conseguido por un país.
    */
    if (
      resultado.oros > 0 &&
      deporteNoTeniaOros
    ) {
      experienciaHitos +=
        EXP_PRIMER_ORO_DEPORTE;

      hitosConseguidos.push(
        `Primer oro en ` +
        `${resultado.deporte.nombre}: ` +
        `+${EXP_PRIMER_ORO_DEPORTE} EXP`
      );
    }
  });


  /*
    LOGRO INAUGURAL

    Se concede una sola vez, al terminar
    la primera edición de la Carrera.
  */
  const codigoLogroInaugural =
    "ceremonia_inauguracion";

  const logroInauguralConseguido =
    estadoCarrera.logrosConseguidos.includes(
      codigoLogroInaugural
    );


  if (
    esPrimeraEdicion &&
    !logroInauguralConseguido
  ) {
    estadoCarrera.logrosConseguidos.push(
      codigoLogroInaugural
    );

    experienciaHitos +=
      EXP_CEREMONIA_INAUGURACION;

    hitosConseguidos.push(
      `Ceremonia de inauguración · ` +
      `Has completado tus primeros Juegos ` +
      `Olímpicos: ` +
      `+${EXP_CEREMONIA_INAUGURACION} EXP`
    );
  }


  const totalMedallasEdicion =
    orosEdicion +
    platasEdicion +
    broncesEdicion;

  const resumenRecordsGlobales =
    registrarRecordsGlobalesCarrera({
      numeroEdicion: numeroEdicion,
      oros: orosEdicion,
      platas: platasEdicion,
      bronces: broncesEdicion
    });

  experienciaRecords +=
    resumenRecordsGlobales.experiencia;

  recordsBatidos.push(
    ...resumenRecordsGlobales.novedades
  );

  const resumenLogros =
    comprobarLogrosEdicion({
      resultados: resultadosJuegos,
      oros: orosEdicion,
      platas: platasEdicion,
      bronces: broncesEdicion,
      totalMedallas: totalMedallasEdicion,
      recordsBatidos: recordsBatidos,
      rerollUsado: rerollUsadoEnEdicion,
      codigoPaisReroll:
        codigoPaisRerollEnEdicion,
      numeroEdicion: numeroEdicion
    });

  experienciaLogros +=
    resumenLogros.experiencia;


  const experienciaTotal =
    experienciaMedallas +
    experienciaHitos +
    experienciaRecords +
    experienciaLogros;


  estadoCarrera.juegosDisputados += 1;


  estadoCarrera.medalleroTotal.oros +=
    orosEdicion;

  estadoCarrera.medalleroTotal.platas +=
    platasEdicion;

  estadoCarrera.medalleroTotal.bronces +=
    broncesEdicion;


  estadoCarrera.mejorEdicion.oros =
    Math.max(
      estadoCarrera.mejorEdicion.oros,
      orosEdicion
    );

  estadoCarrera.mejorEdicion.medallas =
    Math.max(
      estadoCarrera.mejorEdicion.medallas,
      totalMedallasEdicion
    );



  const registroEdicion = {
    edicion: numeroEdicion,
    fecha: new Date().toISOString(),
    oros: orosEdicion,
    platas: platasEdicion,
    bronces: broncesEdicion,
    total: totalMedallasEdicion,
    experiencia: experienciaTotal,
    rerollUsado: rerollUsadoEnEdicion,
    logros: resumenLogros.logrosNuevos.map(
      (logro) => logro.id
    ),
    recordsBatidos: recordsBatidos.length,
    resultados: resultadosJuegos.map(
      (resultado) => ({
        paisCodigo: resultado.pais.codigo,
        paisNombre: resultado.pais.nombre,
        deporteCodigo:
          resultado.deporte.codigo,
        deporteNombre:
          resultado.deporte.nombre,
        color: resultado.color,
        oros: resultado.oros,
        platas: resultado.platas,
        bronces: resultado.bronces,
        fortunaIndice:
          resultado.fortuna?.indice ?? null,
        fortunaTexto:
          resultado.fortuna?.texto || "",
        fortunaClase:
          resultado.fortuna?.clase || ""
      })
    )
  };

  estadoCarrera.historialEdiciones.push(
    registroEdicion
  );

  estadoCarrera.experiencia +=
    experienciaTotal;


  procesarSubidasNivelCarrera();


  guardarCarrera(estadoCarrera);


  return {
    nivelAnterior: nivelAnterior,
    nivelActual: estadoCarrera.nivel,

    experienciaMedallas:
      experienciaMedallas,

    experienciaHitos:
      experienciaHitos,

    experienciaRecords:
      experienciaRecords,

    experienciaLogros:
      experienciaLogros,

    logros:
      resumenLogros.logrosNuevos,

    experienciaTotal:
      experienciaTotal,

    hitos:
      hitosConseguidos,

    records:
      recordsBatidos,

    esPrimeraEdicion:
      esPrimeraEdicion
  };
}

function crearProgresoPaisCarrera() {
  return {
    participaciones: 0,

    oros: 0,
    platas: 0,
    bronces: 0,

    deportesConMedalla: [],
    deportesConOro: [],

    porDeporte: {},

    colores: {
      azul: 0,
      verde: 0,
      amarillo: 0,
      rojo: 0
    }
  };
}

function crearProgresoDeporteCarrera() {
  return {
    apariciones: 0,

    oros: 0,
    platas: 0,
    bronces: 0,

    recordMedallas: null,
    recordOros: null
  };
}

function procesarSubidasNivelCarrera() {
  if (estadoCarrera.nivel >= 8) {
    estadoCarrera.nivel = 8;
    estadoCarrera.experiencia = 0;
    return;
  }

  let experienciaNecesaria =
    obtenerExperienciaNecesaria(
      estadoCarrera.nivel
    );

  while (
    estadoCarrera.nivel < 8 &&
    estadoCarrera.experiencia >=
    experienciaNecesaria
  ) {
    estadoCarrera.experiencia -=
      experienciaNecesaria;

    estadoCarrera.nivel += 1;

    aplicarRecompensaNivelCarrera(
      estadoCarrera.nivel
    );

    experienciaNecesaria =
      obtenerExperienciaNecesaria(
        estadoCarrera.nivel
      );
  }

  if (estadoCarrera.nivel >= 8) {
    estadoCarrera.nivel = 8;
    estadoCarrera.experiencia = 0;
  }
}

function aplicarRecompensaNivelCarrera(nivel) {
  if (nivel === 2) {
    estadoCarrera
      .personalizacionDelegacionDesbloqueada =
        true;

    if (!estadoCarrera.nombreDelegacion) {
      agregarRecompensaPendiente(
        "nombre_delegacion"
      );
    }
  }

  if (nivel === 3) {
    if (!estadoCarrera.potenciaElegida) {
      agregarRecompensaPendiente(
        "elegir_potencia"
      );
    }
  }

  if (nivel === 4) {
    agregarRecompensaPendiente(
      "nivel_4_tiro_logros"
    );
  }

  if (nivel === 5) {
    if (!estadoCarrera.deporteColectivoElegido) {
      agregarRecompensaPendiente(
        "elegir_deporte_colectivo"
      );
    }
  }

  if (nivel === 6) {
    if (!estadoCarrera.nivel6Completado) {
      agregarRecompensaPendiente(
        "nivel_6_dos_paises_ciclismo"
      );
    }
  }

  if (nivel === 7) {
    if (!estadoCarrera.nivel7Completado) {
      agregarRecompensaPendiente(
        "nivel_7_pais_tenis_ocho"
      );
    }
  }

  if (nivel === 8) {
    if (!estadoCarrera.faseBetaSuperada) {
      agregarRecompensaPendiente(
        "nivel_8_beta_superada"
      );
    }
  }
}


function obtenerIconoRecordCarrera(tipo) {
  if (
    tipo === "record_global_oros" ||
    tipo === "record_deporte_oros"
  ) {
    return "🥇";
  }

  return "🏆";
}

function mostrarRecordsResultadoCarrera(
  records
) {
  if (!records || records.length === 0) {
    resumenRecordsCarrera.classList.add(
      "oculto"
    );

    listaRecordsCarrera.innerHTML = "";

    return;
  }

  resumenRecordsCarrera.classList.remove(
    "oculto"
  );

  resumenRecordsCarrera.open = false;

  botonDesplegarRecordsCarrera.textContent =
    `Ver récords batidos (${records.length})`;

  listaRecordsCarrera.innerHTML =
    records.map((record) => {
      const pais =
        record.paisNombre
          ? ` con ${record.paisNombre}`
          : "";

      const experiencia =
        record.experiencia > 0
          ? `
            <span class="record-exp">
              +${record.experiencia} EXP
            </span>
          `
          : `
            <span class="record-sin-exp">
              Récord registrado
            </span>
          `;

      return `
        <article class="record-batido-carrera">
          <span class="icono-record-batido">
            ${obtenerIconoRecordCarrera(
              record.tipo
            )}
          </span>

          <div class="contenido-record-batido">
            <strong>
              ${record.nombre}
            </strong>

            <span>
              ${record.valor}${pais}
            </span>

            <small>
              🥇 ${record.oros}
              · 🥈 ${record.platas}
              · 🥉 ${record.bronces}
            </small>
          </div>

          ${experiencia}
        </article>
      `;
    }).join("");
}


function mostrarProgresoResultadoCarrera(
  resumen
) {
  resumenProgresoCarrera.classList.remove(
    "oculto"
  );

  if (detalleExperienciaCarrera) {
    detalleExperienciaCarrera.open = false;
  }

  mostrarRecordsResultadoCarrera(
    resumen.records
  );

  mostrarLogrosResultadoCarrera(
    resumen.logros
  );

  nivelResultadoCarrera.textContent =
    estadoCarrera.nivel;

  experienciaGanadaCarrera.textContent =
    `+${resumen.experienciaTotal} EXP`;


  const lineas = [
    `
      <div>
        <span>Medallas conseguidas</span>
        <strong>
          +${resumen.experienciaMedallas} EXP
        </strong>
      </div>
    `
  ];

  if (resumen.experienciaRecords > 0) {
    lineas.push(`
      <div class="hito-experiencia">
        <strong>Récords batidos</strong>

        <span class="hito-exp">
          +${resumen.experienciaRecords} EXP
        </span>
      </div>
    `);
  }


  if (resumen.experienciaLogros > 0) {
    lineas.push(`
      <div class="hito-experiencia logro-inaugural">
        <strong>Logros conseguidos</strong>

        <span class="hito-exp">
          +${resumen.experienciaLogros} EXP
        </span>
      </div>
    `);
  }


    resumen.hitos.forEach((hito) => {
  const esLogroInaugural =
    hito.startsWith(
      "Ceremonia de inauguración"
    );

  const claseAdicional =
    esLogroInaugural
      ? " logro-inaugural"
      : "";

  const partes = hito.split(":");
  const tituloLogro = partes[0];
  const recompensaLogro = partes.slice(1).join(":").trim();

  lineas.push(`
    <div class="hito-experiencia${claseAdicional}">
      <strong>${tituloLogro}</strong>

      ${
        recompensaLogro
          ? `<span class="hito-exp">${recompensaLogro}</span>`
          : ""
      }
    </div>
  `);
});


  desgloseExperienciaCarrera.innerHTML =
    lineas.join("");


  if (
    resumen.nivelActual >
    resumen.nivelAnterior
  ) {
    mensajeSubidaNivelCarrera.textContent =
      `¡Has alcanzado el nivel ` +
      `${resumen.nivelActual}! ` +
      `Hay una nueva recompensa esperándote.`;

    mensajeSubidaNivelCarrera.classList.remove(
      "oculto"
    );
  } else {
    mensajeSubidaNivelCarrera.classList.add(
      "oculto"
    );
  }
}


window.subirNivelCarreraPrueba = function(
  cantidad = 1
) {
  if (!estadoCarrera) {
    estadoCarrera = cargarCarrera();
  }

  const niveles =
    Math.max(
      1,
      Math.floor(Number(cantidad) || 1)
    );

  for (
    let indice = 0;
    indice < niveles &&
    estadoCarrera.nivel < 8;
    indice += 1
  ) {
    estadoCarrera.nivel += 1;

    aplicarRecompensaNivelCarrera(
      estadoCarrera.nivel
    );
  }

  estadoCarrera.experiencia = 0;

  guardarCarrera(estadoCarrera);
  actualizarHubCarrera();
  mostrarSiguienteRecompensaPendiente();

  return estadoCarrera;
};

window.irNivelCarreraPrueba = function(
  nivelObjetivo
) {
  if (!estadoCarrera) {
    estadoCarrera = cargarCarrera();
  }

  const objetivo =
    Math.min(
      8,
      Math.max(
        estadoCarrera.nivel,
        Math.floor(Number(nivelObjetivo) || 1)
      )
    );

  const diferencia =
    objetivo - estadoCarrera.nivel;

  if (diferencia <= 0) {
    return estadoCarrera;
  }

  return window.subirNivelCarreraPrueba(
    diferencia
  );
};
