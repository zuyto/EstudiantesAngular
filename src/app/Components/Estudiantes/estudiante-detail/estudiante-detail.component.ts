import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../../Services/estudiante.service';
import { MateriaService } from '../../../Services/materia.service';
import { Estudiante, EstudianteDetalle } from '../../../Models/estudiante.model';
import { Materia } from '../../../Models/materia.model';
import { ApiResponse, CompanerosResponse, EstudianteDetalleResponse, EstudiantesResponse, MateriasResponse } from 'src/app/Models/api-response.model';

@Component({
  selector: 'app-estudiante-detail',
  templateUrl: './estudiante-detail.component.html',
  styleUrls: ['./estudiante-detail.component.css']
})
export class EstudianteDetailComponent implements OnInit {
  estudiante: EstudianteDetalle | null = null;
  materias: Materia[] = [];
  loading = true;
  error: string | null = null;
  materiaSeleccionada: number | null = null;
  companeros: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.cargarEstudiante(id);
    this.cargarMaterias();
  }

  cargarEstudiante(id: number): void {
    this.estudianteService.getById(id).subscribe({
      next: (response: ApiResponse<EstudianteDetalleResponse>) => {
        console.log("RES ESTUDIANTES",response);
        if (response.isSuccessful && response.result) {
          this.estudiante = response.result.estudiante;
        } else {
          this.error = response.errorMessage || 'Error al cargar estudiante';
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

  cargarMaterias(): void {
    this.materiaService.getAll().subscribe({
      next: (response: ApiResponse<MateriasResponse>) => {
        if (response.isSuccessful && response.result) {
          this.materias = response.result.materias || [];
        } else {
          console.error('Error al cargar materias:', response.errorMessage);
        }
      },
      error: (error) => {
        console.error('Error cargando materias:', error);
      }
    });
  }

  cargarCompaneros(materiaId: number): void {
    this.materiaSeleccionada = materiaId;
    this.companeros = [];
    this.estudianteService.getCompanerosByMateria(materiaId).subscribe({
      next: (response: ApiResponse<CompanerosResponse>) => {
        if (response.isSuccessful && response.result) {
          console.log("RES ESTUDIANTES COMPANEROS",response.result.nombresCompaneros);
          this.companeros = response.result.nombresCompaneros || [];
        }
      },
      error: (error) => {
        console.error('Error cargando compañeros:', error);
      }
    });
  }

  getMateriaNombre(materiaId: number): string {
    return this.materias.find(m => m.id === materiaId)?.nombre || 'Desconocida';
  }
}
