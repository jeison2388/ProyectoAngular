import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { DataService } from '../../../../servicios/data.service';
import { UtilService } from '../../../../servicios/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
//import { Md5 } from 'ts-md5/dist/md5';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import {Md5} from "md5-typescript";


@Component({
  selector: 'app-usuariopub',
  templateUrl: './usuariopub.component.html',
  providers: [NgbTimepickerConfig]
})
export class UsuariopubComponent implements OnInit {

  @ViewChild('foco', { static: true }) myInput: ElementRef;


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

  submitted = false;
  value: any;
  perfiles: any[];
  empresas: any[];
  tipos_identificacion: any[];
  establecimientos: any[];
  loginaux = '';
  claveaux = '';
  clave_igual = true;




  /********************************************
   * DECLARA VARIABLE PARA LAS NOTIFICACIONES *
   ********************************************/
  public readonly notifier: NotifierService;

  constructor(config: NgbTimepickerConfig,
    public dataService: DataService,
    public utilService: UtilService,
    public notifierService: NotifierService,
    public seguridadService: SeguridadService,
    public router: Router,
    private route: ActivatedRoute, ) {


    //incicializa variable de las notificaciones
    this.notifier = notifierService;
  }

  ngOnInit() {
    //Inicializa el formulario reactivo principal
    this.initializeFormGroup();
    //Carga las listas de mostrar al inicio, combos especialmente
    this.cargarEntidades();

      this.traerObjeto(localStorage.getItem('id_usuario'))

  }


  /*******************************
   * CONSTRUCCIÓN DEL FORMULARIO *
   *******************************/
  form: FormGroup = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    id_empresa: new FormControl('', Validators.required),  
    login: new FormControl('', Validators.required),
    clave: new FormControl('', ),
    claveCF: new FormControl('', ),
    claveAnt: new FormControl('', ),
  });

  /****************************************************
   * INICIALIZAR EL FORUMARIO CON VALORES POR DEFECTO *
   ****************************************************/
  initializeFormGroup() {
    this.form.setValue({
      nombres: '',
      apellidos: '',
      id_empresa: '',
      login: '',
      clave: '',
      claveCF: '',
      claveAnt: '',
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
    this.dataService.catalogoEntidadBasica('Empresa', [], [])
      .subscribe((data: any) => { this.empresas = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('TipoIdentificacion', [], [])
      .subscribe((data: any) => { this.tipos_identificacion = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('Perfil', [], [])
      .subscribe((data: any) => { this.perfiles = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

    /*
          this.dataService.catalogoEntidadBasica('Establecimiento', [], [])
        .subscribe((data: any) => { this.establecimientos = data; },
          error => {
            console.log('There was an error while retrieving data !!!' + error);
          });
  */

    this.dataService.catalogoEntidadBasicaComboDescripcionUsuario('Establecimiento', [], [], 1, 100)
      .subscribe((data: any) => { this.establecimientos = data; },
        error => { console.log('There was an error while retrieving data !!!' + error); });

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
    
    const md5 = new Md5();
    const md51 = new Md5();
    /* Arma el objeto según la entidad del backend, incluye el campo de validación */


    let obj = null;
    let claveigual = false;
    let anterior = '';

if(this.form.value.clave!==''){




  anterior = Md5.init(this.form.value.claveAnt);

  if(!(anterior == String(this.claveaux))) {
    this.notifier.notify('error', 'Las clave anterior no es correcta');
    return;
  }


  obj = {
    campoValidacion: 'login',
    valor: this.form.value.login,
    entidad: {
      id: this.pk,       
      nombres: this.form.value.nombres.toUpperCase(),
      apellidos: this.form.value.apellidos.toUpperCase(),      
      clave: Md5.init(this.form.value.clave),      
    }
  }


}else {
  obj = {
    campoValidacion: 'login',
    valor: this.form.value.login,
    entidad: {
      id: this.pk,       
      nombres: this.form.value.nombres.toUpperCase(),
      apellidos: this.form.value.apellidos.toUpperCase(), 
      clave:  ''
    }
  }
}

this.confirmarClave(0);

if(!this.clave_igual){
  return;
}
    
    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    if (this.pk > 0) {
      this.seguridadService.actualizar(obj.entidad).subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        setTimeout(() => {          
          this.utilService.editar('/seguridad/usuariopub', data.id);
        }, 1000);
      });

    }
  }


  // ===========================================================================
  // CONFIRMA LAS CLAVES y se posisiona FOCO
  // ===========================================================================
  confirmarClave(event) {
    if (this.form.value.clave !== this.form.value.claveCF) {     
      this.form.controls['clave'].setValue('');
      this.form.controls['claveCF'].setValue('');
      this.clave_igual = false;
      this.myInput.nativeElement.focus();      
      this.notifier.notify('error', 'Las claves no coinciden');
    }else {
      this.clave_igual = true;
    }
  }


  /*********************************
   * DEVUELVE LA LISTADO PRINCIPAL *
   *********************************/
  cancelar() {
    this.utilService.cancelar('/seguridad/usuarios')
  }

  /********************************************************************************
   * TRAE EL OBJETO PRINCIPAL Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO REACTIVO *
   ********************************************************************************/
  traerObjeto(id) {
    this.dataService.traerObjetoId('Usuario', id).subscribe((data: any) => {
      this.pk = id;
      this.form.controls['nombres'].setValue(data.nombres);
      this.form.controls['apellidos'].setValue(data.apellidos);
      this.form.controls['id_empresa'].setValue(data.idEmpresa.razonSocial);
      this.form.controls['login'].setValue(data.login);      
      this.claveaux = data.clave;  
      this.loginaux = data.login;
    });
  }



  /*****************************************************************
   * ACTUALIZA TODO EL COMPONENTE E INICIALIZA FORMULARIO Y LISTAS *
   *****************************************************************/
  clearForm() {
    this.utilService.cancelar('/seguridad/usuario');
  }


  seleccionarEstablecimiento(event) {

  }

}