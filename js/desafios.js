/*
  ROAD TO GOLD · DESAFÍOS DIARIOS

  Configuración, calendario y persistencia independiente del modo.
  En la Fase 1 este archivo solo controla la pantalla informativa.
  El draft y la simulación se integrarán en fases posteriores.
*/

const VERSION_GUARDADO_DESAFIOS = 2;
const INTENTOS_DIARIOS_DESAFIO = 4;
const FECHA_INICIO_CICLO_DESAFIOS = "2026-08-09";

let desafioForzadoParaPruebas = null;
let configuracionDesafioEnCurso = null;
let ultimoCicloResultadoDesafio = null;
let ultimoResultadoCompartibleDesafio = null;

const NIVELES_DESAFIO = Object.freeze({
  SIN_MEDALLA: "sin_medalla",
  BRONCE: "bronce",
  PLATA: "plata",
  ORO: "oro"
});

const ETIQUETAS_NIVEL_DESAFIO = Object.freeze({
  [NIVELES_DESAFIO.SIN_MEDALLA]: "Sin medalla",
  [NIVELES_DESAFIO.BRONCE]: "Bronce",
  [NIVELES_DESAFIO.PLATA]: "Plata",
  [NIVELES_DESAFIO.ORO]: "Oro"
});

/*
  Toda la configuración editable del modo queda agrupada aquí.
  Los códigos se validan contra PAISES y DEPORTES al renderizar.
*/

function esDesafioDiarioEnCurso() {
  return Boolean(configuracionDesafioEnCurso) || modoJuegoActual === MODO_DESAFIO_DIARIO;
}

function renderizarContextoDesafioEnPartida() {
  const bloques = document.querySelectorAll(".contexto-desafio-partida");
  if (!bloques.length) return;

  const activo = esDesafioDiarioEnCurso();
  const desafio = activo
    ? obtenerDesafioPorId(configuracionDesafioEnCurso?.desafioId) || obtenerDesafioDelDia()
    : null;

  bloques.forEach(bloque => {
    bloque.classList.toggle("oculto", !desafio);
    if (!desafio) return;

    const nombre = bloque.querySelector("[data-desafio-nombre]");
    const objetivos = bloque.querySelector("[data-desafio-objetivos]");
    if (nombre) nombre.textContent = desafio.nombre;
    if (objetivos) {
      const iconos = { bronce: "🥉", plata: "🥈", oro: "🥇" };
      objetivos.innerHTML = desafio.objetivos
        .map(objetivo => `<span class="objetivo-contexto-desafio objetivo-${objetivo.nivel}"><b>${iconos[objetivo.nivel] || "🏅"}</b>${objetivo.texto}</span>`)
        .join("");
    }
  });
}

const DESAFIOS_DIARIOS = Object.freeze([
  {
    id: "europeos",
    nombre: "Europeos",
    descripcion: "Construye una delegación europea equilibrada con potencias de segundo nivel y especialistas.",
    reglaEspecial: "Solo participan países europeos y cada elección debe aprovechar perfiles muy distintos.",
    paises: ["ESP", "ITA", "GER", "FRA", "GBR", "NED", "HUN", "ROU", "CZE", "AUT"],
    deportes: ["atletismo", "natacion", "remo", "piraguismo", "futbol", "voleibol", "escalada"],
    objetivos: [
      { nivel: "bronce", texto: "La delegación consigue al menos 25 medallas." },
      { nivel: "plata", texto: "La delegación consigue al menos 40 medallas." },
      { nivel: "oro", texto: "La delegación consigue al menos 48 medallas, incluidas 20 de oro." }
    ],
    tipoEvaluacion: "europeos"
  },
  {
    id: "contra_las_cuerdas",
    nombre: "Contra las cuerdas",
    descripcion: "Convierte una selección de delegaciones modestas en un equipo capaz de competir.",
    reglaEspecial: "Cada país conserva alguna fortaleza útil, pero una mala asignación puede dejarlo fuera del medallero.",
    paises: ["IND", "MEX", "AUT", "BUL", "FIJ", "SMR", "RSA", "ROU", "ARG", "NZL"],
    deportes: ["atletismo", "natacion", "boxeo", "piraguismo", "judo", "tiro", "rugby"],
    objetivos: [
      { nivel: "bronce", texto: "La delegación consigue al menos 8 medallas." },
      { nivel: "plata", texto: "La delegación consigue al menos 12 medallas." },
      { nivel: "oro", texto: "La delegación consigue al menos 14 medallas, incluidas 4 de oro." }
    ],
    tipoEvaluacion: "contra_las_cuerdas"
  },
  {
    id: "todos_deben_contar",
    nombre: "Todos deben contar",
    descripcion: "Cada integrante de la delegación debe aportar al resultado colectivo.",
    reglaEspecial: "No basta con acumular medallas: importa que ningún país termine sin contribuir.",
    paises: ["ESP", "ITA", "CUB", "KOR", "HUN", "BRA", "CAN", "JPN", "NED", "AUS"],
    deportes: ["atletismo", "natacion", "gimnasia", "boxeo", "piraguismo", "judo", "escalada"],
    objetivos: [
      { nivel: "bronce", texto: "6 de los 7 países consiguen al menos una medalla." },
      { nivel: "plata", texto: "Los 7 países consiguen al menos una medalla." },
      { nivel: "oro", texto: "Los 7 países consiguen al menos 2 medallas cada uno." }
    ],
    tipoEvaluacion: "todos_deben_contar"
  },
  {
    id: "mundo_al_reves",
    nombre: "El mundo al revés",
    descripcion: "Esta vez ganas construyendo deliberadamente la peor delegación posible.",
    reglaEspecial: "Coloca países reconocibles en deportes donde sean débiles y evita las medallas.",
    paises: ["USA", "CHN", "FRA", "JPN", "GBR", "AUS", "BRA", "CAN", "GER", "KOR"],
    deportes: ["atletismo", "natacion", "gimnasia", "boxeo", "piraguismo", "judo", "baloncesto"],
    objetivos: [
      { nivel: "bronce", texto: "La delegación consigue 15 medallas o menos." },
      { nivel: "plata", texto: "La delegación consigue 8 medallas o menos." },
      { nivel: "oro", texto: "La delegación consigue 4 medallas o menos." }
    ],
    tipoEvaluacion: "mundo_al_reves"
  },
  {
    id: "cielo_es_limite",
    nombre: "El cielo es el límite",
    descripcion: "Construye una delegación de máxima potencia con las mejores combinaciones posibles.",
    reglaEspecial: "El objetivo depende de conseguir asignaciones azules, no solo de sumar medallas.",
    paises: ["USA", "CHN", "FRA", "JPN", "GBR", "AUS", "ESP", "GER", "NED", "CAN"],
    deportes: ["atletismo", "natacion", "piraguismo", "ciclismo", "judo", "baloncesto", "tenis"],
    objetivos: [
      { nivel: "bronce", texto: "5 asignaciones azules." },
      { nivel: "plata", texto: "6 asignaciones azules." },
      { nivel: "oro", texto: "Las 7 asignaciones son azules." }
    ],
    tipoEvaluacion: "cielo_es_limite"
  },
  {
    id: "en_equipo",
    nombre: "En equipo",
    descripcion: "Triunfa en los siete deportes de equipo de Road to Gold con una delegación diseñada para competir en todos.",
    reglaEspecial: "Aquí importa conquistar deportes: reparte bien a tus especialistas y evita dejar un deporte colectivo sin opciones de medalla.",
    paises: ["ESP", "NED", "AUS", "FRA", "GER", "USA", "IND", "NZL", "FIJ", "BRA"],
    deportes: ["futbol", "baloncesto", "waterpolo", "balonmano", "voleibol", "rugby", "hockey"],
    rerolls: 1,
    objetivos: [
      { nivel: "bronce", texto: "Consigue medalla en al menos 5 de los 7 deportes." },
      { nivel: "plata", texto: "Consigue medalla en al menos 6 deportes y oro en 2 deportes distintos." },
      { nivel: "oro", texto: "Consigue medalla en los 7 deportes y oro en al menos 3 deportes distintos." }
    ],
    tipoEvaluacion: "en_equipo"
  },
  {
    id: "juegos_15x15",
    nombre: "Juegos 15x15",
    descripcion: "Unos Juegos gigantes: quince países, quince deportes y un draft mucho más largo de lo habitual.",
    reglaEspecial: "Gestiona una superdelegación de 15 países. La profundidad importa tanto como acertar con las grandes potencias.",
    paises: ["ESP", "USA", "ITA", "FRA", "CHN", "JAM", "KEN", "CUB", "GER", "JPN", "GBR", "KOR", "ETH", "AUS", "IND", "HUN", "NED", "SMR", "MEX", "BRA", "ARG", "TPE", "AUT", "FIJ", "NZL", "BUL", "CAN", "ROU", "RSA", "CZE"],
    deportes: ["atletismo", "natacion", "gimnasia", "remo", "boxeo", "piraguismo", "ciclismo", "judo", "futbol", "baloncesto", "waterpolo", "balonmano", "tenis", "hockey", "esgrima"],
    rerolls: 1,
    objetivos: [
      { nivel: "bronce", texto: "La delegación consigue al menos 70 medallas." },
      { nivel: "plata", texto: "La delegación consigue al menos 85 medallas." },
      { nivel: "oro", texto: "La delegación consigue al menos 95 medallas, incluidas 30 de oro." }
    ],
    tipoEvaluacion: "juegos_15x15"
  }
]);

