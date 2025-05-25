import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from '../../../Services/estudiante.service';
import { MateriaService } from '../../../Services/materia.service';
import { Estudiante, EStudianteCreate } from '../../../Models/estudiante.model';
import { Materia } from '../../../Models/materia.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estudiante-form',
  templateUrl: './estudiante-form.component.html',
  styleUrls: ['./estudiante-form.component.css']
})
export class EstudianteFormComponent implements OnInit {
  @Input() estudiante: Estudiante | null = null;
  @Output() onSubmit = new EventEmitter<EStudianteCreate>();
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup;
  materias: Materia[] = [];
  loading = false;
  error: string | null = null;

  estudianteId: number | null = null;


  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: ['', []],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      materiaIds: [[], [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.estudianteId = this.route.snapshot.params['id'];

    this.loadMaterias().then(() => {
      if (this.estudianteId) {
        this.loadEstudiante(this.estudianteId);
      } else if (this.estudiante && !this.form.get('nombre')?.value) {
        this.patchFormValues();
      }
    });
  }

  loadEstudiante(id: number): void {
    this.loading = true;
    this.estudianteService.getById(id).subscribe({
      next: (response) => {
        console.log("ESTUDIANTE POR ID", response);
        if (response.isSuccessful) {
          this.estudiante = response.result.estudiante;
          this.patchFormValues();
        }
        this.loading = false;
      },
      error: (error) => {
        console.log("ERROR ESTUDIANTE POR ID", error.error.errorMessage);
        this.loading = false;
      }
    });
  }

  private patchFormValues(): void {
    if (this.estudiante) {
      // Forzar la actualización después de un tick
      setTimeout(() => {
        this.form.patchValue({
          id: this.estudiante.id,
          nombre: this.estudiante.nombre,
          email: this.estudiante.email,
          materiaIds: [...(this.estudiante.materiaIds || [])]  // <--- Clon
        }, { emitEvent: false });

        console.log('Valores del formulario:', this.form.value);
        console.log('Materias disponibles:', this.materias);
        console.log('Materias seleccionadas:', this.estudiante.materiaIds);
      });
    }
  }

  loadMaterias(): Promise<void> {
    return new Promise((resolve) => {
      this.loading = true;
      this.materiaService.getAll().subscribe({
        next: (response) => {
          if (response.isSuccessful) {
            this.materias = response.result.materias || [];
          }
          this.loading = false;
          resolve();
        },
        error: (error) => {
          this.loading = false;
          resolve();
        }
      });
    });
  }


  crearEstudiante(): void {

    if (this.form.valid) {
      const { Id, ...nuevoEstudiante } = this.form.value;
      delete nuevoEstudiante.id;
      console.log("CREAR ESTUDIANTE", nuevoEstudiante);
      this.loading = true;
      this.estudianteService.create(nuevoEstudiante).subscribe({
        next: (response) => {
          if (response.isSuccessful) {
            this.onSubmit.emit(this.form.value);
            alert(response.okMessage);
          } else {
            this.error = response.errorMessage || 'Error al registrar estudiante';
            alert(this.error);
          }
          this.loading = false;
          this.router.navigate(['/estudiantes']);
        },
        error: (error) => {
          this.error = 'Error: ' +  error.error.result.join('/n');
          this.loading = false;
          alert(this.error);
        }
      });
    }
  }


  actualizarEstudiante(): void {
    console.log("ACTUALIZAR ESTUDIANTE", this.form.value);
    if (this.form.valid) {
      const estudianteActualizado = {
        ...this.estudiante,
        ...this.form.value
      };

      console.log('Actualizando estudiante', estudianteActualizado);

      this.loading = true;
      this.estudianteService.update(estudianteActualizado).subscribe({
        next: (response) => {
          if (response.isSuccessful) {
            this.onSubmit.emit(this.form.value);
            alert(response.okMessage);
          } else {
            this.error = response.errorMessage || 'Error al registrar estudiante';
            alert(this.error);
          }
          this.loading = false;
          this.router.navigate(['/estudiantes']);
        },
        error: (error) => {

          this.error = 'Error: ' + error.error.result.join('/n');
          this.loading = false;
          alert(this.error);
        }
      });
    }
  }

  submitForm(): void {
    if (this.estudiante) {
      this.actualizarEstudiante();
    } else {
      this.crearEstudiante();
    }
  }

  cancelForm(): void {
    this.onCancel.emit();
    this.router.navigate(['/estudiantes']);
  }

  toggleMateria(materiaId: number): void {
    const current = [...(this.form.get('materiaIds')?.value || [])];

    if (current.includes(materiaId)) {
      this.form.get('materiaIds')?.setValue(current.filter(id => id !== materiaId));
    } else if (current.length < 3) {
      this.form.get('materiaIds')?.setValue([...current, materiaId]);
    }
  }
}
