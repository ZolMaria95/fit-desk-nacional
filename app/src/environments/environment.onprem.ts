// Entorno ON-PREM (contenedores en el servidor de la empresa).
// El frontend habla con el backend Quarkus por MISMO ORIGEN: las llamadas son
// RELATIVAS (`/api/v1`, `/api/legacy`) y Nginx (este mismo contenedor) las proxya
// al backend. Así funciona por cualquier IP/dominio/VPN, sin CORS ni URL hardcodeada.
export const environment = {
  production: true,
  firebaseDbUrl: 'https://fit-daily-ab113-default-rtdb.firebaseio.com',
  helpdeskProxyUrl: '',
  dataBackend: 'quarkus' as 'firebase' | 'quarkus',
  quarkusApiUrl: '',
};
