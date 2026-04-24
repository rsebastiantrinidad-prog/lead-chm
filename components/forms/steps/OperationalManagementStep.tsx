"use client";

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { type DiagnosticFormData } from "@/lib/validations/diagnostic";

export function OperationalManagementStep() {
  const { register } = useFormContext<DiagnosticFormData>();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">3. Diagnóstico de Gestión Operativa (EOS)</h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          Basado en componentes EOS: visión, personas, datos, procesos y problemas.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-zinc-200 border-b border-zinc-800 pb-2">
            Claridad de objetivos y Prioridades
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eos_objetivos">¿Cuáles son hoy los 3 objetivos principales de tu área?</Label>
              <Textarea id="eos_objetivos" {...register("eos_objetivos")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eos_equipo_claro">¿Tu equipo los tiene claros?</Label>
              <Textarea id="eos_equipo_claro" {...register("eos_equipo_claro")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eos_prioridades">¿Cómo definís prioridades cuando todo parece urgente?</Label>
              <Textarea id="eos_prioridades" {...register("eos_prioridades")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eos_problemas_frecuentes">¿Qué tipo de problemas aparecen con mayor frecuencia?</Label>
              <Textarea id="eos_problemas_frecuentes" {...register("eos_problemas_frecuentes")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eos_tareas_criticas">¿Qué tareas o proyectos son realmente críticos hoy?</Label>
              <Textarea id="eos_tareas_criticas" {...register("eos_tareas_criticas")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eos_seguimiento">¿Cómo haces seguimiento del trabajo?</Label>
              <Textarea id="eos_seguimiento" {...register("eos_seguimiento")} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-medium text-zinc-200 border-b border-zinc-800 pb-2">
            Coordinación y Procesos
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eos_coordinacion">¿Qué tan fluida es la coordinación con otros supervisores?</Label>
              <Textarea id="eos_coordinacion" {...register("eos_coordinacion")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eos_fricciones">¿Dónde se generan más fricciones?</Label>
              <Textarea id="eos_fricciones" {...register("eos_fricciones")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eos_escalan">¿Qué tipo de decisiones escalan a la jefatura?</Label>
              <Textarea id="eos_escalan" {...register("eos_escalan")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eos_cuellos_botella">¿Dónde se producen los mayores cuellos de botella?</Label>
              <Textarea id="eos_cuellos_botella" {...register("eos_cuellos_botella")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eos_procesos_claros">¿Qué procesos están claros y cuáles se resuelven “sobre la marcha”?</Label>
              <Textarea id="eos_procesos_claros" {...register("eos_procesos_claros")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eos_problemas_repetitivos">¿Qué problemas se repiten constantemente en la operación?</Label>
              <Textarea id="eos_problemas_repetitivos" {...register("eos_problemas_repetitivos")} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
