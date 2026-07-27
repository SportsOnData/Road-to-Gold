/*
  ROAD TO GOLD · RECORDS

  Récords personales de la partida rápida.
*/

function limpiarRecordsGuardados() {
  const confirmar = window.confirm(
    "¿Seguro que quieres borrar todos los récords?"
  );

  if (!confirmar) {
    return;
  }

  localStorage.removeItem(
    CLAVE_RECORD_OROS
  );

  localStorage.removeItem(
    CLAVE_RECORD_MEDALLAS
  );

  limpiarCelebracionRecords();
  actualizarTarjetasRecords();

  window.alert(
    "Los récords se han borrado correctamente."
  );
}

function obtenerRecordGuardado(clave) {
  const textoGuardado =
    localStorage.getItem(clave);

  if (!textoGuardado) {
    return null;
  }

  try {
    return JSON.parse(textoGuardado);
  } catch (error) {
    console.warn(
      `No se pudo leer el récord ${clave}.`,
      error
    );

    return null;
  }
}

function crearRegistroPartida(
  oros,
  platas,
  bronces
) {
  return {
    fecha: new Date().toISOString(),

    medallero: {
      oros: oros,
      platas: platas,
      bronces: bronces,
      total: oros + platas + bronces
    },

    resultados: resultadosJuegos.map(
      (resultado) => {
        return {
          deporte: {
            codigo: resultado.deporte.codigo,
            nombre: resultado.deporte.nombre
          },

          pais: {
            codigo: resultado.pais.codigo,
            nombre: resultado.pais.nombre
          },

          color: resultado.color,
          oros: resultado.oros,
          platas: resultado.platas,
          bronces: resultado.bronces
        };
      }
    )
  };
}

function guardarRecordsPartida(
  oros,
  platas,
  bronces
) {
  const partida = crearRegistroPartida(
    oros,
    platas,
    bronces
  );

  const recordOrosAnterior =
    obtenerRecordGuardado(CLAVE_RECORD_OROS);

  const recordMedallasAnterior =
    obtenerRecordGuardado(
      CLAVE_RECORD_MEDALLAS
    );

  let nuevoRecordOros = false;
  let nuevoRecordMedallas = false;


  if (
    !recordOrosAnterior ||
    oros > recordOrosAnterior.valor
  ) {
    nuevoRecordOros = true;

    localStorage.setItem(
      CLAVE_RECORD_OROS,
      JSON.stringify({
        ...partida,
        valor: oros
      })
    );
  }


  const total =
    oros + platas + bronces;


  if (
    !recordMedallasAnterior ||
    total > recordMedallasAnterior.valor
  ) {
    nuevoRecordMedallas = true;

    localStorage.setItem(
      CLAVE_RECORD_MEDALLAS,
      JSON.stringify({
        ...partida,
        valor: total
      })
    );
  }


  return {
    nuevoRecordOros: nuevoRecordOros,
    nuevoRecordMedallas: nuevoRecordMedallas
  };
}

function limpiarCelebracionRecords() {
  mensajeNuevoRecord.classList.add("oculto");

  recordOros.classList.remove(
    "nuevo-record"
  );

  recordMedallas.classList.remove(
    "nuevo-record"
  );

  tituloNuevoRecord.textContent =
    "¡NUEVO RÉCORD!";

  detalleNuevoRecord.textContent = "";
}

function mostrarCelebracionRecords(
  estadoRecords,
  cantidadOros,
  cantidadMedallas
) {
  limpiarCelebracionRecords();

  const {
    nuevoRecordOros,
    nuevoRecordMedallas
  } = estadoRecords;


  if (
    !nuevoRecordOros &&
    !nuevoRecordMedallas
  ) {
    return;
  }


  /*
    Forzamos que el navegador registre el estado
    sin animación antes de volver a añadirla.
  */
  void mensajeNuevoRecord.offsetWidth;


  if (
    nuevoRecordOros &&
    nuevoRecordMedallas
  ) {
    tituloNuevoRecord.textContent =
      "¡DOBLE RÉCORD!";

    detalleNuevoRecord.textContent =
      `${cantidadOros} oros y ` +
      `${cantidadMedallas} medallas`;

    recordOros.classList.add(
      "nuevo-record"
    );

    recordMedallas.classList.add(
      "nuevo-record"
    );
  } else if (nuevoRecordOros) {
    tituloNuevoRecord.textContent =
      "¡NUEVO RÉCORD DE OROS!";

    detalleNuevoRecord.textContent =
      `${cantidadOros} oros`;

    recordOros.classList.add(
      "nuevo-record"
    );
  } else {
    tituloNuevoRecord.textContent =
      "¡NUEVO RÉCORD DE MEDALLAS!";

    detalleNuevoRecord.textContent =
      `${cantidadMedallas} medallas totales`;

    recordMedallas.classList.add(
      "nuevo-record"
    );
  }


  mensajeNuevoRecord.classList.remove(
    "oculto"
  );
}

function formatearFechaRecord(fecha) {
  const fechaConvertida = new Date(fecha);

  if (Number.isNaN(fechaConvertida.getTime())) {
    return "Fecha desconocida";
  }

  return new Intl.DateTimeFormat(
    "es-ES",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }
  ).format(fechaConvertida);
}

function actualizarTarjetasRecords() {
  const mejorRecordOros =
    obtenerRecordGuardado(CLAVE_RECORD_OROS);

  const mejorRecordMedallas =
    obtenerRecordGuardado(
      CLAVE_RECORD_MEDALLAS
    );

  actualizarTarjetaRecord(
    recordOros,
    valorRecordOros,
    fechaRecordOros,
    mejorRecordOros,
    "oros"
  );

  actualizarTarjetaRecord(
    recordMedallas,
    valorRecordMedallas,
    fechaRecordMedallas,
    mejorRecordMedallas,
    "medallas"
  );
}

function actualizarTarjetaRecord(
  boton,
  elementoValor,
  elementoFecha,
  record,
  tipo
) {
  if (!record) {
    boton.disabled = true;

    elementoValor.textContent =
      "Todavía no hay récord";

    elementoFecha.textContent =
      "Completa una partida";

    return;
  }

  boton.disabled = false;

  elementoValor.textContent =
    tipo === "oros"
      ? `${record.valor} oros`
      : `${record.valor} medallas`;

  elementoFecha.textContent =
    formatearFechaRecord(record.fecha);
}

function abrirRecord(clave, titulo) {
  const record =
    obtenerRecordGuardado(clave);

  if (!record) {
    return;
  }

  tituloPantallaRecord.textContent = titulo;

  fechaPantallaRecord.textContent =
    `Conseguido el ${formatearFechaRecord(
      record.fecha
    )}`;

  recordDetalleOros.textContent =
    record.medallero.oros;

  recordDetallePlatas.textContent =
    record.medallero.platas;

  recordDetalleBronces.textContent =
    record.medallero.bronces;

  recordDetalleTotal.textContent =
    record.medallero.total;

  resultadosRecordPorDeporte.innerHTML =
    record.resultados
      .map((resultado) => {
        return `
          <div
            class="fila-resultado
            eleccion-${resultado.color}"
          >
            <strong>
              ${resultado.deporte.nombre}
            </strong>

            <span>
              ${resultado.pais.nombre}
            </span>

            <span class="cantidad-medalla">
              ${resultado.oros}
            </span>

            <span class="cantidad-medalla">
              ${resultado.platas}
            </span>

            <span class="cantidad-medalla">
              ${resultado.bronces}
            </span>
          </div>
        `;
      })
      .join("");

  mostrarPantalla(pantallaRecord);
}
