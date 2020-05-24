import { Component, ViewChild, OnChanges,Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompetitionService } from '../../../../../../competition.service';

@Component({
  selector: 'app-add-modal-player',
  templateUrl: './add-modal-player.component.html'
})
export class AddModalPlayerComponent implements OnChanges, OnInit {

  /************************VARIABLES LOCALES******************* */
  @Input() onchangeModal: { titulo: string };
  @ViewChild('modalAddPlayer', { static: true }) modalAddPlayer: any;

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
    const newPlayer = {};
    newPlayer['nombres'] = this.fieldsForm.get('namesPlayer').value;
    newPlayer['apellidos'] = this.fieldsForm.get('surnamesPlayer').value;
    newPlayer['telefono'] = this.fieldsForm.get('phonePlayer').value;
    newPlayer['cedula'] = this.fieldsForm.get('idPlayer').value;
    let jugador={
      nombres:<string> this.fieldsForm.get('namesPlayer').value,
      apellidos:<string>this.fieldsForm.get('surnamesPlayer').value,
      cedula:<string>this.fieldsForm.get('idPlayer').value,
      celular:<string>this.fieldsForm.get('phonePlayer').value,      
      categoria:"A",
      valor:7900
      }
    this.competitionservice.players.push(jugador);

    console.log("GUARDANDO JUGADORRR!!");
  }
}
