/*
  ROAD TO GOLD · MOTOR

  Motor matemático de simulación olímpica y cálculo de fortuna.
*/

/* ===================================================== */
/* MOTOR DE SIMULACIÓN OLÍMPICA               */
/* ===================================================== */

const PARAMETROS_VARIABILIDAD = {
  1: {
    probabilidadMaximaMedalla: 1,
    repartoPaisExcelente: {
      oro: 0.875,
      plata: 0.125,
      bronce: 0
    },
    exponenteCalidad: 2.4,
    probabilidadSorpresa: 0.00002
  },

  2: {
    probabilidadMaximaMedalla: 0.82,
    repartoPaisExcelente: {
      oro: 0.48,
      plata: 0.22,
      bronce: 0.12
    },
    exponenteCalidad: 2,
    probabilidadSorpresa: 0.00008
  },

  3: {
    probabilidadMaximaMedalla: 0.625,
    repartoPaisExcelente: {
      oro: 0.25,
      plata: 0.20,
      bronce: 0.175
    },
    exponenteCalidad: 1.68,
    probabilidadSorpresa: 0.00015
  },

  4: {
    probabilidadMaximaMedalla: 0.46,
    repartoPaisExcelente: {
      oro: 0.15,
      plata: 0.15,
      bronce: 0.16
    },
    exponenteCalidad: 1.55,
    probabilidadSorpresa: 0.00025
  },

  5: {
    probabilidadMaximaMedalla: 0.38,
    repartoPaisExcelente: {
      oro: 0.10,
      plata: 0.12,
      bronce: 0.16
    },
    exponenteCalidad: 1.45,
    probabilidadSorpresa: 0.0004
  }
};

function simularDeporte(
  nota,
  numeroPruebas,
  variabilidad
) {
  const resultado = {
    oros: 0,
    platas: 0,
    bronces: 0
  };

  for (
    let prueba = 0;
    prueba < numeroPruebas;
    prueba += 1
  ) {
    const medalla = simularUnaPrueba(
      nota,
      variabilidad
    );

    if (medalla === "oro") {
      resultado.oros += 1;
    }

    if (medalla === "plata") {
      resultado.platas += 1;
    }

    if (medalla === "bronce") {
      resultado.bronces += 1;
    }
  }

  return resultado;
}

function simularUnaPrueba(nota, variabilidad) {
  const probabilidades = calcularProbabilidadesPrueba(
    nota,
    variabilidad
  );

  const sorteo = Math.random();

  if (sorteo < probabilidades.oro) {
    return "oro";
  }

  if (
    sorteo <
    probabilidades.oro +
    probabilidades.plata
  ) {
    return "plata";
  }

  if (
    sorteo <
    probabilidades.oro +
    probabilidades.plata +
    probabilidades.bronce
  ) {
    return "bronce";
  }

  return null;
}

function calcularProbabilidadesPrueba(
  nota,
  variabilidad
) {
  const parametros =
    PARAMETROS_VARIABILIDAD[variabilidad];

  if (!parametros) {
    console.error(
      `Variabilidad no válida: ${variabilidad}`
    );

    return {
      oro: 0,
      plata: 0,
      bronce: 0
    };
  }

  const notaLimitada = Math.max(
    0,
    Math.min(10, Number(nota))
  );

  /*
    La nota 1 representa el punto desde el que
    empieza a crecer de verdad la capacidad.

    Una nota 1 mantiene únicamente una posibilidad
    minúscula de sorpresa.
  */
  const calidadNormalizada = Math.max(
    0,
    (notaLimitada - 1) / 9
  );

  const fuerzaCalculada = Math.pow(
    calidadNormalizada,
    parametros.exponenteCalidad
  );

  /*
    Incluso una nota muy baja tiene una probabilidad
    diminuta de producir una sorpresa.
  */
  const probabilidadSorpresa =
    parametros.probabilidadSorpresa *
    ((notaLimitada + 1) / 11);

  const probabilidadTotalMedalla =
    probabilidadSorpresa +
    (
      parametros.probabilidadMaximaMedalla -
      probabilidadSorpresa
    ) *
    fuerzaCalculada;

  /*
    Un país débil, cuando consigue medalla,
    tiende principalmente al bronce.
  */
  const repartoPaisDebil = {
    oro: 0.10,
    plata: 0.20,
    bronce: 0.70
  };

  const repartoExcelente =
    normalizarReparto(
      parametros.repartoPaisExcelente
    );

  /*
    A medida que aumenta la nota,
    el reparto pasa de estar cargado hacia el bronce
    a parecerse al de un país dominante.
  */
  const pesoRepartoExcelente =
    Math.pow(calidadNormalizada, 1.2);

  const repartoFinal = {
    oro: mezclarValores(
      repartoPaisDebil.oro,
      repartoExcelente.oro,
      pesoRepartoExcelente
    ),

    plata: mezclarValores(
      repartoPaisDebil.plata,
      repartoExcelente.plata,
      pesoRepartoExcelente
    ),

    bronce: mezclarValores(
      repartoPaisDebil.bronce,
      repartoExcelente.bronce,
      pesoRepartoExcelente
    )
  };

  return {
    oro:
      probabilidadTotalMedalla *
      repartoFinal.oro,

    plata:
      probabilidadTotalMedalla *
      repartoFinal.plata,

    bronce:
      probabilidadTotalMedalla *
      repartoFinal.bronce
  };
}

