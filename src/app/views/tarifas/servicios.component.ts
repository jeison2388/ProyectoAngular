import { Component, OnInit, ViewChild, AfterViewInit, ɵConsole, OnDestroy, SecurityContext } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../servicios/data.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { format } from 'url';
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
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
})
export class ServiciosComponent implements OnInit, AfterViewInit, OnDestroy {
  servicios: any[];
  existe: any;
  servicio: any;
  pk = 0;
  id = '';
  cod = '';
  des = '';
  estado = '';
  cantidad = 0;
  html = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  public readonly notifier: NotifierService;

  constructor(public dataService: DataService,
    public notifierService: NotifierService,
    sanitizer: DomSanitizer,
    public router: Router,
    public _location: Location) {
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
        let offset = Number(dataTablesParameters.start / dataTablesParameters.length) + 1
        if (offset === 0)
          offset = 1
        that.dataService.entidadBasicaPaginada('Servicio',
          [dataTablesParameters.columns[0].data, dataTablesParameters.columns[1].data, dataTablesParameters.columns[2].data],
          [this.id, this.cod, this.des],
          offset,
          dataTablesParameters.length)
          .subscribe((data: any) => {
            this.servicios = data;
            callback({
              recordsTotal: this.servicios.length,
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
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/tarifas/servicio'], { queryParams: { id: id } })
    })
  }

  eliminarObjeto(id) {

    /*
    En este paso ante sde eliminar debe capturar error de integridad referencial
    */

    if (confirm('Seguro de eliminar el registro?')) {
      this.dataService.eliminarObjeto('Servicio', id).subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha  correctamente');
        this.cancelar();
      });
    }
  }

  cancelar(): void {
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/tarifas/servicios'])
    })
  }



} //final clase