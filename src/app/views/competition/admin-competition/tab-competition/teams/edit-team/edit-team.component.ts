import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { team } from '../../../../../../model/team.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html'
})
export class EditTeamComponent implements OnInit {
  @Input()edit: boolean;
  @Input()team: any;
  @Output() cancel= new EventEmitter<number>();
  newPlayer:any;
  agregado:boolean;
  
  constructor() { }
  ngOnInit() {
  }
  onCancelar()
  {
    console.log("Emitiendo CANCEL: 0");
   this.cancel.emit(0);
  }
  onPlayer(event)
  {
    this.newPlayer=event;
  }
  onAgregado(event)
  {
    this.agregado=event;
  }


}
