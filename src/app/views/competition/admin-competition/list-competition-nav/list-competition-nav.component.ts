import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../competition.service';

@Component({
  selector: 'app-list-competition-nav',
  templateUrl: './list-competition-nav.component.html'
})
export class ListCompetitionNavComponent implements OnInit {
competencias: any;
/*    competencias=[{
    'nombre_Competencia':'Competencia1',
    'deporte': 'football',
    'categoría': 'juvenil1',
    'modalidad': 'futbol11',
    'tipoCompeticion':'copa',
    'numeroEliminatorias': 'octavos',
    "fechaInicio": "20/02/2020",
    "fechaFin": "23/02/2020",
    "duracionPartido": "15min",
    "genero": "masculino",
    "numeroEquipos": "8",
    "numeroMinimoInscritos": "10",
    "itemsDesempate" : ["diferenciaGol", "equipoMejorFairPlay"],
    "tercerYCuarto" : true
  },{
    'nombre_Competencia':'Competencia2',
    'deporte': 'basquetball',
    'categoría': 'juvenil1',
    'modalidad': 'futbol11',
    'tipoCompeticion':'copa',
    'numeroEliminatorias': 'octavos',
    "fechaInicio": "20/02/2020",
    "fechaFin": "23/02/2020",
    "duracionPartido": "15min",
    "genero": "masculino",
    "numeroEquipos": "8",
    "numeroMinimoInscritos": "10",
    "itemsDesempate" : ["diferenciaGol", "equipoMejorFairPlay"],
    "tercerYCuarto" : true
  },
  {
    'nombre_Competencia':'Competencia3',
    'deporte': 'tenis',
    'categoría': 'juvenil1',
    'modalidad': 'futbol11',
    'tipoCompeticion':'copa',
    'numeroEliminatorias': 'octavos',
    "fechaInicio": "20/02/2020",
    "fechaFin": "23/02/2020",
    "duracionPartido": "15min",
    "genero": "masculino",
    "numeroEquipos": "8",
    "numeroMinimoInscritos": "10",
    "itemsDesempate" : ["diferenciaGol", "equipoMejorFairPlay"],
    "tercerYCuarto" : true
  },
  {
    'nombre_Competencia':'Competencia3',
    'deporte': 'volei',
    'categoría': 'juvenil1',
    'modalidad': 'futbol11',
    'tipoCompeticion':'copa',
    'numeroEliminatorias': 'octavos',
    "fechaInicio": "20/02/2020",
    "fechaFin": "23/02/2020",
    "duracionPartido": "15min",
    "genero": "masculino",
    "numeroEquipos": "8",
    "numeroMinimoInscritos": "10",
    "itemsDesempate" : ["diferenciaGol", "equipoMejorFairPlay"],
    "tercerYCuarto" : true
  }]; */
 
  constructor(private competitionService:CompetitionService) { }

  ngOnInit() 
  {
    this.competitionService.cargarCompeticion().subscribe(resultado=>{this.competencias=resultado; this.competitionService.competitions=resultado},
      error=>{ console.log(JSON.stringify(error));});
  }
  asignarIdSeleccionado(id:number)
  {
    this.competitionService.idSelected=id;
    console.log("Elemento seleccionado:    Id:  "+id);
  }

}
