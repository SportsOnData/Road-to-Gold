/*
  ROAD TO GOLD · BASE

  Constantes, estado compartido y referencias del HTML.
  Se carga antes que el resto de archivos de la carpeta js.
*/

/*
  Cambia esta constante antes de sincronizar con GitHub:

  true  -> el botón Modo Carrera se muestra.
  false -> el botón Modo Carrera queda oculto.

  Todo el código de Carrera permanece en los archivos,
  pero el público no podrá entrar desde la pantalla inicial.
*/
const MOSTRAR_MODO_CARRERA = true;

const CLAVE_CARRERA =
  "roadToGold_estadoCarrera";

const EXP_ORO = 10;
const EXP_PLATA = 6;
const EXP_BRONCE = 4;

const EXP_PRIMERA_MEDALLA_PAIS = 30;
const EXP_PRIMER_ORO_PAIS = 50;
const EXP_PRIMER_ORO_DEPORTE = 60;

const EXP_CEREMONIA_INAUGURACION = 100;

const EXP_RECORD_GLOBAL = 300;
const EXP_RECORD_DEPORTE = 75;

const EXPERIENCIA_POR_NIVEL = {
  1: 500,
  2: 750,
  3: 1000,
  4: 1250,
  5: 1900,
  6: 2300,
  7: 2700
};
const ESTADO_INICIAL_CARRERA = {
  version: 1,

  nombreDelegacion: "",
  personalizacionDelegacionDesbloqueada: false,

  potenciaElegida: "",
  deporteColectivoElegido: "",
  paisAleatorioNivel6: "",
  paisElegidoNivel6: "",
  nivel6Completado: false,
  paisTrampaNivel7: "",
  nivel7Completado: false,
  ochoParticipantesDesbloqueados: false,
  faseBetaSuperada: false,
  tutorialInicialVisto: false,
  recompensasPendientes: [],
  nivel: 1,
  experiencia: 0,
  juegosDisputados: 0,

  paisesDesbloqueados: [
    "ESP",
    "ITA",
    "GER",
    "BRA",
    "AUS",
    "AUT",
    "JAM",
    "KOR",
    "ARG",
    "BUL"
  ],

  deportesDesbloqueados: [
    "atletismo",
    "natacion",
    "gimnasia",
    "baloncesto",
    "judo",
    "piraguismo",
    "escalada"
  ],

  rerollDesbloqueado: false,
  recordsConExperienciaDesbloqueados: false,
  logrosDesbloqueados: false,
  detalleLogros: {},
  progresoLogros: {},

  estadisticasLogros: {
    orosDesdeDesbloqueo: 0,
    medallasPorDeporte: {},
    medallasPorPais: {},
    medallasPaisesRojos: 0,
    medallasDeportesEquipo: 0,
    rerollsUsados: 0,
    recordsGlobalesOrosBatidos: 0,
    recordsGlobalesMedallasBatidos: 0,
    rachaBaloncestoOro: 0,
    mejorRachaBaloncestoOro: 0,
    maxDefensasRecordDeportivo: 0,
    maxAntiguedadRecordSuperado: 0
  },

  historialEdiciones: [],

  medalleroTotal: {
    oros: 0,
    platas: 0,
    bronces: 0
  },

    progresoPaises: {},

  progresoDeportes: {},

  logrosConseguidos: [],

  mejorEdicion: {
    oros: 0,
    medallas: 0
  },

  recordsGlobales: {
    medallas: null,
    oros: null
  }
};

let estadoCarrera = null;

const MODO_PARTIDA_RAPIDA = "rapida";
const MODO_CARRERA = "carrera";

let modoJuegoActual =
  MODO_PARTIDA_RAPIDA;

const pantallaInicio = document.querySelector("#pantallaInicio");
const pantallaCarrera = document.querySelector("#pantallaCarrera");
const pantallaDeportes = document.querySelector("#pantallaDeportes");
const pantallaJuego = document.querySelector("#pantallaJuego");
const pantallaFinal = document.querySelector("#pantallaFinal");
const pantallaResultados = document.querySelector("#pantallaResultados");
const pantallaCeremonia = document.querySelector(
  "#pantallaCeremonia"
);
const pantallaRecord = document.querySelector(
  "#pantallaRecord"
);

