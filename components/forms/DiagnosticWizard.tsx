"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { diagnosticSchema, type DiagnosticFormData } from "@/lib/validations/diagnostic";
import { submitDiagnosticPhase } from "@/lib/actions/submit-diagnostic";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Importación de pasos
import { OpeningStep } from "./steps/OpeningStep";
import { PersonalLeadershipStep } from "./steps/PersonalLeadershipStep";
import { OperationalManagementStep } from "./steps/OperationalManagementStep";
import { TeamDiagnosticStep } from "./steps/TeamDiagnosticStep";
import { ProblemSolvingStep } from "./steps/ProblemSolvingStep";
import { ClosingStep } from "./steps/ClosingStep";

const steps = [
  { id: "opening", title: "Apertura", component: OpeningStep },
  { id: "leadership", title: "Liderazgo Personal", component: PersonalLeadershipStep },
  { id: "management", title: "Gestión Operativa", component: OperationalManagementStep },
  { id: "team", title: "Diagnóstico de Equipo", component: TeamDiagnosticStep },
  { id: "problems", title: "Resolución de Problemas", component: ProblemSolvingStep },
  { id: "closing", title: "Cierre", component: ClosingStep },
];

export function DiagnosticWizard() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [recordId, setRecordId] = React.useState<string | undefined>(undefined);

  const methods = useForm<DiagnosticFormData>({
    resolver: zodResolver(diagnosticSchema),
    defaultValues: {
      equipo_puntaje_objetivos: 5,
      equipo_puntaje_coordinacion: 5,
      equipo_puntaje_responsabilidad: 5,
      equipo_puntaje_comunicacion: 5,
      equipo_puntaje_resolucion: 5,
    },
    mode: "onChange",
  });

  const { handleSubmit, trigger } = methods;

  const nextStep = async () => {
    // Definimos qué campos validar por paso (idealmente esto se configura por paso)
    let fieldsToValidate: any[] = [];
    if (currentStep === 0) {
      fieldsToValidate = ["nombre_apellido", "rol", "area"];
    }
    
    const isStepValid = await trigger(fieldsToValidate as any);
    if (isStepValid && currentStep < steps.length - 1) {
      setIsSubmitting(true);
      const data = methods.getValues();
      const result = await submitDiagnosticPhase(data, recordId);
      setIsSubmitting(false);

      if (result.success && result.id) {
        setRecordId(result.id);
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(result.error || "Hubo un error al guardar el progreso.");
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: DiagnosticFormData) => {
    setIsSubmitting(true);
    const result = await submitDiagnosticPhase(data, recordId);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
    } else {
      alert(result.error || "Hubo un error al enviar el formulario.");
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-8 text-center mt-12">
        <h2 className="text-2xl font-bold mb-4 text-zinc-100">¡Diagnóstico Completado!</h2>
        <p className="text-zinc-400 mb-8">
          Las respuestas han sido registradas exitosamente. El equipo analizará los resultados.
        </p>
        <Button onClick={() => window.location.reload()}>Iniciar nuevo diagnóstico</Button>
      </Card>
    );
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between text-xs text-zinc-500 mb-2 font-mono uppercase tracking-wider">
            <span>Paso {currentStep + 1} de {steps.length}</span>
            <span>{steps[currentStep].title}</span>
          </div>
          <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-zinc-100 h-full transition-all duration-300 ease-in-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="overflow-hidden border-zinc-800/60 bg-zinc-950/40">
          <CardContent className="p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8"
              >
                <CurrentStepComponent />
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0 || isSubmitting}
            className={currentStep === 0 ? "opacity-0 pointer-events-none" : ""}
          >
            Atrás
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Finalizar y Enviar"}
            </Button>
          ) : (
            <Button type="button" onClick={nextStep}>
              Siguiente
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
