import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FechaUtilidades } from '../../../model/FechaUtilidades';
import {UtilCompetition} from '../UtilCompetition';
import { CompetitionService } from '../competition.service';

@Component({
  selector: 'app-form-competition',
  templateUrl: './form-competition.component.html'
})
export class FormCompetitionComponent implements OnInit {

  /************************VARIABLES TEMPORALES************* */
  sports: any;
  categories: any;
  modalities: any;
  type_competition: any;
  number_qualifiers: any; //final, semifinal,cuartos
  match_duration: any;
  gender: any;
  number_of_teams: any;
  /****************************VARIABLE GLOBALE********** */
  private TAM_MAX_FILE: number = 4960;
  private REMOVE_ERROR: boolean = false;
  private SHOW_ERROR: boolean = true;

  /*array que se va a crear cuando me devulevan la informacion*/
 rules:any;
   completeRule()
   {
     for(let rule of this.rules)
     {
        if(rule.prioridad==null || rule.prioridad==0)
        {
          rule.prioridad=0;
          rule.habilitado=false;
         }
        else
          rule.habilitado=true;
     }
    }

  /***********************VARIABLES LOCALES**************** */
  @Input() titleForm: { titleForm: string };
  @Input() subtitleForm: { subtitleForm: string };
  @Input() buttonAction: { buttonAction: string };
  @ViewChild('deport', {static: false}) cbx_deport: any;
  @ViewChild('category', {static: false}) cbx_category: any;
  @ViewChild('modality', {static: false}) cbx_modality: any;
  @ViewChild('duration', {static: false}) cbx_duration: any;
  @ViewChild('typeCompetition', {static: false}) cbx_typeCompetition: any;
  @ViewChild('numberQualifiers', {static: false}) cbx_typeQualifier: any;
  @ViewChild('genderC', {static: false}) cbx_gender: any;
  @ViewChild('numberTeams', {static: false}) cbx_numberTeams: any;


  fieldsForm: FormGroup;

  countRules: number;
  countFiles: number;
  fileToCompetition: any[];
  msjErrorCharginFile: String;
  thereIsError: boolean;
  min_date: string;
  fechaUtilidades: FechaUtilidades;
  utilCompetition: UtilCompetition;
  showErrorDateFinish: boolean;
  showErrorDateStart: boolean;
  msjErrorDateFinish: string;
  thirdAndFourth: boolean;
  showErrorItem: boolean;

