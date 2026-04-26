export const DIMENSIONS_MATRIX_MAPPING = {
  Claridad: "equipo_puntaje_objetivos",
  Coordinación: "equipo_puntaje_coordinacion",
  Responsabilidad: "equipo_puntaje_responsabilidad",
  Comunicación: "equipo_puntaje_comunicacion",
  Resolución: "equipo_puntaje_resolucion",
} as const;

export type DimensionKey = keyof typeof DIMENSIONS_MATRIX_MAPPING;
export type MatrixAxis = typeof DIMENSIONS_MATRIX_MAPPING[DimensionKey];
