import { Component, OnInit } from '@angular/core';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../../../servicios/util.service';
import { IOption } from 'ng-select';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-apertura',
  templateUrl: './apertura.component.html',
})
export class AperturaComponent implements OnInit {

  /**************************************
   * VARIABLES DEL FORMULARIO PRINCIPAL *
   **************************************/
  // Id formulario principal 
  pk = 0;  
  submitted = false;
  value: any;
  events: Event[] = [];



  /*******************************************
   * VARIABLES PARA EL FORMULARIO SECUNDARIO *
   *******************************************/    
  servicios: Observable<any[]>;
  planes_clase: any[];
  serviciosCod: any[];
  descripcionS = [];
  codigoS= [];
  centros_costo: any[];
  subgrupos: any[];
  puntos_venta: any[];
  unidades:any[]=[];
  


  //Tamaño del  contenedor para controlar que se ajuste con el secundario
  conU = 0;
  //Id formulario secundario
  pkU = 0;


  /********************************************
   * DECLARA VARIABLE PARA LAS NOTIFICACIONES *
   ********************************************/
  public readonly notifier: NotifierService;

  constructor(config: NgbTimepickerConfig,
    public dataService: DataService,
    public utilService: UtilService,
    public notifierService: NotifierService,
    public router: Router,
    private route: ActivatedRoute, ) {
    //incicializa variable de las notificaciones
    this.notifier = notifierService;
  }

  ngOnInit() {    
    //Inciializa tamaño contenedor formulario principal
    this.conU = 12;
    //Inicializa el formulario reactivo principal
    this.initializeFormGroup();
    //Carga las listas de mostrar al inicio, combos especialmente
    this.cargarEntidades();
    /**********************************************************************
     * RECOGE LOS PARAMETROS DE LA URL Y TRAE LE OBJETO PARA MODO EDICIÓN *
     **********************************************************************/
    this.route
      .queryParams
      .subscribe(params => {
        if (params['id']) {
          this.traerObjeto(params['id'])         
          this.cargarPlanClase(params['id']);
         // this.conU = 6;
        } else {
          console.log('Nuevo')
        }
      })
           
  }


  /*******************************
   * CONSTRUCCIÓN DEL FORMULARIO *
   *******************************/
  form: FormGroup = new FormGroup({
    codigo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    servicio: new FormControl('', Validators.required),
    servicio_descripcion: new FormControl({value: '', disabled: true}, Validators.required),
    ciudad: new FormControl({value: '', disabled: true}, Validators.required),
    infraestructura: new FormControl({value: '', disabled: true}, Validators.required),
    grupo: new FormControl({value: '', disabled: true},),
    subgrupo: new FormControl('', Validators.required),
    centro_costo: new FormControl('', Validators.required),
    punto_venta: new FormControl('')
  });

  /****************************************************
   * INICIALIZAR EL FORUMARIO CON VALORES POR DEFECTO *
   ****************************************************/
  initializeFormGroup() {
    this.form.setValue({
      codigo: '',
      descripcion: '',
      servicio: '',
      servicio_descripcion: '',
      ciudad: '',
      infraestructura: '',
      grupo: '',
      subgrupo: '',
      centro_costo: '',
      punto_venta: []
    });
  }

  /**************************************************************************
   * FUNCIÓN PARA ACCEDER A LOS CONTROLES DEL FORMULARIO REACTIVO PRINCIPAL *
   **************************************************************************/
  get f() { return this.form.controls; }

