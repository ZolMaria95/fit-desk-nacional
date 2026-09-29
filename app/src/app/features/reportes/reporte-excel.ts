import { ESTADO_LABEL, FilaSeguimiento, GrupoConsultor, PRIORIDAD_LABEL, fechaCorta } from './reporte-modelo';

export interface DatosExcel {
  equipo: string;
  consultores: string; // "Todos los del equipo" o la lista de nombres
  generadoPor: string;
  generadoEn: Date;
  grupos: GrupoConsultor[];
  seguimiento: FilaSeguimiento[];
}

const AZUL = 'FF1F3864';
const PARA_COMPLETAR = 'FFFFF6D5'; // fondo suave de las columnas que se llenan a mano
const BORDE = { style: 'thin' as const, color: { argb: 'FFD9DEE5' } };

/**
 * Genera el .xlsx del reporte "Estado del equipo". `exceljs` se importa AQUÍ, dinámicamente: solo se
 * descarga al pulsar "Descargar Excel", no en la carga inicial de la app.
 * Las columnas Próximo paso / ¿Bloqueado? / Motivo / Quién debe intervenir van VACÍAS a propósito
 * (decisión de la dueña): se completan en el propio Excel.
 */
export async function generarExcelReporte(d: DatosExcel): Promise<Blob> {
  const ExcelJS = (await import('exceljs')).default;
  const wb = new ExcelJS.Workbook();
  wb.creator = 'FitDesk';
  wb.created = d.generadoEn;
  const generado = `${d.generadoEn.toLocaleDateString('es-EC')} ${d.generadoEn.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}`;

  // ── Hoja 1: Estado del equipo ──
  const ws = wb.addWorksheet('Estado del equipo', { views: [{ state: 'frozen', ySplit: 6 }] });
  ws.columns = [
    { key: 'consultor', width: 26 },
    { key: 'tarea', width: 38 },
    { key: 'ticket', width: 10 },
    { key: 'cliente', width: 28 },
    { key: 'estado', width: 16 },
    { key: 'prioridad', width: 11 },
    { key: 'orden', width: 10 },
    { key: 'inicio', width: 16 },
    { key: 'dias', width: 10 },
    { key: 'proximo', width: 34 },
    { key: 'bloqueado', width: 12 },
    { key: 'motivo', width: 30 },
    { key: 'interviene', width: 24 },
  ];
  encabezado(ws, `Estado del equipo — ${d.equipo}`, [
    `Consultores: ${d.consultores}`,
    `Generado: ${generado} por ${d.generadoPor}`,
    'Las columnas en amarillo (Próximo paso, ¿Bloqueado?, Motivo, Quién debe intervenir) son para completar.',
  ]);
  const titulos = ['Consultor', 'Tarea', 'Ticket', 'Cliente', 'Estado', 'Prioridad (tarea)', 'Orden del ticket',
    'Fecha de inicio', 'Días transcurridos', 'Próximo paso', '¿Bloqueado?', 'Motivo', 'Quién debe intervenir'];
  filaTitulos(ws, 6, titulos);

  let r = 7;
  for (const g of d.grupos) {
    const filas = g.filas.length ? g.filas : [null];
    for (const f of filas) {
      const row = ws.getRow(r);
      row.values = f
        ? [
            g.nombre,
            `${f.tarea}${f.titulo ? ' · ' + f.titulo : ''}${f.tablero ? ` (tablero ${f.tablero})` : ''}`,
            f.ticket ? Number(f.ticket) || f.ticket : '',
            f.cliente ?? '',
            (ESTADO_LABEL[f.estado] ?? f.estado) + (f.esperandoCliente ? ' · esperando cliente' : ''),
            PRIORIDAD_LABEL[f.prioridad ?? ''] ?? '',
            f.ordenTicket ? Number(f.ordenTicket) || f.ordenTicket : '',
            f.inicio ? fechaCorta(f.inicio) + (f.inicioAprox ? ' (aprox.)' : '') : '',
            f.dias ?? '',
            '', '', '', '',
          ]
        : [g.nombre, 'Sin tarea en curso', '', '', '', '', '', '', '', '', '', '', ''];
      estiloFila(row, 13, 10);
      r++;
    }
  }
  ws.autoFilter = { from: { row: 6, column: 1 }, to: { row: Math.max(6, r - 1), column: 13 } };
  // ¿Bloqueado?: lista desplegable Sí/No en toda la columna de datos (un solo rango).
  if (r > 7) {
    (ws as unknown as { dataValidations: { add(r: string, v: object): void } }).dataValidations.add(`K7:K${r - 1}`, { type: 'list', allowBlank: true, formulae: ['"Sí,No"'] });
  }

  // ── Hoja 2: Seguimiento hoy ──
  const ws2 = wb.addWorksheet('Seguimiento hoy', { views: [{ state: 'frozen', ySplit: 5 }] });
  ws2.columns = [
    { key: 'n', width: 5 },
    { key: 'motivo', width: 40 },
    { key: 'consultor', width: 26 },
    { key: 'tarea', width: 38 },
    { key: 'ticket', width: 10 },
    { key: 'cliente', width: 28 },
    { key: 'orden', width: 10 },
    { key: 'prioridad', width: 11 },
    { key: 'dias', width: 10 },
  ];
  encabezado(ws2, `Requieren seguimiento hoy — ${d.equipo}`, [
    `Generado: ${generado} por ${d.generadoPor}`,
    'Orden: vencidas · vencen hoy · recordatorios · esperando cliente · en curso hace días; luego Orden del ticket y prioridad.',
  ]);
  filaTitulos(ws2, 5, ['N°', 'Motivo', 'Consultor', 'Tarea', 'Ticket', 'Cliente', 'Orden del ticket', 'Prioridad (tarea)', 'Días']);
  d.seguimiento.forEach((s, i) => {
    const row = ws2.getRow(6 + i);
    row.values = [
      i + 1,
      s.motivo,
      s.consultorNombre ? s.consultorNombre : 'Sin asignar',
      `${s.tarea}${s.titulo ? ' · ' + s.titulo : ''}`,
      s.ticket ? Number(s.ticket) || s.ticket : '',
      s.cliente ?? '',
      s.ordenTicket ? Number(s.ordenTicket) || s.ordenTicket : '',
      PRIORIDAD_LABEL[s.prioridad ?? ''] ?? '',
      s.dias ?? '',
    ];
    estiloFila(row, 9, 0);
  });
  if (!d.seguimiento.length) ws2.getCell('A6').value = 'Nada requiere seguimiento hoy.';

  const buf = await wb.xlsx.writeBuffer();
  return new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

function encabezado(ws: any, titulo: string, lineas: string[]): void {
  ws.getCell('A1').value = titulo;
  ws.getCell('A1').font = { bold: true, size: 14, color: { argb: AZUL } };
  lineas.forEach((l, i) => {
    const c = ws.getCell(`A${i + 2}`);
    c.value = l;
    c.font = { size: 10, color: { argb: 'FF555555' } };
  });
}

function filaTitulos(ws: any, fila: number, titulos: string[]): void {
  const row = ws.getRow(fila);
  row.values = titulos;
  row.height = 30;
  row.eachCell((c: any, col: number) => {
    const manual = titulos.length === 13 && col >= 10;
    c.font = { bold: true, color: { argb: manual ? 'FF5C4A00' : 'FFFFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: manual ? 'FFF2D46B' : AZUL } };
    c.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    c.border = { top: BORDE, left: BORDE, bottom: BORDE, right: BORDE };
  });
}

/** Bordes, ajuste de texto y fondo "para completar" desde la columna `desdeManual` (0 = ninguna). */
function estiloFila(row: any, columnas: number, desdeManual: number): void {
  for (let col = 1; col <= columnas; col++) {
    const c = row.getCell(col);
    c.alignment = { vertical: 'top', wrapText: true };
    c.border = { top: BORDE, left: BORDE, bottom: BORDE, right: BORDE };
    if (desdeManual && col >= desdeManual) {
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PARA_COMPLETAR } };
    }
  }
}
