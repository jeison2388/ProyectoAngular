import { Component, Input, OnInit} from '@angular/core';
import { NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilInstructores } from '../UtilInstructores';
import { Disponibilidad } from '../../models/Disponibilidad';
import { Unidad } from '../../models/Unidad';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.component.html'
})
export class DisponibilidadComponent implements OnInit {

  public watermark: string = 'Select a time';
    // sets the format property to display the time value in 24 hours format.
    public formatString: string = 'HH:mm';
    public interval: number = 60;

  utilInstructores: UtilInstructores;
  listaDias: Array<Disponibilidad>;

  /************************VARIABLES LOCALES******************* */
  @Input() public unidad: Unidad;
  fieldsForm: FormGroup;
  modalOptions: NgbModalOptions;

  ngOnInit() {
    console.log('Unidad: ' + this.unidad.unidad);
    this.fieldsForm = this.formBuilder.group({
      horariosDisponibles: ['',
      [
        Validators.required,
        Validators.pattern('^([0-9])*$'),
        Validators.maxLength(3)
      ]
    ]
    });
  }
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.utilInstructores = new UtilInstructores();
    this.listaDias = new Array();

    this.listaDias = this.utilInstructores.obtenerDisponibilidad(1);
  }

  addDisponibilidad() {
    this.activeModal.close (this.listaDias);
  }

  close() {
    console.log('close');
    this.activeModal.close (null);
  }
}
