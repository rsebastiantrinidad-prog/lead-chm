"use client";

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { type DiagnosticFormData } from "@/lib/validations/diagnostic";

export function ClosingStep() {
  const { register } = useFormContext<DiagnosticFormData>();

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold mb-3 text-white">4. Cierre y Expectativas</h2>
        <p className="text-white/70 text-base leading-relaxed mb-8">
          Preguntas clave de cierre para sintetizar el diagnóstico.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="q_cierre_mejorar_una_cosa">Si pudieras mejorar solo una cosa del equipo, ¿qué sería?</Label>
          <Textarea id="q_cierre_mejorar_una_cosa" {...register("q_cierre_mejorar_una_cosa")} />
        </div>

        <div className="space-y-3">
          <Label htmlFor="q_cierre_necesitas_liderar">¿Qué necesitarías para liderar mejor tu área?</Label>
          <Textarea id="q_cierre_necesitas_liderar" {...register("q_cierre_necesitas_liderar")} />
        </div>

        <div className="space-y-3">
          <Label htmlFor="q_cierre_esperas_cambio">¿Qué esperás que cambie con este proceso?</Label>
          <Textarea id="q_cierre_esperas_cambio" {...register("q_cierre_esperas_cambio")} />
        </div>
      </div>
    </div>
  );
}
