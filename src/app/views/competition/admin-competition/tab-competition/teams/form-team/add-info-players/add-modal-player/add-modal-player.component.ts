import { Component, ViewChild, OnChanges,Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompetitionService } from '../../../../../../competition.service';
import { player } from '../../../../../../../../model/player.model';

@Component({
  selector: 'app-add-modal-player',
  templateUrl: './add-modal-player.component.html'
})
export class AddModalPlayerComponent implements OnChanges, OnInit {

  /************************VARIABLES LOCALES******************* */
  @Input() onchangeModal: { titulo: string };
  @ViewChild('modalAddPlayer', { static: true }) modalAddPlayer: any;
  
  @Output() player= new EventEmitter<player>();
  @Output() agregado = new EventEmitter<boolean>();
  modalOptions: NgbModalOptions;
  fieldsForm: FormGroup;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private competitionservice:CompetitionService) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
   }

   ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        idPlayer: ['', [Validators.required,  Validators.pattern('^([0-9])*$'), Validators.maxLength(12)]],
        namesPlayer: ['', [Validators.required,
                            Validators.maxLength(60),
                            Validators.minLength(5)]],
        surnamesPlayer: ['', [Validators.required,
                        Validators.maxLength(60),
                        Validators.minLength(5)]],
        phonePlayer: ['', [Validators.required,
                          Validators.maxLength(20),
                          Validators.minLength(6)]]
      });
   }

  ngOnChanges() {
    this.modalService.open(this.modalAddPlayer, this.modalOptions);
  }

  onSubmit() {
    let newPlayer=
      {
        nombres: this.fieldsForm.get('namesPlayer').value,
        apellidos:this.fieldsForm.get('surnamesPlayer').value,
        celular: this.fieldsForm.get('phonePlayer').value,
        cedula: this.fieldsForm.get('idPlayer').value  ,
        valor: 7900,
        categoria: "A"
      };   
    this.player.emit(newPlayer);
    this.agregado.emit(true);
    console.log("GUARDANDO JUGADORRR!!",newPlayer);
  }
}