const pantallaLogros = document.querySelector(
  "#pantallaLogros"
);

const pantallaBetaSuperada =
  document.querySelector(
    "#pantallaBetaSuperada"
  );

const pantallaEstadisticas =
  document.querySelector(
    "#pantallaEstadisticas"
  );

const pantallaCatalogoPaises = document.querySelector("#pantallaCatalogoPaises");
const pantallaCatalogoDeportes = document.querySelector("#pantallaCatalogoDeportes");

const pantallaTutorialInicial =
  document.querySelector(
    "#pantallaTutorialInicial"
  );
const botonEmpezar = document.querySelector("#botonEmpezar");
const botonModoCarrera = document.querySelector("#botonModoCarrera");
const botonVolverInicioCarrera = document.querySelector(
  "#botonVolverInicioCarrera"
);
const botonBorrarCarrera = document.querySelector(
  "#botonBorrarCarrera"
);

const botonJugarCarrera = document.querySelector(
  "#botonJugarCarrera"
);

const botonAbrirLogros = document.querySelector(
  "#botonAbrirLogros"
);


const pasoTutorialBienvenida =
  document.querySelector("#pasoTutorialBienvenida");
const pasoTutorialPaises =
  document.querySelector("#pasoTutorialPaises");
const pasoTutorialDeportes =
  document.querySelector("#pasoTutorialDeportes");
const listaPaisesTutorial =
  document.querySelector("#listaPaisesTutorial");
const listaDeportesTutorial =
  document.querySelector("#listaDeportesTutorial");
const botonTutorialVerPaises =
  document.querySelector("#botonTutorialVerPaises");
const botonTutorialVerDeportes =
  document.querySelector("#botonTutorialVerDeportes");
const botonTutorialComenzar =
  document.querySelector("#botonTutorialComenzar");

const botonAbrirPaisesCarrera =
  document.querySelector(
    "#botonAbrirPaisesCarrera"
  );

const botonAbrirDeportesCarrera =
  document.querySelector(
    "#botonAbrirDeportesCarrera"
  );

const botonAbrirEstadisticas =
  document.querySelector(
    "#botonAbrirEstadisticas"
  );

const estadoMenuEstadisticas =
  document.querySelector(
    "#estadoMenuEstadisticas"
  );

const botonVolverEstadisticas =
  document.querySelector(
    "#botonVolverEstadisticas"
  );

const botonVolverCatalogoPaises = document.querySelector("#botonVolverCatalogoPaises");
const botonVolverCatalogoDeportes = document.querySelector("#botonVolverCatalogoDeportes");
const contenidoCatalogoPaises = document.querySelector("#contenidoCatalogoPaises");
const contenidoCatalogoDeportes = document.querySelector("#contenidoCatalogoDeportes");

const filtrosEstadisticas =
  document.querySelector(
    "#filtrosEstadisticas"
  );

const contenidoEstadisticas =
  document.querySelector(
    "#contenidoEstadisticas"
  );


const estadoMenuLogros = document.querySelector(
  "#estadoMenuLogros"
);


const ultimosLogrosCarrera =
  document.querySelector(
    "#ultimosLogrosCarrera"
  );

const listaUltimosLogrosCarrera =
  document.querySelector(
    "#listaUltimosLogrosCarrera"
  );

const botonVerTodosLogros =
  document.querySelector(
    "#botonVerTodosLogros"
  );

const botonVolverLogros = document.querySelector(
  "#botonVolverLogros"
);

const cantidadLogrosConseguidos =
  document.querySelector(
    "#cantidadLogrosConseguidos"
  );

const cantidadLogrosDisponibles =
  document.querySelector(
    "#cantidadLogrosDisponibles"
  );

const porcentajeLogros = document.querySelector(
  "#porcentajeLogros"
);

const experienciaTotalLogros =
  document.querySelector(
    "#experienciaTotalLogros"
  );

const filtrosLogros = document.querySelector(
  "#filtrosLogros"
);

const listaLogros = document.querySelector(
  "#listaLogros"
);

const resumenLogrosConseguidos =
  document.querySelector(
    "#resumenLogrosConseguidos"
  );

