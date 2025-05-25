import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { EstudianteListComponent } from './Components/Estudiantes/estudiante-list/estudiante-list.component';
import { EstudianteFormComponent } from './Components/Estudiantes/estudiante-form/estudiante-form.component';
import { EstudianteDetailComponent } from './Components/Estudiantes/estudiante-detail/estudiante-detail.component';




const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'estudiantes' },
  { path: 'estudiantes', component: EstudianteListComponent },
  { path: 'estudiantes/nuevo', component: EstudianteFormComponent },
  { path: 'estudiantes/editar/:id', component: EstudianteFormComponent },
  { path: 'estudiantes/:id', component: EstudianteDetailComponent },

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

