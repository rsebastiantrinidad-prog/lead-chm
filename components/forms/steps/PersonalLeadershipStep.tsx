"use client";

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { type DiagnosticFormData } from "@/lib/validations/diagnostic";

export function PersonalLeadershipStep() {
  const { register } = useFormContext<DiagnosticFormData>();

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold mb-3 text-white">2. Diagnóstico de Liderazgo Personal</h2>
        <p className="text-white/70 text-base leading-relaxed mb-8">
          Basado en Maxwell. Esta sección evalúa la autopercepción, el contexto del rol y el nivel de influencia.
        </p>
      </div>

      <div className="space-y-10">
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-[#F2A900] border-b border-white/10 pb-3">
            Autopercepción
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="q_liderazgo_funciona_bien">¿Qué parte de tu liderazgo sentís que hoy funciona bien?</Label>
              <Textarea id="q_liderazgo_funciona_bien" {...register("q_liderazgo_funciona_bien")} placeholder="Ej. La comunicación diaria, la motivación..." />
            </div>

            <div className="space-y-3">
              <Label htmlFor="q_liderazgo_mas_dificil">¿Qué parte te resulta más difícil?</Label>
              <Textarea id="q_liderazgo_mas_dificil" {...register("q_liderazgo_mas_dificil")} placeholder="Ej. Dar feedback negativo, delegar..." />
            </div>

            <div className="space-y-3">
              <Label htmlFor="q_liderazgo_espera_equipo">¿Qué crees que tu equipo espera de ti como líder?</Label>
              <Textarea id="q_liderazgo_espera_equipo" {...register("q_liderazgo_espera_equipo")} />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="q_liderazgo_fortalecer">¿Qué aspectos de liderazgo te gustaría fortalecer?</Label>
              <Textarea id="q_liderazgo_fortalecer" {...register("q_liderazgo_fortalecer")} />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold text-[#F2A900] border-b border-white/10 pb-3">
            Contexto del Rol
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="q_rol_objetivo">¿Cuál es el principal objetivo de tu rol dentro del CSM?</Label>
              <Textarea id="q_rol_objetivo" {...register("q_rol_objetivo")} />
            </div>
            <div className="space-y-3">
              <Label htmlFor="q_rol_indicadores">¿Qué indicadores definen si estás haciendo bien tu trabajo?</Label>
              <Textarea id="q_rol_indicadores" {...register("q_rol_indicadores")} placeholder="Ej. Cumplimiento de metas, retención..." />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold text-[#F2A900] border-b border-white/10 pb-3">
            Influencia y Delegación
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="q_delegacion_no_cumple">¿Qué haces cuando alguien del equipo no cumple?</Label>
              <Textarea id="q_delegacion_no_cumple" {...register("q_delegacion_no_cumple")} />
            </div>
            <div className="space-y-3">
              <Label htmlFor="q_delegacion_frecuencia">¿Con qué frecuencia terminás resolviendo tareas que podrías haber delegado?</Label>
              <Textarea id="q_delegacion_frecuencia" {...register("q_delegacion_frecuencia")} placeholder="Ej. Muy seguido, casi nunca..." />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
