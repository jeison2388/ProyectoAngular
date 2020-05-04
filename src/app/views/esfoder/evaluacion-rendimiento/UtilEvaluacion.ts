import { Componente } from '../models/Componente';
import { SubComponente } from '../models/SubComponente';
import { EscalaValorativa } from '../models/EscalaValorativa';

export class UtilEvaluacion {
  constructor() {}

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

  public getComponentes(): Array<Componente> {
    return [
      {
        id: 1,
        codigo: '1',
        descripcion: 'Flotación (Con flotador)',
        activo: true,
        id_sub_programa: 1,
        id_usuario: 1,
        selected: false,
        porcentaje: 0
      },
      {
        id: 2,
        codigo: '2',
        descripcion: 'Flotación (Sin flotador)',
        activo: true,
        id_sub_programa: 1,
        id_usuario: 1,
        selected: false,
        porcentaje: 0
      },
      {
        id: 3,
        codigo: '3',
        descripcion: 'Patada',
        activo: true,
        id_sub_programa: 1,
        id_usuario: 1,
        selected: false,
        porcentaje: 0
      },
      {
        id: 4,
        codigo: '4',
        descripcion: 'Brazada',
        activo: true,
        id_sub_programa: 1,
        id_usuario: 1,
        selected: false,
        porcentaje: 0
      },
      {
        id: 5,
        codigo: '5',
        descripcion: 'Confianza y seguridad en el agua',
        activo: true,
        id_sub_programa: 1,
        id_usuario: 1,
        selected: false,
        porcentaje: 0
      },
      {
        id: 6,
        codigo: '6',
        descripcion: 'Posición del cuerpo en el agua',
        activo: true,
        id_sub_programa: 1,
        id_usuario: 1,
        selected: false,
        porcentaje: 0
      },
      {
        id: 7,
        codigo: '7',
        descripcion: 'Respiración',
        activo: true,
        id_sub_programa: 1,
        id_usuario: 1,
        selected: false,
        porcentaje: 0
      },
      {
        id: 8,
        codigo: '8',
        descripcion: 'Técnica completa',
        activo: true,
        id_sub_programa: 1,
        id_usuario: 1,
        selected: true,
        porcentaje: 10
      }
    ];
  }

  public getSubComponentes(): Array<SubComponente> {
    /*const listaComponentes: Array<Componente> = this.getComponentes.arguments;
    let lista: Array<SubComponente> ;
    for (const com of listaComponentes) {
      lista.push(new SubComponente(1, '2', '', true, com, 1));
    }*/

    return [
      {
        id: 1,
        codigo: '1',
        descripcion: 'Flotación ventral cara en el agua',
        activo: true,
        id_componente: 1,
        id_usuario: 1
      },
      {
        id: 2,
        codigo: '2',
        descripcion: 'Flotación dorsal',
        activo: true,
        id_componente: 1,
        id_usuario: 1
      },
      {
        id: 3,
        codigo: '3',
        descripcion: 'Flotación ventral cara en el agua, piernas y brazos abiertos',
        activo: true,
        id_componente: 2,
        id_usuario: 1
      },
      {
        id: 4,
        codigo: '4',
        descripcion: 'Flotación versal, piernas y brazos abiertos',
        activo: true,
        id_componente: 2,
        id_usuario: 1
      },
      {
        id: 5,
        codigo: '5',
        descripcion: 'Ejercicio con flotador',
        activo: true,
        id_componente: 3,
        id_usuario: 1
      },
      {
        id: 6,
        codigo: '6',
        descripcion: 'Cara dentro del agua',
        activo: true,
        id_componente: 3,
        id_usuario: 1
      },
      {
        id: 7,
        codigo: '7',
        descripcion: 'Cara dentro del agua - burbujitas',
        activo: true,
        id_componente: 3,
        id_usuario: 1
      },
      {
        id: 8,
        codigo: '8',
        descripcion: 'Hacer burbujitas con ritmo',
        activo: true,
        id_componente: 3,
        id_usuario: 1
      },
      {
        id: 9,
        codigo: '9',
        descripcion: 'Hacer abnea',
        activo: true,
        id_componente: 3,
        id_usuario: 1
      },
      {
        id: 10,
        codigo: '10',
        descripcion: 'Patada libre',
        activo: true,
        id_componente: 3,
        id_usuario: 1
      }
      ,
      {
        id: 11,
        codigo: '11',
        descripcion: 'Movimiento alterno de brazos en posición ventral',
        activo: true,
        id_componente: 4,
        id_usuario: 1
      }
      ,
      {
        id: 12,
        codigo: '12',
        descripcion: 'Salto desde el borde de piscina',
        activo: true,
        id_componente: 5,
        id_usuario: 1
      }
      ,
      {
        id: 13,
        codigo: '13',
        descripcion: 'Patada libre',
        activo: true,
        id_componente: 6,
        id_usuario: 1
      }
      ,
      {
        id: 14,
        codigo: '14',
        descripcion: 'Toma aire por la boca y expira nariz',
        activo: true,
        id_componente: 7,
        id_usuario: 1
      }
      ,
      {
        id: 15,
        codigo: '15',
        descripcion: 'Realiza inspiración y expiración',
        activo: true,
        id_componente: 8,
        id_usuario: 1
      }
    ];
  }

  public getEscalaValorativa(): Array<EscalaValorativa> {
    return [
      {
        // nivel evaluación
        id: 1,
        codigo: 'M',
        descripcion: 'Malo',
        activo: true,
        orden: 1,
        // escala
        id_escala: 1,
        id_nivelEvaluacion: 1,
        porcentaje_desde: 0,
        porcentaje_hasta: 40,
        activo_escala: true,
        id_usuario: 1
      },
      {
        id: 2,
        codigo: 'R',
        descripcion: 'Regular',
        activo: true,
        orden: 2,
        // escala
        id_escala: 1,
        id_nivelEvaluacion: 1,
        porcentaje_desde: null,
        porcentaje_hasta: null,
        activo_escala: true,
        id_usuario: 1
      },
      {
        id: 3,
        codigo: 'B',
        descripcion: 'Bueno',
        activo: true,
        orden: 3,
        // escala
        id_escala: 1,
        id_nivelEvaluacion: 1,
        porcentaje_desde: null,
        porcentaje_hasta: null,
        activo_escala: true,
        id_usuario: 1
      },
      {
        id: 4,
        codigo: 'MB',
        descripcion: 'Muy bueno',
        activo: true,
        orden: 4,
        // escala
        id_escala: 1,
        id_nivelEvaluacion: 1,
        porcentaje_desde: null,
        porcentaje_hasta: null,
        activo_escala: true,
        id_usuario: 1
      },
      {
        id: 5,
        codigo: 'E',
        descripcion: 'Excelente',
        activo: true,
        orden: 5,
        // escala
        id_escala: 1,
        id_nivelEvaluacion: 1,
        porcentaje_desde: null,
        porcentaje_hasta: null,
        activo_escala: true,
        id_usuario: 1
      }
    ];
  }
}
