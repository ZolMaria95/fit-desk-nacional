import { FilaReporte, FilaSeguimiento, PRIORIDAD_LABEL, bloqueoDe, fechaCorta, fechaHora } from './reporte-modelo';

export interface DatosExcel {
  equipo: string;
  consultores: string; // "Todos los del equipo" o la lista de nombres
  generadoPor: string;
  generadoEn: Date;
  /** Filas de la tabla tal como se ven (filtradas y ordenadas), con el nombre del consultor y el estado mostrado. */
  filas: (FilaReporte & { consultorNombre: string | null; estadoTicket?: string })[];
  /** Consultores sin tarea visible. */
  sinTarea: string[];
  seguimiento: FilaSeguimiento[];
}

const AZUL = 'FF1F3864';
const PARA_COMPLETAR = 'FFFFF6D5'; // fondo suave (sin uso en la hoja principal desde 2026-10)
const BORDE = { style: 'thin' as const, color: { argb: 'FFD9DEE5' } };

/**
 * Genera el .xlsx del reporte "Estado del equipo". `exceljs` se importa AQUÍ, dinámicamente: solo se
 * descarga al pulsar "Descargar Excel", no en la carga inicial de la app.
 * La hoja principal refleja la tabla "Gestión de trabajo por consultor" (con sus filtros y orden); el
 * bloqueo y la nota ya se registran en FitDesk, así que reemplazan a las columnas que antes se llenaban a mano.
 */
export async function generarExcelReporte(d: DatosExcel): Promise<Blob> {
  const ExcelJS = (await import('exceljs')).default;
  const wb = new ExcelJS.Workbook();
  wb.creator = 'FitDesk';
  wb.created = d.generadoEn;
  const generado = `${d.generadoEn.toLocaleDateString('es-EC')} ${d.generadoEn.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}`;

  // ── Hoja 1: Gestión de trabajo por consultor (lo mismo que la tabla, con sus filtros y orden) ──
  const ws = wb.addWorksheet('Gestión por consultor', { views: [{ state: 'frozen', ySplit: 5, xSplit: 2 }] });
  const cols: [string, number][] = [
    ['Consultor', 24], ['Tarea', 36], ['Ticket', 9], ['Tipo', 15], ['Cliente', 26], ['Estado', 22],
    ['Prioridad (tarea)', 11], ['Orden del ticket', 9], ['% Avance', 9], ['Creación ticket', 12],
    ['Días desde creación', 11], ['Asignación', 12], ['Días desde asignación', 11], ['Inicio', 13], ['Última gestión', 16],
    ['Días sin movimiento', 11], ['Días esperando cliente', 11], ['Compromiso', 12], ['Bloqueo', 22], ['Nota', 44],
  ];
  ws.columns = cols.map(([, width]) => ({ width }));
  encabezado(ws, `Gestión de trabajo por consultor — ${d.equipo}`, [
    `Consultores: ${d.consultores}`,
    `Generado: ${generado} por ${d.generadoPor}`,
  ]);
  filaTitulos(ws, 5, cols.map(([t]) => t));
  let r = 6;
  for (const f of d.filas) {
    const row = ws.getRow(r);
    const num = (v: string | null | undefined) => (v ? Number(v) || v : '');
    row.values = [
      f.consultorNombre || 'Sin asignar',
      `${f.tarea}${f.titulo ? ' · ' + f.titulo : ''}${f.tablero ? ` (tablero ${f.tablero})` : ''}`,
      num(f.ticket),
      f.tipo || (f.ticket ? '' : 'Tarea'),
      f.cliente ?? '',
      f.estadoTicket ?? '',
      PRIORIDAD_LABEL[f.prioridad ?? ''] ?? '',
      num(f.ordenTicket),
      (f.progreso ?? 0) / 100,
      f.fechaCreacion ? fechaCorta(f.fechaCreacion) : '',
      f.diasCreacion ?? '',
      f.fechaAsignacion ? fechaCorta(f.fechaAsignacion) : '',
      f.diasAsignacion ?? '',
      f.inicio ? fechaCorta(f.inicio) + (f.inicioAprox ? ' (aprox.)' : '') : '',
      f.ultimaGestion ? fechaHora(f.ultimaGestion) : '',
      f.diasSinMov ?? '',
      f.diasEsperandoCliente ?? '',
      f.fechaLimite ? fechaCorta(f.fechaLimite) : '',
      bloqueoDe(f.bloqueo)?.label ?? '',
      f.nota ?? '',
    ];
    row.getCell(9).numFmt = '0%';
    estiloFila(row, cols.length, 0);
    r++;
  }
  if (!d.filas.length) ws.getCell('A6').value = 'Sin tareas.';
  ws.autoFilter = { from: { row: 5, column: 1 }, to: { row: Math.max(5, r - 1), column: cols.length } };
  if (d.sinTarea.length) {
    const c = ws.getCell(`A${r + 1}`);
    c.value = `Sin tarea en curso: ${d.sinTarea.join(', ')}`;
    c.font = { italic: true, size: 10, color: { argb: 'FF555555' } };
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
    c.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: AZUL } };
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
