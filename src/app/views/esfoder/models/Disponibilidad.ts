import { Time } from '@angular/common';

export class Disponibilidad {
  id_disponibilidad: number;
  id_instructor: number;
  id_dia_semana: number;
  descripcion_dia_semana: string;
  id_unidad: number;
  horario_1_i: Date;
  horario_1_f: Date;
  horario_2_i: Date;
  horario_2_f: Date;
}

