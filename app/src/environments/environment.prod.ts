// Entorno PROD (reemplaza environment.ts en el build de producción vía
// fileReplacements en angular.json). Mismas URLs que js/firebase-config.js.
// PROD sigue en Firebase (GitPages intacto durante toda la migración).
export const environment = {
  production: true,
  firebaseDbUrl: 'https://fit-daily-ab113-default-rtdb.firebaseio.com',
  helpdeskProxyUrl: 'https://fit-daily-proxy.contreras-sol-4to5.workers.dev',
  dataBackend: 'firebase' as 'firebase' | 'quarkus',
  quarkusApiUrl: '',
};
