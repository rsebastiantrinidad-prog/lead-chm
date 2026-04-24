-- Ejecuta este script en el SQL Editor de tu proyecto en Supabase para permitir que el formulario actualice el progreso paso a paso

CREATE POLICY "Permitir actualizaciones anónimas"
ON public.diagnostico_1a1
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);
