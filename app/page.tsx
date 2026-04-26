"use client";

import { useState } from "react";
import { DiagnosticWizard } from "@/components/forms/DiagnosticWizard";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const STEP_INFO = [
  {
    title: "Apertura",
    description: "Ingresa los datos generales del evaluado para comenzar. Esto nos permite contextualizar los resultados dentro de tu área operativa."
  },
  {
    title: "Liderazgo Personal",
    description: "Evaluación profunda de la autopercepción, capacidad de influencia y estrategias de desarrollo de las personas a tu cargo."
  },
  {
    title: "Gestión Operativa",
    description: "Revisión táctica de prioridades, cuellos de botella y procesos bajo el enfoque del sistema EOS (Traction)."
  },
  {
    title: "Diagnóstico de Equipo",
    description: "Medición de la percepción general del equipo y puntuación clave de claridad, coordinación y comunicación cruzada."
  },
  {
    title: "Resolución de Problemas",
    description: "Análisis de la capacidad técnica y metodológica para anticipar y resolver incidencias repetitivas en campo."
  },
  {
    title: "Cierre",
    description: "Conclusiones finales, áreas de mejora prioritarias y expectativas clave para las próximas semanas."
  }
];

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#00205B]">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#003B99] to-transparent blur-[100px] mix-blend-screen" />
      </div>

      {/* Header Fijo */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full relative z-50 px-6 py-6 md:px-12 md:py-8"
      >
        <div className="relative w-56 h-16 md:w-[18rem] md:h-20">
          <Image 
            src="/logo-chm.png" 
            alt="CHM Minería" 
            fill
            style={{ objectFit: 'contain', objectPosition: 'left' }}
            priority
          />
        </div>
      </motion.header>

      {/* Objetivo Global */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container mx-auto px-6 relative z-10 text-center mt-2 mb-8 md:mb-12"
      >
        <div className="inline-block bg-white/5 border border-white/10 rounded-full px-8 py-3 shadow-xl backdrop-blur-sm">
          <p className="text-white/90 text-base md:text-lg font-medium tracking-wide">
            <span className="text-[#F2A900] font-bold mr-3 uppercase tracking-wider text-sm md:text-base">Objetivo Estratégico:</span> 
            Potenciar el desarrollo del liderazgo operativo mediante un <strong className="text-white font-bold">Diagnóstico 1:1</strong> estructurado y accionable.
          </p>
        </div>
      </motion.div>

      {/* Main Content Grid/Flex Breakpoints */}
      {/* Cuidado con items-center: items-start asegura que aparezca más arriba */}
      <div className="container mx-auto px-6 pb-20 relative z-10 flex-1 flex flex-col lg:flex-row items-start justify-center gap-16 lg:gap-24">

        
        {/* Left Column: Text & Testimonials */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight mb-6 text-white drop-shadow-md leading-tight">
                {STEP_INFO[activeStep]?.title || "Guía de Reunión 1:1"}
              </h1>
              
              <p className="text-white/80 text-lg md:text-2xl max-w-xl font-medium leading-relaxed">
                {STEP_INFO[activeStep]?.description || "Levantamiento de diagnóstico real del liderazgo operativo."}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial Scroller (Tarjetas desplazables) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full overflow-hidden relative max-w-xl hidden md:block" // Hidden on mobile so it doesn't push form down too much
          >
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#00205B] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#00205B] to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              animate={{ x: ["0%", "-50%"] }} 
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex gap-6 whitespace-nowrap pl-6"
            >
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-6">
                  {/* Card 1 */}
                  <div className="inline-block bg-white/5 border border-white/10 p-6 rounded-2xl w-[320px] whitespace-normal shadow-xl">
                    <p className="text-white/90 text-base italic leading-relaxed">
                      "El diagnóstico nos permitió ver brechas que antes pasábamos por alto en las reuniones."
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F2A900]/20 flex items-center justify-center text-[#F2A900] font-bold text-lg">
                        L
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Líder Operativo</p>
                        <p className="text-xs text-[#F2A900]">Gestión de Equipos</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="inline-block bg-white/5 border border-white/10 p-6 rounded-2xl w-[320px] whitespace-normal shadow-xl">
                    <p className="text-white/90 text-base italic leading-relaxed">
                      "Una herramienta clave para la estandarización de procesos y seguimiento."
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center text-blue-300 font-bold text-lg">
                        S
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Supervisor</p>
                        <p className="text-xs text-blue-300">Operaciones</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: Wizard Form Component */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-xl">
            <DiagnosticWizard onStepChange={setActiveStep} />
          </div>
        </motion.div>
        
      </div>
    </main>
  );
}