function obtenerClaveFechaLocal(fecha = new Date()) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

function convertirClaveFechaADias(claveFecha) {
  const [anio, mes, dia] = claveFecha.split("-").map(Number);
  return Math.floor(Date.UTC(anio, mes - 1, dia) / 86400000);
}

function obtenerIndiceDesafioParaFecha(claveFecha) {
  const diasTranscurridos =
    convertirClaveFechaADias(claveFecha) -
    convertirClaveFechaADias(FECHA_INICIO_CICLO_DESAFIOS);

  return ((diasTranscurridos % DESAFIOS_DIARIOS.length) + DESAFIOS_DIARIOS.length) % DESAFIOS_DIARIOS.length;
}

function obtenerDesafioPorId(desafioId) {
  return DESAFIOS_DIARIOS.find(desafio => desafio.id === desafioId) || null;
}

function obtenerDesafioDelDia(claveFecha = obtenerClaveFechaLocal()) {
  if (desafioForzadoParaPruebas) {
    return obtenerDesafioPorId(desafioForzadoParaPruebas) ||
      DESAFIOS_DIARIOS[obtenerIndiceDesafioParaFecha(claveFecha)];
  }

  return DESAFIOS_DIARIOS[obtenerIndiceDesafioParaFecha(claveFecha)];
}

function crearGuardadoDesafiosVacio() {
  return {
    version: VERSION_GUARDADO_DESAFIOS,
    dias: {}
  };
}

function cargarGuardadoDesafios() {
  try {
    const texto = localStorage.getItem(CLAVE_DESAFIO_DIARIO);
    if (!texto) return crearGuardadoDesafiosVacio();

    const guardado = JSON.parse(texto);
    if (!guardado || typeof guardado !== "object") {
      return crearGuardadoDesafiosVacio();
    }

    return {
      version: VERSION_GUARDADO_DESAFIOS,
      dias: guardado.dias && typeof guardado.dias === "object"
        ? guardado.dias
        : {}
    };
  } catch (error) {
    console.warn("No se pudo cargar el guardado de Desafío diario.", error);
    return crearGuardadoDesafiosVacio();
  }
}

function guardarEstadoDesafios(guardado) {
  try {
    localStorage.setItem(CLAVE_DESAFIO_DIARIO, JSON.stringify(guardado));
  } catch (error) {
    console.warn("No se pudo guardar el estado de Desafío diario.", error);
  }
}

function crearEstadoDiaDesafio(claveFecha, desafio) {
  return {
    fecha: claveFecha,
    desafioId: desafio.id,
    intentosUtilizados: 0,
    resultados: [],
    mejorResultado: null,
    mejorNivel: NIVELES_DESAFIO.SIN_MEDALLA,
    mejorAsignacion: null,
    intentoEnCurso: null,
    intentosAbandonados: 0
  };
}

function normalizarEstadoDiaDesafio(estadoDia, claveFecha, desafio) {
  const base = crearEstadoDiaDesafio(claveFecha, desafio);
  const estado = estadoDia && typeof estadoDia === "object"
    ? { ...base, ...estadoDia }
    : base;

  estado.fecha = claveFecha;
  estado.desafioId = desafio.id;
  estado.intentosUtilizados = Math.max(
    0,
    Math.min(INTENTOS_DIARIOS_DESAFIO, Number(estado.intentosUtilizados) || 0)
  );
  estado.resultados = Array.isArray(estado.resultados) ? estado.resultados : [];
  estado.intentosAbandonados = Number(estado.intentosAbandonados) || 0;
  return estado;
}

function cerrarIntentoAbandonadoSiProcede(guardado, claveFecha, estadoDia) {
  if (!estadoDia.intentoEnCurso) return false;

  estadoDia.resultados.push({
    intento: estadoDia.intentoEnCurso.numero,
    iniciadoEn: estadoDia.intentoEnCurso.iniciadoEn,
    finalizadoEn: new Date().toISOString(),
    abandonado: true,
    nivel: NIVELES_DESAFIO.SIN_MEDALLA,
    resumen: "Intento abandonado o página recargada"
  });
  estadoDia.intentosAbandonados += 1;
  estadoDia.intentoEnCurso = null;
  guardado.dias[claveFecha] = estadoDia;
  guardarEstadoDesafios(guardado);
  return true;
}

function obtenerEstadoDesafioActual({ cerrarAbandonado = true } = {}) {
  const claveFecha = obtenerClaveFechaLocal();
  const desafio = obtenerDesafioDelDia(claveFecha);

  if (desafioForzadoParaPruebas) {
    return {
      claveFecha,
      desafio,
      estadoDia: crearEstadoDiaDesafio(claveFecha, desafio),
      esPrueba: true
    };
  }

  const guardado = cargarGuardadoDesafios();
  const guardadoDia = guardado.dias[claveFecha];
  const estadoDia = normalizarEstadoDiaDesafio(guardadoDia, claveFecha, desafio);
  guardado.dias[claveFecha] = estadoDia;

  if (!guardadoDia || guardadoDia.desafioId !== desafio.id) {
    guardarEstadoDesafios(guardado);
  }

  if (cerrarAbandonado) {
    cerrarIntentoAbandonadoSiProcede(guardado, claveFecha, estadoDia);
  }

  return {
    claveFecha,
    desafio,
    estadoDia,
    esPrueba: false
  };
}

function obtenerElementosPorCodigo(codigos, catalogo) {
  const mapa = new Map(catalogo.map(elemento => [elemento.codigo, elemento]));
  return codigos.map(codigo => mapa.get(codigo)).filter(Boolean);
}

function crearChipConfiguracion(texto) {
  const elemento = document.createElement("span");
  elemento.className = "chip-configuracion-desafio";
  elemento.textContent = texto;
  return elemento;
}

function renderizarObjetivosDesafio(desafio) {
  objetivosDesafioDiario.replaceChildren();

  desafio.objetivos.forEach(objetivo => {
    const tarjeta = document.createElement("article");
    tarjeta.className = `objetivo-desafio objetivo-${objetivo.nivel}`;

    const titulo = document.createElement("strong");
    titulo.textContent = ETIQUETAS_NIVEL_DESAFIO[objetivo.nivel] || objetivo.nivel;

    const texto = document.createElement("p");
    texto.textContent = objetivo.texto;

    tarjeta.append(titulo, texto);
    objetivosDesafioDiario.append(tarjeta);
  });
}

