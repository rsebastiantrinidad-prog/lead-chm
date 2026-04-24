import { DiagnosticWizard } from "@/components/forms/DiagnosticWizard";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col relative overflow-hidden selection:bg-zinc-800 selection:text-white">
      {/* Background Gradients para el efecto Premium / Glassmorphism */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-500 to-zinc-800 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex-1 flex flex-col">
        <div className="max-w-3xl mx-auto w-full mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-950/50 px-3 py-1 text-sm text-zinc-300 backdrop-blur-md mb-6">
            <span className="flex h-2 w-2 rounded-full bg-zinc-400 mr-2"></span>
            Diagnóstico Corporativo
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Guía de Reunión 1:1
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Levantamiento de diagnóstico real del liderazgo operativo y gestión de equipos para identificar brechas y generar indicadores base.
          </p>
        </div>

        {/* Wizard Form Component */}
        <DiagnosticWizard />
        
      </div>
    </main>
  );
}
