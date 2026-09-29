import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';
import { bandejaGuard } from './core/guards/bandeja.guard';
import { reportesGuard } from './core/guards/reportes.guard';
import { solGuard } from './core/guards/sol.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout').then((m) => m.Layout),
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'tickets' },
      { path: 'board', loadComponent: () => import('./features/board/board').then((m) => m.Board) },
      { path: 'tickets', loadComponent: () => import('./features/tickets/tickets').then((m) => m.Tickets) },
      { path: 'semanal', loadComponent: () => import('./features/semanal/semanal').then((m) => m.Semanal) },
      { path: 'senior-turno', loadComponent: () => import('./features/senior-turno/senior-turno').then((m) => m.SeniorTurno) },
      { path: 'vacaciones', loadComponent: () => import('./features/vacaciones/vacaciones').then((m) => m.Vacaciones) },
      { path: 'mi-panel', canActivate: [solGuard], loadComponent: () => import('./features/mi-panel/mi-panel').then((m) => m.MiPanel) },
      { path: 'reportes', canActivate: [reportesGuard], loadComponent: () => import('./features/reportes/reportes').then((m) => m.Reportes) },
      { path: 'pendientes', loadComponent: () => import('./features/pendientes/pendientes').then((m) => m.Pendientes) },
      { path: 'guardados', loadComponent: () => import('./features/guardados/guardados').then((m) => m.Guardados) },
      { path: 'bandeja', canActivate: [bandejaGuard], loadComponent: () => import('./features/bandeja/bandeja').then((m) => m.Bandeja) },
      { path: 'bandeja/transferencias', canActivate: [bandejaGuard], loadComponent: () => import('./features/bandeja/transferencias-detalle/transferencias-detalle').then((m) => m.TransferenciasDetalle) },
      { path: 'bandeja/trabajo-equipo', canActivate: [bandejaGuard], loadComponent: () => import('./features/bandeja/trabajo-equipo/trabajo-equipo').then((m) => m.TrabajoEquipo) },
      { path: 'bandeja/solicitudes', canActivate: [bandejaGuard], loadComponent: () => import('./features/bandeja/solicitudes-detalle/solicitudes-detalle').then((m) => m.SolicitudesDetalle) },
      { path: 'admin', canActivate: [adminGuard], loadComponent: () => import('./features/admin/administracion').then((m) => m.Administracion) },
    ],
  },
  { path: '**', redirectTo: '' },
];