function renderizarConfiguracionDesafio(desafio) {
  deportesDesafioDiario.replaceChildren();
  paisesDesafioDiario.replaceChildren();

  const deportes = obtenerElementosPorCodigo(desafio.deportes, DEPORTES);
  const paises = obtenerElementosPorCodigo(desafio.paises, PAISES);

  deportes.forEach(deporte => {
    deportesDesafioDiario.append(crearChipConfiguracion(deporte.nombre));
  });

  paises.forEach(pais => {
    paisesDesafioDiario.append(crearChipConfiguracion(pais.nombre));
  });

  const cantidadParticipantes = desafio.deportes.length;
  const textoReroll = Number(desafio.rerolls) > 0
    ? ` · ${desafio.rerolls} reroll${desafio.rerolls === 1 ? "" : "s"}`
    : "";
  resumenPaisesDesafio.textContent = `${paises.length} países disponibles · utilizarás ${cantidadParticipantes} en cada intento${textoReroll}.`;
}


function obtenerResultadoPorNumeroIntento(estadoDia, numeroIntento) {
  return estadoDia.resultados.find(resultado => Number(resultado.intento) === numeroIntento) || null;
}

function renderizarHistorialIntentosDesafio(estadoDia, esPrueba = false) {
  if (!historialIntentosDesafio) return;

  historialIntentosDesafio.replaceChildren();
  botonVerMejorIntentoDesafio?.classList.toggle("oculto", esPrueba || !estadoDia.mejorResultado);

  for (let numero = 1; numero <= INTENTOS_DIARIOS_DESAFIO; numero += 1) {
    const resultado = obtenerResultadoPorNumeroIntento(estadoDia, numero);
    const enCurso = estadoDia.intentoEnCurso?.numero === numero;
    const utilizado = numero <= estadoDia.intentosUtilizados;
    const esMejor = Boolean(
      resultado &&
      estadoDia.mejorResultado &&
      resultado.intento === estadoDia.mejorResultado.intento
    );

    const tarjeta = document.createElement("article");
    tarjeta.className = "intento-historial-desafio";

    let estado = "Pendiente";
    let detalle = "Todavía no jugado";
    let clase = "intento-pendiente";

    if (esPrueba) {
      estado = "Prueba libre";
      detalle = "No afecta al desafío oficial";
      clase = "intento-prueba";
    } else if (resultado?.abandonado) {
      estado = "Abandonado";
      detalle = "Recarga o salida antes del resultado";
      clase = "intento-abandonado";
    } else if (resultado) {
      estado = ETIQUETAS_NIVEL_DESAFIO[resultado.nivel] || "Sin medalla";
      detalle = resultado.resumen || "Intento completado";
      clase = obtenerClaseNivelResultadoDesafio(resultado.nivel);
    } else if (enCurso || utilizado) {
      estado = "En curso";
      detalle = "Se contará como abandonado si sales o recargas";
      clase = "intento-en-curso";
    }

    tarjeta.classList.add(clase);
    tarjeta.innerHTML = `
      <span class="numero-intento-historial">${numero}</span>
      <div class="contenido-intento-historial">
        <div class="linea-estado-intento">
          <strong>${estado}</strong>
          ${esMejor ? '<span class="etiqueta-mejor-intento">Mejor</span>' : ''}
        </div>
        <small>${detalle}</small>
      </div>
    `;

    historialIntentosDesafio.appendChild(tarjeta);
  }
}

function reconstruirResultadosDesdeAsignaciones(asignaciones = []) {
  const mapaPaises = new Map(PAISES.map(pais => [pais.codigo, pais]));
  const mapaDeportes = new Map(DEPORTES.map(deporte => [deporte.codigo, deporte]));

  return asignaciones.map(asignacion => ({
    pais: mapaPaises.get(asignacion.paisCodigo) || {
      codigo: asignacion.paisCodigo,
      nombre: asignacion.paisNombre
    },
    deporte: mapaDeportes.get(asignacion.deporteCodigo) || {
      codigo: asignacion.deporteCodigo,
      nombre: asignacion.deporteNombre
    },
    oros: asignacion.oros || 0,
    platas: asignacion.platas || 0,
    bronces: asignacion.bronces || 0,
    color: asignacion.color || ""
  }));
}

function obtenerCicloDesdeEstadoDia(estadoDia, intento = null) {
  return {
    intento: intento || estadoDia.mejorResultado?.intento || estadoDia.intentosUtilizados,
    intentosRestantes: Math.max(0, INTENTOS_DIARIOS_DESAFIO - estadoDia.intentosUtilizados),
    mejorResultado: estadoDia.mejorResultado,
    mejorNivel: estadoDia.mejorNivel
  };
}

function mostrarMejorIntentoGuardadoDesafio() {
  const { desafio, estadoDia, claveFecha, esPrueba } = obtenerEstadoDesafioActual({ cerrarAbandonado: true });
  if (esPrueba || !estadoDia.mejorResultado) return;

  const resultado = estadoDia.mejorResultado;
  const asignaciones = reconstruirResultadosDesdeAsignaciones(resultado.asignaciones);
  ultimoCicloResultadoDesafio = obtenerCicloDesdeEstadoDia(estadoDia, resultado.intento);
  ultimoResultadoCompartibleDesafio = {
    desafio,
    evaluacion: resultado,
    resultados: asignaciones,
    claveFecha,
    intento: resultado.intento,
    esPrueba: false
  };

  completarPantallaResultadoDesafio(resultado, asignaciones, ultimoCicloResultadoDesafio, {
    claveFecha,
    esPrueba: false,
    esResultadoGuardado: true
  });
  mostrarPantalla(pantallaResultados);
}

function renderizarPantallaDesafioDiario() {
  const { desafio, estadoDia, esPrueba } = obtenerEstadoDesafioActual();
  const intentosRestantes = Math.max(0, INTENTOS_DIARIOS_DESAFIO - estadoDia.intentosUtilizados);

  nombreDesafioDiario.textContent = desafio.nombre;
  descripcionDesafioDiario.textContent = desafio.descripcion;
  reglaDesafioDiario.textContent = desafio.reglaEspecial;
  intentosRestantesDesafio.textContent = `${intentosRestantes} de ${INTENTOS_DIARIOS_DESAFIO}`;
  mejorNivelDesafio.textContent = ETIQUETAS_NIVEL_DESAFIO[estadoDia.mejorNivel] || "Sin medalla";
  mejorResultadoDesafio.textContent = estadoDia.mejorResultado
    ? `${estadoDia.mejorResultado.resumen} · ${estadoDia.mejorResultado.progresoSiguienteNivel || ""}`.replace(/ · $/, "")
    : "Sin intentos todavía";

  const bloqueado = !desafioForzadoParaPruebas && intentosRestantes === 0;
  botonComenzarDesafio.disabled = bloqueado;
  botonComenzarDesafio.textContent = bloqueado
    ? "Desafío completado por hoy"
    : desafioForzadoParaPruebas
      ? "Comenzar prueba"
      : `Comenzar intento ${estadoDia.intentosUtilizados + 1}`;

  renderizarHistorialIntentosDesafio(estadoDia, esPrueba);
  renderizarObjetivosDesafio(desafio);
  renderizarConfiguracionDesafio(desafio);
}

function abrirDesafioDiario() {
  modoJuegoActual = MODO_DESAFIO_DIARIO;
  renderizarPantallaDesafioDiario();
  mostrarPantalla(pantallaDesafioDiario);
}

function volverInicioDesdeDesafio() {
  desafioForzadoParaPruebas = null;
  configuracionDesafioEnCurso = null;
  modoJuegoActual = MODO_PARTIDA_RAPIDA;
  mostrarPantalla(pantallaInicio);
}


