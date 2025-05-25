import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from '../../../Services/estudiante.service';
import { MateriaService } from '../../../Services/materia.service';
import { Estudiante } from '../../../Models/estudiante.model';
import { Materia } from '../../../Models/materia.model';
import { ApiResponse, MateriasResponse, EstudiantesResponse } from '../../../Models/api-response.model';

@Component({
  selector: 'app-estudiante-list',
  templateUrl: './estudiante-list.component.html',
  styleUrls: ['./estudiante-list.component.css']
})
export class EstudianteListComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  materias: Materia[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private estudianteService: EstudianteService,
    private materiaService: MateriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    this.error = null;

    this.materiaService.getAll().subscribe({
      next: (response: ApiResponse<MateriasResponse>) => {
        console.log("RES MATERIAS",response);
        if (response.isSuccessful && response.result) {
          this.materias = response.result.materias || [];
          this.cargarEstudiantes();
        } else {
          this.error = response.errorMessage || 'Error al cargar materias';
          this.loading = false;
        }
      },
      error: (error) => {
        console.log("ERROR MATERIAS",error);
        this.error = 'Error cargando materias: ' + error.error.errorMessage;
        this.loading = false;
      }
    });
  }

  cargarEstudiantes(): void {
    this.estudianteService.getAll().subscribe({
      next: (response: ApiResponse<EstudiantesResponse>) => {
        console.log("RES ESTUDIANTES",response);

        if (response.isSuccessful && response.result) {
          this.estudiantes = response.result.estudiantes || [];
        } else {
          this.error = response.errorMessage || 'Error al cargar estudiantes';
        }
        this.loading = false;
      },
      error: (error) => {
        console.log("ERROR ESTUDIANTES",error);
        this.error = 'Error cargando estudiantes: ' + error.error.errorMessage;
        this.loading = false;
      }
    });
  }

  getNombresMaterias(materiaIds: number[]): string {
    if (!materiaIds || materiaIds.length === 0) return 'Ninguna';
    return materiaIds.map(id =>
      this.materias.find(m => m.id === id)?.nombre || 'Desconocida'
    ).join(', ');
  }

  editarEstudiante(id: number): void {
    console.log("ID ESTUDIANTE",id);
    this.router.navigate(['/estudiantes/editar', id]);
  }

  verDetalle(id: number): void {
    console.log("ID ESTUDIANTE DETALLE",id);
    this.router.navigate(['/estudiantes', id]);
  }
}
