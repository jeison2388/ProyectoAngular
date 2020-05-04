import { Component, Input, ViewChild } from '@angular/core';
import { NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Nivel } from '../../../models/Nivel';

@Component({
  selector: 'app-escenario-deportivo',
  templateUrl: './escenario-deportivo.component.html'
})

export class EscenarioDeportivoComponent {
  /************************VARIABLES LOCALES******************* */
  @Input() nivel: { nivel: Nivel };
  @ViewChild('modalEscenarioDeportivo', { static: true }) modalEscenarioDeportivo: any;
 // Type: 'sm' | 'lg' | 'xl' | string
  modalOptions: NgbModalOptions;

  constructor(public activeModal: NgbActiveModal) {

  }

  save() {
    const reserva: any = [];
    this.activeModal.close(reserva);
  }

  close() {
    console.log('close');
    this.activeModal.close (null);
  }
}
