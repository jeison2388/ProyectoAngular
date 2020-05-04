import {
  Component,
  Input,
  OnInit,
  ViewChild,
  SecurityContext
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../servicios/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject, from } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UtilInstructores } from '../UtilInstructores';
import { DisponibilidadComponent } from '../disponibilidad/disponibilidad.component';
import { Unidad } from '../../models/Unidad';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-form-instructor',
  templateUrl: './form-instructor.component.html'
})
export class FormInstructorComponent implements OnInit {
  public watermark: string = 'Select a time';
  // sets the format property to display the time value in 24 hours format.
  public formatString: string = 'HH:mm';
  public interval: number = 60;
  private TAM_MAX_FILE: number = 3072;
  filePhoto: File;
  srcPhotoView: any;
  thereIsErrorPhoto: boolean;
  msjErrorCharginFile: string;

  // MODAL DISPONIBILIDAD
  modalOptions: NgbModalOptions;

  /************************VARIABLES TEMPORALES************* */
  tiposId: string[] = ['Cédula de ciudadanía', 'Tarjeta de identidad', 'Registro civil'];
  generos: string[] = ['Masculino', 'Femenino'];
  programas: string[] = ['Natación', 'Fútbol', 'Baloncesto', 'Squash'];
  listaUnidades: Array<Unidad>;
  /*array que se va a crear cuando me devulevan la informacion*/
  rules = [];

  /***********************VARIABLES LOCALES**************** */
  @Input() titlePanel: { titlePanel: string };
  @Input() titleForm: { titleForm: string };
  @Input() subtitleForm: { subtitleForm: string };
  @Input() buttonAction: { buttonAction: string };
  @ViewChild('programa', { static: false }) cbx_programa: any;
  @ViewChild('genero', { static: false }) cbx_genero: any;
  @ViewChild('tipoId', { static: false }) cbx_tipoId: any;

  fieldsForm: FormGroup;

  countRules: number;
  thereIsError: boolean;
  utilInstructores: UtilInstructores;

  showErrorItem: boolean;
  /******************************************
   * VARIABLES PARA EL PAGINADOR Y BUSCADOR *
   ******************************************/
  pk = 0;
  listaDisponibilidad: any[];
  cantidad = 0;
  html = '';
  // Declara objetos de configuración del datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  idUnidad: number;

  /* Variables que controlan los modales y el formulario de grupo*/
  mostrarModalDisponibilidad: boolean;
  personaNoExiste: boolean;

  public readonly notifier: NotifierService;
  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public notifierService: NotifierService,
    sanitizer: DomSanitizer,
    public router: Router,
    public _location: Location,
    private modalService: NgbModal
  ) {
    this.mostrarModalDisponibilidad = false;
    this.notifier = notifierService;
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);
    this.srcPhotoView = '../../../../../../assets/img/competicion/addPhoto.png';
    this.thereIsErrorPhoto = false;

    this.utilInstructores = new UtilInstructores();
    this.countRules = 1;
    this.thereIsError = false;
    this.showErrorItem = false;
    this.listaUnidades = new Array();
    this.obtenerClientes();
    this.personaNoExiste = false;

    // Type: 'sm' | 'lg' | 'xl' | string
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg'
    };
  }

  obtenerClientes() {
    this.listaUnidades.push({
      idUnidad: 1,
      unidad: 'Centro Recreativo Pisoje',
      tieneHorarios: true
    },
    {
      idUnidad: 2,
      unidad: 'Unidad Deportiva la villa',
      tieneHorarios: false
    },
    {
      idUnidad: 3,
      unidad: 'Centro recreativo la Ceiba',
      tieneHorarios: true
    }
    );
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group({
      pNombre: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      sNombre: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      pApellido: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      sApellido: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      identificacion: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      fechaNacimiento: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      edad: [''],
      direccion: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      celular: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
          Validators.maxLength(2)
        ]
      ]
    });

    // INICIO TABLA DISPONIBILIDAD
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
              dataTablesParameters.columns[1].data
            ],
            [],
            offset,
            dataTablesParameters.length
          )
          .subscribe(
            (data: any) => {
              this.listaDisponibilidad = data;
              callback({
                recordsTotal: this.listaDisponibilidad.length,
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
        { data: 'idUnidad' },
        { data: 'unidad' }
      ]
    };
    // FIN TABLA DISPONIBILIDAD
  }

  clearForm() {}

  onSubmit() {
    if (!this.utilInstructores.isSelectedRule(this.rules)) {
      this.showErrorItem = true;
    } else {
      const newNivel = {};
      newNivel['nombres'] = this.fieldsForm.get('nombres').value;
      newNivel['identificacion'] = this.fieldsForm.get('identificacion').value;
      newNivel['fechaNacimiento'] = this.fieldsForm.get('fechaNacimiento').value;
      newNivel['direccion'] = this.fieldsForm.get('direccion').value;
      newNivel['celular'] = this.fieldsForm.get('celular').value;
      newNivel['email'] = this.fieldsForm.get('email').value;
      newNivel['programa'] = this.cbx_programa.nativeElement.value;
    }
  }

  uploadPhoto(event: any) {
    const tam_file = event.target.files[0].size / 1024;
    if (tam_file > this.TAM_MAX_FILE) {
      this.msjErrorCharginFile = 'Tamaño foto no puede ser mayor a 3 Mb';
      this.thereIsErrorPhoto = true;
    } else if (!this.utilInstructores.containExtPhoto(event.target.files[0].name)) {
      this.msjErrorCharginFile = 'Solo se permiten archivos jpg, jpeg y png';
      this.thereIsErrorPhoto = true;
    } else {
      this.thereIsErrorPhoto = false;
      this.filePhoto = event.target.files[0];
      const myReader: FileReader = new FileReader();
      myReader.readAsDataURL(this.filePhoto);
      myReader.onload = (_event) => {
        this.srcPhotoView = myReader.result;
      };
    }
  }

  mostrarVentanaModalDisponibilidad(unidad: Unidad) {
    // https://medium.com/@izzatnadiri/how-to-pass-data-to-and-receive-from-ng-bootstrap-modals-916f2ad5d66e
    console.log('Unidad : ' + unidad.idUnidad);
    const modalRef = this.modalService.open (DisponibilidadComponent, this.modalOptions);
    modalRef.componentInstance.unidad = unidad;
    modalRef.result.then ((result) => {
      if (result) {
        console.log (result);
      }
    });
  }

  validarIdentificacion(e) {
    const identificacion = e.target.value;
    console.log('validarIdentificacion:::' + identificacion);
    if (true && identificacion.lenght > 0) {
      this.personaNoExiste = true;
    } else {
      this.personaNoExiste = false;
    }
  }
}
