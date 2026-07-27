/*
  ROAD TO GOLD · CATÁLOGO DE LOGROS

  Este archivo contiene únicamente la definición de los logros.
  La comprobación y el guardado se conectarán después desde carrera.js.

  REGLA GENERAL:
  - activo: true  -> puede entrar en el primer sistema de logros.
  - activo: true -> idea guardada para una fase posterior porque necesita
                     estadísticas o seguimiento adicional.
*/

const CATEGORIAS_LOGROS = {
  EDICION: "edicion",
  HAZANA: "hazana",
  DRAFT: "draft",
  REROLL: "reroll",
  ACUMULATIVO: "acumulativo",
  RECORDS: "records"
};

const LOGROS = [

  /* ===================================================== */
  /* RESULTADOS DE UNA EDICIÓN                              */
  /* ===================================================== */

  {
    id: "oros_15",
    nombre: "Quince razones para celebrar",
    descripcion:
      "Consigue al menos 15 oros en una edición.",
    categoria: CATEGORIAS_LOGROS.EDICION,
    tipo: "oros_minimos_edicion",
    objetivo: 15,
    experiencia: 150,
    activo: true
  },

  {
    id: "oros_20",
    nombre: "Fiebre del oro",
    descripcion:
      "Consigue al menos 20 oros en una edición.",
    categoria: CATEGORIAS_LOGROS.EDICION,
    tipo: "oros_minimos_edicion",
    objetivo: 20,
    experiencia: 300,
    activo: true
  },

  {
    id: "oros_25",
    nombre: "Imperio dorado",
    descripcion:
      "Consigue al menos 25 oros en una edición.",
    categoria: CATEGORIAS_LOGROS.EDICION,
    tipo: "oros_minimos_edicion",
    objetivo: 25,
    experiencia: 600,
    activo: true
  },

  {
    id: "medallas_40",
    nombre: "Potencia olímpica",
    descripcion:
      "Consigue al menos 40 medallas en una edición.",
    categoria: CATEGORIAS_LOGROS.EDICION,
    tipo: "medallas_minimas_edicion",
    objetivo: 40,
    experiencia: 150,
    activo: true
  },

  {
    id: "medallas_50",
    nombre: "Superpotencia olímpica",
    descripcion:
      "Consigue al menos 50 medallas en una edición.",
    categoria: CATEGORIAS_LOGROS.EDICION,
    tipo: "medallas_minimas_edicion",
    objetivo: 50,
    experiencia: 350,
    activo: true
  },

  {
    id: "medallas_todos_paises",
    nombre: "Nadie vuelve de vacío",
    descripcion:
      "Consigue al menos una medalla con todos los países de la edición.",
    categoria: CATEGORIAS_LOGROS.EDICION,
    tipo: "todos_paises_medalla",
    experiencia: 300,
    activo: true
  },

  {
    id: "oro_todos_paises",
    nombre: "Delegación perfecta",
    descripcion:
      "Consigue al menos un oro con todos los países de la edición.",
    categoria: CATEGORIAS_LOGROS.EDICION,
    tipo: "todos_paises_oro",
    experiencia: 1000,
    activo: true
  },

  {
    id: "tres_extraordinarias",
    nombre: "Más allá de lo esperado",
    descripcion:
      "Consigue al menos 3 actuaciones extraordinarias en una edición.",
    categoria: CATEGORIAS_LOGROS.HAZANA,
    tipo: "fortuna_minima",
    clasificacion: "extraordinaria",
    objetivo: 3,
    experiencia: 400,
    activo: true
  },

  {
    id: "tres_decepcionantes",
    nombre: "Unos Juegos para olvidar",
    descripcion:
      "Ten al menos 3 actuaciones decepcionantes en una edición.",
    categoria: CATEGORIAS_LOGROS.HAZANA,
    tipo: "fortuna_minima",
    clasificacion: "decepcionante",
    objetivo: 3,
    experiencia: 100,
    activo: true
  },

  {
    id: "tres_muy_decepcionantes",
    nombre: "Desastre olímpico",
    descripcion:
      "Ten al menos 3 actuaciones muy decepcionantes en una edición.",
    categoria: CATEGORIAS_LOGROS.HAZANA,
    tipo: "fortuna_minima",
    clasificacion: "muy_decepcionante",
    objetivo: 3,
    experiencia: 200,
    activo: true
  },

  {
    id: "pais_azul_sin_medalla",
    nombre: "La gran decepción",
    descripcion:
      "Termina sin medalla con un país asignado en azul.",
    categoria: CATEGORIAS_LOGROS.HAZANA,
    tipo: "color_sin_medalla",
    color: "azul",
    experiencia: 125,
    activo: true
  },

  {
    id: "medallas_exactamente_22",
    nombre: "Barcelona 92",
    descripcion:
      "Termina una edición con exactamente 22 medallas.",
    categoria: CATEGORIAS_LOGROS.EDICION,
    tipo: "medallas_exactas_edicion",
    objetivo: 22,
    experiencia: 250,
    activo: true
  },

  {
    id: "ocho_oros_natacion",
    nombre: "Michael Phelps",
    descripcion:
      "Consigue exactamente 8 oros en Natación en una edición.",
    categoria: CATEGORIAS_LOGROS.HAZANA,
    tipo: "oros_exactos_deporte_edicion",
    deporte: "natacion",
    objetivo: 8,
    experiencia: 750,
    activo: true
  },

  {
    id: "cero_medallas",
    nombre: "Cero absoluto",
    descripcion:
      "Termina una edición sin conseguir ninguna medalla.",
    categoria: CATEGORIAS_LOGROS.EDICION,
    tipo: "medallas_maximas_edicion",
    objetivo: 0,
    experiencia: 300,
    activo: true
  },

  {
    id: "cuatro_medallas_o_menos",
    nombre: "Juegos de mínimos",
    descripcion:
      "Termina una edición con 4 medallas o menos.",
    categoria: CATEGORIAS_LOGROS.EDICION,
    tipo: "medallas_maximas_edicion",
    objetivo: 4,
    experiencia: 150,
    activo: true
  },

  {
    id: "equilibrio_perfecto",
    nombre: "Equilibrio perfecto",
    descripcion:
      "Termina una edición con el mismo número de oros, platas y bronces.",
    categoria: CATEGORIAS_LOGROS.EDICION,
    tipo: "medallero_equilibrado",
    experiencia: 300,
    activo: true
  },

  {
    id: "alergico_al_oro",
    nombre: "Alérgico al oro",
    descripcion:
      "Consigue al menos 10 medallas sin ganar ningún oro.",
    categoria: CATEGORIAS_LOGROS.EDICION,
    tipo: "medallas_sin_oros",
    objetivo: 10,
    experiencia: 250,
    activo: true
  },


  /* ===================================================== */
  /* RIESGO, COLORES Y SORPRESAS                            */
  /* ===================================================== */

  {
    id: "medalla_pais_rojo",
    nombre: "La sorpresa del día",
    descripcion:
      "Consigue una medalla con un país asignado en rojo.",
    categoria: CATEGORIAS_LOGROS.HAZANA,
    tipo: "color_con_medalla",
    color: "rojo",
    medallaMinima: 1,
    experiencia: 125,
    activo: true
  },

  {
    id: "oro_pais_rojo",
    nombre: "Contra todo pronóstico",
    descripcion:
      "Consigue un oro con un país asignado en rojo.",
    categoria: CATEGORIAS_LOGROS.HAZANA,
    tipo: "color_con_oro",
    color: "rojo",
    experiencia: 300,
    activo: true
  },

  {
    id: "todo_verde_azul",
    nombre: "Plan perfecto",
    descripcion:
      "Completa el draft con todas las asignaciones en verde o azul.",
    categoria: CATEGORIAS_LOGROS.DRAFT,
    tipo: "todos_colores_permitidos",
    colores: [
      "verde",
      "azul"
    ],
    experiencia: 250,
    activo: true
  },

  {
    id: "tres_azules",
    nombre: "Delegación de élite",
    descripcion:
      "Completa el draft con al menos 3 asignaciones azules.",
    categoria: CATEGORIAS_LOGROS.DRAFT,
    tipo: "cantidad_color_draft",
    color: "azul",
    objetivo: 3,
    experiencia: 150,
    activo: true
  },

  {
    id: "todo_rojo",
    nombre: "Misión imposible",
    descripcion:
      "Completa el draft con todas las asignaciones en rojo.",
    categoria: CATEGORIAS_LOGROS.DRAFT,
    tipo: "todos_color_draft",
    color: "rojo",
    experiencia: 600,
    activo: true
  },

  {
    id: "cuatro_rojos",
    nombre: "Contra las cuerdas",
    descripcion:
      "Completa el draft con al menos 4 asignaciones rojas.",
    categoria: CATEGORIAS_LOGROS.DRAFT,
    tipo: "cantidad_color_draft",
    color: "rojo",
    objetivo: 4,
    experiencia: 200,
    activo: true
  },

  {
    id: "tres_rojos_diez_medallas",
    nombre: "Héroes inesperados",
    descripcion:
      "Consigue al menos 10 medallas tras completar el draft con 3 o más asignaciones rojas.",
    categoria: CATEGORIAS_LOGROS.HAZANA,
    tipo: "cantidad_color_y_medallas",
    color: "rojo",
    cantidadColor: 3,
    medallasMinimas: 10,
    experiencia: 500,
    activo: true
  },


  /* ===================================================== */
  /* REROLL                                                 */
  /* ===================================================== */

  {
    id: "sin_usar_reroll",
    nombre: "Con lo que hay",
    descripcion:
      "Completa una edición sin utilizar el reroll.",
    categoria: CATEGORIAS_LOGROS.REROLL,
    tipo: "reroll_no_usado",
    experiencia: 75,
    activo: true
  },

  {
    id: "sin_reroll_medalla_todos",
    nombre: "Confianza absoluta",
    descripcion:
      "No uses el reroll y consigue medalla con todos los países de la edición.",
    categoria: CATEGORIAS_LOGROS.REROLL,
    tipo: "sin_reroll_y_todos_medalla",
    experiencia: 450,
    activo: true
  },

  {
    id: "revulsivo",
    nombre: "Revulsivo",
    descripcion:
      "Consigue al menos 10 medallas con el país obtenido mediante reroll.",
    categoria: CATEGORIAS_LOGROS.REROLL,
    tipo: "medallas_pais_reroll",
    objetivo: 10,
    experiencia: 250,
    activo: true
  },

  {
    id: "cambio_maestro",
    nombre: "Cambio maestro",
    descripcion:
      "Haz que el país obtenido mediante reroll consiga el mejor rendimiento normalizado de la delegación.",
    categoria: CATEGORIAS_LOGROS.REROLL,
    tipo: "pais_reroll_mejor_rendimiento",
    experiencia: 400,
    activo: true
  },

  {
    id: "reroll_20_veces",
    nombre: "El inconformista",
    descripcion:
      "Utiliza el reroll en 20 ediciones.",
    categoria: CATEGORIAS_LOGROS.ACUMULATIVO,
    tipo: "rerolls_acumulados",
    objetivo: 20,
    experiencia: 350,
    activo: true
  },


  /* ===================================================== */
  /* RÉCORDS                                                */
  /* ===================================================== */

  {
    id: "tres_records_edicion",
    nombre: "Reescribiendo la historia",
    descripcion:
      "Bate al menos 3 récords en una misma edición.",
    categoria: CATEGORIAS_LOGROS.RECORDS,
    tipo: "records_minimos_edicion",
    objetivo: 3,
    experiencia: 400,
    activo: true
  },

  {
    id: "record_oros_tres_veces",
    nombre: "Cada vez más dorados",
    descripcion:
      "Bate tu récord absoluto de oros en 3 ocasiones.",
    categoria: CATEGORIAS_LOGROS.RECORDS,
    tipo: "records_globales_batidos",
    record: "oros",
    objetivo: 3,
    experiencia: 600,
    activo: true
  },

  {
    id: "record_medallas_tres_veces",
    nombre: "Sin techo",
    descripcion:
      "Bate tu récord absoluto de medallas en 3 ocasiones.",
    categoria: CATEGORIAS_LOGROS.RECORDS,
    tipo: "records_globales_batidos",
    record: "medallas",
    objetivo: 3,
    experiencia: 600,
    activo: true
  },


  /* ===================================================== */
  /* ACUMULATIVOS                                           */
  /* ===================================================== */

  {
    id: "cien_medallas_atletismo",
    nombre: "Reyes del estadio",
    descripcion:
      "Consigue 100 medallas en Atletismo desde que se desbloquean los logros.",
    categoria: CATEGORIAS_LOGROS.ACUMULATIVO,
    tipo: "medallas_acumuladas_deporte",
    deporte: "atletismo",
    objetivo: 100,
    experiencia: 500,
    activo: true
  },

  {
    id: "veinte_medallas_equipo",
    nombre: "La fuerza del conjunto",
    descripcion:
      "Consigue 20 medallas en deportes de equipo desde que se desbloquean los logros.",
    categoria: CATEGORIAS_LOGROS.ACUMULATIVO,
    tipo: "medallas_acumuladas_grupo",
    grupo: "pequeno",
    objetivo: 20,
    experiencia: 400,
    activo: true
  },

  {
    id: "cien_oros",
    nombre: "El siglo de oro",
    descripcion:
      "Consigue 100 oros desde que se desbloquean los logros.",
    categoria: CATEGORIAS_LOGROS.ACUMULATIVO,
    tipo: "oros_acumulados",
    objetivo: 100,
    experiencia: 750,
    activo: true
  },

  {
    id: "cien_medallas_espana",
    nombre: "La Roja olímpica",
    descripcion:
      "Consigue 100 medallas con España desde que se desbloquean los logros.",
    categoria: CATEGORIAS_LOGROS.ACUMULATIVO,
    tipo: "medallas_acumuladas_pais",
    pais: "ESP",
    objetivo: 100,
    experiencia: 600,
    activo: true
  },

  {
    id: "cien_medallas_mismo_pais",
    nombre: "Una generación irrepetible",
    descripcion:
      "Consigue 100 medallas con un mismo país desde que se desbloquean los logros.",
    categoria: CATEGORIAS_LOGROS.ACUMULATIVO,
    tipo: "medallas_acumuladas_cualquier_pais",
    objetivo: 100,
    experiencia: 750,
    activo: true
  },

  {
    id: "diez_medallas_paises_rojos",
    nombre: "Lo imposible",
    descripcion:
      "Consigue 10 medallas con países asignados en rojo desde que se desbloquean los logros.",
    categoria: CATEGORIAS_LOGROS.ACUMULATIVO,
    tipo: "medallas_acumuladas_color",
    color: "rojo",
    objetivo: 10,
    experiencia: 500,
    activo: true
  },

  {
    id: "dream_team",
    nombre: "Dream Team",
    descripcion:
      "Gana un oro en 3 apariciones consecutivas de Baloncesto.",
    categoria: CATEGORIAS_LOGROS.ACUMULATIVO,
    tipo: "racha_deporte_con_oro",
    deporte: "baloncesto",
    objetivo: 3,
    experiencia: 750,
    activo: true
  },


  /* ===================================================== */
  /* DEFENSA Y ANTIGÜEDAD DE RÉCORDS                        */
  /* ===================================================== */

  {
    id: "record_deportivo_5",
    nombre: "Marca resistente",
    descripcion:
      "Conserva un récord deportivo durante 5 apariciones del deporte.",
    categoria: CATEGORIAS_LOGROS.RECORDS,
    tipo: "defensas_record_deportivo",
    objetivo: 5,
    experiencia: 300,
    activo: true
  },

  {
    id: "record_deportivo_10",
    nombre: "Récord histórico",
    descripcion:
      "Conserva un récord deportivo durante 10 apariciones del deporte.",
    categoria: CATEGORIAS_LOGROS.RECORDS,
    tipo: "defensas_record_deportivo",
    objetivo: 10,
    experiencia: 600,
    activo: true
  },

  {
    id: "record_deportivo_20",
    nombre: "Eterno",
    descripcion:
      "Conserva un récord deportivo durante 20 apariciones del deporte.",
    categoria: CATEGORIAS_LOGROS.RECORDS,
    tipo: "defensas_record_deportivo",
    objetivo: 20,
    experiencia: 1200,
    activo: true
  },

  {
    id: "superar_record_10",
    nombre: "Caída de un gigante",
    descripcion:
      "Supera un récord deportivo que llevaba vigente 10 apariciones.",
    categoria: CATEGORIAS_LOGROS.RECORDS,
    tipo: "superar_record_antiguo",
    objetivo: 10,
    experiencia: 500,
    activo: true
  },

  {
    id: "superar_record_20",
    nombre: "El fin de una era",
    descripcion:
      "Supera un récord deportivo que llevaba vigente 20 apariciones.",
    categoria: CATEGORIAS_LOGROS.RECORDS,
    tipo: "superar_record_antiguo",
    objetivo: 20,
    experiencia: 1000,
    activo: true
  }
];

