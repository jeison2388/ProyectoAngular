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
