export class EscalaValorativa {
  // nivel evaluacion
  id: number;
  codigo: string;
  descripcion: string;
  activo: boolean;
  orden: number;
  //  escala
  id_escala: number;
  id_nivelEvaluacion: number;
  porcentaje_desde: number;
  porcentaje_hasta: number;
  activo_escala: boolean;
  id_usuario: number;
}
