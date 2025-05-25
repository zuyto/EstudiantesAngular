export interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  materiaIds?: number[];
}

export interface EStudianteCreate {
  id: number;
  nombre: string;
  email: string;
  materiaIds: number[];
}

export interface EstudianteDetalle {
  id: number;
  nombre: string;
  email: string;
  materiaIds: number[];
}




