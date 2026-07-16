// Entorno FASE 3 (lo usa `ng serve -c quarkus` / `ng build -c quarkus`).
// Quarkus es la ÚNICA fuente del frontend:
//  - Datos del board → /api/legacy/* (en vez de Firebase). Firebase SOLO LECTURA.
//  - HelpDesk → /api/v1/* proxeado por Quarkus (en vez del proxy del dev server /
//    Cloudflare Worker): helpdeskProxyUrl apunta al backend.
export const environment = {
  production: false,
  firebaseDbUrl: 'https://fit-daily-ab113-default-rtdb.firebaseio.com',
  helpdeskProxyUrl: 'http://localhost:8080',
  dataBackend: 'quarkus' as 'firebase' | 'quarkus',
  quarkusApiUrl: 'http://localhost:8080',
};
