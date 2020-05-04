import { Disponibilidad } from '../models/Disponibilidad';

export class UtilInstructores {
  constructor() {
  }

  public isSelectedRule(rules: Object[]): boolean {
    let isSelected = false;
    for (const rule of rules) {
      if (rule['habilitado']) {
        isSelected = true;
        break;
      }
    }
    return isSelected;
  }

  containExtPhoto(ext: string) {
    const allowedExtensions = /(.jpg|.jpeg|.png)$/i;
    return allowedExtensions.exec(ext);
  }

  obtenerDisponibilidad(idUnidad: number): Array<Disponibilidad> {

    return [
      {
        id_disponibilidad: null,
        id_instructor: 1,
        id_dia_semana: 1,
        descripcion_dia_semana: 'LUNES',
        id_unidad: idUnidad,
        horario_1_i: new Date('05:00'),
        horario_1_f: new Date('09:00'),
        horario_2_i: new Date('14:00'),
        horario_2_f: new Date('18:00')
      },
      {
        id_disponibilidad: null,
        id_instructor: 1,
        id_dia_semana: 2,
        descripcion_dia_semana: 'MARTES',
        id_unidad: idUnidad,
        horario_1_i: new Date('05:00'),
        horario_1_f: new Date('09:00'),
        horario_2_i: new Date('14:00'),
        horario_2_f: new Date('18:00')
      },
      {
        id_disponibilidad: null,
        id_instructor: 1,
        id_dia_semana: 3,
        descripcion_dia_semana: 'MIERCOLES',
        id_unidad: idUnidad,
        horario_1_i: new Date('14/12/2019 05:00:00'),
        horario_1_f: new Date('09:00'),
        horario_2_i: new Date('14:00'),
        horario_2_f: new Date('18:00')
      },
      {
        id_disponibilidad: null,
        id_instructor: 1,
        id_dia_semana: 4,
        descripcion_dia_semana: 'JUEVES',
        id_unidad: idUnidad,
        horario_1_i: new Date(),
        horario_1_f: new Date(),
        horario_2_i: new Date(),
        horario_2_f: new Date()
      },
      {
        id_disponibilidad: null,
        id_instructor: 1,
        id_dia_semana: 6,
        descripcion_dia_semana: 'VIERNES',
        id_unidad: idUnidad,
        horario_1_i: new Date(),
        horario_1_f: new Date(),
        horario_2_i: new Date(),
        horario_2_f: new Date()
      },
      {
        id_disponibilidad: null,
        id_instructor: 1,
        id_dia_semana: 6,
        descripcion_dia_semana: 'SÁBADO',
        id_unidad: idUnidad,
        horario_1_i: new Date(),
        horario_1_f: new Date(),
        horario_2_i: new Date(),
        horario_2_f: new Date()
      }
    ];
  }
}
