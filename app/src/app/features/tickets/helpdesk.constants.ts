// Constantes del panel Helpdesk (port de js/helpdesk-panel.js).

/** Clientes válidos para el sync y la tabla. Solo entran tickets de estos clientes. */
export const CLIENTES_VALIDOS = new Set<string>([
  'COOPERATIVA DE AHORRO Y CREDITO ERCO',
  'COAC CAPCPE GUALAQUIZA',
  'COAC LA DOLOROSA DURAN',
  'PADRE JULIAN LORENTE',
  'COAC CACEL',
  'COAC 4 RIOS',
  'LITARGMODE CIA LTDA',
  'COAC COPAC AUSTRO LTDA',
  'BANCO DEL AUSTRO',
  'VAZCREDIT',
  'COAC SENOR DE GIRON',
  'COAC SEÑOR DE GIRON',
  'FININVEST OVERSEAS INC. LTD.',
  'SEGURA COOP',
  'PUNTOPRESTAMO',
]);

/** Nombre del cliente en el API → id interno de Fit-Daily. */
export const CLIENT_MAP: Record<string, string> = {
  'COOPERATIVA DE AHORRO Y CREDITO ERCO': 'erco',
  'COAC CAPCPE GUALAQUIZA': 'gualaquiza',
  'COAC LA DOLOROSA DURAN': 'dolorosa',
  'PADRE JULIAN LORENTE': 'julian',
  'COAC CACEL': 'cacel',
  'COAC 4 RIOS': '4rios',
  'LITARGMODE CIA LTDA': 'litarg',
  'COAC COPAC AUSTRO LTDA': 'copac_austro',
  'BANCO DEL AUSTRO': 'austro',
  VAZCREDIT: 'vazcredit',
  'COAC SENOR DE GIRON': 'giron',
  'COAC SEÑOR DE GIRON': 'giron',
  'FININVEST OVERSEAS INC. LTD.': 'fininvest',
  'SEGURA COOP': 'segura',
  PUNTOPRESTAMO: 'puntoprestamo',
};

/** Color por clasificación (texto en la tabla). */
export const CLASIF_COLOR: Record<string, string> = {
  URGENTE: '#FF4444',
  'CRITICO SIN MOVIMIENTO': '#C00000',
  'ALTA PRIORIDAD': '#FF8C00',
  RECIENTE: '#2196F3',
  'REQUIERE REVISION': '#FF5722',
  'CLIENTE PENDIENTE': '#9C27B0',
  'VERIFICAR MOTIVO DE NO ASIGNACION': '#FF6D00',
  'SIN ASIGNAR': '#FFC107',
  'SIN ACCION': '#757575',
  'COMENTARIO ENVIADO POR FITBANK': '#00897B',
};

/** Orden de clasificaciones por urgencia (para stats y sort). */
export const CLASIF_ORDER = [
  'URGENTE',
  'CRITICO SIN MOVIMIENTO',
  'ALTA PRIORIDAD',
  'RECIENTE',
  'REQUIERE REVISION',
  'CLIENTE PENDIENTE',
  'VERIFICAR MOTIVO DE NO ASIGNACION',
  'SIN ASIGNAR',
  'COMENTARIO ENVIADO POR FITBANK',
  'SIN ACCION',
];

/** Acciones que marcan un ticket como prioritario (tab Prioritarios). */
export const PRIORITY_ACTIONS = new Set<string>([
  'ASIGNAR TECNICO',
  'REQUIERE REVISION',
  'ESCALAR INMEDIATAMENTE',
  'ATENDER INMEDIATAMENTE',
  'REVISAR HOY',
]);

/** user_ids del equipo de soporte (para distinguir mensajes de empleado vs cliente). */
export const EMPLEADOS = new Set<string>([
  'JPHP001',
  'VINC001',
  'MSC001',
  'FSGC001',
  'ORLR001',
  'KIMA001',
  'KDLS001',
  'BMHJ001',
  'DSGS001',
  'JCEO001',
  'CUC001',
  'JFQV001',
]);

/** Tipo de ticket por id. */
export const TIPO_NOMBRE: Record<string, string> = {
  '001': 'INCIDENCIA',
  '002': 'REQUERIMIENTO',
  '003': 'CONSULTA',
};

/** Mensajes automáticos del sistema (cambios de prioridad/estatus) a ignorar. */
export const AUTO_PATTERN = /el usuario .+ (cambi[oó]|ualizó .+ asun)/i;
