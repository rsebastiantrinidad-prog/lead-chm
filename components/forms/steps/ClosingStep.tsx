"use client";

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { type DiagnosticFormData } from "@/lib/validations/diagnostic";

export function ClosingStep() {
  const { register } = useFormContext<DiagnosticFormData>();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">6. Cierre</h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          Preguntas clave finales para proyectar necesidades.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cierre_mejorar_uno">Si pudieras mejorar solo una cosa del equipo, ¿qué sería?</Label>
          <Textarea id="cierre_mejorar_uno" {...register("cierre_mejorar_uno")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cierre_necesitas">¿Qué necesitarías para liderar mejor tu área?</Label>
          <Textarea id="cierre_necesitas" {...register("cierre_necesitas")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cierre_esperas">¿Qué esperás que cambie con este proceso?</Label>
          <Textarea id="cierre_esperas" {...register("cierre_esperas")} />
        </div>
      </div>
    </div>
  );
}
