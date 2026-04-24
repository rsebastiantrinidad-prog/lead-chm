"use server";

import { createClient } from "@supabase/supabase-js";
import { diagnosticSchema, DiagnosticFormData } from "../validations/diagnostic";

// Creamos una función helper para obtener el cliente, así evitamos
// el error de evaluación en el top-level si las variables aún no cargan.
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // Usamos la Service Role Key para saltar el RLS en el servidor (INSERT/UPDATE/SELECT)
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(supabaseUrl, supabaseKey);
}

export async function submitDiagnosticPhase(data: Partial<DiagnosticFormData>, id?: string) {
  try {
    const supabase = getSupabaseClient();
    
    // Validar parcialmente en el servidor
    const validatedData = diagnosticSchema.partial().parse(data);
    
    if (id) {
      // Si ya hay un ID, actualizamos la fila existente
      const { error } = await supabase
        .from("diagnostico_1a1")
        .update(validatedData)
        .eq("id", id);
        
      if (error) {
        console.error("Error al actualizar en Supabase:", error);
        return { success: false, error: "Error al actualizar los datos." };
      }
      
      return { success: true, id };
    } else {
      // Si no hay ID, insertamos y retornamos el nuevo ID generado
      const { data: insertedData, error } = await supabase
        .from("diagnostico_1a1")
        .insert([validatedData])
        .select("id")
        .single();
        
      if (error) {
        console.error("Error al insertar en Supabase:", error);
        return { success: false, error: "Error al crear el registro." };
      }
      
      return { success: true, id: insertedData.id };
    }
  } catch (err) {
    console.error("Error de validación o servidor:", err);
    return { success: false, error: "Error de validación o formato incorrecto." };
  }
}