const botonDesplegarLogrosConseguidos =
  document.querySelector(
    "#botonDesplegarLogrosConseguidos"
  );

const listaLogrosConseguidos =
  document.querySelector(
    "#listaLogrosConseguidos"
  );


const nombreDelegacionCarrera = document.querySelector(
  "#nombreDelegacionCarrera"
);

const nivelCarrera = document.querySelector(
  "#nivelCarrera"
);

const experienciaCarrera = document.querySelector(
  "#experienciaCarrera"
);

const juegosDisputadosCarrera = document.querySelector(
  "#juegosDisputadosCarrera"
);

const cantidadPaisesCarrera = document.querySelector(
  "#cantidadPaisesCarrera"
);

const cantidadDeportesCarrera = document.querySelector(
  "#cantidadDeportesCarrera"
);

const cantidadPaisesMenuCarrera = document.querySelector(
  "#cantidadPaisesMenuCarrera"
);

const cantidadDeportesMenuCarrera = document.querySelector(
  "#cantidadDeportesMenuCarrera"
);

const progresoExperienciaCarrera = document.querySelector(
  "#progresoExperienciaCarrera"
);
const resumenProgresoCarrera = document.querySelector(
  "#resumenProgresoCarrera"
);

const nivelResultadoCarrera = document.querySelector(
  "#nivelResultadoCarrera"
);

const experienciaGanadaCarrera = document.querySelector(
  "#experienciaGanadaCarrera"
);
const textoNombreDelegacionCarrera =
  document.querySelector(
    "#textoNombreDelegacionCarrera"
  );

const botonEditarNombreDelegacion =
  document.querySelector(
    "#botonEditarNombreDelegacion"
  );

const modalNombreDelegacion =
  document.querySelector(
    "#modalNombreDelegacion"
  );

const inputNombreDelegacion =
  document.querySelector(
    "#inputNombreDelegacion"
  );

const mensajeNombreDelegacion =
  document.querySelector(
    "#mensajeNombreDelegacion"
  );

const botonGuardarNombreDelegacion =
  document.querySelector(
    "#botonGuardarNombreDelegacion"
  );

const botonPosponerNombreDelegacion =
  document.querySelector(
    "#botonPosponerNombreDelegacion"
  );

const modalElegirPotencia =
  document.querySelector(
    "#modalElegirPotencia"
  );

const botonElegirEstadosUnidos =
  document.querySelector(
    "#botonElegirEstadosUnidos"
  );

const botonElegirChina =
  document.querySelector(
    "#botonElegirChina"
  );

const banderaEstadosUnidosPotencia =
  document.querySelector(
    "#banderaEstadosUnidosPotencia"
  );

const banderaAlternativaEstadosUnidos =
  document.querySelector(
    "#banderaAlternativaEstadosUnidos"
  );

const banderaChinaPotencia =
  document.querySelector(
    "#banderaChinaPotencia"
  );

const banderaAlternativaChina =
  document.querySelector(
    "#banderaAlternativaChina"
  );

const modalRecompensaNivel4 =
  document.querySelector(
    "#modalRecompensaNivel4"
  );

const botonContinuarNivel4 =
  document.querySelector(
    "#botonContinuarNivel4"
  );

const modalElegirDeporteColectivo =
  document.querySelector(
    "#modalElegirDeporteColectivo"
  );

const botonesDeporteColectivo =
  document.querySelectorAll(
    "[data-deporte-colectivo]"
  );


const modalRecompensaNivel7 =
  document.querySelector(
    "#modalRecompensaNivel7"
  );

const faseSorteoNivel7 =
  document.querySelector(
    "#faseSorteoNivel7"
  );

const faseResumenNivel7 =
  document.querySelector(
    "#faseResumenNivel7"
  );

const banderaSorteoNivel7 =
  document.querySelector(
    "#banderaSorteoNivel7"
  );

const banderaAlternativaSorteoNivel7 =
  document.querySelector(
    "#banderaAlternativaSorteoNivel7"
  );

const nombrePaisSorteoNivel7 =
  document.querySelector(
    "#nombrePaisSorteoNivel7"
  );

const textoEstadoSorteoNivel7 =
  document.querySelector(
    "#textoEstadoSorteoNivel7"
  );