const LOGROS_ACTIVOS = LOGROS.filter(
  (logro) => logro.activo
);

const LOGROS_PENDIENTES = LOGROS.filter(
  (logro) => !logro.activo
);


/* ========================================================= */
/* MOTOR DE COMPROBACIÓN DE LOGROS ACTIVOS                    */
/* ========================================================= */

function obtenerLogroPorId(idLogro) {
  return LOGROS.find(
    (logro) => logro.id === idLogro
  ) || null;
}

function obtenerLogrosActivosPorCategoria(
  categoria = "todos"
) {
  if (categoria === "todos") {
    return LOGROS_ACTIVOS;
  }

  return LOGROS_ACTIVOS.filter(
    (logro) => logro.categoria === categoria
  );
}

function contarResultadosPorFortuna(
  resultados,
  clasificacion
) {
  const clasesPorClasificacion = {
    extraordinaria: [
      "fortuna-muy-positiva"
    ],
    decepcionante: [
      "fortuna-negativa",
      "fortuna-muy-negativa"
    ],
    muy_decepcionante: [
      "fortuna-muy-negativa"
    ]
  };

  const clasesValidas =
    clasesPorClasificacion[
      clasificacion
    ] || [];

  return resultados.filter(
    (resultado) =>
      clasesValidas.includes(
        resultado.fortuna?.clase
      )
  ).length;
}


