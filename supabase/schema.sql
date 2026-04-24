-- Ejecuta este script en el SQL Editor de tu proyecto en Supabase

CREATE TABLE IF NOT EXISTS public.diagnostico_1a1 (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Info Personal
  nombre_apellido text NOT NULL,
  rol text NOT NULL,
  area text NOT NULL,
  jefe_inmediato text,
  
  -- Diagnóstico de Liderazgo Personal
  autopercepcion_significado text,
  autopercepcion_funciona text,
  autopercepcion_dificil text,
  autopercepcion_espera text,
  autopercepcion_fortalecer text,
  autopercepcion_conversaciones text,
  contexto_objetivo text,
  contexto_indicadores text,
  contexto_decisiones text,
  influencia_siguen text,
  influencia_incumplimiento text,
  desarrollo_gente text,
  desarrollo_delega text,
  
  -- Diagnóstico de Gestión Operativa (EOS)
  eos_objetivos text,
  eos_equipo_claro text,
  eos_prioridades text,
  eos_problemas_frecuentes text,
  eos_tareas_criticas text,
  eos_seguimiento text,
  eos_coordinacion text,
  eos_fricciones text,
  eos_escalan text,
  eos_cuellos_botella text,
  eos_procesos_claros text,
  eos_problemas_repetitivos text,
  
  -- Diagnóstico de Equipo (Maxwell)
  equipo_nivel text,
  equipo_alineados text,
  equipo_decisiones text,
  equipo_puntaje_objetivos integer CHECK (equipo_puntaje_objetivos >= 1 AND equipo_puntaje_objetivos <= 10),
  equipo_puntaje_coordinacion integer CHECK (equipo_puntaje_coordinacion >= 1 AND equipo_puntaje_coordinacion <= 10),
  equipo_puntaje_responsabilidad integer CHECK (equipo_puntaje_responsabilidad >= 1 AND equipo_puntaje_responsabilidad <= 10),
  equipo_puntaje_comunicacion integer CHECK (equipo_puntaje_comunicacion >= 1 AND equipo_puntaje_comunicacion <= 10),
  equipo_puntaje_resolucion integer CHECK (equipo_puntaje_resolucion >= 1 AND equipo_puntaje_resolucion <= 10),
  
  -- Resolución de problemas
  resolucion_tecnico text,
  resolucion_metodo text,
  resolucion_repiten text,
  
  -- Cierre
  cierre_mejorar_uno text,
  cierre_necesitas text,
  cierre_esperas text
);

-- Configurar RLS (Row Level Security)
ALTER TABLE public.diagnostico_1a1 ENABLE ROW LEVEL SECURITY;

-- Permitir inserción anónima (público)
CREATE POLICY "Permitir inserciones anónimas"
ON public.diagnostico_1a1
FOR INSERT
TO anon
WITH CHECK (true);

-- Opcional: Permitir lectura solo a usuarios autenticados (cuando hagas el backoffice)
CREATE POLICY "Permitir lectura a usuarios autenticados"
ON public.diagnostico_1a1
FOR SELECT
TO authenticated
USING (true);
