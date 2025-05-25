import { Estudiante, EstudianteDetalle } from "./estudiante.model";
import { Materia } from "./materia.model";
import { Profesor } from "./profesor.model";

export interface ApiResponse<T> {
  isSuccessful: boolean;
  isError: boolean;
  errorMessage: string;
  okMessage: string;
  result: T;
  messages?: string[];
}

export interface MateriasResponse {
  materias: Materia[];
}

export interface EstudiantesResponse {
  estudiantes: Estudiante[];
}

export interface EstudianteDetalleResponse {
  estudiante: EstudianteDetalle;
}

export interface ProfesoresMateriaResponse {
  materiaProfesor: Profesor[];
}

export interface CompanerosResponse {
  nombresCompaneros: string[];
}