function esDeporteEquipo(codigoDeporte) {
  return [
    "futbol",
    "baloncesto",
    "waterpolo",
    "balonmano",
    "voleibol"
  ].includes(codigoDeporte);
}

function actualizarEstadisticasAcumulativasLogros(
  contexto
) {
  const estadisticas =
    estadoCarrera.estadisticasLogros;

  estadisticas.orosDesdeDesbloqueo +=
    contexto.oros;

  contexto.resultados.forEach(
    (resultado) => {
      const medallas =
        resultado.oros +
        resultado.platas +
        resultado.bronces;

      const codigoDeporte =
        resultado.deporte.codigo;

      const codigoPais =
        resultado.pais.codigo;

      estadisticas.medallasPorDeporte[
        codigoDeporte
      ] =
        (
          estadisticas.medallasPorDeporte[
            codigoDeporte
          ] || 0
        ) + medallas;

      estadisticas.medallasPorPais[
        codigoPais
      ] =
        (
          estadisticas.medallasPorPais[
            codigoPais
          ] || 0
        ) + medallas;

      if (resultado.color === "rojo") {
        estadisticas.medallasPaisesRojos +=
          medallas;
      }

      if (esDeporteEquipo(codigoDeporte)) {
        estadisticas.medallasDeportesEquipo +=
          medallas;
      }
    }
  );

  if (contexto.rerollUsado) {
    estadisticas.rerollsUsados += 1;
  }

  contexto.recordsBatidos.forEach(
    (record) => {
      if (
        record.tipo ===
        "record_global_oros"
      ) {
        estadisticas
          .recordsGlobalesOrosBatidos += 1;
      }

      if (
        record.tipo ===
        "record_global_medallas"
      ) {
        estadisticas
          .recordsGlobalesMedallasBatidos += 1;
      }

      estadisticas.maxAntiguedadRecordSuperado =
        Math.max(
          estadisticas
            .maxAntiguedadRecordSuperado,
          record.antiguedadSuperada || 0
        );
    }
  );

  const resultadoBaloncesto =
    contexto.resultados.find(
      (resultado) =>
        resultado.deporte.codigo ===
        "baloncesto"
    );

  if (resultadoBaloncesto) {
    if (resultadoBaloncesto.oros > 0) {
      estadisticas.rachaBaloncestoOro += 1;
    } else {
      estadisticas.rachaBaloncestoOro = 0;
    }

    estadisticas.mejorRachaBaloncestoOro =
      Math.max(
        estadisticas.mejorRachaBaloncestoOro,
        estadisticas.rachaBaloncestoOro
      );
  }

  const defensasActuales = [];

  Object.values(
    estadoCarrera.progresoDeportes
  ).forEach((progreso) => {
    if (progreso.recordMedallas) {
      defensasActuales.push(
        progreso.recordMedallas.defensas || 0
      );
    }

    if (progreso.recordOros) {
      defensasActuales.push(
        progreso.recordOros.defensas || 0
      );
    }
  });

  estadisticas.maxDefensasRecordDeportivo =
    Math.max(
      estadisticas.maxDefensasRecordDeportivo,
      ...defensasActuales,
      0
    );
}