  /**********************************************************
   * FUNCION QUE AGRUPA LOS LLAMADOS A LAS LISTAS DE COMBOS *
   **********************************************************/
  cargarEntidades() {
    this.dataService.buscadorSelectCombinado('Servicio', [], [], 1, 100)
      .subscribe((data: any) => { this.servicios = data; },
        error => { console.log('There was an error while retrieving data !!!' + error); });

    this.dataService.catalogoEntidadBasica('CentroCosto', [], [])
      .subscribe((data: any) => { this.centros_costo = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

    this.dataService.catalogoEntidadBasica('Subgrupo', [], [])
      .subscribe((data: any) => { this.subgrupos = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.buscarPuntosVenta1('', '');
  }


  cargarSubgrupos(grupo){
    this.dataService.listaEntidadRelacion('Subgrupo', ['idGrupo'], ['id'], [grupo])
      .subscribe((data: any) => { this.subgrupos = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }


  cargarUnidadesApertura(apertura){
    this.dataService.listaEntidadRelacion('AperturaUnidad', ['idApertura'], ['id'], [apertura])
      .subscribe((data: any) => { 
        let i = 0;
        data.forEach(element => {
           this.unidades.push({value: element.idUnidad.id, label: element.idUnidad.descripcion})
          i++;
        });      
      },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }


  /**********************************************************
   * CARGA EL LISTADO DE PAQUETES DEL FORMULARIO SECUNDARIO *
   **********************************************************/
  cargarPlanClase(id) {
    this.dataService.catalogoEntidadBasica('PlanClase', ['serv'], [id])
      .subscribe((data: any) => { this.planes_clase = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }


  /******************************
   * GUARDAR EL OBJETO PRINCIPAL *
   ******************************/
  guardar() {
    /* Controla la validación del formulario, si es invalido, muestra los mensaje y no permite guardar */
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    //Revisar para condinción de edición
    let servicio = this.form.value.servicio.value
    if (this.pk > 0){
      servicio = this.form.value.servicio.value;
    }
    let puntos = this.form.value.punto_venta;
    /* Arma el objeto según la entidad del backend, incluye el campo de validación */
    let obj = {
      campoValidacion: 'codigo',
      valor: this.form.value.codigo,
      entidad: {
        id: this.pk,
        codigo: this.form.value.codigo,
        descripcion: this.form.value.descripcion,
        idServicio: { id: servicio },
        idCentroCosto: { id: this.form.value.centro_costo },
        idSubgrupo: { id: this.form.value.subgrupo },
      }
    }

    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    if (this.pk > 0) {
      console.log('edition mode')
      this.dataService.guardar(obj.entidad, 'Apertura').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        if(puntos.length>0){
          this.guardarPuntos(data.id, puntos);
        }
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/taquillas/apertura', data.id);
        }, 1000);
      });
    } else {
      this.dataService.guardarPorCampo(obj, 'Apertura').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        if(puntos.length>0){
          this.guardarPuntos(data.id, puntos);
        }
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/taquillas/apertura', data.id);
        }, 1000);

      }, error => {
        /* Genera este mensaje cuando hya un error de codigo repetido en el backend */
        this.notifier.notify('error', 'El código ingresado ya existe, por favor corrija y guarde nuevamente');
      });
    }
  }

  guardarPuntos(apertura, puntos){
   puntos.forEach(element => {
      //console.log("Puntos:", element.value)
      let obj = {
        idApertura: { id: apertura },
        idUnidad: { id: element.value },
      }
      this.dataService.guardar(obj, 'AperturaUnidad').subscribe((data: any) => {
        console.log('')
      });
    });


    
  }

  /*********************************
   * DEVUELVE LA LISTADO PRINCIPAL *
   *********************************/
  cancelar() {
    this.utilService.cancelar('/taquillas/aperturas')
  }

  /********************************************************************************
   * TRAE EL OBJETO PRINCIPAL Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO REACTIVO *
   ********************************************************************************/
  traerObjeto(id) {
    this.dataService.traerObjetoId('Apertura', id).subscribe((data: any) => {
      this.pk = id;
      this.form.controls['codigo'].setValue(data.codigo);
      this.form.controls['descripcion'].setValue(data.descripcion);
      this.form.controls['servicio_descripcion'].setValue(data.idServicio.descripcion);
      this.form.controls['centro_costo'].setValue(data.idCentroCosto.id);
      this.form.controls['subgrupo'].setValue(data.idSubgrupo.id);
      this.seleccionarServicioId(data.idServicio.id);
      this.cargarUnidadesApertura(id);     
      this.form.controls['servicio'].setValue({value: data.idServicio.id, label: data.idServicio.codigo});
      setTimeout(() => {
        this.form.get('punto_venta').patchValue(this.unidades);
      }, 1000);
    });
  }


  /**************************************************************************************
   * FUNCIÓN PARA AGREGAR UNA UNIDAD, AL LISTADO DE UNIDADES DEL FORMULARIO SEGCUNDARIO *
   **************************************************************************************/
  agregarServicioAgregado() {

    /* Arma el objeto según la entidad del backend, incluye el campo de validación */
    let obj = {      
        id: this.pkU,                
        objetivo: 'objetivo',
      }
    

    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    if (this.pkU > 0) {
      console.log('edition mode')
      this.dataService.guardar(obj, 'PaqueteServicio').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        /* Luego de guardar envia actualzia el formulario principal y secundario */
        setTimeout(() => {
          this.utilService.editar('/taquillas/apertura', this.pk);
        }, 1000);
      });
    } else {
      this.dataService.guardar(obj, 'PaqueteServicio').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        /* Luego de guardar envia actualzia el formulario principal y secundario */
        setTimeout(() => {
          this.utilService.editar('/taquillas/apertura', this.pk);
        }, 1000);

      }, error => {
        /* Genera este mensaje cuando hya un error de codigo repetido en el backend */
        this.notifier.notify('error', 'El código ingresado ya existe, por favor corrija y guarde nuevamente');
      });
    }
  }

 
  /*******************************************************
   * FUNCIÓN QUE PERMITE ELIMINAR UNA SERVICIO DE LA LISTA PAQUETE*
   *******************************************************/
  eliminar(id) {
    if (confirm('Seguro de eliminar el registro?')) {
      this.dataService.eliminarObjeto('PlanClase', id).subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha eliminado correctamente');
        this.cargarPlanClase(this.pk);
      });
    }
  }

  eliminarPunto(id) {
    if (confirm('Seguro de eliminar el registro?')) {
      this.dataService.eliminarObjetocompuesto(id, this.pk).subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha eliminado correctamente');
        
      });
    }
  }

  /*****************************************************************
   * ACTUALIZA TODO EL COMPONENTE E INICIALIZA FORMULARIO Y LISTAS *
   *****************************************************************/
  clearFormUnidad() {
    this.utilService.editar('/taquillas/apertura', this.pk);
  }


