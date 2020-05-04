import { Componente } from './Componente';

export class SubComponente {
  id: number;
  codigo: string;
  descripcion: string;
  activo: boolean;
  id_componente: number;
  id_usuario: number;

  constructor(
    id: number,
    codigo: string,
    descripcion: string,
    activo: boolean,
    componente: number,
    id_usuario: number
  ) {
    this.id = id;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.activo = activo;
    this.id_componente = componente;
    this.id_usuario = id_usuario;

  }
}
