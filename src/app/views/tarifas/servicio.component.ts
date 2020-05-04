import { Component, OnInit, ViewChild, SecurityContext } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
})
export class ServicioComponent implements OnInit {
  areas: any[];
  grupos: any[];
  programas: any[];
  tipos_servicios: any[];
  ivas: any[];
  cuentas_contables: any[];
  estados_servicios: any[];
  submitted = false;
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

  public readonly notifier: NotifierService;

  constructor(public dataService: DataService,
    public notifierService: NotifierService,
    public router: Router,
    private route: ActivatedRoute,
    public _location: Location) {
    this.notifier = notifierService;
  }

  ngOnInit() {

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



    this.initializeFormGroup();
    this.cargarEntidades();
  }


  //CONSTRUCCIÓN DEL FORMULARIO
  form: FormGroup = new FormGroup({
    codigo: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(256), Validators.minLength(4)]),
    area: new FormControl('', Validators.required),
    grupo: new FormControl('', Validators.required),
    programa: new FormControl('', Validators.required),
    tipo_servicio: new FormControl('', Validators.required),
    iva: new FormControl('', Validators.required),
    cuenta_contable: new FormControl('', [Validators.required]),
    control_usos: new FormControl(''),
    estado_servicio: new FormControl('', Validators.required),
    aplica_paquete: new FormControl(''),
    aplica_cero_empleados: new FormControl(''),
    requiere_definir_horas: new FormControl(''),
    requiere_definir_personas: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      codigo: '',
      descripcion: '',
      area: '',
      grupo: '',
      programa: '',
      tipo_servicio: '',
      iva: '',
      cuenta_contable: '',
      control_usos: false,
      estado_servicio: '',
      aplica_paquete: false,
      aplica_cero_empleados: false,
      requiere_definir_horas: false,
      requiere_definir_personas: false
    });
  }

  get f() { return this.form.controls; }


  guardar() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log('Error guardando')
      return;
    }

    let obj = {
      campoValidacion: 'codigo',
      valor: this.form.value.codigo,
      entidad: {
        id: this.pk,
        codigo: this.form.value.codigo,
        controlUsos: this.form.value.control_usos,
        descripcion: this.form.value.descripcion,
        idArea: { id: this.form.value.area },
        idCuentaContable: { id: this.form.value.cuenta_contable },
        idEstadoServicio: { id: this.form.value.estado_servicio },
        idGrupo: { id: this.form.value.grupo },
        idIva: { id: this.form.value.iva },
        idPrograma: { id: this.form.value.programa },
        idTipoServicio: { id: this.form.value.tipo_servicio },
        aplicaPaquete: this.form.value.aplica_paquete,
        aplicaCeroEmpleados: this.form.value.aplica_cero_empleados,
        requiereDefinirHoras: this.form.value.requiere_definir_horas,
        requiereDefinirPersonas: this.form.value.requiere_definir_personas,
      }
    }

    if (this.pk > 0) {
      console.log('edition mode')
      this.dataService.guardar(obj.entidad, 'Servicio').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha actualizado correctamente');
        setTimeout(() => {
          this.editar(data.id);
        }, 1000);
      });
    } else {

      this.dataService.guardarPorCampo(obj, 'Servicio').subscribe((data: any) => {
        this.notifier.notify('success', 'La información se ha almacenado correctamente');
        setTimeout(() => {
          this.editar(data.id);
        }, 1000);

      }, error => {
        console.log('There was an error while retrieving data !!!' + error);
        this.notifier.notify('error', 'El codigo ya existe');
      });
    }

    //this.clearForm();

  }

  cargarEntidades() {
    this.dataService.catalogoEntidadBasica('Area', [], [])
      .subscribe((data: any) => { this.areas = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('Grupo', [], [])
      .subscribe((data: any) => { this.grupos = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('Programa', [], [])
      .subscribe((data: any) => { this.programas = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('TipoServicio', [], [])
      .subscribe((data: any) => { this.tipos_servicios = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('Iva', [], [])
      .subscribe((data: any) => { this.ivas = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('CuentaContable', [], [])
      .subscribe((data: any) => { this.cuentas_contables = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
    this.dataService.catalogoEntidadBasica('EstadoServicio', [], [])
      .subscribe((data: any) => { this.estados_servicios = data; },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });

  }

  clearForm() {
    this.form.reset();
    this.refrescar();
  }

  refrescar(): void {
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this._location.path())])
    })
  }

  cancelar(): void {
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/tarifas/servicios'])
    })
  }

  editar(id): void {
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/tarifas/servicio'], { queryParams: { id: id } })
    })
  }


  traerObjeto(id) {
    this.dataService.traerObjetoId('Servicio', id).subscribe((data: any) => {
      this.servicio = data;
      this.pk = data.id;
      this.form.controls['codigo'].setValue(data.codigo);
      this.form.controls['descripcion'].setValue(data.descripcion);
      this.form.controls['area'].setValue(data.idArea.id);
      this.form.controls['grupo'].setValue(data.idGrupo.id);
      this.form.controls['programa'].setValue(data.idPrograma.id);
      this.form.controls['tipo_servicio'].setValue(data.idTipoServicio.id);
      this.form.controls['iva'].setValue(data.idIva.id);
      this.form.controls['cuenta_contable'].setValue(data.idCuentaContable.id);
      this.form.controls['estado_servicio'].setValue(data.idEstadoServicio.id);
      this.form.controls['control_usos'].setValue(data.controlUsos);
      this.form.controls['aplica_paquete'].setValue(data.aplicaPaquete);
      this.form.controls['aplica_cero_empleados'].setValue(data.aplicaCeroEmpleados);
      this.form.controls['requiere_definir_horas'].setValue(data.requiereDefinirHoras);
      this.form.controls['requiere_definir_personas'].setValue(data.requiereDefinirPersonas);
    });
  }
} //final clase