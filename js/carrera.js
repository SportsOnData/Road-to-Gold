/*
  ROAD TO GOLD · CARRERA

  Estado, guardado, experiencia, niveles y progreso del modo Carrera.
*/

function iniciarModoCarrera() {
  estadoCarrera = cargarCarrera();

  actualizarHubCarrera();

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

  estadoCompleto.recompensasPendientes =
    Array.isArray(carrera.recompensasPendientes)
      ? [...carrera.recompensasPendientes]
      : [];

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
    !estadoCompleto.rerollDesbloqueado ||
    !estadoCompleto
      .recordsConExperienciaDesbloqueados;

  if (
    estadoCompleto.nivel >= 4 &&
    recompensaNivel4Incompleta &&
    !estadoCompleto.recompensasPendientes.includes(
      "nivel_4_tiro_reroll"
    )
  ) {
    estadoCompleto.recompensasPendientes.push(
      "nivel_4_tiro_reroll"
    );
  }

  if (
    estadoCompleto.nivel >= 5 &&
    !estadoCompleto.deporteColectivoElegido &&
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
  `${estadoCarrera.experiencia} / ` +
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
    LOGROS_ACTIVOS.length;

  const logrosConseguidos =
    LOGROS_ACTIVOS.filter(
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
      "Se desbloquean en el nivel 5";
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
    "nivel_4_tiro_reroll"
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

  estadoCarrera.rerollDesbloqueado =
    true;

  estadoCarrera
    .recordsConExperienciaDesbloqueados =
      true;

  completarRecompensaPendiente(
    "nivel_4_tiro_reroll"
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
    Los logros empiezan a contar desde este momento.
    No se revisan ediciones anteriores.
  */
  estadoCarrera.logrosDesbloqueados = true;

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







let seccionEstadisticasActual =
  "resumen";

function abrirPantallaEstadisticas() {
  seccionEstadisticasActual =
    "resumen";

  filtrosEstadisticas
    .querySelectorAll(
      "[data-seccion-estadisticas]"
    )
    .forEach((boton) => {
      boton.classList.toggle(
        "activo",
        boton.dataset.seccionEstadisticas ===
          "resumen"
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

function renderizarPaisesEstadisticas() {
  const filas =
    Object.entries(
      estadoCarrera.progresoPaises
    )
      .map(([codigo, progreso]) => {
        const pais =
          PAISES.find(
            (item) =>
              item.codigo === codigo
          );

        return {
          codigo: codigo,
          nombre:
            pais?.nombre || codigo,
          ...progreso,
          total:
            obtenerTotalMedallasProgreso(
              progreso
            )
        };
      })
      .filter(
        (fila) =>
          fila.participaciones > 0
      )
      .sort(
        (a, b) =>
          b.total - a.total ||
          b.oros - a.oros
      );

  if (filas.length === 0) {
    contenidoEstadisticas.innerHTML =
      `<p class="estado-vacio-estadisticas">
        Aún no hay resultados por país.
      </p>`;

    return;
  }

  contenidoEstadisticas.innerHTML = `
    <div class="tabla-estadisticas-contenedor">
      <table class="tabla-estadisticas">
        <thead>
          <tr>
            <th>País</th>
            <th>Participaciones</th>
            <th>🥇</th>
            <th>🥈</th>
            <th>🥉</th>
            <th>Total</th>
            <th>Promedio</th>
          </tr>
        </thead>

        <tbody>
          ${filas.map((fila) => `
            <tr>
              <td>
                <strong>${fila.nombre}</strong>
                <small>${fila.codigo}</small>
              </td>
              <td>${fila.participaciones}</td>
              <td>${fila.oros}</td>
              <td>${fila.platas}</td>
              <td>${fila.bronces}</td>
              <td><strong>${fila.total}</strong></td>
              <td>
                ${formatearNumeroEstadistica(
                  fila.total /
                  fila.participaciones,
                  2
                )}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderizarDeportesEstadisticas() {
  const filas =
    Object.entries(
      estadoCarrera.progresoDeportes
    )
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
          ...progreso,
          total:
            obtenerTotalMedallasProgreso(
              progreso
            )
        };
      })
      .filter(
        (fila) =>
          fila.apariciones > 0
      )
      .sort(
        (a, b) =>
          b.total - a.total ||
          b.oros - a.oros
      );

  if (filas.length === 0) {
    contenidoEstadisticas.innerHTML =
      `<p class="estado-vacio-estadisticas">
        Aún no hay resultados por deporte.
      </p>`;

    return;
  }

  contenidoEstadisticas.innerHTML = `
    <div class="tabla-estadisticas-contenedor">
      <table class="tabla-estadisticas">
        <thead>
          <tr>
            <th>Deporte</th>
            <th>Apariciones</th>
            <th>🥇</th>
            <th>🥈</th>
            <th>🥉</th>
            <th>Total</th>
            <th>Récord medallas</th>
            <th>Récord oros</th>
          </tr>
        </thead>

        <tbody>
          ${filas.map((fila) => `
            <tr>
              <td>
                <strong>${fila.nombre}</strong>
              </td>
              <td>${fila.apariciones}</td>
              <td>${fila.oros}</td>
              <td>${fila.platas}</td>
              <td>${fila.bronces}</td>
              <td><strong>${fila.total}</strong></td>
              <td>
                ${
                  fila.recordMedallas
                    ? `${fila.recordMedallas.valor} · ` +
                      `${fila.recordMedallas.paisNombre}`
                    : "—"
                }
              </td>
              <td>
                ${
                  fila.recordOros
                    ? `${fila.recordOros.valor} · ` +
                      `${fila.recordOros.paisNombre}`
                    : "—"
                }
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
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
    <article class="tarjeta-record-estadistica">
      <span class="icono-record-estadistica">
        🏆
      </span>

      <div>
        <small>${titulo}</small>
        <strong>${record.valor}</strong>
        <p>
          Edición ${record.edicion}
          ${
            record.paisNombre
              ? ` · ${record.paisNombre}`
              : ""
          }
        </p>
      </div>
    </article>
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
    "historial"
  ) {
    renderizarHistorialEstadisticas();
    return;
  }

  renderizarResumenEstadisticas();
}

function cambiarSeccionEstadisticas(
  seccion,
  botonPulsado
) {
  seccionEstadisticasActual =
    seccion;

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

function continuarTrasBetaSuperada() {
  iniciarModoCarrera();
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

  nombrePaisSorteoNivel6.textContent =
    "Japón · Reino Unido · Canadá";

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

  const paisesDisponibles =
    obtenerPaisesNivel6(
      CODIGOS_SORTEO_NIVEL6
    );

  if (
    paisesDisponibles.length !==
    CODIGOS_SORTEO_NIVEL6.length
  ) {
    mostrarErrorDatosNivel6(
      CODIGOS_SORTEO_NIVEL6.filter(
        (codigo) =>
          !obtenerPaisPorCodigo(codigo)
      )
    );

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
  return LOGROS_ACTIVOS.reduce(
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
  const disponibles =
    LOGROS_ACTIVOS.length;

  const conseguidos =
    LOGROS_ACTIVOS.filter(
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
        bronces: resultado.bronces
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
    deportesConOro: []
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
  let experienciaNecesaria =
    obtenerExperienciaNecesaria(
      estadoCarrera.nivel
    );

  while (
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
      "nivel_4_tiro_reroll"
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
