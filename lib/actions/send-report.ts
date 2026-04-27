"use server";

import { Resend } from "resend";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateAndSendReport(diagnosticData: any) {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;
    const toEmail = process.env.RESEND_TO_EMAIL;

    if (!resendKey || !geminiKey || !toEmail) {
      console.error("Faltan variables de entorno para el reporte.");
      return { success: false, error: "Configuración incompleta en el servidor." };
    }

    const resend = new Resend(resendKey);
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 1. Preparamos el Prompt para Gemini (Pidiendo JSON estructurado + Narrativa)
    const prompt = `
      Actúa como un Consultor Senior experto en Liderazgo y Procesos. 
      Analiza los siguientes resultados de un Diagnóstico 1:1 corporativo.
      
      DATOS DEL EVALUADO:
      - Nombre: ${diagnosticData.nombre_apellido}
      - Rol: ${diagnosticData.rol}
      - Área: ${diagnosticData.area}
      
      RESPUESTAS DEL DIAGNÓSTICO (en formato JSON):
      ${JSON.stringify(diagnosticData.respuestas_json || diagnosticData, null, 2)}
      
      TAREA:
      Debes responder ÚNICAMENTE con un objeto JSON (sin bloques de código markdown) que contenga:
      1. "scores": Un objeto con puntajes del 1 al 10 para: "Claridad", "Coordinacion", "Autonomia", "Procesos", "Problemas".
      2. "matrix": Un objeto con las etiquetas cualitativas (Baja/Media/Alta) para las mismas variables.
      3. "analysis": El informe ejecutivo de 5 párrafos (Introducción, Liderazgo, Gestión/Procesos, Riesgos, Conclusión).

      TENER EN CUENTA
      1. Ser concreto en el anáisis. 
      2. Detalla en cada parrafo bullets point con hallazgos en base a sus respuestas.
      2. Mantener un mensaje directo, claro y objetivo. 
      3. Evitar generalizaciones y buscar patrones específicos en las respuestas.
      4. Usar un lenguaje profesional y técnico, acorde a un informe ejecutivo.
      5. Redaccion sintetica y concreta
      
      EJEMPLO DE RESPUESTA:
      {
        "scores": {"Claridad": 7, "Coordinacion": 5, ...},
        "matrix": {"Claridad": "Media", ...},
        "analysis": "..."
      }
    `;

    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();

    // Limpiamos la respuesta de posibles bloques de código markdown
    const cleanJsonText = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
    const dataIA = JSON.parse(cleanJsonText);

    // 2. Construimos la URL del gráfico de radar con QuickChart
    const chartConfig = {
      type: 'radar',
      data: {
        labels: ['Claridad', 'Coordinación', 'Autonomía', 'Procesos', 'Problemas'],
        datasets: [{
          label: 'Perfil de Liderazgo',
          data: [
            dataIA.scores.Claridad,
            dataIA.scores.Coordinacion,
            dataIA.scores.Autonomia,
            dataIA.scores.Procesos,
            dataIA.scores.Problemas
          ],
          backgroundColor: 'rgba(242, 169, 0, 0.2)',
          borderColor: '#F2A900',
          pointBackgroundColor: '#F2A900',
        }]
      },
      options: {
        scale: {
          ticks: { min: 0, max: 10, stepSize: 2 }
        }
      }
    };
    const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}&width=500&height=300`;

    // 3. Generamos la tabla de respuestas crudas para el anexo
    const respuestasMap = diagnosticData.respuestas_json || diagnosticData;
    const tableRows = Object.entries(respuestasMap)
      .filter(([key]) => key.startsWith('q_') || key.startsWith('likert_'))
      .map(([key, value]) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-size: 13px; color: #666; width: 40%; font-weight: bold;">
            ${key.replace(/q_|likert_/g, '').replace(/_/g, ' ').toUpperCase()}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-size: 13px; color: #333;">
            ${value}
          </td>
        </tr>
      `).join('');

    // 4. Enviamos el Email con el nuevo Template Visual
    const { data, error } = await resend.emails.send({
      from: "CHM Liderazgo <onboarding@resend.dev>",
      to: [toEmail],
      subject: `REPORTE EJECUTIVO: ${diagnosticData.nombre_apellido} - ${diagnosticData.area}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; max-width: 700px; margin: auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; background: #fff;">
          
          <!-- Header -->
          <div style="background: #00205B; padding: 30px; text-align: center;">
            <h1 style="color: #F2A900; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Informe de Diagnóstico LEAD</h1>
            <p style="color: #fff; margin: 10px 0 0 0; opacity: 0.8;">CHM Minería | Gestión de Liderazgo Operativo</p>
          </div>

          <div style="padding: 30px;">
            <!-- Info Líder -->
            <div style="margin-bottom: 30px; padding: 15px; background: #f8f9fa; border-left: 4px solid #F2A900; border-radius: 4px;">
              <p style="margin: 5px 0;"><strong>Líder:</strong> ${diagnosticData.nombre_apellido}</p>
              <p style="margin: 5px 0;"><strong>Rol/Cargo:</strong> ${diagnosticData.rol}</p>
              <p style="margin: 5px 0;"><strong>Área:</strong> ${diagnosticData.area}</p>
            </div>

            <!-- Gráfico y Matriz -->
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="color: #00205B; font-size: 18px; border-bottom: 2px solid #F2A900; display: inline-block; padding-bottom: 5px;">Visualización de Perfil</h2>
              <div style="margin-top: 20px;">
                <img src="${chartUrl}" alt="Gráfico de Radar" style="max-width: 100%; height: auto; border-radius: 8px;" />
              </div>
            </div>

            <!-- Matriz de Indicadores -->
            <div style="margin-bottom: 20px;">
              <h2 style="color: #00205B; font-size: 18px;">Matriz de Desempeño</h2>
              <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px;">
                ${Object.entries(dataIA.matrix).map(([key, val]) => `
                  <div style="background: #f0f0f0; padding: 8px 12px; border-radius: 20px; font-size: 12px; margin-bottom: 8px; margin-right: 8px; display: inline-block;">
                    <strong>${key}:</strong> <span style="color: ${val === 'Alta' || val === 'Estructurada' ? '#28a745' : val === 'Media' ? '#fd7e14' : '#dc3545'}">${val}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Referencias del Gráfico -->
            <div style="margin-bottom: 40px; background: #f8f9fa; padding: 15px; border-radius: 8px; font-size: 13px; color: #555; line-height: 1.5; border: 1px solid #eee;">
              <h3 style="color: #00205B; font-size: 14px; margin-top: 0; margin-bottom: 10px;">Referencias de Evaluación</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li><strong>Claridad:</strong> Nivel de comprensión de los objetivos estratégicos y el alcance del rol.</li>
                <li><strong>Coordinación:</strong> Fluidez de comunicación, alineación y trabajo en equipo entre áreas.</li>
                <li><strong>Autonomía:</strong> Capacidad de delegación efectiva y toma de decisiones de forma independiente.</li>
                <li><strong>Procesos:</strong> Nivel de estructuración, documentación y estandarización de tareas críticas.</li>
                <li><strong>Problemas:</strong> Eficacia en la detección, gestión y resolución de problemas (reactivo vs proactivo).</li>
              </ul>
            </div>

            <!-- Análisis Narrativo -->
            <div style="margin-bottom: 40px; line-height: 1.7; color: #444; font-size: 15px;">
              <h2 style="color: #00205B; font-size: 18px;">Análisis Ejecutivo</h2>
              <div style="background: #fff; border: 1px solid #eee; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                ${dataIA.analysis.replace(/\n\n/g, '</div><div style="margin-top: 15px;">').replace(/\n/g, '<br/>')}
              </div>
            </div>

            <!-- Anexo de Respuestas -->
            <div style="margin-top: 50px; border-top: 1px solid #eee; padding-top: 30px;">
              <h2 style="color: #00205B; font-size: 16px; opacity: 0.7;">Anexo: Respuestas del Supervisor</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                ${tableRows}
              </table>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee;">
            Este reporte ha sido generado por el sistema LEAD.
            <br/>${new Date().getFullYear()}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error de Resend:", error);
      return { success: false, error: "Error al enviar el email." };
    }

    return { success: true, report: dataIA.analysis };
  } catch (err) {
    console.error("Error en generateAndSendReport:", err);
    return { success: false, error: "Error interno procesando el reporte." };
  }
}
