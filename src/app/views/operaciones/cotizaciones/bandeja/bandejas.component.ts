import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, SecurityContext } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { DataService } from '../../../../servicios/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OperacionesService } from '../../../../servicios/operaciones.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-bandejas',
  templateUrl: './bandejas.component.html',
})
export class BandejasComponent implements  OnInit, AfterViewInit, OnDestroy {

  /******************************************
   * VARIABLES PARA EL PAGINADOR Y BUSCADOR *
   ******************************************/

  // Almacena la lista que se trae desde el servicio web 
  lista: any[];
  // Campo para busqeda por Id
  numero = '';
  // Campo para busqeda por codigo
  estado = '';
  // Campo para busqeda por descripcion
  cliente = '';
  fechaRecepcion = '';
  usuarioAsignado = '';
  cotiSel = 0;
  verde = 0;
  amarillo = 0;
  rojo = 0;
  tipo_usuario = '';

  // Cantidad de registros para definir paginación
  cantidad = 0;
  //  Pendiente eliminar
  html = '';
  // Declara objetos de configuración del datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  objetoUsuario: any;

  /******************
   * NOTIFICACIONES *
   ******************/
  public readonly notifier: NotifierService;

  constructor(
    public dataService: DataService,
    public notifierService: NotifierService,
    public operacionesService: OperacionesService,
    sanitizer: DomSanitizer,
    public router: Router,
    ) {
    this.notifier = notifierService;
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);
  }

  ngOnInit() {
    this.intervalo();
    /******************************************
     * TRAER LISTADO INICIAL DEL SERVICIO WEB *
     ******************************************/
    const that = this;
    this.dataService.contar('VistaCotizacion').subscribe((data: any) => {
      this.cantidad = data;
    });


    /**************************
     * CONSTRUIR EL DATATABLE *
     **************************/
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
      },
      ajax: (dataTablesParameters: any, callback) => {
        let offset = Number(dataTablesParameters.start / dataTablesParameters.length) + 1;
        if (offset === 0) {
          offset = 1;
        }
        that.dataService.entidadBasicaPaginada('VistaCotizacion',
          [
            dataTablesParameters.columns[0].data,
            dataTablesParameters.columns[1].data,
            dataTablesParameters.columns[2].data,
            dataTablesParameters.columns[3].data,
            dataTablesParameters.columns[4].data,
          ],
          [this.numero, this.estado, this.cliente, this.fechaRecepcion, this.usuarioAsignado],
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
      columns: [{ data: 'numero' }, { data: 'estado' }, { data: 'cliente' }, { data: 'fechaRecepcion' }, { data: 'usuarioAsignado' }, {}]
    };

    this.cargarEntidades();
    this.tipo_usuario = localStorage.getItem('tipo_usuario');
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

  /********************************************
   * IR AL COMPONENTE DE EDICION DE UN OBJETO *
   ********************************************/
  gestionar(id): void {
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/cotizaciones/bandeja'], { queryParams: { id: id } });
    });
  }

  /**********************************************
   * ELIMINAR UN OBJETO DESDE LA TABLA PAGINADA *
   **********************************************/
  eliminar(id) {

    /*
    En este paso antes de eliminar debe capturar error de integridad referencial
    */

    if (confirm('Seguro de eliminar el registro?')) {
      this.dataService.eliminarObjeto('Proveedor', id).subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha eliminado correctamente');
        this.cancelar();
      }, (error: Response) => {
        if (error.status === 200)  {
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
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/cotizaciones/bandejas']);
    });
  }


  onNotifyBuscador(objetoUsuario: any): void {
    console.log(objetoUsuario);
    this.objetoUsuario = objetoUsuario;
  }

  traerCotizacion(id) {
    this.cotiSel = id;
  }

  reasignarUsuario() {
    if (this.objetoUsuario !== undefined) {
      if (confirm('Seguro de reasignar el usuario?')) {
        this.operacionesService.reasignarUsuario(this.cotiSel, this.objetoUsuario.id).subscribe((data: any) => {
          this.notifier.notify('success', 'La información se ha actualizado correctamente');
          setTimeout(() => {
            this.cancelar();
          }, 1000);
        }, (error: Response) => {
          if (error.status === 200) {
            this.notifier.notify('success', 'La información se ha actualizado correctamente');
          } else {
            this.notifier.notify('error', 'No es posible actualizar el registro');
            console.log(error);
          }
        });
      }
    }
  }

  intervalo() {
    let seconds = Number(38688.518792);

    const days = Math.floor(seconds / (3600 * 24));
    seconds  -= days * 3600 * 24;
    const hrs   = Math.floor(seconds / 3600);
    seconds  -= hrs * 3600;
    const mnts = Math.floor(seconds / 60);
    seconds  -= mnts * 60;
    console.log(days + " days, " + hrs + " Hrs, "+mnts+" Minutes, "+seconds+" Seconds");
  }


  cargarEntidades() {
    this.dataService.catalogoEntidadBasica('Alerta', [], [])
      .subscribe((data: any) => {
        data.forEach(element => {
          if (element.codigo === 'V') {
            this.verde = element.tiempo;
          }
          if (element.codigo === 'R') {
            this.rojo = element.tiempo;
          }
          if (element.codigo === 'A') {
            this.amarillo = element.tiempo;
          }
        });


      },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

      }

}