const botonIniciarSorteoNivel7 =
  document.querySelector(
    "#botonIniciarSorteoNivel7"
  );

const nombrePaisResumenNivel7 =
  document.querySelector(
    "#nombrePaisResumenNivel7"
  );

const botonCompletarNivel7 =
  document.querySelector(
    "#botonCompletarNivel7"
  );

const mensajeDatosNivel7 =
  document.querySelector(
    "#mensajeDatosNivel7"
  );

const betaNombreDelegacion =
  document.querySelector(
    "#betaNombreDelegacion"
  );

const betaJuegosDisputados =
  document.querySelector(
    "#betaJuegosDisputados"
  );

const betaLogrosConseguidos =
  document.querySelector(
    "#betaLogrosConseguidos"
  );

const betaMedallasTotales =
  document.querySelector(
    "#betaMedallasTotales"
  );

const betaOrosTotales =
  document.querySelector(
    "#betaOrosTotales"
  );

const botonSeguirCarreraTrasBeta =
  document.querySelector(
    "#botonSeguirCarreraTrasBeta"
  );

const botonNuevaCarreraTrasBeta =
  document.querySelector(
    "#botonNuevaCarreraTrasBeta"
  );

const botonCompartirCarrera =
  document.querySelector(
    "#botonCompartirCarrera"
  );

const banderaCanadaNivel4 =
  document.querySelector(
    "#banderaCanadaNivel4"
  );

const banderaAlternativaCanadaNivel4 =
  document.querySelector(
    "#banderaAlternativaCanadaNivel4"
  );

const detalleExperienciaCarrera =
  document.querySelector(
    "#detalleExperienciaCarrera"
  );

const modalRecompensaNivel6 =
  document.querySelector(
    "#modalRecompensaNivel6"
  );

const faseSorteoNivel6 =
  document.querySelector(
    "#faseSorteoNivel6"
  );

const faseEleccionNivel6 =
  document.querySelector(
    "#faseEleccionNivel6"
  );

const faseResumenNivel6 =
  document.querySelector(
    "#faseResumenNivel6"
  );

const banderaSorteoNivel6 =
  document.querySelector(
    "#banderaSorteoNivel6"
  );

const banderaAlternativaSorteoNivel6 =
  document.querySelector(
    "#banderaAlternativaSorteoNivel6"
  );

const nombrePaisSorteoNivel6 =
  document.querySelector(
    "#nombrePaisSorteoNivel6"
  );

const textoEstadoSorteoNivel6 =
  document.querySelector(
    "#textoEstadoSorteoNivel6"
  );

const botonIniciarSorteoNivel6 =
  document.querySelector(
    "#botonIniciarSorteoNivel6"
  );

const botonesPaisEleccionNivel6 =
  document.querySelectorAll(
    "[data-pais-nivel6]"
  );

const nombrePaisAleatorioResumenNivel6 =
  document.querySelector(
    "#nombrePaisAleatorioResumenNivel6"
  );

const nombrePaisElegidoResumenNivel6 =
  document.querySelector(
    "#nombrePaisElegidoResumenNivel6"
  );

const banderaSudafricaNivel6 =
  document.querySelector(
    "#banderaSudafricaNivel6"
  );

const banderaAlternativaSudafricaNivel6 =
  document.querySelector(
    "#banderaAlternativaSudafricaNivel6"
  );

const banderaRumaniaNivel6 =
  document.querySelector(
    "#banderaRumaniaNivel6"
  );

const banderaAlternativaRumaniaNivel6 =
  document.querySelector(
    "#banderaAlternativaRumaniaNivel6"
  );

const botonCompletarNivel6 =
  document.querySelector(
    "#botonCompletarNivel6"
  );

const mensajeDatosNivel6 =
  document.querySelector(
    "#mensajeDatosNivel6"
  );

const desgloseExperienciaCarrera = document.querySelector(
  "#desgloseExperienciaCarrera"
);

const mensajeSubidaNivelCarrera = document.querySelector(
  "#mensajeSubidaNivelCarrera"
);

const resumenRecordsCarrera = document.querySelector(
  "#resumenRecordsCarrera"
);

const listaRecordsCarrera = document.querySelector(
  "#listaRecordsCarrera"
);

