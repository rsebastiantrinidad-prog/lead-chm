"use client";

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { type DiagnosticFormData } from "@/lib/validations/diagnostic";

export function OperationalManagementStep() {
  const { register, setValue, watch } = useFormContext<DiagnosticFormData>();

  const valCoordinacion = watch("likert_coordinacion_fluida") || 3;
  const valFricciones = watch("likert_fricciones_areas") || 3;
  const valDecisiones = watch("likert_decisiones_escalan") || 3;

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold mb-3 text-white">3. Gestión Operativa (EOS)</h2>
        <p className="text-white/70 text-base leading-relaxed mb-8">
          Sección enfocada en detectar falta de claridad, microgestión, improvisación y trabajo en silos. <small className="text-white/50">Tómate tu tiempo, pero si no tienes una respuestas, coloca un -</small>
        </p>
      </div>

      <div className="space-y-10">
        {/* Preguntas de Texto */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-[#F2A900] border-b border-white/10 pb-3">
            Claridad y Prioridades
          </h3>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="q_eos_3_objetivos">¿Cuáles son hoy los 3 objetivos principales de tu área?</Label>
              <Textarea id="q_eos_3_objetivos" {...register("q_eos_3_objetivos")} />
            </div>

            <div className="space-y-3">
              <Label htmlFor="q_eos_claridad_roles">¿Tu equipo tiene claridad sobre qué se espera de cada rol y cómo se mide su desempeño?</Label>
              <Textarea id="q_eos_claridad_roles" {...register("q_eos_claridad_roles")} />
            </div>

            <div className="space-y-3">
              <Label htmlFor="q_eos_prioridades_urgentes">¿Cómo definís prioridades cuando todo parece urgente?</Label>
              <Textarea id="q_eos_prioridades_urgentes" {...register("q_eos_prioridades_urgentes")} />
            </div>

            <div className="space-y-3">
              <Label htmlFor="q_eos_problemas_frecuentes">¿Qué tipo de problemas aparecen con mayor frecuencia en tu área?</Label>
              <Textarea id="q_eos_problemas_frecuentes" {...register("q_eos_problemas_frecuentes")} />
            </div>

            <div className="space-y-3">
              <Label htmlFor="q_eos_problemas_constantes">¿Qué problemas se repiten constantemente en la gestión de tus tareas y objetivos?</Label>
              <Textarea id="q_eos_problemas_constantes" {...register("q_eos_problemas_constantes")} />
            </div>
          </div>
        </section>

        {/* Evaluación de Coordinación (Likert) */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-[#F2A900] border-b border-white/10 pb-3">
            Evaluación de Coordinación
          </h3>
          <p className="text-sm text-white/60 mb-6">
            Escala del 1 al 5 (1 = Totalmente en desacuerdo, 5 = Totalmente de acuerdo).
          </p>

          <div className="space-y-8 bg-white/5 p-6 rounded-xl border border-white/10">
            {/* Likert 1 */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base text-white w-3/4">"La coordinación entre supervisores en la operación diaria es fluida y efectiva".</Label>
              </div>
              <Slider
                min={1}
                max={5}
                step={1}
                value={valCoordinacion}
                onChange={(e) => setValue("likert_coordinacion_fluida", parseInt(e.target.value), { shouldValidate: true, shouldDirty: true })}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-white/50 px-1">
                <span>1 - Desacuerdo</span>
                <span>5 - De acuerdo</span>
              </div>
            </div>

            {/* Likert 2 */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base text-white w-3/4">"Existen fricciones o cuellos de botella frecuentes en la interacción entre áreas".</Label>
              </div>
              <Slider
                min={1}
                max={5}
                step={1}
                value={valFricciones}
                onChange={(e) => setValue("likert_fricciones_areas", parseInt(e.target.value), { shouldValidate: true, shouldDirty: true })}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-white/50 px-1">
                <span>1 - Desacuerdo</span>
                <span>5 - De acuerdo</span>
              </div>
            </div>

            {/* Likert 3 */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base text-white w-3/4">"Las decisiones operativas se resuelven en el nivel de supervisión sin escalar a jefatura".</Label>
              </div>
              <Slider
                min={1}
                max={5}
                step={1}
                value={valDecisiones}
                onChange={(e) => setValue("likert_decisiones_escalan", parseInt(e.target.value), { shouldValidate: true, shouldDirty: true })}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-white/50 px-1">
                <span>1 - Desacuerdo</span>
                <span>5 - De acuerdo</span>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
