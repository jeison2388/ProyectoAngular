import { Reserva } from '../models/Reserva';

export class UtilNivel {
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

  getReserva(): Reserva {
    const reserva: Reserva = new Reserva();
    reserva.idReserva = 1;
    reserva.escenarioDeportivo = 'Carril 1';
    reserva.escenarioPrincipal = 'Piscina CLimatizada';
    reserva.infraestructura = 'Unidad deportiva la villa';
    reserva.unidad = 'Unidad 1';
    reserva.horaInicio = '8';
    reserva.horaFin = '10';
    reserva.fechaInicio = new Date();
    reserva.fechaFinalizacion = new Date();

    return reserva;
  }
}
