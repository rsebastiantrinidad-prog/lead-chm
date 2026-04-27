"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type DiagnosticFormData } from "@/lib/validations/diagnostic";

export function OpeningStep() {
  const { register, formState: { errors } } = useFormContext<DiagnosticFormData>();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">1. Apertura y Contexto</h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          Estas conversaciones tienen como objetivo entender cómo están gestionando el liderazgo operativo hoy. No es una evaluación individual sino un diagnóstico del sistema de trabajo del equipo para mejorar la coordinación y efectividad.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-zinc-200 border-b border-zinc-800 pb-2">
          Información del Supervisor
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre_apellido">Nombre y Apellido *</Label>
            <Input
              id="nombre_apellido"
              placeholder="Ej. Juan Pérez"
              {...register("nombre_apellido")}
            />
            {errors.nombre_apellido && (
              <p className="text-red-400 text-xs mt-1">{errors.nombre_apellido.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rol">Rol / Cargo *</Label>
              <Input
                id="rol"
                placeholder="Ej. Supervisor de Planta"
                {...register("rol")}
              />
              {errors.rol && (
                <p className="text-red-400 text-xs mt-1">{errors.rol.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Área *</Label>
              <Input
                id="area"
                placeholder="Ej. Producción"
                {...register("area")}
              />
              {errors.area && (
                <p className="text-red-400 text-xs mt-1">{errors.area.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jefe_inmediato">Nombre del Jefe Inmediato</Label>
            <Input
              id="jefe_inmediato"
              placeholder="Ej. María Gómez"
              {...register("jefe_inmediato")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
