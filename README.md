# RiskVision

Este es un proyecto de ciber prevención desarrollado utilizando **Node.js** como backend y **React.js** en el frontend. El proyecto incluye funcionalidad para generar un reporte detallado sobre las vulnerabilidades y riesgos detectados en los activos digitales.

---

## Contenido

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Requisitos](#requisitos)
4. [Instalación](#instalación)
   - [Clona este repositorio](#1-clona-este-repositorio)
   - [Instalacion de Node.js](#2-instalación-de-nodejs)
   - [Instalacion de React.js](#3-instalación-de-reactjs)
   - [Instalacion de Axios](#4-instalación-de-axios)
   - [Instalacion de React Router DOM](#5-instalación-de-react-router-dom)
   - [Instalacion de Bootstrap](#6-instalación-de-bootstrap)
   - [Configuracion de Firebase](#7-configuración-de-firebase)
5. [Archivos de Configuración](#archivos-de-configuración)
6. [Ejecución del Proyecto](#ejecución-del-proyecto)
7. [Contribuciones](#contribuciones)
8. [Licencia](#licencia)

---

## Descripción del Proyecto

Este proyecto es una plataforma para la prevención de riesgos en ciberseguridad con las siguientes características:^

  - Análisis de vulnerabilidades a partir de información de CVEs.
  - Evaluación de riesgos utilizando un inventario de activos digitales de la empresa.
  - Procesamiento con IA para generar reportes de vulnerabilidades y riesgos en los activos digitales.
  - Frontend responsivo y atractivo utilizando Bootstrap.
  - Autenticación y gestión de acceso mediante Firebase.
  
---

## Tecnologías Utilizadas

El proyecto está construido con las siguientes herramientas:

1. **Node.js**: Entorno de ejecución de JavaScript en el lado del servidor.
2. **React.js**: Biblioteca de JavaScript para construir interfaces de usuario.
3. **Axios**: Cliente HTTP basado en promesas para realizar peticiones al backend.
4. **React Router DOM**: Biblioteca de navegación para React que permite gestionar rutas.
5. **Bootstrap**: Framework CSS para diseño responsivo.
6. **Firebase**: Servicio en la nube utilizado para la autenticación de usuarios y base de datos.

---

## Requisitos

Asegúrate de tener instaladas las siguientes herramientas en tu sistema antes de comenzar:

1. **Node.js** v16 o superior.  
2. **npm** (viene con Node.js).
3. **Git** (para clonar el repositorio).

---

## Instalación

### 1. Clona este repositorio

```bash
git clone https://github.com/RiskVision/RiskVision.git
cd tu-repositorio

```

### 2. Instalación de Node.js

Si no tienes Node.js instalado, descárgalo desde [aquí](https://nodejs.org/en/download/) o usa un gestor de paquetes como `nvm` para instalar la versión más reciente.

```bash
# Verifica si Node.js está instalado
node -v

# Verifica si npm está instalado
npm -v

```

### 3. Instalación de React.js

React.js es una dependencia de npm. Una vez que tengas Node.j instalado, navega al directorio raíz del proyecto y ejecuta:

```bash
#Insatla todas las dependencias de React.jsy otras herramientas
npm install

```

### 4. Instalación de Axios

Axios se instala automáticamente como parte de las dependencias en package.json. Si necesitas instalarlo manualmente: 

```bash
npm install axios

```

### 5. Instalación de React Router DOM

Para la navegación entre rutas en React, ejecuta:

```bash
npm install react-router-dom

```

### 6. Instalación de Bootstrap

Bootstrap se incluye como parte de las dependencias para el diseño responsivo. Instálalo con el siguiente comando:

```bash
npm install bootstrap

```

Asegúrate de importar Bootstrap en tu archivo principal de estilos src/index.js o src/App.js:

```bash
import 'bootstrap/dist/css/bootstrap.min.css';

```

### 7. Configuración de Firebase

## Archivos de Configuración

### Archivo package.json

Este archivo incluye todas las dependencias del proyecto, así como scripts útiles:

```bash
{
  "name": "ciber-plataforma",
  "version": "1.0.0",
  "description": "Plataforma de Gestión de Usuarios",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "axios": "^0.21.1",
    "bootstrap": "^5.1.0",
    "firebase": "^9.6.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.2.0"
  }
}

```

### Ejecución del Proyecto

Una vez que todas las dependencias estén instaladas, puedes iniciar la aplicación en modo desarrollo:

```bash
npm start

```

Esto abrirá el proyecto en tu navegador en http://localhost:3000

## Contribuciones

Las contribuciones son bienvenidas. Para contribuir, sigue estos pasos:

  - Haz un fork del proyecto.
  - Crea una rama para tu feature (git checkout -b feature/nueva-funcionalidad).
  - Realiza los cambios y haz commit (git commit -m 'Descripción de los cambios').
  - Haz push de la rama (git push origin feature/nueva-funcionalidad).
  - Abre un pull request en GitHub.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más información.