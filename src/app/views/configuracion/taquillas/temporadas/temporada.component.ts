import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgbTimepickerConfig, NgbTimeStruct, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { DataService } from '../../../../servicios/data.service';
import { UtilService } from '../../../../servicios/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-temporada',
  templateUrl: './temporada.component.html',
})
export class TemporadaComponent implements OnInit {


  desde: NgbDateStruct = {year: 2019, month: 1, day: 1};
  hasta: NgbDateStruct  = {year: 2019, month: 1, day: 1};
 

  /**************************************
   * VARIABLES DEL FORMULARIO PRINCIPAL *
   **************************************/
  // Id formulario principal 
  pk = 0; 
  submitted = false;
  value: any;


 
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
    private calendar: NgbCalendar,
    private route: ActivatedRoute, ) {

    //incicializa variable de las notificaciones
    this.notifier = notifierService;
  }

  ngOnInit() {  
    //Inciializa tamaño contenedor formulario principal
    this.conU = 12;
    //Inicializa el formulario reactivo principal
    this.initializeFormGroup();
   

    /**********************************************************************
     * RECOGE LOS PARAMETROS DE LA URL Y TRAE LE OBJETO PARA MODO EDICIÓN *
     **********************************************************************/
    this.route
      .queryParams
      .subscribe(params => {
        console.log(params)
        if (params['id']) {
          this.traerObjeto(params['id'])         
        } else {
          console.log('Nuevo')
        }
      })


      this.desde = this.calendar.getToday();
      this.hasta = this.calendar.getToday();

  }


  /*******************************
   * CONSTRUCCIÓN DEL FORMULARIO *
   *******************************/
  form: FormGroup = new FormGroup({
    desde: new FormControl('', Validators.required),
    hasta: new FormControl('', Validators.required),
  });

  /****************************************************
   * INICIALIZAR EL FORUMARIO CON VALORES POR DEFECTO *
   ****************************************************/
  initializeFormGroup() {
    this.form.setValue({
      desde: this.calendar.getToday(),
      hasta: this.calendar.getToday()
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

    /* Ajusta el formato de tiempo a fecha aaaa-mm-dd */
    let desde = new Date(this.form.value.desde.year, this.form.value.desde.month-1, this.form.value.desde.day);
    let hasta = new Date(this.form.value.hasta.year, this.form.value.hasta.month-1, this.form.value.hasta.day);


    

    /* Arma el objeto según la entidad del backend, incluye el campo de validación */
    let obj = {      
        id: this.pk,
        desde: desde,
        hasta: hasta,
    }

    /* Controla guardado de edición o inserción, segun el valor del Id (pk) formulario principal*/
    if (this.pk > 0) {
      console.log('edition mode')
      this.dataService.guardar(obj, 'Temporada').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/taquillas/temporada', data.id);
        }, 1000);
      });
    } else {
      this.dataService.guardar(obj, 'Temporada').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        /* Luego de guardar redirige a modo de edición */
        setTimeout(() => {
          this.utilService.editar('/taquillas/temporada', data.id);
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
    this.utilService.cancelar('/taquillas/temporadas')
  }

  /********************************************************************************
   * TRAE EL OBJETO PRINCIPAL Y LO ASIGNA A LOS CONTROLES DEL FORMULARIO REACTIVO *
   ********************************************************************************/
  traerObjeto(id) {
    this.dataService.traerObjetoId('Temporada', id).subscribe((data: any) => {
      this.pk = id;     
      const desde = this.utilService.separarCadena(data.desde, '-');
      const hasta = this.utilService.separarCadena(data.hasta, '-');      
      this.desde.year = Number(desde[0]);
      this.desde.month = Number(desde[1]);
      this.desde.day =Number(desde[2]);
      this.hasta.year = Number(hasta[0]);
      this.hasta.month = Number(hasta[1]);
      this.hasta.day = Number(hasta[2]);
      this.form.controls['desde'].setValue(this.desde);
      this.form.controls['hasta'].setValue(this.hasta);
    });
  }

  

}