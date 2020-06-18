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
import { UtilNivel } from '../UtilNivel';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NivelService } from '../niveles.service';
import { ModalBuscadorServicioComponent } from '../../modal-buscador-servicio/buscador-servicio.component';

@Component({
  selector: 'app-form-niveles',
  templateUrl: './form-niveles.component.html'
})
export class FormNivelesComponent implements OnInit {
  // MODALS
  modalOptions: NgbModalOptions;
  /************************ Variables ************* */
  programas: any;
  categorias: any;
  servicioPrograma: any;

  /*array que se va a crear cuando me devulevan la informacion*/
  rules = [
    {
      habilitado: false,
      prioridad: 0,
      id: 1,
      descripcion: 'Rule 1'
    },
    {
      habilitado: false,
      prioridad: 0,
      id: 2,
      descripcion: 'Rule 2'
    }
  ];

  /***********************VARIABLES LOCALES**************** */
  @Input() titlePanel: { titlePanel: string };
  @Input() titleForm: { titleForm: string };
  @Input() subtitleForm: { subtitleForm: string };
  @Input() buttonAction: { buttonAction: string };
  @ViewChild('programa', { static: false }) cbx_programa: any;
  @ViewChild('categoria', { static: false }) cbx_categoria: any;
  @ViewChild('servicioPrograma', { static: false }) cbx_servicioPrograma: any;

  utilNivel: UtilNivel;

  fieldsForm: FormGroup;

  countRules: number;
  thereIsError: boolean;
  thirdAndFourth: boolean;
  showErrorItem: boolean;

   /* Variables que controlan el modal de reservas*/
  mostrarModalServicios: boolean;
  /******************************************
   * VARIABLES PARA EL PAGINADOR Y BUSCADOR *
   ******************************************/
  pk = 0;
  listaFechas: any[];
  listaGrupos: any[];
  cantidad = 0;
  html = '';
  // Declara objetos de configuración del datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  titulo: string;

  public readonly notifier: NotifierService;
  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public notifierService: NotifierService,
    sanitizer: DomSanitizer,
    public router: Router,
    public _location: Location,
    private modalService: NgbModal,
    private nivelService: NivelService
  ) {
    this.nivelService.cargarSubProgramas().subscribe(resultado => {this.programas = resultado; },
      error => { console.log(JSON.stringify(error)); });

    this.nivelService.cargarCategoriasNivel().subscribe(resultado => {this.categorias = resultado; },
      error => { console.log(JSON.stringify(error)); });

    this.notifier = notifierService;
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);

    this.utilNivel = new UtilNivel();
    this.countRules = 1;
    this.thereIsError = false;

    this.thirdAndFourth = false;
    this.showErrorItem = false;

     // Type: 'sm' | 'lg' | 'xl' | string
    this.modalOptions = {
       backdrop: 'static',
        backdropClass: 'customBackdrop',
        size: 'xl'
      };
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group({
      codigoNivel: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      descripcionNivel: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ],
      codigoServicio: [
        '',
        [Validators.required, Validators.maxLength(20), Validators.minLength(3)]
      ],
    });
  }

  clearForm() {}

  onSubmit() {
    if (!this.utilNivel.isSelectedRule(this.rules)) {
      this.showErrorItem = true;
    } else {
      const newNivel = {};
      newNivel['codigo'] = this.fieldsForm.get('codigoNivel').value;
      newNivel['descripcion'] = this.fieldsForm.get('descripcionNivel').value;
      newNivel['programa'] = this.cbx_programa.nativeElement.value;
      newNivel['categoria'] = this.cbx_categoria.nativeElement.value;
    }
  }

  mostrarVentanaModalServicios() {
    // https://medium.com/@izzatnadiri/how-to-pass-data-to-and-receive-from-ng-bootstrap-modals-916f2ad5d66e
    console.log('mostrarVentanaModalServicios : ');
    const subPrograma = 1;
    const modalRef = this.modalService.open (ModalBuscadorServicioComponent, this.modalOptions);
    modalRef.componentInstance.subPrograma = subPrograma;
    modalRef.result.then ((result) => {
      if (result) {
        console.log('Servicio seleccionado ::: ' + result);
        // Servicio consultado cuando se obtienen los datos del dialogo
        // parámetros a enviar son el servicio y el sub programa
        this.nivelService.cargarProgramaServicio().subscribe(resultado => {this.categorias = resultado; },
          error => { console.log(JSON.stringify(error)); });
      }
    });
  }
}
