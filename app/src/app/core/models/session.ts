// Sesión persistida en localStorage bajo 'fit-daily_session' (misma forma que el legacy).
export interface Session {
  id: string;        // user_id del Helpdesk (p. ej. 'MSC001')
  name: string;      // nombre para UI (equipo local > perfil del API)
  role: string;      // rol del proyecto Fit-Daily (p. ej. 'Scrum Master')
  apiRole: string;   // role_description autoritativo del Helpdesk (permisos)
  color: string;     // color de avatar
  email: string;
  token: string;        // access_token del Helpdesk (vida corta)
  refreshToken: string; // refresh_token del Helpdesk (vida larga) → renueva el access_token
}

// Perfil crudo devuelto por GET /users/me del Helpdesk.
export interface HelpdeskProfile {
  user_id: string;
  person_name?: string;
  person_alias?: string;
  role_description?: string;
  email?: string;
}
