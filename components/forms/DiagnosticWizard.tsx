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
  const [validationModalOpen, setValidationModalOpen] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState("Capturando respuestas...");

  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Volver arriba en el scroll interno cuando cambia el paso
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  React.useEffect(() => {
    if (isSubmitting) {
      const timers = [
        setTimeout(() => setLoadingText("Procesando datos..."), 2500),
        setTimeout(() => setLoadingText("Generando reporte..."), 4000),
        setTimeout(() => setLoadingText("Enviando correo ejecutivo..."), 6000),
      ];
      return () => timers.forEach(clearTimeout);
    } else {
      setLoadingText("Capturando respuestas...");
    }
  }, [isSubmitting]);

  const methods = useForm<DiagnosticFormData>({
    resolver: zodResolver(diagnosticSchema),
    defaultValues: {
      likert_coordinacion_fluida: 3,
      likert_fricciones_areas: 3,
      likert_decisiones_escalan: 3,
    },
    mode: "onChange",
  });

  const { handleSubmit, trigger } = methods;

  const nextStep = async () => {
    // Definimos qué campos validar por paso
    let fieldsToValidate: any[] = [];
    if (currentStep === 0) {
      fieldsToValidate = ["nombre_apellido", "rol", "area"];
    } else if (currentStep === 1) {
      fieldsToValidate = [
        "q_liderazgo_funciona_bien", "q_liderazgo_mas_dificil",
        "q_liderazgo_espera_equipo", "q_liderazgo_fortalecer",
        "q_rol_objetivo", "q_rol_indicadores",
        "q_delegacion_no_cumple", "q_delegacion_frecuencia"
      ];
    } else if (currentStep === 2) {
      // Pre-registrar los valores Likert para que trigger() los reconozca
      // aunque el usuario no haya movido el slider (defaultValues no se marcan como dirty)
      const currentValues = methods.getValues();
      methods.setValue("likert_coordinacion_fluida", currentValues.likert_coordinacion_fluida ?? 3, { shouldDirty: true });
      methods.setValue("likert_fricciones_areas", currentValues.likert_fricciones_areas ?? 3, { shouldDirty: true });
      methods.setValue("likert_decisiones_escalan", currentValues.likert_decisiones_escalan ?? 3, { shouldDirty: true });

      fieldsToValidate = [
        "q_eos_3_objetivos", "q_eos_claridad_roles", "q_eos_prioridades_urgentes",
        "q_eos_problemas_frecuentes", "q_eos_problemas_constantes",
        "likert_coordinacion_fluida", "likert_fricciones_areas", "likert_decisiones_escalan"
      ];
    }

    const isStepValid = await trigger(fieldsToValidate as any);
    if (!isStepValid) {
      setValidationModalOpen(true);
      return;
    }

    if (currentStep < steps.length - 1) {
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
    const fieldsToValidate = [
      "q_cierre_mejorar_una_cosa", "q_cierre_necesitas_liderar", "q_cierre_esperas_cambio"
    ];
    const isStepValid = await trigger(fieldsToValidate as any);
    if (!isStepValid) {
      setValidationModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    const result = await submitDiagnosticPhase(data, recordId);

    if (result.success) {
      const { generateAndSendReport } = await import("@/lib/actions/send-report");
      const fullData = { ...data, respuestas_json: data };
      await generateAndSendReport(fullData);
      setIsSubmitting(false);
      setIsSuccess(true);
    } else {
      setIsSubmitting(false);
      alert(result.error || "Hubo un error al enviar el formulario.");
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-8 text-center mt-12 bg-white/5 border border-white/20 shadow-xl backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-4 text-[#F2A900]">¡Diagnóstico Finalizado con Éxito!</h2>
        <p className="text-white/90 mb-6 text-lg">
          Muchas gracias por tu tiempo y sinceridad. Este es un gran paso hacia la excelencia en el liderazgo operativo de CHM Minería.
        </p>
        <p className="text-white/60 mb-8 italic">
          "El liderazgo no se trata de estar a cargo, sino de cuidar de las personas a tu cargo."
        </p>
      </Card>
    );
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <FormProvider {...methods}>
      {/* Modal de Validación */}
      <AnimatePresence>
        {validationModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-[#00205B] border border-[#F2A900]/50 p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Campos Incompletos</h3>
              <p className="text-white/70 mb-6">Por favor, completa todas las preguntas antes de avanzar.</p>
              <Button onClick={() => setValidationModalOpen(false)} className="w-full bg-[#F2A900] hover:bg-[#F2A900]/90 text-[#00205B] font-bold">
                Entendido
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay de Carga (Spinner) */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#00102e]/80 backdrop-blur-md"
          >
            <div className="w-16 h-16 border-4 border-white/20 border-t-[#F2A900] rounded-full animate-spin mb-6"></div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">Enviando Formulario</h3>
            <p className="text-[#F2A900] font-medium text-lg animate-pulse">{loadingText}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto">
        <fieldset disabled={isSubmitting} className="group">
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
              <Button type="button" onClick={nextStep} disabled={isSubmitting}>
                Siguiente
              </Button>
            )}
          </div>
        </fieldset>
      </form>
    </FormProvider>
  );
}