function obtenerMejorRendimientoNormalizado(
  resultados
) {
  return Math.max(
    ...resultados.map((resultado) => {
      const medallasDisponibles =
        resultado.deporte.tamanoSimulacion *
        (
          resultado.deporte
            .medallasPorPrueba || 3
        );

      const medallas =
        resultado.oros +
        resultado.platas +
        resultado.bronces;

      return medallasDisponibles > 0
        ? medallas / medallasDisponibles
        : 0;
    }),
    0
  );
}

function comprobarLogroActivo(
  logro,
  contexto
) {
  const {
    resultados,
    oros,
    platas,
    bronces,
    totalMedallas,
    recordsBatidos,
    rerollUsado,
    codigoPaisReroll
  } = contexto;

  const estadisticas =
    estadoCarrera.estadisticasLogros;

  switch (logro.tipo) {
    case "oros_minimos_edicion":
      return oros >= logro.objetivo;

    case "medallas_minimas_edicion":
      return totalMedallas >= logro.objetivo;

    case "medallas_maximas_edicion":
      return totalMedallas <= logro.objetivo;

    case "medallas_exactas_edicion":
      return totalMedallas === logro.objetivo;

    case "todos_paises_medalla":
      return (
        resultados.length > 0 &&
        resultados.every(
          (resultado) =>
            resultado.oros +
            resultado.platas +
            resultado.bronces > 0
        )
      );

    case "todos_paises_oro":
      return (
        resultados.length > 0 &&
        resultados.every(
          (resultado) => resultado.oros > 0
        )
      );

    case "fortuna_minima":
      return (
        contarResultadosPorFortuna(
          resultados,
          logro.clasificacion
        ) >= logro.objetivo
      );

    case "color_sin_medalla":
      return resultados.some(
        (resultado) =>
          resultado.color === logro.color &&
          resultado.oros +
          resultado.platas +
          resultado.bronces === 0
      );

    case "oros_minimos_deporte_edicion":
      return resultados.some(
        (resultado) =>
          resultado.deporte.codigo ===
            logro.deporte &&
          resultado.oros >= logro.objetivo
      );

    case "oros_exactos_deporte_edicion":
      return resultados.some(
        (resultado) =>
          resultado.deporte.codigo ===
            logro.deporte &&
          resultado.oros === logro.objetivo
      );

    case "medallero_equilibrado":
      return (
        totalMedallas > 0 &&
        oros === platas &&
        platas === bronces
      );

    case "medallas_sin_oros":
      return (
        totalMedallas >= logro.objetivo &&
        oros === 0
      );

    case "color_con_medalla":
      return resultados.some(
        (resultado) =>
          resultado.color === logro.color &&
          resultado.oros +
          resultado.platas +
          resultado.bronces >=
            logro.medallaMinima
      );

    case "color_con_oro":
      return resultados.some(
        (resultado) =>
          resultado.color === logro.color &&
          resultado.oros > 0
      );

    case "todos_colores_permitidos":
      return (
        resultados.length > 0 &&
        resultados.every(
          (resultado) =>
            logro.colores.includes(
              resultado.color
            )
        )
      );

    case "cantidad_color_draft":
      return (
        resultados.filter(
          (resultado) =>
            resultado.color === logro.color
        ).length >= logro.objetivo
      );

    case "todos_color_draft":
      return (
        resultados.length > 0 &&
        resultados.every(
          (resultado) =>
            resultado.color === logro.color
        )
      );

    case "cantidad_color_y_medallas":
      return (
        resultados.filter(
          (resultado) =>
            resultado.color === logro.color
        ).length >= logro.cantidadColor &&
        totalMedallas >= logro.medallasMinimas
      );

    case "reroll_no_usado":
      return !rerollUsado;

    case "sin_reroll_y_todos_medalla":
      return (
        !rerollUsado &&
        resultados.length > 0 &&
        resultados.every(
          (resultado) =>
            resultado.oros +
            resultado.platas +
            resultado.bronces > 0
        )
      );

    case "records_minimos_edicion":
      return (
        recordsBatidos.length >=
        logro.objetivo
      );


    case "medallas_pais_reroll": {
      if (!codigoPaisReroll) {
        return false;
      }

      const resultadoReroll =
        resultados.find(
          (resultado) =>
            resultado.pais.codigo ===
            codigoPaisReroll
        );

      if (!resultadoReroll) {
        return false;
      }

      return (
        resultadoReroll.oros +
        resultadoReroll.platas +
        resultadoReroll.bronces >=
        logro.objetivo
      );
    }

    case "pais_reroll_mejor_rendimiento": {
      if (!codigoPaisReroll) {
        return false;
      }

      const resultadoReroll =
        resultados.find(
          (resultado) =>
            resultado.pais.codigo ===
            codigoPaisReroll
        );

      if (!resultadoReroll) {
        return false;
      }

      const disponibles =
        resultadoReroll.deporte
          .tamanoSimulacion *
        (
          resultadoReroll.deporte
            .medallasPorPrueba || 3
        );

      const rendimientoReroll =
        disponibles > 0
          ? (
              resultadoReroll.oros +
              resultadoReroll.platas +
              resultadoReroll.bronces
            ) / disponibles
          : 0;

      return (
        rendimientoReroll >=
        obtenerMejorRendimientoNormalizado(
          resultados
        )
      );
    }

    case "rerolls_acumulados":
      return (
        estadisticas.rerollsUsados >=
        logro.objetivo
      );

    case "records_globales_batidos":
      return (
        logro.record === "oros"
          ? estadisticas
              .recordsGlobalesOrosBatidos
          : estadisticas
              .recordsGlobalesMedallasBatidos
      ) >= logro.objetivo;

    case "medallas_acumuladas_deporte":
      return (
        estadisticas.medallasPorDeporte[
          logro.deporte
        ] || 0
      ) >= logro.objetivo;

    case "medallas_acumuladas_grupo":
      return (
        estadisticas.medallasDeportesEquipo
      ) >= logro.objetivo;

    case "oros_acumulados":
      return (
        estadisticas.orosDesdeDesbloqueo >=
        logro.objetivo
      );

    case "medallas_acumuladas_pais":
      return (
        estadisticas.medallasPorPais[
          logro.pais
        ] || 0
      ) >= logro.objetivo;

    case "medallas_acumuladas_cualquier_pais":
      return Math.max(
        ...Object.values(
          estadisticas.medallasPorPais
        ),
        0
      ) >= logro.objetivo;

    case "medallas_acumuladas_color":
      return (
        estadisticas.medallasPaisesRojos >=
        logro.objetivo
      );

    case "racha_deporte_con_oro":
      return (
        estadisticas.mejorRachaBaloncestoOro >=
        logro.objetivo
      );

    case "defensas_record_deportivo":
      return (
        estadisticas
          .maxDefensasRecordDeportivo >=
        logro.objetivo
      );

    case "superar_record_antiguo":
      return (
        estadisticas
          .maxAntiguedadRecordSuperado >=
        logro.objetivo
      );

    default:
      return false;
  }
}

