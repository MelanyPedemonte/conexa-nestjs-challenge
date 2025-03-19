# Instrucciones para ejecutar y probar la aplicación localmente

## Requisitos previos

1. **Node.js**
2. **PostgreSQL**

## Pasos para ejecutar la aplicación

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/MelanyPedemonte/conexa-nestjs-challenge.git
cd conexa-nestjs-challenge
```

### 2. Instalar las dependencias

Instala las dependencias necesarias utilizando `npm`:

```bash
npm install
```

### 3. Configurar la base de datos local 

 Asegúrate de que el servicio de PostgreSQL esté corriendo.

  ##### Crear una base de datos en PostgreSQL

  ```bash
  psql -U postgres
  CREATE DATABASE nombre_de_base_de_datos;
  ```

  ##### Configurar las variables de entorno

  Copia el archivo `.env.example` y renómbralo a `.env` para configurar tus credenciales:

  ```bash
  cp .env.example .env
  ```
### 4. Iniciar la aplicación 

```bash
  npm run start:dev
  ```

### 5. Ejecutar pruebas

```bash
  npm run test
  ```