buscarServiciosOk(term){
    this.dataService.catalogoEntidadBasicaComboDescripcion('Servicio', ['descripcion'], [term], 1, 100)
     .subscribe((data: any) => { this.servicios = data; },
     error => {console.log('There was an error while retrieving data !!!' + error); });
}

buscarServiciosCodigo(term){
  this.dataService.catalogoEntidadBasicaComboCodigo('Servicio', ['codigo'], [term], 1, 100)
   .subscribe((data: any) => { this.serviciosCod = data; },
   error => {console.log('There was an error while retrieving data !!!' + error); });
}

private buscarServicios($event, codbus) {
  console.log("parbus: ", codbus)
  this.dataService.buscadorSelectCombinado('Servicio', [codbus], [$event.term], 1, 100)
     .subscribe((data: any) => { this.servicios = data; },
     error => {console.log('There was an error while retrieving data !!!' + error); });
}



seleccionarServicio(option: IOption) {  
  this.dataService.traerObjetoId('Servicio', option.value).subscribe((data: any) => {       
    this.descripcionS = data.descripcion;   
    //this.codigoS = [data.id];    
    this.form.controls['servicio'].setValue({value: data.id, label: data.codigo});

    this.form.controls['servicio_descripcion'].setValue(data.descripcion)
    this.form.controls['ciudad'].setValue(data.idEscenario.idUnidad.idInfraestructura.idCiudad.descripcion);
      this.form.controls['infraestructura'].setValue(data.idEscenario.idUnidad.idInfraestructura.descripcion);
      this.form.controls['grupo'].setValue(data.idGrupo.descripcion);
      this.cargarSubgrupos(data.idGrupo.id);
      this.buscarPuntosVenta('', data.idEscenario.idUnidad.idInfraestructura.id);
  });
}

seleccionarServicioId(id) {  
  this.dataService.traerObjetoId('Servicio', id).subscribe((data: any) => {       
    this.descripcionS = data.descripcion;   
    this.codigoS = [data.id];    
    this.form.controls['servicio_descripcion'].setValue(data.descripcion)
    this.form.controls['ciudad'].setValue(data.idEscenario.idUnidad.idInfraestructura.idCiudad.descripcion);
      this.form.controls['infraestructura'].setValue(data.idEscenario.idUnidad.idInfraestructura.descripcion);
      this.form.controls['grupo'].setValue(data.idGrupo.descripcion);
      this.cargarSubgrupos(data.idGrupo.id);
      this.buscarPuntosVenta('', data.idEscenario.idUnidad.idInfraestructura.id);
  });
}


buscarPuntosVenta(term, infra){
  this.dataService.catalogoEntidadBasicaCombo('Unidad', ['descripcion', 'infra'], [term, infra], 1, 100)
   .subscribe((data: any) => { this.puntos_venta = data; },
   error => {console.log('There was an error while retrieving data !!!' + error); });
}

buscarPuntosVenta1(term, infra){
  this.dataService.catalogoEntidadBasicaCombo('Unidad', [], [], 1, 100)
   .subscribe((data: any) => { this.puntos_venta = data; },
   error => {console.log('There was an error while retrieving data !!!' + error); });
}



  remove($event) {


    console.log($event.value.value)


    if (confirm('Seguro que desea eliminar punto de de venta?')) {
      this.eliminarPunto($event.value.value);
    } else {
      this.events.push({ name: '(remove)', value: $event });
      console.log($event);

      this.form.get('punto_venta').patchValue([{
        "value": 16,
        "label": "LA VILLA"
      },
      {
        "value": 15,
        "label": "PRUEBA"
      }]);

    }
  }
}

interface Event {
  name: string;
  value: any;
}