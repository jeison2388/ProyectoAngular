import { Component, OnInit } from '@angular/core';
import { NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { DataService } from '../../../../servicios/data.service';
import { UtilService } from '../../../../servicios/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-escenario',
  templateUrl: './escenario.component.html',
  providers: [NgbTimepickerConfig]
})
export class EscenarioComponent implements OnInit {

  /********************************************************************
   * DECLARACIÓN VARIABLES DE TIPO TIME PARA EL SELECTOR DE HORARIOS *
   ********************************************************************/
  timeIni: NgbTimeStruct = { hour: 8, minute: 0, second: 0 };
  timeFin: NgbTimeStruct = { hour: 12, minute: 0, second: 0 };


  /**************************************
   * VARIABLES DEL FORMULARIO PRINCIPAL *
   **************************************/
  // Id formulario principal
  pk = 0;
  tipos_escenario: any[];
  unidades: any[];
  infraestructuras: any[];
  submitted = false;
  value: any;


  /*******************************************
   * VARIABLES PARA EL FORMULARIO SECUNDARIO *
   *******************************************/
  escenarios_secundarios: any = [];
  codigoS = '';
  descripcionS = '';
  cantidadS = 1;

  //Tamaño del  contenedor para controlar que se ajuste con el secundario
  conU = 0;
  //Id formulario secundario
  pkU = 0;

  //Variables para controlar caso especial de mensajes de validación en el formulario secundario
  invalidCod = "";
  invalidDes = "";

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

