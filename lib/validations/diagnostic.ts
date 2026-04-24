import { z } from "zod";

export const diagnosticSchema = z.object({
  nombre_apellido: z.string().min(2, "El nombre es obligatorio"),
  rol: z.string().min(2, "El rol es obligatorio"),
  area: z.string().min(2, "El área es obligatoria"),
  jefe_inmediato: z.string().optional(),
  
  autopercepcion_significado: z.string().optional(),
  autopercepcion_funciona: z.string().optional(),
  autopercepcion_dificil: z.string().optional(),
  autopercepcion_espera: z.string().optional(),
  autopercepcion_fortalecer: z.string().optional(),
  autopercepcion_conversaciones: z.string().optional(),
  contexto_objetivo: z.string().optional(),
  contexto_indicadores: z.string().optional(),
  contexto_decisiones: z.string().optional(),
  influencia_siguen: z.string().optional(),
  influencia_incumplimiento: z.string().optional(),
  desarrollo_gente: z.string().optional(),
  desarrollo_delega: z.string().optional(),
  
  eos_objetivos: z.string().optional(),
  eos_equipo_claro: z.string().optional(),
  eos_prioridades: z.string().optional(),
  eos_problemas_frecuentes: z.string().optional(),
  eos_tareas_criticas: z.string().optional(),
  eos_seguimiento: z.string().optional(),
  eos_coordinacion: z.string().optional(),
  eos_fricciones: z.string().optional(),
  eos_escalan: z.string().optional(),
  eos_cuellos_botella: z.string().optional(),
  eos_procesos_claros: z.string().optional(),
  eos_problemas_repetitivos: z.string().optional(),
  
  equipo_nivel: z.string().optional(),
  equipo_alineados: z.string().optional(),
  equipo_decisiones: z.string().optional(),
  equipo_puntaje_objetivos: z.number().min(1).max(10).optional(),
  equipo_puntaje_coordinacion: z.number().min(1).max(10).optional(),
  equipo_puntaje_responsabilidad: z.number().min(1).max(10).optional(),
  equipo_puntaje_comunicacion: z.number().min(1).max(10).optional(),
  equipo_puntaje_resolucion: z.number().min(1).max(10).optional(),
  
  resolucion_tecnico: z.string().optional(),
  resolucion_metodo: z.string().optional(),
  resolucion_repiten: z.string().optional(),
  
  cierre_mejorar_uno: z.string().optional(),
  cierre_necesitas: z.string().optional(),
  cierre_esperas: z.string().optional(),
});

export type DiagnosticFormData = z.infer<typeof diagnosticSchema>;
