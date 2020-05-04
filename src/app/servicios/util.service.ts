
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  fecha: NgbDateStruct = {year: 2019, month: 1, day: 1};

  constructor(public router: Router,
    private route: ActivatedRoute,) { }

  cancelar(ruta): void {
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate([ruta])
    })
  }

  editar(ruta, id): void {
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate([ruta], { queryParams: { id: id } })
    })
  }

  separarCadena(cadena, separador): any{
    return cadena.split(separador)
  }

  formatoFecha(fecha): NgbDateStruct{
      const fechaArr = this.separarCadena(fecha, '-');      
      this.fecha.year = Number(fechaArr[0]);
      this.fecha.month = Number(fechaArr[1]);
      this.fecha.day =Number(fechaArr[2]);
    return fecha;
  }


}

