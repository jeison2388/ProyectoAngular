import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-info-players',
  templateUrl: './add-info-players.component.html'
})
export class AddInfoPlayersComponent implements OnInit {

  onchangeModal: string;
  mostrarModalAddPlayer: boolean;

  constructor() {
    this.mostrarModalAddPlayer = false;
  }

  ngOnInit() {
  }

  mostrarVentanaModalAddPlayer() {
    this.onchangeModal = this.onchangeModal + ' ';
    this.mostrarModalAddPlayer = true;
  }

}
