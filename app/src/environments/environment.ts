// Entorno DEV (lo usa `ng serve`).
// - Firebase REAL → el equipo comparte los datos del board en la LAN.
// - helpdeskProxyUrl VACÍO → las llamadas al Helpdesk son relativas (`/api/v1`),
//   y el proxy integrado del dev server de Angular (proxy.conf.json) las reenvía
//   a https://helpdesk-api.fit-bank.com (server-side, sin CORS, sin proxy.py).
// - dataBackend: fuente de datos del board. 'firebase' (default, intacto) o
//   'quarkus' (Fase 3). Para probar contra Quarkus: `ng serve -c quarkus`.
export const environment = {
  production: false,
  firebaseDbUrl: 'https://fit-daily-ab113-default-rtdb.firebaseio.com',
  helpdeskProxyUrl: '',
  dataBackend: 'firebase' as 'firebase' | 'quarkus',
  quarkusApiUrl: 'http://localhost:8080',
};
