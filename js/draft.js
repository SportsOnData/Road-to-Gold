/*
  ROAD TO GOLD · DRAFT

  Selección de deportes y países, asignaciones, reroll y afinidades.
*/

function mostrarPresentacionDeportes() {
  tituloPresentacionDeportes.textContent =
    `Los ${deportesPartida.length} deportes ` +
    `de estos JJOO son...`;

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


function actualizarInformacionDelegacionDraft() {
  if (
    modoJuegoActual !== MODO_CARRERA ||
    !estadoCarrera
  ) {
    informacionDelegacionDraft.classList.add(
      "oculto"
    );

    return;
  }

  informacionDelegacionDraft.classList.remove(
    "oculto"
  );

  nombreDelegacionDraft.textContent =
    estadoCarrera.nombreDelegacion ||
    "Tu delegación";

  datosDelegacionDraft.textContent =
    `Nivel ${estadoCarrera.nivel}` +
    ` · ${estadoCarrera.paisesDesbloqueados.length} países` +
    ` · ${estadoCarrera.deportesDesbloqueados.length} deportes` +
    ` · ${estadoCarrera.juegosDisputados} JJOO disputados`;
}

function comenzarDraft() {
  mostrarPantalla(pantallaJuego);
  actualizarInformacionDelegacionDraft();
  renderizarDeportes();
  sacarSiguientePais();
}

function obtenerPaisesDisponiblesPartida() {
  const paisesActivos = PAISES.filter(
    (pais) => estaActivo(pais)
  );

  if (
    modoJuegoActual !== MODO_CARRERA
  ) {
    return paisesActivos;
  }

  const codigosDesbloqueados =
    estadoCarrera.paisesDesbloqueados;

  const paisesCarrera =
    paisesActivos.filter((pais) =>
      codigosDesbloqueados.includes(
        pais.codigo
      )
    );

  if (
    paisesCarrera.length <
    deportesPartida.length
  ) {
    console.error(
      "La Carrera no tiene suficientes países desbloqueados.",
      {
        paisesDisponibles:
          paisesCarrera.length,

        paisesNecesarios:
          deportesPartida.length
      }
    );
  }

  return paisesCarrera;
}

function seleccionarDeportesCarrera() {
  const codigosDesbloqueados =
    estadoCarrera.deportesDesbloqueados;

  const deportesFijos = DEPORTES.filter(
    (deporte) =>
      deporte.grupo === "fijo" &&
      estaActivo(deporte) &&
      codigosDesbloqueados.includes(
        deporte.codigo
      )
  );

  const deporteFijoAlternativo =
    seleccionarUnoAleatorio(
      "fijo_alternativo",
      codigosDesbloqueados
    );

  const deportesGrandes =
    seleccionarPonderados(
      "grande",
      2,
      codigosDesbloqueados
    );

  /*
    Desde el nivel 7 se seleccionan dos deportes
    del grupo de 5 pruebas en lugar de uno.
  */
  const cantidadMedianos =
    estadoCarrera
      .ochoParticipantesDesbloqueados
      ? 2
      : 1;

  const deportesMedianos =
    seleccionarPonderados(
      "mediano",
      cantidadMedianos,
      codigosDesbloqueados
    );

  const deportesPequenos =
    seleccionarPonderados(
      "pequeno",
      1,
      codigosDesbloqueados
    );

  const deportesElegidos = [
    ...deportesFijos,
    ...deporteFijoAlternativo,
    ...deportesGrandes,
    ...deportesMedianos,
    ...deportesPequenos
  ];

  const cantidadEsperada =
    estadoCarrera
      .ochoParticipantesDesbloqueados
      ? 8
      : 7;

  if (
    deportesElegidos.length !==
    cantidadEsperada
  ) {
    console.error(
      `No se pudieron seleccionar los ` +
      `${cantidadEsperada} deportes de Carrera.`,
      {
        desbloqueados:
          codigosDesbloqueados,

        elegidos:
          deportesElegidos
      }
    );
  }

  return deportesElegidos;
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

function seleccionarUnoAleatorio(
  grupo,
  codigosPermitidos = null
) {
  const candidatos = DEPORTES.filter(
    (deporte) =>
      deporte.grupo === grupo &&
      estaActivo(deporte) &&
      (
        !codigosPermitidos ||
        codigosPermitidos.includes(
          deporte.codigo
        )
      )
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

function seleccionarPonderados(
  grupo,
  cantidad,
  codigosPermitidos = null
) {
  const candidatos = DEPORTES
    .filter(
      (deporte) =>
        deporte.grupo === grupo &&
        estaActivo(deporte) &&
        (
          !codigosPermitidos ||
          codigosPermitidos.includes(
            deporte.codigo
          )
        )
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


function obtenerDeportesLibresDraft() {
  const codigosOcupados = new Set(
    asignaciones.map(
      (asignacion) =>
        asignacion.deporte.codigo
    )
  );

  return deportesPartida.filter(
    (deporte) =>
      !codigosOcupados.has(
        deporte.codigo
      )
  );
}

function calcularPesoPaisCondicionado(
  pais,
  deportesLibres
) {
  if (deportesLibres.length === 0) {
    return 1;
  }

  const notasLibres =
    deportesLibres
      .map((deporte) =>
        obtenerNotaPais(
          pais,
          deporte.codigo
        )
      )
      .sort((a, b) => b - a);

  const mejorNota =
    notasLibres[0] || 0;

  const segundaNota =
    notasLibres[1] || 0;

  let peso = 1;

  /*
    Buena coincidencia general.
  */
  if (mejorNota >= 9) {
    peso *= 1.22;
  } else if (mejorNota >= 7) {
    peso *= 1.10;
  }

  /*
    Especialista claro:
    al menos un 7 y como máximo un 3
    como segunda mejor opción.

    Esto incluye, por ejemplo:
    Jamaica o Kenia con Atletismo libre.
  */
  const esEspecialistaClaro =
    mejorNota >= 7 &&
    segundaNota <= 3;

  /*
    Especialista extremo:
    al menos un 9 y como máximo un 2
    como segunda mejor opción.

    Por ejemplo:
    Fiji con Rugby libre.
  */
  const esEspecialistaExtremo =
    mejorNota >= 9 &&
    segundaNota <= 2;

  if (esEspecialistaClaro) {
    peso *= 1.38;
  }

  if (esEspecialistaExtremo) {
    peso *= 1.22;
  }

  /*
    Si el país no tiene una opción mínimamente
    útil entre los deportes libres, aparece
    algo menos, pero nunca desaparece.
  */
  if (mejorNota <= 2) {
    peso *= 0.58;
  } else if (mejorNota <= 4) {
    peso *= 0.82;
  }

  return Math.max(0.20, peso);
}

function extraerSiguientePaisCondicionado() {
  if (paisesPendientes.length === 0) {
    return null;
  }

  const deportesLibres =
    obtenerDeportesLibresDraft();

  const pesos =
    paisesPendientes.map((pais) =>
      calcularPesoPaisCondicionado(
        pais,
        deportesLibres
      )
    );

  const pesoTotal =
    pesos.reduce(
      (total, peso) =>
        total + peso,
      0
    );

  let sorteo =
    Math.random() * pesoTotal;

  let indiceElegido = 0;

  for (
    let indice = 0;
    indice < pesos.length;
    indice += 1
  ) {
    sorteo -= pesos[indice];

    if (sorteo <= 0) {
      indiceElegido = indice;
      break;
    }
  }

  return paisesPendientes.splice(
    indiceElegido,
    1
  )[0];
}


function sacarSiguientePais(
  mensajeFinal = "Elige el deporte donde quieres colocar este país."
) {
  const paisSeleccionado =
    modoJuegoActual === MODO_PARTIDA_RAPIDA
      ? extraerSiguientePaisCondicionado()
      : paisesPendientes.shift();

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

      if (esperandoPaisReroll) {
        codigoPaisRerollEnEdicion =
          paisSeleccionado.codigo;

        esperandoPaisReroll = false;
      }

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

  if (
    asignaciones.length ===
    deportesPartida.length
  ) {
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
  rerollUsadoEnEdicion = true;
  esperandoPaisReroll = true;

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

function obtenerNotaPais(pais, codigoDeporte) {
  const nota = Number(
    pais.notas?.[codigoDeporte]
  );

  if (Number.isNaN(nota)) {
    console.warn(
      `No se encontró la nota de ${pais.nombre} para ${codigoDeporte}.`,
      pais
    );

    return 0;
  }

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
