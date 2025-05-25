# Registro de Estudiantes - Proyecto Prueba Técnica

## Descripción

Aplicación web para registro y gestión de estudiantes, asignación de materias y visualización de compañeros con quienes comparten clases.  
Desarrollado con arquitectura limpia en .NET 8 para el backend y Angular para el frontend.

---

## Tecnologías utilizadas

- Backend: .NET 8, Entity Framework Core (Database First), C#  
- Frontend: Angular (compatible con Node 16.20.2)  
- Base de datos: SQL Server  
- Validaciones: FluentValidation

---

## Requisitos previos

- Visual Studio Community 2022 o superior (para backend)  
- Node.js v16.20.2 (compatible con Angular CLI v15)  
- Angular CLI v15.x (recomendado)  
- SQL Server (local o remoto)  
- Certificados SSL para Angular (archivos `server.key` y `server.crt` en carpeta `ssl`)

---

## Configuración y ejecución

### Backend (.NET 8)

1. Clona o abre el proyecto backend en Visual Studio Community.  
2. Configura la cadena de conexión en `appsettings.json` apuntando a tu base de datos SQL Server.  
3. Ejecuta la migración o carga tu base de datos con el script SQL proporcionado.  
4. Establece el proyecto backend como proyecto de inicio.  
5. Ejecuta la aplicación con `F5` o `Ctrl + F5`.  
6. La API estará disponible en `https://localhost:{puerto}/swagger` para probar los endpoints.

---

### Frontend (Angular)

1. Abre el proyecto Angular en Visual Studio Code.  
2. Asegúrate de tener los certificados SSL en la carpeta `ssl` dentro del proyecto frontend (`ssl/server.key` y `ssl/server.crt`).  
3. En la terminal integrada, ejecuta:

```bash
ng serve --ssl true --ssl-key ssl/server.key --ssl-cert ssl/server.crt
```


### Entorno de desarrollo Angular

Para este proyecto se utilizó el siguiente entorno Angular y Node.js:

```bash
ng --version

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/

Angular CLI: 10.1.7
Node: 12.14.1
OS: win32 x64

Angular: 10.1.6
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router
Ivy Workspace: Yes

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1001.7
@angular-devkit/build-angular   0.1001.7
@angular-devkit/core            10.1.7
@angular-devkit/schematics      0.1001.7
@angular/cli                    10.1.7
@schematics/angular             0.1001.7
@schematics/update              0.1001.7
rxjs                            6.6.7
typescript                      4.0.8
```
