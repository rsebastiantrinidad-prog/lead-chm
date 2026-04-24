"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { type DiagnosticFormData } from "@/lib/validations/diagnostic";

export function TeamDiagnosticStep() {
  const { register, control } = useFormContext<DiagnosticFormData>();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">4. Diagnóstico de Equipo</h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          Inspirado en Maxwell (Trabajo en equipo) – Ley del Marcador y Ley de la Cadena.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-zinc-200 border-b border-zinc-800 pb-2">
            Percepción General
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="equipo_nivel">¿Cómo describirías el nivel actual del equipo?</Label>
              <Textarea id="equipo_nivel" {...register("equipo_nivel")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="equipo_alineados">¿Qué tan alineados están entre supervisores?</Label>
              <Textarea id="equipo_alineados" {...register("equipo_alineados")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="equipo_decisiones">¿Hay decisiones que se discuten siempre o nunca quedan claras?</Label>
              <Textarea id="equipo_decisiones" {...register("equipo_decisiones")} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-medium text-zinc-200 border-b border-zinc-800 pb-2">
            Puntuación del Equipo (1 al 10)
          </h3>
          <div className="space-y-6 bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
            <div className="space-y-3">
              <Label>Claridad de objetivos</Label>
              <Controller
                name="equipo_puntaje_objetivos"
                control={control}
                render={({ field }) => (
                  <Slider min={1} max={10} step={1} value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>
            
            <div className="space-y-3">
              <Label>Coordinación entre áreas</Label>
              <Controller
                name="equipo_puntaje_coordinacion"
                control={control}
                render={({ field }) => (
                  <Slider min={1} max={10} step={1} value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>

            <div className="space-y-3">
              <Label>Responsabilidad individual</Label>
              <Controller
                name="equipo_puntaje_responsabilidad"
                control={control}
                render={({ field }) => (
                  <Slider min={1} max={10} step={1} value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>

            <div className="space-y-3">
              <Label>Comunicación</Label>
              <Controller
                name="equipo_puntaje_comunicacion"
                control={control}
                render={({ field }) => (
                  <Slider min={1} max={10} step={1} value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>

            <div className="space-y-3">
              <Label>Resolución de problemas</Label>
              <Controller
                name="equipo_puntaje_resolucion"
                control={control}
                render={({ field }) => (
                  <Slider min={1} max={10} step={1} value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
