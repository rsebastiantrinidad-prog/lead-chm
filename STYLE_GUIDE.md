# CHM Minería - Guía de Estilos y UI/UX (Consola LEAD)

Este documento centraliza las decisiones de diseño, paleta de colores, tipografía y arquitectura visual de la aplicación. Su objetivo es mantener la consistencia estética y funcional en futuros desarrollos de la Consola de Diagnóstico LEAD.

## 1. Identidad Visual y Paleta de Colores

La aplicación utiliza un tema oscuro por defecto (Dark Mode) adaptado a los colores corporativos de CHM Minería, transmitiendo formalidad, tecnología y enfoque gerencial.

- **Background Principal (Deep Navy):** `#00205B`
  Utilizado en el `body` (`globals.css`) y como color base en toda la aplicación. Representa la solidez y seriedad de CHM.
- **Background Secundario / Gradientes:** `#003B99`
  Se usa para los destellos y desenfoques (blur) de fondo que le dan una estética de profundidad y glassmorphism.
- **Color de Acento (CHM Gold):** `#F2A900`
  Utilizado para resaltar elementos clave:
  - Botones principales (`hover` y `active`).
  - Indicadores de progreso (Progress Bar).
  - Texto de "Objetivo Estratégico".
  - Rieles y selectores del componente `Slider`.
  - Estados de foco de los `Input` y `Textarea`.
- **Textos Secundarios:** `text-white/80` y `text-white/90`
  Garantizan alta legibilidad sin cansar la vista, en contraste con el blanco puro (`text-white`) reservado para encabezados y énfasis.
- **Tarjetas y Contenedores:** `bg-white/5` con `border-white/10`
  Para lograr un efecto transparente, moderno y elevar la jerarquía de la información sobre el fondo marino.

## 2. Tipografía

- **Fuente Global:** `Inter` (cargada mediante `next/font/google`).
  Se ha reemplazado la tipografía por defecto por *Inter* para priorizar una legibilidad excelente tanto en pantallas grandes como en dispositivos móviles.
- **Tamaños "Mobile-First":**
  - **Inputs y Labels:** Tamaño base ajustado a `16px` o superior para garantizar accesibilidad y que no exista "zoom automático" no deseado en iOS.
  - **Títulos (H1):** Responsive. `text-4xl` en móvil, escalando hasta `text-[3.5rem]` o superior en pantallas anchas (`lg`).

## 3. Arquitectura de Layout (Grid & Flex)

El diseño principal de la página de inicio (Landing/Wizard) utiliza una estructura **Split-Screen** moderna:

- **Contenedor Principal:** 
  Utiliza Flexbox para dividirse en dos columnas principales a partir de pantallas de escritorio (`lg:flex-row`).
- **Columna Izquierda (Contexto):**
  - Anclada en la parte superior (`items-start`).
  - Muestra un título y descripción *dinámicos* que cambian según el paso del formulario activo.
  - Oculta elementos no esenciales (como el carrusel de testimonios) en móvil (`hidden md:block`) para evitar obligar al usuario a hacer scroll infinito.
- **Columna Derecha (Acción):**
  - Contiene el formulario (Wizard).
  - **Scroll Interno (Crucial):** El contenido del formulario está restringido en altura (`max-h-[55vh] md:max-h-[65vh]`) y tiene `overflow-y-auto`. Esto asegura que la página global no se desplace, manteniendo el texto izquierdo y la barra de navegación del wizard siempre a la vista.

## 4. Estilos de Componentes Clave

Los componentes base de Shadcn UI fueron sobreescritos para alinear con la estética corporativa:

- **Button:**
  - `bg-[#F2A900] text-[#00205B]` para la acción primaria.
  - Hover effects: Escalado suave `scale-105` (framer motion) y brillo (shadow).
- **Input / Textarea:**
  - Fondo `bg-[#00205B]`.
  - Borde inicial sutil, que cambia a dorado `#F2A900` al hacer `focus:ring-[#F2A900]`.
- **Slider:**
  - Pista pasiva en `bg-zinc-800`.
  - Pista activa (Fill) y "Thumb" (botón deslizable) en dorado `#F2A900`.
- **Custom Scrollbar:**
  - Implementada en `globals.css` bajo la clase `.custom-scrollbar`.
  - Thumb color: `rgba(242, 169, 0, 0.5)` con hover effect.
  - Grosor de `6px` para una apariencia minimalista.

## 5. Animaciones e Interactividad

El proyecto hace un uso extenso de `framer-motion` para garantizar que la web no se sienta estática, sino como un SaaS moderno:

- **AnimatePresence:** Se usa para animar la transición (fade y slide lateral) entre las preguntas (pasos) del Wizard.
- **Scroll Infinito (Testimonios):** Carrusel horizontal continuo usando `animate={{ x: ["0%", "-50%"] }}` y transición lineal.
- **Glassmorphism Blur:** Gradientes en el fondo detrás de la aplicación con `blur-[100px]` que se animan suavemente al entrar a la página.

## 6. Manejo de Estado UI

- **Coordinación Padre-Hijo:** 
  El `DiagnosticWizard` maneja el estado del formulario internamente con `react-hook-form` y reporta cambios de paso al componente padre (`page.tsx`) a través de un callback `onStepChange`.
- **Reset de Scroll Automático:** 
  Un `useRef` en el `CardContent` se combina con un `useEffect` que observa `currentStep`. Al cambiar de fase de diagnóstico, el contenedor reinicia su scroll interno a la posición `0`, ofreciendo una experiencia ininterrumpida sin saltos globales de página.