function crearConfiguracionPartidaDesafio(desafio) {
  if (!desafio) return null;

  return {
    desafioId: desafio.id,
    paisesPermitidos: [...desafio.paises],
    deportesPermitidos: [...desafio.deportes],
    cantidadParticipantes: desafio.deportes.length,
    permiteReroll: Number(desafio.rerolls) > 0,
    rerollsDisponibles: Math.max(0, Number(desafio.rerolls) || 0),
    evaluador: desafio.tipoEvaluacion
  };
}

function obtenerDeportesConfiguradosDesafio() {
  if (!configuracionDesafioEnCurso) return [];
  return obtenerElementosPorCodigo(
    configuracionDesafioEnCurso.deportesPermitidos,
    DEPORTES
  ).filter(estaActivo);
}

function obtenerPaisesConfiguradosDesafio() {
  if (!configuracionDesafioEnCurso) return [];
  return obtenerElementosPorCodigo(
    configuracionDesafioEnCurso.paisesPermitidos,
    PAISES
  ).filter(estaActivo);
}

function obtenerValorNivelDesafio(nivel) {
  const valores = {
    [NIVELES_DESAFIO.SIN_MEDALLA]: 0,
    [NIVELES_DESAFIO.BRONCE]: 1,
    [NIVELES_DESAFIO.PLATA]: 2,
    [NIVELES_DESAFIO.ORO]: 3
  };
  return valores[nivel] ?? 0;
}

function obtenerCriteriosDesempateEvaluacion(evaluacion) {
  return Array.isArray(evaluacion?.claveDesempate)
    ? evaluacion.claveDesempate
    : [];
}

function esEvaluacionMejor(candidata, actual) {
  if (!actual) return true;

  const diferenciaNivel =
    obtenerValorNivelDesafio(candidata.nivel) -
    obtenerValorNivelDesafio(actual.nivel);
  if (diferenciaNivel !== 0) return diferenciaNivel > 0;

  const criteriosCandidata = obtenerCriteriosDesempateEvaluacion(candidata);
  const criteriosActual = obtenerCriteriosDesempateEvaluacion(actual);
  const longitud = Math.max(criteriosCandidata.length, criteriosActual.length);

  for (let indice = 0; indice < longitud; indice += 1) {
    const diferencia =
      (Number(criteriosCandidata[indice]) || 0) -
      (Number(criteriosActual[indice]) || 0);
    if (diferencia !== 0) return diferencia > 0;
  }

  return false;
}

function registrarInicioIntentoOficial(desafio) {
  const contexto = obtenerEstadoDesafioActual({ cerrarAbandonado: true });
  if (contexto.esPrueba) return { permitido: true, esPrueba: true };

  const { claveFecha, estadoDia } = contexto;
  if (estadoDia.intentosUtilizados >= INTENTOS_DIARIOS_DESAFIO) {
    return { permitido: false, esPrueba: false };
  }

  estadoDia.intentosUtilizados += 1;
  estadoDia.intentoEnCurso = {
    numero: estadoDia.intentosUtilizados,
    desafioId: desafio.id,
    iniciadoEn: new Date().toISOString()
  };

  const guardado = cargarGuardadoDesafios();
  guardado.dias[claveFecha] = estadoDia;
  guardarEstadoDesafios(guardado);

  return {
    permitido: true,
    esPrueba: false,
    numeroIntento: estadoDia.intentosUtilizados
  };
}

function crearResumenAsignacionesDesafio(resultados) {
  return resultados.map(resultado => ({
    paisCodigo: resultado.pais?.codigo || "",
    paisNombre: resultado.pais?.nombre || "",
    deporteCodigo: resultado.deporte?.codigo || "",
    deporteNombre: resultado.deporte?.nombre || "",
    oros: resultado.oros || 0,
    platas: resultado.platas || 0,
    bronces: resultado.bronces || 0,
    color: resultado.color || ""
  }));
}

function registrarResultadoIntentoDesafio(evaluacion, resultados) {
  if (!evaluacion || desafioForzadoParaPruebas) return null;
  modoJuegoActual = MODO_DESAFIO_DIARIO;

  const { claveFecha, desafio, estadoDia } = obtenerEstadoDesafioActual({ cerrarAbandonado: false });
  const intento = estadoDia.intentoEnCurso;
  if (!intento || intento.desafioId !== desafio.id) return null;

  const resultadoGuardado = {
    ...evaluacion,
    intento: intento.numero,
    iniciadoEn: intento.iniciadoEn,
    finalizadoEn: new Date().toISOString(),
    abandonado: false,
    asignaciones: crearResumenAsignacionesDesafio(resultados)
  };

  estadoDia.resultados.push(resultadoGuardado);
  estadoDia.intentoEnCurso = null;

  if (esEvaluacionMejor(resultadoGuardado, estadoDia.mejorResultado)) {
    estadoDia.mejorResultado = resultadoGuardado;
    estadoDia.mejorNivel = resultadoGuardado.nivel;
    estadoDia.mejorAsignacion = resultadoGuardado.asignaciones;
  }

  const guardado = cargarGuardadoDesafios();
  guardado.dias[claveFecha] = estadoDia;
  guardarEstadoDesafios(guardado);

  return {
    intento: resultadoGuardado.intento,
    intentosRestantes: Math.max(0, INTENTOS_DIARIOS_DESAFIO - estadoDia.intentosUtilizados),
    mejorResultado: estadoDia.mejorResultado,
    mejorNivel: estadoDia.mejorNivel
  };
}

function iniciarDesafioDiarioJugable() {
  const { desafio } = obtenerEstadoDesafioActual();
  const inicio = registrarInicioIntentoOficial(desafio);

  if (!inicio.permitido) {
    renderizarPantallaDesafioDiario();
    return;
  }

  configuracionDesafioEnCurso = {
    ...crearConfiguracionPartidaDesafio(desafio),
    esPrueba: inicio.esPrueba,
    numeroIntento: inicio.numeroIntento || null
  };
  modoJuegoActual = MODO_DESAFIO_DIARIO;
  renderizarContextoDesafioEnPartida();
  mostrarPantalla(pantallaDeportes);
  iniciarPartida();
}

function evaluarResultadoDesafio(resultados) {
  if (!configuracionDesafioEnCurso) return null;

  const evaluadores = {
    europeos: evaluarEuropeos,
    contra_las_cuerdas: evaluarContraLasCuerdas,
    todos_deben_contar: evaluarTodosDebenContar,
    mundo_al_reves: evaluarMundoAlReves,
    cielo_es_limite: evaluarCieloEsLimite,
    en_equipo: evaluarEnEquipo,
    juegos_15x15: evaluarJuegos15x15
  };

  const evaluador = evaluadores[configuracionDesafioEnCurso.evaluador];
  return evaluador ? evaluador(resultados) : null;
}

function contarMedallasResultado(resultado) {
  return (resultado.oros || 0) + (resultado.platas || 0) + (resultado.bronces || 0);
}

function obtenerMetricasComunesDesafio(resultados) {
  const medallasPorPais = resultados.map(contarMedallasResultado);
  return {
    paisesConMedalla: medallasPorPais.filter(medallas => medallas > 0).length,
    aportacionMinima: medallasPorPais.length ? Math.min(...medallasPorPais) : 0,
    medallasTotales: medallasPorPais.reduce((total, medallas) => total + medallas, 0),
    orosTotales: resultados.reduce((total, resultado) => total + (resultado.oros || 0), 0),
    deportesConOro: resultados.filter(resultado => (resultado.oros || 0) > 0).length
  };
}

function crearEvaluacionDesafio({
  desafioId,
  nivel,
  resumen,
  detalle,
  progresoSiguienteNivel,
  metricas,
  claveDesempate
}) {
  return {
    desafioId,
    nivel,
    resumen,
    detalle,
    progresoSiguienteNivel,
    metricas: { ...metricas },
    claveDesempate: [...claveDesempate],
    ...metricas
  };
}

function textoObjetivoAlcanzado(nivel) {
  return nivel === NIVELES_DESAFIO.ORO
    ? "Has alcanzado el nivel máximo del desafío."
    : "";
}

