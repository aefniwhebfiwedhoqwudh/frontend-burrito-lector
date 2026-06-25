import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { DashboardLectorComponent } from './pages/dashboard-lector/dashboard-lector.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { AfinidadComponent } from './pages/afinidad/afinidad.component';
import { DetalleLibroComponent } from './pages/detalle-libro/detalle-libro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'dashboard', component: DashboardLectorComponent },
  { path: 'afinidad', component: AfinidadComponent },
  { path: 'admin/login', component: LoginAdminComponent },
  { path: 'admin', component: DashboardAdminComponent },
  
  { path: 'galeria/:id', component: DetalleLibroComponent },
];