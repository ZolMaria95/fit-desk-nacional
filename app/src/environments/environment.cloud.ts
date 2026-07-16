// Entorno CLOUD (lo usa `ng build -c cloud` para publicar en GitHub Pages).
// El frontend estático (Pages) consume el backend Quarkus desplegado en Render,
// que a su vez lee de Neon (Postgres) y proxea el HelpDesk (/api/v1/*).
// NO afecta la prod legacy (environment.prod.ts sigue en Firebase, intacta).
export const environment = {
  production: true,
  firebaseDbUrl: 'https://fit-daily-ab113-default-rtdb.firebaseio.com',
  helpdeskProxyUrl: 'https://fit-desk.onrender.com',
  dataBackend: 'quarkus' as 'firebase' | 'quarkus',
  quarkusApiUrl: 'https://fit-desk.onrender.com',
};
