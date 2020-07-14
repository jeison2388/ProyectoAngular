import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, SecurityContext} from '@angular/core';
import { DataService } from '../../../servicios/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html'
})
export class EvaluacionesComponent implements OnInit, AfterViewInit, OnDestroy {
  titleEvaluaciones: string;
  subtitleEvaluaciones: string;
  nameBtnAdd: string;
  nameBtnEdit: string;
  nameBtnCancel: string;

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
  // ?? Pendiente eliminar
  html = '';
  // Declara objetos de configuración del datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  /******************
   * NOTIFICACIONES *
   ******************/
  public readonly notifier: NotifierService;

  constructor(public dataService: DataService,
    public notifierService: NotifierService,
    sanitizer: DomSanitizer,
    public router: Router
  ) {
    console.log('constructor');
    this.titleEvaluaciones = 'ESCUELA DE FORMACIÓN DEPORTIVA';
    this.subtitleEvaluaciones = 'Evaluaciones';
    this.nameBtnAdd = 'Nuevo';
    this.nameBtnEdit = 'Editar';
    this.nameBtnCancel = 'Cancelar';

    this.notifier = notifierService;
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);
  }

  ngOnInit() {
    console.log('ngOnInit');
    /******************************************
     * TRAER LISTADO INICIAL DEL SERVICIO WEB *
     ******************************************/
    const that = this;
    this.dataService.contar('Evaluacion').subscribe((data: any) => {
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
      responsive: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
      },
      ajax: (dataTablesParameters: any, callback) => {
        let offset = Number(dataTablesParameters.start / dataTablesParameters.length) + 1;
        if (offset === 0) {
          offset = 1;
        }
        that.dataService.entidadBasicaPaginada('Evaluacion',
          [dataTablesParameters.columns[0].data,
          dataTablesParameters.columns[1].data,
          dataTablesParameters.columns[2].data],
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
      columns: [{ data: 'id' }, { data: 'codigo' }, { data: 'descripcion' }]
    };
  }

  /**************************************
   * CONFIGURAR LA BSUQUEDA POR COLUMNA *
   **************************************/
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.dtTrigger.next();
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function() {
        const that = this;

        $('input', this.header()).on('keyup', function() {
          if (that.search() !== this['value']) {
            that.search(this['value']).draw();
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
    console.log('ngOnDestroy');
  }

  /*************************
   * RECARGAR EL DATATABLE *
   *************************/
  rerender(): void {
    console.log('rerender');
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  /********************************************
   * IR AL COMPONENTE DE EDICION DE UN OBJETO *
   ********************************************/

  editar(id): void {
    this.router.navigate(['/esfoder/edit-evaluaciones'], {
      queryParams: { id: id }
    });
  }

  /**********************************************
   * ELIMINAR UN OBJETO DESDE LA TABLA PAGINADA *
   **********************************************/

  eliminarObjeto(id) {
    /*
    En este paso ante sde eliminar debe capturar error de integridad referencial
    */

    if (confirm('Seguro de eliminar el registro?')) {
      this.dataService.eliminarObjeto('evaluacion', id).subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha eliminado correctamente');
        this.cancelar();
      }, (error: Response) => {
        if (error.status === 200) {
        this.notifier.notify('success', 'La información se ha eliminado correctamente');
         } else {
          // We wanna display generic error message and log the error
          this.notifier.notify('error', 'No es posible eliminar la infraestructura');
          console.log(error);
        }
      });
    }
  }

  /****************
   * ACTUALIZAR COMPONENTE *
   ****************/
  cancelar(): void {
    this.router
      .navigateByUrl('dummy', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/evaluacion-rendimiento/']);
      });
  }
}
