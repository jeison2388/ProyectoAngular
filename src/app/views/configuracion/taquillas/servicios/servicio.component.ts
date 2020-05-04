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

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
})
export class ServicioComponent implements OnInit {

  /**************************************
   * VARIABLES DEL FORMULARIO PRINCIPAL *
   **************************************/
  // Id formulario principal 
  pk = 0;
  tipos_servicio: any[];
  programas: any[];
  grupos: any[];
  cuentas_contables: any[];
  ivas: any[];
  estados_servicio: any[];
  submitted = false;
  value: any;



  /*******************************************
   * VARIABLES PARA EL FORMULARIO SECUNDARIO *
   *******************************************/  
  servicios_agregados: any[];
  servicios: any[];
  serviciosCod: any[];
  escenarios: any[];
  escenariosCod: any[];
  codigoEsc = '';
  codigoPaq = '';
  servicioPaq = '';

  infraestructuraE = '';
  unidadE = '';
  descripcionE = [];
  codigoE = [];
  idE = 0;
  descripcionS = [];
  codigoS= [];
  tipo_servicioS = '';
  valor_costoS = 0;




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
        console.log(params)
        if (params['id']) {
          this.traerObjeto(params['id'])         
          this.cargarPaquetes(params['id']);
         // this.conU = 6;
        } else {
          console.log('Nuevo')
        }
      })

      this.onChanges();
      
  }


  /*******************************
   * CONSTRUCCIÓN DEL FORMULARIO *
   *******************************/
  form: FormGroup = new FormGroup({
    codigo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    tipo_servicio: new FormControl('', Validators.required),
    programa: new FormControl('', Validators.required),
    grupo: new FormControl('', Validators.required),
    cuenta_contable: new FormControl('', Validators.required),
    control_usos: new FormControl('',),
    iva: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    valor_costo: new FormControl('', Validators.required),
    aplica_cero_empleados: new FormControl('',),
    requiere_definir_personas: new FormControl('',),
    numero_personas: new FormControl({value: '', disabled: true}, Validators.required),
    requiere_definir_horas: new FormControl('',),
    numero_horas: new FormControl('', Validators.required),
    aplica_restriccion_meta: new FormControl('',),
    meta: new FormControl('', Validators.required),
    aplica_escenario: new FormControl('',),
    aplica_paquete: new FormControl('',),
    escenario: new FormControl('',),
  });

  /****************************************************
   * INICIALIZAR EL FORUMARIO CON VALORES POR DEFECTO *
   ****************************************************/
  initializeFormGroup() {
    this.form.setValue({
      codigo: '',
      descripcion: '',
      tipo_servicio: '',
      programa: '',
      grupo: '',
      cuenta_contable: '',
      control_usos: false,
      iva: '',
      estado: '',
      valor_costo: 0,
      aplica_cero_empleados: false,
      requiere_definir_personas: false,
      numero_personas: 0,
      requiere_definir_horas: false,
      numero_horas: 0,
      aplica_restriccion_meta: false,
      meta: 0,
      aplica_escenario: true,
      aplica_paquete: false,
      escenario: '',
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
    this.dataService.catalogoEntidadBasica('TipoServicio', [], [])
      .subscribe((data: any) => { this.tipos_servicio = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('Programa', [], [])
      .subscribe((data: any) => { this.programas = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('Grupo', [], [])
      .subscribe((data: any) => { this.grupos = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('CuentaContable', [], [])
      .subscribe((data: any) => { this.cuentas_contables = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('Iva', [], [])
      .subscribe((data: any) => { this.ivas = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('EstadoServicio', [], [])
      .subscribe((data: any) => { this.estados_servicio = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });     
        this.dataService.catalogoEntidadBasica('Servicio', [], [])
      .subscribe((data: any) => { this.servicios = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
        this.buscarEscenariosCodigo('');
        this.buscarEscenarios('');

        this.buscarServicios('');
        this.buscarServiciosCodigo('');
  }


  /**********************************************************
   * CARGA EL LISTADO DE PAQUETES DEL FORMULARIO SECUNDARIO *
   **********************************************************/
  cargarPaquetes(id) {
    this.dataService.catalogoEntidadBasica('PaqueteServicio', ['serv'], [id])
      .subscribe((data: any) => { this.servicios_agregados = data; },
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

    let esc = this.idE;
    if(this.idE===0){
      esc = this.form.value.escenario;
    }

    /* Arma el objeto según la entidad del backend, incluye el campo de validación */
    let obj = {
      campoValidacion: 'codigo',
      valor: this.form.value.codigo,
      entidad: {
        id: this.pk,
        codigo: this.form.value.codigo,
        descripcion: this.form.value.descripcion,
        idTipoServicio: { id: this.form.value.tipo_servicio },
        idPrograma: { id: this.form.value.programa },
        idGrupo: { id: this.form.value.grupo },
        idCuentaContable: { id: this.form.value.cuenta_contable },
        idEstadoServicio: { id: this.form.value.estado },
        idEscenario: { id: esc },
        idIva: { id: this.form.value.iva },
        controlUsos: this.form.value.control_usos,
        valorCosto: this.form.value.valor_costo,
        aplicaCeroEmpleados: this.form.value.aplica_cero_empleados,
        requiereDefinirPersonas: this.form.value.requiere_definir_personas,
        requiereDefinirHoras: this.form.value.requiere_definir_horas,
        numeroPersonas: this.form.value.numero_personas,
        numeroHoras: this.form.value.numero_horas,
        aplicaRestriccionMeta: this.form.value.aplica_restriccion_meta,
        meta: this.form.value.meta,
        aplicaEscenario: this.form.value.aplica_escenario,
        aplicaPaquete: this.form.value.aplica_paquete,
      }
    }

    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    if (this.pk > 0) {
      console.log('edition mode')
      this.dataService.guardar(obj.entidad, 'Servicio').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/taquillas/servicio', data.id);
        }, 1000);
      });
    } else {
      this.dataService.guardarPorCampo(obj, 'Servicio').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/taquillas/servicio', data.id);
        }, 1000);

      }, error => {
        /* Genera este mensaje cuando hya un error de codigo repetido en el backend */
        this.notifier.notify('error', 'El código ingresado ya existe, por favor corrija y guarde nuevamente');
      });
    }
  }

  /*********************************
   * DEVUELVE LA LISTADO PRINCIPAL *
   *********************************/
  cancelar() {
    this.utilService.cancelar('/taquillas/servicios')
  }

  /********************************************************************************
   * TRAE EL OBJETO PRINCIPAL Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO REACTIVO *
   ********************************************************************************/
  traerObjeto(id) {
    this.dataService.traerObjetoId('Servicio', id).subscribe((data: any) => {
      this.pk = id;
      this.form.controls['codigo'].setValue(data.codigo);
      this.form.controls['descripcion'].setValue(data.descripcion);
      this.form.controls['tipo_servicio'].setValue(data.idTipoServicio.id);
      this.form.controls['programa'].setValue(data.idPrograma.id);
      this.form.controls['grupo'].setValue(data.idGrupo.id);
      this.form.controls['cuenta_contable'].setValue(data.idCuentaContable.id);
      this.form.controls['estado'].setValue(data.idEstadoServicio.id);
      this.form.controls['escenario'].setValue(data.idEscenario.id);
      this.form.controls['iva'].setValue(data.idIva.id);
      this.form.controls['control_usos'].setValue(data.controlUsos);
      this.form.controls['valor_costo'].setValue(data.valorCosto);
      this.form.controls['aplica_cero_empleados'].setValue(data.aplicaCeroEmpleados);
      this.form.controls['requiere_definir_personas'].setValue(data.requiereDefinirPersonas);
      this.form.controls['requiere_definir_horas'].setValue(data.requiereDefinirHoras);
      this.form.controls['numero_personas'].setValue(data.numeroPersonas);
      this.form.controls['numero_horas'].setValue(data.numeroHoras);
      this.form.controls['aplica_restriccion_meta'].setValue(data.aplicaRestriccionMeta);
      this.form.controls['meta'].setValue(data.meta);
      this.form.controls['aplica_escenario'].setValue(data.aplicaEscenario);
      this.form.controls['aplica_paquete'].setValue(data.aplicaPaquete);
      this.codigoE = [data.idEscenario.id];
      this.descripcionE = [data.idEscenario.id];
      this.infraestructuraE = data.idEscenario.idUnidad.idInfraestructura.descripcion;
      this.unidadE = data.idEscenario.idUnidad.descripcion;
    });
  }

  /**************************************************************************************
   * FUNCIÓN PARA AGREGAR UNA UNIDAD, AL LISTADO DE UNIDADES DEL FORMULARIO SEGCUNDARIO *
   **************************************************************************************/
  agregarServicioAgregado() {

    /* Arma el objeto según la entidad del backend, incluye el campo de validación */
    let obj = {
      campoValidacion: 'codigo',
      valor: String(this.pk)+String(this.servicioPaq),
      entidad: {
        id: this.pkU,                
        idServicio: { id: this.pk },
        idServicioAgregado: {id: this.servicioPaq},
        codigo: String(this.pk)+String(this.servicioPaq)
      }
    }

    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    if (this.pkU > 0) {
      console.log('edition mode')
      this.dataService.guardar(obj.entidad, 'PaqueteServicio').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        /* Luego de guardar envia actualzia el formulario principal y secundario */
        setTimeout(() => {
          this.utilService.editar('/taquillas/servicio', this.pk);
        }, 1000);
      });
    } else {
      this.dataService.guardarPorCampo(obj, 'PaqueteServicio').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        /* Luego de guardar envia actualzia el formulario principal y secundario */
        setTimeout(() => {
          this.utilService.editar('/taquillas/servicio', this.pk);
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
      this.dataService.eliminarObjeto('PaqueteServicio', id).subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha eliminado correctamente');
        this.cargarPaquetes(this.pk);
      });
    }
  }

  /*****************************************************************
   * ACTUALIZA TODO EL COMPONENTE E INICIALIZA FORMULARIO Y LISTAS *
   *****************************************************************/
  clearFormUnidad() {
    this.utilService.editar('/taquillas/servicio', this.pk);
  }


  buscarServicios(term){
    this.dataService.catalogoEntidadBasicaComboDescripcion('Servicio', ['descripcion'], [term], 1, 100)
     .subscribe((data: any) => { this.servicios = data; },
     error => {console.log('There was an error while retrieving data !!!' + error); });
 }

 buscarServiciosCodigo(term){
  this.dataService.catalogoEntidadBasicaComboCodigo('Servicio', ['codigo'], [term], 1, 100)
   .subscribe((data: any) => { this.serviciosCod = data; },
   error => {console.log('There was an error while retrieving data !!!' + error); });
}


 buscarEscenarios(term){
  this.dataService.catalogoEntidadBasicaComboDescripcion('Escenario', ['descripcion'], [term], 1, 100)
   .subscribe((data: any) => { this.escenarios = data; },
   error => {console.log('There was an error while retrieving data !!!' + error); });
}

buscarEscenariosCodigo(term){
  this.dataService.catalogoEntidadBasicaComboCodigo('Escenario', ['codigo'], [term], 1, 100)
   .subscribe((data: any) => { this.escenariosCod = data; },
   error => {console.log('There was an error while retrieving data !!!' + error); });
}

seleccionarEscenario(option: IOption) {  
  this.dataService.traerObjetoId('Escenario', option.value).subscribe((data: any) => {   
    this.infraestructuraE = data.idUnidad.idInfraestructura.descripcion;
    this.unidadE = data.idUnidad.descripcion;
    this.descripcionE = [data.id];   
    this.codigoE = [data.id]
    this.idE = data.id;
  });
}

seleccionarServicio(option: IOption) {  
  this.dataService.traerObjetoId('Servicio', option.value).subscribe((data: any) => {       
    this.descripcionS = data.descripcion;   
    this.codigoS = [data.id];
    this.tipo_servicioS = data.idTipoServicio.descripcion; 
    this.valor_costoS = data.valorCosto; 
    this.servicioPaq = data.id;
  });
}


onChanges() {
  console.log('Captura cambios')
  this.form.get('requiere_definir_personas').valueChanges
  .subscribe(check => {
      if (!check) {
          this.form.get('numero_personas').reset();
          this.form.get('numero_personas').disable();
      }
      else {
          this.form.get('numero_personas').enable();
      }
  });

  this.form.get('requiere_definir_horas').valueChanges
  .subscribe(check => {
      if (!check) {
          this.form.get('numero_horas').reset();
          this.form.get('numero_horas').disable();
      }
      else {
          this.form.get('numero_horas').enable();
      }
  });
}

}
