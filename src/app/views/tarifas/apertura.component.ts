import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-apertura',
  templateUrl: './apertura.component.html',
})
export class AperturaComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number};
  servicios: any[];
  puntos_venta: any[];
  srv: any;
  filtroCambiado: Subject<string> = new Subject<string>();
  submitted = false;

  combos: any[][];

  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];


public readonly notifier: NotifierService;

  constructor(
    private calendar: NgbCalendar,
    public dataService: DataService,
    public notifierService: NotifierService,
    public router: Router,
    private route: ActivatedRoute,
    //public _location: Location
    ) {
    this.notifier = notifierService;
  }


  ngOnInit() {
    this.initializeFormGroup();
    // this.cargarEntidades();
    
    

  }

  onFiltroCambiado(text: string) {
    this.filtroCambiado.next(text);
}

  selectToday() {
    this.model = this.calendar.getToday();
  }

  //CONSTRUCCIÓN DEL FORMULARIO
  form: FormGroup = new FormGroup({    
    servicio: new FormControl('', Validators.required),
    fecha_vigencia_inicio: new FormControl('', Validators.required),
    fecha_vigencia_fin: new FormControl('', Validators.required),
    grupo: new FormControl('', Validators.required),
    subgrupo: new FormControl('', Validators.required),
    escenario: new FormControl('', Validators.required),
    uis: new FormControl('', Validators.required),
    centro_costo: new FormControl({ disabled: true, value: null },  Validators.required),
    numero_horas: new FormControl('', Validators.required),
    numero_personas: new FormControl('', Validators.required),
    meta: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    rango_edad: new FormControl('', Validators.required),
    tipo_servicio: new FormControl('', Validators.required),
    forma_pago: new FormControl('', Validators.required),
    nivel: new FormControl('', Validators.required),
    fecha_limite_inscripcion: new FormControl('', Validators.required),
    numero_dias_pago: new FormControl('', Validators.required),
    fecha_inicio: new FormControl('', Validators.required),
    fecha_fin: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    valor_tarifa: new FormControl('', Validators.required),
    valor_costo: new FormControl('', Validators.required),
    puntos_venta: new FormControl('', Validators.required),
    instructores: new FormControl('', Validators.required),
    participantes: new FormControl('', Validators.required),
    edad_inicio: new FormControl('', Validators.required),
    edad_fin: new FormControl('', Validators.required),
    dias: new FormControl('', Validators.required),
    aplica_paquete: new FormControl('', Validators.required),
    aplica_restriccion_meta: new FormControl('', Validators.required),
    aplica_condicion_discapacidad: new FormControl('', Validators.required),
    permite_ventas_futuro: new FormControl('', Validators.required),
    aplica_temporada: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
     
      servicio: '',
      fecha_vigencia_inicio: '',
      fecha_vigencia_fin: '',
      grupo:'',
      subgrupo:'',
      escenario:'',
      uis:'',
      centro_costo:'',
      numero_horas:'',
      numero_personas:'',
      meta:'',
      categoria:'',
      rango_edad:'',
      tipo_servicio:'',
      forma_pago: '',
      fecha_limite_inscripcion: '',
      numero_dias_pago: '',
      fecha_inicio: '',
      fecha_fin: '',
      nivel: '',
      descripcion: '',
      puntos_venta: '',
      valor_tarifa: '',
      valor_costo: '',
      instructores: '',
      participantes: '',
      edad_inicio: '',
      edad_fin: '',
      dias: '',
      aplica_paquete: '',
      aplica_restriccion_meta: '',
      aplica_condicion_discapacidad: '',
      permite_ventas_futuro: '',
      aplica_temporada: '',
    });
  }

    /**************************************************************************
   * FUNCIÓN PARA ACCEDER A LOS CONTROLES DEL FORMULARIO REACTIVO PRINCIPAL *
   **************************************************************************/
  get f() { return this.form.controls; }

  cargarEntidades() {
    this.dataService.catalogoEntidadBasica('Servicio', [], [])
      .subscribe((data: any) => { this.servicios = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
      
      }

  buscarServicios(term){
     this.dataService.catalogoEntidadBasicaCombo('Servicio', ['descripcion'], [term], 1, 5)
      .subscribe((data: any) => { this.servicios = data; },
      error => {console.log('There was an error while retrieving data !!!' + error); });
  }
  
  buscarPuntosVenta(term){
    this.dataService.catalogoEntidadBasicaCombo('PuntoVenta', ['descripcion'], [term], 1, 5)
     .subscribe((data: any) => { this.puntos_venta = data; },
     error => {console.log('There was an error while retrieving data !!!' + error); });
  }


  guardar(){


    console.log('Submit');

    console.log(this.form.value.puntos_venta)
    console.log(this.form.value.servicio)
  }


}
