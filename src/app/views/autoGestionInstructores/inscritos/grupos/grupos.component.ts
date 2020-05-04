import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  SecurityContext
} from '@angular/core';
import { DataService } from '../../../../servicios/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html'
})

export class GruposComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string;
  subtitle: string;
  nameBtnBack: string;

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

  constructor(
    public dataService: DataService,
    public notifierService: NotifierService,
    sanitizer: DomSanitizer,
    public router: Router,
    public _location: Location
  ) {
    this.title = 'GRUPOS';
    this.subtitle = 'Niveles';
    this.nameBtnBack = 'Regresar';

    this.notifier = notifierService;
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);
  }

  ngOnInit() {
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
      columns: [{ data: 'id' }, { data: 'codigo' }, { data: 'descripcion' }]
    };
  }

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

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ver(id): void {
    this.router
      .navigateByUrl('dummy', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['./inscritos/list-inscritos'], {
          queryParams: { id: id }
        });
      });
  }
}
