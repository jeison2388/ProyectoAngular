import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../servicios/data.service';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { UtilAutoGestionAfiliados } from '../UtilAutoGestionAfiliados';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-inscripcionEsfoder',
  templateUrl: './inscripcionEsfoder.component.html'
})
export class InscripcionEsfoderComponent implements OnInit {
  /*********************VARIABLE GLOBALE***************** */
  private TAM_MAX_FILE_FOTO: number = 3072;
  private TAM_MAX_FILE: number = 4960;
  private REMOVE_ERROR: boolean = false;
  private SHOW_ERROR: boolean = true;

  fieldsForm: FormGroup;
  utilAutoGestionAfiliados: UtilAutoGestionAfiliados;

  titleListInstructores: string;
  subtitleListInstructores: string;
  nameBtnAdd: string;
  nameBtnCancel: string;

  filePhoto: File;
  srcPhotoView: any;
  thereIsErrorPhoto: boolean;
  msjErrorCharginFile: string;

  countFiles: number;
  fileToCompetition: any[];
  thereIsError: boolean;

  disciplinas: string[] = ['Natación', 'Fútbol', 'Baloncesto', 'Squash'];
  unidades: string[] = ['2010', '2011', '2012', '2013'];
  programas: string[] = ['Natación', 'Fútbol', 'Baloncesto', 'Squash'];
  jornadas: string[] = ['Fines de Semana', 'Lunes a viernes'];
  horarios: string[] = ['10:00am - 11:00am'];
  array: any[] = [
    {id: 1, name: 'value 1'},
    {id: 2, name: 'value 2'},
    {id: 3, name: 'value 3'},
  ];

  /******************
   * NOTIFICACIONES *
   ******************/
  public readonly notifier: NotifierService;

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public notifierService: NotifierService,
    sanitizer: DomSanitizer,
    public router: Router,
    public _location: Location
  ) {
    this.titleListInstructores = 'ESCUELA DE FORMACIÓN DEPORTIVA';
    this.subtitleListInstructores = 'Instructores';
    this.nameBtnAdd = 'Nuevo';
    this.nameBtnCancel = 'Cancelar';

    this.utilAutoGestionAfiliados = new UtilAutoGestionAfiliados();
    this.notifier = notifierService;
    this.srcPhotoView = '../../../../assets/img/competicion/addPhoto.png';

    this.thereIsError = false;
    this.countFiles = 0;
    this.fileToCompetition = new Array();
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group({
      centroEducativo: [''],
      nombres: [''],
      direccion: [''],
      Correo: [''],
      nombreDeportista: [''],
      identificacionDeportista: [''],
      // Seccion 1.1
      txt_enfermedadesInfancia: [''],
      txt_enfermedadesaCronicas: [''],
      txt_enfermedadesCorazon: [''],
      txt_enfermedadesHuesos: [''],

      localizacion: [''],
      tiempoInactividad: [''],
      cirujia: [''],
      checkboxMedicamentos: [false],
      cualesMedicamnetos: [''],
      recomendaciones: [''],
      // Seccion 1.2
      checkboxFisica: [false],
      fisicaCual: [''],
      checkboxSensorial: [false],
      sensorialCual: [''],
      orders: new FormArray([]),
      checkboxIntelectual: [false],
      intelectualCual: [''],
      checkboxMultiple: [false],
      multipleCual: [''],
      checkboxVisceral: [false],
      visceralCual: [''],

      // Final
      chkPoliticaTratamiento: [false],
      chkPolicitaCesion: [false],
      chkInfo: [false]
    });
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.array.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.fieldsForm.controls.orders as FormArray).push(control);
    });
  }

  onCheckBoxChanges(e: HTMLInputElement, id: number) {
    // get current position of the changes element by ID
    const index = this.array.findIndex(_ => _.id === id);
    if (!(index > -1)) { return; }

      // const isChecked = this.checkBoxes[index].isChecked;
    this.array[index].isChecked = e.checked;
  }
  onSubmit() {}

  uploadPhoto(event: any) {
    const tam_file = event.target.files[0].size / 1024;
    if (tam_file > this.TAM_MAX_FILE_FOTO) {
      this.msjErrorCharginFile = 'Tamaño foto no puede ser mayor a 3 Mb';
      this.thereIsErrorPhoto = true;
    } else if (!this.utilAutoGestionAfiliados.containExtPhoto(event.target.files[0].name)) {
      this.msjErrorCharginFile = 'Solo se permiten archivos jpg, jpeg y png';
      this.thereIsErrorPhoto = true;
    } else {
      this.thereIsErrorPhoto = false;
      this.filePhoto = event.target.files[0];
      const myReader: FileReader = new FileReader();
      myReader.readAsDataURL(this.filePhoto);
      myReader.onload = (_event) => {
        this.srcPhotoView = myReader.result;
      };
    }
  }

  // Gestión de archivos

  uploadFiles(event: any) {
    const archivos = event.target.files;
    for (let i = 0; i < archivos.length; i++) {
      const tam_file = event.target.files[i].size / 1024;
      const nameFile = event.target.files[i].name;

      if (!this.existFile(nameFile)) {
        if (tam_file > this.TAM_MAX_FILE) {
          this.msjErrorCharginFile = `El archivo : ${nameFile} supera el tamaño de 5Mb`;
          this.updateShowError(this.SHOW_ERROR);
          break;
        } else {
          this.countFiles++;
          this.fileToCompetition.push(
            {
              file: event.target.files[i],
              name: event.target.files[i].name
            });
          this.updateShowError(this.REMOVE_ERROR);
        }
      }
    }
  }

  deleteFiles(nameFile: string) {
    for (let i = 0; i < this.fileToCompetition.length; i++) {
      if (nameFile === this.fileToCompetition[i]['name']) {
        this.fileToCompetition.splice(i, i + 1);
      }
    }
  }

  showPdf(nameFile: string) {
    for (let i = 0; i < this.fileToCompetition.length; i++) {
      if (nameFile === this.fileToCompetition[i]['name']) {
        const fileURL = URL.createObjectURL(this.fileToCompetition[i]['file']);
        window.open(fileURL);
      }
    }
    this.updateShowError(this.REMOVE_ERROR);
  }

  updateShowError(statusError: boolean) {
    this.thereIsError = statusError;
  }

  existFile(nameFile: string): boolean {
    for (let i = 0; i < this.fileToCompetition.length; i++) {
      if (nameFile === this.fileToCompetition[i]['name']) {
        this.msjErrorCharginFile = `No se agrego el archivo ${this.fileToCompetition[i]['name']}, ya existe en la lista`;
        this.updateShowError(this.SHOW_ERROR);
        return true;
      }
    }
    return false;
  }
  // Fin gestión de archivos
}
