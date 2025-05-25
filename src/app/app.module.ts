import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//rutas
import { APP_ROUTING } from './app.router';

// componentes
import { AppComponent } from './app.component';
import { CompartidoModule } from './compartido/compartido.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EstudianteListComponent } from './Components/Estudiantes/estudiante-list/estudiante-list.component';
import { EstudianteFormComponent } from './Components/Estudiantes/estudiante-form/estudiante-form.component';
import { EstudianteDetailComponent } from './Components/Estudiantes/estudiante-detail/estudiante-detail.component';



const rutas: Routes = [
{path: '', redirectTo: 'inicio', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    EstudianteListComponent,
    EstudianteFormComponent,
    EstudianteDetailComponent
  ],
  imports: [
    BrowserModule,
    CompartidoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
