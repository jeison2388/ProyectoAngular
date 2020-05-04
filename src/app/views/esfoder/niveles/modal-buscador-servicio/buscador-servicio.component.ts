import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscador-servico',
  templateUrl: './buscador-servicio.component.html'
})
export class ModalBuscadorServicioComponent implements OnInit {
  /************************VARIABLES LOCALES******************* */
  @Input() subPrograma: { subPrograma: number };
  @ViewChild('modalEscenarioDeportivo', { static: true }) modalEscenarioDeportivo: any;
 // Type: 'sm' | 'lg' | 'xl' | string
  modalOptions: NgbModalOptions;

  ngOnInit() {}

  constructor(public activeModal: NgbActiveModal) {

  }

  save() {
    this.activeModal.close(this.subPrograma);
  }

  close() {
    console.log('close');
    this.activeModal.close (null);
  }
}
