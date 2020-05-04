import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, SecurityContext } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from '../../../../servicios/data.service';


@Component({
  selector: 'app-escenarios',
  templateUrl: './escenarios.component.html',
})
export class EscenariosComponent implements OnInit, AfterViewInit, OnDestroy {

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
  //?? Pendiente eliminar
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
    public router: Router,
    ) {
    this.notifier = notifierService;
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);
  }

  ngOnInit() {

    /******************************************
     * TRAER LISTADO INICIAL DEL SERVICIO WEB *
     ******************************************/
    const that = this;
    this.dataService.contar('Escenario').subscribe((data: any) => {
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
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
      },
      ajax: (dataTablesParameters: any, callback) => {
        let offset = Number(dataTablesParameters.start / dataTablesParameters.length) + 1
        if (offset === 0)
          offset = 1
        that.dataService.entidadBasicaPaginada('Escenario',
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
      columns: [{ data: 'id' }, { data: 'codigo' }, { data: 'descripcion' },{},{}]
    };
  }

  /**************************************
   * CONFIGURAR LA BUSQUEDA POR COLUMNA *
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

  /********************************************
   * IR AL COMPONENTE DE EDICION DE UN OBJETO *
   ********************************************/
  editar(id): void {
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/taquillas/escenario'], { queryParams: { id: id } })
    })
  }

  /**********************************************
   * ELIMINAR UN OBJETO DESDE LA TABLA PAGINADA *
   **********************************************/
  eliminar(id) {

    /*
    En este paso antes de eliminar debe capturar error de integridad referencial
    */

    if (confirm('Seguro de eliminar el registro?')) {
      this.dataService.eliminarObjeto('Escenario', id).subscribe((data: any) => {       
        this.notifier.notify('success', 'La información se ha eliminado correctamente'); 
        //this.cancelar();
      },(error: Response) => {  
        if(error.status === 200)  
        this.notifier.notify('success', 'La información se ha eliminado correctamente');
        else {  
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
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/taquillas/escenarios'])
    })
  }

}
