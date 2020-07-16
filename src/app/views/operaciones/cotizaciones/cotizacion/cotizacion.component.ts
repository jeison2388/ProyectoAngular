import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { UtilService } from '../../../../servicios/util.service';
import { NotifierService } from 'angular-notifier';
import { DataService } from '../../../../servicios/data.service';
import { LoadingScreenService } from '../../../../servicios/loading-screen/loading-screen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
})
export class CotizacionComponent implements OnInit, OnDestroy {

   /********************************************
   * DECLARA VARIABLE PARA LAS NOTIFICACIONES *
   ********************************************/
  public readonly notifier: NotifierService;

  public id = 0;
  public archivo = '';
   categorias: any[];
   tipos_usuario: any[];
   cant_plano: any[];
   objeto_categorias_tipos_usuario: any = [];
   loadingCarga: boolean = false;
   loadingSubscription: Subscription;

  constructor(
    public utilService: UtilService,
    public notifierService: NotifierService,
    public dataService: DataService,
    private loadingScreenService: LoadingScreenService
  ) {
    this.notifier = notifierService;
  }

  /**************************************************************************
 * FUNCIÓN PARA ACCEDER A LOS CONTROLES DEL FORMULARIO REACTIVO PRINCIPAL *
 **************************************************************************/
  get fc() { return this.form.controls; }

  /*******************************
   * CONSTRUCCIÓN DEL FORMULARIO *
   *******************************/
  form: FormGroup = new FormGroup({
    solicitante: new FormControl('', Validators.required),
    nit: new FormControl('', Validators.required),
    fechaCreacion: new FormControl('', Validators.required),
    tipoEvento: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    nombreContacto: new FormControl('', Validators.required),
    movil: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    participantes: new FormControl('', Validators.required),
    fechaCierreContable: new FormControl('', Validators.required),
    asesor: new FormControl('', Validators.required),
    exentaIva: new FormControl(''),
    tarifaSubsidiada: new FormControl(''),
    propuesta: new FormControl('', Validators.required),
    archivos: new FormControl('', Validators.required),
  });

  public uploader: FileUploader = new FileUploader(
    {
      url: this.utilService.getUrlCargar(),
      itemAlias: 'file'
    }
  );


  ngOnInit() {
    this.cargarEntidades();
    this.cargar();
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value) => {
      this.loadingCarga = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  cargarEntidades() {
    this.dataService.catalogoEntidadBasica('Categoria', [], [])
      .subscribe((data: any) => { this.categorias = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

    this.dataService.catalogoEntidadBasica('TipoUsuario', [], [])
      .subscribe((data: any) => { this.tipos_usuario = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }


  armarCategoriasTipoUsuario(file) {
    this.objeto_categorias_tipos_usuario = {
      file: file,
      cats: this.categorias,
      tips: this.tipos_usuario
    };
  }


  cargar(): void {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // const empresa = localStorage.getItem('empresa_id');
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      if (status === 200) {
        this.loadingScreenService.startLoading();
        this.armarCategoriasTipoUsuario(response);
       // setTimeout(() => {
          this.utilService.validarPlano(this.objeto_categorias_tipos_usuario).subscribe((data: any) => {

            data.forEach(element => {
              (<HTMLInputElement>document.getElementById(element.categoria + '-' + element.tipoUsuario)).value = element.cantidad;
            });


            this.loadingScreenService.stopLoading();
            this.notifier.notify('success', 'Archivo procesado correctamente');
          });
      // }, 1000);
      }
    };
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('id', this.id);
    };
  }

}
