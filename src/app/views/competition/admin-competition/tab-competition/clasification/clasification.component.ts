import { Component, OnInit, Output } from '@angular/core';
import * as go from 'gojs';
import { CompetitionService } from '../../../competition.service';
import { team } from '../../../../../model/team.model';

@Component({
  selector: 'app-clasification',
  templateUrl: './clasification.component.html'
})
export class ClasificationComponent implements OnInit {

  


  /*****************VARIABLES TEMPORALES************* */

  teamsCompetition:team[]=[];
constructor(private competitionservice:CompetitionService) { }
  @Output() array= [
    { key: 1, parent: 13, name: "HOTEL ACHALAY", gender: "Cuartos", birthYear: "1926", reign: "1952-" },
    { key: 2, parent: 1, name: "DIAGNOSTIMOTOS", gender: "Octavos", birthYear: "1948" },
    { key: 3, parent: 1, name: "HOTEL ACHALAY", gender: "Octavos", birthYear: "1982" },
    { key: 4, parent: 13, name: "JUMBO", gender: "Cuartos", birthYear: "1984" },
    { key: 5, parent: 4, name: "JUMBO", gender: "Octavos", birthYear: "1984" },
    { key: 6, parent: 4, name: "COMFACAUCA", gender: "Octavos", birthYear: "1950" },
    { key: 7, parent: 14, name: "CASA RENAULT", gender: "Cuartos", birthYear: "1977" },
    { key: 8, parent: 7, name: "CASA RENAULT", gender: "Octavos", birthYear: "1977" },
    { key: 9, parent: 7, name: "PELOS Y PATAS", gender: "Octavos", birthYear: "2010" },
    { key: 10, parent: 14, name: "APLANCHADOS DOÑA CHEPA", gender: "Cuartos", birthYear: "1981" },
    { key: 11, parent: 10, name: "APLANCHADOS DOÑA CHEPA", gender: "Octavos", birthYear: "1981" },
    { key: 12, parent: 10, name: "SENIOR MASTER", gender: "Octavos", birthYear: "1960" },
    { key: 13, parent: 15, name: "HOTEL ACHALAY", gender: "Semifinal", birthYear: "1926", reign: "1952-" },
    { key: 14, parent: 15, name: "APLANCHADOS DOÑA CHEPA", gender: "Semifinal", birthYear: "1981" },
    { key: 15, parent: 30, name: "APLANCHADOS DOÑA CHEPA", gender: "Final", birthYear: "1981" },  
  ];
  

  ngOnInit() {
    //Se debe pasar el id de la competencia
    this.teamsCompetition=this.competitionservice.cargarEquipos(1);
  }

}
