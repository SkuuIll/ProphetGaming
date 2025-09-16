# Especificación del Proyecto: ProphetGaming

## 1. Resumen del Proyecto

**ProphetGaming** es una plataforma web moderna y minimalista diseñada como un centro social para jugadores. La aplicación ofrece un conjunto de herramientas para que los usuarios se conecten, interactúen y se mantengan actualizados sobre sus juegos favoritos. Su diseño es premium, enfocado en una experiencia de usuario limpia e intuitiva.

La plataforma cuenta con un panel de control personalizado, perfiles de usuario, listas de amigos, chat de texto y voz, un panel de administración y funcionalidades impulsadas por IA para la generación de avatares, tarjetas de jugador y la simulación de noticias.

## 2. Stack Tecnológico

- **Framework:** Next.js (con App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** shadcn/ui
- **Iconos:** lucide-react
- **Gráficos:** Recharts
- **Inteligencia Artificial:** Genkit (Google AI)
- **Estado y Formularios:** React Hooks, React Hook Form

## 3. Características Principales

- **Página de Presentación (`/`)**: Una página de inicio elegante que presenta la plataforma, destaca sus características clave y muestra una sección de "Últimas Noticias de Juegos" generadas por IA.
- **Panel de Control (`/dashboard`)**: La vista principal para usuarios autenticados. Incluye un feed de noticias con publicaciones de amigos y una herramienta para crear nuevas publicaciones.
- **Perfiles de Usuario (`/dashboard/profile`)**: Permite a los usuarios ver y personalizar su perfil. Incluye una herramienta de IA avanzada para generar una "Tarjeta de Jugador" completa, con fondo y lema personalizados a partir de descripciones de texto.
- **Lista de Amigos (`/dashboard/friends`)**: Muestra una cuadrícula con los amigos del usuario, sus avatares y su estado de conexión (en línea/desconectado).
- **Chat de Texto (`/dashboard/chat`)**: Una interfaz de mensajería en tiempo real con una lista de conversaciones y una ventana de chat activa.
- **Chat de Voz (`/dashboard/voice-chat`)**: Una funcionalidad inspirada en Discord con canales de voz predefinidos. Incluye controles para micrófono, audio y la capacidad de compartir pantalla.
- **Panel de Administración (`/dashboard/admin`)**: Una sección para la gestión de la plataforma. Muestra estadísticas de usuarios, contenido reportado y una tabla para la administración de usuarios. Incluye un gráfico interactivo que muestra la actividad de los usuarios.

## 4. Estructura de Archivos y Descripción

A continuación se detalla la estructura de los directorios y archivos más importantes del proyecto.

### `/` (Raíz del Proyecto)
- `next.config.ts`: Configuración de Next.js.
- `tailwind.config.ts`: Configuración de Tailwind CSS.
- `package.json`: Dependencias y scripts del proyecto.
- `tsconfig.json`: Configuración de TypeScript.
- `SPEC.md`: Este archivo.

### `src/app/` (Rutas de la Aplicación)
- `layout.tsx`: El layout raíz que define la estructura HTML principal y las fuentes.
- `globals.css`: Estilos globales y variables de tema de shadcn/ui.
- `page.tsx`: Componente de la página de presentación (Landing Page).
- **`dashboard/`**: Contiene las rutas y la lógica del panel de control.
  - `layout.tsx`: Layout principal del dashboard, que incluye la barra lateral persistente y la cabecera.
  - `page.tsx`: Página de inicio del dashboard (Feed de Noticias).
  - `admin/page.tsx`: Página del Panel de Administración.
  - `chat/page.tsx`: Página de Chat de Texto.
  - `friends/page.tsx`: Página de la Lista de Amigos.
  - `profile/page.tsx`: Página de Perfil de Usuario.
  - `voice-chat/page.tsx`: Página de Chat de Voz.

### `src/components/` (Componentes Reutilizables)
- **`admin/`**: Componentes para el panel de administración.
  - `user-stats-chart.tsx`: Gráfico interactivo que muestra la actividad de los usuarios.
- **`ai/`**: Componentes relacionados con la IA.
  - `player-card-generator.tsx`: Interfaz para que el usuario genere su tarjeta de jugador (fondo y lema) mediante un prompt.
- **`game-updates/`**: Componentes para la sección de noticias de juegos.
  - `game-updates-section.tsx`: Muestra las tarjetas con las últimas actualizaciones en la página de inicio.
- **`icons/`**: Iconos SVG personalizados.
  - `logo.tsx`: El logo de ProphetGaming.
- **`layout/`**: Componentes estructurales de la aplicación.
  - `header.tsx`: Cabecera superior del dashboard.
  - `sidebar-nav.tsx`: Menú de navegación principal en la barra lateral.
- **`newsfeed/`**: Componentes para el feed de noticias.
  - `create-post.tsx`: Formulario para crear una nueva publicación.
  - `newsfeed.tsx`: Contenedor principal que renderiza las publicaciones.
  - `newsfeed-post.tsx`: Componente para una única publicación en el feed.
- **`ui/`**: Componentes base de la biblioteca `shadcn/ui` (Button, Card, Input, etc.).
- **`user/`**: Componentes relacionados con el usuario.
  - `friend-list.tsx`: Muestra la lista de amigos en línea en la barra lateral.
  - `user-nav.tsx`: Menú desplegable del usuario en la cabecera.
  - `user-profile-card.tsx`: Tarjeta que muestra la información del perfil del usuario.

### `src/ai/` (Lógica de Inteligencia Artificial)
- `genkit.ts`: Configuración e inicialización del cliente de Genkit.
- **`flows/`**: Contiene los flujos de IA.
  - `generate-profile-picture.ts`: Flujo de Genkit que llama a un modelo de generación de imágenes para crear el avatar.
  - `generate-player-card.ts`: Flujo de Genkit para generar un fondo y un lema para la tarjeta de jugador.
  - `generate-game-updates.ts`: Flujo que simula una llamada a una API para obtener las últimas noticias de juegos.

### `src/lib/` (Librerías y Utilidades)
- `placeholder-data.ts`: Define los datos de ejemplo para usuarios, publicaciones y amigos.
- `placeholder-images.json`: Almacena los datos de las imágenes de ejemplo.
- `utils.ts`: Funciones de utilidad, como `cn` para fusionar clases de Tailwind.

### `src/hooks/` (Hooks de React Personalizados)
- `use-toast.ts`: Hook para gestionar y mostrar notificaciones (toasts).
- `use-mobile.tsx`: Hook para detectar si el dispositivo es móvil.
