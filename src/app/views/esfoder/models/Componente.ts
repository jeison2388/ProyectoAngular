import { SubPrograma } from './SubPrograma';

export interface Componente {
  id: number;
  activo: boolean;
  codigo: string;
  descripcion: string;
  idUsuario: number;
  subPrograma: SubPrograma;
  selected: boolean;
  porcentaje: number;
}
