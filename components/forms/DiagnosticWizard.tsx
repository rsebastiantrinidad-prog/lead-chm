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
import { ClosingStep } from "./steps/ClosingStep";

const steps = [
  { id: "opening", title: "Apertura", component: OpeningStep },
  { id: "leadership", title: "Liderazgo Personal", component: PersonalLeadershipStep },
  { id: "management", title: "Gestión Operativa", component: OperationalManagementStep },
  { id: "closing", title: "Cierre", component: ClosingStep },
];

interface DiagnosticWizardProps {
  onStepChange?: (stepIndex: number) => void;
}

export function DiagnosticWizard({ onStepChange }: DiagnosticWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [recordId, setRecordId] = React.useState<string | undefined>(undefined);
  
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Volver arriba en el scroll interno cuando cambia el paso
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

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
    // Definimos qué campos validar por paso
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
        const next = currentStep + 1;
        setCurrentStep(next);
        if (onStepChange) onStepChange(next);
      } else {
        alert(result.error || "Hubo un error al guardar el progreso.");
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      if (onStepChange) onStepChange(prev);
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
      <Card className="w-full max-w-2xl mx-auto p-8 text-center mt-12 bg-white/5 border border-white/20 shadow-xl backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 text-[#F2A900]">¡Diagnóstico Completado!</h2>
        <p className="text-white/80 mb-8">
          Las respuestas han sido registradas exitosamente. El equipo analizará los resultados.
        </p>
        <Button onClick={() => window.location.reload()} className="w-full">Iniciar nuevo diagnóstico</Button>
      </Card>
    );
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between text-xs text-[#F2A900] mb-2 font-mono uppercase tracking-wider">
            <span>Paso {currentStep + 1} de {steps.length}</span>
            <span>{steps[currentStep].title}</span>
          </div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-[#F2A900] h-full transition-all duration-300 ease-in-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl rounded-2xl">
          <CardContent 
            ref={scrollRef}
            className="p-0 max-h-[55vh] md:max-h-[65vh] overflow-y-auto custom-scrollbar relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-10"
              >
                <CurrentStepComponent />
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className={`flex mt-8 ${currentStep === 0 ? "justify-end" : "justify-between"}`}>
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={isSubmitting}
            >
              Atrás
            </Button>
          )}

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