const botonDesplegarRecordsCarrera =
  document.querySelector(
    "#botonDesplegarRecordsCarrera"
  );

const informacionDelegacionDraft =
  document.querySelector(
    "#informacionDelegacionDraft"
  );

const nombreDelegacionDraft =
  document.querySelector(
    "#nombreDelegacionDraft"
  );

const datosDelegacionDraft =
  document.querySelector(
    "#datosDelegacionDraft"
  );

const tituloResultadosJuegos =
  document.querySelector(
    "#tituloResultadosJuegos"
  );

const nombreDelegacionResultados =
  document.querySelector(
    "#nombreDelegacionResultados"
  );
const botonLimpiarRecords = document.querySelector(
  "#botonLimpiarRecords"
);
const botonReroll = document.querySelector("#botonReroll");

const botonVolverInicioDraft =
  document.querySelector(
    "#botonVolverInicioDraft"
  );
const botonDraftAleatorio = document.querySelector(
  "#botonDraftAleatorio"
);
const botonNuevaPartida = document.querySelector("#botonNuevaPartida");

const botonCompartirResultado =
  document.querySelector(
    "#botonCompartirResultado"
  );

const botonVolverInicioResultados =
  document.querySelector(
    "#botonVolverInicioResultados"
  );

const mensajeCompartirResultado =
  document.querySelector(
    "#mensajeCompartirResultado"
  );

const canvasCompartirResultado =
  document.querySelector(
    "#canvasCompartirResultado"
  );
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
const indicadorModoDeportes = document.querySelector(
  "#indicadorModoDeportes"
);

const indicadorModoDraft = document.querySelector(
  "#indicadorModoDraft"
);

const indicadorModoCeremonia = document.querySelector(
  "#indicadorModoCeremonia"
);

const indicadorModoResultados = document.querySelector(
  "#indicadorModoResultados"
);
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

const tituloPresentacionDeportes = document.querySelector(
  "#tituloPresentacionDeportes"
);
const resultadosPorDeporte = document.querySelector(
  "#resultadosPorDeporte"
);

const zonaRecords = document.querySelector(
  ".zona-records"
);

const totalOros = document.querySelector("#totalOros");
const totalPlatas = document.querySelector("#totalPlatas");
const totalBronces = document.querySelector("#totalBronces");
const totalMedallas = document.querySelector("#totalMedallas");
const mensajeNuevoRecord = document.querySelector(
  "#mensajeNuevoRecord"
);

const tituloNuevoRecord = document.querySelector(
  "#tituloNuevoRecord"
);

const detalleNuevoRecord = document.querySelector(
  "#detalleNuevoRecord"
);
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
let rerollUsadoEnEdicion = false;
let esperandoPaisReroll = false;
let codigoPaisRerollEnEdicion = "";
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
const TIEMPO_LECTURA_CEREMONIA = 5500;

const CLAVE_RECORD_OROS =
  "roadToGold_recordOros_clasico";

const CLAVE_RECORD_MEDALLAS =
  "roadToGold_recordMedallas_clasico";


const botonVolverResultados = document.querySelector(
  "#botonVolverResultados"
);

const recordOros = document.querySelector(
  "#recordOros"
);

const recordMedallas = document.querySelector(
  "#recordMedallas"
);

const valorRecordOros = document.querySelector(
  "#valorRecordOros"
);

const fechaRecordOros = document.querySelector(
  "#fechaRecordOros"
);

const valorRecordMedallas = document.querySelector(
  "#valorRecordMedallas"
);

const fechaRecordMedallas = document.querySelector(
  "#fechaRecordMedallas"
);

const tituloPantallaRecord = document.querySelector(
  "#tituloPantallaRecord"
);

const fechaPantallaRecord = document.querySelector(
  "#fechaPantallaRecord"
);

const recordDetalleOros = document.querySelector(
  "#recordDetalleOros"
);

const recordDetallePlatas = document.querySelector(
  "#recordDetallePlatas"
);

const recordDetalleBronces = document.querySelector(
  "#recordDetalleBronces"
);

const recordDetalleTotal = document.querySelector(
  "#recordDetalleTotal"
);

const resultadosRecordPorDeporte = document.querySelector(
  "#resultadosRecordPorDeporte"
);