function calcularFortunaResultado(
  nota,
  numeroPruebas,
  variabilidad,
  resultado
) {
  const probabilidades = calcularProbabilidadesPrueba(
    nota,
    variabilidad
  );

  /*
    Valor interno de cada resultado:

    oro = 3
    plata = 2
    bronce = 1
    sin medalla = 0
  */
  const puntuacionReal =
    resultado.oros * 3 +
    resultado.platas * 2 +
    resultado.bronces;

  /*
    Puntuación esperada en una sola prueba.
  */
  const mediaPorPrueba =
    probabilidades.oro * 3 +
    probabilidades.plata * 2 +
    probabilidades.bronce;

  /*
    E(X²) de una sola prueba.

    Oro: 3² = 9
    Plata: 2² = 4
    Bronce: 1² = 1
  */
  const mediaCuadradosPorPrueba =
    probabilidades.oro * 9 +
    probabilidades.plata * 4 +
    probabilidades.bronce;

  const varianzaPorPrueba =
    mediaCuadradosPorPrueba -
    Math.pow(mediaPorPrueba, 2);

  const puntuacionEsperada =
    mediaPorPrueba * numeroPruebas;

  const desviacionTipica =
    Math.sqrt(
      Math.max(
        0,
        varianzaPorPrueba * numeroPruebas
      )
    );

  /*
    El índice de fortuna indica cuántas desviaciones
    típicas se encuentra el resultado por encima
    o por debajo de lo esperado.
  */
  const indice =
    desviacionTipica > 0
      ? (
          puntuacionReal -
          puntuacionEsperada
        ) / desviacionTipica
      : 0;

  return {
    indice: indice,
    puntuacionReal: puntuacionReal,
    puntuacionEsperada: puntuacionEsperada,
    desviacionTipica: desviacionTipica,
    ...clasificarFortuna(indice)
  };
}

function clasificarFortuna(indice) {
  if (indice >= 2) {
    return {
      simbolo: "↑↑",
      texto: "Actuación extraordinaria",
      clase: "fortuna-muy-positiva"
    };
  }

  if (indice >= 0.75) {
    return {
      simbolo: "↑",
      texto: "Por encima de lo esperado",
      clase: "fortuna-positiva"
    };
  }

  if (indice <= -2) {
    return {
      simbolo: "↓↓",
      texto: "Gran decepción",
      clase: "fortuna-muy-negativa"
    };
  }

  if (indice <= -0.75) {
    return {
      simbolo: "↓",
      texto: "Por debajo de lo esperado",
      clase: "fortuna-negativa"
    };
  }

  return {
    simbolo: "—",
    texto: "Rendimiento esperado",
    clase: "fortuna-neutral"
  };
}

function normalizarReparto(reparto) {
  const total =
    reparto.oro +
    reparto.plata +
    reparto.bronce;

  return {
    oro: reparto.oro / total,
    plata: reparto.plata / total,
    bronce: reparto.bronce / total
  };
}

function mezclarValores(
  valorInicial,
  valorFinal,
  peso
) {
  return (
    valorInicial * (1 - peso) +
    valorFinal * peso
  );
}

function probarCasoMotor(
  nota,
  numeroPruebas,
  variabilidad,
  repeticiones = 10000
) {
  let orosTotales = 0;
  let platasTotales = 0;
  let broncesTotales = 0;
  let simulacionesSinMedalla = 0;

  for (
    let repeticion = 0;
    repeticion < repeticiones;
    repeticion += 1
  ) {
    const resultado = simularDeporte(
      nota,
      numeroPruebas,
      variabilidad
    );

    orosTotales += resultado.oros;
    platasTotales += resultado.platas;
    broncesTotales += resultado.bronces;

    const totalMedallas =
      resultado.oros +
      resultado.platas +
      resultado.bronces;

    if (totalMedallas === 0) {
      simulacionesSinMedalla += 1;
    }
  }

  const resultadoMedio = {
    nota: nota,
    pruebas: numeroPruebas,
    variabilidad: variabilidad,

    orosMedios:
      (orosTotales / repeticiones).toFixed(2),

    platasMedias:
      (platasTotales / repeticiones).toFixed(2),

    broncesMedios:
      (broncesTotales / repeticiones).toFixed(2),

    porcentajeSinMedalla:
      (
        simulacionesSinMedalla /
        repeticiones *
        100
      ).toFixed(2) + "%"
  };

  console.table(resultadoMedio);

  return resultadoMedio;
}