function evaluarEuropeos(resultados) {
  const metricas = obtenerMetricasComunesDesafio(resultados);
  const cumpleBronce = metricas.medallasTotales >= 25;
  const cumplePlata = metricas.medallasTotales >= 40;
  const cumpleOro =
    metricas.medallasTotales >= 48 &&
    metricas.orosTotales >= 20;

  let nivel = NIVELES_DESAFIO.SIN_MEDALLA;
  if (cumpleBronce) nivel = NIVELES_DESAFIO.BRONCE;
  if (cumplePlata) nivel = NIVELES_DESAFIO.PLATA;
  if (cumpleOro) nivel = NIVELES_DESAFIO.ORO;

  let progresoSiguienteNivel = textoObjetivoAlcanzado(nivel);
  if (nivel === NIVELES_DESAFIO.SIN_MEDALLA) {
    progresoSiguienteNivel =
      `Para el bronce faltan ${Math.max(0, 25 - metricas.medallasTotales)} medalla(s).`;
  } else if (nivel === NIVELES_DESAFIO.BRONCE) {
    progresoSiguienteNivel =
      `Para la plata faltan ${Math.max(0, 40 - metricas.medallasTotales)} medalla(s).`;
  } else if (nivel === NIVELES_DESAFIO.PLATA) {
    const faltanMedallas = Math.max(0, 48 - metricas.medallasTotales);
    const faltanOros = Math.max(0, 20 - metricas.orosTotales);
    progresoSiguienteNivel =
      `Para el oro faltan ${faltanMedallas} medalla(s) y ${faltanOros} oro(s).`;
  }

  return crearEvaluacionDesafio({
    desafioId: "europeos",
    nivel,
    resumen: `${metricas.medallasTotales} medallas · ${metricas.orosTotales} oros`,
    detalle: `La delegación europea terminó con ${metricas.medallasTotales} medallas, incluidas ${metricas.orosTotales} de oro.`,
    progresoSiguienteNivel,
    metricas,
    claveDesempate: [
      metricas.medallasTotales,
      metricas.orosTotales
    ]
  });
}

function evaluarContraLasCuerdas(resultados) {
  const metricas = obtenerMetricasComunesDesafio(resultados);
  const cumpleBronce = metricas.medallasTotales >= 8;
  const cumplePlata = metricas.medallasTotales >= 12;
  const cumpleOro =
    metricas.medallasTotales >= 14 &&
    metricas.orosTotales >= 4;

  let nivel = NIVELES_DESAFIO.SIN_MEDALLA;
  if (cumpleBronce) nivel = NIVELES_DESAFIO.BRONCE;
  if (cumplePlata) nivel = NIVELES_DESAFIO.PLATA;
  if (cumpleOro) nivel = NIVELES_DESAFIO.ORO;

  let progresoSiguienteNivel = textoObjetivoAlcanzado(nivel);

  if (nivel === NIVELES_DESAFIO.SIN_MEDALLA) {
    progresoSiguienteNivel =
      `Para el bronce faltan ${Math.max(0, 8 - metricas.medallasTotales)} medalla(s).`;
  } else if (nivel === NIVELES_DESAFIO.BRONCE) {
    progresoSiguienteNivel =
      `Para la plata faltan ${Math.max(0, 12 - metricas.medallasTotales)} medalla(s).`;
  } else if (nivel === NIVELES_DESAFIO.PLATA) {
    const faltanMedallas = Math.max(0, 14 - metricas.medallasTotales);
    const faltanOros = Math.max(0, 4 - metricas.orosTotales);
    progresoSiguienteNivel =
      `Para el oro faltan ${faltanMedallas} medalla(s) y ${faltanOros} oro(s).`;
  }

  return crearEvaluacionDesafio({
    desafioId: "contra_las_cuerdas",
    nivel,
    resumen: `${metricas.medallasTotales} medallas conseguidas`,
    detalle: `La delegación logró ${metricas.orosTotales} oro${metricas.orosTotales === 1 ? "" : "s"}.`,
    progresoSiguienteNivel,
    metricas,
    claveDesempate: [
      metricas.medallasTotales,
      metricas.orosTotales,
      metricas.paisesConMedalla
    ]
  });
}

function evaluarTodosDebenContar(resultados) {
  const metricas = obtenerMetricasComunesDesafio(resultados);

  let nivel = NIVELES_DESAFIO.SIN_MEDALLA;
  if (metricas.paisesConMedalla >= 6) nivel = NIVELES_DESAFIO.BRONCE;
  if (metricas.paisesConMedalla === 7) nivel = NIVELES_DESAFIO.PLATA;
  if (metricas.paisesConMedalla === 7 && metricas.aportacionMinima >= 2) {
    nivel = NIVELES_DESAFIO.ORO;
  }

  let progresoSiguienteNivel = textoObjetivoAlcanzado(nivel);
  if (nivel === NIVELES_DESAFIO.SIN_MEDALLA) {
    progresoSiguienteNivel = `Para el bronce falta que medallen ${Math.max(0, 6 - metricas.paisesConMedalla)} país(es).`;
  } else if (nivel === NIVELES_DESAFIO.BRONCE) {
    progresoSiguienteNivel = "Para la plata, los 7 países deben conseguir al menos una medalla.";
  } else if (nivel === NIVELES_DESAFIO.PLATA) {
    const paisesConUna = resultados.filter(resultado => contarMedallasResultado(resultado) < 2).length;
    progresoSiguienteNivel = `Para el oro, ${paisesConUna} país(es) todavía necesitan alcanzar 2 medallas.`;
  }

  return crearEvaluacionDesafio({
    desafioId: "todos_deben_contar",
    nivel,
    resumen: `${metricas.paisesConMedalla}/7 países consiguieron medalla`,
    detalle: metricas.aportacionMinima > 0
      ? `La aportación mínima fue de ${metricas.aportacionMinima} medalla${metricas.aportacionMinima === 1 ? "" : "s"}.`
      : "Al menos un país terminó sin medallas.",
    progresoSiguienteNivel,
    metricas,
    claveDesempate: [
      metricas.paisesConMedalla,
      metricas.aportacionMinima,
      metricas.medallasTotales,
      metricas.orosTotales
    ]
  });
}

function evaluarMundoAlReves(resultados) {
  const metricas = obtenerMetricasComunesDesafio(resultados);

  let nivel = NIVELES_DESAFIO.SIN_MEDALLA;
  if (metricas.medallasTotales <= 15) nivel = NIVELES_DESAFIO.BRONCE;
  if (metricas.medallasTotales <= 8) nivel = NIVELES_DESAFIO.PLATA;
  if (metricas.medallasTotales <= 4) nivel = NIVELES_DESAFIO.ORO;

  let progresoSiguienteNivel = textoObjetivoAlcanzado(nivel);
  if (nivel === NIVELES_DESAFIO.SIN_MEDALLA) {
    progresoSiguienteNivel = `Para el bronce debes reducir ${metricas.medallasTotales - 15} medalla(s).`;
  } else if (nivel === NIVELES_DESAFIO.BRONCE) {
    progresoSiguienteNivel = `Para la plata debes reducir ${metricas.medallasTotales - 8} medalla(s).`;
  } else if (nivel === NIVELES_DESAFIO.PLATA) {
    progresoSiguienteNivel = `Para el oro debes reducir ${metricas.medallasTotales - 4} medalla(s).`;
  }

  return crearEvaluacionDesafio({
    desafioId: "mundo_al_reves",
    nivel,
    resumen: `${metricas.medallasTotales} medalla${metricas.medallasTotales === 1 ? "" : "s"} en total`,
    detalle: `Cuantas menos medallas consiga la delegación, mejor será el resultado.`,
    progresoSiguienteNivel,
    metricas,
    claveDesempate: [
      -metricas.medallasTotales,
      -metricas.orosTotales
    ]
  });
}

