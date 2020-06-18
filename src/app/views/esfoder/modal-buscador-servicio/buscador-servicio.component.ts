import { Component, Input, ViewChild, OnInit, OnDestroy, AfterViewInit, SecurityContext } from '@angular/core';
import { NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from '../../../servicios/data.service';
@Component({
  selector: 'app-buscador-servico',
  templateUrl: './buscador-servicio.component.html'
})
export class ModalBuscadorServicioComponent implements OnInit, AfterViewInit, OnDestroy {
  /************************VARIABLES LOCALES******************* */
  @Input() subPrograma: { subPrograma: number };
  @ViewChild('modalEscenarioDeportivo', { static: true }) modalEscenarioDeportivo: any;
 // Type: 'sm' | 'lg' | 'xl' | string
  modalOptions: NgbModalOptions;

    /******************************************
   * VARIABLES PARA EL PAGINADOR Y BUSCADOR *
   ******************************************/

  // Almacena la lista que se trae desde el servicio web
  lista: any[];
  // Campo para busqeda por Id
  id = '';
  // Campo para busqeda por codigo
  cod = '';
  // Campo para busqeda por descripcion
  des = '';
  // Cantidad de registros para definir paginación
  cantidad = 0;
  html = '';
  // Declara objetos de configuración del datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  constructor(public activeModal: NgbActiveModal,
    public dataService: DataService,
    sanitizer: DomSanitizer,
    public router: Router,
    ) {
     this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);
  }

  ngOnInit() {

    /******************************************
     * TRAER LISTADO INICIAL DEL SERVICIO WEB *
     ******************************************/
    const that = this;
    this.dataService.contar('Servicio').subscribe((data: any) => {
      this.cantidad = data;
    });


    /**************************
     * CONSTRUIR EL DATATABLE *
     **************************/
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: true,
      processing: true,
      searching: false,
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
      },
      ajax: (dataTablesParameters: any, callback) => {
        let offset = Number(dataTablesParameters.start / dataTablesParameters.length) + 1;
        if (offset === 0) {
          offset = 1;
        }
        that.dataService.entidadBasicaPaginada('Servicio',
          [dataTablesParameters.columns[0].data, dataTablesParameters.columns[1].data, dataTablesParameters.columns[2].data],
          [this.id, this.cod, this.des],
          offset,
          dataTablesParameters.length)
          .subscribe((data: any) => {
            this.lista = data;
            callback({
              recordsTotal: this.lista.length,
              recordsFiltered: this.cantidad,
              data: []
            });
          },
            error => {
              console.log('There was an error while retrieving data !!!' + error);
            });
      },
      columns: [{ data: 'id' }, { data: 'codigo' }, { data: 'descripcion' }, {}, {}]
    };
  }

    /**************************************
   * CONFIGURAR LA BSUQUEDA POR COLUMNA *
   **************************************/
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;

        $('input', this.header()).on('keyup', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });

      });
    });
  }

  /**************************************************
   * ACCION QUE SE EJECUTA AL DESTRUIR EL DATATABLE *
   **************************************************/
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  /*************************
   * RECARGAR EL DATATABLE *
   *************************/
  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  seleccionar(idServicio) {
    this.activeModal.close(this.subPrograma);
  }

  close() {
    console.log('close');
    this.activeModal.close (null);
  }
}
