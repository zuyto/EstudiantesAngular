// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApi:  "https://localhost:7001",
  EstudianteRegistrar:  "/api/Estudiantes/Registrar",
  EstudianteActualizar:  "/api/Estudiantes/Actualizar",
  EstudianteTodos:  "/api/Estudiantes/GetAllEstudiantes",
  CompanerosTodos:  "/api/Estudiantes/GetCompaneros",
  EstudiantesPorId:  "/api/Estudiantes/EstudiantesPorId",
  MateriasTodas:  "/api/Materias/GetMaterias",
  ProfesorPorMateria:  "/api/Profesores/GetProfesorPorMateria"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
