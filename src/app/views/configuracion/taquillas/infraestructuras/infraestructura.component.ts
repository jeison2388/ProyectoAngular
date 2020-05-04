import { Component, OnInit } from '@angular/core';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../../../servicios/util.service';

@Component({
  selector: 'app-infraestructura',
  templateUrl: './infraestructura.component.html',
  providers: [NgbTimepickerConfig]
})
export class InfraestructuraComponent implements OnInit {

  /********************************************************************
   * DECLARACIÓN VARIABLES DE TIPO TIME PARA EL SELECTOR DE HORARIOS *
   ********************************************************************/
  timeIni: NgbTimeStruct = { hour: 8, minute: 0, second: 0 };
  timeFin: NgbTimeStruct = { hour: 12, minute: 0, second: 0 };
  timeIniU: NgbTimeStruct = { hour: 8, minute: 0, second: 0 };
  timeFinU: NgbTimeStruct = { hour: 12, minute: 0, second: 0 };


  /**************************************
   * VARIABLES DEL FORMULARIO PRINCIPAL *
   **************************************/
  // Id formulario principal 
  pk = 0;
  estados: any[];
  ciudades: any[];
  submitted = false;
  value: any;


  /*******************************************
   * VARIABLES PARA EL FORMULARIO SECUNDARIO *
   *******************************************/
  unidades: any = [];
  codigou = '';
  descripcionu = '';
  cantidadu = 1;
  desdeu: any;
  hastau: any;
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
    //Asigna un tiempo pordefecto en el seleccinador de ngModel
    this.desdeu = this.timeIniU;
    this.hastau = this.timeFinU;
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
          this.cargarUnidades(params['id']);
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
    estado: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
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
      estado: '',
      ciudad: '',
      direccion: '',
      telefono: '',
      latitud: '',
      longitud: '',
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
    this.dataService.catalogoEntidadBasica('Estado', [], [])
      .subscribe((data: any) => { this.estados = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }

  /**********************************************************
   * CARGA EL LISTADO DE UNIDADES DEL FORMULARIO SECUNDARIO *
   **********************************************************/
  cargarUnidades(id) {
    this.dataService.catalogoEntidadBasica('Unidad', ['infra'], [id])
      .subscribe((data: any) => { this.unidades = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }

  /**********************************************************************
   * CARGA COMBO DEPENDIENTE DE CIUDADES, SEGÚN EL ESTADO SELECCIONADO *
   **********************************************************************/
  cargarCiudades(estado) {
    this.dataService.listaEntidadRelacion('Ciudad', ['idEstado'], ['id'], [estado])
      .subscribe((data: any) => { this.ciudades = data; },
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
        idCiudad: { id: this.form.value.ciudad },
        direccion: this.form.value.direccion,
        telefono: this.form.value.telefono,
        latitud: this.form.value.latitud,
        longitud: this.form.value.longitud,
        atencionDesde: desde,
        atencionHasta: hasta,
      }
    }

    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    if (this.pk > 0) {
      console.log('edition mode')
      this.dataService.guardar(obj.entidad, 'Infraestructura').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/taquillas/infraestructura', data.id);
        }, 1000);
      });
    } else {
      this.dataService.guardarPorCampo(obj, 'Infraestructura').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/taquillas/infraestructura', data.id);
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
    this.utilService.cancelar('/taquillas/infraestructuras')
  }

  /********************************************************************************
   * TRAE EL OBJETO PRINCIPAL Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO REACTIVO *
   ********************************************************************************/
  traerObjeto(id) {
    this.dataService.traerObjetoId('Infraestructura', id).subscribe((data: any) => {
      this.pk = id;
      this.form.controls['codigo'].setValue(data.codigo);
      this.form.controls['descripcion'].setValue(data.descripcion);
      this.form.controls['ciudad'].setValue(data.idCiudad.id);
      this.form.controls['estado'].setValue(data.idCiudad.idEstado.id);
      this.form.controls['direccion'].setValue(data.direccion);
      this.form.controls['telefono'].setValue(data.telefono);
      this.form.controls['latitud'].setValue(data.latitud);
      this.form.controls['longitud'].setValue(data.longitud);
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
  agregarUnidad() {

    /* Controla los errores de validación en formulario secundario no reactivo */
    let error = false;
    if (this.codigou === '') {
      error = true;
      this.invalidCod = 'is-invalid'
    } else {
      this.invalidCod = '';
    }
    if (this.codigou === '') {
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
      valor: this.codigou,
      entidad: {
        id: this.pkU,
        codigo: this.codigou,
        descripcion: this.descripcionu,
        cantidadPersonas: this.cantidadu,
        atencionDesde: moment(this.desdeu.hour + ':' + this.desdeu.minute + ':' + this.desdeu.second, 'HH:mm:ss').format('HH:mm'),
        atencionHasta: moment(this.hastau.hour + ':' + this.hastau.minute + ':' + this.hastau.second, 'HH:mm:ss').format('HH:mm'),
        idInfraestructura: { id: this.pk }
      }
    }

    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    if (this.pkU > 0) {
      console.log('edition mode')
      this.dataService.guardar(obj.entidad, 'Unidad').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        /* Luego de guardar envia actualzia el formulario principal y secundario */
        setTimeout(() => {
          this.utilService.editar('/taquillas/infraestructura', this.pk);
        }, 1000);
      });
    } else {
      this.dataService.guardarPorCampo(obj, 'Unidad').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        /* Luego de guardar envia actualzia el formulario principal y secundario */
        setTimeout(() => {
          this.utilService.editar('/taquillas/infraestructura', this.pk);
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
    this.dataService.traerObjetoId('Unidad', id).subscribe((data: any) => {
      this.pkU = id;
      this.codigou = data.codigo;
      this.descripcionu = data.descripcion;
      this.cantidadu = data.cantidadPersonas;
      const ini = this.utilService.separarCadena(data.atencionDesde, ':');
      const fin = this.utilService.separarCadena(data.atencionHasta, ':');
      this.timeIni.hour = Number(ini[0]);
      this.timeIni.minute = Number(ini[1]);
      this.timeFin.hour = Number(fin[0]);
      this.timeFin.minute = Number(fin[1]);
      this.desdeu = this.timeIni;
      this.hastau = this.timeFin;
    });
  }

  /*******************************************************
   * FUNCIÓN QUE PERMITE ELIMINAR UNA UNIDAD DE LA LISTA *
   *******************************************************/
  eliminar(id) {
    if (confirm('Seguro de eliminar el registro?')) {
      this.dataService.eliminarObjeto('Unidad', id).subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha eliminado correctamente');
        this.cargarUnidades(this.pk);
      });
    }
  }

  /*****************************************************************
   * ACTUALIZA TODO EL COMPONENTE E INICIALIZA FORMULARIO Y LISTAS *
   *****************************************************************/
  clearFormUnidad() {
    this.utilService.editar('/taquillas/infraestructura', this.pk);
  }


}
