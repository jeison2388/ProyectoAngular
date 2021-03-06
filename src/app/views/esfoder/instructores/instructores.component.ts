import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  SecurityContext
} from '@angular/core';
import { DataService } from '../../../servicios/data.service';
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
  selector: 'app-instructores',
  templateUrl: './instructores.component.html'
})
export class InstructoresComponent implements OnInit, AfterViewInit, OnDestroy {
  titleListInstructores: string;
  subtitleListInstructores: string;
  nameBtnAdd: string;
  nameBtnEdit: string;
  nameBtnCancel: string;

  /******************************************
   * VARIABLES PARA EL PAGINADOR Y BUSCADOR *
   ******************************************/

  // Almacena la lista que se trae desde el servicio web
  lista: any[];
  // Campos para búsqueda
  cedula = '';
  nombres = '';
  programa = '';
  celular = '';
  unidad = '';
  // Cantidad de registros para definir paginación
  cantidad = 0;

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
    this.titleListInstructores = 'ESCUELA DE FORMACIÓN DEPORTIVA';
    this.subtitleListInstructores = 'Instructores';
    this.nameBtnAdd = 'Nuevo';
    this.nameBtnEdit = 'Editar';
    this.nameBtnCancel = 'Cancelar';

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
        let offset =
          Number(dataTablesParameters.start / dataTablesParameters.length) + 1;
        if (offset === 0) {
          offset = 1;
        }
        that.dataService
          .entidadBasicaPaginada(
            'Servicio',
            [
              dataTablesParameters.columns[0].data,
              dataTablesParameters.columns[1].data,
              dataTablesParameters.columns[2].data,
              dataTablesParameters.columns[3].data,
              dataTablesParameters.columns[4].dat
            ],
            [
              this.cedula,
              this.nombres,
              this.programa,
              this.celular,
              this.unidad
            ],
            offset,
            dataTablesParameters.length
          )
          .subscribe(
            (data: any) => {
              this.lista = data;
              callback({
                recordsTotal: this.lista.length,
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
        { data: 'cedula' },
        { data: 'nombres' },
        { data: 'programa' },
        { data: 'celular' },
        { data: 'direccion' }
      ]
    };
  }

  ngAfterViewInit(): void {
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
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  editar(id): void {
    this.router
      .navigateByUrl('instructor', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/esfoder/add-instructores'], {
          queryParams: { id: id }
        });
      });
  }

  eliminarObjeto(id) {
    /*
    En este paso ante sde eliminar debe capturar error de integridad referencial
    */

    if (confirm('Seguro de eliminar el registro?')) {
      this.dataService.eliminarObjeto('Nivel', id).subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha  correctamente');
        this.cancelar();
      });
    }
  }

  cancelar(): void {
    this.router
      .navigateByUrl('dummy', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/tarifas/servicios']);
      });
  }
}
