"use client";

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { type DiagnosticFormData } from "@/lib/validations/diagnostic";

export function ProblemSolvingStep() {
  const { register } = useFormContext<DiagnosticFormData>();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">5. Resolución de Problemas</h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          Evaluamos pensamiento sistémico y enfoque reactivo vs estructurado.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="resolucion_tecnico">Cuando aparece un problema técnico, ¿cómo lo abordan?</Label>
          <Textarea id="resolucion_tecnico" {...register("resolucion_tecnico")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="resolucion_metodo">¿Existe algún método para analizar causas?</Label>
          <Textarea id="resolucion_metodo" {...register("resolucion_metodo")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="resolucion_repiten">¿Qué problemas se repiten más?</Label>
          <Textarea id="resolucion_repiten" {...register("resolucion_repiten")} />
        </div>
      </div>
    </div>
  );
}
