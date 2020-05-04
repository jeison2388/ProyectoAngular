import { Component, Input, ViewChild, OnChanges, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { FechaUtilidades } from '../../../../model/FechaUtilidades';
import { UtilNivel } from '../UtilNivel';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { PlanClaseComponent } from './plan-clase/plan-clase.component';
import { Nivel } from '../../models/Nivel';
import { Grupo } from '../../models/Grupo';
import { Reserva } from '../../models/Reserva';
import { ModalBuscadorServicioComponent } from '../modal-buscador-servicio/buscador-servicio.component';
import { ClaseGrupo } from '../../models/ClaseGrupo';

@Component({
  selector: 'app-gestion-grupo',
  templateUrl: './gestion-grupo.component.html'
})
export class GestionGrupoComponent implements OnChanges, OnInit {
  // MODALS
  modalOptionsReserva: NgbModalOptions;
  modalOptionsPlanClase: NgbModalOptions;
  /************************VARIABLES LOCALES******************* */
  @ViewChild('instrcutor', { static: false }) cbx_instructor: any;
  fieldsForm: FormGroup;

  reservaSeleccionada: Reserva;
  listaGrupos: Array<Grupo>;
  grupo: Grupo;
  listaFechas: Array<ClaseGrupo>;
  cantidad = 0;
  // Declara objetos de configuración del datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })

  estaEditando: boolean;
  key: number = 1;
  idClase: number = 1;
  nameModel: string = '';

  min_date: string;
  fechaUtilidades: FechaUtilidades;
  utilNivel: UtilNivel;
  showErrorDateFinish: boolean;
  showErrorDateStart: boolean;
  msjErrorDateFinish: string;
  showErrorItem: boolean;

  instructores: string[] = [
    'Diego Fernandez',
    'Eduar Troyano',
    'Sandra Romero',
    'Luisa Gonzáles'
  ];

  /*array que se va a crear cuando me devulevan la informacion*/
    rules = [];
  /* Variables que controlan los modales y el formulario de grupo*/
  agregarGrupo: boolean;

  public readonly notifier: NotifierService;

  constructor(
    public router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public notifierService: NotifierService
  ) {
    this.utilNivel = new UtilNivel();
    this.listaGrupos = new Array();
    this.listaFechas = new Array();
    this.notifier = notifierService;

    this.agregarGrupo = false;

    this.fechaUtilidades = new FechaUtilidades();
    this.showErrorDateFinish = false;
    this.showErrorDateStart = false;
    this.min_date = this.fechaUtilidades.getMaxMinDate();

    this.reservaSeleccionada = new Reserva();
    this.reservaSeleccionada = this.utilNivel.getReserva();

    // Type: 'sm' | 'lg' | 'xl' | string
    this.modalOptionsReserva = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'xl'
    };

    this.modalOptionsPlanClase = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg'
    };
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group({
      codigoGrupo: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      descripcionGrupo: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      escenarioDeportivoGrupo: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      edadDesdeGrupo: [
        '',
        [
          Validators.required,
          Validators.pattern('^([0-9])*$'),
          Validators.maxLength(2)
        ]
      ],
      edadHastaGrupo: [
        '',
        [
          Validators.required,
          Validators.pattern('^([0-9])*$'),
          Validators.maxLength(2)
        ]
      ],
      minParticipantesGrupo: [
        '',
        [
          Validators.required,
          Validators.pattern('^([0-9])*$'),
          Validators.maxLength(3)
        ]
      ],
      numeroUsosGrupo: [
        '',
        [
          Validators.required,
          Validators.pattern('^([0-9])*$'),
          Validators.maxLength(3)
        ]
      ],
      cantidadCuposGrupo: [
        '',
        [
          Validators.required,
          Validators.pattern('^([0-9])*$'),
          Validators.maxLength(3)
        ]
      ]
    });



    /** TABLA DE CLASES **/

    const that = this;
    this.dataService.contar('Servicio').subscribe((data: any) => {
      this.cantidad = data;
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: true,
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
      },
      ajax: (dataTablesParameters: any, callback) => {
        let offset =
          Number(dataTablesParameters.start / dataTablesParameters.length) + 1;
        if (offset === 0) {
          offset = 1;
        }
        that.dataService
          .entidadBasicaPaginada(
            'Fechas',
            [
              dataTablesParameters.columns[0].data,
              dataTablesParameters.columns[1].data,
              dataTablesParameters.columns[2].data
            ],
            [],
            offset,
            dataTablesParameters.length
          )
          .subscribe(
            (data: any) => {
              this.listaFechas = data;
              callback({
                recordsTotal: this.listaFechas.length,
                recordsFiltered: this.cantidad,
                data: []
              });
            },
            error => {
              console.log(
                'There was an error while retrieving data !!!' + error
              );
            }
          );
      },
      columns: [
        { data: 'sesion' },
        { data: 'fechas' },
        { data: 'horaInicio' },
        { data: 'horaFin' }
      ]
    };

    /** FIN TABLA DE GRUPOS **/
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  aceptarGrupo() {
    console.log(' aceptarGrupo ');
    /*if (!this.utilNivel.isSelectedRule(this.rules)) {
      this.showErrorItem = true;
    } else {*/
    console.log('keyTemp: ' + this.key);
    this.listaGrupos.push({
      idNivel: 1,
      idGrupo: this.key,
      codigo: this.fieldsForm.get('codigoGrupo').value,
      descripcion: this.fieldsForm.get('codigoGrupo').value,
      instructor: this.fieldsForm.get('codigoGrupo').value,
      edadDesde: this.fieldsForm.get('codigoGrupo').value,
      edadHasta: this.fieldsForm.get('codigoGrupo').value,
      minParticipante: this.fieldsForm.get('codigoGrupo').value,
      numeroUsos: this.fieldsForm.get('codigoGrupo').value,
      cantidadCupos: this.fieldsForm.get('codigoGrupo').value,

      // variables del Escenario
      reserva: this.utilNivel.getReserva()
    });


    this.listaGrupos.push(this.grupo);

    this.agregarGrupo = false;
    this.ngOnInit();

    console.log('grupo---------- : ' + this.grupo);
    console.log('lista---------- : ' + this.listaGrupos);
    this.nameModel = '';
    this.key = this.key + 1;
  // }
    /* revisar la agregación a la lista de grupos */


    /*if (!this.utilNivel.isSelectedRule(this.rules)) {
      this.showErrorItem = true;
    } else {
      this.grupo['idNivel'] = 1,
      this.grupo['idGrupo'] = this.key,
      this.grupo['codigo'] = this.fieldsForm.get('codigoGrupo').value;
      this.grupo['descripcion'] = this.fieldsForm.get('descripcionGrupo').value;
      this.grupo['escenarioDeportivo'] = this.fieldsForm.get('escenarioDeportivoGrupo').value;
      this.grupo['instructor'] = this.cbx_instructor.nativeElement.value;

      this.grupo['edadDesde'] = this.fieldsForm.get('edadDesdeGrupo').value;
      this.grupo['edadHasta'] = this.fieldsForm.get('edadHastaGrupo').value;
      this.grupo['minParticipante'] = this.fieldsForm.get('minParticipantesGrupo').value;
      this.grupo['numeroUsos'] = this.fieldsForm.get('numeroUsosGrupo').value;
      this.grupo['cantidadCupos'] = this.fieldsForm.get('cantidadCuposGrupo').value;

      this.listaGrupos.push(this.grupo);

      this.agregarGrupo = false;
      this.ngOnInit();

      console.log('grupo---------- : ' + this.grupo);
      console.log('lista---------- : ' + this.listaGrupos);
      this.nameModel = '';
      this.key = this.key + 1;
    //}*/
  }


  remove(index: number) {
    console.log('remove ' + index);
    if (this.estaEditando) {
      if (confirm('Seguro de eliminar el registro?')) {
        this.dataService.eliminarObjeto('Apertura', this.listaGrupos[index].idGrupo).subscribe(
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
      this.listaGrupos.splice(index, 1);
    }
  }

  eliminarGrupo(id): void {
    this.router
      .navigateByUrl('dummy', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/esfoder/add-niveles'], {
          queryParams: { id: id }
        });
      });
  }

  verGrupo(id): void {
    this.router
      .navigateByUrl('dummy', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/esfoder/add-niveles'], {
          queryParams: { id: id }
        });
      });
  }

  mostrarVentanaModalPlanClase() {
    // https://medium.com/@izzatnadiri/how-to-pass-data-to-and-receive-from-ng-bootstrap-modals-916f2ad5d66e
    console.log('mostrarVentanaModalPlanClase : ');
    const grupo: Grupo = new Grupo();
    const modalRef = this.modalService.open (PlanClaseComponent, this.modalOptionsPlanClase);
    modalRef.componentInstance.grupo = grupo;
    modalRef.result.then ((result) => {
      if (result) {
        console.log (result);
      }
    });
  }
  mostrarVentanaModalEscenario() {
    // https://medium.com/@izzatnadiri/how-to-pass-data-to-and-receive-from-ng-bootstrap-modals-916f2ad5d66e
    console.log('mostrarVentanaModalEscenario : ');
    const nivel: Nivel = new Nivel();
    const modalRef = this.modalService.open (ModalBuscadorServicioComponent, this.modalOptionsReserva);
    modalRef.componentInstance.nivel = nivel;
    modalRef.result.then ((result) => {
      if (result) {
        console.log (result);
      }
    });
  }

  mostrarAgregarGrupo() {
    if (this.agregarGrupo) {
      this.agregarGrupo = false;
      this.ngOnInit();
    } else {
      this.agregarGrupo = true;
    }
  }
}