    /****************************************************
     * INICIALIZA VARIEBLES DE LOS SELECTORES DE TIEMPO *
     ****************************************************/
    config.meridian = true;
    config.seconds = false;
    config.spinners = true;

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
          this.cargarEscenariosSecundarios(params['id']);
          this.conU = 6;
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
    tipo_escenario: new FormControl('', Validators.required),
    infraestructura: new FormControl('', Validators.required),
    unidad: new FormControl('', Validators.required),
    aplica_venta_horas: new FormControl('', ),
    atencion_desde: new FormControl('', Validators.required),
    atencion_hasta: new FormControl('', Validators.required),
  });

  /****************************************************
   * INICIALIZAR EL FORUMARIO CON VALORES POR DEFECTO *
   ****************************************************/
  initializeFormGroup() {
    this.form.setValue({
      codigo: '',
      descripcion: '',
      tipo_escenario: '',
      infraestructura: '',
      unidad: '',
      aplica_venta_horas: false,
      atencion_desde: this.timeIni,
      atencion_hasta: this.timeFin,
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
    this.dataService.catalogoEntidadBasica('TipoEscenario', [], [])
      .subscribe((data: any) => { this.tipos_escenario = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('Infraestructura', [], [])
        .subscribe((data: any) => { this.infraestructuras = data; },
          error => {
            console.log('There was an error while retrieving data !!!' + error);
          });
  }

  /**********************************************************
   * CARGA EL LISTADO DE UNIDADES DEL FORMULARIO SECUNDARIO *
   **********************************************************/
   cargarEscenariosSecundarios(id) {
    this.dataService.catalogoEntidadBasica('EscenarioSecundario', ['esc'], [id])
      .subscribe((data: any) => { this.escenarios_secundarios = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }

  /**********************************************************************
   * CARGA COMBO DEPENDIENTE DE CIUDADES, SEGÚN EL ESTADO SELECCIONADO *
   **********************************************************************/
   cargarUnidades(infraestructura) {
    this.dataService.listaEntidadRelacion('Unidad', ['idInfraestructura'], ['id'], [infraestructura])
      .subscribe((data: any) => { this.unidades = data; },
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

    /* Ajusta el formato de tiempo a 24 horas para horario principal */
    const desde = moment(this.form.value.atencion_desde.hour + ':' + this.form.value.atencion_desde.minute + ':' + this.form.value.atencion_desde.second, 'HH:mm:ss').format('HH:mm');
    const hasta = moment(this.form.value.atencion_hasta.hour + ':' + this.form.value.atencion_hasta.minute + ':' + this.form.value.atencion_hasta.second, 'HH:mm:ss').format('HH:mm');

    /* Arma el objeto según la entidad del backend, incluye el campo de validación */
    let obj = {
      campoValidacion: 'codigo',
      valor: this.form.value.codigo,
      entidad: {
        id: this.pk,
        codigo: this.form.value.codigo,
        descripcion: this.form.value.descripcion,
        idTipoEscenario: { id: this.form.value.tipo_escenario },
        idUnidad: { id: this.form.value.unidad },
        aplicaVentaHoras: this.form.value.aplica_venta_horas,
        atencionDesde: desde,
        atencionHasta: hasta,
      }
    }

    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    if (this.pk > 0) {
      console.log('edition mode')
      this.dataService.guardar(obj.entidad, 'Escenario').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/taquillas/escenario', data.id);
        }, 1000);
      });
    } else {
      this.dataService.guardarPorCampo(obj, 'Escenario').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/taquillas/escenario', data.id);
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
    this.utilService.cancelar('/taquillas/escenarios')
  }

  /********************************************************************************
   * TRAE EL OBJETO PRINCIPAL Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO REACTIVO *
   ********************************************************************************/
  traerObjeto(id) {
    this.dataService.traerObjetoId('Escenario', id).subscribe((data: any) => {
      this.pk = id;
      this.form.controls['codigo'].setValue(data.codigo);
      this.form.controls['descripcion'].setValue(data.descripcion);
      this.form.controls['unidad'].setValue(data.idUnidad.id);
      this.form.controls['tipo_escenario'].setValue(data.idTipoEscenario.id);
      this.form.controls['aplica_venta_horas'].setValue(data.aplicaVentaHoras);
      this.form.controls['infraestructura'].setValue(data.idUnidad.idInfraestructura.id);
      const ini = this.utilService.separarCadena(data.atencionDesde, ':');
      const fin = this.utilService.separarCadena(data.atencionHasta, ':');
      this.timeIni.hour = Number(ini[0]);
      this.timeIni.minute = Number(ini[1]);
      this.timeFin.hour = Number(fin[0]);
      this.timeFin.minute = Number(fin[1]);
      this.form.controls['atencion_desde'].setValue(this.timeIni);
      this.form.controls['atencion_hasta'].setValue(this.timeFin);
    });
  }

  /**************************************************************************************
   * FUNCIÓN PARA AGREGAR UNA UNIDAD, AL LISTADO DE UNIDADES DEL FORMULARIO SEGCUNDARIO *
   **************************************************************************************/
  agregarEscenarioSecundario() {

    /* Controla los errores de validación en formulario secundario no reactivo */
    let error = false;
    if (this.codigoS === '') {
      error = true;
      this.invalidCod = 'is-invalid'
    } else {
      this.invalidCod = '';
    }
    if (this.descripcionS === '') {
      error = true;
      this.invalidDes = 'is-invalid'
    } else {
      this.invalidDes = '';
    }
    if (error) {
      console.log('Error guardando')
      return;
    }

    /* Arma el objeto según la entidad del backend, incluye el campo de validación */
    let obj = {
      campoValidacion: 'codigo',
      valor: this.codigoS,
      entidad: {
        id: this.pkU,
        codigo: this.codigoS,
        descripcion: this.descripcionS,
        numeroPersonas: this.cantidadS,
        idEscenario: { id: this.pk }
      }
    }

    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    if (this.pkU > 0) {
      console.log('edition mode')
      this.dataService.guardar(obj.entidad, 'EscenarioSecundario').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        /* Luego de guardar envia actualzia el formulario principal y secundario */
        setTimeout(() => {
          this.utilService.editar('/taquillas/escenario', this.pk);
        }, 1000);
      });
    } else {
      this.dataService.guardarPorCampo(obj, 'EscenarioSecundario').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        /* Luego de guardar envia actualzia el formulario principal y secundario */
        setTimeout(() => {
          this.utilService.editar('/taquillas/escenario', this.pk);
        }, 1000);

      }, error => {
        /* Genera este mensaje cuando hya un error de codigo repetido en el backend */
        this.notifier.notify('error', 'El código ingresado ya existe, por favor corrija y guarde nuevamente');
      });
    }
  }

  /********************************************************************************
   * TRAE EL OBJETO SECUNADARIO AL HACER CLICK EN BOTON EDITAR DEL LISTADO DE UNIDADES Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO NO REACTIVO *
   ********************************************************************************/
  editar(id) {
    this.dataService.traerObjetoId('EscenarioSecundario', id).subscribe((data: any) => {
      this.pkU = id;
      this.codigoS = data.codigo;
      this.descripcionS = data.descripcion;
      this.cantidadS = data.numeroPersonas;
    });
  }

  /*******************************************************
   * FUNCIÓN QUE PERMITE ELIMINAR UNA UNIDAD DE LA LISTA *
   *******************************************************/
  eliminar(id) {
    if (confirm('Seguro de eliminar el registro?')) {
      this.dataService.eliminarObjeto('EscenarioSecundario', id).subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha eliminado correctamente');
        this.cargarEscenariosSecundarios(this.pk);
      });
    }
  }

  /*****************************************************************
   * ACTUALIZA TODO EL COMPONENTE E INICIALIZA FORMULARIO Y LISTAS *
   *****************************************************************/
  clearFormUnidad() {
    this.utilService.editar('/taquillas/escenario', this.pk);
  }


}
