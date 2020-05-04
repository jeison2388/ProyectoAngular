import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../../../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { Grupo } from '../../../models/Grupo';
import { PlanClase } from '../../../models/PlanClase';

@Component({
  selector: 'app-plan-clase',
  templateUrl: './plan-clase.component.html'
})
export class PlanClaseComponent implements OnInit {
  /************************VARIABLES LOCALES******************* */
  @Input() grupo: { grupo: Grupo };
  fieldsForm: FormGroup;

  listaObjetivos: Array<PlanClase>;
  estaEditando: boolean;
  key: number = 1;
  idClase: number = 1;
  nameModel: string = '';

  public readonly notifier: NotifierService;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public notifierService: NotifierService
  ) {
    this.listaObjetivos = new Array();
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group({
      objetivo: ['',
      [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
    ]
    });
  }

  addObj() {
    console.log('keyTemp: ' + this.key);
    this.listaObjetivos.push({
      id: this.key,
      idClase: 1,
      objetivo: this.fieldsForm.get('objetivo').value
    });
    this.ngOnInit();

    console.log(this.listaObjetivos);
    this.nameModel = '';
    this.key = this.key + 1;
  }

  remove(index: number) {
    console.log('remove ' + index);
    if (this.estaEditando) {
      if (confirm('Seguro de eliminar el registro?')) {
        this.dataService.eliminarObjeto('Apertura', this.listaObjetivos[index].id).subscribe(
          (data: any) => {
            this.notifier.notify(
              'success',
              'La información se ha eliminado correctamente'
            );
            // recargar la lista de objetos de la BASE si está editando
          },
          (error: Response) => {
            if (error.status === 200) {
              this.notifier.notify(
                'success',
                'La información se ha eliminado correctamente'
              );
            } else {
              this.notifier.notify(
                'error',
                'No es posible eliminar la infraestructura'
              );
              console.log(error);
            }
          }
        );
      }
    } else {
      this.listaObjetivos.splice(index, 1);
    }
  }

  save() {
    console.log('save ' + this.listaObjetivos.length);
    this.activeModal.close (this.listaObjetivos);
  }

  close() {
    console.log('close');
    this.activeModal.close (null);
  }
}
