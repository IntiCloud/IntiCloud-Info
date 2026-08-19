export type Section = {
  title: string
  content?: string
  items?: string[]
}

export type ProjectDetail = {
  id: number
  description: string
  sections: Section[]
  stack: string
  link?: string
}

export const projectDetails: Record<number, ProjectDetail> = {
  1: {
    id: 1,
    description:
      "Plataforma educativa de contenido en video bajo suscripción, diseñada para gestionar cursos, planes, usuarios, bonos, promociones y herramientas de cálculo. La arquitectura combina generación estática con Astro, componentes interactivos y Firebase como backend, incorporando además un sistema de entrega segura de videos mediante Bunny.net.",
    sections: [
      {
        title: "Funcionalidades principales",
        items: [
          "🔐 Registro e inicio de sesión con email/contraseña y Google.",
          "👤 Perfiles de usuario y gestión de suscripciones.",
          "🎓 Cursos en video con progreso por alumno.",
          "🔒 Bloqueo de contenido según nivel de suscripción.",
          "💳 Planes gratuitos y premium.",
          "📋 Catálogo de bonos con filtros y fichas detalladas.",
          "📅 Calendario de promociones.",
          "🧮 4 calculadoras de cobertura.",
          "🛠️ Panel administrativo con CRUD de usuarios, cursos, planes, bonos y eventos.",
          "📱 Diseño responsive y arquitectura basada en islas.",
        ],
      },
      {
        title: "Seguridad de contenido",
        content:
          "Los videos no se exponen mediante URLs públicas permanentes. Una Cloud Function de Firebase verifica la autenticación y el plan del usuario antes de generar una URL firmada de Bunny.net con una expiración de 30 minutos. También incorpora protección contra hotlinking, validación de rutas y watermark dinámico con el email del usuario.",
      },
      {
        title: "Arquitectura",
        items: [
          "Frontend: Astro 5 con generación estática (SSG).",
          "UI interactiva: Svelte, React, Vue, Preact y Solid según el componente.",
          "Backend: Firebase Authentication + Cloud Firestore + Cloud Functions v2.",
          "Video CDN: Bunny.net Storage + Pull Zone.",
          "Seguridad: Token Authentication + HMAC-SHA256 + Google Secret Manager.",
          "Deploy: Firebase Hosting / GitHub Codespaces.",
        ],
      },
      {
        title: "Aspectos técnicos destacados",
        items: [
          "Arquitectura serverless sin backend tradicional.",
          "Separación entre contenido público y contenido protegido.",
          "Control de acceso basado en niveles de suscripción.",
          "Servicios Firebase desacoplados de los frameworks de UI.",
          "Code splitting mediante islas de Astro.",
          "URLs de video firmadas individualmente para reducir el impacto de filtraciones.",
        ],
      },
      {
        title: "Métricas",
        items: [
          "~600 líneas de código nuevo.",
          "4 archivos de infraestructura.",
          "~4 horas de implementación y debugging.",
          "Arquitectura preparada para escalar mediante servicios serverless.",
        ],
      },
    ],
    stack: "Astro 5 · Svelte 5 · React 18 · TypeScript · Tailwind CSS 4 · Firebase · Cloud Firestore · Cloud Functions v2 · Bunny.net · GitHub Codespaces",
    link: "https://caja-fuerte-2aefe.web.app/",
  },

  3: {
    id: 3,
    description:
      "Sistema de gestión educativa desarrollado para una institución de educación inicial en Perú, orientado a centralizar la administración de estudiantes, docentes, apoderados, aulas, asistencia y calificaciones. El proyecto evolucionó desde una aplicación JavaScript vanilla hacia una arquitectura moderna basada en React 19 + TypeScript, con separación por dominios y una suite de 213 pruebas automatizadas.",
    sections: [
      {
        title: "Módulos principales",
        items: [
          "👨‍💼 Administración: gestión de estudiantes, docentes, apoderados y aulas.",
          "🧒 Matrícula: registro, edición, búsqueda por DNI y asignación de estudiantes.",
          "🏫 Gestión de aulas: capacidad, turno, grado y docente asignado.",
          "👩‍🏫 Panel docente: registro de asistencia y calificaciones.",
          "👨‍👩‍👧 Panel apoderado: consulta de asistencia, notas y reportes de sus hijos.",
          "📊 Dashboard: métricas de matrícula, ocupación por aula, grado y turno.",
          "📚 Gestión curricular: áreas y competencias por grado.",
          "☁️ Mi nube: repositorio de archivos institucionales.",
        ],
      },
      {
        title: "Sistema de calificaciones",
        content:
          "Las evaluaciones se registran por competencia y trimestre, utilizando los niveles AD, A, B y C. El sistema procesa automáticamente los resultados: Competencia → Promedio del área → Promedio trimestral → Promedio final. Los resultados permiten generar reportes para los apoderados y mantener el historial académico de cada estudiante.",
      },
      {
        title: "Sistema de asistencia",
        items: [
          "✅ Asistió",
          "⏰ Tardanza",
          "⚠️ Tardanza injustificada",
          "❌ Falta",
          "🚫 Falta injustificada",
        ],
      },
      {
        title: "Autenticación y seguridad",
        content:
          "El sistema implementa autenticación diferenciada para administradores, docentes y apoderados. El rol no se determina únicamente por la interfaz de login: después de autenticarse, se verifica el usuario contra Firebase y se valida que realmente tenga el rol solicitado. Las rutas también están protegidas para impedir que un usuario acceda directamente a otro panel mediante URL.",
      },
      {
        title: "Arquitectura",
        items: [
          "Frontend: React 19 SPA · React Router 7.",
          "Lenguaje: TypeScript en modo estricto.",
          "Estado y caché: TanStack Query 5.",
          "Backend: Firebase Authentication + Cloud Firestore + Realtime Database.",
          "Archivos: Firebase Storage.",
          "UI: Bootstrap 5 · Chart.js.",
          "Build: Vite 8 · Testing: Vitest 4 + Testing Library.",
        ],
      },
      {
        title: "Testing y calidad",
        content:
          "Suite de 213 tests distribuidos en 27 archivos, con aproximadamente 83% de cobertura de statements.",
        items: [
          "Pruebas unitarias para reglas de negocio y servicios.",
          "Pruebas de integración para páginas y componentes.",
          "Pruebas de validaciones, cálculos y asignación de aulas.",
          "Pruebas de autenticación y control de roles.",
          "Pruebas de regresión para evitar errores previamente solucionados.",
        ],
      },
    ],
    stack: "React 19 · TypeScript · Firebase · Firestore · Realtime Database · TanStack Query 5 · Vitest · Bootstrap 5 · Chart.js · Vite 8",
    link: "https://iei037santarosaaa.web.app/",
  },

  4: {
    id: 4,
    description:
      "Plataforma web interactiva desarrollada para la comunidad del streamer Bepucho en Kick, enfocada en aumentar la participación de la audiencia mediante un sistema de gamificación en tiempo real. Los usuarios acumulan Puchipuntos por tiempo de visualización y participación en el chat, que posteriormente pueden utilizar para canjear recompensas y acceder a diferentes funcionalidades de la plataforma.",
    sections: [
      {
        title: "Funcionalidades principales",
        items: [
          "🎮 Sistema de Puchipuntos: acumulación automática por tiempo de visualización y chat.",
          "📺 Live Stream Hub: reproductor de Kick integrado con seguimiento de actividad.",
          "💬 Monitor de chat en tiempo real mediante WebSockets.",
          "🎁 Tienda de recompensas: catálogo de premios con stock y sistema de canje.",
          "🔄 Gestión de canjes: estados pendiente, completado y cancelado con devolución de puntos.",
          "⚽ Data Center deportivo: partidos, resultados y tablas de posiciones.",
          "🎰 Portal de promociones y carga de comprobantes.",
          "📊 Panel administrativo: gestión de usuarios, puntos, recompensas y métricas.",
        ],
      },
      {
        title: "Motor de gamificación",
        content:
          "El sistema cuenta con un monitor independiente de Node.js que escucha los eventos del chat de Kick mediante WebSockets. Cuando el streamer se encuentra en vivo: Usuario escribe en chat → Kick WebSocket → Chat Monitor → Validación → Puchipuntos. Además, el sistema puede otorgar puntos por Watch Time, sin necesidad de que el usuario mantenga abierta la página web.",
      },
      {
        title: "Seguridad",
        items: [
          "Validación de datos mediante Zod.",
          "Sanitización contra XSS y SQL Injection.",
          "Rate limiting por IP/usuario.",
          "Cookies HttpOnly, Secure y SameSite=Strict.",
          "Nonces para protección CSRF.",
          "Verificación de que el streamer esté en vivo antes de otorgar puntos.",
          "Cooldown de mensajes para evitar farming mediante spam.",
          "Control de stock y transacciones de recompensas.",
        ],
      },
      {
        title: "Infraestructura",
        items: [
          "Frontend + API: Vercel.",
          "Base de datos: Supabase PostgreSQL.",
          "Tiempo real: WebSockets / Pusher de Kick.",
          "Worker: Node.js para monitorización continua del chat.",
          "Procesamiento deportivo: Football-Data.org API.",
        ],
      },
      {
        title: "Aspectos técnicos destacados",
        items: [
          "Gamificación en tiempo real: el monitor de chat procesa eventos directamente desde Kick.",
          "Persistencia híbrida: PostgreSQL con capa de fallback para tolerancia ante errores.",
          "Arquitectura modular: Next.js concentra frontend y API, worker independiente para el chat.",
          "Sistema anti-abuso: cooldowns, rate limiting y verificación del estado del stream.",
        ],
      },
    ],
    stack: "Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion · Zustand · Supabase · PostgreSQL · WebSockets · Kick API · Zod · Vercel · Node.js",
    link: "https://puchismo.vercel.app/",
  },

  5: {
    id: 5,
    description:
      "Plataforma digital de educación cívica y simulación electoral diseñada para ayudar a los ciudadanos peruanos a comprender el proceso de votación. Combina una plataforma web informativa y accesible con un simulador electoral inmersivo en 3D y Realidad Aumentada, permitiendo conocer candidatos, comparar propuestas y practicar virtualmente el proceso de sufragio.",
    sections: [
      {
        title: "🗳️ Plataforma de información electoral",
        items: [
          "👤 Buscador de candidatos con filtros por partido, región y propuestas.",
          "⚖️ Comparador de candidatos: propuestas, formación, trayectoria e ingresos.",
          "📋 Perfiles electorales con información organizada por categorías.",
          "📅 Cronograma electoral interactivo con hitos del proceso.",
          "🔗 Acceso a fuentes oficiales para consultar información electoral.",
        ],
      },
      {
        title: "🎮 Simulador electoral 3D",
        content:
          "Entorno inmersivo en primera persona que reproduce las principales etapas del proceso de votación: Ingreso → Presentación del DNI → Recepción de cédula → Cabina → Emisión del voto → Ánfora. El usuario se desplaza con controles en primera persona e interactúa con los elementos del centro de votación.",
      },
      {
        title: "📱 Realidad Aumentada",
        items: [
          "🗳️ Cédula electoral en AR.",
          "📦 Ánfora en AR.",
          "🪪 DNI en AR.",
          "🚪 Cabina electoral en AR.",
          "Iniciada mediante códigos QR desde dispositivos compatibles (WebXR / Model Viewer).",
        ],
      },
      {
        title: "♿ Accesibilidad e inclusión",
        items: [
          "🇵🇪 Navegación mediante comandos de voz en español y quechua.",
          "🔊 Compatibilidad con lectores de pantalla.",
          "🔠 Escalado dinámico de tipografía.",
          "👁️ Modo de alto contraste y adaptado para daltonismo.",
          "📖 Tipografía orientada a mejorar la legibilidad.",
          "👆 Áreas táctiles mínimas de 44×44 px. WCAG 2.1 AA/AAA.",
        ],
      },
      {
        title: "🔐 Privacidad y seguridad",
        items: [
          "Los comandos de voz se procesan directamente en el navegador.",
          "La simulación del voto funciona 100% Client-Side.",
          "No se almacenan selecciones de voto ni grabaciones de audio.",
          "No se almacenan datos biométricos ni se usa eval.",
          "Los recursos informativos utilizan fuentes oficiales.",
        ],
      },
      {
        title: "Arquitectura",
        items: [
          "Plataforma Web: React + TypeScript → información electoral, candidatos, comparador.",
          "Simulador: Three.js + GSAP → Canvas 2D, WebXR / Model Viewer, máquina de estados de 6 etapas.",
          "Build optimizado mediante Vite con lazy-loading de módulos pesados.",
        ],
      },
    ],
    stack: "React 18 · TypeScript · Vite · Tailwind CSS · Radix UI · Three.js · GSAP · WebXR · Model Viewer · Canvas 2D · Web Speech API · Recharts",
    link: "https://interaccionhm.vercel.app/",
  },
}