function evaluarCieloEsLimite(resultados) {
  const metricasComunes = obtenerMetricasComunesDesafio(resultados);
  const asignacionesAzules = resultados.filter(resultado => resultado.color === "azul").length;
  const metricas = { ...metricasComunes, asignacionesAzules };

  let nivel = NIVELES_DESAFIO.SIN_MEDALLA;
  if (asignacionesAzules >= 5) nivel = NIVELES_DESAFIO.BRONCE;
  if (asignacionesAzules >= 6) nivel = NIVELES_DESAFIO.PLATA;
  if (asignacionesAzules === 7) nivel = NIVELES_DESAFIO.ORO;

  let progresoSiguienteNivel = textoObjetivoAlcanzado(nivel);
  if (nivel === NIVELES_DESAFIO.SIN_MEDALLA) {
    progresoSiguienteNivel = `Para el bronce faltan ${Math.max(0, 5 - asignacionesAzules)} asignación(es) azul(es).`;
  } else if (nivel === NIVELES_DESAFIO.BRONCE) {
    progresoSiguienteNivel = "Para la plata falta 1 asignación azul.";
  } else if (nivel === NIVELES_DESAFIO.PLATA) {
    progresoSiguienteNivel = "Para el oro falta 1 asignación azul.";
  }

  return crearEvaluacionDesafio({
    desafioId: "cielo_es_limite",
    nivel,
    resumen: `${asignacionesAzules}/7 asignaciones azules`,
    detalle: `La delegación sumó ${metricas.medallasTotales} medallas con los umbrales de color reales del juego.`,
    progresoSiguienteNivel,
    metricas,
    claveDesempate: [
      asignacionesAzules,
      metricas.medallasTotales,
      metricas.orosTotales
    ]
  });
}

function evaluarEnEquipo(resultados) {
  const metricas = obtenerMetricasComunesDesafio(resultados);
  const deportesConMedalla = resultados.filter(resultado => contarMedallasResultado(resultado) > 0).length;
  const deportesConOro = resultados.filter(resultado => (resultado.oros || 0) > 0).length;
  const metricasEquipo = { ...metricas, deportesConMedalla, deportesConOro };

  let nivel = NIVELES_DESAFIO.SIN_MEDALLA;
  if (deportesConMedalla >= 5) nivel = NIVELES_DESAFIO.BRONCE;
  if (deportesConMedalla >= 6 && deportesConOro >= 2) nivel = NIVELES_DESAFIO.PLATA;
  if (deportesConMedalla === 7 && deportesConOro >= 3) nivel = NIVELES_DESAFIO.ORO;

  let progresoSiguienteNivel = textoObjetivoAlcanzado(nivel);
  if (nivel === NIVELES_DESAFIO.SIN_MEDALLA) {
    progresoSiguienteNivel = `Para el bronce faltan ${Math.max(0, 5 - deportesConMedalla)} deporte(s) con medalla.`;
  } else if (nivel === NIVELES_DESAFIO.BRONCE) {
    const faltanMedalla = Math.max(0, 6 - deportesConMedalla);
    const faltanOro = Math.max(0, 2 - deportesConOro);
    progresoSiguienteNivel = `Para la plata faltan ${faltanMedalla} deporte(s) con medalla y ${faltanOro} deporte(s) con oro.`;
  } else if (nivel === NIVELES_DESAFIO.PLATA) {
    const faltanMedalla = Math.max(0, 7 - deportesConMedalla);
    const faltanOro = Math.max(0, 3 - deportesConOro);
    progresoSiguienteNivel = `Para el oro faltan ${faltanMedalla} deporte(s) con medalla y ${faltanOro} deporte(s) con oro.`;
  }

  return crearEvaluacionDesafio({
    desafioId: "en_equipo",
    nivel,
    resumen: `${deportesConMedalla}/7 deportes con medalla · ${deportesConOro} con oro`,
    detalle: `La delegación consiguió medalla en ${deportesConMedalla} deportes y oro en ${deportesConOro}.`,
    progresoSiguienteNivel,
    metricas: metricasEquipo,
    claveDesempate: [
      deportesConMedalla,
      deportesConOro,
      metricas.medallasTotales,
      metricas.orosTotales
    ]
  });
}

function evaluarJuegos15x15(resultados) {
  const metricas = obtenerMetricasComunesDesafio(resultados);
  const cumpleBronce = metricas.medallasTotales >= 70;
  const cumplePlata = metricas.medallasTotales >= 85;
  const cumpleOro = metricas.medallasTotales >= 95 && metricas.orosTotales >= 30;

  let nivel = NIVELES_DESAFIO.SIN_MEDALLA;
  if (cumpleBronce) nivel = NIVELES_DESAFIO.BRONCE;
  if (cumplePlata) nivel = NIVELES_DESAFIO.PLATA;
  if (cumpleOro) nivel = NIVELES_DESAFIO.ORO;

  let progresoSiguienteNivel = textoObjetivoAlcanzado(nivel);
  if (nivel === NIVELES_DESAFIO.SIN_MEDALLA) {
    progresoSiguienteNivel = `Para el bronce faltan ${Math.max(0, 70 - metricas.medallasTotales)} medalla(s).`;
  } else if (nivel === NIVELES_DESAFIO.BRONCE) {
    progresoSiguienteNivel = `Para la plata faltan ${Math.max(0, 85 - metricas.medallasTotales)} medalla(s).`;
  } else if (nivel === NIVELES_DESAFIO.PLATA) {
    const faltanMedallas = Math.max(0, 95 - metricas.medallasTotales);
    const faltanOros = Math.max(0, 30 - metricas.orosTotales);
    progresoSiguienteNivel = `Para el oro faltan ${faltanMedallas} medalla(s) y ${faltanOros} oro(s).`;
  }

  return crearEvaluacionDesafio({
    desafioId: "juegos_15x15",
    nivel,
    resumen: `${metricas.medallasTotales} medallas · ${metricas.orosTotales} oros`,
    detalle: `La superdelegación terminó los 15 deportes con ${metricas.medallasTotales} medallas, incluidas ${metricas.orosTotales} de oro.`,
    progresoSiguienteNivel,
    metricas,
    claveDesempate: [
      metricas.medallasTotales,
      metricas.orosTotales,
      metricas.paisesConMedalla
    ]
  });
}

function avanzarDesafioParaPruebas() {
  const actual = obtenerDesafioDelDia();
  const indiceActual = Math.max(0, DESAFIOS_DIARIOS.findIndex(desafio => desafio.id === actual.id));
  const siguiente = DESAFIOS_DIARIOS[(indiceActual + 1) % DESAFIOS_DIARIOS.length];
  desafioForzadoParaPruebas = siguiente.id;
  configuracionDesafioEnCurso = null;
  ultimoCicloResultadoDesafio = null;
  ultimoResultadoCompartibleDesafio = null;
  renderizarPantallaDesafioDiario();
}

function obtenerClaseNivelResultadoDesafio(nivel) {
  return `nivel-${String(nivel || NIVELES_DESAFIO.SIN_MEDALLA).replaceAll("_", "-")}`;
}

function formatearFechaResultadoDesafio(claveFecha) {
  const [anio, mes, dia] = claveFecha.split("-").map(Number);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(anio, mes - 1, dia));
}

function renderizarNivelesResultadoDesafio(desafio, nivelConseguido) {
  if (!nivelesResultadoDesafio) return;

  const valorConseguido = obtenerValorNivelDesafio(nivelConseguido);
  nivelesResultadoDesafio.innerHTML = desafio.objetivos
    .map(objetivo => {
      const valorObjetivo = obtenerValorNivelDesafio(objetivo.nivel);
      const alcanzado = valorConseguido >= valorObjetivo;
      const actual = nivelConseguido === objetivo.nivel;
      const iconos = { bronce: "🥉", plata: "🥈", oro: "🥇" };

      return `
        <article class="objetivo-final-desafio ${alcanzado ? "objetivo-alcanzado" : ""} ${actual ? "objetivo-actual" : ""}">
          <span class="icono-objetivo-final">${iconos[objetivo.nivel] || "🏅"}</span>
          <div>
            <strong>${ETIQUETAS_NIVEL_DESAFIO[objetivo.nivel]}</strong>
            <p>${objetivo.texto}</p>
          </div>
          <span class="estado-objetivo-final" aria-label="${alcanzado ? "Objetivo cumplido" : "Objetivo pendiente"}">
            ${alcanzado ? "✓" : "○"}
          </span>
        </article>
      `;
    })
    .join("");
}

