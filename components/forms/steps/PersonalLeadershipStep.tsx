"use client";

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { type DiagnosticFormData } from "@/lib/validations/diagnostic";

export function PersonalLeadershipStep() {
  const { register } = useFormContext<DiagnosticFormData>();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">2. Diagnóstico de Liderazgo Personal</h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          Inspirado en Maxwell – Desarrollo del líder que está en usted. El objetivo es detectar el estilo de liderazgo y nivel de autoconciencia.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-zinc-200 border-b border-zinc-800 pb-2">
            Autopercepción
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="autopercepcion_significado">¿Qué significa para vos ser un buen supervisor en esta operación?</Label>
              <Textarea id="autopercepcion_significado" {...register("autopercepcion_significado")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="autopercepcion_funciona">¿Qué parte de tu liderazgo sentís que hoy funciona bien?</Label>
              <Textarea id="autopercepcion_funciona" {...register("autopercepcion_funciona")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="autopercepcion_dificil">¿Qué parte te resulta más difícil?</Label>
              <Textarea id="autopercepcion_dificil" {...register("autopercepcion_dificil")} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="autopercepcion_espera">¿Qué crees que tu equipo espera de ti como líder?</Label>
              <Textarea id="autopercepcion_espera" {...register("autopercepcion_espera")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="autopercepcion_fortalecer">¿Qué aspectos de liderazgo te gustaría fortalecer?</Label>
              <Textarea id="autopercepcion_fortalecer" {...register("autopercepcion_fortalecer")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="autopercepcion_conversaciones">¿Qué tipo de conversaciones te resultan más difíciles?</Label>
              <Textarea id="autopercepcion_conversaciones" {...register("autopercepcion_conversaciones")} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-medium text-zinc-200 border-b border-zinc-800 pb-2">
            Contexto del Rol
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contexto_objetivo">¿Cuál es el principal objetivo de tu rol dentro de tu empresa?</Label>
              <Textarea id="contexto_objetivo" {...register("contexto_objetivo")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contexto_indicadores">¿Qué indicadores definen si estás haciendo bien tu trabajo?</Label>
              <Textarea id="contexto_indicadores" {...register("contexto_indicadores")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contexto_decisiones">¿Qué decisiones tomas habitualmente?</Label>
              <Textarea id="contexto_decisiones" {...register("contexto_decisiones")} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-medium text-zinc-200 border-b border-zinc-800 pb-2">
            Influencia y Desarrollo
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="influencia_siguen">¿Tu equipo te sigue más por tu rol o por confianza personal?</Label>
              <Textarea id="influencia_siguen" {...register("influencia_siguen")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="influencia_incumplimiento">¿Qué haces cuando alguien del equipo no cumple?</Label>
              <Textarea id="influencia_incumplimiento" {...register("influencia_incumplimiento")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desarrollo_gente">¿Cómo desarrollás a tu gente?</Label>
              <Textarea id="desarrollo_gente" {...register("desarrollo_gente")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desarrollo_delega">¿Delegás o terminás resolviendo vos?</Label>
              <Textarea id="desarrollo_delega" {...register("desarrollo_delega")} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