function comprobarLogrosEdicion(
  contexto
) {
  if (
    !estadoCarrera?.logrosDesbloqueados
  ) {
    return {
      logrosNuevos: [],
      experiencia: 0
    };
  }

  actualizarEstadisticasAcumulativasLogros(
    contexto
  );

  actualizarProgresoParcialLogros(
    contexto
  );

  const logrosNuevos = [];

  LOGROS_ACTIVOS.forEach((logro) => {
    if (
      estadoCarrera.logrosConseguidos.includes(
        logro.id
      )
    ) {
      return;
    }

    if (
      !comprobarLogroActivo(
        logro,
        contexto
      )
    ) {
      return;
    }

    estadoCarrera.logrosConseguidos.push(
      logro.id
    );

    estadoCarrera.progresoLogros[
      logro.id
    ] = {
      actual: logro.objetivo || 1,
      objetivo: logro.objetivo || 1,
      texto: "Completado",
      edicion:
        contexto.numeroEdicion
    };

    estadoCarrera.detalleLogros[
      logro.id
    ] = {
      edicion:
        contexto.numeroEdicion,
      fecha:
        new Date().toISOString()
    };

    logrosNuevos.push(logro);
  });

  return {
    logrosNuevos: logrosNuevos,
    experiencia:
      logrosNuevos.reduce(
        (total, logro) =>
          total + logro.experiencia,
        0
      )
  };
}



