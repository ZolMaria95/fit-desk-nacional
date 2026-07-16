import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';
import { bandejaGuard } from './core/guards/bandeja.guard';
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
      { path: '', pathMatch: 'full', redirectTo: 'board' },
      { path: 'board', loadComponent: () => import('./features/board/board').then((m) => m.Board) },
      { path: 'burndown', loadComponent: () => import('./features/burndown/burndown').then((m) => m.Burndown) },
      { path: 'progreso', loadComponent: () => import('./features/progreso/progreso').then((m) => m.Progreso) },
      { path: 'consultas', loadComponent: () => import('./features/consultas/consultas').then((m) => m.Consultas) },
      { path: 'tickets', loadComponent: () => import('./features/tickets/tickets').then((m) => m.Tickets) },
      { path: 'semanal', loadComponent: () => import('./features/semanal/semanal').then((m) => m.Semanal) },
      { path: 'mi-panel', canActivate: [solGuard], loadComponent: () => import('./features/mi-panel/mi-panel').then((m) => m.MiPanel) },
      { path: 'pendientes', loadComponent: () => import('./features/pendientes/pendientes').then((m) => m.Pendientes) },
      { path: 'bandeja', canActivate: [bandejaGuard], loadComponent: () => import('./features/bandeja/bandeja').then((m) => m.Bandeja) },
      { path: 'admin', canActivate: [adminGuard], loadComponent: () => import('./features/admin/administracion').then((m) => m.Administracion) },
    ],
  },
  { path: '**', redirectTo: '' },
];
