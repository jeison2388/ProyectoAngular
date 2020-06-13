import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {UtilCompetition} from '../../../../UtilCompetition';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { team } from '../../../../../../model/team.model';
import { CompetitionService } from '../../../../competition.service';

@Component({
  selector: 'app-form-team',
  templateUrl: './form-team.component.html'
})
export class FormTeamComponent implements OnInit {

  /****************************VARIABLE GLOBALE********** */
  private TAM_MAX_FILE: number = 3072;
  /***********************VARIABLES LOCALES**************** */
  @Input() titleForm: { titleForm: string };
  @Input() subtitleForm: { subtitleForm: string };
  @Input() buttonAction: { buttonAction: string };
  @Input() public cancel=false;
  @Output()  valCancel = new EventEmitter<boolean>();
  @Input() team:any;
  @Input() edit:boolean;
  @Input() competitionId:number;


  filePhoto: File;
  srcPhotoView: any;
  thereIsErrorPhoto: boolean;
  msjErrorCharginFile: string;
  utilCompetition: UtilCompetition;

  fieldsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private competitionService:CompetitionService) {
    this.utilCompetition = new UtilCompetition();
    this.srcPhotoView = '../../../../../../assets/img/competicion/addPhoto.png';
    this.thereIsErrorPhoto = false;
  }

  ngOnInit() {
    this.cancel=false;
    this.fieldsForm = this.formBuilder.group(
      {
        nameTeam: ['', [Validators.required,
                              Validators.maxLength(50),
                              Validators.minLength(3)]
                         ],
        nameDelegate: ['', [Validators.required,
                            Validators.maxLength(50),
                            Validators.minLength(3)]],
        idDelegate: ['', [Validators.required,  Validators.pattern('^([0-9])*$'), Validators.maxLength(12)]],
        phoneDelegate: ['', [Validators.required,  Validators.pattern('^([0-9])*$'), Validators.maxLength(12)]]
      });
  }
onSubmit()
{
  console.log("GUARDADO desde form-team");
}
onCancel()
{
  this.cancel=true;
  this.valCancel.emit(true);
}

  uploadPhoto(event: any) {
    const tam_file = event.target.files[0].size / 1024;
    if (tam_file > this.TAM_MAX_FILE) {
      this.msjErrorCharginFile = 'Tamaño foto no puede ser mayor a 3 Mb';
      this.thereIsErrorPhoto = true;
    } else if (!this.utilCompetition.containExtPhoto(event.target.files[0].name)) {
      this.msjErrorCharginFile = 'Solo se permiten archivos jpg, jpeg y png';
      this.thereIsErrorPhoto = true;
    } else {
      this.thereIsErrorPhoto = false;
      this.filePhoto = event.target.files[0];
      const myReader: FileReader = new FileReader();
      myReader.readAsDataURL(this.filePhoto);
      myReader.onload = (_event) => {
        this.srcPhotoView = myReader.result;
      }
    }
  }
}