  constructor(private formBuilder: FormBuilder, private competitionService:CompetitionService) {
    this.competitionService.cargarDeportes().subscribe(resultado=>{this.sports=resultado;},
       error=>{ console.log(JSON.stringify(error));});
    this.competitionService.cargarCategorias().subscribe(resultado=>{this.categories=resultado;},
        error=>{console.log(JSON.stringify(error));});
    this.competitionService.cargarModalidades().subscribe(resultado=>{this.modalities=resultado;},
        error=>{console.log(JSON.stringify(error));});
    this.competitionService.cargarDuracionPartido().subscribe(resultado=>{this.match_duration=resultado;},
        error=>{console.log(JSON.stringify(error));});
    this.competitionService.cargarTiposCompeticion().subscribe(resultado=>{this.type_competition=resultado;},
        error=>{console.log(JSON.stringify(error));});
    this.competitionService.cargarTiposEliminatoria().subscribe(resultado=>{this.number_qualifiers=resultado;},
        error=>{console.log(JSON.stringify(error));});
    this.competitionService.cargarGeneros().subscribe(resultado=>{this.gender=resultado;},
        error=>{console.log(JSON.stringify(error));});
    this.competitionService.cargarMinimoEquipos().subscribe(resultado=>{this.number_of_teams=resultado;},
        error=>{console.log(JSON.stringify(error));});
    this.competitionService.obtenerItemsDesempate().subscribe(resultado=>{this.rules=resultado;},
        error=>{console.log(JSON.stringify(error));});

    this.fechaUtilidades = new FechaUtilidades();
    this.utilCompetition = new UtilCompetition();
    this.countRules = 1;
    this.countFiles = 0;
    this.fileToCompetition = new Array();
    this.thereIsError = false;
    this.showErrorDateFinish = false;
    this.showErrorDateStart = false;
    this.min_date = this.fechaUtilidades.getMaxMinDate();
    this.thirdAndFourth = false;
    this.showErrorItem = false;
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        nameCompetition: ['', [Validators.required,
                              Validators.maxLength(50),
                              Validators.minLength(3)]
                         ],
        dateStartCompetition:  ['', [Validators.required]],
        dateEndCompetition:  ['', [Validators.required]],
        minnumberOfParticipants: ['', [Validators.required,  Validators.pattern('^([0-9])*$'), Validators.maxLength(4)]]
      });
  }

  assignPriorities(rule: any, activar: boolean) {
    for (let i = 0; i < this.rules.length; i++) {
      const updateFormElement = this.rules[i] ;
      if (updateFormElement.id === rule.id) {
        if (activar) {
          updateFormElement.habilitado = activar;
          updateFormElement.prioridad = this.countRules;
          this.countRules++;
          console.log("Activando regla:  #"+this.countRules);
        } else {
          updateFormElement.habilitado = activar;
          this.updateRules(updateFormElement.prioridad);
          updateFormElement.prioridad = 0;
          this.countRules--;
          console.log("Desactivando regla:  #"+this.countRules);
        }
        this.rules[i] = updateFormElement;
        break;
      }
    }
  }
  idSports(descripcion:string):Object
  {
    var d = {
    id:0,
    deporte:""
   };
    for(let sport of this.sports)
    {
      if(sport.descripcion == descripcion)
      {
        d.id=sport.id;
        d.deporte=sport.descripcion;
        console.log("deporte devolver: " + d.deporte );
        return d;
      }
    }
  }
  idCategorias(descripcion:string):Object
  {
    var obj = {
    id:0,
    categoria:""
   };
    for(let cat of this.categories)
    {
      if(cat.descripcion == descripcion)
      {
        obj.id=cat.id;
        obj.categoria=cat.descripcion;
        console.log("categoria devolver: " +  obj.categoria);
        return obj;
      }
    }
  }
  idModalidad(descripcion:string):Object
  {
    var obj = {
    id:0,
    modalidad:""
   };
    for(let mod of this.modalities)
    {
      if(mod.descripcion == descripcion)
      {
        obj.id= mod.id;
        obj.modalidad= mod.descripcion;
        console.log("modalidad devolver: " +  obj.modalidad);
        return obj;
      }
    }
  }
  idTipoCompeticion(descripcion:string):Object
  {
    var obj = {
    id:0,
    tipoCompeticion:""
   };
    for(let type of this.type_competition)
    {
      if(type.descripcion == descripcion)
      {
        obj.id = type.id;
        obj.tipoCompeticion = type.descripcion;
        console.log("typo de competicion devolver: " +  obj.tipoCompeticion);
        return obj;
      }
    }
  }
  idNumeroEliminatoria(descripcion:string):Object
  {
    var obj = {
    id:0,
    numeroEliminatorias:""
   };
    for(let numero of this.number_qualifiers)
    {
      if(numero.descripcion == descripcion)
      {
        obj.id = numero.id;
        obj.numeroEliminatorias = numero.descripcion;
        console.log("numero de eliminatoria devolver: " +  obj.numeroEliminatorias);
        return obj;
      }
    }
  }
  idDuracionPartido(descripcion:string):Object
  {
    var obj = {
    id:0,
    duracionPartido:""
   };
    for(let durac of this.match_duration)
    {
      if(durac.descripcion == descripcion)
      {
        obj.id = durac.id;
        obj.duracionPartido = durac.descripcion;
        console.log("duracion partido devolver: " +  obj.duracionPartido);
        return obj;
      }
    }
  }
  idGenero(descripcion:string):Object
  {
    var obj = {
    id:0,
    genero:""
   };
    for(let gene of this.gender)
    {
      if(gene.descripcion == descripcion)
      {
        obj.id = gene.id;
        obj.genero = gene.descripcion;
        console.log("genero devolver: " +  obj.genero);
        return obj;
      }
    }
  }
  idNumeroMinimoEquipos(descripcion:string):Object
  {
    var obj = {
    id:0,
    numero:""
   };
    for(let numer of this.number_of_teams)
    {
      if(numer.descripcion == descripcion)
      {
        obj.id = numer.id;
        obj.numero = numer.descripcion;
        console.log("numero minimo de equipos devolver: " +  obj.numero);
        return obj;
      }
    }
  }


  updateRules(priority: number) {
    for (let i = 0; i < this.rules.length; i++) {
      const updateFormElement = { ...this.rules[i] };
      if (updateFormElement.prioridad > priority) {
        updateFormElement.prioridad = updateFormElement.prioridad - 1;
      }
      this.rules[i] = updateFormElement;
    }
  }

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
  guardarCompeticion()
  {

  }

  handleDate(event: any) {
    const dateEndEv = this.fieldsForm.get('dateEndCompetition').value;
    const dateStartEv = this.fieldsForm.get('dateStartCompetition').value;
    if (!(dateEndEv.length === 0) && !(dateStartEv.length === 0)) {
      if (this.fechaUtilidades.isMajorDate(dateEndEv, dateStartEv)) {
        this.msjErrorDateFinish = 'la fecha de inicio es mayor a la fecha de fin';
        this.showErrorDateFinish = true;
      } else {
        this.showErrorDateFinish = false;
      }
    }
  }

  handleOptionThirdAndFourth (event: any) {
    this.thirdAndFourth = event.target.checked;
  }

  onSubmit() {
      if (!this.utilCompetition.isSelectedRule(this.rules)) {
        this.showErrorItem = true;
      } else {
        const newCompetition = {};
        newCompetition['nombreCompetencia'] = this.fieldsForm.get('nameCompetition').value;
        newCompetition['deporte'] = this.idSports(this.cbx_deport.nativeElement.value);
        newCompetition['categoria'] = this.idCategorias(this.cbx_category.nativeElement.value);
        newCompetition['modalidad'] = this.idModalidad(this.cbx_modality.nativeElement.value);
        newCompetition['tipoCompeticion'] = this.idTipoCompeticion(this.cbx_typeCompetition.nativeElement.value);
        newCompetition['numeroEliminatorias'] =  this.idNumeroEliminatoria(this.cbx_typeQualifier.nativeElement.value);
        newCompetition['fechaInicio'] = this.fieldsForm.get('dateStartCompetition').value;
        newCompetition['fechaFin'] = this.fieldsForm.get('dateEndCompetition').value;
        newCompetition['duracionPartido'] = this.idDuracionPartido(this.cbx_duration.nativeElement.value);
        newCompetition['genero'] = this.idGenero(this.cbx_gender.nativeElement.value);
        newCompetition['numeroEquipos'] = this.idNumeroMinimoEquipos(this.cbx_numberTeams.nativeElement.value);
        newCompetition['numeroMinimoInscritos'] = this.fieldsForm.get('minnumberOfParticipants').value;
        newCompetition['itemsDesempate'] = this.rules;
        newCompetition['tercerYCuarto'] = this.thirdAndFourth.valueOf();
        this.completeRule();
        this.competitionService.addCompetition(newCompetition,this.fileToCompetition).subscribe(
          resultado=>
          {
              console.log("LO HIZO BIEN, EL POST"+JSON.stringify(resultado));
          },
          error =>
          {
            console.log("LO HIZO MAL EL POST"+JSON.stringify(error));
          }
        );

      }
  }

}
