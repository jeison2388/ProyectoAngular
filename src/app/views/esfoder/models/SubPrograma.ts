import { Programa } from './Programa';

export interface SubPrograma {
  id: number;
  codigo: string;
  descripcion: string;
  activo: boolean;
  programa: Programa;
}
