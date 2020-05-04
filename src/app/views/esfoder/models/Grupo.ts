import { Reserva } from './Reserva';

export class Grupo {
  idNivel: number;
  idGrupo: number;
  codigo: string;
  descripcion: string;
  instructor: number;
  edadDesde: number;
  edadHasta: number;
  minParticipante: number;
  numeroUsos: number;
  cantidadCupos: number;
  // variable de escenario deportivo
  reserva: Reserva;
}