function renderizarAsignacionesResultadoDesafio(resultados) {
  if (!listaAsignacionesResultadoDesafio) return;

  listaAsignacionesResultadoDesafio.innerHTML = "";

  resultados.forEach(resultado => {
    const total = contarMedallasResultado(resultado);
    const tarjeta = document.createElement("article");
    tarjeta.className = `asignacion-final-desafio eleccion-${resultado.color || "rojo"}`;

    const bloqueBandera = document.createElement("div");
    bloqueBandera.className = "bandera-asignacion-final";

    const imagen = document.createElement("img");
    const alternativa = document.createElement("span");
    alternativa.className = "bandera-alternativa-final";
    bloqueBandera.append(imagen, alternativa);
    cargarBandera(imagen, alternativa, resultado.pais);

    const informacion = document.createElement("div");
    informacion.className = "informacion-asignacion-final";
    informacion.innerHTML = `
      <strong>${resultado.pais.nombre}</strong>
      <span>${resultado.deporte.nombre}</span>
      <small>🥇 ${resultado.oros} · 🥈 ${resultado.platas} · 🥉 ${resultado.bronces}</small>
    `;

    const totalMedallas = document.createElement("strong");
    totalMedallas.className = "total-asignacion-final";
    totalMedallas.textContent = total;
    totalMedallas.title = `${total} medalla${total === 1 ? "" : "s"}`;

    tarjeta.append(bloqueBandera, informacion, totalMedallas);
    listaAsignacionesResultadoDesafio.appendChild(tarjeta);
  });
}

function configurarAccionesResultadoDesafio(ciclo) {
  botonCompartirResultado.classList.add("oculto");
  mensajeCompartirResultado.classList.add("oculto");

  botonVolverInicioResultados.classList.remove("oculto");
  botonVolverInicioResultados.textContent = "Volver al desafío";

  if (!ciclo) {
    botonNuevaPartida.textContent = "Jugar otra prueba";
    botonNuevaPartida.disabled = false;
    return;
  }

  if (ciclo.intentosRestantes > 0) {
    botonNuevaPartida.textContent = `Jugar intento ${ciclo.intento + 1}`;
    botonNuevaPartida.disabled = false;
  } else {
    botonNuevaPartida.textContent = "Desafío completado por hoy";
    botonNuevaPartida.disabled = true;
  }
}

function completarPantallaResultadoDesafio(evaluacion, resultados, ciclo, opciones = {}) {
  const desafio = obtenerDesafioPorId(evaluacion.desafioId);
  const claveFecha = opciones.claveFecha || obtenerClaveFechaLocal();
  const esPrueba = Boolean(opciones.esPrueba);
  const etiquetaNivel = evaluacion.etiquetaNivel || ETIQUETAS_NIVEL_DESAFIO[evaluacion.nivel];

  nombreResultadoDesafio.textContent = desafio?.nombre || "Desafío diario";
  tituloResultadosJuegos.textContent = desafio?.nombre || "Desafío diario";
  pantallaResultados.classList.add("resultado-modo-desafio");
  zonaRecords.classList.add("oculto");
  fechaResultadoDesafio.textContent = esPrueba
    ? "Partida de prueba · no afecta al desafío oficial"
    : `${formatearFechaResultadoDesafio(claveFecha)}${opciones.esResultadoGuardado ? " · mejor intento guardado" : ""}`;

  nivelResultadoDesafio.textContent = etiquetaNivel;
  insigniaNivelResultadoDesafio.className = `insignia-nivel-desafio ${obtenerClaseNivelResultadoDesafio(evaluacion.nivel)}`;

  datoPrincipalResultadoDesafio.textContent = evaluacion.resumen;
  detalleResultadoDesafio.textContent = evaluacion.detalle;
  progresoResultadoDesafio.textContent = evaluacion.progresoSiguienteNivel;

  renderizarNivelesResultadoDesafio(desafio, evaluacion.nivel);
  renderizarAsignacionesResultadoDesafio(resultados);

  if (ciclo) {
    intentoResultadoDesafio.textContent = `${ciclo.intento} de ${INTENTOS_DIARIOS_DESAFIO}`;
    intentosRestantesResultadoDesafio.textContent = ciclo.intentosRestantes;
    mejorNivelResultadoDesafio.textContent = ETIQUETAS_NIVEL_DESAFIO[ciclo.mejorNivel] || "Sin medalla";
    mejorMarcaResultadoDesafio.textContent = ciclo.mejorResultado?.resumen || evaluacion.resumen;
  } else {
    intentoResultadoDesafio.textContent = "Prueba";
    intentosRestantesResultadoDesafio.textContent = "No consume";
    mejorNivelResultadoDesafio.textContent = "No se registra";
    mejorMarcaResultadoDesafio.textContent = "Partida de calibración";
  }

  configurarAccionesResultadoDesafio(ciclo);
  botonCompartirResultado.classList.remove("oculto");
  botonCompartirResultado.disabled = false;
  mensajeCompartirResultado.classList.add("oculto");
  resumenResultadoDesafio.classList.remove("oculto");
}

function mostrarResumenResultadoDesafio(evaluacion) {
  if (!evaluacion) return;

  const desafio = obtenerDesafioPorId(evaluacion.desafioId);
  const claveFecha = obtenerClaveFechaLocal();
  const ciclo = registrarResultadoIntentoDesafio(evaluacion, resultadosJuegos);
  ultimoCicloResultadoDesafio = ciclo;
  ultimoResultadoCompartibleDesafio = {
    desafio,
    evaluacion,
    resultados: [...resultadosJuegos],
    claveFecha,
    intento: ciclo?.intento || null,
    esPrueba: Boolean(desafioForzadoParaPruebas)
  };

  registrarEventoAnalitica("daily_complete", {
    challenge_id: evaluacion.desafioId,
    attempt_number: ciclo?.intento || 0,
    medal_tier: evaluacion.nivel || "sin_medalla",
    medals_total: evaluacion.medallasTotales || 0,
    gold_total: evaluacion.orosTotales || 0
  });

  completarPantallaResultadoDesafio(evaluacion, resultadosJuegos, ciclo, {
    claveFecha,
    esPrueba: Boolean(desafioForzadoParaPruebas),
    esResultadoGuardado: false
  });
}

function cargarImagenCanvasDesafio(ruta) {
  return new Promise(resolve => {
    const imagen = new Image();
    imagen.onload = () => resolve(imagen);
    imagen.onerror = () => resolve(null);
    imagen.src = ruta;
  });
}

function dibujarTextoAjustadoDesafio(contexto, texto, x, y, anchoMaximo, altoLinea, maxLineas = 2) {
  const palabras = String(texto || "").split(/\s+/);
  const lineas = [];
  let linea = "";

  palabras.forEach(palabra => {
    const candidata = linea ? `${linea} ${palabra}` : palabra;
    if (contexto.measureText(candidata).width <= anchoMaximo || !linea) {
      linea = candidata;
    } else {
      lineas.push(linea);
      linea = palabra;
    }
  });
  if (linea) lineas.push(linea);

  const visibles = lineas.slice(0, maxLineas);
  if (lineas.length > maxLineas) {
    let ultima = visibles[maxLineas - 1];
    while (ultima && contexto.measureText(`${ultima}…`).width > anchoMaximo) {
      ultima = ultima.slice(0, -1);
    }
    visibles[maxLineas - 1] = `${ultima}…`;
  }

  visibles.forEach((lineaVisible, indice) => {
    contexto.fillText(lineaVisible, x, y + indice * altoLinea);
  });
}

