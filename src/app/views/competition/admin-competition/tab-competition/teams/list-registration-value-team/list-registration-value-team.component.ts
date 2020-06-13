import { Component, OnInit, Input } from '@angular/core';
import {CompetitionService} from '../../../../competition.service';
import { player } from '../../../../../../model/player.model';
import { anyChanged } from '@progress/kendo-angular-common';
import { Contador } from '../../../../../../model/contador.model';

@Component({
  selector: 'app-list-registration-value-team',
  templateUrl: './list-registration-value-team.component.html',
  styleUrls: ['./list-registration-value-team.component.css']
})
export class ListRegistrationValueTeamComponent implements OnInit {
  players: player[]=[];
  categorias: any[];
  contadores: Contador[] = [];
  showModalWindowFail: boolean;
  valorTotal: number = 0;
  subsidioTotal: number = 0;
  valorParticular: number = 13000;
  @Input() team:any;
  constructor(private competitionService: CompetitionService) {   }

  ngOnInit() {    
    if(this.team!=null)
    {
      this.competitionService.cargarJugadores(this.team.id).subscribe(resultado=>{
        for(let i of resultado){
          this.players.push(i); 
        }  
        this.categorias = this.competitionService.cargarCategorias1();
        this.inicializarContador();
        this.conteoDeCategorias();
        this.valorTotal = this.contadores.reduce((acc, obj, ) => acc + (obj.valor * obj.contador), 0);
        this.subsidioTotal = this.contadores.reduce((acc, obj, ) => acc + ((this.valorParticular - obj.valor) * obj.contador), 0);
      },
      error=>{ console.log(JSON.stringify(error));}); 
    }     
  }
 
  conteoDeCategorias() {   
    for (let player of this.players) {
      this.aumentarContador(player.categoria);
    }
  }
  aumentarContador(categoria: string){
    for (let contador of this.contadores){
      if(contador.categoria == categoria){
        contador.contador++;
      }
    }
  }
  inicializarContador(){
    for(let categoria of this.categorias){
      this.contadores.push(new Contador(0, categoria.categoria, categoria.valor));
    }
  }
}