/* ========================================================= */
/* PROGRESO PARCIAL DE LOGROS                                 */
/* ========================================================= */

/*
  Devuelve un progreso numérico cuando el logro admite
  una barra clara. Los logros puramente booleanos o cuya
  condición no puede expresarse con una escala útil devuelven null.
*/
function calcularProgresoLogro(
  logro,
  contexto
) {
  const {
    resultados,
    oros,
    totalMedallas,
    recordsBatidos,
    rerollUsado
  } = contexto;

  const contarPaisesConMedalla = () =>
    resultados.filter(
      (resultado) =>
        resultado.oros +
        resultado.platas +
        resultado.bronces > 0
    ).length;

  const contarPaisesConOro = () =>
    resultados.filter(
      (resultado) => resultado.oros > 0
    ).length;

  const contarColor = (color) =>
    resultados.filter(
      (resultado) =>
        resultado.color === color
    ).length;

  switch (logro.tipo) {
    case "oros_minimos_edicion":
      return {
        actual: Math.min(
          oros,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${oros} / ${logro.objetivo} oros`
      };

    case "medallas_minimas_edicion":
      return {
        actual: Math.min(
          totalMedallas,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${totalMedallas} / ` +
          `${logro.objetivo} medallas`
      };

    case "medallas_exactas_edicion": {
      /*
        Para una cifra exacta conservamos el mejor intento
        que no haya rebasado el objetivo. Una edición de 30
        medallas no debe parecer más cercana a exactamente 22
        que una edición de 21.
      */
      const actual =
        totalMedallas <= logro.objetivo
          ? totalMedallas
          : 0;

      return {
        actual: actual,
        objetivo: logro.objetivo,
        texto:
          `${totalMedallas} medallas en ` +
          `esta edición`
      };
    }

    case "todos_paises_medalla":
      return {
        actual:
          contarPaisesConMedalla(),
        objetivo: resultados.length,
        texto:
          `${contarPaisesConMedalla()} / ` +
          `${resultados.length} países`
      };

    case "todos_paises_oro":
      return {
        actual:
          contarPaisesConOro(),
        objetivo: resultados.length,
        texto:
          `${contarPaisesConOro()} / ` +
          `${resultados.length} países`
      };

    case "fortuna_minima": {
      const cantidad =
        contarResultadosPorFortuna(
          resultados,
          logro.clasificacion
        );

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo}`
      };
    }

    case "oros_minimos_deporte_edicion": {
      const resultadoDeporte =
        resultados.find(
          (resultado) =>
            resultado.deporte.codigo ===
            logro.deporte
        );

      const cantidad =
        resultadoDeporte?.oros || 0;

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo} oros`
      };
    }

    case "oros_exactos_deporte_edicion": {
      const resultadoDeporte =
        resultados.find(
          (resultado) =>
            resultado.deporte.codigo ===
            logro.deporte
        );

      const cantidad =
        resultadoDeporte?.oros || 0;

      return {
        actual:
          cantidad <= logro.objetivo
            ? cantidad
            : 0,
        objetivo: logro.objetivo,
        texto:
          `${cantidad} oros en esta edición`
      };
    }

    case "medallas_sin_oros":
      return {
        actual:
          oros === 0
            ? Math.min(
                totalMedallas,
                logro.objetivo
              )
            : 0,
        objetivo: logro.objetivo,
        texto:
          oros === 0
            ? `${totalMedallas} / ` +
              `${logro.objetivo} medallas`
            : `${oros} oros: la racha no cuenta`
      };

    case "cantidad_color_draft": {
      const cantidad =
        contarColor(logro.color);

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo}`
      };
    }

    case "todos_color_draft": {
      const cantidad =
        contarColor(logro.color);

      return {
        actual: cantidad,
        objetivo: resultados.length,
        texto:
          `${cantidad} / ` +
          `${resultados.length} asignaciones`
      };
    }

    case "todos_colores_permitidos": {
      const cantidad =
        resultados.filter(
          (resultado) =>
            logro.colores.includes(
              resultado.color
            )
        ).length;

      return {
        actual: cantidad,
        objetivo: resultados.length,
        texto:
          `${cantidad} / ` +
          `${resultados.length} asignaciones`
      };
    }

    case "cantidad_color_y_medallas": {
      const cantidadColor =
        contarColor(logro.color);

      /*
        La barra principal representa la parte más difícil
        de visualizar: completar las asignaciones rojas.
        El texto conserva también el requisito de medallas.
      */
      return {
        actual: Math.min(
          cantidadColor,
          logro.cantidadColor
        ),
        objetivo: logro.cantidadColor,
        texto:
          `${cantidadColor} rojos · ` +
          `${totalMedallas} / ` +
          `${logro.medallasMinimas} medallas`
      };
    }

    case "records_minimos_edicion":
      return {
        actual: Math.min(
          recordsBatidos.length,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${recordsBatidos.length} / ` +
          `${logro.objetivo} récords`
      };

    case "reroll_no_usado":
      return {
        actual: rerollUsado ? 0 : 1,
        objetivo: 1,
        texto:
          rerollUsado
            ? "Reroll utilizado"
            : "Reroll no utilizado"
      };


    case "medallas_pais_reroll": {
      const resultado =
        resultados.find(
          (item) =>
            item.pais.codigo ===
            contexto.codigoPaisReroll
        );

      const cantidad = resultado
        ? resultado.oros +
          resultado.platas +
          resultado.bronces
        : 0;

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo} medallas`
      };
    }

    case "rerolls_acumulados":
      return {
        actual: Math.min(
          estadoCarrera.estadisticasLogros
            .rerollsUsados,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${estadoCarrera.estadisticasLogros.rerollsUsados} / ` +
          `${logro.objetivo} rerolls`
      };

    case "records_globales_batidos": {
      const cantidad =
        logro.record === "oros"
          ? estadoCarrera.estadisticasLogros
              .recordsGlobalesOrosBatidos
          : estadoCarrera.estadisticasLogros
              .recordsGlobalesMedallasBatidos;

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo}`
      };
    }

    case "medallas_acumuladas_deporte": {
      const cantidad =
        estadoCarrera.estadisticasLogros
          .medallasPorDeporte[
            logro.deporte
          ] || 0;

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo} medallas`
      };
    }

    case "medallas_acumuladas_grupo": {
      const cantidad =
        estadoCarrera.estadisticasLogros
          .medallasDeportesEquipo;

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo} medallas`
      };
    }

    case "oros_acumulados": {
      const cantidad =
        estadoCarrera.estadisticasLogros
          .orosDesdeDesbloqueo;

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo} oros`
      };
    }

    case "medallas_acumuladas_pais": {
      const cantidad =
        estadoCarrera.estadisticasLogros
          .medallasPorPais[
            logro.pais
          ] || 0;

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo} medallas`
      };
    }

    case "medallas_acumuladas_cualquier_pais": {
      const cantidad = Math.max(
        ...Object.values(
          estadoCarrera.estadisticasLogros
            .medallasPorPais
        ),
        0
      );

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo} medallas`
      };
    }

    case "medallas_acumuladas_color": {
      const cantidad =
        estadoCarrera.estadisticasLogros
          .medallasPaisesRojos;

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo} medallas`
      };
    }

    case "racha_deporte_con_oro": {
      const cantidad =
        estadoCarrera.estadisticasLogros
          .mejorRachaBaloncestoOro;

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo} apariciones`
      };
    }

    case "defensas_record_deportivo": {
      const cantidad =
        estadoCarrera.estadisticasLogros
          .maxDefensasRecordDeportivo;

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo} defensas`
      };
    }

    case "superar_record_antiguo": {
      const cantidad =
        estadoCarrera.estadisticasLogros
          .maxAntiguedadRecordSuperado;

      return {
        actual: Math.min(
          cantidad,
          logro.objetivo
        ),
        objetivo: logro.objetivo,
        texto:
          `${cantidad} / ${logro.objetivo} apariciones`
      };
    }

    default:
      return null;
  }
}

function actualizarProgresoParcialLogros(
  contexto
) {
  if (
    !estadoCarrera?.logrosDesbloqueados
  ) {
    return;
  }

  if (!estadoCarrera.progresoLogros) {
    estadoCarrera.progresoLogros = {};
  }

  LOGROS_ACTIVOS.forEach((logro) => {
    if (
      estadoCarrera.logrosConseguidos.includes(
        logro.id
      )
    ) {
      return;
    }

    const progresoNuevo =
      calcularProgresoLogro(
        logro,
        contexto
      );

    if (
      !progresoNuevo ||
      progresoNuevo.objetivo <= 0
    ) {
      return;
    }

    const progresoAnterior =
      estadoCarrera.progresoLogros[
        logro.id
      ];

    const proporcionNueva =
      progresoNuevo.actual /
      progresoNuevo.objetivo;

    const proporcionAnterior =
      progresoAnterior
        ? progresoAnterior.actual /
          progresoAnterior.objetivo
        : -1;

    /*
      En logros de una edición guardamos el mejor intento
      realizado desde que se desbloquearon los logros.
      Así la barra nunca retrocede tras una partida peor.
    */
    if (
      !progresoAnterior ||
      proporcionNueva >
        proporcionAnterior
    ) {
      estadoCarrera.progresoLogros[
        logro.id
      ] = {
        actual: progresoNuevo.actual,
        objetivo:
          progresoNuevo.objetivo,
        texto: progresoNuevo.texto,
        edicion:
          contexto.numeroEdicion
      };
    }
  });
}

function obtenerProgresoGuardadoLogro(
  logro
) {
  if (
    estadoCarrera.logrosConseguidos.includes(
      logro.id
    )
  ) {
    return {
      actual:
        logro.objetivo || 1,
      objetivo:
        logro.objetivo || 1,
      porcentaje: 100,
      texto: "Completado"
    };
  }

  const progreso =
    estadoCarrera.progresoLogros?.[
      logro.id
    ];

  if (!progreso) {
    return null;
  }

  return {
    ...progreso,
    porcentaje: Math.min(
      100,
      Math.round(
        progreso.actual /
        progreso.objetivo *
        100
      )
    )
  };
}

function crearHtmlProgresoLogro(
  logro
) {
  const progreso =
    obtenerProgresoGuardadoLogro(
      logro
    );

  if (!progreso) {
    return "";
  }

  return `
    <div class="progreso-tarjeta-logro">
      <div class="barra-progreso-logro">
        <span
          style="width: ${progreso.porcentaje}%"
        ></span>
      </div>

      <div class="texto-progreso-logro">
        <span>${progreso.texto}</span>
        <strong>
          ${progreso.porcentaje} %
        </strong>
      </div>
    </div>
  `;
}

function obtenerIconoCategoriaLogro(
  categoria
) {
  const iconos = {
    edicion: "🏟️",
    hazana: "✨",
    draft: "🧩",
    reroll: "↻",
    acumulativo: "📈",
    records: "🏆"
  };

  return iconos[categoria] || "🎖️";
}

function obtenerNombreCategoriaLogro(
  categoria
) {
  const nombres = {
    edicion: "Edición",
    hazana: "Hazañas",
    draft: "Draft",
    reroll: "Reroll",
    acumulativo: "Acumulativos",
    records: "Récords"
  };

  return nombres[categoria] || "Logros";
}
