import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-competition-nav',
  templateUrl: './list-competition-nav.component.html'
})
export class ListCompetitionNavComponent implements OnInit {

  /* "nombreCompetencia": "Campeonado villa olimpica",
  "deporte": "futbol",
  "categoria": "juvenil",
  "modalidad": "futbol 11",
  "tipoCompeticion": "copa",
  "numeroEliminatorias": "octavos",
  "fechaInicio": "20/02/2020",
  "fechaFin": "23/02/2020",
  "duracionPartido": "15min",
  "genero": "masculino",
  "numeroEquipos": "8",
  "numeroMinimoInscritos": "10"
  "itemsDesempate : [diferenciaGol, equipoMejorFairPlay]"
  "tercerYCuarto : true" */
  competencias=[{
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
  }];
  obtenerImagen(deporte:string)
  {
    let cadena="../../../../../assets/img/competicion/"+deporte+".png"
    console.log("Retornando  :  "+cadena);
    return cadena;
  }
  constructor() { }

  ngOnInit() {
  }

}
