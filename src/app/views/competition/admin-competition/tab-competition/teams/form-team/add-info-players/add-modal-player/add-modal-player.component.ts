import { Component, ViewChild, OnChanges,Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {
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
    newPlayer['nombresJugador'] = this.fieldsForm.get('namesPlayer').value;
    newPlayer['apellidosJugador'] = this.fieldsForm.get('surnamesPlayer').value;
    newPlayer['telefonoJugador'] = this.fieldsForm.get('phonePlayer').value;
    newPlayer['cedulaJugador'] = this.fieldsForm.get('idPlayer').value;
  }
}
