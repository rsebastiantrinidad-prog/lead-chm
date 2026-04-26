import { z } from "zod";

export const diagnosticSchema = z.object({
  // Paso 1: Apertura
  nombre_apellido: z.string().min(2, "El nombre es obligatorio"),
  rol: z.string().min(2, "El rol es obligatorio"),
  area: z.string().min(2, "El área es obligatoria"),
  jefe_inmediato: z.string().optional(),
  
  // Paso 2: Liderazgo Personal (Maxwell)
  q_liderazgo_funciona_bien: z.string().optional(),
  q_liderazgo_mas_dificil: z.string().optional(),
  q_liderazgo_espera_equipo: z.string().optional(),
  q_liderazgo_fortalecer: z.string().optional(),
  q_rol_objetivo: z.string().optional(),
  q_rol_indicadores: z.string().optional(),
  q_delegacion_no_cumple: z.string().optional(),
  q_delegacion_frecuencia: z.string().optional(),

  // Paso 3: Gestión Operativa (EOS)
  q_eos_3_objetivos: z.string().optional(),
  q_eos_claridad_roles: z.string().optional(),
  q_eos_prioridades_urgentes: z.string().optional(),
  q_eos_problemas_frecuentes: z.string().optional(),
  q_eos_problemas_constantes: z.string().optional(),
  
  // Escala Likert (Coordinación)
  likert_coordinacion_fluida: z.number().min(1).max(5).optional(),
  likert_fricciones_areas: z.number().min(1).max(5).optional(),
  likert_decisiones_escalan: z.number().min(1).max(5).optional(),

  // Paso 4: Cierre
  q_cierre_mejorar_una_cosa: z.string().optional(),
  q_cierre_necesitas_liderar: z.string().optional(),
  q_cierre_esperas_cambio: z.string().optional(),
});

export type DiagnosticFormData = z.infer<typeof diagnosticSchema>;