async function generarImagenResultadoDesafio() {
  if (!ultimoResultadoCompartibleDesafio) {
    throw new Error("No hay un resultado de desafío disponible para compartir.");
  }

  const canvas = canvasCompartirResultado;
  const contexto = canvas?.getContext("2d");
  if (!canvas || !contexto) {
    throw new Error("El navegador no permite crear la imagen del desafío.");
  }
  const { desafio, evaluacion, resultados, claveFecha, intento, esPrueba } = ultimoResultadoCompartibleDesafio;
  const ancho = canvas.width;
  const alto = canvas.height;

  contexto.clearRect(0, 0, ancho, alto);
  contexto.fillStyle = "#071426";
  contexto.fillRect(0, 0, ancho, alto);

  contexto.fillStyle = "#0f2440";
  contexto.fillRect(54, 54, ancho - 108, alto - 108);

  contexto.textAlign = "center";
  contexto.fillStyle = "#f7c948";
  contexto.font = "700 34px Arial";
  contexto.fillText("ROAD TO GOLD · DESAFÍO DIARIO", ancho / 2, 118);

  contexto.fillStyle = "#ffffff";
  contexto.font = "700 68px Arial";
  dibujarTextoAjustadoDesafio(contexto, desafio?.nombre || "Desafío diario", ancho / 2, 205, 860, 76, 2);

  contexto.fillStyle = "#a9bad0";
  contexto.font = "28px Arial";
  contexto.fillText(esPrueba ? "Partida de prueba" : formatearFechaResultadoDesafio(claveFecha), ancho / 2, 310);

  contexto.fillStyle = evaluacion.nivel === NIVELES_DESAFIO.ORO ? "#f7c948" : "#ffffff";
  contexto.font = "700 76px Arial";
  contexto.fillText(ETIQUETAS_NIVEL_DESAFIO[evaluacion.nivel] || "Sin medalla", ancho / 2, 415);

  contexto.fillStyle = "#dbe7f5";
  contexto.font = "700 32px Arial";
  dibujarTextoAjustadoDesafio(contexto, evaluacion.resumen, ancho / 2, 480, 850, 42, 2);

  contexto.fillStyle = "#a9bad0";
  contexto.font = "25px Arial";
  contexto.fillText(esPrueba ? "No consume intentos" : `Intento ${intento || "—"} de ${INTENTOS_DIARIOS_DESAFIO}`, ancho / 2, 565);

  const inicioY = 635;
  const altoFila = 80;

  resultados.forEach((resultado, indice) => {
    const y = inicioY + indice * altoFila;
    contexto.fillStyle = indice % 2 === 0 ? "#142d4c" : "#102641";
    contexto.fillRect(92, y - 48, 896, 64);

    // No dibujamos las imágenes locales de las banderas en el canvas.
    // En páginas abiertas mediante file://, Chrome puede considerar el canvas
    // contaminado y bloquear canvas.toBlob(). El código del país mantiene una
    // identificación clara y permite compartir la imagen de forma fiable.
    contexto.fillStyle = "#294766";
    contexto.fillRect(112, y - 40, 76, 48);
    contexto.fillStyle = "#ffffff";
    contexto.font = "700 20px Arial";
    contexto.textAlign = "center";
    contexto.fillText(resultado.pais.codigo || "?", 150, y - 9);

    contexto.textAlign = "left";
    contexto.fillStyle = "#ffffff";
    contexto.font = "700 25px Arial";
    contexto.fillText(resultado.pais.nombre, 210, y - 14);
    contexto.fillStyle = "#a9bad0";
    contexto.font = "22px Arial";
    contexto.fillText(resultado.deporte.nombre, 505, y - 14);
    contexto.textAlign = "right";
    contexto.fillStyle = "#ffffff";
    contexto.font = "700 22px Arial";
    contexto.fillText(`🥇${resultado.oros}  🥈${resultado.platas}  🥉${resultado.bronces}`, 958, y - 14);
  });

  contexto.textAlign = "center";
  contexto.fillStyle = "#f7c948";
  contexto.font = "700 28px Arial";
  contexto.fillText("@SportsOnData", ancho / 2, 1250);
  contexto.fillStyle = "#a9bad0";
  contexto.font = "22px Arial";
  contexto.fillText(URL_COMPARTIR_ROAD_TO_GOLD, ancho / 2, 1292);

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("No se pudo crear la imagen.")), "image/png");
  });
}

function descargarImagenDesafio(blob) {
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = `road-to-gold-desafio-${obtenerClaveFechaLocal()}.png`;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  setTimeout(() => URL.revokeObjectURL(enlace.href), 1000);
}

function obtenerTextoCompartirDesafio() {
  const datos = ultimoResultadoCompartibleDesafio;
  const etiqueta = ETIQUETAS_NIVEL_DESAFIO[datos.evaluacion.nivel] || "Sin medalla";
  return [
    `Road to Gold · ${datos.desafio?.nombre || "Desafío diario"}`,
    `${etiqueta}: ${datos.evaluacion.resumen}`,
    datos.esPrueba ? "Partida de prueba" : `Intento ${datos.intento} de ${INTENTOS_DIARIOS_DESAFIO}`,
    "¿Puedes superarlo?",
    "@SportsOnData",
    URL_COMPARTIR_ROAD_TO_GOLD
  ].join("\n");
}

async function compartirResultadoDesafioDiario() {
  if (modoJuegoActual !== MODO_DESAFIO_DIARIO || !ultimoResultadoCompartibleDesafio) return;

  botonCompartirResultado.disabled = true;
  mensajeCompartirResultado.textContent = "Preparando imagen...";
  mensajeCompartirResultado.classList.remove("oculto");

  try {
    const blob = await generarImagenResultadoDesafio();
    const texto = obtenerTextoCompartirDesafio();
    const archivo = typeof File === "function"
      ? new File([blob], "road-to-gold-desafio.png", { type: "image/png" })
      : null;

    if (archivo && navigator.share && navigator.canShare?.({ files: [archivo] })) {
      await navigator.share({
        title: `Road to Gold · ${ultimoResultadoCompartibleDesafio.desafio?.nombre || "Desafío diario"}`,
        text: texto,
        files: [archivo]
      });
      mensajeCompartirResultado.textContent = "Resultado compartido.";
    } else if (navigator.share) {
      await navigator.share({
        title: "Road to Gold · Desafío diario",
        text: texto
      });
      descargarImagenDesafio(blob);
      mensajeCompartirResultado.textContent = "Texto compartido e imagen guardada.";
    } else {
      descargarImagenDesafio(blob);
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(texto);
        mensajeCompartirResultado.textContent = "Imagen guardada y texto copiado.";
      } else {
        mensajeCompartirResultado.textContent = "Imagen guardada. Copia el resultado desde la pantalla.";
      }
    }
  } catch (error) {
    if (error?.name === "AbortError") {
      mensajeCompartirResultado.textContent = "Compartición cancelada.";
    } else {
      console.error("Error al compartir el desafío:", error);
      mensajeCompartirResultado.textContent = "No se pudo compartir el resultado.";
    }
  } finally {
    botonCompartirResultado.disabled = false;
    setTimeout(() => mensajeCompartirResultado.classList.add("oculto"), 3200);
  }
}

function continuarDesdeResultadoDesafio() {
  if (desafioForzadoParaPruebas) {
    configuracionDesafioEnCurso = null;
    iniciarDesafioDiarioJugable();
    return;
  }

  if (ultimoCicloResultadoDesafio?.intentosRestantes > 0) {
    configuracionDesafioEnCurso = null;
    iniciarDesafioDiarioJugable();
    return;
  }

  volverAlDesafioDesdeResultados();
}

function volverAlDesafioDesdeResultados() {
  configuracionDesafioEnCurso = null;
  abrirDesafioDiario();
}
