import { Componente } from './Componente';
export class SubComponente {
  id: number;
  activo: boolean;
  codigo: string;
  descripcion: string;
  idUsuario: number;
  componente: Componente;

  constructor(
    id: number,
    activo: boolean,
    codigo: string,
    descripcion: string,
    componente: Componente,
    id_usuario: number
  ) {
    this.id = id;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.activo = activo;
    this.componente = componente;
    this.idUsuario = id_usuario;

  }
}
